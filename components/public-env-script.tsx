import type { ReactElement } from 'react'

/**
 * Serialises every NEXT_PUBLIC_* environment variable on the server and exposes
 * them to the client by attaching an immutable object to `window.__NEXT_PUBLIC_ENV__`.
 */
export default function PublicEnvScript(): ReactElement {
  const publicEnv: Record<string, string> = Object.entries(process.env)
    .filter(([k]) => k.startsWith('NEXT_PUBLIC_'))
    .reduce<Record<string, string>>((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v
      return acc
    }, {})

  const script = `window.__NEXT_PUBLIC_ENV__ = Object.freeze(${JSON.stringify(publicEnv)});`

  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />
}
