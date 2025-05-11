import {
  mnemonicToEntropy,
  entropyToMiniSecret
} from "@polkadot-labs/hdkd-helpers";
import { Keyring } from "@polkadot/keyring";
import {
  encodeAddress,
  cryptoWaitReady,
  decodeAddress
} from "@polkadot/util-crypto";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { decodePair } from "@polkadot/keyring/pair/decode";

import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                               C R Y P T O                                  */
/* -------------------------------------------------------------------------- */

let _ready: Promise<boolean> | null = null;
async function ensureReady(): Promise<void> {
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
  return phrase.trim().split(/\s+/).join(" ");
}

/**
 * Accept raw hex (0x optional) and return the lowercase hex string
 * (without 0x) when it is 32 or 64 bytes long.
 */
function sanitiseEntropyHex(input: string): string {
  const raw = input.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]+$/u.test(raw)) throw new Error("Invalid hex");
  if (raw.length === 64 || raw.length === 128) return raw;
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

export async function mnemonicToPrivateKey(
  phrase: string
): Promise<`0x${string}`> {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");
  const [mnemonic] = trimmed.split("//"); // strip derivation path
  const entropy = mnemonicToEntropy(normaliseMnemonic(mnemonic));
  const miniSecret = entropyToMiniSecret(entropy);
  return entropyToHex(miniSecret);
}

export async function derivePublicKeysFromMnemonic(
  phrase: string
): Promise<PublicKeys> {
  await ensureReady();
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(phrase.trim());
  console.log("[key-converter] derive from mnemonic →", pair.address);
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}

/* ---------- Private-key helpers ---------- */

/**
 * Derive SS58 & H160 addresses from a raw secret (32-byte seed or 64-byte secret key).
 * Handles sr25519/ed25519/ecdsa by progressively attempting the available crypto kinds.
 */
export async function derivePublicKeysFromPrivateKey(
  privateKeyHex: string
): Promise<PublicKeys> {
  await ensureReady();
  const cleanHex = sanitiseEntropyHex(privateKeyHex);
  const bytes = hexToU8a(cleanHex);

  console.log("[key-converter] raw secret hex:", u8aToHex(bytes));

  /* Determine seed component ------------------------------------------- */
  let seed: Uint8Array;
  if (bytes.length === 32) {
    seed = bytes;
  } else if (bytes.length === 64) {
    // Use first 32 bytes (mini-secret) for all crypto kinds
    seed = bytes.slice(0, 32);
  } else {
    throw new Error("Expected 32- or 64-byte secret");
  }

  const types: ("sr25519" | "ed25519" | "ecdsa")[] = [
    "sr25519",
    "ed25519",
    "ecdsa"
  ];

  for (const type of types) {
    try {
      const kr = new Keyring({ type });
      const pair = kr.addFromSeed(seed);
      decodeAddress(pair.address); // sanity-check SS58
      console.log(
        `[key-converter] ${type} publicKey:`,
        u8aToHex(pair.publicKey),
        "→ SS58:",
        pair.address
      );
      return { ss58: pair.address, h160: toH160Hex(pair.address) };
    } catch (e) {
      console.log(
        `[key-converter] ${type} candidate rejected →`,
        (e as Error).message
      );
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
 * Extract a secret from a Polkadot keystore JSON.
 */
export async function keystoreJsonToPrivateKey(
  jsonStr: string | Record<string, unknown>,
  password = ""
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
    /* ignore */
  }

  const keyring = new Keyring({ type: keyType });
  const pair = keyring.addFromJson(json as any);

  try {
    pair.unlock(password);
  } catch {
    throw new Error("Incorrect password");
  }

  /* Extract secret via PKCS8 re-encode round-trip */
  try {
    const pkcs8 = (pair as any).encodePkcs8(password);
    let { publicKey, secretKey } = decodePair(password, pkcs8)
    let publicKeyStr = u8aToHex(publicKey) as `0x${string}`
    let secretKeyStr = u8aToHex(secretKey) as `0x${string}`

    console.log(
      "[key-converter] keystore decoded – type:",
      keyType,
      "Public Key:",
      publicKeyStr,
      "Secret Key:",
      secretKeyStr
    );

    return secretKeyStr
  } catch (e) {
    console.error("[key-converter] PKCS8 decode failed", e);
    throw new Error("Unable to extract private key from keystore");
  }
}

/**
 * Derive public keys directly from a keystore JSON.
 */
export async function derivePublicKeysFromKeystore(
  jsonStr: string | Record<string, unknown>,
  password = ""
): Promise<PublicKeys> {
  await ensureReady();

  const json =
    typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr ?? {};
  if (typeof json !== "object" || !("encoded" in json)) {
    throw new Error("Invalid keystore JSON");
  }

  /* Detect key type to initialise keyring */
  let keyType: "sr25519" | "ed25519" | "ecdsa" = "sr25519";
  try {
    const content = ((json as any).encoding?.content ?? [])[1];
    const cand = typeof content === "string" ? content.toLowerCase() : "";
    if (cand === "ed25519" || cand === "ecdsa") keyType = cand as any;
  } catch {
    /* ignore */
  }

  const keyring = new Keyring({ type: keyType });
  const pair = keyring.addFromJson(json as any);
  try {
    pair.unlock(password);
  } catch {
    throw new Error("Incorrect password");
  }

  console.log(
    "[key-converter] derive from keystore – type:",
    keyType,
    "address:",
    pair.address
  );
  return { ss58: pair.address, h160: toH160Hex(pair.address) };
}