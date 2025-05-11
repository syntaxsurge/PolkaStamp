import Image from 'next/image'
import Link from 'next/link'

import Github from '@/icons/github.svg'

import { PolkadotLogo } from '../ui/polkadot-logo'

const footerLinks = [
  {
    title: 'Resources',
    links: [
      {
        name: 'GitHub Repo',
        href: 'https://github.com/niklasp/polkadot-nextjs-starter',
        icon: <Image src={Github} alt='GitHub' width={16} height={16} />,
      },
      { name: 'PAPI Docs', href: 'https://papi.how' },
      { name: 'Polkadot Docs', href: 'https://docs.polkadot.com' },
      { name: 'ink! Guide', href: 'https://use.ink' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-black'>
      <div className='container mx-auto px-6 py-8 sm:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div className='col-span-3'>
            <Link href='/' className='text-2xl font-bold dark:text-white'>
              PolkaStamp
            </Link>
            <p className='mt-4 max-w-lg text-sm text-gray-600 dark:text-gray-400'>
              Smart-contract-powered, PAPI-first credential platform built on Polkadot.
            </p>
          </div>
          {footerLinks.map((category) => (
            <div key={category.title} className='text-left sm:text-right'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500'>
                {category.title}
              </h3>
              <ul className='mt-4 space-y-2'>
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='flex gap-2 text-sm text-gray-600 hover:text-gray-900 sm:justify-end dark:text-gray-400 dark:hover:text-gray-300'
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-8 flex w-full flex-col items-center justify-center gap-4 border-t border-gray-200 pt-8 text-center dark:border-gray-800'>
          <Link
            href='https://polkadot.network'
            target='_blank'
            rel='noreferrer'
            className='inline-block items-center'
          >
            <PolkadotLogo withPoweredBy={true} />
          </Link>
        </div>
      </div>
    </footer>
  )
}