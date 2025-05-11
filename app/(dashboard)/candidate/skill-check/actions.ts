'use server'

import { eq } from 'drizzle-orm'

import { openAIAssess } from '@/lib/ai/openai'
import { requireAuth } from '@/lib/auth/guards'
import { PLATFORM_ISSUER_DID } from '@/lib/config'
import { mintCredential } from '@/lib/credential-nft'
import { getPlatformSigner } from '@/lib/platform-signer'
import { db } from '@/lib/db/drizzle'
import { candidates, skillQuizzes } from '@/lib/db/schema/candidate'
import { teams, teamMembers } from '@/lib/db/schema/core'
import { extractAddressFromDid, toBytes32 } from '@/lib/utils/address'

/* -------------------------------------------------------------------------- */
/*                              A C T I O N                                   */
/* -------------------------------------------------------------------------- */

export async function startQuizAction(formData: FormData) {
  const user = await requireAuth(['candidate'])
  if (!user) return { score: 0, message: 'Unauthorized.' }

  /* ---------------------------------------------------------------------- */
  /*                              P A R S I N G                             */
  /* ---------------------------------------------------------------------- */
  const quizIdRaw = formData.get('quizId')
  const answer = formData.get('answer')
  const seedIn = formData.get('seed') as string | null

  const quizId = Number(quizIdRaw)

  if (!quizIdRaw || Number.isNaN(quizId) || !answer) {
    return { score: 0, message: 'Invalid request.' }
  }
  if (!seedIn || !/^0x[0-9a-fA-F]{1,64}$/.test(seedIn)) {
    return { score: 0, message: 'Invalid seed.' }
  }
  const seedHex = seedIn as `0x${string}`

  /* ---------------------------------------------------------------------- */
  /*                    C A N D I D A T E   P R O F I L E                    */
  /* ---------------------------------------------------------------------- */
  let [candidateRow] = await db
    .select()
    .from(candidates)
    .where(eq(candidates.userId, user.id))
    .limit(1)

  if (!candidateRow) {
    const [created] = await db
      .insert(candidates)
      .values({ userId: user.id, bio: '' })
      .returning()
    candidateRow = created
  }

  /* ---------------------------------------------------------------------- */
  /*                          T E A M   D I D                               */
  /* ---------------------------------------------------------------------- */
  const [teamRow] = await db
    .select({ did: teams.did })
    .from(teamMembers)
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, user.id))
    .limit(1)

  const subjectDid = teamRow?.did ?? null
  if (!subjectDid) {
    return {
      score: 0,
      message: 'Please create your team DID before taking a quiz.',
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                            Q U I Z   L O O K U P                       */
  /* ---------------------------------------------------------------------- */
  const [quiz] = await db
    .select()
    .from(skillQuizzes)
    .where(eq(skillQuizzes.id, quizId))
    .limit(1)

  if (!quiz) {
    return { score: 0, message: 'Quiz not found.' }
  }

  /* ---------------------------------------------------------------------- */
  /*                       A I   A S S E S S M E N T                         */
  /* ---------------------------------------------------------------------- */
  const { aiScore } = await openAIAssess(String(answer), quiz.title)
  const passed = aiScore >= 70

  /* ---------------------------------------------------------------------- */
  /*                       V C   C O N S T R U C T I O N                     */
  /* ---------------------------------------------------------------------- */
  const vcPayload = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'SkillPassVC'],
    issuer: PLATFORM_ISSUER_DID,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: subjectDid,
      skillQuiz: quiz.title,
      score: aiScore,
      candidateName: user.name || user.email,
    },
  } as const

  const vcJson = JSON.stringify(vcPayload)
  const vcHashHex = toBytes32(vcJson) as `0x${string}`

  /* ---------------------------------------------------------------------- */
  /*                     P L A T F O R M   M I N T   C A L L                */
  /* ---------------------------------------------------------------------- */
  let txHash: string | undefined
  if (passed) {
    const toAddr = extractAddressFromDid(subjectDid)
    if (!toAddr) {
      return {
        score: aiScore,
        message: 'Failed to derive wallet address from your team DID.',
      }
    }

    const signer = await getPlatformSigner()
    const res = await mintCredential({
      account: signer,
      to: toAddr!,            /* non-null asserted */
      vcHash: vcHashHex,
      uri: '',
    })

    txHash = res.txHash
  }

  /* ---------------------------------------------------------------------- */
  /*                           R E S P O N S E                              */
  /* ---------------------------------------------------------------------- */
  const message = `You scored ${aiScore}. ${passed ? 'You passed!' : 'You failed.'}`

  return {
    score: aiScore,
    message,
    passed,
    txHash,
    vcJson: passed ? vcJson : undefined,
    quizId: quiz.id,
    seed: seedHex,
  }
}