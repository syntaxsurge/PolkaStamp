import Image from 'next/image'

import { ArrowRight, Zap, ZapOff } from 'lucide-react'

import { isMobile } from '@/lib/is-mobile'
import { cn } from '@/lib/utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { SubstrateWalletPlatform, allSubstrateWallets } from './wallets'
import { Button } from '../ui/button'
import { DialogFooter } from '../ui/dialog'
import { ViewNavigationProps } from '../ui/multi-view-dialog'

export const ViewSelectWallet = ({ next }: ViewNavigationProps) => {
  const { onToggleExtension, availableExtensions, selectedExtensions } = usePolkadotExtension()

  // only show wallets that are available on the current platform (mobile or browser)
  const systemWallets = allSubstrateWallets
    .filter((wallet) =>
      isMobile()
        ? wallet.platforms.includes(SubstrateWalletPlatform.Android) ||
          wallet.platforms.includes(SubstrateWalletPlatform.iOS)
        : wallet.platforms.includes(SubstrateWalletPlatform.Browser),
    )
    .sort((a, b) =>
      availableExtensions.includes(a.id) ? -1 : availableExtensions.includes(b.id) ? 1 : 0,
    )

  return (
    <div className='flex flex-col gap-2'>
      {systemWallets.map((wallet, index) => {
        const connectedExtension = selectedExtensions.find((ext) => ext.name === wallet.id)
        const isConnected = !!connectedExtension
        const accountCount =
          connectedExtension?.getAccounts().filter((acc) => acc.type === 'sr25519').length ?? 0

        return (
          <Button
            key={index}
            variant='ghost'
            className='relative flex h-14 w-full flex-row items-center justify-between gap-2 [&_svg]:size-auto'
            onClick={() => {
              if (availableExtensions.includes(wallet.id)) {
                onToggleExtension(wallet.id)
              } else {
                window.open(wallet.urls.website, '_blank')
              }
            }}
          >
            <div className='flex flex-row items-center justify-start gap-0'>
              <div
                className={cn(
                  'h-0 w-0 animate-pulse rounded-full bg-green-500 transition-all duration-300 ease-in-out',
                  isConnected && 'mr-2 h-2 w-2',
                )}
              />
              <div className='flex flex-row items-center justify-start gap-2'>
                <Image
                  src={wallet.logoUrls[0]}
                  alt={wallet.name}
                  className='h-[32px] w-[32px]'
                  width={32}
                  height={32}
                />
                <div className='flex flex-col items-start'>
                  <span className='font-bold'>{wallet.name}</span>
                  <span
                    className={cn(
                      'text-muted-foreground overflow-hidden text-xs transition-all duration-300 ease-in-out',
                      isConnected && accountCount > 0 ? 'h-4' : 'h-0',
                    )}
                  >
                    {accountCount} account
                    {accountCount !== 1 ? 's' : ''} available
                  </span>
                </div>
              </div>
            </div>
            <>
              {!availableExtensions.includes(wallet.id) ? (
                'Install'
              ) : isConnected ? (
                <span className='flex flex-row items-center gap-2 text-red-600 dark:text-red-400'>
                  <ZapOff className='h-4 w-4' /> Disconnect
                </span>
              ) : (
                <span className='flex flex-row items-center gap-2 text-green-600 dark:text-green-400'>
                  <Zap className='h-4 w-4' /> Connect
                </span>
              )}
            </>
          </Button>
        )
      })}
      <DialogFooter className='pt-4'>
        <Button
          variant='default'
          onClick={next}
          size='lg'
          disabled={!selectedExtensions.length}
          className='flex flex-row items-center gap-2'
        >
          Go to accounts <ArrowRight className='h-3 w-3' />
        </Button>
      </DialogFooter>
    </div>
  )
}
