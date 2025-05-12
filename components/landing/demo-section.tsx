'use client'

import Link from 'next/link'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { ExternalLink, PlayCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Embed = {
  key: string
  title: string
  src: string
  link: string
}

const EMBEDS: Embed[] = [
  {
    key: 'video',
    title: '2-Minute Product Tour',
    src: 'https://www.youtube.com/embed/B-0lPOdbbsw',
    link: '/demo-video',
  },
  {
    key: 'deck',
    title: 'Investor Deck',
    src: 'https://www.canva.com/design/xxxxxxx/view?embed',
    link: '/pitch-deck',
  },
]

export default function DemoSection() {
  const [active, setActive] = useState<Embed>(EMBEDS[0])

  return (
    <section id='demo' className='bg-muted/50 py-32'>
      <div className='mx-auto max-w-5xl px-4'>
        <header className='mb-12 text-center'>
          <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            See&nbsp;PolkaStamp&nbsp;in&nbsp;Action
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg/relaxed'>
            Watch a rapid demo or skim the deck—no signup required.
          </p>
        </header>

        {/* Toggle buttons */}
        <div className='mb-8 flex justify-center gap-4'>
          {EMBEDS.map((e) => (
            <Button
              key={e.key}
              variant={active.key === e.key ? 'default' : 'outline'}
              onClick={() => setActive(e)}
              className='flex items-center gap-2'
            >
              {e.key === 'video' && <PlayCircle className='h-4 w-4' />}
              {e.title}
            </Button>
          ))}
        </div>

        {/* Embed card */}
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card className='overflow-hidden rounded-3xl shadow-xl'>
            <CardHeader className='bg-background/80 flex flex-row items-center justify-between gap-4 p-6 backdrop-blur'>
              <CardTitle className='text-lg font-semibold'>{active.title}</CardTitle>
              <Button asChild variant='ghost' size='icon' className='h-8 w-8'>
                <Link href={active.link} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='h-4 w-4' />
                  <span className='sr-only'>Open in new tab</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='relative w-full overflow-hidden' style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={active.src}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  loading='lazy'
                  className='absolute inset-0 h-full w-full border-0'
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
