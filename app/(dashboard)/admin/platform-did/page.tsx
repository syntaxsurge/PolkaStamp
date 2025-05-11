import { KeyRound } from 'lucide-react'

import PageCard from '@/components/ui/page-card'
import { PLATFORM_ISSUER_DID } from '@/lib/config'

import UpdateDidForm from './update-did-form'

export const revalidate = 0

export default async function PlatformDidPage() {
  return (
    <PageCard
      icon={KeyRound}
      title='Platform DID'
      description='The platform uses this Polkadot DID whenever PolkaStamp itself issues verifiable credentials.'
    >
      <p className='text-muted-foreground mb-6 text-sm'>
        Paste an existing DID or generate a fresh one below. The value is stored in the environment
        file and utilised for credential issuance on the Polkadot network.
      </p>
      <UpdateDidForm defaultDid={PLATFORM_ISSUER_DID} />
    </PageCard>
  )
}
