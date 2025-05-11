import OpenAI from 'openai'

import {
  strictGraderMessages,
  summariseProfileMessages,
  candidateFitMessages,
} from '@/lib/ai/prompts'
import { validateCandidateFitJson, validateQuizScoreResponse } from '@/lib/ai/validators'
import { OPENAI_API_KEY } from '@/lib/config'

/* -------------------------------------------------------------------------- */
/*                           S I N G L E T O N   C L I E N T                  */
/* -------------------------------------------------------------------------- */

export const openAiClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

/* -------------------------------------------------------------------------- */
/*                       G E N E R I C   C H A T   W R A P P E R              */
/* -------------------------------------------------------------------------- */

/**
 * Thin wrapper around <code>openAiClient.chat.completions.create</code> with
 * built-in **validation & automatic retry** for non-streaming requests.
 *
 * When <code>stream</code> is <code>true</code> the raw
 * <code>ChatCompletion</code> object is returned untouched.  Otherwise the
 * helper extracts <code>assistant.content</code>, optionally validates it via
 * <code>validate(raw) → string \| null</code> (null = valid) and retries up to
 * <code>maxRetries</code> times before throwing a descriptive error.
 */
export async function chatCompletion<Stream extends boolean = false>(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  {
    model = 'gpt-4o',
    stream = false as Stream,
    validate,
    maxRetries = 1,
    ...opts
  }: Partial<OpenAI.Chat.Completions.ChatCompletionCreateParams> & {
    stream?: Stream
    /** Return <code>null</code> when valid; otherwise error message. */
    validate?: (raw: string) => string | null
    /** Attempts before giving up (only when <code>validate</code> supplied). */
    maxRetries?: number
  } = {},
): Promise<Stream extends true ? OpenAI.Chat.Completions.ChatCompletion : string> {
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured or missing.')

  /* --------------------------- Stream: passthrough --------------------------- */
  if (stream) {
    return (await openAiClient.chat.completions.create({
      model,
      messages,
      stream: true,
      ...opts,
    } as OpenAI.Chat.Completions.ChatCompletionCreateParams)) as any
  }

  /* -------------------- Non-stream: validation + retry ---------------------- */
  let lastError = 'Unknown error'
  const attempts = Math.max(1, maxRetries)

  for (let i = 1; i <= attempts; i++) {
    const completion = (await openAiClient.chat.completions.create({
      model,
      messages,
      ...opts,
    } as OpenAI.Chat.Completions.ChatCompletionCreateParams)) as OpenAI.Chat.Completions.ChatCompletion

    const raw = (completion.choices[0]?.message?.content ?? '').trim()

    if (!validate) {
      // No validation requested – return immediately
      return raw as any
    }

    try {
      const msg = validate(raw)
      if (!msg) return raw as any
      lastError = msg
    } catch (err: any) {
      lastError = err?.message ?? 'Validator threw an exception.'
    }
    /* retry */
  }

  throw new Error(
    `OpenAI returned an invalid response after ${attempts} attempts. ` +
      `Last validation error: ${lastError}`,
  )
}

/* -------------------------------------------------------------------------- */
/*                       Q U I Z   A S S E S S M E N T                        */
/* -------------------------------------------------------------------------- */

export async function openAIAssess(
  answer: string,
  quizTitle: string,
): Promise<{ aiScore: number }> {
  /* Strict grader with auto-validation & up to 3 retries */
  const raw = await chatCompletion(strictGraderMessages(quizTitle, answer), {
    maxRetries: 3,
    validate: validateQuizScoreResponse,
  })

  /* Safe parse (should always succeed after validation) */
  const parsed = parseInt(raw.replace(/[^0-9]/g, ''), 10)
  return { aiScore: parsed }
}

/* -------------------------------------------------------------------------- */
/*                      C A N D I D A T E   P R O F I L E                     */
/* -------------------------------------------------------------------------- */

export async function summariseCandidateProfile(profile: string, words = 120): Promise<string> {
  return await chatCompletion(summariseProfileMessages(profile, words))
}

/* -------------------------------------------------------------------------- */
/*                     R E C R U I T E R   F I T   S U M M A R Y              */
/* -------------------------------------------------------------------------- */

/**
 * Generate a structured "Why Hire this candidate" summary.
 * Validation & retry is delegated to <chatCompletion/>.
 */
export async function generateCandidateFitSummary(
  pipelinesStr: string,
  profileStr: string,
): Promise<string> {
  return await chatCompletion(candidateFitMessages(pipelinesStr, profileStr), {
    maxRetries: 3,
    validate: validateCandidateFitJson,
  })
}
