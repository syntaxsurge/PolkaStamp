/**
 * Avatar‑related helper functions shared across the code‑base.
 */

export function getAvatarInitials(
  name?: string | null,
  email?: string | null,
  maxChars: number = 2,
): string {
  const safeName = name?.trim() ?? ''

  if (safeName) {
    const parts = safeName.split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
    const initials = (first + last).toUpperCase()
    return initials.slice(0, maxChars) || (email ?? '').slice(0, maxChars).toUpperCase()
  }

  return (email ?? 'U').slice(0, maxChars).toUpperCase()
}
