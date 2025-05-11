'use client'

import Link from 'next/link'
import * as React from 'react'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { NavItem } from './nav-bar'
import { NavMobile } from './nav-mobile'
import { PolkadotLogo } from '../ui/polkadot-logo'

interface NavMobileControlProps {
  items: NavItem[]
}

export function NavMobileControl({ items }: NavMobileControlProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button variant='ghost' size='icon' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className='size-5' /> : <Menu className='size-5' />}
        <span className='sr-only'>Toggle menu</span>
      </Button>

      <div
        className={`bg-background fixed inset-y-0 right-0 z-50 w-full max-w-xs transform shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex h-16 items-center justify-between border-b pr-2 pl-4'>
          <Link href='/' className='flex flex-col items-end'>
            <PolkadotLogo withPoweredBy={false} />
            <span className='-mt-1.5 mr-1 text-[13px] font-light'>App Starter</span>
          </Link>
          <Button variant='ghost' size='icon' onClick={() => setIsOpen(false)}>
            <X className='size-5' />
            <span className='sr-only'>Close menu</span>
          </Button>
        </div>
        <div className='max-h-[calc(100vh-4rem)] overflow-y-auto'>
          <NavMobile items={items} />
        </div>
      </div>

      {isOpen && (
        <div
          className='bg-background/80 fixed inset-0 z-40 backdrop-blur-sm md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
