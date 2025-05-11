import {
  mnemonicToEntropy,
  entropyToMnemonic,
  entropyToMiniSecret,
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import {
  encodeAddress,
  cryptoWaitReady,
  decodeAddress,
} from "@polkadot/util-crypto";
import { hexToU8a, u8aToHex } from "@polkadot/util";

import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                               C R Y P T O                                  */
/* -------------------------------------------------------------------------- */

let _ready: Promise<void> | null = null;
async function ensureReady() {
  if (!_ready) _ready = cryptoWaitReady();
  await _ready;
}

/* -------------------------------------------------------------------------- */
/*                               U T I L S                                    */
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
 * Accept raw hex (0x optional) and return the lowercase hex string
 * (without 0x) when it is 32 or 64 bytes long.
 */
function sanitiseEntropyHex(input: string): string {
  const raw = input.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]+$/u.test(raw)) throw new Error("Invalid hex");
  if (raw.length === 64) return raw;
  if (raw.length === 128) return raw.slice(0, 64); // use first 32 bytes
  throw new Error("Expected 32- or 64-byte hex");
}

/* -------------------------------------------------------------------------- */
/*                         P U B L I C   A P I                                */
/* -------------------------------------------------------------------------- */

export type PublicKeys = {
  ss58: string;
  h160: `0x${string}`;
};

/* ---------- Mnemonic helpers ---------- */

export async function mnemonicToPrivateKey(phrase: string): Promise<`0x${string}`> {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");
  const [mnemonic] = trimmed.split("//"); // strip derivation path
  const entropy = mnemonicToEntropy(normaliseMnemonic(mnemonic));
  const miniSecret = entropyToMiniSecret(entropy);
  return entropyToHex(miniSecret);
}

export async function derivePublicKeysFromMnemonic(
  phrase: string,
): Promise<PublicKeys> {
  await ensureReady();
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase.trim());
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}

/* ---------- Private-key helpers ---------- */

/**
 * Derive SS58 & H160 addresses from a raw sr25519/ed25519/ecdsa secret.
 * Attempts all three crypto kinds until one succeeds.
 */
export async function derivePublicKeysFromPrivateKey(
  privateKeyHex: string,
): Promise<PublicKeys> {
  await ensureReady();
  const seedHex = sanitiseEntropyHex(privateKeyHex);
  const seed = hexToU8a(seedHex);
  const kinds: ("sr25519" | "ed25519" | "ecdsa")[] = ["sr25519", "ed25519", "ecdsa"];

  for (const type of kinds) {
    try {
      const kr = new Keyring({ type });
      const pair = kr.addFromSeed(seed);
      // quick SS58 sanity check – will throw if invalid for type
      decodeAddress(pair.address);
      return { ss58: pair.address, h160: toH160Hex(pair.address) };
    } catch {
      /* try next kind */
    }
  }
  throw new Error("Unable to derive public keys from the supplied secret");
}

/* ---------- Address helpers ---------- */

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

/* ---------- Keystore helpers ---------- */

/**
 * Extract a 32-byte secret from a Polkadot keystore JSON.
 */
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

  /* Detect key type from encoding.content – fallback sr25519 */
  let keyType: "sr25519" | "ed25519" | "ecdsa" = "sr25519";
  try {
    const content = ((json as any).encoding?.content ?? [])[1];
    const cand = typeof content === "string" ? content.toLowerCase() : "";
    if (cand === "ed25519" || cand === "ecdsa") keyType = cand as any;
  } catch { /* ignore */ }

  const keyring = new Keyring({ type: keyType });
  const pair = keyring.addFromJson(json as any);
  try {
    pair.decodePkcs8(password);
  } catch {
    throw new Error("Incorrect password");
  }

  /* Different keyring versions expose the secret differently */
  const secret: Uint8Array | undefined =
    (pair as any).secretKey ??
    (pair as any)._pair?.secretKey ??
    (pair as any).secret ?? undefined;

  if (!secret || secret.length < 32) {
    throw new Error("Unable to extract private key");
  }
  return u8aToHex(secret.slice(0, 32)) as `0x${string}`;
}

/**
 * Derive public keys directly from a keystore JSON without
 * requiring the caller to handle the private key.
 */
export async function derivePublicKeysFromKeystore(
  jsonStr: string | Record<string, unknown>,
  password = "",
): Promise<PublicKeys> {
  await ensureReady();

  const json =
    typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr ?? {};
  if (typeof json !== "object" || !("encoded" in json)) {
    throw new Error("Invalid keystore JSON");
  }

  /* Detect key type to initialise the correct keyring */
  let keyType: "sr25519" | "ed25519" | "ecdsa" = "sr25519";
  try {
    const content = ((json as any).encoding?.content ?? [])[1];
    const cand = typeof content === "string" ? content.toLowerCase() : "";
    if (cand === "ed25519" || cand === "ecdsa") keyType = cand as any;
  } catch { /* ignore */ }

  const keyring = new Keyring({ type: keyType });
  const pair = keyring.addFromJson(json as any);
  try {
    pair.decodePkcs8(password);
  } catch {
    throw new Error("Incorrect password");
  }
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}