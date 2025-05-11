'use client'

import { motion } from 'framer-motion'
import { UserCheck, Search, Building2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ROLES = [
  {
    icon: UserCheck,
    title: 'Candidates',
    intro: 'Own your narrative.',
    bullets: ['Immutable résumé', 'AI SkillPass', 'Portable wallet bio'],
  },
  {
    icon: Search,
    title: 'Recruiters',
    intro: 'Trust at first sight.',
    bullets: ['Proof-based search', 'Kanban pipelines', 'Fit GPT summaries'],
  },
  {
    icon: Building2,
    title: 'Issuers',
    intro: 'Verify once, trust everywhere.',
    bullets: ['Domain attestations', 'Batch signatures', 'Real-time revocation'],
  },
] as const

export default function DeepDiveSection() {
  return (
    <section id='deep-dive' className='bg-muted/40 relative isolate py-32'>
      <div className='mx-auto max-w-6xl px-4'>
        <header className='text-center'>
          <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Tailored&nbsp;Value
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
            Three personas, one shared ledger of&nbsp;truth.
          </p>
        </header>

        <ul className='mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {ROLES.map(({ icon: Icon, title, intro, bullets }) => (
            <motion.li
              key={title}
              whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className='group perspective-1000'
            >
              <div className='relative rounded-3xl p-[2px]'>
                <div className='bg-polkastamp-gradient pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40' />
                <Card className='bg-background/80 rounded-[inherit] backdrop-blur'>
                  <CardHeader className='flex flex-col items-center gap-4 py-10 text-center'>
                    <div className='bg-polkastamp-gradient inline-flex size-16 items-center justify-center rounded-full text-white shadow-lg'>
                      <Icon className='h-8 w-8' />
                    </div>
                    <CardTitle className='text-foreground text-2xl'>{title}</CardTitle>
                    <p className='text-muted-foreground max-w-xs text-sm'>{intro}</p>
                  </CardHeader>
                  <CardContent className='grid gap-3 px-10 pb-10'>
                    {bullets.map((b) => (
                      <p key={b} className='text-muted-foreground flex items-start text-sm'>
                        <span className='bg-primary mt-1 mr-2 size-1.5 shrink-0 rounded-full' />
                        {b}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
