import {
  mnemonicToEntropy,
  entropyToMnemonic,
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import { encodeAddress, decodeAddress, cryptoWaitReady } from "@polkadot/util-crypto";
import { hexToU8a } from "@polkadot/util";

import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                           C R Y P T O   I N I T                            */
/* -------------------------------------------------------------------------- */

/** Ensure WASM/ASM crypto is ready exactly once. */
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
  const clean = privateKeyHex.startsWith("0x")
    ? privateKeyHex.slice(2)
    : privateKeyHex;

  if (clean.length !== 32 && clean.length !== 64) {
    throw new Error("Expected 0x-prefixed 16- or 32-byte hex entropy value");
  }

  const entropy = Uint8Array.from(Buffer.from(clean, "hex"));
  return entropyToMnemonic(entropy);
}

/* -------------------------------------------------------------------------- */
/*                 P U B L I C   K E Y   D E R I V A T I O N                  */
/* -------------------------------------------------------------------------- */

export async function derivePublicKeysFromMnemonic(phrase: string): Promise<PublicKeys> {
  await ensureReady();
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase.trim());
  const ss58 = pair.address;
  const h160 = toH160Hex(ss58);
  return { ss58, h160 };
}

export async function derivePublicKeysFromPrivateKey(privateKeyHex: string): Promise<PublicKeys> {
  await ensureReady();
  const clean = privateKeyHex.trim();
  if (!/^0x[0-9a-fA-F]{32}$|^0x[0-9a-fA-F]{64}$/.test(clean)) {
    throw new Error("Invalid entropy hex");
  }
  const seed = hexToU8a(clean);
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromSeed(seed);
  const ss58 = pair.address;
  const h160 = toH160Hex(ss58);
  return { ss58, h160 };
}

/* -------------------------------------------------------------------------- */
/*                     H 1 6 0   ↔   S S 5 8   U T I L S                     */
/* -------------------------------------------------------------------------- */

/**
 * Convert any SS58 or 0x… hex to canonical 0x-prefixed H160.
 */
export function ss58ToH160(input: string): `0x${string}` {
  return toH160Hex(input);
}

/**
 * Convert a 20-byte H160 (0x…) to a 32-byte substrate AccountId
 * { 12 × 0x00 ++ 20-byte H160 } and encode as SS58.
 */
export function h160ToSs58(h160: string, prefix = 42): string {
  const norm = toH160Hex(h160);
  const body = hexToU8a(norm); // 20 bytes
  const acc = new Uint8Array(32);
  acc.set(body, 12); // right-align
  return encodeAddress(acc, prefix);
}