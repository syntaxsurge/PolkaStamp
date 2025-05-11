import type { Pipeline, Stage } from './recruiter'

/* -------------------------------------------------------------------------- */
/*                                 A C T I O N                                */
/* -------------------------------------------------------------------------- */

/** Minimal success / error envelope returned by server actions. */
export interface ActionState {
  error?: string
  success?: string
}

/** DID-specific action state used by platform-DID mutations. */
export interface DidActionState extends ActionState {
  did?: string
}

/* -------------------------------------------------------------------------- */
/*                              C O M P O N E N T S                           */
/* -------------------------------------------------------------------------- */

/** Props for the admin → platform-DID update form. */
export interface UpdateDidFormProps {
  /** Current DID pulled from the environment (may be null). */
  defaultDid: string | null
}

/** Props for the admin → user-edit modal form. */
export interface EditUserFormProps {
  id: number
  defaultName: string | null
  defaultEmail: string
  defaultRole: string
  onDone: () => void
}

/** Props for the recruiter → "add to pipeline” inline form. */
export interface AddToPipelineFormProps {
  candidateId: number
  pipelines: Pipeline[]
}

/** Props for the candidate dashboard → "add credential” form. */
export interface AddCredentialFormProps {
  /** Server action invoked on submit. */
  addCredentialAction: (formData: FormData) => Promise<{ error?: string } | void>
}

/** Props for the account settings → general details form. */
export interface GeneralFormProps {
  defaultName: string
  defaultEmail: string
}

/** Props for the pricing page subscription submit button. */
export interface SubmitButtonProps {
  /** 1 = Base, 2 = Plus (matches on-chain enum) */
  planKey: 1 | 2
  /** Plan price in wei */
  priceWei: bigint
}

/** Props for the recruiter board → stage-update inline form. */
export interface UpdateStageFormProps {
  pipelineCandidateId: number
  initialStage: Stage
}
