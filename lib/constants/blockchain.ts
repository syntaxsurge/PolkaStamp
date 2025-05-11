import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";

/**
 * Name of the HTTP header used to forward the selected wallet address
 * during the pre-session phase of authentication.
 */
export const WALLET_HEADER = "polkadot-wallet";

/**
 * Generic `InjectedPolkadotAccount` implementation for server-side
 * read-only calls where a signature is not required.
 */
export const SERVER_CALLER =
  { address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" } as unknown as InjectedPolkadotAccount;