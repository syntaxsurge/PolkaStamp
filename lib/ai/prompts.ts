/**
 * Lightweight message object shape accepted by the OpenAI chat API.
 * (Avoids importing OpenAI types here to prevent circular dependencies.)
 */
export type PromptMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/* -------------------------------------------------------------------------- */
/*                              Q U I Z  G R A D E R                          */
/* -------------------------------------------------------------------------- */

/**
 * Build the message array used by the AI quiz-grader.
 *
 * @param quizTitle Title of the quiz being graded.
 * @param answer    Candidate’s free-text answer.
 */
export function strictGraderMessages(quizTitle: string, answer: string): PromptMessage[] {
  return [
    {
      role: 'system',
      content: 'You are a strict exam grader. Respond ONLY with an integer 0-100.',
    },
    {
      role: 'user',
      content: `Quiz topic: ${quizTitle}\nCandidate answer: ${answer}\nGrade (0-100):`,
    },
  ]
}

/* -------------------------------------------------------------------------- */
/*                        P R O F I L E   S U M M A R Y                       */
/* -------------------------------------------------------------------------- */

/**
 * Build the message array used to summarise a raw candidate profile.
 *
 * @param profile Raw profile text.
 * @param words   Approximate word budget (default 120).
 */
export function summariseProfileMessages(profile: string, words = 120): PromptMessage[] {
  return [
    {
      role: 'system',
      content:
        `Summarise the following candidate profile in approximately ${words} words. ` +
        `Write in third-person professional tone without using personal pronouns.`,
    },
    {
      role: 'user',
      content: profile,
    },
  ]
}

/* -------------------------------------------------------------------------- */
/*                R E C R U I T E R   " W H Y   H I R E ”  P R O M P T       */
/* -------------------------------------------------------------------------- */

/**
 * Craft a comprehensive multi-step prompt that asks the LLM to:
 *   1. List exactly five 12-word bullets explaining why the candidate suits the role(s).
 *   2. Recommend the single best pipeline (job opening) from the recruiter’s list, or "NONE”.
 *   3. Provide concise pros and cons to aid quick screening decisions.
 * The model must respond with **valid JSON** matching the schema shown so the frontend
 * can parse deterministically.
 *
 * @param pipelines      Joined string of ≤20 pipeline name/description pairs.
 * @param candidateText  Raw candidate profile text (bio + credential highlights).
 */
export function candidateFitMessages(pipelines: string, candidateText: string): PromptMessage[] {
  const schema = `{
  "bullets":  [ "string (exactly 12 words)", 5 items ],
  "bestPipeline": "string | NONE",
  "pros":    [ "string", … ],
  "cons":    [ "string", … ]
}`

  return [
    {
      role: 'system',
      content:
        `You are an elite technical recruiter assistant with deep knowledge of skill\n` +
        `match-making, talent branding and concise executive communication.  Follow ALL rules\n` +
        `strictly:\n` +
        `• Think step-by-step but output *only* the final JSON (no markdown, no commentary).\n` +
        `• Each "bullets" item MUST contain exactly 12 words; start with an action verb.\n` +
        `• Use the recruiter’s pipelines to choose "bestPipeline"; if none fit, return "NONE".\n` +
        `• Focus on evidence from credentials/bio; do not invent facts.\n` +
        `• Obey the output schema below verbatim.\n\n` +
        `Output schema:\n${schema}`,
    },
    {
      role: 'user',
      content:
        `=== Recruiter Pipelines (max 20) ===\n${pipelines}\n\n` +
        `=== Candidate Profile ===\n${candidateText}\n\n` +
        `Return the JSON now:`,
    },
  ]
}
