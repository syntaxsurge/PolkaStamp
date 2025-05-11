import { toH160Hex } from '../contract-utils'

export type EnvKind = 'string' | 'number' | 'address'

/* Detect browser runtime to avoid referencing Node APIs on the client */
const isBrowser = typeof window !== 'undefined'

/**
 * Read and validate an environment variable.
 *
 * In the browser we first look for the key inside `window.__NEXT_PUBLIC_ENV__`,
 * which is hydrated at runtime via <PublicEnvScript>. This removes the need to
 * inline public variables during the build step while still allowing secret
 * server-only vars to throw when missing.
 */
export function getEnv(
  name: string,
  { kind = 'string', optional = false }: { kind?: EnvKind; optional?: boolean } = {},
): string | number | undefined {
  let raw: string | undefined

  if (isBrowser) {
    raw = window.__NEXT_PUBLIC_ENV__?.[name] ?? process.env[name]
  } else {
    raw = process.env[name]
  }

  /* Skip hard failure on the client – secrets are server-only */
  if ((raw === undefined || raw === '') && !optional) {
    if (isBrowser) return undefined
    throw new Error(`Environment variable ${name} is not set`)
  }
  if (raw === undefined || raw === '') return undefined

  switch (kind) {
    case 'number': {
      const num = Number(raw)
      if (Number.isNaN(num)) throw new Error(`${name} is not a valid number`)
      return num
    }
    case 'address':
      try {
        return toH160Hex(raw)
      } catch {
        throw new Error(`${name} is not a valid 0x address`)
      }
    default:
      return raw
  }
}
