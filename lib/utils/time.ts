import { format, formatDistanceToNow } from 'date-fns'

/* -------------------------------------------------------------------------- */
/*                              D A T E   U T I L S                           */
/* -------------------------------------------------------------------------- */

/**
 * Human-friendly relative time string (e.g. "3 minutes ago”, "just now”).
 *
 * @param date JavaScript <code>Date</code> instance
 * @returns    Localised distance string with "ago” / "in” suffix
 */
export function relativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

/* Default pattern: "Apr 9, 2025, 3:27 PM" — customise per call if needed.   */
const DEFAULT_DATE_TIME_FORMAT = 'PPpp'

/**
 * Format an ISO-8601 timestamp (or any <code>Date</code> serialisable value)
 * into a consistent, locale-aware string.
 *
 * @param iso   ISO string, date literal or epoch millisecond value
 * @param fmt   Optional date-fns pattern (defaults to <code>PPpp</code>)
 */
export function formatDateTime(
  iso: string | number | Date,
  fmt: string = DEFAULT_DATE_TIME_FORMAT,
): string {
  return format(new Date(iso), fmt)
}
