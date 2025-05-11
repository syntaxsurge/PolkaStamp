'use server'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { teams, teamMembers } from '@/lib/db/schema/core'
import {
  issuers,
  IssuerStatus,
  IssuerCategory,
  IssuerIndustry,
} from '@/lib/db/schema/issuer'
import { POLKADOT_DID_REGEX } from '@/lib/utils/address'

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

function refresh() {
  revalidatePath('/issuer/onboard')
}

const categoryEnum = z.enum([
  ...Object.values(IssuerCategory),
] as [string, ...string[]])
const industryEnum = z.enum([
  ...Object.values(IssuerIndustry),
] as [string, ...string[]])

/* -------------------------------------------------------------------------- */
/*                          C R E A T E   I S S U E R                         */
/* -------------------------------------------------------------------------- */

export const createIssuerAction = validatedActionWithUser(
  z.object({
    name: z.string().min(2).max(200),
    domain: z.string().min(3).max(255),
    logoUrl: z
      .string()
      .url('Invalid URL')
      .regex(/^https:\/\//, 'Logo URL must start with https://')
      .optional(),
    category: categoryEnum.default(IssuerCategory.OTHER),
    industry: industryEnum.default(IssuerIndustry.OTHER),
  }),
  async (data, _, user) => {
    /* One issuer per user ------------------------------------------------- */
    const existing = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)
    if (existing.length)
      return { error: 'You already have an issuer organisation.' }

    /* Require team DID ---------------------------------------------------- */
    const [teamRow] = await db
      .select({ did: teams.did })
      .from(teamMembers)
      .leftJoin(teams, eq(teamMembers.teamId, teams.id))
      .where(eq(teamMembers.userId, user.id))
      .limit(1)

    if (!teamRow?.did) {
      return {
        error:
          'Please create your team DID before creating an issuer organisation.',
      }
    }

    const newIssuer: typeof issuers.$inferInsert = {
      ownerUserId: user.id,
      name: data.name,
      domain: data.domain.toLowerCase(),
      logoUrl: data.logoUrl ?? null,
      status: IssuerStatus.PENDING,
      category: data.category as (typeof IssuerCategory)[keyof typeof IssuerCategory],
      industry: data.industry as (typeof IssuerIndustry)[keyof typeof IssuerIndustry],
      did: teamRow.did,
    }

    await db.insert(issuers).values(newIssuer)

    refresh()
    return { success: 'Issuer created and pending review.' }
  },
)

/* -------------------------------------------------------------------------- */
/*                      L I N K   P O L K A D O T   D I D                     */
/* (legacy issuers can attach a DID here)                                     */
/* -------------------------------------------------------------------------- */

export const updateIssuerDidAction = validatedActionWithUser(
  z.object({
    did: z
      .string()
      .trim()
      .regex(
        POLKADOT_DID_REGEX,
        'Invalid Polkadot DID (expected did:polkadot:0x…)',
      ),
  }),
  async ({ did }, _, user) => {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)

    if (!issuer) return { error: 'Issuer not found.' }

    await db
      .update(issuers)
      .set({ did, status: IssuerStatus.ACTIVE })
      .where(eq(issuers.id, issuer.id))

    refresh()
    return {
      success: 'Polkadot DID linked successfully — issuer is now active.',
    }
  },
)

/* -------------------------------------------------------------------------- */
/*                R E J E C T E D   I S S U E R   U P D A T E                 */
/* -------------------------------------------------------------------------- */

export const updateIssuerDetailsAction = validatedActionWithUser(
  z.object({
    name: z.string().min(2).max(200),
    domain: z.string().min(3).max(255),
    logoUrl: z
      .string()
      .url('Invalid URL')
      .regex(/^https:\/\//, 'Logo URL must start with https://')
      .optional(),
    category: categoryEnum.default(IssuerCategory.OTHER),
    industry: industryEnum.default(IssuerIndustry.OTHER),
  }),
  async (data, _, user) => {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)
    if (!issuer) return { error: 'Issuer not found.' }
    if (issuer.status !== IssuerStatus.REJECTED)
      return { error: 'Only rejected issuers can be updated.' }

    await db
      .update(issuers)
      .set({
        name: data.name,
        domain: data.domain.toLowerCase(),
        logoUrl: data.logoUrl ?? null,
        category: data.category as (typeof IssuerCategory)[keyof typeof IssuerCategory],
        industry: data.industry as (typeof IssuerIndustry)[keyof typeof IssuerIndustry],
        status: IssuerStatus.PENDING,
      })
      .where(eq(issuers.id, issuer.id))

    refresh()
    return { success: 'Details updated — issuer resubmitted for review.' }
  },
)