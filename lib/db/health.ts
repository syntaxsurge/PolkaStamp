import { sql } from 'drizzle-orm'

import { db } from './drizzle'

/**
 * Lightweight "SELECT 1” probe.
 * Returns <code>true</code> when the connection succeeds, otherwise <code>false</code>.
 * All logging stays here so callers can decide how to react.
 */
export async function isDatabaseHealthy(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`)
    return true
  } catch (err) {
    console.error('Database health check failed:', err)
    return false
  }
}
