import { eq } from 'drizzle-orm'
import { User } from 'lucide-react'

import ProfileHeader from '@/components/dashboard/candidate/profile-header'
import PageCard from '@/components/ui/page-card'
import { requireAuth } from '@/lib/auth/guards'
import { db } from '@/lib/db/drizzle'
import { candidates } from '@/lib/db/schema/candidate'

import ProfileForm from './profile-form'

export const revalidate = 0

export default async function ProfilePage() {
  const user = await requireAuth(['candidate'])

  const [candidate] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.userId, user.id))
    .limit(1)

  const profilePath = candidate ? `/candidates/${candidate.id}` : undefined
  const showPublicProfile = !!candidate

  return (
    <section className='mx-auto max-w-5xl space-y-10'>
      <ProfileHeader
        name={user.name ?? null}
        email={user.email ?? ''}
        avatarSrc={(user as any)?.image ?? undefined}
        profilePath={profilePath}
        showPublicProfile={showPublicProfile}
      />

      <PageCard
        icon={User}
        title='Edit Profile'
        description='Present yourself professionally to recruiters.'
      >
        <ProfileForm
          defaultName={user.name || ''}
          defaultBio={candidate?.bio || ''}
          defaultTwitterUrl={candidate?.twitterUrl || ''}
          defaultGithubUrl={candidate?.githubUrl || ''}
          defaultLinkedinUrl={candidate?.linkedinUrl || ''}
          defaultWebsiteUrl={candidate?.websiteUrl || ''}
        />
      </PageCard>
    </section>
  )
}
