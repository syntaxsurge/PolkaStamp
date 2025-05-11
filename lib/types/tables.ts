import type { ActivityType } from '@/lib/db/schema'

export interface TableProps<T extends Record<string, any>> {
  rows: T[]
  sort: string
  order: 'asc' | 'desc'
  basePath: string
  initialParams: Record<string, string>
  searchQuery: string
  isOwner?: boolean
}

/* --------------------------------------------------------------------- */
/*                            Pagination                                 */
/* --------------------------------------------------------------------- */

export type PageResult<T> = {
  rows: T[]
  hasNext: boolean
}

export interface TablePaginationProps {
  page: number
  hasNext: boolean
  basePath: string
  initialParams: Record<string, string>
  pageSize: number
  pageSizeOptions?: number[]
}

/* --------------------------------------------------------------------- */
/*                         Directory & Public                            */
/* --------------------------------------------------------------------- */

export interface CandidateDirectoryRow {
  id: number
  name: string | null
  email: string
  verified: number
}

/** Internal pipeline listing row used by shared pipelines helper */
export interface PipelineListingRow {
  id: number
  name: string
  description: string | null
  createdAt: string
  recruiterName: string
}

/** Public job listing row */
export interface JobRow {
  id: number
  name: string
  recruiter: string
  description: string | null
  createdAt: string
  /** true when the current candidate already applied */
  applied: boolean
}

/* --------------------------------------------------------------------- */
/*                              Invitations                              */
/* --------------------------------------------------------------------- */

export interface InvitationRow {
  id: number
  team: string
  role: string
  inviter: string | null
  status: string
  invitedAt: Date
}

/* --------------------------------------------------------------------- */
/*                               Pipelines                               */
/* --------------------------------------------------------------------- */

export interface PipelineRow {
  id: number
  name: string
  description: string | null
  createdAt: string
}

/* --------------------------------------------------------------------- */
/*                  Recruiter – Pipeline Entries                         */
/* --------------------------------------------------------------------- */

export interface PipelineEntryRow {
  id: number
  pipelineId: number
  pipelineName: string
  stage: string
  addedAt?: string
}

/* --------------------------------------------------------------------- */
/*                         Admin – Issuer table                          */
/* --------------------------------------------------------------------- */

export interface AdminIssuerRow {
  id: number
  name: string
  domain: string
  owner: string | null
  category: string
  industry: string
  status: string
}

/* --------------------------------------------------------------------- */
/*                Candidate / Recruiter / Admin – Credentials            */
/* --------------------------------------------------------------------- */

export interface CandidateCredentialRow {
  id: number
  title: string
  category?: string
  type?: string
  issuer: string | null
  status: string
  fileUrl?: string | null

  /** On-chain transaction hash (nullable). */
  txHash?: string | null
  vcJson?: string | null
}

/* --------------------------------------------------------------------- */
/*                       Recruiter – Talent Search                       */
/* --------------------------------------------------------------------- */

export interface TalentRow {
  id: number
  name: string | null
  email: string
  bio: string | null
  verified: number
  topScore: number | null
}

/* --------------------------------------------------------------------- */
/*                         Admin – Miscellaneous                         */
/* --------------------------------------------------------------------- */

export interface AdminCredentialRow {
  id: number
  title: string
  candidate: string
  issuer: string | null
  status: string

  vcJson: string | null
}

export interface AdminUserRow {
  id: number
  name: string | null
  email: string
  role: string
  createdAt: string
}

/* --------------------------------------------------------------------- */
/*                       Issuer – Verification Requests                  */
/* --------------------------------------------------------------------- */

export interface IssuerRequestRow {
  id: number
  title: string
  type: string
  candidate: string
  status: string
  vcJson?: string | null
}

/* --------------------------------------------------------------------- */
/*                 Recruiter – Candidate Credentials                     */
/* --------------------------------------------------------------------- */

export interface RecruiterCredentialRow {
  id: number
  title: string
  category: string
  issuer: string | null
  status: string
  fileUrl: string | null
  /** optional on-chain data */
  txHash?: string | null
  vcJson?: string | null
}

/* --------------------------------------------------------------------- */
/*                          Team Settings – Members                      */
/* --------------------------------------------------------------------- */

export interface MemberRow {
  id: number
  name: string
  email: string
  walletAddress?: string | null
  role: string
  joinedAt: string
}

/* --------------------------------------------------------------------- */
/*                        Settings – Activity Logs                       */
/* --------------------------------------------------------------------- */

export interface ActivityLogRow {
  id: number
  type: ActivityType
  ipAddress?: string | null
  timestamp: string
}

/* --------------------------------------------------------------------- */
/*                        Candidate – Skill Passes                       */
/* --------------------------------------------------------------------- */

export interface SkillPassRow {
  id: number
  quizTitle: string
  score: number | null
  maxScore: number | null
  txHash: string | null
  vcJson?: string | null
  createdAt: string
}

/* --------------------------------------------------------------------- */
/*                    Issuer Directory – Issuers                         */
/* --------------------------------------------------------------------- */

export interface IssuerDirectoryRow {
  id: number
  name: string
  domain: string
  category: string
  industry: string
  status: string
  logoUrl?: string | null
  did?: string | null
  createdAt: string
}
