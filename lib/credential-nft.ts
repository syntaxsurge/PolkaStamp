import { contracts } from "@polkadot-api/descriptors";
import { getInkClient } from "polkadot-api/ink";
import { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";
import { u8aToHex } from "@polkadot/util";

import {
  h160Binary,
  hash32Binary,
  isEmpty,
  safeDecode,
} from "./contract-utils";
import { makeInkHelpers } from "./ink-helpers";
import { CREDENTIAL_NFT_ADDRESS } from "./config";

/* ---------------- contract instance & helpers ----------------- */
const credentialNft = getInkClient(contracts.credential_nft);
const { msg, reviveCall, sendTx } = makeInkHelpers(
  CREDENTIAL_NFT_ADDRESS,
  credentialNft,
);

/* ----------------------------- reads -------------------------- */
export const ownerOf = async ({
  account,
  tokenId,
}: {
  account: InjectedPolkadotAccount;
  tokenId: bigint;
}) => {
  const data = msg("owner_of").encode({ token_id: tokenId });
  const resp = await reviveCall(account.address, data);
  if (!resp.result.success || isEmpty(resp.result.value)) return null;
  const decoded: any = safeDecode(msg("owner_of").decode, resp.result.value, {
    success: false,
    value: null,
  }).value;
  return decoded
    ? (u8aToHex(decoded.asBytes ? decoded.asBytes() : decoded) as `0x${string}`)
    : null;
};

export const tokenUri = async ({
  account,
  tokenId,
}: {
  account: InjectedPolkadotAccount;
  tokenId: bigint;
}) => {
  const data = msg("token_uri").encode({ token_id: tokenId });
  const resp = await reviveCall(account.address, data);
  if (!resp.result.success || isEmpty(resp.result.value)) return null;
  return safeDecode(msg("token_uri").decode, resp.result.value, {
    success: false,
    value: null,
  }).value;
};

export const vcHash = async ({
  account,
  tokenId,
}: {
  account: InjectedPolkadotAccount;
  tokenId: bigint;
}) => {
  const data = msg("vc_hash").encode({ token_id: tokenId });
  const resp = await reviveCall(account.address, data);
  if (!resp.result.success || isEmpty(resp.result.value)) return null;
  return safeDecode(msg("vc_hash").decode, resp.result.value, {
    success: false,
    value: null,
  }).value;
};

/* -------------------------- transactions ---------------------- */
export const grantIssuerRole = async ({
  account,
  issuer,
}: {
  account: InjectedPolkadotAccount;
  issuer: string;
}) =>
  sendTx(
    account,
    msg("grant_issuer_role").encode({ account: h160Binary(issuer) }),
  );

export const mintCredential = async ({
  account,
  to,
  vcHash: vcHashHex,
  uri,
  value = 0n,
}: {
  account: InjectedPolkadotAccount;
  to: string;
  vcHash: string;
  uri: string;
  value?: bigint;
}) =>
  sendTx(
    account,
    msg("mint_credential").encode({
      to: h160Binary(to),
      vc_hash: hash32Binary(vcHashHex),
      uri,
    }),
    value,
  );

export const updateCredential = async ({
  account,
  tokenId,
  newVcHash,
  newUri,
}: {
  account: InjectedPolkadotAccount;
  tokenId: bigint;
  newVcHash: string;
  newUri: string;
}) =>
  sendTx(
    account,
    msg("update_credential").encode({
      token_id: tokenId,
      new_vc_hash: hash32Binary(newVcHash),
      new_uri: newUri,
    }),
  );

export const revokeCredential = async ({
  account,
  tokenId,
}: {
  account: InjectedPolkadotAccount;
  tokenId: bigint;
}) => sendTx(account, msg("revoke_credential").encode({ token_id: tokenId }));