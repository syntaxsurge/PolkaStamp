/* -------------------------------------------------------------------------- */
/*              Centralised validation helpers for OpenAI responses           */
/* -------------------------------------------------------------------------- */

/**
 * Structured JSON schema returned by the "Why Hire” recruiter prompt.
 */
export type CandidateFitJson = {
  bullets: string[]
  bestPipeline: string
  pros: string[]
  cons: string[]
}

/* -------------------------------------------------------------------------- */
/*             R E C R U I T E R   F I T   S U M M A R Y   J S O N            */
/* -------------------------------------------------------------------------- */

/**
 * Validate a raw assistant response (string or already-parsed object) for the
 * "Why Hire” prompt. When the payload is a string we first attempt to
 * <code>JSON.parse</code>; any parse failure is surfaced as a validation error.
 *
 * @param input Raw assistant content **or** a previously parsed object.
 * @returns     <code>null</code> when valid, otherwise a descriptive error.
 */
export function validateCandidateFitJson(input: unknown): string | null {
  /* ------------------------- String → JSON parse ------------------------ */
  let payload: any = input
  if (typeof input === 'string') {
    try {
      payload = JSON.parse(input)
    } catch (err: any) {
      return `Unable to parse JSON (${err?.message ?? 'unknown parse error'}).`
    }
  }

  /* ------------------------------ Shape checks --------------------------- */
  if (typeof payload !== 'object' || payload === null) {
    return 'Response is not a JSON object.'
  }

  /* bullets */
  if (!Array.isArray(payload.bullets) || payload.bullets.length !== 5) {
    return '"bullets" must be an array containing exactly 5 items.'
  }
  if (payload.bullets.some((b: any) => typeof b !== 'string' || b.trim().length === 0)) {
    return 'Every "bullets" item must be a non-empty string.'
  }

  /* bestPipeline */
  if (typeof payload.bestPipeline !== 'string' || payload.bestPipeline.trim().length === 0) {
    return '"bestPipeline" must be a non-empty string (or "NONE").'
  }

  /* pros */
  if (!Array.isArray(payload.pros) || payload.pros.length === 0) {
    return '"pros" must be a non-empty string array.'
  }
  if (payload.pros.some((p: any) => typeof p !== 'string' || p.trim().length === 0)) {
    return 'Every "pros" item must be a non-empty string.'
  }

  /* cons */
  if (!Array.isArray(payload.cons) || payload.cons.length === 0) {
    return '"cons" must be a non-empty string array.'
  }
  if (payload.cons.some((c: any) => typeof c !== 'string' || c.trim().length === 0)) {
    return 'Every "cons" item must be a non-empty string.'
  }

  return null
}

/* -------------------------------------------------------------------------- */
/*                       S T R I C T   Q U I Z   G R A D E R                  */
/* -------------------------------------------------------------------------- */

/**
 * Ensure the assistant reply contains exactly one integer in the 0-100 range.
 *
 * @param raw Raw assistant content
 * @returns   <code>null</code> when valid, otherwise descriptive error string.
 */
export function validateQuizScoreResponse(raw: string): string | null {
  const match = raw.match(/-?\d+/)
  if (!match) return 'Response does not contain an integer.'
  const score = parseInt(match[0], 10)
  if (Number.isNaN(score)) return 'Parsed score is NaN.'
  if (score < 0 || score > 100) return 'Score must be between 0 and 100.'
  return null
}
