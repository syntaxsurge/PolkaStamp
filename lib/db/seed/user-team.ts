import { and, eq } from 'drizzle-orm'

import { db } from '../drizzle'
import { users, teams, teamMembers } from '../schema'
import {
  candidates,
  candidateCredentials,
  CredentialCategory,
  CredentialStatus,
} from '../schema/candidate'
import { recruiterPipelines } from '../schema/recruiter'

/**
 * Seed core demo users (admin, candidate, issuer, recruiter), give each a
 * personal team they own, and populate demo candidate credentials and recruiter
 * pipelines for showcase pages.
 *
 * Wallet-only authentication means no passwords are stored.
 */
export async function seedUserTeam() {
  console.log('Seeding users, personal teams, candidate profile, credentials and pipelines…')

  /* ---------------------------------------------------------------------- */
  /*                           U S E R   S E T U P                           */
  /* ---------------------------------------------------------------------- */
  const SEED = [
    {
      name: 'Platform Admin',
      email: 'admin@test.com',
      role: 'admin' as const,
      walletAddress: '0x41dccbd49b26c50d34355ed86ff0fa9e489d1e01',
    },
    {
      name: 'Test Candidate',
      email: 'candidate@test.com',
      role: 'candidate' as const,
      walletAddress: '0xa799a942f85792ddc0028a7dd32b582e75d5e57b',
    },
    {
      name: 'Test Issuer',
      email: 'issuer@test.com',
      role: 'issuer' as const,
      walletAddress: '0xe2235a2ffe0354b27a6a1c543be6bf2920ff2134',
    },
    {
      name: 'Test Recruiter',
      email: 'recruiter@test.com',
      role: 'recruiter' as const,
      walletAddress: '0x203aedc6e1ee061f55ec52309d5ac8674d4e8352',
    },
  ]

  const ids = new Map<string, number>() // email → userId

  for (const { name, email, role, walletAddress } of SEED) {
    const lowerEmail = email.toLowerCase()
    let [u] = await db.select().from(users).where(eq(users.email, lowerEmail)).limit(1)

    /* --------------------------- Create / Update ------------------------- */
    if (!u) {
      ;[u] = await db
        .insert(users)
        .values({ name, email: lowerEmail, role, walletAddress })
        .returning()
      console.log(`✅  Created user ${lowerEmail} (${name})`)
    } else {
      const updates: Partial<typeof users.$inferInsert> = {}
      if (u.name !== name) updates.name = name
      if (u.role !== role) updates.role = role
      if (u.walletAddress !== walletAddress) updates.walletAddress = walletAddress
      if (Object.keys(updates).length) {
        await db.update(users).set(updates).where(eq(users.id, u.id))
        console.log(`🔄  Updated user ${lowerEmail} →`, updates)
      } else {
        console.log(`ℹ️  User ${lowerEmail} exists`)
      }
    }
    ids.set(lowerEmail, u.id)

    /* --------------------------- Personal Team --------------------------- */
    const personalName = `${name}'s Team`
    let [teamRow] = await db.select().from(teams).where(eq(teams.name, personalName)).limit(1)

    if (!teamRow) {
      ;[teamRow] = await db
        .insert(teams)
        .values({ name: personalName, creatorUserId: u.id })
        .returning()
      console.log(`✅  Created personal team "${personalName}"`)
    } else {
      console.log(`ℹ️  Personal team for ${lowerEmail} exists`)
    }

    /* ------------------------- Team Membership --------------------------- */
    const existingMember = await db
      .select()
      .from(teamMembers)
      .where(and(eq(teamMembers.teamId, teamRow.id), eq(teamMembers.userId, u.id)))
      .limit(1)

    if (existingMember.length === 0) {
      await db.insert(teamMembers).values({ teamId: teamRow.id, userId: u.id, role: 'owner' })
      console.log(`✅  Added ${lowerEmail} as owner of "${personalName}"`)
    } else {
      if (existingMember[0].role !== 'owner') {
        await db
          .update(teamMembers)
          .set({ role: 'owner' })
          .where(eq(teamMembers.id, existingMember[0].id))
        console.log(`🔧  Updated ${lowerEmail} membership to owner in "${personalName}"`)
      } else {
        console.log(`ℹ️  ${lowerEmail} already owner of "${personalName}"`)
      }
    }
  }

  /* ====================================================================== */
  /*                  D E M O   C A N D I D A T E   D A T A                 */
  /* ====================================================================== */

  /* --------------------- Candidate profile & creds ---------------------- */
  const candidateUserId = ids.get('candidate@test.com')!
  let [cand] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.userId, candidateUserId))
    .limit(1)

  if (!cand) {
    ;[cand] = await db
      .insert(candidates)
      .values({ userId: candidateUserId, bio: 'Motivated developer seeking new challenges.' })
      .returning()
    console.log('✅  Created Candidate profile for Test Candidate')
  } else {
    console.log('ℹ️  Candidate profile already present')
  }

  const existingCreds = await db
    .select({ title: candidateCredentials.title })
    .from(candidateCredentials)
    .where(eq(candidateCredentials.candidateId, cand.id))

  const presentTitles = new Set(existingCreds.map((c) => c.title))

  const DEMO_CREDENTIALS = [
    { title: 'B.Sc. in Computer Science', category: CredentialCategory.EDUCATION, type: 'degree' },
    {
      title: 'Graduate Certificate in Cybersecurity',
      category: CredentialCategory.EDUCATION,
      type: 'certificate',
    },
    {
      title: 'Certified Kubernetes Administrator',
      category: CredentialCategory.CERTIFICATION,
      type: 'certification',
    },
    {
      title: 'AWS Solutions Architect Associate',
      category: CredentialCategory.CERTIFICATION,
      type: 'certification',
    },
    {
      title: 'Docker Certified Associate',
      category: CredentialCategory.CERTIFICATION,
      type: 'certification',
    },
    {
      title: '3 Years Experience as Backend Developer',
      category: CredentialCategory.EXPERIENCE,
      type: 'experience',
    },
    {
      title: 'Senior Backend Developer at TechCorp',
      category: CredentialCategory.EXPERIENCE,
      type: 'experience',
    },
    {
      title: 'React Native Mobile App Project',
      category: CredentialCategory.PROJECT,
      type: 'project',
    },
    {
      title: 'Full-Stack Web Application Portfolio',
      category: CredentialCategory.PROJECT,
      type: 'project',
    },
    {
      title: 'Hackathon Winner: PolkaStamp 2024',
      category: CredentialCategory.AWARD,
      type: 'award',
    },
    {
      title: 'Tech Speaker at JSConf Asia 2024',
      category: CredentialCategory.AWARD,
      type: 'award',
    },
  ] as const

  const credInserts = DEMO_CREDENTIALS.filter((c) => !presentTitles.has(c.title)).map((c) => ({
    candidateId: cand.id,
    category: c.category,
    title: c.title,
    type: c.type,
    status: CredentialStatus.UNVERIFIED,
    verified: false,
  }))

  if (credInserts.length) {
    await db.insert(candidateCredentials).values(credInserts)
    console.log(`➕  Inserted ${credInserts.length} demo credential(s) for Test Candidate`)
  } else {
    console.log('ℹ️  Demo credentials already seeded for Candidate')
  }

  /* ---------------------- Recruiter pipelines --------------------------- */
  const recruiterUserId = ids.get('recruiter@test.com')!
  const existingPipes = await db
    .select({ name: recruiterPipelines.name })
    .from(recruiterPipelines)
    .where(eq(recruiterPipelines.recruiterId, recruiterUserId))

  if (existingPipes.length === 0) {
    const PIPELINES = [
      {
        recruiterId: recruiterUserId,
        name: 'Backend Engineer – May 2025',
        description: 'Building scalable Node.js services on PolkaStamp.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Frontend Engineer – May 2025',
        description: 'React / Next.js role crafting modern UIs for credentialing.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Full-Stack Engineer – May 2025',
        description: 'End-to-end development across our TypeScript stack.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'DevOps Engineer – May 2025',
        description: 'CI/CD, Kubernetes and cloud infrastructure automation.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'QA Engineer – May 2025',
        description: 'Automated testing to ensure product quality and reliability.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Product Manager – May 2025',
        description: 'Define roadmap and champion user-centric product strategy.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Data Engineer – May 2025',
        description: 'Design data pipelines and analytics infrastructure.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Mobile Developer – May 2025',
        description: 'Craft high-performance mobile apps with React Native.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Security Engineer – May 2025',
        description: 'Safeguard platform integrity and perform threat modelling.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'UX Designer – May 2025',
        description: 'Deliver intuitive experiences through research-driven design.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Technical Writer – May 2025',
        description: 'Create clear, concise documentation for developers and users.',
      },
      {
        recruiterId: recruiterUserId,
        name: 'Cloud Architect – May 2025',
        description: 'Design cost-effective, resilient cloud architectures on Polkadot.',
      },
    ]
    await db.insert(recruiterPipelines).values(PIPELINES)
    console.log(`✅  Seeded ${PIPELINES.length} recruiter pipelines for demo jobs`)
  } else {
    console.log('ℹ️  Recruiter pipelines already exist')
  }

  console.log('🎉  Seeding complete.')
}
