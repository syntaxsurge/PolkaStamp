'use client'

import * as React from 'react'
import { useMemo } from 'react'

import { AlertCircle, Loader2 } from 'lucide-react'
import { WsEvent } from 'polkadot-api/ws-provider/web'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { chainConfig } from '@/papi-config'
import { useLightClientApi } from '@/providers/lightclient-api-provider'

export function ChainSelect() {
  const { setActiveChain, activeChain, connectionStatus } = useLightClientApi()

  const Trigger = useMemo(() => {
    if (connectionStatus?.type === WsEvent.ERROR) {
      return (
        <Button variant='ghost' size='icon'>
          <AlertCircle className='h-4 w-4 text-red-500' />
        </Button>
      )
    }

    if (connectionStatus?.type === WsEvent.CONNECTING) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Connecting to the network...</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Button variant='ghost' size='icon'>
        {activeChain?.icon}
      </Button>
    )
  }, [activeChain, connectionStatus])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{Trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Select Chain</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={activeChain?.key}
          onValueChange={(value) => {
            const newChain = chainConfig.find((chain) => chain.key === value)
            if (newChain) {
              setActiveChain(newChain)
            }
          }}
        >
          {chainConfig.map((chain) => (
            <DropdownMenuRadioItem key={chain.key} value={chain.key}>
              {chain.icon}
              {chain.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
