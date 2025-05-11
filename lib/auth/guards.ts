import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { WALLET_HEADER } from '@/lib/constants/blockchain'
import { toH160Hex } from '@/lib/contract-utils'
import { getUser } from '@/lib/db/queries/queries'
import type { User } from '@/lib/db/schema'
import type { Role } from '@/lib/types'

/* -------------------------------------------------------------------------- */
/*                        W A L L E T   H E A D E R                           */
/* -------------------------------------------------------------------------- */

/**
 * Read and validate the forwarded wallet address header.
 * Returns the normalised 0x-prefixed H160 or undefined when absent/invalid.
 */
export async function requireWalletHeader(): Promise<`0x${string}` | undefined> {
  const hdrs = await headers()
  const hdr = hdrs.get(WALLET_HEADER)
  if (!hdr) return undefined

  try {
    return toH160Hex(hdr)
  } catch {
    return undefined
  }
}

/* -------------------------------------------------------------------------- */
/*                           A U T H   G U A R D                              */
/* -------------------------------------------------------------------------- */

/**
 * Server-side page guard.
 * Ensures a wallet-authenticated user exists and, when {@link allowedRoles}
 * is non-empty, that the user’s role is included – otherwise redirects
 * *unless* a valid wallet header is present (pre-session onboarding state).
 *
 * @param allowedRoles  Whitelisted roles (empty = any authenticated user)
 * @returns             The authenticated user record or undefined when a
 *                      wallet header is present without a session.
 */
export async function requireAuth(allowedRoles: readonly Role[] = []): Promise<User> {
  const user = await getUser()

  /* Valid session found — role check */
  if (user) {
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as Role)) {
      redirect('/dashboard')
    }
    return user
  }

  /* Neither session nor wallet header — force login. */
  redirect('/connect-wallet')
}
