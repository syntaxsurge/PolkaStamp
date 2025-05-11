import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-6'>
      <div className='flex flex-col items-center gap-6 text-center'>
        {/* Brand logo */}
        <Image
          src='/images/polkastamp-logo.png'
          alt='PolkaStamp logo'
          width={96}
          height={96}
          priority
          className='h-16 w-auto'
        />

        {/* Headline */}
        <h1 className='text-4xl font-extrabold tracking-tight'>404 &mdash; Page Not Found</h1>

        {/* Description */}
        <p className='text-muted-foreground max-w-md text-sm'>
          Oops! The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>

        {/* Back home */}
        <Link href='/' passHref>
          <Button size='sm'>Go Home</Button>
        </Link>
      </div>
    </main>
  )
}
