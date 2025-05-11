import {
  StorageDescriptor,
  PlainDescriptor,
  TxDescriptor,
  RuntimeDescriptor,
  Enum,
  QueryFromPalletsDef,
  TxFromPalletsDef,
  EventsFromPalletsDef,
  ErrorsFromPalletsDef,
  ConstFromPalletsDef,
  SS58String,
  FixedSizeBinary,
  Binary,
  FixedSizeArray,
} from 'polkadot-api'
import {
  I5sesotjlssv2d,
  Iffmde3ekjedi9,
  I4mddgoa69c0a2,
  Iabiqg569vk0k,
  I95g6i7ilua7lq,
  Ieniouoqkq4icf,
  Phase,
  Ibgl04rn6nbfm6,
  I4q39t5hn830vp,
  Ic5m5lp1oioo8r,
  I1q8tnt1cluu5j,
  I8ds64oj6581v0,
  Ia7pdug7cdsg8g,
  I9f8oguielpkem,
  I9bin2jc70qt6q,
  TransactionPaymentReleases,
  Idtkgtc4to05ia,
  I5t5eoogd7ekut,
  I8t4pajubp34g3,
  I3qklfjubrljqh,
  Iag3f1hum3p4c8,
  I7svnfko10tq2e,
  I4s6jkha20aoh0,
  I2brm5b9jij1st,
  I78s05f59eoi8b,
  In7a38730s6qs,
  If15el53dd76v9,
  I9s0ave7t0vnrk,
  I4fo08joqmcqnm,
  I8ofcg5rbj0g2c,
  I4adgbll7gku4i,
  I6pjjpfvhvcfru,
  I9pj91mj79qekl,
  I39uah9nss64h9,
  Ik64dknsq7k08,
  Ib51vk42m1po4n,
  I8r91mv11kqo2h,
  Ic6ju3fp77do49,
  I2m2h8f492qvj7,
  Ib9r5mo3ahn8u4,
  I53lq4gl06dhst,
  Idcr6u6361oad9,
  I4ktuaksf5i1gk,
  I9bqtpv2ii35mp,
  I9j7pagd6d4bda,
  I2h9pmio37r7fb,
  Ibmr18suc9ikh9,
  I9iq22t0burs89,
  I5u8olqbbvfnvf,
  I5utcetro501ir,
  I1vhgj8u0atb1n,
  I8k3rnvpeeh4hv,
  Idlk847h1qk2g0,
  Ida37oe44osb06,
  Idsg8aod8e8fqn,
  I46nktn22m6hbi,
  Ibgj1cthra7lte,
  I10ra4g1rl6k2f,
  I1uihehkdsggvp,
  Ic357tcepuvo5c,
  I2rnoam876ruhj,
  Ic5b47dj4coa3r,
  Ib3qnc19gu633c,
  Ifira6u9hi7cu1,
  I72tqocvdoqfff,
  I2i27f3sfmvc05,
  I1nlrtd1epki2d,
  I3abtumcmempjs,
  Id81m8flopt8ha,
  I8hff7chabggkd,
  I49i39mtj1ivbs,
  Ifkr2kcak2vto1,
  I1ju6r8q0cs9jt,
  I4kpeq6j7cd5bu,
  I5na1ka76k6811,
  I59mhdb9omdqfa,
  I9vl5kpk0fpakt,
  I717jt61hu19b4,
  I7f7v8192r1lmq,
  Ia82mnkmeo2rhc,
  Id41b1nccqdhkb,
  Icbccs0ug47ilf,
  I855j4i3kr8ko1,
  I27io5p4nt3tn4,
  Ifvc5tgjjgl73e,
  I980sokmk9d49d,
  I2hcot1khne4on,
  I65pfgf00q39p1,
  Icv68aq8841478,
  Ic262ibdoec56a,
  Iflcfm9b6nlmdd,
  Ijrsf4mnp3eka,
  Id5fm4p8lj5qgi,
  I8tjvj9uq4b7hi,
  I4cbvqmqadhrea,
  I3qt1hgg4djhgb,
  I4fooe9dun9o0t,
  Ier2cke86dqbr2,
  I29ai3jnl05o3c,
  I5rtkmhm2dng4u,
  I7svbvm6hg57aj,
  I88ff3u4dpivk,
  I33cp947glv1ks,
  Ic9om1gmmqu7rq,
  I5hfov2b68ppb6,
  Ibthhb2m9vneds,
  Iaitn5bqfacj7k,
  If4ebvclj2ugvi,
  Ia5le7udkgbaq9,
  Ieduc1e6frq8rb,
  I9h6gbtabovtm4,
  Ifnsa0dkkpf465,
  I65dtqr2egjbc3,
  Ibqj3vg5s5lk0c,
  I6l73u513p8rna,
  Iefqmt2htu1dlu,
  If8bgtgqrchjtu,
  Idusmq77988cmt,
  Iaqet9jc3ihboe,
  Ic952bubvq4k7d,
  I2v50gu3s1aqk6,
  Iabpgqcjikia83,
  Icgljjb6j82uhn,
  I4gil44d08grh,
  I7u915mvkdsb08,
  Idom4bv4opbkn3,
  If7uv525tdvv7a,
  Itom7fk49o0c9,
  I2an1fs2eiebjp,
  TransactionValidityTransactionSource,
  I9ask1o4tfvcvs,
  Icerf8h8pdu8ss,
  I6spmpef2c7svf,
  Iei2mvq0mjvt81,
  I22sqe2i8oe0ft,
  I4totqt881mlti,
  Iasb8k6ash5mjn,
  I35p85j063s0il,
  I1r5trie5v36he,
  I9sijb8gfrns29,
  I4s6vifaf8k998,
  Idg5sqhk4n61oc,
  I741pl2pidmim6,
  I8abab09ak4pi1,
  I4mjui2i82gvdb,
  Iehnkjehe1oeva,
  Ifbmd9e2argcmg,
  I2bl5e7he0kaq9,
  I2d63hfvrckrkc,
  Ibabtpgk9h20k6,
  Ie9sr1iqcg3cgm,
  I1mqgk2tmnn9i2,
  I6lr8sctk0bi4e,
  Ia19hov8g2tmuu,
} from './common-types'
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
type IStorage = {
  System: {
    /**
     * The full account information for a particular account ID.
     */
    Account: StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>
    /**
     * Total extrinsics count for the current block.
     */
    ExtrinsicCount: StorageDescriptor<[], number, true, never>
    /**
     * Whether all inherents have been applied.
     */
    InherentsApplied: StorageDescriptor<[], boolean, false, never>
    /**
     * The current weight for the block.
     */
    BlockWeight: StorageDescriptor<[], Anonymize<Iffmde3ekjedi9>, false, never>
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     */
    AllExtrinsicsLen: StorageDescriptor<[], number, true, never>
    /**
     * Map of block numbers to block hashes.
     */
    BlockHash: StorageDescriptor<[Key: number], FixedSizeBinary<32>, false, never>
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    ExtrinsicData: StorageDescriptor<[Key: number], Binary, false, never>
    /**
     * The current block number being processed. Set by `execute_block`.
     */
    Number: StorageDescriptor<[], number, false, never>
    /**
     * Hash of the previous block.
     */
    ParentHash: StorageDescriptor<[], FixedSizeBinary<32>, false, never>
    /**
     * Digest of the current block, also part of the block header.
     */
    Digest: StorageDescriptor<[], Anonymize<I4mddgoa69c0a2>, false, never>
    /**
     * Events deposited for the current block.
     *
     * NOTE: The item is unbound and should therefore never be read on chain.
     * It could otherwise inflate the PoV size of a block.
     *
     * Events have a large in-memory size. Box the events to not go out-of-memory
     * just in case someone still reads them from within the runtime.
     */
    Events: StorageDescriptor<[], Anonymize<Iabiqg569vk0k>, false, never>
    /**
     * The number of events in the `Events<T>` list.
     */
    EventCount: StorageDescriptor<[], number, false, never>
    /**
     * Mapping between a topic (represented by T::Hash) and a vector of indexes
     * of events in the `<Events<T>>` list.
     *
     * All topic vectors have deterministic storage locations depending on the topic. This
     * allows light-clients to leverage the changes trie storage tracking mechanism and
     * in case of changes fetch the list of events of interest.
     *
     * The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
     * the `EventIndex` then in case if the topic has the same contents on the next block
     * no notification will be triggered thus the event might be lost.
     */
    EventTopics: StorageDescriptor<
      [Key: FixedSizeBinary<32>],
      Anonymize<I95g6i7ilua7lq>,
      false,
      never
    >
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    LastRuntimeUpgrade: StorageDescriptor<[], Anonymize<Ieniouoqkq4icf>, true, never>
    /**
     * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    UpgradedToU32RefCount: StorageDescriptor<[], boolean, false, never>
    /**
     * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     * (default) if not.
     */
    UpgradedToTripleRefCount: StorageDescriptor<[], boolean, false, never>
    /**
     * The execution phase of the block.
     */
    ExecutionPhase: StorageDescriptor<[], Phase, true, never>
    /**
     * `Some` if a code upgrade has been authorized.
     */
    AuthorizedUpgrade: StorageDescriptor<[], Anonymize<Ibgl04rn6nbfm6>, true, never>
    /**
     * The weight reclaimed for the extrinsic.
     *
     * This information is available until the end of the extrinsic execution.
     * More precisely this information is removed in `note_applied_extrinsic`.
     *
     * Logic doing some post dispatch weight reduction must update this storage to avoid duplicate
     * reduction.
     */
    ExtrinsicWeightReclaimed: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, false, never>
  }
  RandomnessCollectiveFlip: {
    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     */
    RandomMaterial: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>
  }
  Timestamp: {
    /**
     * The current time for the current block.
     */
    Now: StorageDescriptor<[], bigint, false, never>
    /**
     * Whether the timestamp has been updated in this block.
     *
     * This value is updated to `true` upon successful submission of a timestamp by a node.
     * It is then checked at the end of each block execution in the `on_finalize` hook.
     */
    DidUpdate: StorageDescriptor<[], boolean, false, never>
  }
  Balances: {
    /**
     * The total units issued in the system.
     */
    TotalIssuance: StorageDescriptor<[], bigint, false, never>
    /**
     * The total units of outstanding deactivated balance in the system.
     */
    InactiveIssuance: StorageDescriptor<[], bigint, false, never>
    /**
     * The Balances pallet example of storing the balance of an account.
     *
     * # Example
     *
     * ```nocompile
     *  impl pallet_balances::Config for Runtime {
     *    type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *  }
     * ```
     *
     * You can also store the balance of an account in the `System` pallet.
     *
     * # Example
     *
     * ```nocompile
     *  impl pallet_balances::Config for Runtime {
     *   type AccountStore = System
     *  }
     * ```
     *
     * But this comes with tradeoffs, storing account balances in the system pallet stores
     * `frame_system` data alongside the account data contrary to storing account balances in the
     * `Balances` pallet, which uses a `StorageMap` to store balances data only.
     * NOTE: This is only used in the case that this pallet is used to store balances.
     */
    Account: StorageDescriptor<[Key: SS58String], Anonymize<I1q8tnt1cluu5j>, false, never>
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     *
     * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
     */
    Locks: StorageDescriptor<[Key: SS58String], Anonymize<I8ds64oj6581v0>, false, never>
    /**
     * Named reserves on some account balances.
     *
     * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
     */
    Reserves: StorageDescriptor<[Key: SS58String], Anonymize<Ia7pdug7cdsg8g>, false, never>
    /**
     * Holds on account balances.
     */
    Holds: StorageDescriptor<[Key: SS58String], Anonymize<I9f8oguielpkem>, false, never>
    /**
     * Freeze locks on account balances.
     */
    Freezes: StorageDescriptor<[Key: SS58String], Anonymize<I9bin2jc70qt6q>, false, never>
  }
  Authorship: {
    /**
     * Author of current block.
     */
    Author: StorageDescriptor<[], SS58String, true, never>
  }
  TransactionPayment: {
    /**
        
         */
    NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>
    /**
        
         */
    StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>
  }
  Sudo: {
    /**
     * The `AccountId` of the sudo key.
     */
    Key: StorageDescriptor<[], SS58String, true, never>
  }
  Revive: {
    /**
     * A mapping from a contract's code hash to its code.
     */
    PristineCode: StorageDescriptor<[Key: FixedSizeBinary<32>], Binary, true, never>
    /**
     * A mapping from a contract's code hash to its code info.
     */
    CodeInfoOf: StorageDescriptor<
      [Key: FixedSizeBinary<32>],
      Anonymize<Idtkgtc4to05ia>,
      true,
      never
    >
    /**
     * The code associated with a given account.
     */
    ContractInfoOf: StorageDescriptor<
      [Key: FixedSizeBinary<20>],
      Anonymize<I5t5eoogd7ekut>,
      true,
      never
    >
    /**
     * The immutable data associated with a given account.
     */
    ImmutableDataOf: StorageDescriptor<[Key: FixedSizeBinary<20>], Binary, true, never>
    /**
     * Evicted contracts that await child trie deletion.
     *
     * Child trie deletion is a heavy operation depending on the amount of storage items
     * stored in said trie. Therefore this operation is performed lazily in `on_idle`.
     */
    DeletionQueue: StorageDescriptor<[Key: number], Binary, true, never>
    /**
     * A pair of monotonic counters used to track the latest contract marked for deletion
     * and the latest deleted contract in queue.
     */
    DeletionQueueCounter: StorageDescriptor<[], Anonymize<I8t4pajubp34g3>, false, never>
    /**
     * Map a Ethereum address to its original `AccountId32`.
     *
     * When deriving a `H160` from an `AccountId32` we use a hash function. In order to
     * reconstruct the original account we need to store the reverse mapping here.
     * Register your `AccountId32` using [`Pallet::map_account`] in order to
     * use it with this pallet.
     */
    OriginalAccount: StorageDescriptor<[Key: FixedSizeBinary<20>], SS58String, true, never>
  }
  Assets: {
    /**
     * Details of an asset.
     */
    Asset: StorageDescriptor<[Key: number], Anonymize<I3qklfjubrljqh>, true, never>
    /**
     * The holdings of a specific account for a specific asset.
     */
    Account: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Iag3f1hum3p4c8>, true, never>
    /**
     * Approved balance transfers. First balance is the amount approved for transfer. Second
     * is the amount of `T::Currency` reserved for storing this.
     * First key is the asset ID, second key is the owner and third key is the delegate.
     */
    Approvals: StorageDescriptor<Anonymize<I2brm5b9jij1st>, Anonymize<I4s6jkha20aoh0>, true, never>
    /**
     * Metadata of an asset.
     */
    Metadata: StorageDescriptor<[Key: number], Anonymize<I78s05f59eoi8b>, false, never>
    /**
     * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
     * item has no effect.
     *
     * This can be useful for setting up constraints for IDs of the new assets. For example, by
     * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
     * auto-increment model can be applied to all new asset IDs.
     *
     * The initial next asset ID can be set using the [`GenesisConfig`] or the
     * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
     */
    NextAssetId: StorageDescriptor<[], number, true, never>
  }
}
type ICalls = {
  System: {
    /**
     *Make some on-chain remark.
     *
     *Can be executed by every `origin`.
     */
    remark: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>
    /**
     *Set the number of pages in the WebAssembly environment's heap.
     */
    set_heap_pages: TxDescriptor<Anonymize<I4adgbll7gku4i>>
    /**
     *Set the new runtime code.
     */
    set_code: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>
    /**
     *Set the new runtime code without doing any checks of the given `code`.
     *
     *Note that runtime upgrades will not run if this is called with a not-increasing spec
     *version!
     */
    set_code_without_checks: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>
    /**
     *Set some items of storage.
     */
    set_storage: TxDescriptor<Anonymize<I9pj91mj79qekl>>
    /**
     *Kill some items from storage.
     */
    kill_storage: TxDescriptor<Anonymize<I39uah9nss64h9>>
    /**
     *Kill all storage items with a key that starts with the given prefix.
     *
     ***NOTE:** We rely on the Root origin to provide us the number of subkeys under
     *the prefix we are removing to accurately calculate the weight of this function.
     */
    kill_prefix: TxDescriptor<Anonymize<Ik64dknsq7k08>>
    /**
     *Make some on-chain remark and emit event.
     */
    remark_with_event: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>
    /**
     *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     *later.
     *
     *This call requires Root origin.
     */
    authorize_upgrade: TxDescriptor<Anonymize<Ib51vk42m1po4n>>
    /**
     *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     *later.
     *
     *WARNING: This authorizes an upgrade that will take place without any safety checks, for
     *example that the spec name remains the same and that the version number increases. Not
     *recommended for normal use. Use `authorize_upgrade` instead.
     *
     *This call requires Root origin.
     */
    authorize_upgrade_without_checks: TxDescriptor<Anonymize<Ib51vk42m1po4n>>
    /**
     *Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
     *
     *If the authorization required a version check, this call will ensure the spec name
     *remains unchanged and that the spec version has increased.
     *
     *Depending on the runtime's `OnSetCode` configuration, this function may directly apply
     *the new `code` in the same block or attempt to schedule the upgrade.
     *
     *All origins are allowed.
     */
    apply_authorized_upgrade: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>
  }
  Utility: {
    /**
     *Send a batch of dispatch calls.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     *
     *This will return `Ok` in all circumstances. To determine the success of the batch, an
     *event is deposited. If a call failed and the batch was interrupted, then the
     *`BatchInterrupted` event is deposited, along with the number of successful calls made
     *and the error of the failed call. If all were successful, then the `BatchCompleted`
     *event is deposited.
     */
    batch: TxDescriptor<Anonymize<I8r91mv11kqo2h>>
    /**
     *Send a call through an indexed pseudonym of the sender.
     *
     *Filter from origin are passed along. The call will be dispatched with an origin which
     *use the same filter as the origin of this call.
     *
     *NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     *because you expect `proxy` to have been used prior in the call stack and you do not want
     *the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     *in the Multisig pallet instead.
     *
     *NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    as_derivative: TxDescriptor<Anonymize<Ic6ju3fp77do49>>
    /**
     *Send a batch of dispatch calls and atomically execute them.
     *The whole transaction will rollback and fail if any of the calls failed.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    batch_all: TxDescriptor<Anonymize<I8r91mv11kqo2h>>
    /**
     *Dispatches a function call with a provided origin.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *## Complexity
     *- O(1).
     */
    dispatch_as: TxDescriptor<Anonymize<I2m2h8f492qvj7>>
    /**
     *Send a batch of dispatch calls.
     *Unlike `batch`, it allows errors and won't interrupt.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatch without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    force_batch: TxDescriptor<Anonymize<I8r91mv11kqo2h>>
    /**
     *Dispatch a function call with a specified weight.
     *
     *This function does not check the weight of the call, and instead allows the
     *Root origin to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    with_weight: TxDescriptor<Anonymize<Ib9r5mo3ahn8u4>>
    /**
     *Dispatch a fallback call in the event the main call fails to execute.
     *May be called from any origin except `None`.
     *
     *This function first attempts to dispatch the `main` call.
     *If the `main` call fails, the `fallback` is attemted.
     *if the fallback is successfully dispatched, the weights of both calls
     *are accumulated and an event containing the main call error is deposited.
     *
     *In the event of a fallback failure the whole call fails
     *with the weights returned.
     *
     *- `main`: The main call to be dispatched. This is the primary action to execute.
     *- `fallback`: The fallback call to be dispatched in case the `main` call fails.
     *
     *## Dispatch Logic
     *- If the origin is `root`, both the main and fallback calls are executed without
     *  applying any origin filters.
     *- If the origin is not `root`, the origin filter is applied to both the `main` and
     *  `fallback` calls.
     *
     *## Use Case
     *- Some use cases might involve submitting a `batch` type call in either main, fallback
     *  or both.
     */
    if_else: TxDescriptor<Anonymize<I53lq4gl06dhst>>
    /**
     *Dispatches a function call with a provided origin.
     *
     *Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    dispatch_as_fallible: TxDescriptor<Anonymize<I2m2h8f492qvj7>>
  }
  Timestamp: {
    /**
     *Set the current time.
     *
     *This call should be invoked exactly once per block. It will panic at the finalization
     *phase, if this call hasn't been invoked by that time.
     *
     *The timestamp should be greater than the previous one by the amount specified by
     *[`Config::MinimumPeriod`].
     *
     *The dispatch origin for this call must be _None_.
     *
     *This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
     *that changing the complexity of this call could result exhausting the resources in a
     *block to execute any other calls.
     *
     *## Complexity
     *- `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     *- 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
     *  `on_finalize`)
     *- 1 event handler `on_timestamp_set`. Must be `O(1)`.
     */
    set: TxDescriptor<Anonymize<Idcr6u6361oad9>>
  }
  Balances: {
    /**
     *Transfer some liquid free balance to another account.
     *
     *`transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     *If the sender's account is below the existential deposit as a result
     *of the transfer, the account will be reaped.
     *
     *The dispatch origin for this call must be `Signed` by the transactor.
     */
    transfer_allow_death: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>
    /**
     *Exactly as `transfer_allow_death`, except the origin must be root and the source account
     *may be specified.
     */
    force_transfer: TxDescriptor<Anonymize<I9bqtpv2ii35mp>>
    /**
     *Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     *kill the origin account.
     *
     *99% of the time you want [`transfer_allow_death`] instead.
     *
     *[`transfer_allow_death`]: struct.Pallet.html#method.transfer
     */
    transfer_keep_alive: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>
    /**
     *Transfer the entire transferable balance from the caller account.
     *
     *NOTE: This function only attempts to transfer _transferable_ balances. This means that
     *any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     *transferred by this function. To ensure that this function results in a killed account,
     *you might need to prepare the account by removing any reference counters, storage
     *deposits, etc...
     *
     *The dispatch origin of this call must be Signed.
     *
     *- `dest`: The recipient of the transfer.
     *- `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *  of the funds the account has, causing the sender account to be killed (false), or
     *  transfer everything except at least the existential deposit, which will guarantee to
     *  keep the sender account alive (true).
     */
    transfer_all: TxDescriptor<Anonymize<I9j7pagd6d4bda>>
    /**
     *Unreserve some balance from a user by force.
     *
     *Can only be called by ROOT.
     */
    force_unreserve: TxDescriptor<Anonymize<I2h9pmio37r7fb>>
    /**
     *Upgrade a specified account.
     *
     *- `origin`: Must be `Signed`.
     *- `who`: The account to be upgraded.
     *
     *This will waive the transaction fee if at least all but 10% of the accounts needed to
     *be upgraded. (We let some not have to be upgraded just in order to allow for the
     *possibility of churn).
     */
    upgrade_accounts: TxDescriptor<Anonymize<Ibmr18suc9ikh9>>
    /**
     *Set the regular balance of a given account.
     *
     *The dispatch origin for this call is `root`.
     */
    force_set_balance: TxDescriptor<Anonymize<I9iq22t0burs89>>
    /**
     *Adjust the total issuance in a saturating way.
     *
     *Can only be called by root and always needs a positive `delta`.
     *
     *# Example
     */
    force_adjust_total_issuance: TxDescriptor<Anonymize<I5u8olqbbvfnvf>>
    /**
     *Burn the specified liquid free balance from the origin account.
     *
     *If the origin's account ends up below the existential deposit as a result
     *of the burn and `keep_alive` is false, the account will be reaped.
     *
     *Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
     *this `burn` operation will reduce total issuance by the amount _burned_.
     */
    burn: TxDescriptor<Anonymize<I5utcetro501ir>>
  }
  Sudo: {
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     */
    sudo: TxDescriptor<Anonymize<I1vhgj8u0atb1n>>
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     *This function does not check the weight of the call, and instead allows the
     *Sudo user to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    sudo_unchecked_weight: TxDescriptor<Anonymize<Ib9r5mo3ahn8u4>>
    /**
     *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     *key.
     */
    set_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>
    /**
     *Authenticates the sudo key and dispatches a function call with `Signed` origin from
     *a given account.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    sudo_as: TxDescriptor<Anonymize<Idlk847h1qk2g0>>
    /**
     *Permanently removes the sudo key.
     *
     ***This cannot be un-done.**
     */
    remove_key: TxDescriptor<undefined>
  }
  Revive: {
    /**
     *A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
     *
     *# Parameters
     *
     ** `payload`: The encoded [`crate::evm::TransactionSigned`].
     ** `gas_limit`: The gas limit enforced during contract execution.
     ** `storage_deposit_limit`: The maximum balance that can be charged to the caller for
     *  storage usage.
     *
     *# Note
     *
     *This call cannot be dispatched directly; attempting to do so will result in a failed
     *transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the
     *runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the
     *signer and validating the transaction.
     */
    eth_transact: TxDescriptor<Anonymize<Ida37oe44osb06>>
    /**
     *Makes a call to an account, optionally transferring some balance.
     *
     *# Parameters
     *
     ** `dest`: Address of the contract to call.
     ** `value`: The balance to transfer from the `origin` to `dest`.
     ** `gas_limit`: The gas limit enforced when executing the constructor.
     ** `storage_deposit_limit`: The maximum amount of balance that can be charged from the
     *  caller to pay for the storage consumed.
     ** `data`: The input data to pass to the contract.
     *
     ** If the account is a smart-contract account, the associated code will be
     *executed and any value will be transferred.
     ** If the account is a regular account, any value will be transferred.
     ** If no account exists and the call value is not less than `existential_deposit`,
     *a regular account will be created and any value will be transferred.
     */
    call: TxDescriptor<Anonymize<Idsg8aod8e8fqn>>
    /**
     *Instantiates a contract from a previously deployed wasm binary.
     *
     *This function is identical to [`Self::instantiate_with_code`] but without the
     *code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
     *must be supplied.
     */
    instantiate: TxDescriptor<Anonymize<I46nktn22m6hbi>>
    /**
     *Instantiates a new contract from the supplied `code` optionally transferring
     *some balance.
     *
     *This dispatchable has the same effect as calling [`Self::upload_code`] +
     *[`Self::instantiate`]. Bundling them together provides efficiency gains. Please
     *also check the documentation of [`Self::upload_code`].
     *
     *# Parameters
     *
     ** `value`: The balance to transfer from the `origin` to the newly created contract.
     ** `gas_limit`: The gas limit enforced when executing the constructor.
     ** `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
     *  from the caller to pay for the storage consumed.
     ** `code`: The contract code to deploy in raw bytes.
     ** `data`: The input data to pass to the contract constructor.
     ** `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2`
     *	semantics are used. If `None` then `CRATE1` is used.
     *
     *
     *Instantiation is executed as follows:
     *
     *- The supplied `code` is deployed, and a `code_hash` is created for that code.
     *- If the `code_hash` already exists on the chain the underlying `code` will be shared.
     *- The destination address is computed based on the sender, code_hash and the salt.
     *- The smart-contract account is created at the computed address.
     *- The `value` is transferred to the new account.
     *- The `deploy` function is executed in the context of the newly-created account.
     */
    instantiate_with_code: TxDescriptor<Anonymize<Ibgj1cthra7lte>>
    /**
     *Upload new `code` without instantiating a contract from it.
     *
     *If the code does not already exist a deposit is reserved from the caller
     *and unreserved only when [`Self::remove_code`] is called. The size of the reserve
     *depends on the size of the supplied `code`.
     *
     *# Note
     *
     *Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
     *To avoid this situation a constructor could employ access control so that it can
     *only be instantiated by permissioned entities. The same is true when uploading
     *through [`Self::instantiate_with_code`].
     */
    upload_code: TxDescriptor<Anonymize<I10ra4g1rl6k2f>>
    /**
     *Remove the code stored under `code_hash` and refund the deposit to its owner.
     *
     *A code can only be removed by its original uploader (its owner) and only if it is
     *not used by any contract.
     */
    remove_code: TxDescriptor<Anonymize<Ib51vk42m1po4n>>
    /**
     *Privileged function that changes the code of an existing contract.
     *
     *This takes care of updating refcounts and all other necessary operations. Returns
     *an error if either the `code_hash` or `dest` do not exist.
     *
     *# Note
     *
     *This does **not** change the address of the contract in question. This means
     *that the contract address is no longer derived from its code hash after calling
     *this dispatchable.
     */
    set_code: TxDescriptor<Anonymize<I1uihehkdsggvp>>
    /**
     *Register the callers account id so that it can be used in contract interactions.
     *
     *This will error if the origin is already mapped or is a eth native `Address20`. It will
     *take a deposit that can be released by calling [`Self::unmap_account`].
     */
    map_account: TxDescriptor<undefined>
    /**
     *Unregister the callers account id in order to free the deposit.
     *
     *There is no reason to ever call this function other than freeing up the deposit.
     *This is only useful when the account should no longer be used.
     */
    unmap_account: TxDescriptor<undefined>
    /**
     *Dispatch an `call` with the origin set to the callers fallback address.
     *
     *Every `AccountId32` can control its corresponding fallback account. The fallback account
     *is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
     *recovery function in case an `AccountId20` was used without creating a mapping first.
     */
    dispatch_as_fallback_account: TxDescriptor<Anonymize<I1vhgj8u0atb1n>>
  }
  Assets: {
    /**
     *Issue a new class of fungible assets from a public origin.
     *
     *This new asset class has no assets initially and its owner is the origin.
     *
     *The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     *Funds of sender are reserved by `AssetDeposit`.
     *
     *Parameters:
     *- `id`: The identifier of the new asset. This must not be currently in use to identify
     *an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     *- `admin`: The admin of this class of assets. The admin is the initial address of each
     *member of the asset class's admin team.
     *- `min_balance`: The minimum balance of this new asset that any single account must
     *have. If an account's balance is reduced below this, then it collapses to zero.
     *
     *Emits `Created` event when successful.
     *
     *Weight: `O(1)`
     */
    create: TxDescriptor<Anonymize<Ic357tcepuvo5c>>
    /**
     *Issue a new class of fungible assets from a privileged origin.
     *
     *This new asset class has no assets initially.
     *
     *The origin must conform to `ForceOrigin`.
     *
     *Unlike `create`, no funds are reserved.
     *
     *- `id`: The identifier of the new asset. This must not be currently in use to identify
     *an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     *- `owner`: The owner of this class of assets. The owner has full superuser permissions
     *over this asset, but may later change and configure the permissions using
     *`transfer_ownership` and `set_team`.
     *- `min_balance`: The minimum balance of this new asset that any single account must
     *have. If an account's balance is reduced below this, then it collapses to zero.
     *
     *Emits `ForceCreated` event when successful.
     *
     *Weight: `O(1)`
     */
    force_create: TxDescriptor<Anonymize<I2rnoam876ruhj>>
    /**
     *Start the process of destroying a fungible asset class.
     *
     *`start_destroy` is the first in a series of extrinsics that should be called, to allow
     *destruction of an asset class.
     *
     *The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
     *
     *- `id`: The identifier of the asset to be destroyed. This must identify an existing
     *  asset.
     *
     *It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     *an account contains holds or freezes in place.
     */
    start_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Destroy all accounts associated with a given asset.
     *
     *`destroy_accounts` should only be called after `start_destroy` has been called, and the
     *asset is in a `Destroying` state.
     *
     *Due to weight restrictions, this function may need to be called multiple times to fully
     *destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
     *
     *- `id`: The identifier of the asset to be destroyed. This must identify an existing
     *  asset.
     *
     *Each call emits the `Event::DestroyedAccounts` event.
     */
    destroy_accounts: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
     *
     *`destroy_approvals` should only be called after `start_destroy` has been called, and the
     *asset is in a `Destroying` state.
     *
     *Due to weight restrictions, this function may need to be called multiple times to fully
     *destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
     *
     *- `id`: The identifier of the asset to be destroyed. This must identify an existing
     *  asset.
     *
     *Each call emits the `Event::DestroyedApprovals` event.
     */
    destroy_approvals: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Complete destroying asset and unreserve currency.
     *
     *`finish_destroy` should only be called after `start_destroy` has been called, and the
     *asset is in a `Destroying` state. All accounts or approvals should be destroyed before
     *hand.
     *
     *- `id`: The identifier of the asset to be destroyed. This must identify an existing
     *  asset.
     *
     *Each successful call emits the `Event::Destroyed` event.
     */
    finish_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Mint assets of a particular class.
     *
     *The origin must be Signed and the sender must be the Issuer of the asset `id`.
     *
     *- `id`: The identifier of the asset to have some amount minted.
     *- `beneficiary`: The account to be credited with the minted assets.
     *- `amount`: The amount of the asset to be minted.
     *
     *Emits `Issued` event when successful.
     *
     *Weight: `O(1)`
     *Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
     */
    mint: TxDescriptor<Anonymize<Ib3qnc19gu633c>>
    /**
     *Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
     *
     *Origin must be Signed and the sender should be the Manager of the asset `id`.
     *
     *Bails with `NoAccount` if the `who` is already dead.
     *
     *- `id`: The identifier of the asset to have some amount burned.
     *- `who`: The account to be debited from.
     *- `amount`: The maximum amount by which `who`'s balance should be reduced.
     *
     *Emits `Burned` with the actual amount burned. If this takes the balance to below the
     *minimum for the asset, then the amount burned is increased to take it to zero.
     *
     *Weight: `O(1)`
     *Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
     */
    burn: TxDescriptor<Anonymize<Ifira6u9hi7cu1>>
    /**
     *Move some assets from the sender account to another.
     *
     *Origin must be Signed.
     *
     *- `id`: The identifier of the asset to have some amount transferred.
     *- `target`: The account to be credited.
     *- `amount`: The amount by which the sender's balance of assets should be reduced and
     *`target`'s balance increased. The amount actually transferred may be slightly greater in
     *the case that the transfer would otherwise take the sender balance above zero but below
     *the minimum balance. Must be greater than zero.
     *
     *Emits `Transferred` with the actual amount transferred. If this takes the source balance
     *to below the minimum for the asset, then the amount transferred is increased to take it
     *to zero.
     *
     *Weight: `O(1)`
     *Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     *`target`.
     */
    transfer: TxDescriptor<Anonymize<I72tqocvdoqfff>>
    /**
     *Move some assets from the sender account to another, keeping the sender account alive.
     *
     *Origin must be Signed.
     *
     *- `id`: The identifier of the asset to have some amount transferred.
     *- `target`: The account to be credited.
     *- `amount`: The amount by which the sender's balance of assets should be reduced and
     *`target`'s balance increased. The amount actually transferred may be slightly greater in
     *the case that the transfer would otherwise take the sender balance above zero but below
     *the minimum balance. Must be greater than zero.
     *
     *Emits `Transferred` with the actual amount transferred. If this takes the source balance
     *to below the minimum for the asset, then the amount transferred is increased to take it
     *to zero.
     *
     *Weight: `O(1)`
     *Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     *`target`.
     */
    transfer_keep_alive: TxDescriptor<Anonymize<I72tqocvdoqfff>>
    /**
     *Move some assets from one account to another.
     *
     *Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     *- `id`: The identifier of the asset to have some amount transferred.
     *- `source`: The account to be debited.
     *- `dest`: The account to be credited.
     *- `amount`: The amount by which the `source`'s balance of assets should be reduced and
     *`dest`'s balance increased. The amount actually transferred may be slightly greater in
     *the case that the transfer would otherwise take the `source` balance above zero but
     *below the minimum balance. Must be greater than zero.
     *
     *Emits `Transferred` with the actual amount transferred. If this takes the source balance
     *to below the minimum for the asset, then the amount transferred is increased to take it
     *to zero.
     *
     *Weight: `O(1)`
     *Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
     *`dest`.
     */
    force_transfer: TxDescriptor<Anonymize<I2i27f3sfmvc05>>
    /**
     *Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
     *must already exist as an entry in `Account`s of the asset. If you want to freeze an
     *account that does not have an entry, use `touch_other` first.
     *
     *Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     *- `id`: The identifier of the asset to be frozen.
     *- `who`: The account to be frozen.
     *
     *Emits `Frozen`.
     *
     *Weight: `O(1)`
     */
    freeze: TxDescriptor<Anonymize<I1nlrtd1epki2d>>
    /**
     *Allow unprivileged transfers to and from an account again.
     *
     *Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     *- `id`: The identifier of the asset to be frozen.
     *- `who`: The account to be unfrozen.
     *
     *Emits `Thawed`.
     *
     *Weight: `O(1)`
     */
    thaw: TxDescriptor<Anonymize<I1nlrtd1epki2d>>
    /**
     *Disallow further unprivileged transfers for the asset class.
     *
     *Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     *- `id`: The identifier of the asset to be frozen.
     *
     *Emits `Frozen`.
     *
     *Weight: `O(1)`
     */
    freeze_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Allow unprivileged transfers for the asset again.
     *
     *Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     *- `id`: The identifier of the asset to be thawed.
     *
     *Emits `Thawed`.
     *
     *Weight: `O(1)`
     */
    thaw_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Change the Owner of an asset.
     *
     *Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     *- `id`: The identifier of the asset.
     *- `owner`: The new Owner of this asset.
     *
     *Emits `OwnerChanged`.
     *
     *Weight: `O(1)`
     */
    transfer_ownership: TxDescriptor<Anonymize<I3abtumcmempjs>>
    /**
     *Change the Issuer, Admin and Freezer of an asset.
     *
     *Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     *- `id`: The identifier of the asset to be frozen.
     *- `issuer`: The new Issuer of this asset.
     *- `admin`: The new Admin of this asset.
     *- `freezer`: The new Freezer of this asset.
     *
     *Emits `TeamChanged`.
     *
     *Weight: `O(1)`
     */
    set_team: TxDescriptor<Anonymize<Id81m8flopt8ha>>
    /**
     *Set the metadata for an asset.
     *
     *Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     *Funds of sender are reserved according to the formula:
     *`MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
     *account any already reserved funds.
     *
     *- `id`: The identifier of the asset to update.
     *- `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     *- `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     *- `decimals`: The number of decimals this asset uses to represent one unit.
     *
     *Emits `MetadataSet`.
     *
     *Weight: `O(1)`
     */
    set_metadata: TxDescriptor<Anonymize<I8hff7chabggkd>>
    /**
     *Clear the metadata for an asset.
     *
     *Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     *Any deposit is freed for the asset owner.
     *
     *- `id`: The identifier of the asset to clear.
     *
     *Emits `MetadataCleared`.
     *
     *Weight: `O(1)`
     */
    clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Force the metadata for an asset to some value.
     *
     *Origin must be ForceOrigin.
     *
     *Any deposit is left alone.
     *
     *- `id`: The identifier of the asset to update.
     *- `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     *- `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     *- `decimals`: The number of decimals this asset uses to represent one unit.
     *
     *Emits `MetadataSet`.
     *
     *Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
     */
    force_set_metadata: TxDescriptor<Anonymize<I49i39mtj1ivbs>>
    /**
     *Clear the metadata for an asset.
     *
     *Origin must be ForceOrigin.
     *
     *Any deposit is returned.
     *
     *- `id`: The identifier of the asset to clear.
     *
     *Emits `MetadataCleared`.
     *
     *Weight: `O(1)`
     */
    force_clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Alter the attributes of a given asset.
     *
     *Origin must be `ForceOrigin`.
     *
     *- `id`: The identifier of the asset.
     *- `owner`: The new Owner of this asset.
     *- `issuer`: The new Issuer of this asset.
     *- `admin`: The new Admin of this asset.
     *- `freezer`: The new Freezer of this asset.
     *- `min_balance`: The minimum balance of this new asset that any single account must
     *have. If an account's balance is reduced below this, then it collapses to zero.
     *- `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
     *value to account for the state bloat associated with its balance storage. If set to
     *`true`, then non-zero balances may be stored without a `consumer` reference (and thus
     *an ED in the Balances pallet or whatever else is used to control user-account state
     *growth).
     *- `is_frozen`: Whether this asset class is frozen except for permissioned/admin
     *instructions.
     *
     *Emits `AssetStatusChanged` with the identity of the asset.
     *
     *Weight: `O(1)`
     */
    force_asset_status: TxDescriptor<Anonymize<Ifkr2kcak2vto1>>
    /**
     *Approve an amount of asset for transfer by a delegated third-party account.
     *
     *Origin must be Signed.
     *
     *Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
     *for the purpose of holding the approval. If some non-zero amount of assets is already
     *approved from signing account to `delegate`, then it is topped up or unreserved to
     *meet the right value.
     *
     *NOTE: The signing account does not need to own `amount` of assets at the point of
     *making this call.
     *
     *- `id`: The identifier of the asset.
     *- `delegate`: The account to delegate permission to transfer asset.
     *- `amount`: The amount of asset that may be transferred by `delegate`. If there is
     *already an approval in place, then this acts additively.
     *
     *Emits `ApprovedTransfer` on success.
     *
     *Weight: `O(1)`
     */
    approve_transfer: TxDescriptor<Anonymize<I1ju6r8q0cs9jt>>
    /**
     *Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     *Origin must be Signed and there must be an approval in place between signer and
     *`delegate`.
     *
     *Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     *- `id`: The identifier of the asset.
     *- `delegate`: The account delegated permission to transfer asset.
     *
     *Emits `ApprovalCancelled` on success.
     *
     *Weight: `O(1)`
     */
    cancel_approval: TxDescriptor<Anonymize<I4kpeq6j7cd5bu>>
    /**
     *Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     *Origin must be either ForceOrigin or Signed origin with the signer being the Admin
     *account of the asset `id`.
     *
     *Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     *- `id`: The identifier of the asset.
     *- `delegate`: The account delegated permission to transfer asset.
     *
     *Emits `ApprovalCancelled` on success.
     *
     *Weight: `O(1)`
     */
    force_cancel_approval: TxDescriptor<Anonymize<I5na1ka76k6811>>
    /**
     *Transfer some asset balance from a previously delegated account to some third-party
     *account.
     *
     *Origin must be Signed and there must be an approval in place by the `owner` to the
     *signer.
     *
     *If the entire amount approved for transfer is transferred, then any deposit previously
     *reserved by `approve_transfer` is unreserved.
     *
     *- `id`: The identifier of the asset.
     *- `owner`: The account which previously approved for a transfer of at least `amount` and
     *from which the asset balance will be withdrawn.
     *- `destination`: The account to which the asset balance of `amount` will be transferred.
     *- `amount`: The amount of assets to transfer.
     *
     *Emits `TransferredApproved` on success.
     *
     *Weight: `O(1)`
     */
    transfer_approved: TxDescriptor<Anonymize<I59mhdb9omdqfa>>
    /**
     *Create an asset account for non-provider assets.
     *
     *A deposit will be taken from the signer account.
     *
     *- `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     *  to be taken.
     *- `id`: The identifier of the asset for the account to be created.
     *
     *Emits `Touched` event when successful.
     */
    touch: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>
    /**
     *Return the deposit (if any) of an asset account or a consumer reference (if any) of an
     *account.
     *
     *The origin must be Signed.
     *
     *- `id`: The identifier of the asset for which the caller would like the deposit
     *  refunded.
     *- `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
     *
     *It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     *the asset account contains holds or freezes in place.
     *
     *Emits `Refunded` event when successful.
     */
    refund: TxDescriptor<Anonymize<I9vl5kpk0fpakt>>
    /**
     *Sets the minimum balance of an asset.
     *
     *Only works if there aren't any accounts that are holding the asset or if
     *the new value of `min_balance` is less than the old one.
     *
     *Origin must be Signed and the sender has to be the Owner of the
     *asset `id`.
     *
     *- `id`: The identifier of the asset.
     *- `min_balance`: The new value of `min_balance`.
     *
     *Emits `AssetMinBalanceChanged` event when successful.
     */
    set_min_balance: TxDescriptor<Anonymize<I717jt61hu19b4>>
    /**
     *Create an asset account for `who`.
     *
     *A deposit will be taken from the signer account.
     *
     *- `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
     *  must have sufficient funds for a deposit to be taken.
     *- `id`: The identifier of the asset for the account to be created.
     *- `who`: The account to be created.
     *
     *Emits `Touched` event when successful.
     */
    touch_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>
    /**
     *Return the deposit (if any) of a target asset account. Useful if you are the depositor.
     *
     *The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
     *order to burn a non-zero balance of the asset, the caller must be the account and should
     *use `refund`.
     *
     *- `id`: The identifier of the asset for the account holding a deposit.
     *- `who`: The account to refund.
     *
     *It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     *the asset account contains holds or freezes in place.
     *
     *Emits `Refunded` event when successful.
     */
    refund_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>
    /**
     *Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
     *
     *Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     *- `id`: The identifier of the account's asset.
     *- `who`: The account to be unblocked.
     *
     *Emits `Blocked`.
     *
     *Weight: `O(1)`
     */
    block: TxDescriptor<Anonymize<I1nlrtd1epki2d>>
    /**
     *Transfer the entire transferable balance from the caller asset account.
     *
     *NOTE: This function only attempts to transfer _transferable_ balances. This means that
     *any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
     *transferred by this function. To ensure that this function results in a killed account,
     *you might need to prepare the account by removing any reference counters, storage
     *deposits, etc...
     *
     *The dispatch origin of this call must be Signed.
     *
     *- `id`: The identifier of the asset for the account holding a deposit.
     *- `dest`: The recipient of the transfer.
     *- `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *  of the funds the asset account has, causing the sender asset account to be killed
     *  (false), or transfer everything except at least the minimum balance, which will
     *  guarantee to keep the sender asset account alive (true).
     */
    transfer_all: TxDescriptor<Anonymize<I7f7v8192r1lmq>>
  }
}
type IEvent = {
  System: {
    /**
     *An extrinsic completed successfully.
     */
    ExtrinsicSuccess: PlainDescriptor<Anonymize<Ia82mnkmeo2rhc>>
    /**
     *An extrinsic failed.
     */
    ExtrinsicFailed: PlainDescriptor<Anonymize<Id41b1nccqdhkb>>
    /**
     *`:code` was updated.
     */
    CodeUpdated: PlainDescriptor<undefined>
    /**
     *A new account was created.
     */
    NewAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>
    /**
     *An account was reaped.
     */
    KilledAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>
    /**
     *On on-chain remark happened.
     */
    Remarked: PlainDescriptor<Anonymize<I855j4i3kr8ko1>>
    /**
     *An upgrade was authorized.
     */
    UpgradeAuthorized: PlainDescriptor<Anonymize<Ibgl04rn6nbfm6>>
    /**
     *An invalid authorized upgrade was rejected while trying to apply it.
     */
    RejectedInvalidAuthorizedUpgrade: PlainDescriptor<Anonymize<I27io5p4nt3tn4>>
  }
  Utility: {
    /**
     *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     *well as the error.
     */
    BatchInterrupted: PlainDescriptor<Anonymize<Ifvc5tgjjgl73e>>
    /**
     *Batch of dispatches completed fully with no error.
     */
    BatchCompleted: PlainDescriptor<undefined>
    /**
     *Batch of dispatches completed but has errors.
     */
    BatchCompletedWithErrors: PlainDescriptor<undefined>
    /**
     *A single item within a Batch of dispatches has completed with no error.
     */
    ItemCompleted: PlainDescriptor<undefined>
    /**
     *A single item within a Batch of dispatches has completed with error.
     */
    ItemFailed: PlainDescriptor<Anonymize<I980sokmk9d49d>>
    /**
     *A call was dispatched.
     */
    DispatchedAs: PlainDescriptor<Anonymize<I2hcot1khne4on>>
    /**
     *Main call was dispatched.
     */
    IfElseMainSuccess: PlainDescriptor<undefined>
    /**
     *The fallback call was dispatched.
     */
    IfElseFallbackCalled: PlainDescriptor<Anonymize<I65pfgf00q39p1>>
  }
  Balances: {
    /**
     *An account was created with some free balance.
     */
    Endowed: PlainDescriptor<Anonymize<Icv68aq8841478>>
    /**
     *An account was removed whose balance was non-zero but below ExistentialDeposit,
     *resulting in an outright loss.
     */
    DustLost: PlainDescriptor<Anonymize<Ic262ibdoec56a>>
    /**
     *Transfer succeeded.
     */
    Transfer: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>
    /**
     *A balance was set by root.
     */
    BalanceSet: PlainDescriptor<Anonymize<Ijrsf4mnp3eka>>
    /**
     *Some balance was reserved (moved from free to reserved).
     */
    Reserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some balance was unreserved (moved from reserved to free).
     */
    Unreserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some balance was moved from the reserve of the first account to the second account.
     *Final argument indicates the destination balance type.
     */
    ReserveRepatriated: PlainDescriptor<Anonymize<I8tjvj9uq4b7hi>>
    /**
     *Some amount was deposited (e.g. for transaction fees).
     */
    Deposit: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    Withdraw: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was removed from the account (e.g. for misbehavior).
     */
    Slashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was minted into an account.
     */
    Minted: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was burned from an account.
     */
    Burned: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was suspended from an account (it can be restored later).
     */
    Suspended: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some amount was restored into an account.
     */
    Restored: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *An account was upgraded.
     */
    Upgraded: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>
    /**
     *Total issuance was increased by `amount`, creating a credit to be balanced.
     */
    Issued: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>
    /**
     *Total issuance was decreased by `amount`, creating a debt to be balanced.
     */
    Rescinded: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>
    /**
     *Some balance was locked.
     */
    Locked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some balance was unlocked.
     */
    Unlocked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some balance was frozen.
     */
    Frozen: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *Some balance was thawed.
     */
    Thawed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>
    /**
     *The `TotalIssuance` was forcefully changed.
     */
    TotalIssuanceForced: PlainDescriptor<Anonymize<I4fooe9dun9o0t>>
  }
  TransactionPayment: {
    /**
     *A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     *has been paid by `who`.
     */
    TransactionFeePaid: PlainDescriptor<Anonymize<Ier2cke86dqbr2>>
  }
  Sudo: {
    /**
     *A sudo call just took place.
     */
    Sudid: PlainDescriptor<Anonymize<I29ai3jnl05o3c>>
    /**
     *The sudo key has been updated.
     */
    KeyChanged: PlainDescriptor<Anonymize<I5rtkmhm2dng4u>>
    /**
     *The key was permanently removed.
     */
    KeyRemoved: PlainDescriptor<undefined>
    /**
     *A [sudo_as](Pallet::sudo_as) call just took place.
     */
    SudoAsDone: PlainDescriptor<Anonymize<I29ai3jnl05o3c>>
  }
  Revive: {
    /**
     *A custom event emitted by the contract.
     */
    ContractEmitted: PlainDescriptor<Anonymize<I7svbvm6hg57aj>>
  }
  Assets: {
    /**
     *Some asset class was created.
     */
    Created: PlainDescriptor<Anonymize<I88ff3u4dpivk>>
    /**
     *Some assets were issued.
     */
    Issued: PlainDescriptor<Anonymize<I33cp947glv1ks>>
    /**
     *Some assets were transferred.
     */
    Transferred: PlainDescriptor<Anonymize<Ic9om1gmmqu7rq>>
    /**
     *Some assets were destroyed.
     */
    Burned: PlainDescriptor<Anonymize<I5hfov2b68ppb6>>
    /**
     *The management team changed.
     */
    TeamChanged: PlainDescriptor<Anonymize<Ibthhb2m9vneds>>
    /**
     *The owner changed.
     */
    OwnerChanged: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>
    /**
     *Some account `who` was frozen.
     */
    Frozen: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>
    /**
     *Some account `who` was thawed.
     */
    Thawed: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>
    /**
     *Some asset `asset_id` was frozen.
     */
    AssetFrozen: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *Some asset `asset_id` was thawed.
     */
    AssetThawed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *Accounts were destroyed for given asset.
     */
    AccountsDestroyed: PlainDescriptor<Anonymize<Ieduc1e6frq8rb>>
    /**
     *Approvals were destroyed for given asset.
     */
    ApprovalsDestroyed: PlainDescriptor<Anonymize<I9h6gbtabovtm4>>
    /**
     *An asset class is in the process of being destroyed.
     */
    DestructionStarted: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *An asset class was destroyed.
     */
    Destroyed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *Some asset class was force-created.
     */
    ForceCreated: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>
    /**
     *New metadata has been set for an asset.
     */
    MetadataSet: PlainDescriptor<Anonymize<Ifnsa0dkkpf465>>
    /**
     *Metadata has been cleared for an asset.
     */
    MetadataCleared: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *(Additional) funds have been approved for transfer to a destination account.
     */
    ApprovedTransfer: PlainDescriptor<Anonymize<I65dtqr2egjbc3>>
    /**
     *An approval for account `delegate` was cancelled by `owner`.
     */
    ApprovalCancelled: PlainDescriptor<Anonymize<Ibqj3vg5s5lk0c>>
    /**
     *An `amount` was transferred in its entirety from `owner` to `destination` by
     *the approved `delegate`.
     */
    TransferredApproved: PlainDescriptor<Anonymize<I6l73u513p8rna>>
    /**
     *An asset has had its attributes changed by the `Force` origin.
     */
    AssetStatusChanged: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>
    /**
     *The min_balance of an asset has been updated by the asset owner.
     */
    AssetMinBalanceChanged: PlainDescriptor<Anonymize<Iefqmt2htu1dlu>>
    /**
     *Some account `who` was created with a deposit from `depositor`.
     */
    Touched: PlainDescriptor<Anonymize<If8bgtgqrchjtu>>
    /**
     *Some account `who` was blocked.
     */
    Blocked: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>
    /**
     *Some assets were deposited (e.g. for transaction fees).
     */
    Deposited: PlainDescriptor<Anonymize<Idusmq77988cmt>>
    /**
     *Some assets were withdrawn from the account (e.g. for transaction fees).
     */
    Withdrawn: PlainDescriptor<Anonymize<Idusmq77988cmt>>
  }
}
type IError = {
  System: {
    /**
     *The name of specification does not match between the current runtime
     *and the new runtime.
     */
    InvalidSpecName: PlainDescriptor<undefined>
    /**
     *The specification version is not allowed to decrease between the current runtime
     *and the new runtime.
     */
    SpecVersionNeedsToIncrease: PlainDescriptor<undefined>
    /**
     *Failed to extract the runtime version from the new runtime.
     *
     *Either calling `Core_version` or decoding `RuntimeVersion` failed.
     */
    FailedToExtractRuntimeVersion: PlainDescriptor<undefined>
    /**
     *Suicide called when the account has non-default composite data.
     */
    NonDefaultComposite: PlainDescriptor<undefined>
    /**
     *There is a non-zero reference count preventing the account from being purged.
     */
    NonZeroRefCount: PlainDescriptor<undefined>
    /**
     *The origin filter prevent the call to be dispatched.
     */
    CallFiltered: PlainDescriptor<undefined>
    /**
     *A multi-block migration is ongoing and prevents the current code from being replaced.
     */
    MultiBlockMigrationsOngoing: PlainDescriptor<undefined>
    /**
     *No upgrade authorized.
     */
    NothingAuthorized: PlainDescriptor<undefined>
    /**
     *The submitted code is not authorized.
     */
    Unauthorized: PlainDescriptor<undefined>
  }
  Utility: {
    /**
     *Too many calls batched.
     */
    TooManyCalls: PlainDescriptor<undefined>
  }
  Balances: {
    /**
     *Vesting balance too high to send value.
     */
    VestingBalance: PlainDescriptor<undefined>
    /**
     *Account liquidity restrictions prevent withdrawal.
     */
    LiquidityRestrictions: PlainDescriptor<undefined>
    /**
     *Balance too low to send value.
     */
    InsufficientBalance: PlainDescriptor<undefined>
    /**
     *Value too low to create account due to existential deposit.
     */
    ExistentialDeposit: PlainDescriptor<undefined>
    /**
     *Transfer/payment would kill account.
     */
    Expendability: PlainDescriptor<undefined>
    /**
     *A vesting schedule already exists for this account.
     */
    ExistingVestingSchedule: PlainDescriptor<undefined>
    /**
     *Beneficiary account must pre-exist.
     */
    DeadAccount: PlainDescriptor<undefined>
    /**
     *Number of named reserves exceed `MaxReserves`.
     */
    TooManyReserves: PlainDescriptor<undefined>
    /**
     *Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
     */
    TooManyHolds: PlainDescriptor<undefined>
    /**
     *Number of freezes exceed `MaxFreezes`.
     */
    TooManyFreezes: PlainDescriptor<undefined>
    /**
     *The issuance cannot be modified since it is already deactivated.
     */
    IssuanceDeactivated: PlainDescriptor<undefined>
    /**
     *The delta cannot be zero.
     */
    DeltaZero: PlainDescriptor<undefined>
  }
  Sudo: {
    /**
     *Sender must be the Sudo account.
     */
    RequireSudo: PlainDescriptor<undefined>
  }
  Revive: {
    /**
     *Invalid schedule supplied, e.g. with zero weight of a basic operation.
     */
    InvalidSchedule: PlainDescriptor<undefined>
    /**
     *Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
     */
    InvalidCallFlags: PlainDescriptor<undefined>
    /**
     *The executed contract exhausted its gas limit.
     */
    OutOfGas: PlainDescriptor<undefined>
    /**
     *Performing the requested transfer failed. Probably because there isn't enough
     *free balance in the sender's account.
     */
    TransferFailed: PlainDescriptor<undefined>
    /**
     *Performing a call was denied because the calling depth reached the limit
     *of what is specified in the schedule.
     */
    MaxCallDepthReached: PlainDescriptor<undefined>
    /**
     *No contract was found at the specified address.
     */
    ContractNotFound: PlainDescriptor<undefined>
    /**
     *No code could be found at the supplied code hash.
     */
    CodeNotFound: PlainDescriptor<undefined>
    /**
     *No code info could be found at the supplied code hash.
     */
    CodeInfoNotFound: PlainDescriptor<undefined>
    /**
     *A buffer outside of sandbox memory was passed to a contract API function.
     */
    OutOfBounds: PlainDescriptor<undefined>
    /**
     *Input passed to a contract API function failed to decode as expected type.
     */
    DecodingFailed: PlainDescriptor<undefined>
    /**
     *Contract trapped during execution.
     */
    ContractTrapped: PlainDescriptor<undefined>
    /**
     *The size defined in `T::MaxValueSize` was exceeded.
     */
    ValueTooLarge: PlainDescriptor<undefined>
    /**
     *Termination of a contract is not allowed while the contract is already
     *on the call stack. Can be triggered by `seal_terminate`.
     */
    TerminatedWhileReentrant: PlainDescriptor<undefined>
    /**
     *`seal_call` forwarded this contracts input. It therefore is no longer available.
     */
    InputForwarded: PlainDescriptor<undefined>
    /**
     *The amount of topics passed to `seal_deposit_events` exceeds the limit.
     */
    TooManyTopics: PlainDescriptor<undefined>
    /**
     *The chain does not provide a chain extension. Calling the chain extension results
     *in this error. Note that this usually  shouldn't happen as deploying such contracts
     *is rejected.
     */
    NoChainExtension: PlainDescriptor<undefined>
    /**
     *Failed to decode the XCM program.
     */
    XCMDecodeFailed: PlainDescriptor<undefined>
    /**
     *A contract with the same AccountId already exists.
     */
    DuplicateContract: PlainDescriptor<undefined>
    /**
     *A contract self destructed in its constructor.
     *
     *This can be triggered by a call to `seal_terminate`.
     */
    TerminatedInConstructor: PlainDescriptor<undefined>
    /**
     *A call tried to invoke a contract that is flagged as non-reentrant.
     */
    ReentranceDenied: PlainDescriptor<undefined>
    /**
     *A contract called into the runtime which then called back into this pallet.
     */
    ReenteredPallet: PlainDescriptor<undefined>
    /**
     *A contract attempted to invoke a state modifying API while being in read-only mode.
     */
    StateChangeDenied: PlainDescriptor<undefined>
    /**
     *Origin doesn't have enough balance to pay the required storage deposits.
     */
    StorageDepositNotEnoughFunds: PlainDescriptor<undefined>
    /**
     *More storage was created than allowed by the storage deposit limit.
     */
    StorageDepositLimitExhausted: PlainDescriptor<undefined>
    /**
     *Code removal was denied because the code is still in use by at least one contract.
     */
    CodeInUse: PlainDescriptor<undefined>
    /**
     *The contract ran to completion but decided to revert its storage changes.
     *Please note that this error is only returned from extrinsics. When called directly
     *or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
     *to determine whether a reversion has taken place.
     */
    ContractReverted: PlainDescriptor<undefined>
    /**
     *The contract failed to compile or is missing the correct entry points.
     *
     *A more detailed error can be found on the node console if debug messages are enabled
     *by supplying `-lruntime::revive=debug`.
     */
    CodeRejected: PlainDescriptor<undefined>
    /**
     *The code blob supplied is larger than [`limits::code::BLOB_BYTES`].
     */
    BlobTooLarge: PlainDescriptor<undefined>
    /**
     *The static memory consumption of the blob will be larger than
     *[`limits::code::STATIC_MEMORY_BYTES`].
     */
    StaticMemoryTooLarge: PlainDescriptor<undefined>
    /**
     *The program contains a basic block that is larger than allowed.
     */
    BasicBlockTooLarge: PlainDescriptor<undefined>
    /**
     *The program contains an invalid instruction.
     */
    InvalidInstruction: PlainDescriptor<undefined>
    /**
     *The contract has reached its maximum number of delegate dependencies.
     */
    MaxDelegateDependenciesReached: PlainDescriptor<undefined>
    /**
     *The dependency was not found in the contract's delegate dependencies.
     */
    DelegateDependencyNotFound: PlainDescriptor<undefined>
    /**
     *The contract already depends on the given delegate dependency.
     */
    DelegateDependencyAlreadyExists: PlainDescriptor<undefined>
    /**
     *Can not add a delegate dependency to the code hash of the contract itself.
     */
    CannotAddSelfAsDelegateDependency: PlainDescriptor<undefined>
    /**
     *Can not add more data to transient storage.
     */
    OutOfTransientStorage: PlainDescriptor<undefined>
    /**
     *The contract tried to call a syscall which does not exist (at its current api level).
     */
    InvalidSyscall: PlainDescriptor<undefined>
    /**
     *Invalid storage flags were passed to one of the storage syscalls.
     */
    InvalidStorageFlags: PlainDescriptor<undefined>
    /**
     *PolkaVM failed during code execution. Probably due to a malformed program.
     */
    ExecutionFailed: PlainDescriptor<undefined>
    /**
     *Failed to convert a U256 to a Balance.
     */
    BalanceConversionFailed: PlainDescriptor<undefined>
    /**
     *Failed to convert an EVM balance to a native balance.
     */
    DecimalPrecisionLoss: PlainDescriptor<undefined>
    /**
     *Immutable data can only be set during deploys and only be read during calls.
     *Additionally, it is only valid to set the data once and it must not be empty.
     */
    InvalidImmutableAccess: PlainDescriptor<undefined>
    /**
     *An `AccountID32` account tried to interact with the pallet without having a mapping.
     *
     *Call [`Pallet::map_account`] in order to create a mapping for the account.
     */
    AccountUnmapped: PlainDescriptor<undefined>
    /**
     *Tried to map an account that is already mapped.
     */
    AccountAlreadyMapped: PlainDescriptor<undefined>
    /**
     *The transaction used to dry-run a contract is invalid.
     */
    InvalidGenericTransaction: PlainDescriptor<undefined>
    /**
     *The refcount of a code either over or underflowed.
     */
    RefcountOverOrUnderflow: PlainDescriptor<undefined>
    /**
     *Unsupported precompile address
     */
    UnsupportedPrecompileAddress: PlainDescriptor<undefined>
    /**
     *Precompile Error
     */
    PrecompileFailure: PlainDescriptor<undefined>
  }
  Assets: {
    /**
     *Account balance must be greater than or equal to the transfer amount.
     */
    BalanceLow: PlainDescriptor<undefined>
    /**
     *The account to alter does not exist.
     */
    NoAccount: PlainDescriptor<undefined>
    /**
     *The signing account has no permission to do the operation.
     */
    NoPermission: PlainDescriptor<undefined>
    /**
     *The given asset ID is unknown.
     */
    Unknown: PlainDescriptor<undefined>
    /**
     *The origin account is frozen.
     */
    Frozen: PlainDescriptor<undefined>
    /**
     *The asset ID is already taken.
     */
    InUse: PlainDescriptor<undefined>
    /**
     *Invalid witness data given.
     */
    BadWitness: PlainDescriptor<undefined>
    /**
     *Minimum balance should be non-zero.
     */
    MinBalanceZero: PlainDescriptor<undefined>
    /**
     *Unable to increment the consumer reference counters on the account. Either no provider
     *reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
     *fewer then the maximum number of consumers has been reached.
     */
    UnavailableConsumer: PlainDescriptor<undefined>
    /**
     *Invalid metadata given.
     */
    BadMetadata: PlainDescriptor<undefined>
    /**
     *No approval exists that would allow the transfer.
     */
    Unapproved: PlainDescriptor<undefined>
    /**
     *The source account would not survive the transfer and it needs to stay alive.
     */
    WouldDie: PlainDescriptor<undefined>
    /**
     *The asset-account already exists.
     */
    AlreadyExists: PlainDescriptor<undefined>
    /**
     *The asset-account doesn't have an associated deposit.
     */
    NoDeposit: PlainDescriptor<undefined>
    /**
     *The operation would result in funds being burned.
     */
    WouldBurn: PlainDescriptor<undefined>
    /**
     *The asset is a live asset and is actively being used. Usually emit for operations such
     *as `start_destroy` which require the asset to be in a destroying state.
     */
    LiveAsset: PlainDescriptor<undefined>
    /**
     *The asset is not live, and likely being destroyed.
     */
    AssetNotLive: PlainDescriptor<undefined>
    /**
     *The asset status is not the expected status.
     */
    IncorrectStatus: PlainDescriptor<undefined>
    /**
     *The asset should be frozen before the given operation.
     */
    NotFrozen: PlainDescriptor<undefined>
    /**
     *Callback action resulted in error
     */
    CallbackFailed: PlainDescriptor<undefined>
    /**
     *The asset ID must be equal to the [`NextAssetId`].
     */
    BadAssetId: PlainDescriptor<undefined>
    /**
     *The asset cannot be destroyed because some accounts for this asset contain freezes.
     */
    ContainsFreezes: PlainDescriptor<undefined>
    /**
     *The asset cannot be destroyed because some accounts for this asset contain holds.
     */
    ContainsHolds: PlainDescriptor<undefined>
  }
}
type IConstants = {
  System: {
    /**
     * Block & extrinsics weights: base values and limits.
     */
    BlockWeights: PlainDescriptor<Anonymize<In7a38730s6qs>>
    /**
     * The maximum length of a block (in bytes).
     */
    BlockLength: PlainDescriptor<Anonymize<If15el53dd76v9>>
    /**
     * Maximum number of block number to block hash mappings to keep (oldest pruned first).
     */
    BlockHashCount: PlainDescriptor<number>
    /**
     * The weight of runtime database operations the runtime can invoke.
     */
    DbWeight: PlainDescriptor<Anonymize<I9s0ave7t0vnrk>>
    /**
     * Get the chain's in-code version.
     */
    Version: PlainDescriptor<Anonymize<I4fo08joqmcqnm>>
    /**
     * The designated SS58 prefix of this chain.
     *
     * This replaces the "ss58Format" property declared in the chain spec. Reason is
     * that the runtime should know about the prefix in order to make use of it as
     * an identifier of the chain.
     */
    SS58Prefix: PlainDescriptor<number>
  }
  Utility: {
    /**
     * The limit on the number of batched calls.
     */
    batched_calls_limit: PlainDescriptor<number>
  }
  Timestamp: {
    /**
     * The minimum period between blocks.
     *
     * Be aware that this is different to the *expected* period that the block production
     * apparatus provides. Your chosen consensus system will generally work with this to
     * determine a sensible block time. For example, in the Aura pallet it will be double this
     * period on default settings.
     */
    MinimumPeriod: PlainDescriptor<bigint>
  }
  Balances: {
    /**
     * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
     *
     * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
     * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
     * In case you have multiple sources of provider references, you may also get unexpected
     * behaviour if you set this to zero.
     *
     * Bottom line: Do yourself a favour and make it at least one!
     */
    ExistentialDeposit: PlainDescriptor<bigint>
    /**
     * The maximum number of locks that should exist on an account.
     * Not strictly enforced, but used for weight estimation.
     *
     * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
     */
    MaxLocks: PlainDescriptor<number>
    /**
     * The maximum number of named reserves that can exist on an account.
     *
     * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
     */
    MaxReserves: PlainDescriptor<number>
    /**
     * The maximum number of individual freeze locks that can exist on an account at any time.
     */
    MaxFreezes: PlainDescriptor<number>
  }
  TransactionPayment: {
    /**
     * A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
     * `priority`
     *
     * This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
     * added to a tip component in regular `priority` calculations.
     * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
     * extrinsic (with no tip), by including a tip value greater than the virtual tip.
     *
     * ```rust,ignore
     * // For `Normal`
     * let priority = priority_calc(tip);
     *
     * // For `Operational`
     * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
     * let priority = priority_calc(tip + virtual_tip);
     * ```
     *
     * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
     * sent with the transaction. So, not only does the transaction get a priority bump based
     * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
     * transactions.
     */
    OperationalFeeMultiplier: PlainDescriptor<number>
  }
  Revive: {
    /**
     * The amount of balance a caller has to pay for each byte of storage.
     *
     * # Note
     *
     * It is safe to change this value on a live chain as all refunds are pro rata.
     */
    DepositPerByte: PlainDescriptor<bigint>
    /**
     * The amount of balance a caller has to pay for each storage item.
     *
     * # Note
     *
     * It is safe to change this value on a live chain as all refunds are pro rata.
     */
    DepositPerItem: PlainDescriptor<bigint>
    /**
     * The percentage of the storage deposit that should be held for using a code hash.
     * Instantiating a contract, protects the code from being removed. In order to prevent
     * abuse these actions are protected with a percentage of the code deposit.
     */
    CodeHashLockupDepositPercent: PlainDescriptor<number>
    /**
     * Make contract callable functions marked as `#[unstable]` available.
     *
     * Contracts that use `#[unstable]` functions won't be able to be uploaded unless
     * this is set to `true`. This is only meant for testnets and dev nodes in order to
     * experiment with new features.
     *
     * # Warning
     *
     * Do **not** set to `true` on productions chains.
     */
    UnsafeUnstableInterface: PlainDescriptor<boolean>
    /**
     * The [EIP-155](https://eips.ethereum.org/EIPS/eip-155) chain ID.
     *
     * This is a unique identifier assigned to each blockchain network,
     * preventing replay attacks.
     */
    ChainId: PlainDescriptor<bigint>
    /**
     * The ratio between the decimal representation of the native token and the ETH token.
     */
    NativeToEthRatio: PlainDescriptor<number>
  }
  Assets: {
    /**
     * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
     *
     * Must be configured to result in a weight that makes each call fit in a block.
     */
    RemoveItemsLimit: PlainDescriptor<number>
    /**
     * The basic amount of funds that must be reserved for an asset.
     */
    AssetDeposit: PlainDescriptor<bigint>
    /**
     * The amount of funds that must be reserved for a non-provider asset account to be
     * maintained.
     */
    AssetAccountDeposit: PlainDescriptor<bigint>
    /**
     * The basic amount of funds that must be reserved when adding metadata to your asset.
     */
    MetadataDepositBase: PlainDescriptor<bigint>
    /**
     * The additional funds that must be reserved for the number of bytes you store in your
     * metadata.
     */
    MetadataDepositPerByte: PlainDescriptor<bigint>
    /**
     * The amount of funds that must be reserved when creating a new approval.
     */
    ApprovalDeposit: PlainDescriptor<bigint>
    /**
     * The maximum length of a name or symbol stored on-chain.
     */
    StringLimit: PlainDescriptor<number>
  }
}
type IRuntimeCalls = {
  /**
   * The `Core` runtime api that every Substrate runtime needs to implement.
   */
  Core: {
    /**
     * Returns the version of the runtime.
     */
    version: RuntimeDescriptor<[], Anonymize<I4fo08joqmcqnm>>
    /**
     * Execute the given block.
     */
    execute_block: RuntimeDescriptor<[block: Anonymize<Iaqet9jc3ihboe>], undefined>
    /**
     * Initialize a block with the given header and return the runtime executive mode.
     */
    initialize_block: RuntimeDescriptor<
      [header: Anonymize<Ic952bubvq4k7d>],
      Anonymize<I2v50gu3s1aqk6>
    >
  }
  /**
   * The `Metadata` api trait that returns metadata for the runtime.
   */
  Metadata: {
    /**
     * Returns the metadata of a runtime.
     */
    metadata: RuntimeDescriptor<[], Binary>
    /**
     * Returns the metadata at a given version.
     *
     * If the given `version` isn't supported, this will return `None`.
     * Use [`Self::metadata_versions`] to find out about supported metadata version of the runtime.
     */
    metadata_at_version: RuntimeDescriptor<[version: number], Anonymize<Iabpgqcjikia83>>
    /**
     * Returns the supported metadata versions.
     *
     * This can be used to call `metadata_at_version`.
     */
    metadata_versions: RuntimeDescriptor<[], Anonymize<Icgljjb6j82uhn>>
  }
  /**
   * Runtime API for executing view functions
   */
  RuntimeViewFunction: {
    /**
     * Execute a view function query.
     */
    execute_view_function: RuntimeDescriptor<
      [query_id: Anonymize<I4gil44d08grh>, input: Binary],
      Anonymize<I7u915mvkdsb08>
    >
  }
  /**
   * The `BlockBuilder` api trait that provides the required functionality for building a block.
   */
  BlockBuilder: {
    /**
     * Apply the given extrinsic.
     *
     * Returns an inclusion outcome which specifies if this extrinsic is included in
     * this block or not.
     */
    apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Idom4bv4opbkn3>>
    /**
     * Finish the current block.
     */
    finalize_block: RuntimeDescriptor<[], Anonymize<Ic952bubvq4k7d>>
    /**
     * Generate inherent extrinsics. The inherent data will vary from chain to chain.
     */
    inherent_extrinsics: RuntimeDescriptor<
      [inherent: Anonymize<If7uv525tdvv7a>],
      Anonymize<Itom7fk49o0c9>
    >
    /**
     * Check that the inherents are valid. The inherent data will vary from chain to chain.
     */
    check_inherents: RuntimeDescriptor<
      [block: Anonymize<Iaqet9jc3ihboe>, data: Anonymize<If7uv525tdvv7a>],
      Anonymize<I2an1fs2eiebjp>
    >
  }
  /**
   * The `TaggedTransactionQueue` api trait for interfering with the transaction queue.
   */
  TaggedTransactionQueue: {
    /**
     * Validate the transaction.
     *
     * This method is invoked by the transaction pool to learn details about given transaction.
     * The implementation should make sure to verify the correctness of the transaction
     * against current state. The given `block_hash` corresponds to the hash of the block
     * that is used as current state.
     *
     * Note that this call may be performed by the pool multiple times and transactions
     * might be verified in any possible order.
     */
    validate_transaction: RuntimeDescriptor<
      [source: TransactionValidityTransactionSource, tx: Binary, block_hash: FixedSizeBinary<32>],
      Anonymize<I9ask1o4tfvcvs>
    >
  }
  /**
   * The offchain worker api.
   */
  OffchainWorkerApi: {
    /**
     * Starts the off-chain task for given block header.
     */
    offchain_worker: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], undefined>
  }
  /**
   * Session keys runtime api.
   */
  SessionKeys: {
    /**
     * Generate a set of session keys with optionally using the given seed.
     * The keys should be stored within the keystore exposed via runtime
     * externalities.
     *
     * The seed needs to be a valid `utf8` string.
     *
     * Returns the concatenated SCALE encoded public keys.
     */
    generate_session_keys: RuntimeDescriptor<[seed: Anonymize<Iabpgqcjikia83>], Binary>
    /**
     * Decode the given public session keys.
     *
     * Returns the list of public raw public keys + key type.
     */
    decode_session_keys: RuntimeDescriptor<[encoded: Binary], Anonymize<Icerf8h8pdu8ss>>
  }
  /**
   * The API to query account nonce.
   */
  AccountNonceApi: {
    /**
     * Get current account nonce of given `AccountId`.
     */
    account_nonce: RuntimeDescriptor<[account: SS58String], number>
  }
  /**
    
     */
  TransactionPaymentApi: {
    /**
        
         */
    query_info: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<I6spmpef2c7svf>>
    /**
        
         */
    query_fee_details: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<Iei2mvq0mjvt81>>
    /**
        
         */
    query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>
    /**
        
         */
    query_length_to_fee: RuntimeDescriptor<[length: number], bigint>
  }
  /**
    
     */
  TransactionPaymentCallApi: {
    /**
     * Query information of a dispatch class, weight, and fee of a given encoded `Call`.
     */
    query_call_info: RuntimeDescriptor<
      [call: Anonymize<I22sqe2i8oe0ft>, len: number],
      Anonymize<I6spmpef2c7svf>
    >
    /**
     * Query fee details of a given encoded `Call`.
     */
    query_call_fee_details: RuntimeDescriptor<
      [call: Anonymize<I22sqe2i8oe0ft>, len: number],
      Anonymize<Iei2mvq0mjvt81>
    >
    /**
     * Query the output of the current `WeightToFee` given some input.
     */
    query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>
    /**
     * Query the output of the current `LengthToFee` given some input.
     */
    query_length_to_fee: RuntimeDescriptor<[length: number], bigint>
  }
  /**
   * The API used to dry-run contract interactions.
   */
  ReviveApi: {
    /**
     * Returns the block gas limit.
     */
    block_gas_limit: RuntimeDescriptor<[], Anonymize<I4totqt881mlti>>
    /**
     * Returns the free balance of the given `[H160]` address, using EVM decimals.
     */
    balance: RuntimeDescriptor<[address: FixedSizeBinary<20>], Anonymize<I4totqt881mlti>>
    /**
     * Returns the gas price.
     */
    gas_price: RuntimeDescriptor<[], Anonymize<I4totqt881mlti>>
    /**
     * Returns the nonce of the given `[H160]` address.
     */
    nonce: RuntimeDescriptor<[address: FixedSizeBinary<20>], number>
    /**
     * Perform a call from a specified account to a given contract.
     *
     * See [`crate::Pallet::bare_call`].
     */
    call: RuntimeDescriptor<
      [
        origin: SS58String,
        dest: FixedSizeBinary<20>,
        value: bigint,
        gas_limit: Anonymize<Iasb8k6ash5mjn>,
        storage_deposit_limit: Anonymize<I35p85j063s0il>,
        input_data: Binary,
      ],
      Anonymize<I1r5trie5v36he>
    >
    /**
     * Instantiate a new contract.
     *
     * See `[crate::Pallet::bare_instantiate]`.
     */
    instantiate: RuntimeDescriptor<
      [
        origin: SS58String,
        value: bigint,
        gas_limit: Anonymize<Iasb8k6ash5mjn>,
        storage_deposit_limit: Anonymize<I35p85j063s0il>,
        code: Anonymize<I9sijb8gfrns29>,
        data: Binary,
        salt: Anonymize<I4s6vifaf8k998>,
      ],
      Anonymize<Idg5sqhk4n61oc>
    >
    /**
     * Perform an Ethereum call.
     *
     * See [`crate::Pallet::bare_eth_transact`]
     */
    eth_transact: RuntimeDescriptor<[tx: Anonymize<I741pl2pidmim6>], Anonymize<I8abab09ak4pi1>>
    /**
     * Upload new code without instantiating a contract from it.
     *
     * See [`crate::Pallet::bare_upload_code`].
     */
    upload_code: RuntimeDescriptor<
      [origin: SS58String, code: Binary, storage_deposit_limit: Anonymize<I35p85j063s0il>],
      Anonymize<I4mjui2i82gvdb>
    >
    /**
     * Query a given storage key in a given contract.
     *
     * Returns `Ok(Some(Vec<u8>))` if the storage value exists under the given key in the
     * specified account and `Ok(None)` if it doesn't. If the account specified by the address
     * doesn't exist, or doesn't have a contract then `Err` is returned.
     */
    get_storage: RuntimeDescriptor<
      [address: FixedSizeBinary<20>, key: FixedSizeBinary<32>],
      Anonymize<Iehnkjehe1oeva>
    >
    /**
     * Traces the execution of an entire block and returns call traces.
     *
     * This is intended to be called through `state_call` to replay the block from the
     * parent block.
     *
     * See eth-rpc `debug_traceBlockByNumber` for usage.
     */
    trace_block: RuntimeDescriptor<
      [block: Anonymize<Iaqet9jc3ihboe>, config: Anonymize<Ifbmd9e2argcmg>],
      Anonymize<I2bl5e7he0kaq9>
    >
    /**
     * Traces the execution of a specific transaction within a block.
     *
     * This is intended to be called through `state_call` to replay the block from the
     * parent hash up to the transaction.
     *
     * See eth-rpc `debug_traceTransaction` for usage.
     */
    trace_tx: RuntimeDescriptor<
      [block: Anonymize<Iaqet9jc3ihboe>, tx_index: number, config: Anonymize<Ifbmd9e2argcmg>],
      Anonymize<I2d63hfvrckrkc>
    >
    /**
     * Dry run and return the trace of the given call.
     *
     * See eth-rpc `debug_traceCall` for usage.
     */
    trace_call: RuntimeDescriptor<
      [tx: Anonymize<I741pl2pidmim6>, config: Anonymize<Ifbmd9e2argcmg>],
      Anonymize<Ibabtpgk9h20k6>
    >
  }
  /**
   * API to interact with `RuntimeGenesisConfig` for the runtime
   */
  GenesisBuilder: {
    /**
     * Build `RuntimeGenesisConfig` from a JSON blob not using any defaults and store it in the
     * storage.
     *
     * In the case of a FRAME-based runtime, this function deserializes the full
     * `RuntimeGenesisConfig` from the given JSON blob and puts it into the storage. If the
     * provided JSON blob is incorrect or incomplete or the deserialization fails, an error
     * is returned.
     *
     * Please note that provided JSON blob must contain all `RuntimeGenesisConfig` fields, no
     * defaults will be used.
     */
    build_state: RuntimeDescriptor<[json: Binary], Anonymize<Ie9sr1iqcg3cgm>>
    /**
     * Returns a JSON blob representation of the built-in `RuntimeGenesisConfig` identified by
     * `id`.
     *
     * If `id` is `None` the function should return JSON blob representation of the default
     * `RuntimeGenesisConfig` struct of the runtime. Implementation must provide default
     * `RuntimeGenesisConfig`.
     *
     * Otherwise function returns a JSON representation of the built-in, named
     * `RuntimeGenesisConfig` preset identified by `id`, or `None` if such preset does not
     * exist. Returned `Vec<u8>` contains bytes of JSON blob (patch) which comprises a list of
     * (potentially nested) key-value pairs that are intended for customizing the default
     * runtime genesis config. The patch shall be merged (rfc7386) with the JSON representation
     * of the default `RuntimeGenesisConfig` to create a comprehensive genesis config that can
     * be used in `build_state` method.
     */
    get_preset: RuntimeDescriptor<[id: Anonymize<I1mqgk2tmnn9i2>], Anonymize<Iabpgqcjikia83>>
    /**
     * Returns a list of identifiers for available builtin `RuntimeGenesisConfig` presets.
     *
     * The presets from the list can be queried with [`GenesisBuilder::get_preset`] method. If
     * no named presets are provided by the runtime the list is empty.
     */
    preset_names: RuntimeDescriptor<[], Anonymize<I6lr8sctk0bi4e>>
  }
}
type IAsset = PlainDescriptor<void>
export type LocalnodeDispatchError = Anonymize<Ia19hov8g2tmuu>
type PalletsTypedef = {
  __storage: IStorage
  __tx: ICalls
  __event: IEvent
  __error: IError
  __const: IConstants
}
type IDescriptors = {
  descriptors: {
    pallets: PalletsTypedef
    apis: IRuntimeCalls
  } & Promise<any>
  metadataTypes: Promise<Uint8Array>
  asset: IAsset
  getMetadata: () => Promise<Uint8Array>
  genesis: string | undefined
}
declare const _allDescriptors: IDescriptors
export default _allDescriptors
export type LocalnodeQueries = QueryFromPalletsDef<PalletsTypedef>
export type LocalnodeCalls = TxFromPalletsDef<PalletsTypedef>
export type LocalnodeEvents = EventsFromPalletsDef<PalletsTypedef>
export type LocalnodeErrors = ErrorsFromPalletsDef<PalletsTypedef>
export type LocalnodeConstants = ConstFromPalletsDef<PalletsTypedef>
export type LocalnodeCallData = Anonymize<I22sqe2i8oe0ft> & {
  value: {
    type: string
  }
}
export type LocalnodeWhitelistEntry =
  | PalletKey
  | ApiKey<IRuntimeCalls>
  | `query.${NestedKey<PalletsTypedef['__storage']>}`
  | `tx.${NestedKey<PalletsTypedef['__tx']>}`
  | `event.${NestedKey<PalletsTypedef['__event']>}`
  | `error.${NestedKey<PalletsTypedef['__error']>}`
  | `const.${NestedKey<PalletsTypedef['__const']>}`
type PalletKey = `*.${keyof (IStorage & ICalls & IEvent & IError & IConstants & IRuntimeCalls)}`
type NestedKey<D extends Record<string, Record<string, any>>> =
  | '*'
  | {
      [P in keyof D & string]:
        | `${P}.*`
        | {
            [N in keyof D[P] & string]: `${P}.${N}`
          }[keyof D[P] & string]
    }[keyof D & string]
type ApiKey<D extends Record<string, Record<string, any>>> =
  | 'api.*'
  | {
      [P in keyof D & string]:
        | `api.${P}.*`
        | {
            [N in keyof D[P] & string]: `api.${P}.${N}`
          }[keyof D[P] & string]
    }[keyof D & string]
