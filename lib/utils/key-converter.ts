import {
  mnemonicToEntropy,
  entropyToMiniSecret,
  entropyToMnemonic,
} from "@polkadot-labs/hdkd-helpers";
import { sr25519CreateDerive } from "@polkadot-labs/hdkd";

/* -------------------------------------------------------------------------- */
/*                        L O W  -  L E V E L   H E L P E R S                 */
/* -------------------------------------------------------------------------- */

function miniSecretToHex(mini: Uint8Array): `0x${string}` {
  return `0x${Buffer.from(mini).toString("hex").toLowerCase()}` as `0x${string}`;
}

function baseMnemonicToMiniSecret(mnemonic: string): Uint8Array {
  const entropy = mnemonicToEntropy(mnemonic.trim());
  return entropyToMiniSecret(entropy);
}

/**
 * Extract the raw 32-byte mini-secret for a given derivation path.
 *
 * Newer <code>@polkadot-labs/hdkd</code> versions may return either:
 *   • an object <code>{ secretKey: Uint8Array; publicKey: Uint8Array }</code>
 *   • the raw <code>Uint8Array</code> directly.
 * We therefore probe both shapes and throw a descriptive error otherwise.
 */
function deriveMiniSecret(mini: Uint8Array, path: string): Uint8Array {
  const derive = sr25519CreateDerive(mini);
  const result: unknown = derive(path);

  if (
    result &&
    typeof result === "object" &&
    (result as any).secretKey instanceof Uint8Array
  ) {
    return (result as any).secretKey.slice(0, 32);
  }

  if (result instanceof Uint8Array) {
    return result.slice(0, 32);
  }

  throw new Error("Failed to derive secret key – unsupported return type");
}

/* -------------------------------------------------------------------------- */
/*                       P U B L I C   U T I L I T I E S                      */
/* -------------------------------------------------------------------------- */

export function mnemonicToPrivateKey(phrase: string): `0x${string}` {
  const trimmed = phrase.trim();
  if (!trimmed) throw new Error("Mnemonic cannot be empty");

  const [mnemonic, ...pathParts] = trimmed.split("//");
  const mini = baseMnemonicToMiniSecret(mnemonic);

  if (pathParts.length === 0) return miniSecretToHex(mini);

  const path = "//" + pathParts.join("//");
  return miniSecretToHex(deriveMiniSecret(mini, path));
}

export function privateKeyToMnemonic(privateKeyHex: string): string {
  const clean = privateKeyHex.startsWith("0x")
    ? privateKeyHex.slice(2)
    : privateKeyHex;
  if (clean.length !== 64) throw new Error("Expected 32-byte hex private key");

  const miniSecret = Uint8Array.from(Buffer.from(clean, "hex"));
  return entropyToMnemonic(miniSecret);
}

export function derivePrivateKey(
  baseMnemonic: string,
  path: string,
): `0x${string}` {
  const mini = baseMnemonicToMiniSecret(baseMnemonic);
  return miniSecretToHex(deriveMiniSecret(mini, path));
}