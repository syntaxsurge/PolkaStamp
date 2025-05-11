'use client'

import { useMemo } from 'react'

import { Identicon } from '@polkadot/react-identicon'

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccountBalance } from '@/hooks/use-account-balance'
import { formatBalance } from '@/lib/format-balance'
import { useLightClientApi } from '@/providers/lightclient-api-provider'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { WalletSelect } from './wallet-select'
import { cn, formatLastUpdated } from '../../lib/utils'

export function AccountBalance() {
  const accountBalance = useAccountBalance()
  const { activeChain } = useLightClientApi()
  const { selectedAccount, isInitializing } = usePolkadotExtension()

  // Safely extract token info or provide sensible defaults
  const tokenDecimals = activeChain?.chainSpec?.properties?.tokenDecimals ?? 12
  const tokenSymbol = activeChain?.chainSpec?.properties?.tokenSymbol ?? 'UNIT'

  // Format the balance for display
  const formattedBalance = useMemo(() => {
    if (accountBalance?.free === undefined) return null

    return formatBalance({
      value: accountBalance.free - accountBalance.frozen,
      decimals: tokenDecimals,
      options: {
        nDecimals: 4,
      },
    })
  }, [accountBalance?.free, accountBalance?.frozen, tokenDecimals])

  // Format the last updated time
  const lastUpdatedText = useMemo(
    () => formatLastUpdated(accountBalance?.lastUpdated),
    [accountBalance?.lastUpdated],
  )

  // Determine the current state
  const isLoading = isInitializing || (selectedAccount && !accountBalance)
  const hasNoAccount = !selectedAccount

  return (
    <Card className={cn('relative flex w-full max-w-sm flex-col', 'rounded-xl border-2')}>
      <CardHeader>
        <CardTitle className='text-muted-foreground text-sm font-medium'>
          Free Balance on {activeChain?.name}
        </CardTitle>
      </CardHeader>
      {isLoading ? (
        <>
          <CardContent>
            <div className='flex min-h-[40px] items-center'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-9 w-9 rounded-full' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-8 w-28' />
              </div>
            </div>
          </CardContent>
          <LastUpdatedFooter lastUpdatedText={null} />
        </>
      ) : hasNoAccount ? (
        <>
          <CardContent className='flex flex-1 items-center justify-center'>
            <WalletSelect className='w-full max-w-sm' placeholder='Select an Account' />
          </CardContent>
          <CardFooter className='pt-1'>
            <div className='text-muted-foreground text-xs'>
              Please select an account to view the balance.
            </div>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent>
            <div className='flex min-h-[40px] items-center'>
              <div className='flex w-full flex-row flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center justify-center gap-2 rounded-full'>
                  <Identicon
                    value={selectedAccount.address}
                    size={36}
                    theme='polkadot'
                    className='[&>svg>circle:first-child]:fill-white'
                  />
                  <div className='font-medium'>{selectedAccount.name}</div>
                </div>
                <div className='text-2xl font-bold'>
                  {formattedBalance} <span className='text-sm font-normal'>{tokenSymbol}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <LastUpdatedFooter lastUpdatedText={lastUpdatedText} />
        </>
      )}
    </Card>
  )
}

// Last updated footer component
function LastUpdatedFooter({ lastUpdatedText }: { lastUpdatedText: string | null }) {
  return (
    <CardFooter>
      <div className='text-muted-foreground flex items-center text-xs'>
        <span>Last updated:</span>
        {lastUpdatedText ? (
          <span className='ml-1'>{lastUpdatedText}</span>
        ) : (
          <Skeleton className='ml-1 h-3 w-12' />
        )}
      </div>
    </CardFooter>
  )
}
