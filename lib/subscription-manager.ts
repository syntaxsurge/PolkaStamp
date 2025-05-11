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
import { SUBSCRIPTION_CONTRACT_ADDRESS } from "@/to-be-applied/lib/constants";

/* ---------- contract instance & helpers ---------- */
const subscriptionManager = getInkClient(contracts.subscription_manager);
const { msg, reviveCall, sendTx } = makeInkHelpers(
  SUBSCRIPTION_CONTRACT_ADDRESS,
  subscriptionManager,
);

/* ---------- reads ---------- */

/**
 * Get the timestamp (u64 seconds) until which the team has paid.
 * Returns bigint | null.
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

/**
 * Return price (U256 encoded as bigint) of a plan.
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
  return safeDecode(msg("price_of").decode, resp.result.value, {
    success: false,
    value: null,
  }).value as bigint | null;
};

/* ---------- transactions ---------- */

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
 * Pay subscription for a team; payable - value must equal price.
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