import {
  mnemonicToEntropy,
  entropyToMnemonic,
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import {
  encodeAddress,
  decodeAddress,
  cryptoWaitReady,
} from "@polkadot/util-crypto";
import { hexToU8a } from "@polkadot/util";

import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                           C R Y P T O   I N I T                            */
/* -------------------------------------------------------------------------- */

let _ready: Promise<void> | null = null;
async function ensureReady() {
  if (!_ready) _ready = cryptoWaitReady();
  await _ready;
}

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

function entropyToHex(entropy: Uint8Array): `0x${string}` {
  return `0x${Buffer.from(entropy).toString("hex").toLowerCase()}` as `0x${string}`;
}

function normaliseMnemonic(phrase: string): string {
  return phrase
    .trim()
    .split(/\s+/)
    .join(" ");
}

/**
 * Validate raw hex (with or without 0x) and return lower-case
 * hex **without** 0x if length is 64 or 128 chars.
 *
 * Accepts:
 *  - 64 chars (32 bytes) → BIP-39 24-word entropy
 *  - 128 chars (64 bytes) → Sr25519 full secret key
 *    (first 32 bytes are used as mini secret)
 */
function sanitiseEntropyHex(input: string): string {
  const raw = input.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]+$/u.test(raw)) throw new Error("Invalid hex");
  if (raw.length === 64) return raw;
  if (raw.length === 128) return raw.slice(0, 64); // truncate to 32-byte seed
  throw new Error("Expected 32- or 64-byte hex");
}

/* -------------------------------------------------------------------------- */
/*                        K E Y   C O N V E R S I O N S                       */
/* -------------------------------------------------------------------------- */

export type PublicKeys = {
  ss58: string;
  h160: `0x${string}`;
};

export async function mnemonicToPrivateKey(phrase: string): Promise<`0x${string}`> {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");
  const [mnemonic] = trimmed.split("//");
  const entropy = mnemonicToEntropy(normaliseMnemonic(mnemonic));
  return entropyToHex(entropy);
}

export async function privateKeyToMnemonic(privateKeyHex: string): Promise<string> {
  const clean = sanitiseEntropyHex(privateKeyHex);
  if (clean.length !== 32 && clean.length !== 64) {
    /* 64-byte secrets cannot map back to BIP-39 */
    throw new Error("Cannot derive mnemonic from this key length");
  }
  const entropy = Uint8Array.from(Buffer.from(clean, "hex"));
  return entropyToMnemonic(entropy);
}

/* -------------------------------------------------------------------------- */
/*                 P U B L I C   K E Y   D E R I V A T I O N                  */
/* -------------------------------------------------------------------------- */

export async function derivePublicKeysFromMnemonic(
  phrase: string,
): Promise<PublicKeys> {
  await ensureReady();
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase.trim());
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}

export async function derivePublicKeysFromPrivateKey(
  privateKeyHex: string,
): Promise<PublicKeys> {
  await ensureReady();
  const seedHex = sanitiseEntropyHex(privateKeyHex);
  const seed = hexToU8a(seedHex);
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromSeed(seed);
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}

/* -------------------------------------------------------------------------- */
/*                     H 1 6 0   ↔   S S 5 8   U T I L S                     */
/* -------------------------------------------------------------------------- */

export function ss58ToH160(input: string): `0x${string}` {
  return toH160Hex(input);
}

export function h160ToSs58(h160: string, prefix = 42): string {
  const norm = toH160Hex(h160);
  const body = hexToU8a(norm);
  const acc = new Uint8Array(32);
  acc.set(body, 12);
  return encodeAddress(acc, prefix);
}