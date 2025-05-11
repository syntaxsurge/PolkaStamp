'use client'

import { localnode } from '@polkadot-api/descriptors'
import type { TypedApi } from 'polkadot-api'

import localnodeChainSpec from '@/chains/localnode.json' assert { type: 'json' }
import { logos } from '@/icons/logos'

export interface ChainSpec {
  name: string
  id: string
  chainType: string
  bootNodes: string[]
  telemetryEndpoints: string[] | null
  protocolId: string | null
  properties: {
    tokenDecimals: number
    tokenSymbol: string
  } | null
  relay_chain?: string
  para_id?: number
  codeSubstitutes?: Record<string, string>
  genesis: {
    stateRootHash: string
    raw?: unknown
  }
}

export interface ChainConfig {
  key: string
  name: string
  descriptors: typeof localnode
  endpoints: string[]
  explorerUrl?: string
  icon?: React.ReactNode
  chainSpec: ChainSpec
  relayChainSpec?: ChainSpec
}

export type AvailableApis = TypedApi<typeof localnode>

export const chainConfig: ChainConfig[] = [
  {
    key: 'localnode',
    name: 'Local Node',
    descriptors: localnode,
    endpoints: ['ws://127.0.0.1:9944'],
    icon: logos.polkadot,
    chainSpec: localnodeChainSpec as ChainSpec,
  },
]
