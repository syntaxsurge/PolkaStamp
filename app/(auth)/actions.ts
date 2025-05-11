'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { validatedAction, validatedActionWithUser } from '@/lib/auth/middleware'
import { setSession } from '@/lib/auth/session'
import { db } from '@/lib/db/drizzle'
import { getUserWithTeam } from '@/lib/db/queries/queries'
import {
  users,
  teams,
  teamMembers,
  invitations,
  type NewUser,
  type NewTeam,
  type NewTeamMember,
  activityLogs,
  type NewActivityLog,
  ActivityType,
} from '@/lib/db/schema'
import { toH160Hex } from '@/lib/contract-utils'
import { H160_REGEX } from '@/lib/utils/address'

/* -------------------------------------------------------------------------- */
/*                               H E L P E R S                                */
/* -------------------------------------------------------------------------- */

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

async function logActivity(
  teamId: number | null | undefined,
  walletAddress: string,
  type: ActivityType,
  ipAddress?: string,
) {
  if (teamId === null || teamId === undefined) return
  const newActivity: NewActivityLog = {
    teamId,
    action: type,
    ipAddress: ipAddress || '',
    userId: null, // wallet-centric sessions no longer guarantee DB user id
  }
  await db.insert(activityLogs).values(newActivity)
}

/* -------------------------------------------------------------------------- */
/*                    W A L L E T  O N B O A R D   F L O W                    */
/* -------------------------------------------------------------------------- */

const walletOnboardSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['candidate', 'recruiter', 'issuer']),
  walletAddress: z
    .string()
    .regex(H160_REGEX, 'Invalid wallet address')
    .transform((addr): string => toH160Hex(addr)),
})

export const walletOnboardAction = validatedAction(walletOnboardSchema, async (data, _) => {
  const { name, role, walletAddress } = data
  const email = normalizeEmail(data.email)

  /* ------------------------------------------------------------------ */
  /*                    Duplicate email / wallet checks                  */
  /* ------------------------------------------------------------------ */
  const existingByEmail = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existingByEmail.length > 0) return { error: 'Email already registered.' }

  const existingByWallet = await db
    .select()
    .from(users)
    .where(eq(users.walletAddress, walletAddress))
    .limit(1)
  if (existingByWallet.length > 0) return { error: 'Wallet already registered.' }

  /* ------------------------------------------------------------------ */
  /*               Create user & personal placeholder team              */
  /* ------------------------------------------------------------------ */
  const newUser: NewUser = {
    name: name.trim(),
    email,
    role,
    walletAddress,
  }
  const [createdUser] = await db.insert(users).values(newUser).returning()

  const personalTeamData: NewTeam = {
    name: `${email}'s Team`,
    creatorUserId: createdUser.id,
  }
  const [personalTeam] = await db.insert(teams).values(personalTeamData).returning()

  await db.insert(teamMembers).values({
    userId: createdUser.id,
    teamId: personalTeam.id,
    role: 'owner',
  } as NewTeamMember)

  await logActivity(personalTeam.id, walletAddress, ActivityType.CREATE_TEAM)

  /* ------------------------------------------------------------------ */
  /*                           Set session                              */
  /* ------------------------------------------------------------------ */
  await setSession(createdUser)

  redirect('/dashboard')
})

/* -------------------------------------------------------------------------- */
/*                        A C C O U N T  U P D A T E S                        */
/* -------------------------------------------------------------------------- */

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
})

export const updateAccount = validatedActionWithUser(updateAccountSchema, async (data, _, user) => {
  const { name, email } = data
  const walletAddress = user.walletAddress
  const userWithTeam = await getUserWithTeam(user.id)

  await Promise.all([
    db.update(users).set({ name, email }).where(eq(users.id, user.id)),
    logActivity(userWithTeam?.teamId, walletAddress, ActivityType.UPDATE_ACCOUNT),
  ])

  return { success: 'Account updated successfully.' }
})

/* -------------------------------------------------------------------------- */
/*                        T E A M  M A N A G E M E N T                        */
/* -------------------------------------------------------------------------- */

const removeTeamMemberSchema = z.object({ memberId: z.coerce.number() })

export const removeTeamMember = validatedActionWithUser(
  removeTeamMemberSchema,
  async (data, _, user) => {
    const { memberId } = data
    const userWithTeam = await getUserWithTeam(user.id)
    if (!userWithTeam?.teamId) return { error: 'User is not part of a team' }

    await db
      .delete(teamMembers)
      .where(and(eq(teamMembers.id, memberId), eq(teamMembers.teamId, userWithTeam.teamId)))

    await logActivity(userWithTeam.teamId, user.walletAddress, ActivityType.REMOVE_TEAM_MEMBER)
    return { success: 'Team member removed.' }
  },
)

const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['member', 'owner']),
})

export const inviteTeamMember = validatedActionWithUser(
  inviteTeamMemberSchema,
  async (data, _, user) => {
    const { email, role } = data
    const userWithTeam = await getUserWithTeam(user.id)
    if (!userWithTeam?.teamId) return { error: 'User is not part of a team' }

    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.email, email),
          eq(invitations.teamId, userWithTeam.teamId),
          eq(invitations.status, 'pending'),
        ),
      )
      .limit(1)

    if (existingInvitation.length > 0) return { error: 'Invitation already sent.' }

    await db.insert(invitations).values({
      teamId: userWithTeam.teamId,
      email,
      role,
      invitedBy: user.id,
      status: 'pending',
    })

    await logActivity(userWithTeam.teamId, user.walletAddress, ActivityType.INVITE_TEAM_MEMBER)
    return { success: 'Invitation sent.' }
  },
)