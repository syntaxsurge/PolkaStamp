'use client'

import { useEffect, useRef } from 'react'

import { Identicon } from '@polkadot/react-identicon'
import { Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DialogView, MultiViewDialog } from '@/components/ui/multi-view-dialog'
import { toH160Hex } from '@/lib/contract-utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { ViewSelectAccount } from './view-select-account'
import { ViewSelectWallet } from './view-select-wallet'

/* -------------------------------------------------------------------------- */
/*                              P R O P S                                     */
/* -------------------------------------------------------------------------- */

interface WalletSelectProps {
  className?: string
  placeholder?: string
  /** Fires once when a new account is selected (0x-prefixed H160). */
  onAccountSelected?: (address: string) => void
}

/* -------------------------------------------------------------------------- */
/*                             C O M P O N E N T                              */
/* -------------------------------------------------------------------------- */

export function WalletSelect({
  className,
  placeholder = 'Select Wallet',
  onAccountSelected,
}: WalletSelectProps) {
  const { selectedAccount, selectedExtensions } = usePolkadotExtension()

  /* ----------------------- Notify parent once per account --------------- */
  const lastAddressRef = useRef<string | null>(null)

  useEffect(() => {
    if (selectedAccount?.address && selectedAccount.address !== lastAddressRef.current) {
      lastAddressRef.current = selectedAccount.address
      try {
        onAccountSelected?.(toH160Hex(selectedAccount.address))
      } catch {
        /* ignore invalid address */
      }
    }
  }, [selectedAccount?.address, onAccountSelected])

  /* --------------------------- Dialog views ----------------------------- */
  const hasConnectedAccounts = selectedExtensions.some((ext) =>
    ext.getAccounts().some((a) => a.address),
  )

  const views: DialogView[] = [
    {
      title: `Connect Wallets (${selectedExtensions.length} connected)`,
      description:
        "Select a wallet to connect to your account. If you don't have a wallet installed, you can install one from the list.",
      content: ({ next, previous }) => <ViewSelectWallet next={next} previous={previous} />,
    },
    {
      title: 'Select Account',
      description: 'Select an account to use for app interactions',
      content: ({ previous }) => <ViewSelectAccount previous={previous} />,
    },
  ]

  /* ------------------------------ UI ------------------------------------ */
  return (
    <MultiViewDialog
      initialView={hasConnectedAccounts ? 1 : 0}
      trigger={
        <Button
          variant='outline'
          className={['transition-[min-width] duration-300', className].filter(Boolean).join(' ')}
        >
          <Wallet className='h-4 w-4' />
          {!selectedAccount && <span className='ml-1'>{placeholder}</span>}
          {selectedAccount?.name && (
            <span className='ml-1 hidden max-w-[100px] truncate sm:block'>
              {selectedAccount.name}
            </span>
          )}
          {selectedAccount?.address && (
            <Identicon
              value={selectedAccount.address}
              size={30}
              theme='polkadot'
              className='ml-2 shrink-0 [&>svg>circle:first-child]:fill-none'
            />
          )}
        </Button>
      }
      views={views}
    />
  )
}
