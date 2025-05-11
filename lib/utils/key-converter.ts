import {
  mnemonicToEntropy,
  entropyToMnemonic,
  entropyToMiniSecret,
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import {
  encodeAddress,
  decodeAddress,
  cryptoWaitReady,
} from "@polkadot/util-crypto";
import { hexToU8a, u8aToHex } from "@polkadot/util";

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
 *  - 64 chars (32 bytes)  → sr25519 mini-secret or BIP-39 entropy
 *  - 128 chars (64 bytes) → full secret key (first 32 bytes used)
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

/**
 * Convert a mnemonic (optionally with derivation path) into
 * the sr25519 mini-secret expected by Keyring.addFromSeed().
 */
export async function mnemonicToPrivateKey(phrase: string): Promise<`0x${string}`> {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");
  const [mnemonic] = trimmed.split("//"); // strip soft/hd path for raw seed
  const entropy = mnemonicToEntropy(normaliseMnemonic(mnemonic));
  const miniSecret = entropyToMiniSecret(entropy); // ★ change: use mini-secret
  return entropyToHex(miniSecret);
}

/**
 * Attempt to reverse a 32-byte secret back to a BIP-39 mnemonic.
 * This only succeeds when the secret is valid original entropy.
 */
export async function privateKeyToMnemonic(privateKeyHex: string): Promise<string> {
  const clean = sanitiseEntropyHex(privateKeyHex);
  if (clean.length === 64) {
    const entropy = Uint8Array.from(Buffer.from(clean, "hex"));
    return entropyToMnemonic(entropy);
  }
  throw new Error("Cannot derive mnemonic from this key length");
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

/* -------------------------------------------------------------------------- */
/*                  K E Y S T O R E   J S O N   H E L P E R S                 */
/* -------------------------------------------------------------------------- */

export async function keystoreJsonToPrivateKey(
  jsonStr: string | Record<string, unknown>,
  password = "",
): Promise<`0x${string}`> {
  await ensureReady();

  const json =
    typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr ?? {};
  if (typeof json !== "object" || !("encoded" in json)) {
    throw new Error("Invalid keystore JSON");
  }

  /* Detect key type from encoding.content – default sr25519 */
  let keyType: "sr25519" | "ed25519" | "ecdsa" = "sr25519";
  try {
    const content = ((json as any).encoding?.content ?? [])[1];
    const cand = typeof content === "string" ? content.toLowerCase() : "";
    if (cand === "ed25519" || cand === "ecdsa") keyType = cand as any;
  } catch {
    /* ignore – keep default */
  }

  const keyring = new Keyring({ type: keyType });
  const pair = keyring.addFromJson(json as any);
  try {
    pair.decodePkcs8(password);
  } catch {
    throw new Error("Incorrect password");
  }

  /* Secret retrieval – covers different keyring versions */
  let secret: Uint8Array | undefined =
    (pair as any).secretKey ??
    (pair as any)._pair?.secretKey ??
    undefined;

  if (!secret || secret.length < 32) {
    throw new Error("Unable to extract private key");
  }

  const mini = secret.slice(0, 32); // mini-secret
  return u8aToHex(mini) as `0x${string}`;
}

export async function derivePublicKeysFromKeystore(
  jsonStr: string | Record<string, unknown>,
  password = "",
): Promise<PublicKeys> {
  const priv = await keystoreJsonToPrivateKey(jsonStr, password);
  return derivePublicKeysFromPrivateKey(priv);
}

/* -------------------------------------------------------------------------- */
/*                     A D D R E S S   C O N V E R S I O N                    */
/* -------------------------------------------------------------------------- */

export function ss58ToH160Unsafe(input: string) {
  return toH160Hex(input);
}