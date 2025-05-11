'use client'

import { motion } from 'framer-motion'

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const STEPS = [
  'Create account & workspace',
  'Mint did:polkadot identity',
  'Upload & verify credentials',
  'Pass AI skill quizzes',
  'Get discovered by recruiters',
  'Land your dream job',
] as const

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function WorkflowSection() {
  return (
    <section
      id='workflow'
      className='bg-muted/40 relative isolate py-28'
      aria-label='Journey to proof timeline'
    >
      {/* Subtle radial backdrop */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,255,190,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(0,255,190,0.06)_0%,transparent_70%)]' />

      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <header className='mb-16 text-center'>
          <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Journey&nbsp;to&nbsp;Proof
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
            Five&nbsp;simple&nbsp;steps to take you from claim to unimpeachable&nbsp;evidence.
          </p>
        </header>

        <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {STEPS.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className='group'
            >
              <div className='relative rounded-3xl p-[2px]'>
                {/* Gradient outline */}
                <div className='bg-polkastamp-gradient pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40' />

                <div className='bg-background/70 border-border/60 rounded-[inherit] border p-8 shadow-sm backdrop-blur transition-shadow group-hover:shadow-xl'>
                  <span className='border-primary text-primary mb-6 flex size-12 items-center justify-center rounded-full border-2 font-semibold'>
                    {i + 1}
                  </span>
                  <h3 className='text-lg font-semibold'>{step}</h3>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
