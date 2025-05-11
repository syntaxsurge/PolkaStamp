'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Wallet, ShieldCheck, Key, HardDrive } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Upgradeable ink! Contracts',
    description: 'Ship new credential logic without redeploying addresses or breaking proofs.',
  },
  {
    icon: Wallet,
    title: 'One-Click Wallet Login',
    description: 'Works with any Polkadot wallet—desktop, mobile or in-browser light client.',
  },
  {
    icon: Key,
    title: 'did:polkadot Identities',
    description: 'Deterministic on-chain IDs bind issuers, teams and credentials together.',
  },
  {
    icon: CheckCircle2,
    title: 'Provable Credential NFTs',
    description: 'Every verified credential mints an ERC-721 NFT with immutable provenance.',
  },
  {
    icon: HardDrive,
    title: 'File permanence on IPFS',
    description:
      'All credential files are stored on Apillon-backed IPFS, guaranteeing tamper-proof access.',
  },
] as const

export default function FeaturesSection() {
  return (
    <section id='features' className='bg-background py-24'>
      <div className='mx-auto max-w-6xl px-4 text-center'>
        <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Built&nbsp;for&nbsp;Proof
        </h2>

        <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className='group border-border/60 bg-background/70 relative overflow-hidden rounded-2xl border p-8 backdrop-blur'
            >
              <div className='bg-polkastamp-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-15' />
              <div className='relative z-10 flex flex-col items-center'>
                <div className='bg-polkastamp-gradient mb-4 inline-flex size-12 items-center justify-center rounded-full text-white shadow-lg'>
                  <Icon className='h-6 w-6' />
                </div>
                <h3 className='text-foreground text-lg font-semibold'>{title}</h3>
                <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
