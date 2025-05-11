import Image from 'next/image'
import Link from 'next/link'

import Github from '@/icons/github.svg'

import { PolkadotLogo } from '../ui/polkadot-logo'

const footerLinks = [
  {
    title: 'Resources',
    links: [
      {
        name: 'Github Repository',
        href: 'https://github.com/niklasp/polkadot-nextjs-starter',
        icon: <Image src={Github} alt='Github' width={16} height={16} />,
      },
      { name: 'Papi docs', href: 'https://papi.how' },
      { name: 'Polkadot docs', href: 'https://docs.polkadot.com/' },
      { name: 'Next.js docs', href: 'https://nextjs.org/docs' },
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
              Polkadot Next.js Starter
            </Link>
            <p className='mt-4 max-w-lg text-sm text-gray-600 dark:text-gray-400'>
              A starter project for building Polkadot dApps with Next.js.
            </p>
          </div>
          {footerLinks.map((category) => (
            <div key={category.title} className='text-left sm:text-right'>
              <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500'>
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
            className='inline-block items-center'
          >
            <PolkadotLogo withPoweredBy={true} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
