import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

import type { NewUser } from '@/lib/db/schema'
import { SESSION_COOKIE } from '@/lib/constants/auth'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type SessionData = {
  wallet: string
  expires: string
}

/* -------------------------------------------------------------------------- */
/*                                  CONFIG                                    */
/* -------------------------------------------------------------------------- */

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

/* -------------------------------------------------------------------------- */
/*                               T O K E N S                                  */
/* -------------------------------------------------------------------------- */

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key)
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload as SessionData
}

/* -------------------------------------------------------------------------- */
/*                              S E S S I O N                                 */
/* -------------------------------------------------------------------------- */

export async function getSession() {
  const session = (await cookies()).get(SESSION_COOKIE)?.value
  if (!session) return null
  return await verifyToken(session)
}

export async function setSession(user: NewUser) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session: SessionData = {
    wallet: user.walletAddress,
    expires: expiresInOneDay.toISOString(),
  }
  const encryptedSession = await signToken(session)

  /* Use Secure cookies only in production so development (HTTP) refreshes
     still include the session and avoid unwanted redirects. */
  const isProd = process.env.NODE_ENV === 'production'

  ;(await cookies()).set(SESSION_COOKIE, encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/', // ensure cookie is sent on all routes
  })
}