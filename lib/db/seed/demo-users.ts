import { db } from '../drizzle'
import { users, candidates, candidateCredentials } from '../schema'
import { CredentialCategory } from '../schema/candidate'

/* -------------------------------------------------------------------------- */
/*                          D E M O   B U C K E T   C I D                     */
/* -------------------------------------------------------------------------- */

/**
 * All demo credential assets live in this public Apillon bucket.
 * Replace the CID below if you move the files.
 */
const DEMO_BUCKET_CID = 'bafybeigdemoassets'

/* -------------------------------------------------------------------------- */
/*                              D E M O   U S E R S                           */
/* -------------------------------------------------------------------------- */

const DEMO_USERS = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    walletAddress: '0x0000000000000000000000000000000000000001',
    bio: 'Full-stack developer passionate about scalable web applications and open-source communities.',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    walletAddress: '0x0000000000000000000000000000000000000002',
    bio: 'Cloud architect specialising in decentralised solutions, blockchain integration and DevSecOps best practices.',
  },
  {
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    walletAddress: '0x0000000000000000000000000000000000000003',
    bio: 'Front-end engineer focused on crafting accessible UI/UX with React, TypeScript and design systems.',
  },
  {
    name: 'Dana Carter',
    email: 'dana@example.com',
    walletAddress: '0x0000000000000000000000000000000000000004',
    bio: 'Back-end engineer with expertise in micro-services, Node.js and high-throughput database optimisation.',
  },
  {
    name: 'Evan Martinez',
    email: 'evan@example.com',
    walletAddress: '0x0000000000000000000000000000000000000005',
    bio: 'DevOps & SRE automating CI/CD pipelines, Kubernetes infrastructure and observability tooling.',
  },
] as const

/* -------------------------------------------------------------------------- */
/*                         S A M P L E   C R E D E N T I A L S                */
/* -------------------------------------------------------------------------- */

const SAMPLE_CREDENTIALS = [
  {
    title: 'B.Sc. in Computer Science',
    category: CredentialCategory.EDUCATION,
    type: 'degree',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/01.pdf`,
  },
  {
    title: 'M.Sc. in Software Engineering',
    category: CredentialCategory.EDUCATION,
    type: 'degree',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/02.pdf`,
  },
  {
    title: 'AWS Certified Solutions Architect',
    category: CredentialCategory.CERTIFICATION,
    type: 'certification',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/03.pdf`,
  },
  {
    title: 'Google Professional Cloud Architect',
    category: CredentialCategory.CERTIFICATION,
    type: 'certification',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/04.pdf`,
  },
  {
    title: '3 Years Backend Developer at TechCorp',
    category: CredentialCategory.EXPERIENCE,
    type: 'experience',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/05.pdf`,
  },
  {
    title: 'Lead Developer at InnovateX',
    category: CredentialCategory.EXPERIENCE,
    type: 'experience',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/06.pdf`,
  },
  {
    title: 'Full-Stack E-commerce Web App',
    category: CredentialCategory.PROJECT,
    type: 'project',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/07.pdf`,
  },
  {
    title: 'Winner – Hackathon Asia 2024',
    category: CredentialCategory.AWARD,
    type: 'award',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/08.pdf`,
  },
  {
    title: 'Published Paper on AI Optimisation',
    category: CredentialCategory.AWARD,
    type: 'award',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/09.pdf`,
  },
  {
    title: 'Docker Certified Associate',
    category: CredentialCategory.CERTIFICATION,
    type: 'certification',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/10.pdf`,
  },
  {
    title: 'Certified Kubernetes Administrator',
    category: CredentialCategory.CERTIFICATION,
    type: 'certification',
    fileUrl: `ipfs://${DEMO_BUCKET_CID}/11.pdf`,
  },
] as const

/* -------------------------------------------------------------------------- */
/*                                S E E D E R                                 */
/* -------------------------------------------------------------------------- */

export async function seedDemoUsers() {
  console.log('Seeding demo users and credentials…')

  for (const demo of DEMO_USERS) {
    /* ----------------------------- User row ----------------------------- */
    const [user] = await db
      .insert(users)
      .values({
        name: demo.name,
        email: demo.email.toLowerCase(),
        walletAddress: demo.walletAddress,
        role: 'candidate',
      })
      .onConflictDoNothing()
      .returning({ id: users.id })

    if (!user) {
      console.warn(`⚠️  User ${demo.email} already exists; skipping user creation.`)
      continue
    }

    /* --------------------------- Candidate row -------------------------- */
    const [cand] = await db
      .insert(candidates)
      .values({ userId: user.id, bio: demo.bio })
      .onConflictDoNothing()
      .returning({ id: candidates.id })

    if (!cand) {
      console.warn(`⚠️  Candidate profile for ${demo.email} already exists; skipping.`)
      continue
    }

    /* ------------------------- Credential rows -------------------------- */
    const credRows = SAMPLE_CREDENTIALS.map((c) => ({
      candidateId: cand.id,
      category: c.category,
      title: c.title,
      type: c.type,
      fileUrl: c.fileUrl,
    }))

    await db.insert(candidateCredentials).values(credRows)

    console.log(
      `➕  Seeded "${demo.email}" with bio and ${credRows.length} credentials (candidateId=${cand.id})`,
    )
  }

  console.log('✅  Demo-user seeding complete.')
}
