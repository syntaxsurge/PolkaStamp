import { hexToU8a, u8aToString } from '@polkadot/util'
import { localnode } from '@polkadot-api/descriptors'
import { FixedSizeBinary } from 'polkadot-api'
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'

import { WS_URL } from './config'
import { getPapiClient, toHexString } from './contract-utils'
import { decodeDispatchError } from './utils'

/**
 * Attempt to decode a human-readable revert reason from Revive / Contracts
 * events emitted during a failed transaction.
 */
function extractRevertReason(events: any[]): string | null {
  for (const ev of events ?? []) {
    try {
      /* Revive pallet: Revive.ContractReverted(data) */
      if (ev.type === 'Revive' && ev.value?.type === 'ContractReverted') {
        const raw = ev.value?.value
        const hex = toHexString(raw)
        if (hex) {
          const msg = u8aToString(hexToU8a(hex))
          if (msg) return msg
        }
        return 'Contract reverted'
      }

      /* ink! Contracts pallet mirror — execution failed */
      if (
        ev.type === 'Contracts' &&
        (ev.value?.type === 'ContractExecutionFailed' ||
          ev.value?.type === 'ContractReverted' ||
          ev.value?.type === 'ContractEmitted')
      ) {
        const raw = ev.value?.value ?? ev.value?.data
        const hex = toHexString(raw)
        if (hex) {
          const msg = u8aToString(hexToU8a(hex))
          if (msg) return msg
        }
        return 'Contract execution failed'
      }
    } catch {
      /* Ignore malformed event entry */
    }
  }
  return null
}

/**
 * Build common helpers (msg, reviveCall, sendTx) for an Ink! contract.
 * Logs the call-site (function & line) every time it is invoked.
 *
 * @param destAddress 20-byte contract account hex
 * @param contract    Ink client instance returned by getInkClient
 */
export function makeInkHelpers<T>(destAddress: `0x${string}`, contract: T) {
  /* -------------------------------------------------------------------- */
  /*  Capture & log the location (function + file:line) of the caller.     */
  /* -------------------------------------------------------------------- */
  {
    const err = new Error()
    const stackLines = err.stack?.split('\n') ?? []
    // Node-style stacks: [0] = Error, [1] = at makeInkHelpers…, [2] = caller
    const callerInfo = stackLines[2]?.trim() ?? '<unknown>'
    console.log('[makeInkHelpers] ⇠ called from', callerInfo)
  }

  const client = getPapiClient(WS_URL)
  const typedApi = client.getTypedApi(localnode)

  /** Message lookup convenience */
  const msg = (label: keyof any) => (contract as any).message(label)

  /** Dry-run call via Revive pallet */
  const reviveCall = async (caller: string, data: FixedSizeBinary<any>) => {
    console.log('[reviveCall] ➜', { caller, dest: destAddress, data })

    const response = await typedApi.apis.ReviveApi.call(
      caller,
      FixedSizeBinary.fromHex(destAddress),
      0n,
      undefined,
      undefined,
      data,
    )

    console.log('[reviveCall] ⇠ response', response)
    return response
  }

  /** Sign & submit extrinsic, throwing rich errors on revert */
  const sendTx = async (
    account: InjectedPolkadotAccount,
    data: FixedSizeBinary<any>,
    value: bigint = 0n,
  ) => {
    /* Pre-simulation to obtain gas limits */
    const sim = await reviveCall(account.address, data)

    const tx = typedApi.tx.Revive.call({
      value,
      data,
      dest: FixedSizeBinary.fromHex(destAddress),
      gas_limit: sim.gas_required,
      storage_deposit_limit: sim.storage_deposit.value,
    })

    const result = await tx.signAndSubmit(account.polkadotSigner)

    console.log('[sendTx] ⇠ result', result)

    if (result.dispatchError) {
      const reason = extractRevertReason(result.events as any[])
      const errMsg = reason ?? decodeDispatchError(result.dispatchError)
      throw new Error(errMsg)
    }

    /* ------------------------------------------------------------------ */
    /*                  H A S H   E X T R A C T I O N                     */
    /* ------------------------------------------------------------------ */
    const blockHashHex = toHexString((result as any).block?.hash ?? null)

    /* Prefer logging the block hash as requested by downstream callers. */
    console.log('[sendTx] ⇠ blockHash', blockHashHex)

    return { ...result, txHash: blockHashHex }
  }

  return { msg, reviveCall, sendTx }
}
