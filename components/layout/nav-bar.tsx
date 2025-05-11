import Link from 'next/link'

import { ChevronDown } from 'lucide-react'

import { NavMobileControl } from './nav-mobile-control'
import { ThemeToggle } from './theme-toggle'
import { WalletSelect } from '../account/wallet-select'
import { ChainSelect } from '../chain/chain-select'
import { PolkadotLogo } from '../ui/polkadot-logo'

export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Credential NFT',
    href: '/credential',
  },
  {
    title: 'DID Registry',
    href: '/did',
  },
  {
    title: 'Subscription Manager',
    href: '/subscription',
  },
]

export function NavBar() {
  return (
    <header className='sticky top-0 z-50 w-full'>
      <div className='from-background via-background/50 to-background/0 absolute inset-0 -z-10 h-16 bg-gradient-to-b backdrop-blur-sm' />
      <div className='flex h-16 items-center justify-between px-6 sm:px-8'>
        <div className='flex w-full items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex flex-col items-end'>
            <PolkadotLogo withPoweredBy={false} />
            <span className='-mt-1.5 mr-1 text-[10px] font-light sm:text-[13px]'>App Starter</span>
          </Link>

          {/* Mobile menu control */}
          <div className='flex items-center gap-2 md:hidden'>
            <ThemeToggle />
            <ChainSelect />
            <WalletSelect />
            <NavMobileControl items={navItems} />
          </div>

          {/* Desktop navigation */}
          <nav className='absolute left-1/2 hidden -translate-x-1/2 md:flex md:flex-1'>
            <ul className='flex gap-6'>
              {navItems.map((item) => (
                <li key={item.title} className='group relative'>
                  {item.items && item.items.length > 0 ? (
                    <div className='flex cursor-pointer items-center gap-1 py-2 text-sm'>
                      {item.title}
                      <ChevronDown className='size-4 transition-transform duration-200 group-hover:rotate-180' />
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className='flex cursor-pointer items-center gap-1 py-2 text-sm'
                    >
                      {item.title}
                    </Link>
                  )}

                  {item.items && item.items.length > 0 && (
                    <div className='bg-background invisible absolute top-full left-1/2 z-50 min-w-[180px] -translate-x-1/2 rounded-md border p-2 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100'>
                      <div className='flex flex-col space-y-1'>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href || '#'}
                            className='hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5 text-sm'
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side */}
          <div className='hidden items-center gap-1 md:flex'>
            <ThemeToggle />
            <ChainSelect />
            <WalletSelect />
          </div>
        </div>
      </div>
    </header>
  )
}
