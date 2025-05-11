'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ChevronDown, Menu, X } from 'lucide-react'

import { WalletSelect } from '@/components/account/wallet-select'
import { ChainSelect } from '@/components/chain/chain-select'
import { ModeToggle } from '@/components/theme-toggle'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               NAVIGATION DATA                              */
/* -------------------------------------------------------------------------- */

const LEARN_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'demo', label: 'See PolkaStamp in Action' },
  { id: 'features', label: 'Features' },
  { id: 'deep-dive', label: 'What You Get' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'pricing', label: 'Pricing' },
] as const

const TOOLS_MENU = [
  { href: '/jobs', label: 'Job Openings' },
  { href: '/candidates', label: 'Candidates' },
  { href: '/issuers', label: 'Issuers' },
  { href: '/verify', label: 'Verify' },
  { href: '/balance', label: 'Balance' },
  { href: '/key-converter', label: 'Key Converter' },
] as const

/* -------------------------------------------------------------------------- */
/*                                  HEADER                                    */
/* -------------------------------------------------------------------------- */

export default function SiteHeader() {
  const { userPromise } = useUser()
  const [_currentUser, setCurrentUser] = useState<Awaited<typeof userPromise> | null>(null)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [learnMobileOpen, setLearnMobileOpen] = useState(false)
  const [toolsMobileOpen, setToolsMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) {
      setLearnMobileOpen(false)
      setToolsMobileOpen(false)
    }
  }, [mobileOpen])

  useEffect(() => {
    let mounted = true
    const maybe = userPromise as unknown
    if (maybe && typeof maybe === 'object' && typeof (maybe as any).then === 'function') {
      ;(maybe as Promise<any>).then(
        (u) => mounted && setCurrentUser(u),
        () => mounted && setCurrentUser(null),
      )
    } else {
      setCurrentUser(maybe as Awaited<typeof userPromise>)
    }
    return () => {
      mounted = false
    }
  }, [userPromise])

  function handleNav() {
    setMobileOpen(false)
  }

  return (
    <>
      <header className='border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b shadow-sm backdrop-blur'>
        <div className='mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-4 md:px-6'>
          {/* Brand ------------------------------------------------------------------ */}
          <Link
            href='/'
            className='text-primary flex items-center gap-2 text-lg font-extrabold tracking-tight whitespace-nowrap'
            onClick={handleNav}
          >
            <Image
              src='/images/polkastamp-logo.png'
              alt='PolkaStamp logo'
              width={40}
              height={40}
              priority
              className='h-10 w-auto md:h-8'
            />
            <span className='hidden md:inline'>PolkaStamp</span>
          </Link>

          {/* Desktop nav ------------------------------------------------------------ */}
          <nav className='hidden justify-center gap-6 md:flex'>
            <Link
              href='/'
              className='text-foreground/80 hover:text-foreground text-sm font-medium transition-colors'
            >
              Home
            </Link>

            {/* Learn dropdown */}
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span className='text-foreground/80 hover:text-foreground flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors'>
                  Learn
                  <ChevronDown className='mt-0.5 h-3 w-3' />
                </span>
              </HoverCardTrigger>
              <HoverCardContent side='bottom' align='start' className='w-40 rounded-lg p-2'>
                <ul className='space-y-1'>
                  {LEARN_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/#${s.id}`}
                        className='hover:bg-muted block rounded px-2 py-1 text-sm'
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>

            {/* Tools dropdown */}
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span className='text-foreground/80 hover:text-foreground flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors'>
                  Tools
                  <ChevronDown className='mt-0.5 h-3 w-3' />
                </span>
              </HoverCardTrigger>
              <HoverCardContent side='bottom' align='start' className='w-40 rounded-lg p-2'>
                <ul className='space-y-1'>
                  {TOOLS_MENU.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className='hover:bg-muted block rounded px-2 py-1 text-sm'
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>

            <Link
              href='/pricing'
              className='text-foreground/80 hover:text-foreground text-sm font-medium transition-colors'
            >
              Pricing
            </Link>

            <Link
              href='/dashboard'
              className='text-foreground/80 hover:text-foreground text-sm font-medium transition-colors'
            >
              Dashboard
            </Link>
          </nav>

          {/* Right-aligned controls -------------------------------------------------- */}
          <div className='flex items-center justify-end gap-3'>
            {/* Mobile controls */}
            <div className='flex items-center gap-2 md:hidden'>
              <ModeToggle />
              <ChainSelect />
              <WalletSelect />
            </div>

            {/* Mobile hamburger */}
            <button
              type='button'
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className='flex items-center md:hidden'
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>

            {/* Desktop controls */}
            <div className='hidden items-center gap-3 md:flex'>
              <ModeToggle />
              <ChainSelect />
              <WalletSelect />
            </div>
          </div>
        </div>

        {/* Mobile slide-down menu --------------------------------------------------- */}
        {mobileOpen && (
          <div className='bg-background/95 absolute inset-x-0 top-16 z-40 shadow-lg backdrop-blur md:hidden'>
            <nav className='flex flex-col gap-4 px-4 py-6'>
              <Link href='/' onClick={handleNav} className='text-sm font-medium'>
                Home
              </Link>

              {/* Learn (collapsible) */}
              <div>
                <button
                  type='button'
                  onClick={() => setLearnMobileOpen((o) => !o)}
                  className='flex items-center gap-1 text-sm font-medium'
                >
                  Learn
                  <ChevronDown
                    className={cn('h-3 w-3 transition-transform', learnMobileOpen && 'rotate-180')}
                  />
                </button>
                {learnMobileOpen && (
                  <ul className='mt-2 flex flex-col gap-2 pl-4'>
                    {LEARN_SECTIONS.map((s) => (
                      <li key={s.id}>
                        <Link href={`/#${s.id}`} onClick={handleNav} className='text-sm'>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tools (collapsible) */}
              <div>
                <button
                  type='button'
                  onClick={() => setToolsMobileOpen((o) => !o)}
                  className='flex items-center gap-1 text-sm font-medium'
                >
                  Tools
                  <ChevronDown
                    className={cn('h-3 w-3 transition-transform', toolsMobileOpen && 'rotate-180')}
                  />
                </button>
                {toolsMobileOpen && (
                  <ul className='mt-2 flex flex-col gap-2 pl-4'>
                    {TOOLS_MENU.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href} onClick={handleNav} className='text-sm'>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link href='/pricing' onClick={handleNav} className='text-sm font-medium'>
                Pricing
              </Link>
              <Link href='/dashboard' onClick={handleNav} className='text-sm font-medium'>
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
