'use client'

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'

import { createClient, PolkadotClient } from 'polkadot-api'
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat'
import { getSmProvider } from 'polkadot-api/sm-provider'
import type { Client as SmoldotClient } from 'polkadot-api/smoldot'
import {
  getWsProvider,
  WsEvent,
  type StatusChange,
  type WsJsonRpcProvider,
} from 'polkadot-api/ws-provider/web'

import { type ChainConfig, type AvailableApis, chainConfig } from '@/papi-config'

interface LightClientApiProviderType {
  connectionStatus: StatusChange | undefined
  activeChain: ChainConfig
  setActiveChain: (chain: ChainConfig) => void
  client: PolkadotClient | null
  api: AvailableApis | null
}

const LightClientApiContext = createContext<LightClientApiProviderType | undefined>(undefined)

export function LightClientApiProvider({
  children,
  defaultChain = chainConfig[0],
}: {
  children: React.ReactNode
  defaultChain?: ChainConfig
}) {
  const smoldotRef = useRef<SmoldotClient | null>(null)
  const wsProviderRef = useRef<WsJsonRpcProvider | null>(null)

  const [activeChain, setActiveChainState] = useState<ChainConfig>(defaultChain)
  const [activeApi, setActiveApi] = useState<AvailableApis | null>(null)
  const [client, setClient] = useState<PolkadotClient | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<StatusChange | undefined>(undefined)

  /** Destroys any existing providers & clients */
  const tearDown = () => {
    client?.destroy()
    smoldotRef.current?.terminate()
    smoldotRef.current = null
    wsProviderRef.current = null
    setClient(null)
    setActiveApi(null)
  }

  /** Starts a Smoldot light client worker */
  const startSmoldotWorker = () =>
    import('polkadot-api/smoldot/from-worker').then(({ startFromWorker }) =>
      startFromWorker(
        new Worker(new URL('polkadot-api/smoldot/worker', import.meta.url), {
          type: 'module',
        }),
        { forbidWs: true },
      ),
    )

  /** Initialise a client for the provided chain configuration */
  const initializeClient = useCallback(async (chain: ChainConfig) => {
    tearDown()

    try {
      /* ---------- LOCAL NODE (WS RPC provider) ---------- */
      if (chain.key === 'localnode') {
        setConnectionStatus({
          type: WsEvent.CONNECTING,
          uri: chain.endpoints[0] ?? 'ws://127.0.0.1:9944',
        })

        const wsProvider = getWsProvider(chain.endpoints, setConnectionStatus)
        wsProviderRef.current = wsProvider

        const rpcClient = createClient(withPolkadotSdkCompat(wsProvider))
        const typedApi = rpcClient.getTypedApi(chain.descriptors)

        setClient(rpcClient)
        setActiveApi(typedApi)
        setActiveChainState(chain)

        return
      }

      /* ---------- REMOTE OR PUBLIC CHAINS (Smoldot) ---------- */
      setConnectionStatus({ type: WsEvent.CONNECTING, uri: 'via lightclient' })

      smoldotRef.current = await startSmoldotWorker()

      let smChain: Awaited<ReturnType<SmoldotClient['addChain']>>
      if (chain.relayChainSpec) {
        const relay = await smoldotRef.current.addChain({
          chainSpec: JSON.stringify(chain.relayChainSpec),
        })
        smChain = await smoldotRef.current.addChain({
          chainSpec: JSON.stringify(chain.chainSpec),
          potentialRelayChains: [relay],
        })
      } else {
        smChain = await smoldotRef.current.addChain({
          chainSpec: JSON.stringify(chain.chainSpec),
        })
      }

      const lcClient = createClient(getSmProvider(smChain))
      const typedApi = lcClient.getTypedApi(chain.descriptors)

      setClient(lcClient)
      setActiveApi(typedApi)
      setActiveChainState(chain)

      setConnectionStatus({ type: WsEvent.CONNECTED, uri: 'via lightclient' })
    } catch (error) {
      console.error('Failed to connect', error)
      setConnectionStatus({ type: WsEvent.ERROR, event: error })
    }
  }, [])

  useEffect(() => {
    initializeClient(defaultChain)
    return () => tearDown()
  }, [defaultChain])

  return (
    <LightClientApiContext.Provider
      value={{
        connectionStatus,
        api: activeApi,
        client,
        activeChain,
        setActiveChain: initializeClient,
      }}
    >
      {children}
    </LightClientApiContext.Provider>
  )
}

export function useLightClientApi() {
  const context = useContext(LightClientApiContext)
  if (!context) {
    throw new Error('useLightClientApi must be used within a LightClientApiProvider')
  }
  return context
}
