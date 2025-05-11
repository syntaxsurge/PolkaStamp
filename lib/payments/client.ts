'use client'

/**
 * Notify the backend that an on-chain subscription payment succeeded so it
 * can update the team’s plan and expiry time.
 *
 * @param planKey 1 = Base, 2 = Plus
 * @returns       true if the sync completed without a network/server error
 */
export async function syncSubscription(planKey: number): Promise<boolean> {
  try {
    const res = await fetch('/api/subscription/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planKey }),
      cache: 'no-store',
    })
    return res.ok
  } catch {
    /* swallow – caller handles UX refresh anyway */
    return false
  }
}
