'use client'

import {
  InjectedExtension,
  InjectedPolkadotAccount,
  connectInjectedExtension,
  getInjectedExtensions,
} from 'polkadot-api/pjs-signer'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { useRouter } from 'next/navigation'

import { toH160Hex } from '@/lib/contract-utils'
import { WALLET_HEADER } from '@/lib/constants/blockchain'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface ExtensionAccount {
  extension: InjectedExtension
  accounts: InjectedPolkadotAccount[]
}

interface StoredAccount {
  extensionName: string
  address: string
}

/**
 * Context contract for Polkadot extension handling.
 *
 * onAccountChange:  register a one-time listener fired whenever the selected
 *                   account changes; the returned disposer removes the listener.
 */
interface ExtensionContext {
  isInitializing: boolean
  selectedAccount: (InjectedPolkadotAccount & { extension: InjectedExtension }) | null
  setSelectedAccount: (extension: InjectedExtension, account: InjectedPolkadotAccount) => void
  onToggleExtension: (name: string) => Promise<void>
  connectExtension: () => Promise<void>
  availableExtensions: string[]
  selectedExtensions: InjectedExtension[]
  onAccountChange: (listener: (address: string | null) => void) => () => void
}

/* -------------------------------------------------------------------------- */
/*                          I N-M E M O R Y   S T O R E                       */
/* -------------------------------------------------------------------------- */

const EXTENSIONS_STORAGE_KEY = 'polkadot:connected-extensions'
const SELECTED_ACCOUNT_KEY = 'polkadot:selected-extension-account'

function createExtensionsStore() {
  let connected = new Map<string, ExtensionAccount>()
  const subs = new Set<() => void>()
  let busy = false

  /** Trigger React subscribers and persist extension list */
  const notify = () => {
    connected = new Map(connected) // ensure referential change
    localStorage.setItem(EXTENSIONS_STORAGE_KEY, JSON.stringify([...connected.keys()]))
    subs.forEach((cb) => cb())
  }

  const subscribe = (cb: () => void) => {
    subs.add(cb)
    return () => subs.delete(cb)
  }

  /** Connect or disconnect the given extension by name */
  const toggle = async (name: string) => {
    if (busy) return
    busy = true
    try {
      if (connected.has(name)) {
        connected.delete(name)
      } else {
        const ext = await connectInjectedExtension(name)
        const accounts = await ext.getAccounts()
        connected.set(name, { extension: ext, accounts })
      }
      notify()
    } finally {
      busy = false
    }
  }

  /** Restore previously connected extensions from localStorage */
  const reconnectSaved = async () => {
    const raw = localStorage.getItem(EXTENSIONS_STORAGE_KEY)
    if (!raw) return
    const names = JSON.parse(raw) as string[]
    await Promise.all(
      names.map(async (n) => {
        if (connected.has(n)) return
        try {
          const ext = await connectInjectedExtension(n)
          const accounts = await ext.getAccounts()
          connected.set(n, { extension: ext, accounts })
        } catch (err) {
          console.warn(`Failed to reconnect ${n}:`, err)
        }
      }),
    )
    notify()
  }

  return {
    subscribe,
    getSnapshot: () => connected,
    // IMPORTANT: return cached reference to prevent infinite re-render loops
    getServerSnapshot: () => connected,
    toggle,
    reconnectSaved,
  }
}

const extStore = createExtensionsStore()

/* -------------------------------------------------------------------------- */
/*                              R E A C T   C T X                             */
/* -------------------------------------------------------------------------- */

export const ExtensionContext = createContext<ExtensionContext | null>(null)

/**
 * Provider which supplies extension state to the app.
 * Fires registered listeners whenever the active account changes.
 * Also handles real-time sign-out when the wallet disconnects.
 */
export function ExtensionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  /* ----------------------- Local state & refs --------------------------- */
  const [isInitializing, setIsInitializing] = useState(true)
  const [availableExtensions, setAvailableExtensions] = useState<string[]>([])
  const [selectedAccount, _setSelectedAccount] =
    useState<(InjectedPolkadotAccount & { extension: InjectedExtension }) | null>(null)

  /** Listener registry for selected-account changes */
  const listenersRef = useRef<Set<(addr: string | null) => void>>(new Set())

  /* ------------------------- Helper setters ----------------------------- */
  const setSelectedAccount = (
    extension: InjectedExtension,
    account: InjectedPolkadotAccount,
  ) => {
    _setSelectedAccount({ ...account, extension })
    const payload = tryNormalise(account.address)
    localStorage.setItem(
      SELECTED_ACCOUNT_KEY,
      JSON.stringify({ extensionName: extension.name, address: account.address } as StoredAccount),
    )
    listenersRef.current.forEach((fn) => fn(payload))
  }

  /** Register account-change listener; return disposer */
  const onAccountChange = useCallback((fn: (addr: string | null) => void) => {
    listenersRef.current.add(fn)
    return () => listenersRef.current.delete(fn)
  }, [])

  /* ---------------------- Connected-extension map ----------------------- */
  const connectedExtensions = useSyncExternalStore(
    extStore.subscribe,
    extStore.getSnapshot,
    extStore.getServerSnapshot,
  )

  /* ----------------------- Convenience helpers -------------------------- */
  const connectExtension = useCallback(async () => {
    if (availableExtensions.length === 0)
      throw new Error('No browser extensions detected.')
    await extStore.toggle(availableExtensions[0])
  }, [availableExtensions])

  /** Attempt to restore a previously selected account */
  const restoreSelectedAccount = useCallback(() => {
    const json = localStorage.getItem(SELECTED_ACCOUNT_KEY)
    if (!json) return
    try {
      const stored = JSON.parse(json) as StoredAccount
      const extData = connectedExtensions.get(stored.extensionName)
      if (!extData) return
      const account = extData.accounts.find((a) => a.address === stored.address)
      if (account) _setSelectedAccount({ ...account, extension: extData.extension })
    } catch (err) {
      console.warn('Failed to restore stored account:', err)
      localStorage.removeItem(SELECTED_ACCOUNT_KEY)
    }
  }, [connectedExtensions])

  /* ----------------------------- Effects -------------------------------- */
  useEffect(() => {
    ;(async () => {
      const joined = (await getInjectedExtensions()).join(',')
      setAvailableExtensions(joined ? joined.split(',') : [])
      await extStore.reconnectSaved()
      setIsInitializing(false)
    })()
  }, [])

  /* Restore once extensions ready */
  useEffect(() => {
    if (connectedExtensions.size > 0) restoreSelectedAccount()
  }, [connectedExtensions, restoreSelectedAccount])

  /* Clear selectedAccount if its extension disconnects */
  useEffect(() => {
    if (selectedAccount && !connectedExtensions.has(selectedAccount.extension.name)) {
      _setSelectedAccount(null)
      localStorage.removeItem(SELECTED_ACCOUNT_KEY)
      listenersRef.current.forEach((fn) => fn(null))
    }
  }, [connectedExtensions, selectedAccount])

  /* ---------------------- Sign-out on disconnect ------------------------ */
  const prevAddrRef = useRef<string | null>(null)

  useEffect(() => {
    const current = selectedAccount ? tryNormalise(selectedAccount.address) : null
    const prev = prevAddrRef.current

    /** Helper to POST signout and clear header */
    const doSignOut = async () => {
      try {
        await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' })
      } catch {
        /* network failure ignored */
      }
      sessionStorage.removeItem(WALLET_HEADER)
    }

    if (prev && !current) {
      /* Wallet disconnected entirely */
      doSignOut().finally(() => {
        router.replace('/connect-wallet')
      })
    } else if (prev && current && prev !== current) {
      /* Switched to a different account – invalidate old session */
      doSignOut().finally(() => {
        sessionStorage.setItem(WALLET_HEADER, current)
        router.refresh()
      })
    }

    prevAddrRef.current = current
  }, [selectedAccount, router])

  /* --------------------------- Render ----------------------------------- */
  return (
    <ExtensionContext.Provider
      value={{
        isInitializing,
        selectedAccount,
        setSelectedAccount,
        onToggleExtension: extStore.toggle,
        connectExtension,
        availableExtensions,
        selectedExtensions: [...connectedExtensions.values()].map((e) => e.extension),
        onAccountChange,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                           P U B L I C   H O O K S                          */
/* -------------------------------------------------------------------------- */

export function usePolkadotExtension() {
  const ctx = useContext(ExtensionContext)
  if (!ctx) throw new Error('usePolkadotExtension must be used inside ExtensionProvider')
  return ctx
}

/**
 * Returns the currently selected wallet address in 0x-prefixed H160 form,
 * or null when no account is selected.
 */
export function useSelectedAddress(): `0x${string}` | null {
  const { selectedAccount } = usePolkadotExtension()
  return selectedAccount ? tryNormalise(selectedAccount.address) : null
}

/* -------------------------------------------------------------------------- */
/*                                helpers                                     */
/* -------------------------------------------------------------------------- */

function tryNormalise(addr: string): `0x${string}` | null {
  try {
    return toH160Hex(addr)
  } catch {
    return null
  }
}