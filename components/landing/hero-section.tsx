'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, BadgeCheck, CloudLightning, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { icon: BadgeCheck, label: 'Verifiable Proofs' },
  { icon: Shield, label: 'Polkadot-Grade Security' },
  { icon: CloudLightning, label: 'Instant Issuance' },
] as const

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  /* Parallax transform helpers */
  const rotateX = useTransform(mouseY, [0, 1], [8, -8])
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8])
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    mouseX.set(x)
    mouseY.set(y)
  }

  /* Pre-generate particle positions so they stay stable between renders */
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 4 + 2,
        d: Math.random() * 15 + 8,
      })),
    [],
  )

  return (
    <section
      id='hero'
      onMouseMove={handleMouseMove}
      className='relative isolate -mt-16 flex min-h-[90dvh] flex-col justify-center overflow-hidden px-4 pt-40 pb-32 text-center sm:px-6 lg:px-0'
    >
      <GradientBackdrop />
      <Particles points={particles} />

      {/* Copy block ------------------------------------------------------ */}
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className='relative z-10 mx-auto max-w-4xl'
      >
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-5xl leading-tight font-extrabold tracking-tight text-balance text-transparent drop-shadow md:text-6xl lg:text-7xl'
        >
          Trustless Hiring on{' '}
          <span className='text-polkastamp-gradient animate-polkastamp-gradient'>Polkadot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
          className='mx-auto mt-6 max-w-2xl text-lg/relaxed text-white/90 sm:text-xl'
        >
          PolkaStamp turns résumés into on-chain proofs secured by Polkadot so every hire starts
          with <em>verifiable trust</em>.
        </motion.p>

        {/* Features ------------------------------------------------------ */}
        <ul className='mt-10 flex flex-wrap items-center justify-center gap-4 font-medium'>
          {FEATURES.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className='inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md'
            >
              <Icon className='h-5 w-5 text-amber-300' />
              {label}
            </motion.li>
          ))}
        </ul>

        {/* CTAs ---------------------------------------------------------- */}
        <div className='mt-12 flex flex-wrap justify-center gap-4'>
          <GradientButton href='/connect-wallet'>Launch&nbsp;App</GradientButton>
          <GradientButton href='/#pricing' tone='outline'>
            View&nbsp;Pricing
          </GradientButton>
        </div>
      </motion.div>

      {/* Scroll hint ----------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className='absolute bottom-10 left-1/2 -translate-x-1/2 md:block'
      >
        <ArrowDown className='h-8 w-8 animate-bounce text-white' />
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                               BACKDROP                                     */
/* -------------------------------------------------------------------------- */

function GradientBackdrop() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-10'>
      {/* Angled gradient sweep */}
      <div className='bg-polkastamp-gradient absolute inset-0 -rotate-6 opacity-40 blur-3xl md:opacity-60' />
      {/* Top glow */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25)_0%,transparent_70%)]' />
      {/* Dark overlay for contrast */}
      <div className='absolute inset-0 bg-black/60 mix-blend-multiply' />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                PARTICLES                                   */
/* -------------------------------------------------------------------------- */

type Particle = { x: number; y: number; s: number; d: number }

function Particles({ points }: { points: Particle[] }) {
  return (
    <div className='pointer-events-none absolute inset-0 -z-10'>
      {points.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${p.d}s`,
          }}
          className='absolute animate-[pulse_4s_linear_infinite] rounded-full bg-white/70 opacity-0'
        />
      ))}

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
        }
      `}</style>
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
