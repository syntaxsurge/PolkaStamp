import { contracts } from "@polkadot-api/descriptors";
import { getInkClient } from "polkadot-api/ink";
import { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";

import {
  h160Binary,
  isEmpty,
  safeDecode,
  hash32Binary,
} from "./contract-utils";
import { makeInkHelpers } from "./ink-helpers";
import { SUBSCRIPTION_MANAGER_ADDRESS } from "./config";

/* -------------------------------------------------------------------------- */
/*                        C O N T R A C T   B I N D I N G                     */
/* -------------------------------------------------------------------------- */

const subscriptionManager = getInkClient(contracts.subscription_manager);
const { msg, reviveCall, sendTx } = makeInkHelpers(
  SUBSCRIPTION_MANAGER_ADDRESS,
  subscriptionManager,
);

/* -------------------------------------------------------------------------- */
/*                               H E L P E R S                                */
/* -------------------------------------------------------------------------- */

/**
 * Convert the various U256 representations returned by polkadot-api decoding
 * (bigint, limbs array `[lo, midLo, midHi, hi]`, or objects with `.words`)
 * into a single `bigint` value.
 */
function u256ToBigInt(raw: unknown): bigint {
  /* Already bigint ------------------------------------------------------- */
  if (typeof raw === "bigint") return raw;

  /* Array of little-endian 64-bit limbs ---------------------------------- */
  if (Array.isArray(raw)) {
    return raw.reduce<bigint>(
      (acc, limb, idx) =>
        acc + (BigInt(Number(limb)) << (64n * BigInt(idx))),
      0n,
    );
  }

  /* Object with `.words` carrying the limbs ------------------------------ */
  if (
    raw &&
    typeof raw === "object" &&
    Array.isArray((raw as any).words)
  ) {
    const words = (raw as any).words as unknown[];
    return words.reduce<bigint>(
      (acc, limb, idx) =>
        acc + (BigInt(Number(limb)) << (64n * BigInt(idx))),
      0n,
    );
  }

  /* Fallback to numeric string ------------------------------------------ */
  if (raw && typeof (raw as any).toString === "function") {
    const str = (raw as any).toString();
    if (/^\d+$/.test(str)) return BigInt(str);
  }

  throw new Error("Unsupported U256 format");
}

/* -------------------------------------------------------------------------- */
/*                                   READS                                    */
/* -------------------------------------------------------------------------- */

/**
 * Return on-chain price (as bigint) of a plan or `null` when not set.
 */
export const priceOf = async ({
  account,
  planKey,
}: {
  account: InjectedPolkadotAccount;
  planKey: number;
}) => {
  const data = msg("price_of").encode({ plan_key: planKey });
  const resp = await reviveCall(account.address, data);
  if (!resp.result.success || isEmpty(resp.result.value)) return null;

  const decoded: any = safeDecode(msg("price_of").decode, resp.result.value, {
    success: false,
    value: null,
  }).value;

  if (decoded === null || decoded === undefined) return null;

  return u256ToBigInt(decoded);
};

/* -------------------------------------------------------------------------- */
/*                               T R A N S A C T I O N S                      */
/* -------------------------------------------------------------------------- */

/**
 * Admin-only: set price for a plan.
 */
export const setPlanPrice = async ({
  account,
  planKey,
  newPrice,
}: {
  account: InjectedPolkadotAccount;
  planKey: number;
  newPrice: bigint;
}) =>
  sendTx(
    account,
    msg("set_plan_price").encode({
      plan_key: planKey,
      new_price: hash32Binary(newPrice.toString(16).padStart(64, "0")),
    }),
  );

/**
 * Pay subscription for a team; payable – `value` must equal price.
 */
export const paySubscription = async ({
  account,
  team,
  planKey,
  value,
}: {
  account: InjectedPolkadotAccount;
  team: string;
  planKey: number;
  value: bigint;
}) =>
  sendTx(
    account,
    msg("pay_subscription").encode({
      team: h160Binary(team),
      plan_key: planKey,
    }),
    value,
  );

/**
 * Get the timestamp (u64 ms) until which the team has paid.
 * Returns `bigint` or `null`.
 */
export const paidUntil = async ({
  account,
  team,
}: {
  account: InjectedPolkadotAccount;
  team: string;
}) => {
  const data = msg("paid_until").encode({ team: h160Binary(team) });
  const resp = await reviveCall(account.address, data);
  if (!resp.result.success || isEmpty(resp.result.value)) return null;
  return safeDecode(msg("paid_until").decode, resp.result.value, {
    success: false,
    value: null,
  }).value as bigint | null;
};