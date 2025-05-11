import { asc, eq } from 'drizzle-orm'
import { Star } from 'lucide-react'

import HighlightsBoard from '@/components/dashboard/candidate/highlights-board'
import ProfileHeader from '@/components/dashboard/candidate/profile-header'
import { AppModal } from '@/components/ui/app-modal'
import PageCard from '@/components/ui/page-card'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import {
  candidateCredentials,
  CredentialCategory,
  candidateHighlights,
  candidates,
} from '@/lib/db/schema/candidate'
import { issuers } from '@/lib/db/schema/issuer'
import { HighlightCredential } from '@/lib/types/components'

export const revalidate = 0

export default async function CandidateHighlightsSettings() {
  const user = await requireAuth(['candidate'])

  const [candRow] = await db
    .select({ id: candidates.id, bio: candidates.bio })
    .from(candidates)
    .where(eq(candidates.userId, user.id))
    .limit(1)

  /* ------------------ Require profile setup ---------------- */
  if (!candRow)
    return (
      <AppModal
        iconKey='userround'
        title='Profile Required'
        description='Please complete your candidate profile before accessing Profile Highlights.'
        buttonText='Complete Profile'
        redirectTo='/candidate/profile'
        required
      />
    )

  /* --------------- Credentials + highlights -------------- */
  const creds = await db
    .select({
      id: candidateCredentials.id,
      title: candidateCredentials.title,
      category: candidateCredentials.category,
      type: candidateCredentials.type,
      fileUrl: candidateCredentials.fileUrl,
      issuerName: issuers.name,
    })
    .from(candidateCredentials)
    .leftJoin(issuers, eq(candidateCredentials.issuerId, issuers.id))
    .where(eq(candidateCredentials.candidateId, candRow.id))
    .orderBy(asc(candidateCredentials.createdAt))

  const hlRows = await db
    .select()
    .from(candidateHighlights)
    .where(eq(candidateHighlights.candidateId, candRow.id))
    .orderBy(asc(candidateHighlights.sortOrder))

  const selectedIds = new Set(hlRows.map((h) => h.credentialId))
  const selectedExperience: HighlightCredential[] = []
  const selectedProject: HighlightCredential[] = []

  hlRows.forEach((h) => {
    const cred = creds.find((c) => c.id === h.credentialId)
    if (!cred) return
    const obj: HighlightCredential = {
      id: cred.id,
      title: cred.title,
      category: cred.category === CredentialCategory.EXPERIENCE ? 'EXPERIENCE' : 'PROJECT',
      type: cred.type,
      issuer: cred.issuerName,
      fileUrl: cred.fileUrl,
    }
    if (cred.category === CredentialCategory.EXPERIENCE) {
      selectedExperience.push(obj)
    } else if (cred.category === CredentialCategory.PROJECT) {
      selectedProject.push(obj)
    }
  })

  const available: HighlightCredential[] = creds
    .filter(
      (c) =>
        (c.category === CredentialCategory.EXPERIENCE ||
          c.category === CredentialCategory.PROJECT) &&
        !selectedIds.has(c.id),
    )
    .map((cred) => ({
      id: cred.id,
      title: cred.title,
      category: cred.category === CredentialCategory.EXPERIENCE ? 'EXPERIENCE' : 'PROJECT',
      type: cred.type,
      issuer: cred.issuerName,
      fileUrl: cred.fileUrl,
    }))

  /* -------------------------- UI ------------------------- */
  return (
    <section className='flex-1 space-y-10'>
      <ProfileHeader
        name={user.name ?? null}
        email={user.email ?? ''}
        avatarSrc={(user as any)?.image ?? undefined}
        profilePath={`/candidates/${candRow.id}`}
        showPublicProfile
      />

      <PageCard
        icon={Star}
        title='Profile Highlights'
        description='Showcase up to 5 credentials each for Experience and Projects.'
      >
        <HighlightsBoard
          selectedExperience={selectedExperience}
          selectedProject={selectedProject}
          available={available}
        />
      </PageCard>
    </section>
  )
}
