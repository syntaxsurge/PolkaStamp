'use client'

import Image from 'next/image'

import Identicon from '@polkadot/react-identicon'
import { ArrowLeft } from 'lucide-react'

import { isMobile } from '@/lib/is-mobile'
import { trimAddress } from '@/lib/utils/address'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { SubstrateWalletPlatform, allSubstrateWallets } from './wallets'
import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'
import { ViewNavigationProps } from '../ui/multi-view-dialog'

export function ViewSelectAccount({ previous }: ViewNavigationProps) {
  const { selectedExtensions, setSelectedAccount, availableExtensions, selectedAccount } =
    usePolkadotExtension()

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
    <>
      <div className='scroll-shadows flex max-h-[60vh] min-h-[100px] flex-col gap-2 overflow-y-scroll'>
        {selectedExtensions.map((extension) => {
          const logoUrl = systemWallets.find((wallet) => wallet.id === extension.name)?.logoUrls[0]

          return (
            <div key={extension.name}>
              {extension
                .getAccounts()
                .filter((account) => account.type === 'sr25519')
                .map((account) => (
                  <DialogClose asChild key={account.address}>
                    <Button
                      variant={
                        selectedAccount?.address === account.address &&
                        selectedAccount?.extension.name === extension.name
                          ? 'secondary'
                          : 'ghost'
                      }
                      className='flex h-auto w-full flex-row items-center justify-start gap-2 px-2'
                      onClick={() => {
                        setSelectedAccount(extension, account)
                      }}
                    >
                      <div className='relative inline-block'>
                        {logoUrl && (
                          <div className='border-background bg-background absolute right-0 bottom-0 z-10 h-6 w-6 overflow-hidden rounded-full border-2 shadow-md'>
                            <Image src={logoUrl} alt={extension.name} width={32} height={32} />
                          </div>
                        )}
                        <div className='border-background relative h-12 w-12 overflow-hidden rounded-full'>
                          <Identicon
                            value={account.address}
                            size={64}
                            theme='polkadot'
                            className='h-12 w-12 [&>svg]:!h-full [&>svg]:!w-full [&>svg>circle:first-child]:fill-none'
                          />
                        </div>
                      </div>
                      <div className='flex flex-col items-start justify-start'>
                        <span className='font-bold'>{account.name}</span>
                        {account.address && <div>{trimAddress(account.address)}</div>}
                      </div>
                    </Button>
                  </DialogClose>
                ))}
            </div>
          )
        })}
      </div>
      <DialogFooter className='pt-4'>
        <Button variant='outline' onClick={previous} className='flex flex-row items-center gap-2'>
          <ArrowLeft className='h-3 w-3' /> Back to wallet selection
        </Button>
      </DialogFooter>
    </>
  )
}
