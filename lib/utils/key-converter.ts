import {
  mnemonicToEntropy,
  entropyToMnemonic,
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import { hexToU8a } from "@polkadot/util";

import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

/** Encode Uint8Array entropy as lower-case 0x-hex. */
function entropyToHex(entropy: Uint8Array): `0x${string}` {
  return `0x${Buffer.from(entropy).toString("hex").toLowerCase()}` as `0x${string}`;
}

/** Normalise a mnemonic by trimming and collapsing whitespace. */
function normaliseMnemonic(phrase: string): string {
  return phrase
    .trim()
    .split(/\s+/)
    .join(" ");
}

/* -------------------------------------------------------------------------- */
/*                         P U B L I C   U T I L I T I E S                    */
/* -------------------------------------------------------------------------- */

export type PublicKeys = {
  ss58: string;
  h160: `0x${string}`;
};

/**
 * Convert a BIP-39 seed phrase to its raw entropy hex.
 * Any derivation path suffix (e.g. "…//Alice”) is ignored so that
 * conversions remain deterministic and round-trippable.
 */
export function mnemonicToPrivateKey(phrase: string): `0x${string}` {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");

  /* Strip everything after the first '//' to discard derivation paths. */
  const [mnemonic] = trimmed.split("//");
  const entropy = mnemonicToEntropy(normaliseMnemonic(mnemonic));
  return entropyToHex(entropy);
}

/**
 * Convert raw entropy hex (16 bytes for 12-word mnemonics, 32 bytes for
 * 24-word) back to its original mnemonic.
 */
export function privateKeyToMnemonic(privateKeyHex: string): string {
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
/*                     N E W   P U B L I C   K E Y   H E L P E R S            */
/* -------------------------------------------------------------------------- */

/**
 * Derive SS58 and H160 addresses from any mnemonic (derivation
 * paths like "//Alice” are fully supported).
 */
export function derivePublicKeysFromMnemonic(phrase: string): PublicKeys {
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase.trim());
  const ss58 = pair.address;
  const h160 = toH160Hex(ss58);
  return { ss58, h160 };
}

/**
 * Derive SS58 and H160 addresses directly from a raw private‐key hex
 * (16 or 32 bytes of entropy).
 */
export function derivePublicKeysFromPrivateKey(
  privateKeyHex: string,
): PublicKeys {
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