'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section id='cta' className='relative isolate overflow-hidden px-4 py-32 sm:px-6'>
      <Backdrop />

      <div className='mx-auto max-w-4xl px-4 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-4xl font-extrabold tracking-tight text-balance text-transparent sm:text-5xl md:text-6xl'
        >
          Bring&nbsp;Verifiable&nbsp;Trust&nbsp;to&nbsp;Hiring&nbsp;Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className='mx-auto mt-6 max-w-xl text-lg/relaxed text-white/90'
        >
          Launch your workspace, mint a did:polkadot and start issuing proofs in minutes—no solidity
          knowledge required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className='mt-12'
        >
          <Button
            asChild
            size='lg'
            className='relative isolate overflow-hidden rounded-full bg-white/10 px-8 py-3 font-semibold text-white shadow-xl transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-2xl focus-visible:outline-none'
          >
            <Link href='/connect-wallet'>Get&nbsp;Started</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  BACKDROP                                  */
/* -------------------------------------------------------------------------- */

function Backdrop() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-10'>
      {/* Gradient waves */}
      <div className='bg-polkastamp-gradient animate-slow-pan absolute -inset-20 opacity-60 blur-3xl' />
      {/* Grid overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10' />

      <style jsx global>{`
        @keyframes slow-pan {
          0% {
            transform: translate3d(0%, 0%, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(-20%, -10%, 0) rotate(-4deg);
          }
        }
      `}</style>
    </div>
  )
}
