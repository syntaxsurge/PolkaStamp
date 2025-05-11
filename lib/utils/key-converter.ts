import {
  mnemonicToEntropy,
  entropyToMiniSecret,
  entropyToMnemonic,
} from "@polkadot-labs/hdkd-helpers";

/* -------------------------------------------------------------------------- */
/*                        L O W  -  L E V E L   H E L P E R S                 */
/* -------------------------------------------------------------------------- */

/** Encode a 32-byte mini-secret as lower-case 0x-hex. */
function miniSecretToHex(mini: Uint8Array): `0x${string}` {
  return `0x${Buffer.from(mini).toString("hex").toLowerCase()}` as `0x${string}`;
}

/** Convert a plain BIP-39 mnemonic (no derivation) to its mini-secret bytes. */
function baseMnemonicToMiniSecret(mnemonic: string): Uint8Array {
  const entropy = mnemonicToEntropy(mnemonic.trim());
  return entropyToMiniSecret(entropy);
}

/* -------------------------------------------------------------------------- */
/*                       P U B L I C   U T I L I T I E S                      */
/* -------------------------------------------------------------------------- */

/**
 * Convert a seed phrase to a private key.
 * Any derivation path suffix (e.g. <code>//Alice</code>) is *ignored* to avoid
 * sr25519 KeyPair shape inconsistencies that caused runtime errors.
 */
export function mnemonicToPrivateKey(phrase: string): `0x${string}` {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");

  /* Strip everything after the first '//' */
  const [mnemonic] = trimmed.split("//");
  const mini = baseMnemonicToMiniSecret(mnemonic);
  return miniSecretToHex(mini);
}

/**
 * Convert a raw 32-byte 0x-hex private key back to its mnemonic form.
 */
export function privateKeyToMnemonic(privateKeyHex: string): string {
  const clean = privateKeyHex.startsWith("0x")
    ? privateKeyHex.slice(2)
    : privateKeyHex;
  if (clean.length !== 64) throw new Error("Expected 32-byte hex private key");

  const miniSecret = Uint8Array.from(Buffer.from(clean, "hex"));
  return entropyToMnemonic(miniSecret);
}
