import { cookies } from 'next/headers'

import { desc, and, eq, isNull } from 'drizzle-orm'

import { requireAuth } from '@/lib/auth/guards'
import { verifyToken } from '@/lib/auth/session'

import { db } from '../drizzle'
import { activityLogs, teamMembers, teams, users } from '../schema'
import { SESSION_COOKIE } from '@/lib/constants/auth'

/* -------------------------------------------------------------------------- */
/*                              U S E R  H E L P E R                          */
/* -------------------------------------------------------------------------- */

export async function getUser() {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE)
  if (!sessionCookie || !sessionCookie.value) return null

  /* Decode and validate the JWT ------------------------------------------------ */
  let sessionData: { wallet?: string; expires?: string }
  try {
    sessionData = (await verifyToken(sessionCookie.value)) as any
  } catch {
    return null
  }

  if (!sessionData?.wallet) return null
  if (!sessionData.expires || new Date(sessionData.expires) < new Date()) return null

  /* Look up the user by wallet address ---------------------------------------- */
  const rows = await db
    .select()
    .from(users)
    .where(and(eq(users.walletAddress, sessionData.wallet), isNull(users.deletedAt)))
    .limit(1)

  return rows.length ? rows[0] : null
}

/* -------------------------------------------------------------------------- */
/*                    C R Y P T O  S U B S C R I P T I O N                     */
/* -------------------------------------------------------------------------- */

/**
 * Persist an on-chain subscription payment for the given team.
 *
 * @param teamId     ID of the team that just paid on-chain
 * @param planKey    Internal pricing key (‘free’ | ‘base’ | ‘plus’)
 * @param paidUntil  Expiry timestamp returned by the SubscriptionManager
 */
export async function updateTeamCryptoSubscription(
  teamId: number,
  planKey: 'free' | 'base' | 'plus',
  paidUntil: Date,
) {
  await db
    .update(teams)
    .set({
      planName: planKey === 'free' ? null : planKey,
      subscriptionPaidUntil: paidUntil,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId))
}

/* -------------------------------------------------------------------------- */
/*                              U S E R  &  T E A M                           */
/* -------------------------------------------------------------------------- */

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1)

  return result[0]
}

/* -------------------------------------------------------------------------- */
/*                         A C T I V I T Y   L O G S                          */
/* -------------------------------------------------------------------------- */

export async function getActivityLogs() {
  const user = await requireAuth()

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10)
}

/* -------------------------------------------------------------------------- */
/*                          T E A M   R E S O L V E R                         */
/* -------------------------------------------------------------------------- */

export async function getTeamForUser(userId: number) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                      walletAddress: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  return result?.teamMembers[0]?.team || null
}