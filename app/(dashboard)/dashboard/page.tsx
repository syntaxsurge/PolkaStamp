import { and, eq, desc } from 'drizzle-orm'
import {
  BadgeCheck,
  Award,
  FolderKanban,
  Users,
  Mail,
  CheckCircle,
  User2,
  Building2,
  ShieldCheck,
} from 'lucide-react'

import AdminCharts from '@/components/dashboard/admin/charts'
import CandidateCharts from '@/components/dashboard/candidate/charts'
import IssuerCharts from '@/components/dashboard/issuer/charts'
import RecruiterCharts from '@/components/dashboard/recruiter/charts'
import { RoleBadge } from '@/components/dashboard/role-badge'
import { Card, CardContent } from '@/components/ui/card'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import {
  candidates,
  candidateCredentials,
  CredentialStatus,
  quizAttempts,
} from '@/lib/db/schema/candidate'
import { users, teams } from '@/lib/db/schema/core'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'
import { recruiterPipelines, pipelineCandidates } from '@/lib/db/schema/recruiter'
import type { Role } from '@/lib/types'

export const revalidate = 0

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function DashboardPage() {
  const user = await requireAuth()

  /* ------------------------------------------------------------------ */
  /* Candidate metrics & datasets                                       */
  /* ------------------------------------------------------------------ */
  let verifiedCount = 0
  let skillPassCount = 0
  let scoreData: { date: string; score: number }[] = []
  let statusData: { name: string; value: number }[] = []

  if (user.role === 'candidate') {
    const [candidateRow] = await db
      .select()
      .from(candidates)
      .where(eq(candidates.userId, user.id))
      .limit(1)

    if (candidateRow) {
      /* Verified credentials */
      const credRows = await db
        .select({ status: candidateCredentials.status })
        .from(candidateCredentials)
        .where(eq(candidateCredentials.candidateId, candidateRow.id))

      const statusCounter: Record<string, number> = {}
      credRows.forEach((r) => {
        statusCounter[r.status] = (statusCounter[r.status] || 0) + 1
      })

      statusData = Object.entries(statusCounter).map(([name, value]) => ({ name, value }))
      verifiedCount = statusCounter[CredentialStatus.VERIFIED] ?? 0

      /* Skill-quiz scores (last 10) */
      const attempts = await db
        .select({ score: quizAttempts.score, createdAt: quizAttempts.createdAt })
        .from(quizAttempts)
        .where(eq(quizAttempts.candidateId, candidateRow.id))
        .orderBy(desc(quizAttempts.createdAt))
        .limit(10)

      scoreData = attempts
        .map((a) => ({ date: a.createdAt.toISOString().split('T')[0], score: a.score ?? 0 }))
        .reverse()

      skillPassCount = attempts.filter((a) => (a.score ?? 0) >= 70).length
    }
  }

  /* ------------------------------------------------------------------ */
  /* Recruiter metrics & datasets                                       */
  /* ------------------------------------------------------------------ */
  let pipelineTotal = 0
  let uniqueCandidates = 0
  let stageData: { stage: string; count: number }[] = []

  if (user.role === 'recruiter') {
    const pipelines = await db
      .select()
      .from(recruiterPipelines)
      .where(eq(recruiterPipelines.recruiterId, user.id))
    pipelineTotal = pipelines.length

    const pcRows = await db
      .select({ stage: pipelineCandidates.stage, candidateId: pipelineCandidates.candidateId })
      .from(pipelineCandidates)
      .leftJoin(recruiterPipelines, eq(pipelineCandidates.pipelineId, recruiterPipelines.id))
      .where(eq(recruiterPipelines.recruiterId, user.id))

    const stageCounter: Record<string, number> = {}
    const candidateSet = new Set<number>()
    pcRows.forEach((r) => {
      stageCounter[r.stage] = (stageCounter[r.stage] || 0) + 1
      candidateSet.add(r.candidateId)
    })
    uniqueCandidates = candidateSet.size
    stageData = Object.entries(stageCounter).map(([stage, count]) => ({ stage, count }))
  }

  /* ------------------------------------------------------------------ */
  /* Issuer metrics & datasets                                          */
  /* ------------------------------------------------------------------ */
  let pendingReq = 0
  let issuedCreds = 0

  if (user.role === 'issuer') {
    const [issuer] = await db
      .select()
      .from(issuers)
      .where(eq(issuers.ownerUserId, user.id))
      .limit(1)

    if (issuer) {
      pendingReq = (
        await db
          .select()
          .from(candidateCredentials)
          .where(
            and(
              eq(candidateCredentials.issuerId, issuer.id),
              eq(candidateCredentials.status, CredentialStatus.PENDING),
            ),
          )
      ).length

      issuedCreds = (
        await db
          .select()
          .from(candidateCredentials)
          .where(
            and(
              eq(candidateCredentials.issuerId, issuer.id),
              eq(candidateCredentials.status, CredentialStatus.VERIFIED),
            ),
          )
      ).length
    }
  }

  /* ------------------------------------------------------------------ */
  /* Admin metrics & datasets                                           */
  /* ------------------------------------------------------------------ */
  let totalUsers = 0
  let totalTeams = 0
  let pendingIssuers = 0
  let totalCredentials = 0

  /* Charts data */
  let usersByRoleData: { name: string; value: number }[] = []
  let issuerStatusData: { name: string; value: number }[] = []
  let credentialStatusData: { name: string; value: number }[] = []

  if (user.role === 'admin') {
    /* Basic counts */
    const userRows = await db.select({ role: users.role }).from(users)
    totalUsers = userRows.length
    totalTeams = (await db.select().from(teams)).length

    /* Users by role */
    const roleCounter: Record<string, number> = {}
    userRows.forEach((r) => {
      roleCounter[r.role] = (roleCounter[r.role] || 0) + 1
    })
    usersByRoleData = Object.entries(roleCounter).map(([name, value]) => ({ name, value }))

    /* Issuer statuses */
    const issuerRows = await db.select({ status: issuers.status }).from(issuers)
    const issuerCounter: Record<string, number> = {}
    issuerRows.forEach((r) => {
      issuerCounter[r.status] = (issuerCounter[r.status] || 0) + 1
    })
    issuerStatusData = Object.entries(issuerCounter).map(([name, value]) => ({ name, value }))
    pendingIssuers = issuerCounter[IssuerStatus.PENDING] ?? 0

    /* Credentials */
    const credRows = await db
      .select({ status: candidateCredentials.status })
      .from(candidateCredentials)
    totalCredentials = credRows.length
    const credCounter: Record<string, number> = {}
    credRows.forEach((r) => {
      credCounter[r.status] = (credCounter[r.status] || 0) + 1
    })
    credentialStatusData = Object.entries(credCounter).map(([name, value]) => ({ name, value }))
  }

  /* ------------------------------------------------------------------ */
  /* Metric definitions                                                 */
  /* ------------------------------------------------------------------ */
  const metrics: Record<
    string,
    { title: string; value: number; icon: React.ComponentType<any> }[]
  > = {
    candidate: [
      { title: 'Verified Credentials', value: verifiedCount, icon: BadgeCheck },
      { title: 'AI Skill Passes', value: skillPassCount, icon: Award },
    ],
    recruiter: [
      { title: 'Pipelines', value: pipelineTotal, icon: FolderKanban },
      { title: 'Unique Candidates', value: uniqueCandidates, icon: Users },
    ],
    issuer: [
      { title: 'Pending Requests', value: pendingReq, icon: Mail },
      { title: 'Credentials Signed', value: issuedCreds, icon: CheckCircle },
    ],
    admin: [
      { title: 'Total Users', value: totalUsers, icon: User2 },
      { title: 'Total Teams', value: totalTeams, icon: Building2 },
      { title: 'Pending Issuers', value: pendingIssuers, icon: ShieldCheck },
      { title: 'Total Credentials', value: totalCredentials, icon: Award },
    ],
  }

  /* ------------------------------------------------------------------ */
  /* JSX                                                                */
  /* ------------------------------------------------------------------ */
  return (
    <section className='space-y-12'>
      {/* Greeting */}
      <Card className='overflow-hidden'>
        <CardContent className='p-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='space-y-1'>
              <h1 className='text-3xl leading-tight font-extrabold tracking-tight'>
                Welcome back, <span className='break-all'>{user.name || user.email}</span>
              </h1>
              <p className='text-muted-foreground text-sm'>
                Your personalised PolkaStamp workspace overview.
              </p>
            </div>

            <RoleBadge role={user.role as Role} />
          </div>
        </CardContent>
      </Card>

      {/* Metric cards */}
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:[grid-template-columns:repeat(auto-fit,_minmax(220px,_1fr))]'>
        {metrics[user.role]?.map((m) => (
          <MetricCard key={m.title} title={m.title} value={m.value} Icon={m.icon} />
        ))}
      </div>

      {/* Insights / charts */}
      {user.role === 'candidate' && (
        <CandidateCharts scoreData={scoreData} statusData={statusData} />
      )}

      {user.role === 'recruiter' && (
        <RecruiterCharts stageData={stageData} uniqueCandidates={uniqueCandidates} />
      )}

      {user.role === 'issuer' && <IssuerCharts pending={pendingReq} verified={issuedCreds} />}

      {user.role === 'admin' && (
        <AdminCharts
          usersData={usersByRoleData}
          issuerData={issuerStatusData}
          credentialData={credentialStatusData}
        />
      )}
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 HELPERS                                    */
/* -------------------------------------------------------------------------- */

type MetricProps = {
  title: string
  value: number
  Icon: React.ComponentType<{ className?: string }>
}

function MetricCard({ title, value, Icon }: MetricProps) {
  return (
    <Card className='relative overflow-hidden shadow-sm transition-shadow hover:shadow-lg'>
      {/* Decorative background icon */}
      <Icon
        className='text-primary/10 pointer-events-none absolute right-2 bottom-2 h-20 w-20'
        aria-hidden='true'
      />

      <CardContent className='relative z-10 p-4'>
        <p className='text-muted-foreground text-sm font-medium'>{title}</p>
        <p className='text-4xl font-extrabold tracking-tight'>{value}</p>
      </CardContent>
    </Card>
  )
}
