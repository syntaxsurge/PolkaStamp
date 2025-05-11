import { Storage } from '@apillon/sdk'
import { sql } from 'drizzle-orm'

import { APILLON_API_KEY, APILLON_API_SECRET } from '@/lib/config'

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

/* -------------------------------------------------------------------------- */
/*                       A P I L L O N   H E A L T H   C H E C K              */
/* -------------------------------------------------------------------------- */

/**
 * Ping Apillon Storage by attempting to list buckets.
 * Returns <code>true</code> when the request succeeds, otherwise <code>false</code>.
 */
export async function isApillonHealthy(): Promise<boolean> {
  try {
    const storage = new Storage({ key: APILLON_API_KEY, secret: APILLON_API_SECRET })
    await storage.listBuckets({ limit: 1 })
    return true
  } catch (err) {
    console.error('Apillon health check failed:', err)
    return false
  }
}
