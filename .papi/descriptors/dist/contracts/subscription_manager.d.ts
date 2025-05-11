import type { FixedSizeBinary, ResultPayload, Enum, FixedSizeArray, Binary } from 'polkadot-api'
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
type T0 = FixedSizeArray<4, bigint>
type T1 = ResultPayload<undefined, Anonymize<T2>>
type T2 = Enum<{
  CouldNotReadInput: undefined
}>
type StorageDescriptor = {
  paid_until: {
    key: FixedSizeBinary<20>
    value: bigint
  }
  plan_price: {
    key: number
    value: Anonymize<T0>
  }
  '': {
    key: undefined
    value: {
      admin: FixedSizeBinary<20>
    }
  }
}
type MessagesDescriptor = {
  set_plan_price: {
    message: {
      plan_key: number
      new_price: Anonymize<T0>
    }
    response: Anonymize<T1>
    mutates: true
  }
  pay_subscription: {
    message: {
      team: FixedSizeBinary<20>
      plan_key: number
    }
    response: Anonymize<T1>
    payable: true
    mutates: true
  }
  paid_until: {
    message: {
      team: FixedSizeBinary<20>
    }
    response: ResultPayload<bigint, Anonymize<T2>>
  }
  price_of: {
    message: {
      plan_key: number
    }
    response: ResultPayload<Anonymize<T0> | undefined, Anonymize<T2>>
  }
}
type ConstructorsDescriptor = {
  new: {
    message: {
      admin: FixedSizeBinary<20>
      price_base: Anonymize<T0>
      price_plus: Anonymize<T0>
    }
    response: Anonymize<T1>
  }
}
type EventDescriptor = Enum<{
  SubscriptionPaid: {
    team: FixedSizeBinary<20>
    plan_key: number
    paid_until: bigint
  }
}>
export declare const descriptor: InkDescriptors<
  StorageDescriptor,
  MessagesDescriptor,
  ConstructorsDescriptor,
  EventDescriptor
>
export {}
