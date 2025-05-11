import { cryptoWaitReady, blake2AsU8a } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { hexToU8a, u8aToHex } from '@polkadot/util';

/**
 * Produce an sr25519 signature authorising a SkillPass credential mint.
 *
 * @param toAddress   Recipient wallet in SS58/0x form (used for fallback derivation).
 * @param vcHash      0x-prefixed blake2/bytes32 hash of the VC JSON.
 * @param seedHex     Optional 0x-prefixed secret seed for the signing key.
 *                    When omitted, a soft-derived key based on `toAddress`
 *                    is used (sufficient for dev/test environments).
 * @returns           0x-prefixed hex encoded signature.
 */
export async function signCredentialMint(
  toAddress: string,
  vcHash: `0x${string}`,
  seedHex?: `0x${string}`,
): Promise<`0x${string}`> {
  await cryptoWaitReady();

  /* Initialise keyring */
  const keyring = new Keyring({ type: 'sr25519' });

  /* Signer selection: supplied seed > derived dev key */
  const signer = seedHex
    ? keyring.addFromUri(seedHex)
    : keyring.addFromUri(`${toAddress}//signer`);

  /* Sign the hash (double-blake2 to ensure 32-byte payload) */
  const payload = blake2AsU8a(hexToU8a(vcHash));
  const sig = signer.sign(payload);

  return u8aToHex(sig) as `0x${string}`;
}