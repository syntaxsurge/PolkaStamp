'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

export function PolkadotLogo({ withPoweredBy = false }: { withPoweredBy?: boolean }) {
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return 'Powered by Polkadot'

  const logo =
    theme === 'dark'
      ? '/images/Polkadot_Logo_Horizontal_Pink_White.svg'
      : '/images/Polkadot_Logo_Horizontal_Pink_Black.svg'

  return (
    <div className='flex items-center'>
      {withPoweredBy && <span className='text-sm font-light'>Powered by</span>}
      <Image src={logo} alt='Polkadot Logo' width={100} height={28} />
    </div>
  )
}
