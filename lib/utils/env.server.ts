import fs from 'fs/promises'
import path from 'path'

/**
 * Add or update a KEY=value entry in the project’s .env file (server only).
 *
 * NOTE: This file is suffixed with <code>.server</code> so that Next.js excludes it
 * from client bundles. Always import directly from
 * <code>@/lib/utils/env.server</code> when calling <code>upsertEnv</code>.
 */
export async function upsertEnv(key: string, value: string): Promise<void> {
  const ENV_PATH = path.resolve(process.cwd(), '.env')

  let contents = ''
  try {
    contents = await fs.readFile(ENV_PATH, 'utf8')
  } catch {
    /* .env does not exist yet – will be created */
  }

  const lines = contents.split('\n')
  const pattern = new RegExp(`^${key}=.*$`)
  let found = false

  const newLines = lines.map((ln) => {
    if (pattern.test(ln)) {
      found = true
      return `${key}=${value}`
    }
    return ln
  })

  if (!found) newLines.push(`${key}=${value}`)

  await fs.writeFile(ENV_PATH, newLines.join('\n'), 'utf8')
}
