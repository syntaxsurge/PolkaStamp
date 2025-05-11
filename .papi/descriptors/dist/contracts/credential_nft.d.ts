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
type T0 = ResultPayload<undefined, Anonymize<T1>>
type T1 = Enum<{
  CouldNotReadInput: undefined
}>
type StorageDescriptor = {
  owner_of: {
    key: bigint
    value: FixedSizeBinary<20>
  }
  token_uri: {
    key: bigint
    value: string
  }
  credential: {
    key: bigint
    value: FixedSizeBinary<32>
  }
  minted_hashes: {
    key: FixedSizeBinary<32>
    value: undefined
  }
  issuers: {
    key: FixedSizeBinary<20>
    value: undefined
  }
  '': {
    key: undefined
    value: {
      next_id: bigint
      admin: FixedSizeBinary<20>
      platform: FixedSizeBinary<20>
    }
  }
}
type MessagesDescriptor = {
  grant_issuer_role: {
    message: {
      account: FixedSizeBinary<20>
    }
    response: Anonymize<T0>
    mutates: true
  }
  mint_credential: {
    message: {
      to: FixedSizeBinary<20>
      vc_hash: FixedSizeBinary<32>
      uri: string
    }
    response: ResultPayload<bigint, Anonymize<T1>>
    payable: true
    mutates: true
  }
  update_credential: {
    message: {
      token_id: bigint
      new_vc_hash: FixedSizeBinary<32>
      new_uri: string
    }
    response: Anonymize<T0>
    mutates: true
  }
  revoke_credential: {
    message: {
      token_id: bigint
    }
    response: Anonymize<T0>
    mutates: true
  }
  owner_of: {
    message: {
      token_id: bigint
    }
    response: ResultPayload<FixedSizeBinary<20> | undefined, Anonymize<T1>>
  }
  token_uri: {
    message: {
      token_id: bigint
    }
    response: ResultPayload<string | undefined, Anonymize<T1>>
  }
  vc_hash: {
    message: {
      token_id: bigint
    }
    response: ResultPayload<FixedSizeBinary<32> | undefined, Anonymize<T1>>
  }
}
type ConstructorsDescriptor = {
  new: {
    message: {
      admin: FixedSizeBinary<20>
      platform: FixedSizeBinary<20>
    }
    response: Anonymize<T0>
  }
}
type EventDescriptor = Enum<{
  CredentialMinted: {
    to: FixedSizeBinary<20>
    token_id: bigint
    vc_hash: FixedSizeBinary<32>
    uri: string
  }
  CredentialUpdated: {
    token_id: bigint
    vc_hash: FixedSizeBinary<32>
    uri: string
  }
  CredentialRevoked: {
    token_id: bigint
  }
}>
export declare const descriptor: InkDescriptors<
  StorageDescriptor,
  MessagesDescriptor,
  ConstructorsDescriptor,
  EventDescriptor
>
export {}
