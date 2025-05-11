import type { FixedSizeBinary, ResultPayload, Enum, Binary, FixedSizeArray } from 'polkadot-api'
import type { InkDescriptors } from 'polkadot-api/ink'
type AnonymousEnum<T extends {}> = T & {
  __anonymous: true
}
type MyTuple<T> = [T, ...T[]]
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T
type Anonymize<T> = SeparateUndefined<
  T extends FixedSizeBinary<infer L>
    ? number extends L
      ? Binary
      : FixedSizeBinary<L>
    : T extends
          | string
          | number
          | bigint
          | boolean
          | void
          | undefined
          | null
          | symbol
          | Uint8Array
          | Enum<any>
      ? T
      : T extends AnonymousEnum<infer V>
        ? Enum<V>
        : T extends MyTuple<any>
          ? {
              [K in keyof T]: T[K]
            }
          : T extends []
            ? []
            : T extends FixedSizeArray<infer L, infer T>
              ? number extends L
                ? Array<T>
                : FixedSizeArray<L, T>
              : {
                  [K in keyof T & string]: T[K]
                }
>
type T2 = {
  uri: string
  doc_hash: FixedSizeBinary<32>
}
type T3 = Array<FixedSizeBinary<20>>
type T0 = Enum<{
  CouldNotReadInput: undefined
}>
type T1 = ResultPayload<
  ResultPayload<
    undefined,
    Enum<{
      NotAdmin: undefined
      CallerMismatch: undefined
      DidAlreadyExists: undefined
      DidNotFound: undefined
      EnvError: undefined
    }>
  >,
  Anonymize<T0>
>
type StorageDescriptor = {
  docs: {
    key: FixedSizeBinary<20>
    value: Anonymize<T2>
  }
  admins: {
    key: FixedSizeBinary<20>
    value: undefined
  }
  '': {
    key: undefined
    value: {
      owners: Anonymize<T3>
    }
  }
}
type MessagesDescriptor = {
  /**
   * Register a new DID for `owner` (explicit H160).
   * Fails when the caller’s address does not match `owner`.
   */
  create_did: {
    message: {
      owner: FixedSizeBinary<20>
      doc_hash: FixedSizeBinary<32>
    }
    response: Anonymize<T1>
    mutates: true
  }
  /**
   * Admin-only: create a DID for someone else.
   */
  admin_create_did: {
    message: {
      owner: FixedSizeBinary<20>
      doc_hash: FixedSizeBinary<32>
    }
    response: Anonymize<T1>
    mutates: true
  }
  /**
   * Update the DID document for `owner`; caller must equal `owner`.
   */
  set_document: {
    message: {
      owner: FixedSizeBinary<20>
      uri: string
      doc_hash: FixedSizeBinary<32>
    }
    response: Anonymize<T1>
    mutates: true
  }
  /**
   * Admin-only: update another account’s DID document.
   */
  admin_set_document: {
    message: {
      owner: FixedSizeBinary<20>
      uri: string
      doc_hash: FixedSizeBinary<32>
    }
    response: Anonymize<T1>
    mutates: true
  }
  has_did: {
    message: {
      owner: FixedSizeBinary<20>
    }
    response: ResultPayload<boolean, Anonymize<T0>>
  }
  document_of: {
    message: {
      owner: FixedSizeBinary<20>
    }
    response: ResultPayload<Anonymize<T2> | undefined, Anonymize<T0>>
  }
  /**
   * Return up to `count` owners starting from `start_index`.
   */
  get_did_owners: {
    message: {
      start_index: number
      count: number
    }
    response: ResultPayload<Anonymize<T3>, Anonymize<T0>>
  }
}
type ConstructorsDescriptor = {
  new: {
    message: {
      admin: FixedSizeBinary<20>
    }
    response: ResultPayload<undefined, Anonymize<T0>>
  }
}
type EventDescriptor = Enum<{
  DidCreated: {
    owner: FixedSizeBinary<20>
    did: string
    doc_hash: FixedSizeBinary<32>
  }
  DidDocumentUpdated: {
    did: string
    uri: string
    doc_hash: FixedSizeBinary<32>
  }
}>
export declare const descriptor: InkDescriptors<
  StorageDescriptor,
  MessagesDescriptor,
  ConstructorsDescriptor,
  EventDescriptor
>
export {}
