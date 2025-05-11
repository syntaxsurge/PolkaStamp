'use client'

import { u8aToHex } from '@polkadot/util'
import { contracts } from '@polkadot-api/descriptors'
import { getInkClient } from 'polkadot-api/ink'
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'

import { DID_REGISTRY_ADDRESS } from './config'
import { h160Binary, hash32Binary, isEmpty, safeDecode } from './contract-utils'
import { makeInkHelpers } from './ink-helpers'

/* ---------------- contract instance & helpers ---------------- */
const didRegistry = getInkClient(contracts.did_registry)
const { msg, reviveCall, sendTx } = makeInkHelpers(DID_REGISTRY_ADDRESS, didRegistry)

/* ----------------------------- reads ------------------------- */
export const hasDid = async ({
  account,
  owner,
}: {
  account: InjectedPolkadotAccount
  owner: string
}) => {
  const data = msg('has_did').encode({ owner: h160Binary(owner) })
  const resp = await reviveCall(account.address, data)
  if (!resp.result.success || isEmpty(resp.result.value)) return false
  return safeDecode(msg('has_did').decode, resp.result.value, {
    success: false,
    value: false,
  }).value
}

export const documentOf = async ({
  account,
  owner,
}: {
  account: InjectedPolkadotAccount
  owner: string
}) => {
  const data = msg('document_of').encode({ owner: h160Binary(owner) })
  const resp = await reviveCall(account.address, data)
  if (!resp.result.success || isEmpty(resp.result.value)) return null
  return safeDecode(msg('document_of').decode, resp.result.value, {
    success: false,
    value: null,
  }).value
}

export const getDidOwners = async ({
  account,
  start = 0,
  count = 50,
}: {
  account: InjectedPolkadotAccount
  start?: number
  count?: number
}) => {
  const data = msg('get_did_owners').encode({
    start_index: start,
    count,
  })
  const resp = await reviveCall(account.address, data)
  if (!resp.result.success || isEmpty(resp.result.value)) return []
  const decoded: any[] = safeDecode(msg('get_did_owners').decode, resp.result.value, {
    success: false,
    value: [],
  }).value
  return decoded.map((h160: any) => u8aToHex(h160.asBytes ? h160.asBytes() : h160) as `0x${string}`)
}

/* -------------------------- transactions --------------------- */
/**
 * Create a DID for the given owner (explicit H160) with the supplied docHash.
 * NOTE: The caller must match `owner` – mismatches are rejected on-chain.
 */
export const createDid = async ({
  account,
  owner,
  docHash,
}: {
  account: InjectedPolkadotAccount
  owner: string
  docHash: string
}) =>
  sendTx(
    account,
    msg('create_did').encode({
      owner: h160Binary(owner),
      doc_hash: hash32Binary(docHash),
    }),
  )

/**
 * Update the DID document owned by `owner`.
 * The caller must equal `owner`; otherwise the contract will revert.
 */
export const setDocument = async ({
  account,
  owner,
  uri,
  docHash,
}: {
  account: InjectedPolkadotAccount
  owner: string
  uri: string
  docHash: string
}) =>
  sendTx(
    account,
    msg('set_document').encode({
      owner: h160Binary(owner),
      uri,
      doc_hash: hash32Binary(docHash),
    }),
  )

/* --------------------- admin passthroughs -------------------- */
/** Admin-only helper to create a DID on behalf of someone else. */
export const adminCreateDid = async ({
  account,
  owner,
  docHash,
}: {
  account: InjectedPolkadotAccount
  owner: string
  docHash: string
}) =>
  sendTx(
    account,
    msg('admin_create_did').encode({
      owner: h160Binary(owner),
      doc_hash: hash32Binary(docHash),
    }),
  )

/** Admin-only helper to set a document for another owner. */
export const adminSetDocument = async ({
  account,
  owner,
  uri,
  docHash,
}: {
  account: InjectedPolkadotAccount
  owner: string
  uri: string
  docHash: string
}) =>
  sendTx(
    account,
    msg('admin_set_document').encode({
      owner: h160Binary(owner),
      uri,
      doc_hash: hash32Binary(docHash),
    }),
  )

/* ----------------------- deprecation shim -------------------- */
/**
 * @deprecated Call `createDid({ owner, ... })` instead — this overload will be removed soon.
 */
export const createDidDeprecated = async ({
  account,
  docHash,
}: {
  account: InjectedPolkadotAccount
  docHash: string
}) => {
  console.warn(
    '[did-registry] createDid({ docHash }) without an explicit `owner` is deprecated. ' +
      'Pass { owner: toH160Hex(account.address) } instead.',
  )
  return createDid({
    account,
    owner: account.address,
    docHash,
  })
}
export { createDidDeprecated as createDidFor } // alias to aid migration
