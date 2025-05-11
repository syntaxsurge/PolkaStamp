'use client'

import { useEffect, useRef, useState } from 'react'

import { WsEvent } from 'polkadot-api/ws-provider/web'
import type { Subscription } from 'rxjs'

import { useLightClientApi } from '@/providers/lightclient-api-provider'

export function useBlockNumber() {
  const { client, connectionStatus } = useLightClientApi()
  const [blockNumber, setBlockNumber] = useState<number | null>(null)
  const subscription = useRef<Subscription | null>(null)

  useEffect(() => {
    if (client && connectionStatus?.type === WsEvent.CONNECTED) {
      subscription.current = client.finalizedBlock$.subscribe((value) => {
        setBlockNumber(value.number)
      })
    }

    return () => {
      subscription.current?.unsubscribe()
      subscription.current = null
      setBlockNumber(null)
    }
  }, [client, connectionStatus?.type])

  return blockNumber
}
