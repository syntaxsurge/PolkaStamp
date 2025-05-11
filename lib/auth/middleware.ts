import { z } from 'zod'

import { getTeamForUser } from '@/lib/db/queries/queries'
import { TeamDataWithMembers, User } from '@/lib/db/schema'

import { requireAuth } from './guards'

/* -------------------------------------------------------------------------- */
/*                               T Y P E S                                    */
/* -------------------------------------------------------------------------- */

export type ActionState = {
  error?: string
  success?: string
  [key: string]: any
}

type ValidatedActionFunction<S extends z.ZodTypeAny, T> = (
  data: z.infer<S>,
  formData: FormData,
) => Promise<T>

/* -------------------------------------------------------------------------- */
/*                              B A S I C  V A L I D                          */
/* -------------------------------------------------------------------------- */

/**
 * Validate form data against `schema`; return `{ error }` on failure,
 * otherwise forward `data` to `action`.
 */
export function validatedAction<S extends z.ZodTypeAny, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>,
) {
  return async (_prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
      return { error: result.error.errors[0].message } as T
    }
    return action(result.data, formData)
  }
}

/* -------------------------------------------------------------------------- */
/*                   V A L I D   A C T I O N   W I T H   U S E R              */
/* -------------------------------------------------------------------------- */

type ValidatedActionWithUserFunction<S extends z.ZodTypeAny, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User,
) => Promise<T>

/**
 * Inject the authenticated `user` and, when `allowedRoles` is supplied,
 * refuse execution unless `user.role` is included. If no session exists yet
 * (requireAuth returns undefined) return `{ error:'Unauthorized' }` instead
 * of throwing, so pre-onboarding requests do not crash the server.
 */
export function validatedActionWithUser<S extends z.ZodTypeAny, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>,
  allowedRoles: readonly string[] = [],
) {
  return async (_prevState: ActionState, formData: FormData): Promise<T> => {
    const maybeUser = await requireAuth()

    /* No session yet (wallet header only) → block action gracefully */
    if (!maybeUser) {
      return { error: 'Unauthorized' } as T
    }

    /* Role gate */
    if (allowedRoles.length > 0 && !allowedRoles.includes(maybeUser.role)) {
      return { error: 'Unauthorized.' } as T
    }

    const result = schema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
      return { error: result.error.errors[0].message } as T
    }

    return action(result.data, formData, maybeUser)
  }
}

/* -------------------------------------------------------------------------- */
/*                     A C T I O N   W I T H   T E A M                        */
/* -------------------------------------------------------------------------- */

type ActionWithTeamFunction<T> = (formData: FormData, team: TeamDataWithMembers) => Promise<T>

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await requireAuth()

    if (!user) {
      return { error: 'Unauthorized' } as T
    }

    const team = await getTeamForUser(user.id)
    if (!team) throw new Error('Team not found')

    return action(formData, team)
  }
}

/* -------------------------------------------------------------------------- */
/*                          R O L E   G U A R D   U T I L S                   */
/* -------------------------------------------------------------------------- */

/**
 * Assert that `user.role` is one of `allowedRoles`; throw otherwise.
 * Useful in API routes such as `/api/tools/github-metrics`.
 */
export function assertRole(user: User, ...allowedRoles: readonly string[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Unauthorized')
  }
}

/** Convenience wrapper for the common "candidate only” guard. */
export function assertCandidate(user: User): void {
  assertRole(user, 'candidate')
}