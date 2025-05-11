import { getEnv } from '@/lib/utils/env'

/* -------------------------------------------------------------------------- */
/*                       E N V I R O N M E N T   C O N F I G                  */
/* -------------------------------------------------------------------------- */

export const OPENAI_API_KEY = getEnv('OPENAI_API_KEY') as string

export const WS_URL = getEnv('NEXT_PUBLIC_WS_URL') as string

/* --------------------------- Core contract addresses ---------------------- */

export const DID_REGISTRY_ADDRESS = getEnv('NEXT_PUBLIC_DID_CONTRACT_ADDRESS', {
  kind: 'address',
}) as `0x${string}`

export const CREDENTIAL_NFT_ADDRESS = getEnv('NEXT_PUBLIC_CREDENTIAL_NFT_CONTRACT_ADDRESS', {
  kind: 'address',
}) as `0x${string}`

export const SUBSCRIPTION_MANAGER_ADDRESS = getEnv('NEXT_PUBLIC_SUBSCRIPTION_MANAGER_CONTRACT_ADDRESS', {
  kind: 'address',
}) as `0x${string}`

/* ----------------------------- Platform config ---------------------------- */

export const PLATFORM_ISSUER_DID = getEnv('NEXT_PUBLIC_PLATFORM_ISSUER_DID') as string