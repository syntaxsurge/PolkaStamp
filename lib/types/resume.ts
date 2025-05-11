import type { CredentialStatus } from '@/lib/db/schema/candidate'

/* -------------------------------------------------------------------------- */
/*                                Résumé Types                                */
/* -------------------------------------------------------------------------- */

/**
 * Normalised candidate profile used by the PDF generator and
 * the <code>/api/candidates/:id/resume</code> endpoint.
 */
export interface ResumeData {
  name: string
  email: string
  /** Optional profile bio/summary. */
  bio?: string | null
  credentials: {
    title: string
    issuer: string | null
    status: CredentialStatus
  }[]
  experiences: { title: string; company: string | null }[]
  projects: { title: string; link?: string | null }[]
}
