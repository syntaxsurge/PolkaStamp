import { Settings } from 'lucide-react'

import PageCard from '@/components/ui/page-card'
import { requireAuth } from '@/lib/auth/guards'

import GeneralForm from './general-form'

export const revalidate = 0

export default async function GeneralSettingsPage() {
  const user = await requireAuth()

  return (
    <PageCard
      icon={Settings}
      title='Account Information'
      description='Update your name and email address.'
    >
      <GeneralForm defaultName={user.name || ''} defaultEmail={user.email} />
    </PageCard>
  )
}
