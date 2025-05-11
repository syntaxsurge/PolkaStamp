'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { motion } from 'framer-motion'
import { BadgeCheck, CloudLightning, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { icon: BadgeCheck, label: 'Smart-Contract Proofs' },
  { icon: CloudLightning, label: 'PAPI&nbsp;Light&nbsp;Client' },
  { icon: Shield, label: 'Confidential&nbsp;Deploys' },
] as const

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  /* Evenly-spaced orbiting nodes */
  const nodes = useMemo(() => Array.from({ length: 12 }, (_, i) => i * (360 / 12)), [])

  return (
    <section
      id='hero'
      className='relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-40'
      aria-label='Introduction'
    >
      <GradientBackdrop />

      {/* Content grid */}
      <div className='mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2'>
        {/* Copy block ------------------------------------------------------ */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='text-balance text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl'
          >
            Verifiable&nbsp;Credentials&nbsp;on&nbsp;
            <span className='text-polkastamp-gradient animate-polkastamp-gradient'>
              Polkadot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
            className='mt-6 max-w-xl text-lg/relaxed text-white/90 sm:text-xl'
          >
            PolkaStamp&nbsp;fuses ink! contracts, PAPI light clients and Apillon confidential
            compute so every credential you issue is provable, portable and upgrade-safe.
          </motion.p>

          {/* Features ------------------------------------------------------ */}
          <ul className='mt-10 flex flex-wrap gap-3'>
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md'
              >
                <Icon className='h-5 w-5 text-amber-300' />
                <span dangerouslySetInnerHTML={{ __html: label }} />
              </motion.li>
            ))}
          </ul>

          {/* CTAs ---------------------------------------------------------- */}
          <div className='mt-12 flex flex-wrap gap-4'>
            <GradientButton href='/connect-wallet'>Launch&nbsp;App</GradientButton>
            <GradientButton href='/#pricing' tone='outline'>
              View&nbsp;Pricing
            </GradientButton>
          </div>
        </div>

        {/* Visual block ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className='relative mx-auto size-[22rem] lg:mx-0'
        >
          {/* Central nucleus */}
          <span className='bg-polkastamp-gradient absolute left-1/2 top-1/2 z-10 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl' />

          {/* Orbiting nodes */}
          <div className='absolute inset-0 animate-spin-slow'>
            {nodes.map((deg) => (
              <span
                key={deg}
                style={{ transform: `rotate(${deg}deg) translateX(9rem)` }}
                className='absolute left-1/2 top-1/2 -ml-1 -mt-1 size-3 rounded-full bg-white'
              />
            ))}
          </div>

          {/* Outer ring */}
          <span className='border-primary/20 dark:border-primary/30 absolute inset-0 rounded-full border-2' />
        </motion.div>
      </div>

      {/* Decorative grid overlay */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]' />

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 18s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                               BACKDROP                                     */
/* -------------------------------------------------------------------------- */

function GradientBackdrop() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-20'>
      {/* Angled sweep */}
      <div className='bg-polkastamp-gradient absolute -inset-10 -rotate-3 opacity-40 blur-3xl md:opacity-60' />
      {/* Dark overlay for contrast */}
      <div className='absolute inset-0 bg-black/65 mix-blend-multiply' />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                             GRADIENT BUTTON                                */
/* -------------------------------------------------------------------------- */

type GradientButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'variant' | 'asChild'
> & {
  href: string
  tone?: 'solid' | 'outline'
}

function GradientButton({
  href,
  children,
  tone = 'solid',
  className,
  ...props
}: GradientButtonProps) {
  const solid = tone === 'solid'
  return (
    <Button
      asChild
      size='lg'
      className={cn(
        'relative isolate overflow-hidden rounded-full px-8 py-3 font-semibold shadow-xl transition-transform duration-200 focus-visible:outline-none',
        solid
          ? 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-2xl'
          : 'ring-border bg-white/10 text-white/90 ring-1 backdrop-blur hover:bg-white/20 hover:text-white',
        className,
      )}
      {...props}
    >
      <Link href={href}>
        <span className='relative z-10 flex items-center gap-2'>{children}</span>
        {solid && (
          <span
            aria-hidden='true'
            className='bg-polkastamp-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />
        )}
      </Link>
    </Button>
  )
}