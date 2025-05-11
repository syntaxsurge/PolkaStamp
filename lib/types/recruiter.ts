/* -------------------------------------------------------------------------- */
/*                 Recruiter domain-specific shared types                     */
/* -------------------------------------------------------------------------- */

/**
 * Union of recruiter pipeline stages as defined in `lib/constants/recruiter`.
 */
export type Stage = 'sourced' | 'screening' | 'interview' | 'offer'

/**
 * Lightweight recruiter pipeline summary used by forms and dropdown lists.
 */
export interface Pipeline {
  id: number
  name: string
}
