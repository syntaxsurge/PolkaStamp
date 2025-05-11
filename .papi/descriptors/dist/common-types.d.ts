import {
  Enum,
  GetEnum,
  FixedSizeBinary,
  Binary,
  SS58String,
  FixedSizeArray,
  ResultPayload,
  TxCallData,
} from 'polkadot-api'
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
export type I5sesotjlssv2d = {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: Anonymize<I1q8tnt1cluu5j>
}
export type I1q8tnt1cluu5j = {
  free: bigint
  reserved: bigint
  frozen: bigint
  flags: bigint
}
export type Iffmde3ekjedi9 = {
  normal: Anonymize<I4q39t5hn830vp>
  operational: Anonymize<I4q39t5hn830vp>
  mandatory: Anonymize<I4q39t5hn830vp>
}
export type I4q39t5hn830vp = {
  ref_time: bigint
  proof_size: bigint
}
export type I4mddgoa69c0a2 = Array<DigestItem>
export type DigestItem = Enum<{
  PreRuntime: Anonymize<I82jm9g7pufuel>
  Consensus: Anonymize<I82jm9g7pufuel>
  Seal: Anonymize<I82jm9g7pufuel>
  Other: Binary
  RuntimeEnvironmentUpdated: undefined
}>
export declare const DigestItem: GetEnum<DigestItem>
export type I82jm9g7pufuel = [FixedSizeBinary<4>, Binary]
export type Iamqbj26v2r9jn = Array<{
  phase: Phase
  event: Anonymize<Idj9mkv75vhk2v>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type Phase = Enum<{
  ApplyExtrinsic: number
  Finalization: undefined
  Initialization: undefined
}>
export declare const Phase: GetEnum<Phase>
export type Idj9mkv75vhk2v = AnonymousEnum<{
  System: Anonymize<I1grer92lv53p8>
  Scheduler: Anonymize<Iec0kq3298o9ia>
  Preimage: PreimageEvent
  Indices: IndicesEvent
  Balances: Anonymize<Iao8h4hv7atnq3>
  TransactionPayment: TransactionPaymentEvent
  Staking: StakingEvent
  Offences: OffencesEvent
  Session: SessionEvent
  Grandpa: GrandpaEvent
  Treasury: Anonymize<Iceo3qo846468b>
  ConvictionVoting: Anonymize<Itdqso6dq8jq1>
  Referenda: Anonymize<Idfraa3b4eu018>
  Whitelist: Anonymize<I63jaf0cm93ti5>
  Parameters: Anonymize<In3t00aurfuda>
  Claims: CommonClaimsEvent
  Vesting: VestingEvent
  Utility: Anonymize<I7lrl32mdblrmo>
  Proxy: Anonymize<I5b00gr573u14r>
  Multisig: Anonymize<I6d3qfl959ikkv>
  Bounties: BountiesEvent
  ChildBounties: ChildBountiesEvent
  ElectionProviderMultiPhase: ElectionProviderMultiPhaseEvent
  VoterList: BagsListEvent
  NominationPools: Anonymize<I1mroqu3ca6qo2>
  FastUnstake: Anonymize<Ia06jdijgcs3un>
  DelegatedStaking: Anonymize<I1nq1se98idofq>
  ParaInclusion: ParachainsInclusionEvent
  Paras: ParachainsParasEvent
  Hrmp: ParachainsHrmpEvent
  ParasDisputes: ParachainsDisputesEvent
  OnDemand: Anonymize<Icuu6jjue8o6eb>
  Registrar: CommonParasRegistrarEvent
  Slots: CommonSlotsEvent
  Auctions: CommonAuctionsEvent
  Crowdloan: Anonymize<I367eprhi559e0>
  Coretime: PolkadotRuntimeParachainsCoretimeEvent
  StateTrieMigration: Anonymize<I61dksvl51aujo>
  XcmPallet: Anonymize<I5ce1ru810vv9d>
  MessageQueue: Anonymize<I13vul90391uuv>
  AssetRate: AssetRateEvent
  Sudo: Anonymize<I4t9gtn2r19fen>
}>
export type I1grer92lv53p8 = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<Iennqjj71fms8l>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
}>
export type Ia82mnkmeo2rhc = {
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type Ic9s8f85vjtncc = {
  weight: Anonymize<I4q39t5hn830vp>
  class: DispatchClass
  pays_fee: Anonymize<Iehg04bj71rkd>
}
export type DispatchClass = Enum<{
  Normal: undefined
  Operational: undefined
  Mandatory: undefined
}>
export declare const DispatchClass: GetEnum<DispatchClass>
export type Iehg04bj71rkd = AnonymousEnum<{
  Yes: undefined
  No: undefined
}>
export type Iennqjj71fms8l = {
  dispatch_error: Anonymize<I995flrivt70on>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type I995flrivt70on = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    Scheduler: Anonymize<If7oa8fprnilo5>
    Preimage: Anonymize<I4cfhml1prt4lu>
    Babe: Anonymize<Ib6q602k6o213a>
    Timestamp: undefined
    Indices: Anonymize<Icq1825fru3di2>
    Balances: Anonymize<Idj13i7adlomht>
    TransactionPayment: undefined
    Authorship: undefined
    Staking: Anonymize<I2vmrg3q4huhgg>
    Offences: undefined
    Historical: undefined
    Session: Anonymize<I1e07dgbaqd1sq>
    Grandpa: Anonymize<I7q8i0pp1gkas6>
    AuthorityDiscovery: undefined
    Treasury: Anonymize<I36uss0m9fpcsf>
    ConvictionVoting: Anonymize<Idfa8k8ikssbsf>
    Referenda: Anonymize<I84u4ul208g742>
    Origins: undefined
    Whitelist: Anonymize<I15nctscutpbeh>
    Parameters: undefined
    Claims: Anonymize<Ijh2jbbqvb176>
    Vesting: Anonymize<Icof2acl69lq3c>
    Utility: Anonymize<I8dt2g2hcrgh36>
    Proxy: Anonymize<Iuvt54ei4cehc>
    Multisig: Anonymize<Ia76qmhhg4jvb9>
    Bounties: Anonymize<Ibfvjqqblobf53>
    ChildBounties: Anonymize<I4u5ou5u3tthff>
    ElectionProviderMultiPhase: Anonymize<Idb84kfjd998sl>
    VoterList: Anonymize<Ic35l5bgiij29p>
    NominationPools: Anonymize<Iuudu4kursojc>
    FastUnstake: Anonymize<Iau9bur8dc3bec>
    DelegatedStaking: Anonymize<Iaogv3iimefnis>
    ParachainsOrigin: undefined
    Configuration: Anonymize<In1jctfv299lm>
    ParasShared: undefined
    ParaInclusion: Anonymize<I4rrcn97hglfls>
    ParaInherent: Anonymize<Idfqgoii3heb2f>
    ParaScheduler: undefined
    Paras: Anonymize<Ieo97unb4d08rl>
    Initializer: undefined
    Dmp: undefined
    Hrmp: Anonymize<Ibns95nfmm92df>
    ParaSessionInfo: undefined
    ParasDisputes: Anonymize<Iakburbqot4g58>
    ParasSlashing: Anonymize<I1v70p1j0r2q1j>
    OnDemand: Anonymize<I8htscm3ert491>
    CoretimeAssignmentProvider: Anonymize<Ie3b9qd0nd59gs>
    Registrar: Anonymize<I97vkspnd0b8bh>
    Slots: Anonymize<Iers095sa65pbg>
    Auctions: Anonymize<I4kgo47o2v3701>
    Crowdloan: Anonymize<I9o6l1c4r4qc3s>
    Coretime: Anonymize<Ifju0orssp9h7o>
    StateTrieMigration: Anonymize<I96objte63brjr>
    XcmPallet: Anonymize<I87j95aq93d7dq>
    MessageQueue: Anonymize<I5iupade5ag2dp>
    AssetRate: Anonymize<I3qgd61cgli6cp>
    Beefy: Anonymize<Iflve6qd33ah68>
    Mmr: undefined
    BeefyMmrLeaf: undefined
    ParaSudoWrapper: Anonymize<Ieq0677kv2oqb2>
    Sudo: Anonymize<Iaug04qjhbli00>
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
}>
export type I5o0s7c8q1cc9b = AnonymousEnum<{
  /**
   *The name of specification does not match between the current runtime
   *and the new runtime.
   */
  InvalidSpecName: undefined
  /**
   *The specification version is not allowed to decrease between the current runtime
   *and the new runtime.
   */
  SpecVersionNeedsToIncrease: undefined
  /**
   *Failed to extract the runtime version from the new runtime.
   *
   *Either calling `Core_version` or decoding `RuntimeVersion` failed.
   */
  FailedToExtractRuntimeVersion: undefined
  /**
   *Suicide called when the account has non-default composite data.
   */
  NonDefaultComposite: undefined
  /**
   *There is a non-zero reference count preventing the account from being purged.
   */
  NonZeroRefCount: undefined
  /**
   *The origin filter prevent the call to be dispatched.
   */
  CallFiltered: undefined
  /**
   *A multi-block migration is ongoing and prevents the current code from being replaced.
   */
  MultiBlockMigrationsOngoing: undefined
  /**
   *No upgrade authorized.
   */
  NothingAuthorized: undefined
  /**
   *The submitted code is not authorized.
   */
  Unauthorized: undefined
}>
export type If7oa8fprnilo5 = AnonymousEnum<{
  /**
   *Failed to schedule a call
   */
  FailedToSchedule: undefined
  /**
   *Cannot find the scheduled call.
   */
  NotFound: undefined
  /**
   *Given target block number is in the past.
   */
  TargetBlockNumberInPast: undefined
  /**
   *Reschedule failed because it does not change scheduled time.
   */
  RescheduleNoChange: undefined
  /**
   *Attempt to use a non-named function on a named task.
   */
  Named: undefined
}>
export type I4cfhml1prt4lu = AnonymousEnum<{
  /**
   *Preimage is too large to store on-chain.
   */
  TooBig: undefined
  /**
   *Preimage has already been noted on-chain.
   */
  AlreadyNoted: undefined
  /**
   *The user is not authorized to perform this action.
   */
  NotAuthorized: undefined
  /**
   *The preimage cannot be removed since it has not yet been noted.
   */
  NotNoted: undefined
  /**
   *A preimage may not be removed when there are outstanding requests.
   */
  Requested: undefined
  /**
   *The preimage request cannot be removed since no outstanding requests exist.
   */
  NotRequested: undefined
  /**
   *More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
   */
  TooMany: undefined
  /**
   *Too few hashes were requested to be upgraded (i.e. zero).
   */
  TooFew: undefined
}>
export type Ib6q602k6o213a = AnonymousEnum<{
  /**
   *An equivocation proof provided as part of an equivocation report is invalid.
   */
  InvalidEquivocationProof: undefined
  /**
   *A key ownership proof provided as part of an equivocation report is invalid.
   */
  InvalidKeyOwnershipProof: undefined
  /**
   *A given equivocation report is valid but already previously reported.
   */
  DuplicateOffenceReport: undefined
  /**
   *Submitted configuration is invalid.
   */
  InvalidConfiguration: undefined
}>
export type Icq1825fru3di2 = AnonymousEnum<{
  /**
   *The index was not already assigned.
   */
  NotAssigned: undefined
  /**
   *The index is assigned to another account.
   */
  NotOwner: undefined
  /**
   *The index was not available.
   */
  InUse: undefined
  /**
   *The source and destination accounts are identical.
   */
  NotTransfer: undefined
  /**
   *The index is permanent and may not be freed/changed.
   */
  Permanent: undefined
}>
export type Idj13i7adlomht = AnonymousEnum<{
  /**
   *Vesting balance too high to send value.
   */
  VestingBalance: undefined
  /**
   *Account liquidity restrictions prevent withdrawal.
   */
  LiquidityRestrictions: undefined
  /**
   *Balance too low to send value.
   */
  InsufficientBalance: undefined
  /**
   *Value too low to create account due to existential deposit.
   */
  ExistentialDeposit: undefined
  /**
   *Transfer/payment would kill account.
   */
  Expendability: undefined
  /**
   *A vesting schedule already exists for this account.
   */
  ExistingVestingSchedule: undefined
  /**
   *Beneficiary account must pre-exist.
   */
  DeadAccount: undefined
  /**
   *Number of named reserves exceed `MaxReserves`.
   */
  TooManyReserves: undefined
  /**
   *Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
   */
  TooManyHolds: undefined
  /**
   *Number of freezes exceed `MaxFreezes`.
   */
  TooManyFreezes: undefined
  /**
   *The issuance cannot be modified since it is already deactivated.
   */
  IssuanceDeactivated: undefined
  /**
   *The delta cannot be zero.
   */
  DeltaZero: undefined
}>
export type I2vmrg3q4huhgg = AnonymousEnum<{
  /**
   *Not a controller account.
   */
  NotController: undefined
  /**
   *Not a stash account.
   */
  NotStash: undefined
  /**
   *Stash is already bonded.
   */
  AlreadyBonded: undefined
  /**
   *Controller is already paired.
   */
  AlreadyPaired: undefined
  /**
   *Targets cannot be empty.
   */
  EmptyTargets: undefined
  /**
   *Duplicate index.
   */
  DuplicateIndex: undefined
  /**
   *Slash record index out of bounds.
   */
  InvalidSlashIndex: undefined
  /**
   *Cannot have a validator or nominator role, with value less than the minimum defined by
   *governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
   *intention, `chill` first to remove one's role as validator/nominator.
   */
  InsufficientBond: undefined
  /**
   *Can not schedule more unlock chunks.
   */
  NoMoreChunks: undefined
  /**
   *Can not rebond without unlocking chunks.
   */
  NoUnlockChunk: undefined
  /**
   *Attempting to target a stash that still has funds.
   */
  FundedTarget: undefined
  /**
   *Invalid era to reward.
   */
  InvalidEraToReward: undefined
  /**
   *Invalid number of nominations.
   */
  InvalidNumberOfNominations: undefined
  /**
   *Items are not sorted and unique.
   */
  NotSortedAndUnique: undefined
  /**
   *Rewards for this era have already been claimed for this validator.
   */
  AlreadyClaimed: undefined
  /**
   *No nominators exist on this page.
   */
  InvalidPage: undefined
  /**
   *Incorrect previous history depth input provided.
   */
  IncorrectHistoryDepth: undefined
  /**
   *Incorrect number of slashing spans provided.
   */
  IncorrectSlashingSpans: undefined
  /**
   *Internal state has become somehow corrupted and the operation cannot continue.
   */
  BadState: undefined
  /**
   *Too many nomination targets supplied.
   */
  TooManyTargets: undefined
  /**
   *A nomination target was supplied that was blocked or otherwise not a validator.
   */
  BadTarget: undefined
  /**
   *The user has enough bond and thus cannot be chilled forcefully by an external person.
   */
  CannotChillOther: undefined
  /**
   *There are too many nominators in the system. Governance needs to adjust the staking
   *settings to keep things safe for the runtime.
   */
  TooManyNominators: undefined
  /**
   *There are too many validator candidates in the system. Governance needs to adjust the
   *staking settings to keep things safe for the runtime.
   */
  TooManyValidators: undefined
  /**
   *Commission is too low. Must be at least `MinCommission`.
   */
  CommissionTooLow: undefined
  /**
   *Some bound is not met.
   */
  BoundNotMet: undefined
  /**
   *Used when attempting to use deprecated controller account logic.
   */
  ControllerDeprecated: undefined
  /**
   *Cannot reset a ledger.
   */
  CannotRestoreLedger: undefined
  /**
   *Provided reward destination is not allowed.
   */
  RewardDestinationRestricted: undefined
  /**
   *Not enough funds available to withdraw.
   */
  NotEnoughFunds: undefined
  /**
   *Operation not allowed for virtual stakers.
   */
  VirtualStakerNotAllowed: undefined
  /**
   *Account is restricted from participation in staking. This may happen if the account is
   *staking in another way already, such as via pool.
   */
  Restricted: undefined
}>
export type I1e07dgbaqd1sq = AnonymousEnum<{
  /**
   *Invalid ownership proof.
   */
  InvalidProof: undefined
  /**
   *No associated validator ID for account.
   */
  NoAssociatedValidatorId: undefined
  /**
   *Registered duplicate key.
   */
  DuplicatedKey: undefined
  /**
   *No keys are associated with this account.
   */
  NoKeys: undefined
  /**
   *Key setting account is not live, so it's impossible to associate keys.
   */
  NoAccount: undefined
}>
export type I7q8i0pp1gkas6 = AnonymousEnum<{
  /**
   *Attempt to signal GRANDPA pause when the authority set isn't live
   *(either paused or already pending pause).
   */
  PauseFailed: undefined
  /**
   *Attempt to signal GRANDPA resume when the authority set isn't paused
   *(either live or already pending resume).
   */
  ResumeFailed: undefined
  /**
   *Attempt to signal GRANDPA change with one already pending.
   */
  ChangePending: undefined
  /**
   *Cannot signal forced change so soon after last.
   */
  TooSoon: undefined
  /**
   *A key ownership proof provided as part of an equivocation report is invalid.
   */
  InvalidKeyOwnershipProof: undefined
  /**
   *An equivocation proof provided as part of an equivocation report is invalid.
   */
  InvalidEquivocationProof: undefined
  /**
   *A given equivocation report is valid but already previously reported.
   */
  DuplicateOffenceReport: undefined
}>
export type I36uss0m9fpcsf = AnonymousEnum<{
  /**
   *No proposal, bounty or spend at that index.
   */
  InvalidIndex: undefined
  /**
   *Too many approvals in the queue.
   */
  TooManyApprovals: undefined
  /**
   *The spend origin is valid but the amount it is allowed to spend is lower than the
   *amount to be spent.
   */
  InsufficientPermission: undefined
  /**
   *Proposal has not been approved.
   */
  ProposalNotApproved: undefined
  /**
   *The balance of the asset kind is not convertible to the balance of the native asset.
   */
  FailedToConvertBalance: undefined
  /**
   *The spend has expired and cannot be claimed.
   */
  SpendExpired: undefined
  /**
   *The spend is not yet eligible for payout.
   */
  EarlyPayout: undefined
  /**
   *The payment has already been attempted.
   */
  AlreadyAttempted: undefined
  /**
   *There was some issue with the mechanism of payment.
   */
  PayoutError: undefined
  /**
   *The payout was not yet attempted/claimed.
   */
  NotAttempted: undefined
  /**
   *The payment has neither failed nor succeeded yet.
   */
  Inconclusive: undefined
}>
export type Idfa8k8ikssbsf = AnonymousEnum<{
  /**
   *Poll is not ongoing.
   */
  NotOngoing: undefined
  /**
   *The given account did not vote on the poll.
   */
  NotVoter: undefined
  /**
   *The actor has no permission to conduct the action.
   */
  NoPermission: undefined
  /**
   *The actor has no permission to conduct the action right now but will do in the future.
   */
  NoPermissionYet: undefined
  /**
   *The account is already delegating.
   */
  AlreadyDelegating: undefined
  /**
   *The account currently has votes attached to it and the operation cannot succeed until
   *these are removed through `remove_vote`.
   */
  AlreadyVoting: undefined
  /**
   *Too high a balance was provided that the account cannot afford.
   */
  InsufficientFunds: undefined
  /**
   *The account is not currently delegating.
   */
  NotDelegating: undefined
  /**
   *Delegation to oneself makes no sense.
   */
  Nonsense: undefined
  /**
   *Maximum number of votes reached.
   */
  MaxVotesReached: undefined
  /**
   *The class must be supplied since it is not easily determinable from the state.
   */
  ClassNeeded: undefined
  /**
   *The class ID supplied is invalid.
   */
  BadClass: undefined
}>
export type I84u4ul208g742 = AnonymousEnum<{
  /**
   *Referendum is not ongoing.
   */
  NotOngoing: undefined
  /**
   *Referendum's decision deposit is already paid.
   */
  HasDeposit: undefined
  /**
   *The track identifier given was invalid.
   */
  BadTrack: undefined
  /**
   *There are already a full complement of referenda in progress for this track.
   */
  Full: undefined
  /**
   *The queue of the track is empty.
   */
  QueueEmpty: undefined
  /**
   *The referendum index provided is invalid in this context.
   */
  BadReferendum: undefined
  /**
   *There was nothing to do in the advancement.
   */
  NothingToDo: undefined
  /**
   *No track exists for the proposal origin.
   */
  NoTrack: undefined
  /**
   *Any deposit cannot be refunded until after the decision is over.
   */
  Unfinished: undefined
  /**
   *The deposit refunder is not the depositor.
   */
  NoPermission: undefined
  /**
   *The deposit cannot be refunded since none was made.
   */
  NoDeposit: undefined
  /**
   *The referendum status is invalid for this operation.
   */
  BadStatus: undefined
  /**
   *The preimage does not exist.
   */
  PreimageNotExist: undefined
  /**
   *The preimage is stored with a different length than the one provided.
   */
  PreimageStoredWithDifferentLength: undefined
}>
export type I15nctscutpbeh = AnonymousEnum<{
  /**
   *The preimage of the call hash could not be loaded.
   */
  UnavailablePreImage: undefined
  /**
   *The call could not be decoded.
   */
  UndecodableCall: undefined
  /**
   *The weight of the decoded call was higher than the witness.
   */
  InvalidCallWeightWitness: undefined
  /**
   *The call was not whitelisted.
   */
  CallIsNotWhitelisted: undefined
  /**
   *The call was already whitelisted; No-Op.
   */
  CallAlreadyWhitelisted: undefined
}>
export type Ijh2jbbqvb176 = AnonymousEnum<{
  /**
   *Invalid Ethereum signature.
   */
  InvalidEthereumSignature: undefined
  /**
   *Ethereum address has no claim.
   */
  SignerHasNoClaim: undefined
  /**
   *Account ID sending transaction has no claim.
   */
  SenderHasNoClaim: undefined
  /**
   *There's not enough in the pot to pay out some unvested amount. Generally implies a
   *logic error.
   */
  PotUnderflow: undefined
  /**
   *A needed statement was not included.
   */
  InvalidStatement: undefined
  /**
   *The account already has a vested balance.
   */
  VestedBalanceExists: undefined
}>
export type Icof2acl69lq3c = AnonymousEnum<{
  /**
   *The account given is not vesting.
   */
  NotVesting: undefined
  /**
   *The account already has `MaxVestingSchedules` count of schedules and thus
   *cannot add another one. Consider merging existing schedules in order to add another.
   */
  AtMaxVestingSchedules: undefined
  /**
   *Amount being transferred is too low to create a vesting schedule.
   */
  AmountLow: undefined
  /**
   *An index was out of bounds of the vesting schedules.
   */
  ScheduleIndexOutOfBounds: undefined
  /**
   *Failed to create a new schedule because some parameter was invalid.
   */
  InvalidScheduleParams: undefined
}>
export type I8dt2g2hcrgh36 = AnonymousEnum<{
  /**
   *Too many calls batched.
   */
  TooManyCalls: undefined
}>
export type Iuvt54ei4cehc = AnonymousEnum<{
  /**
   *There are too many proxies registered or too many announcements pending.
   */
  TooMany: undefined
  /**
   *Proxy registration not found.
   */
  NotFound: undefined
  /**
   *Sender is not a proxy of the account to be proxied.
   */
  NotProxy: undefined
  /**
   *A call which is incompatible with the proxy type's filter was attempted.
   */
  Unproxyable: undefined
  /**
   *Account is already a proxy.
   */
  Duplicate: undefined
  /**
   *Call may not be made by proxy because it may escalate its privileges.
   */
  NoPermission: undefined
  /**
   *Announcement, if made at all, was made too recently.
   */
  Unannounced: undefined
  /**
   *Cannot add self as proxy.
   */
  NoSelfProxy: undefined
}>
export type Ia76qmhhg4jvb9 = AnonymousEnum<{
  /**
   *Threshold must be 2 or greater.
   */
  MinimumThreshold: undefined
  /**
   *Call is already approved by this signatory.
   */
  AlreadyApproved: undefined
  /**
   *Call doesn't need any (more) approvals.
   */
  NoApprovalsNeeded: undefined
  /**
   *There are too few signatories in the list.
   */
  TooFewSignatories: undefined
  /**
   *There are too many signatories in the list.
   */
  TooManySignatories: undefined
  /**
   *The signatories were provided out of order; they should be ordered.
   */
  SignatoriesOutOfOrder: undefined
  /**
   *The sender was contained in the other signatories; it shouldn't be.
   */
  SenderInSignatories: undefined
  /**
   *Multisig operation not found when attempting to cancel.
   */
  NotFound: undefined
  /**
   *Only the account that originally created the multisig is able to cancel it.
   */
  NotOwner: undefined
  /**
   *No timepoint was given, yet the multisig operation is already underway.
   */
  NoTimepoint: undefined
  /**
   *A different timepoint was given to the multisig operation that is underway.
   */
  WrongTimepoint: undefined
  /**
   *A timepoint was given, yet no multisig operation is underway.
   */
  UnexpectedTimepoint: undefined
  /**
   *The maximum weight information provided was too low.
   */
  MaxWeightTooLow: undefined
  /**
   *The data to be stored is already stored.
   */
  AlreadyStored: undefined
}>
export type Ibfvjqqblobf53 = AnonymousEnum<{
  /**
   *Proposer's balance is too low.
   */
  InsufficientProposersBalance: undefined
  /**
   *No proposal or bounty at that index.
   */
  InvalidIndex: undefined
  /**
   *The reason given is just too big.
   */
  ReasonTooBig: undefined
  /**
   *The bounty status is unexpected.
   */
  UnexpectedStatus: undefined
  /**
   *Require bounty curator.
   */
  RequireCurator: undefined
  /**
   *Invalid bounty value.
   */
  InvalidValue: undefined
  /**
   *Invalid bounty fee.
   */
  InvalidFee: undefined
  /**
   *A bounty payout is pending.
   *To cancel the bounty, you must unassign and slash the curator.
   */
  PendingPayout: undefined
  /**
   *The bounties cannot be claimed/closed because it's still in the countdown period.
   */
  Premature: undefined
  /**
   *The bounty cannot be closed because it has active child bounties.
   */
  HasActiveChildBounty: undefined
  /**
   *Too many approvals are already queued.
   */
  TooManyQueued: undefined
}>
export type I4u5ou5u3tthff = AnonymousEnum<{
  /**
   *The parent bounty is not in active state.
   */
  ParentBountyNotActive: undefined
  /**
   *The bounty balance is not enough to add new child-bounty.
   */
  InsufficientBountyBalance: undefined
  /**
   *Number of child bounties exceeds limit `MaxActiveChildBountyCount`.
   */
  TooManyChildBounties: undefined
}>
export type Idb84kfjd998sl = AnonymousEnum<{
  /**
   *Submission was too early.
   */
  PreDispatchEarlySubmission: undefined
  /**
   *Wrong number of winners presented.
   */
  PreDispatchWrongWinnerCount: undefined
  /**
   *Submission was too weak, score-wise.
   */
  PreDispatchWeakSubmission: undefined
  /**
   *The queue was full, and the solution was not better than any of the existing ones.
   */
  SignedQueueFull: undefined
  /**
   *The origin failed to pay the deposit.
   */
  SignedCannotPayDeposit: undefined
  /**
   *Witness data to dispatchable is invalid.
   */
  SignedInvalidWitness: undefined
  /**
   *The signed submission consumes too much weight
   */
  SignedTooMuchWeight: undefined
  /**
   *OCW submitted solution for wrong round
   */
  OcwCallWrongEra: undefined
  /**
   *Snapshot metadata should exist but didn't.
   */
  MissingSnapshotMetadata: undefined
  /**
   *`Self::insert_submission` returned an invalid index.
   */
  InvalidSubmissionIndex: undefined
  /**
   *The call is not allowed at this point.
   */
  CallNotAllowed: undefined
  /**
   *The fallback failed
   */
  FallbackFailed: undefined
  /**
   *Some bound not met
   */
  BoundNotMet: undefined
  /**
   *Submitted solution has too many winners
   */
  TooManyWinners: undefined
  /**
   *Submission was prepared for a different round.
   */
  PreDispatchDifferentRound: undefined
}>
export type Ic35l5bgiij29p = AnonymousEnum<{
  /**
   *A error in the list interface implementation.
   */
  List: BagsListListListError
}>
export type BagsListListListError = Enum<{
  Duplicate: undefined
  NotHeavier: undefined
  NotInSameBag: undefined
  NodeNotFound: undefined
}>
export declare const BagsListListListError: GetEnum<BagsListListListError>
export type Iuudu4kursojc = AnonymousEnum<{
  /**
   *A (bonded) pool id does not exist.
   */
  PoolNotFound: undefined
  /**
   *An account is not a member.
   */
  PoolMemberNotFound: undefined
  /**
   *A reward pool does not exist. In all cases this is a system logic error.
   */
  RewardPoolNotFound: undefined
  /**
   *A sub pool does not exist.
   */
  SubPoolsNotFound: undefined
  /**
   *An account is already delegating in another pool. An account may only belong to one
   *pool at a time.
   */
  AccountBelongsToOtherPool: undefined
  /**
   *The member is fully unbonded (and thus cannot access the bonded and reward pool
   *anymore to, for example, collect rewards).
   */
  FullyUnbonding: undefined
  /**
   *The member cannot unbond further chunks due to reaching the limit.
   */
  MaxUnbondingLimit: undefined
  /**
   *None of the funds can be withdrawn yet because the bonding duration has not passed.
   */
  CannotWithdrawAny: undefined
  /**
   *The amount does not meet the minimum bond to either join or create a pool.
   *
   *The depositor can never unbond to a value less than `Pallet::depositor_min_bond`. The
   *caller does not have nominating permissions for the pool. Members can never unbond to a
   *value below `MinJoinBond`.
   */
  MinimumBondNotMet: undefined
  /**
   *The transaction could not be executed due to overflow risk for the pool.
   */
  OverflowRisk: undefined
  /**
   *A pool must be in [`PoolState::Destroying`] in order for the depositor to unbond or for
   *other members to be permissionlessly unbonded.
   */
  NotDestroying: undefined
  /**
   *The caller does not have nominating permissions for the pool.
   */
  NotNominator: undefined
  /**
   *Either a) the caller cannot make a valid kick or b) the pool is not destroying.
   */
  NotKickerOrDestroying: undefined
  /**
   *The pool is not open to join
   */
  NotOpen: undefined
  /**
   *The system is maxed out on pools.
   */
  MaxPools: undefined
  /**
   *Too many members in the pool or system.
   */
  MaxPoolMembers: undefined
  /**
   *The pools state cannot be changed.
   */
  CanNotChangeState: undefined
  /**
   *The caller does not have adequate permissions.
   */
  DoesNotHavePermission: undefined
  /**
   *Metadata exceeds [`Config::MaxMetadataLen`]
   */
  MetadataExceedsMaxLen: undefined
  /**
   *Some error occurred that should never happen. This should be reported to the
   *maintainers.
   */
  Defensive: Anonymize<Ie2db4l6126rkt>
  /**
   *Partial unbonding now allowed permissionlessly.
   */
  PartialUnbondNotAllowedPermissionlessly: undefined
  /**
   *The pool's max commission cannot be set higher than the existing value.
   */
  MaxCommissionRestricted: undefined
  /**
   *The supplied commission exceeds the max allowed commission.
   */
  CommissionExceedsMaximum: undefined
  /**
   *The supplied commission exceeds global maximum commission.
   */
  CommissionExceedsGlobalMaximum: undefined
  /**
   *Not enough blocks have surpassed since the last commission update.
   */
  CommissionChangeThrottled: undefined
  /**
   *The submitted changes to commission change rate are not allowed.
   */
  CommissionChangeRateNotAllowed: undefined
  /**
   *There is no pending commission to claim.
   */
  NoPendingCommission: undefined
  /**
   *No commission current has been set.
   */
  NoCommissionCurrentSet: undefined
  /**
   *Pool id currently in use.
   */
  PoolIdInUse: undefined
  /**
   *Pool id provided is not correct/usable.
   */
  InvalidPoolId: undefined
  /**
   *Bonding extra is restricted to the exact pending reward amount.
   */
  BondExtraRestricted: undefined
  /**
   *No imbalance in the ED deposit for the pool.
   */
  NothingToAdjust: undefined
  /**
   *No slash pending that can be applied to the member.
   */
  NothingToSlash: undefined
  /**
   *The slash amount is too low to be applied.
   */
  SlashTooLow: undefined
  /**
   *The pool or member delegation has already migrated to delegate stake.
   */
  AlreadyMigrated: undefined
  /**
   *The pool or member delegation has not migrated yet to delegate stake.
   */
  NotMigrated: undefined
  /**
   *This call is not allowed in the current state of the pallet.
   */
  NotSupported: undefined
  /**
   *Account is restricted from participation in pools. This may happen if the account is
   *staking in another way already.
   */
  Restricted: undefined
}>
export type Ie2db4l6126rkt = AnonymousEnum<{
  NotEnoughSpaceInUnbondPool: undefined
  PoolNotFound: undefined
  RewardPoolNotFound: undefined
  SubPoolsNotFound: undefined
  BondedStashKilledPrematurely: undefined
  DelegationUnsupported: undefined
  SlashNotApplied: undefined
}>
export type Iau9bur8dc3bec = AnonymousEnum<{
  /**
   *The provided Controller account was not found.
   *
   *This means that the given account is not bonded.
   */
  NotController: undefined
  /**
   *The bonded account has already been queued.
   */
  AlreadyQueued: undefined
  /**
   *The bonded account has active unlocking chunks.
   */
  NotFullyBonded: undefined
  /**
   *The provided un-staker is not in the `Queue`.
   */
  NotQueued: undefined
  /**
   *The provided un-staker is already in Head, and cannot deregister.
   */
  AlreadyHead: undefined
  /**
   *The call is not allowed at this point because the pallet is not active.
   */
  CallNotAllowed: undefined
}>
export type Iaogv3iimefnis = AnonymousEnum<{
  /**
   *The account cannot perform this operation.
   */
  NotAllowed: undefined
  /**
   *An existing staker cannot perform this action.
   */
  AlreadyStaking: undefined
  /**
   *Reward Destination cannot be same as `Agent` account.
   */
  InvalidRewardDestination: undefined
  /**
   *Delegation conditions are not met.
   *
   *Possible issues are
   *1) Cannot delegate to self,
   *2) Cannot delegate to multiple delegates.
   */
  InvalidDelegation: undefined
  /**
   *The account does not have enough funds to perform the operation.
   */
  NotEnoughFunds: undefined
  /**
   *Not an existing `Agent` account.
   */
  NotAgent: undefined
  /**
   *Not a Delegator account.
   */
  NotDelegator: undefined
  /**
   *Some corruption in internal state.
   */
  BadState: undefined
  /**
   *Unapplied pending slash restricts operation on `Agent`.
   */
  UnappliedSlash: undefined
  /**
   *`Agent` has no pending slash to be applied.
   */
  NothingToSlash: undefined
  /**
   *Failed to withdraw amount from Core Staking.
   */
  WithdrawFailed: undefined
  /**
   *Operation not supported by this pallet.
   */
  NotSupported: undefined
}>
export type In1jctfv299lm = AnonymousEnum<{
  /**
   *The new value for a configuration parameter is invalid.
   */
  InvalidNewValue: undefined
}>
export type I4rrcn97hglfls = AnonymousEnum<{
  /**
   *Validator index out of bounds.
   */
  ValidatorIndexOutOfBounds: undefined
  /**
   *Candidate submitted but para not scheduled.
   */
  UnscheduledCandidate: undefined
  /**
   *Head data exceeds the configured maximum.
   */
  HeadDataTooLarge: undefined
  /**
   *Code upgrade prematurely.
   */
  PrematureCodeUpgrade: undefined
  /**
   *Output code is too large
   */
  NewCodeTooLarge: undefined
  /**
   *The candidate's relay-parent was not allowed. Either it was
   *not recent enough or it didn't advance based on the last parachain block.
   */
  DisallowedRelayParent: undefined
  /**
   *Failed to compute group index for the core: either it's out of bounds
   *or the relay parent doesn't belong to the current session.
   */
  InvalidAssignment: undefined
  /**
   *Invalid group index in core assignment.
   */
  InvalidGroupIndex: undefined
  /**
   *Insufficient (non-majority) backing.
   */
  InsufficientBacking: undefined
  /**
   *Invalid (bad signature, unknown validator, etc.) backing.
   */
  InvalidBacking: undefined
  /**
   *The validation data hash does not match expected.
   */
  ValidationDataHashMismatch: undefined
  /**
   *The downward message queue is not processed correctly.
   */
  IncorrectDownwardMessageHandling: undefined
  /**
   *At least one upward message sent does not pass the acceptance criteria.
   */
  InvalidUpwardMessages: undefined
  /**
   *The candidate didn't follow the rules of HRMP watermark advancement.
   */
  HrmpWatermarkMishandling: undefined
  /**
   *The HRMP messages sent by the candidate is not valid.
   */
  InvalidOutboundHrmp: undefined
  /**
   *The validation code hash of the candidate is not valid.
   */
  InvalidValidationCodeHash: undefined
  /**
   *The `para_head` hash in the candidate descriptor doesn't match the hash of the actual
   *para head in the commitments.
   */
  ParaHeadMismatch: undefined
}>
export type Idfqgoii3heb2f = AnonymousEnum<{
  /**
   *Inclusion inherent called more than once per block.
   */
  TooManyInclusionInherents: undefined
  /**
   *The hash of the submitted parent header doesn't correspond to the saved block hash of
   *the parent.
   */
  InvalidParentHeader: undefined
  /**
   *The data given to the inherent will result in an overweight block.
   */
  InherentOverweight: undefined
  /**
   *A candidate was filtered during inherent execution. This should have only been done
   *during creation.
   */
  CandidatesFilteredDuringExecution: undefined
  /**
   *Too many candidates supplied.
   */
  UnscheduledCandidate: undefined
}>
export type Ieo97unb4d08rl = AnonymousEnum<{
  /**
   *Para is not registered in our system.
   */
  NotRegistered: undefined
  /**
   *Para cannot be onboarded because it is already tracked by our system.
   */
  CannotOnboard: undefined
  /**
   *Para cannot be offboarded at this time.
   */
  CannotOffboard: undefined
  /**
   *Para cannot be upgraded to a lease holding parachain.
   */
  CannotUpgrade: undefined
  /**
   *Para cannot be downgraded to an on-demand parachain.
   */
  CannotDowngrade: undefined
  /**
   *The statement for PVF pre-checking is stale.
   */
  PvfCheckStatementStale: undefined
  /**
   *The statement for PVF pre-checking is for a future session.
   */
  PvfCheckStatementFuture: undefined
  /**
   *Claimed validator index is out of bounds.
   */
  PvfCheckValidatorIndexOutOfBounds: undefined
  /**
   *The signature for the PVF pre-checking is invalid.
   */
  PvfCheckInvalidSignature: undefined
  /**
   *The given validator already has cast a vote.
   */
  PvfCheckDoubleVote: undefined
  /**
   *The given PVF does not exist at the moment of process a vote.
   */
  PvfCheckSubjectInvalid: undefined
  /**
   *Parachain cannot currently schedule a code upgrade.
   */
  CannotUpgradeCode: undefined
  /**
   *Invalid validation code size.
   */
  InvalidCode: undefined
}>
export type Ibns95nfmm92df = AnonymousEnum<{
  /**
   *The sender tried to open a channel to themselves.
   */
  OpenHrmpChannelToSelf: undefined
  /**
   *The recipient is not a valid para.
   */
  OpenHrmpChannelInvalidRecipient: undefined
  /**
   *The requested capacity is zero.
   */
  OpenHrmpChannelZeroCapacity: undefined
  /**
   *The requested capacity exceeds the global limit.
   */
  OpenHrmpChannelCapacityExceedsLimit: undefined
  /**
   *The requested maximum message size is 0.
   */
  OpenHrmpChannelZeroMessageSize: undefined
  /**
   *The open request requested the message size that exceeds the global limit.
   */
  OpenHrmpChannelMessageSizeExceedsLimit: undefined
  /**
   *The channel already exists
   */
  OpenHrmpChannelAlreadyExists: undefined
  /**
   *There is already a request to open the same channel.
   */
  OpenHrmpChannelAlreadyRequested: undefined
  /**
   *The sender already has the maximum number of allowed outbound channels.
   */
  OpenHrmpChannelLimitExceeded: undefined
  /**
   *The channel from the sender to the origin doesn't exist.
   */
  AcceptHrmpChannelDoesntExist: undefined
  /**
   *The channel is already confirmed.
   */
  AcceptHrmpChannelAlreadyConfirmed: undefined
  /**
   *The recipient already has the maximum number of allowed inbound channels.
   */
  AcceptHrmpChannelLimitExceeded: undefined
  /**
   *The origin tries to close a channel where it is neither the sender nor the recipient.
   */
  CloseHrmpChannelUnauthorized: undefined
  /**
   *The channel to be closed doesn't exist.
   */
  CloseHrmpChannelDoesntExist: undefined
  /**
   *The channel close request is already requested.
   */
  CloseHrmpChannelAlreadyUnderway: undefined
  /**
   *Canceling is requested by neither the sender nor recipient of the open channel request.
   */
  CancelHrmpOpenChannelUnauthorized: undefined
  /**
   *The open request doesn't exist.
   */
  OpenHrmpChannelDoesntExist: undefined
  /**
   *Cannot cancel an HRMP open channel request because it is already confirmed.
   */
  OpenHrmpChannelAlreadyConfirmed: undefined
  /**
   *The provided witness data is wrong.
   */
  WrongWitness: undefined
  /**
   *The channel between these two chains cannot be authorized.
   */
  ChannelCreationNotAuthorized: undefined
}>
export type Iakburbqot4g58 = AnonymousEnum<{
  /**
   *Duplicate dispute statement sets provided.
   */
  DuplicateDisputeStatementSets: undefined
  /**
   *Ancient dispute statement provided.
   */
  AncientDisputeStatement: undefined
  /**
   *Validator index on statement is out of bounds for session.
   */
  ValidatorIndexOutOfBounds: undefined
  /**
   *Invalid signature on statement.
   */
  InvalidSignature: undefined
  /**
   *Validator vote submitted more than once to dispute.
   */
  DuplicateStatement: undefined
  /**
   *A dispute where there are only votes on one side.
   */
  SingleSidedDispute: undefined
  /**
   *A dispute vote from a malicious backer.
   */
  MaliciousBacker: undefined
  /**
   *No backing votes were provides along dispute statements.
   */
  MissingBackingVotes: undefined
  /**
   *Unconfirmed dispute statement sets provided.
   */
  UnconfirmedDispute: undefined
}>
export type I1v70p1j0r2q1j = AnonymousEnum<{
  /**
   *The key ownership proof is invalid.
   */
  InvalidKeyOwnershipProof: undefined
  /**
   *The session index is too old or invalid.
   */
  InvalidSessionIndex: undefined
  /**
   *The candidate hash is invalid.
   */
  InvalidCandidateHash: undefined
  /**
   *There is no pending slash for the given validator index and time
   *slot.
   */
  InvalidValidatorIndex: undefined
  /**
   *The validator index does not match the validator id.
   */
  ValidatorIndexIdMismatch: undefined
  /**
   *The given slashing report is valid but already previously reported.
   */
  DuplicateSlashingReport: undefined
}>
export type I8htscm3ert491 = AnonymousEnum<{
  /**
   *The order queue is full, `place_order` will not continue.
   */
  QueueFull: undefined
  /**
   *The current spot price is higher than the max amount specified in the `place_order`
   *call, making it invalid.
   */
  SpotPriceHigherThanMaxAmount: undefined
}>
export type Ie3b9qd0nd59gs = AnonymousEnum<{
  AssignmentsEmpty: undefined
  /**
   *Assignments together exceeded 57600.
   */
  OverScheduled: undefined
  /**
   *Assignments together less than 57600
   */
  UnderScheduled: undefined
  /**
   *assign_core is only allowed to append new assignments at the end of already existing
   *ones.
   */
  DisallowedInsert: undefined
  /**
   *Tried to insert a schedule for the same core and block number as an existing schedule
   */
  DuplicateInsert: undefined
  /**
   *Tried to add an unsorted set of assignments
   */
  AssignmentsNotSorted: undefined
}>
export type I97vkspnd0b8bh = AnonymousEnum<{
  /**
   *The ID is not registered.
   */
  NotRegistered: undefined
  /**
   *The ID is already registered.
   */
  AlreadyRegistered: undefined
  /**
   *The caller is not the owner of this Id.
   */
  NotOwner: undefined
  /**
   *Invalid para code size.
   */
  CodeTooLarge: undefined
  /**
   *Invalid para head data size.
   */
  HeadDataTooLarge: undefined
  /**
   *Para is not a Parachain.
   */
  NotParachain: undefined
  /**
   *Para is not a Parathread (on-demand parachain).
   */
  NotParathread: undefined
  /**
   *Cannot deregister para
   */
  CannotDeregister: undefined
  /**
   *Cannot schedule downgrade of lease holding parachain to on-demand parachain
   */
  CannotDowngrade: undefined
  /**
   *Cannot schedule upgrade of on-demand parachain to lease holding parachain
   */
  CannotUpgrade: undefined
  /**
   *Para is locked from manipulation by the manager. Must use parachain or relay chain
   *governance.
   */
  ParaLocked: undefined
  /**
   *The ID given for registration has not been reserved.
   */
  NotReserved: undefined
  /**
   *The validation code is invalid.
   */
  InvalidCode: undefined
  /**
   *Cannot perform a parachain slot / lifecycle swap. Check that the state of both paras
   *are correct for the swap to work.
   */
  CannotSwap: undefined
}>
export type Iers095sa65pbg = AnonymousEnum<{
  /**
   *The parachain ID is not onboarding.
   */
  ParaNotOnboarding: undefined
  /**
   *There was an error with the lease.
   */
  LeaseError: undefined
}>
export type I4kgo47o2v3701 = AnonymousEnum<{
  /**
   *This auction is already in progress.
   */
  AuctionInProgress: undefined
  /**
   *The lease period is in the past.
   */
  LeasePeriodInPast: undefined
  /**
   *Para is not registered
   */
  ParaNotRegistered: undefined
  /**
   *Not a current auction.
   */
  NotCurrentAuction: undefined
  /**
   *Not an auction.
   */
  NotAuction: undefined
  /**
   *Auction has already ended.
   */
  AuctionEnded: undefined
  /**
   *The para is already leased out for part of this range.
   */
  AlreadyLeasedOut: undefined
}>
export type I9o6l1c4r4qc3s = AnonymousEnum<{
  /**
   *The current lease period is more than the first lease period.
   */
  FirstPeriodInPast: undefined
  /**
   *The first lease period needs to at least be less than 3 `max_value`.
   */
  FirstPeriodTooFarInFuture: undefined
  /**
   *Last lease period must be greater than first lease period.
   */
  LastPeriodBeforeFirstPeriod: undefined
  /**
   *The last lease period cannot be more than 3 periods after the first period.
   */
  LastPeriodTooFarInFuture: undefined
  /**
   *The campaign ends before the current block number. The end must be in the future.
   */
  CannotEndInPast: undefined
  /**
   *The end date for this crowdloan is not sensible.
   */
  EndTooFarInFuture: undefined
  /**
   *There was an overflow.
   */
  Overflow: undefined
  /**
   *The contribution was below the minimum, `MinContribution`.
   */
  ContributionTooSmall: undefined
  /**
   *Invalid fund index.
   */
  InvalidParaId: undefined
  /**
   *Contributions exceed maximum amount.
   */
  CapExceeded: undefined
  /**
   *The contribution period has already ended.
   */
  ContributionPeriodOver: undefined
  /**
   *The origin of this call is invalid.
   */
  InvalidOrigin: undefined
  /**
   *This crowdloan does not correspond to a parachain.
   */
  NotParachain: undefined
  /**
   *This parachain lease is still active and retirement cannot yet begin.
   */
  LeaseActive: undefined
  /**
   *This parachain's bid or lease is still active and withdraw cannot yet begin.
   */
  BidOrLeaseActive: undefined
  /**
   *The crowdloan has not yet ended.
   */
  FundNotEnded: undefined
  /**
   *There are no contributions stored in this crowdloan.
   */
  NoContributions: undefined
  /**
   *The crowdloan is not ready to dissolve. Potentially still has a slot or in retirement
   *period.
   */
  NotReadyToDissolve: undefined
  /**
   *Invalid signature.
   */
  InvalidSignature: undefined
  /**
   *The provided memo is too large.
   */
  MemoTooLarge: undefined
  /**
   *The fund is already in `NewRaise`
   */
  AlreadyInNewRaise: undefined
  /**
   *No contributions allowed during the VRF delay
   */
  VrfDelayInProgress: undefined
  /**
   *A lease period has not started yet, due to an offset in the starting block.
   */
  NoLeasePeriod: undefined
}>
export type Ifju0orssp9h7o = AnonymousEnum<{
  /**
   *The paraid making the call is not the coretime brokerage system parachain.
   */
  NotBroker: undefined
  /**
   *Requested revenue information `when` parameter was in the future from the current
   *block height.
   */
  RequestedFutureRevenue: undefined
  /**
   *Failed to transfer assets to the coretime chain
   */
  AssetTransferFailed: undefined
}>
export type I96objte63brjr = AnonymousEnum<{
  /**
   *Max signed limits not respected.
   */
  MaxSignedLimits: undefined
  /**
   *A key was longer than the configured maximum.
   *
   *This means that the migration halted at the current [`Progress`] and
   *can be resumed with a larger [`crate::Config::MaxKeyLen`] value.
   *Retrying with the same [`crate::Config::MaxKeyLen`] value will not work.
   *The value should only be increased to avoid a storage migration for the currently
   *stored [`crate::Progress::LastKey`].
   */
  KeyTooLong: undefined
  /**
   *submitter does not have enough funds.
   */
  NotEnoughFunds: undefined
  /**
   *Bad witness data provided.
   */
  BadWitness: undefined
  /**
   *Signed migration is not allowed because the maximum limit is not set yet.
   */
  SignedMigrationNotAllowed: undefined
  /**
   *Bad child root provided.
   */
  BadChildRoot: undefined
}>
export type I87j95aq93d7dq = AnonymousEnum<{
  /**
   *The desired destination was unreachable, generally because there is a no way of routing
   *to it.
   */
  Unreachable: undefined
  /**
   *There was some other issue (i.e. not to do with routing) in sending the message.
   *Perhaps a lack of space for buffering the message.
   */
  SendFailure: undefined
  /**
   *The message execution fails the filter.
   */
  Filtered: undefined
  /**
   *The message's weight could not be determined.
   */
  UnweighableMessage: undefined
  /**
   *The destination `Location` provided cannot be inverted.
   */
  DestinationNotInvertible: undefined
  /**
   *The assets to be sent are empty.
   */
  Empty: undefined
  /**
   *Could not re-anchor the assets to declare the fees for the destination chain.
   */
  CannotReanchor: undefined
  /**
   *Too many assets have been attempted for transfer.
   */
  TooManyAssets: undefined
  /**
   *Origin is invalid for sending.
   */
  InvalidOrigin: undefined
  /**
   *The version of the `Versioned` value used is not able to be interpreted.
   */
  BadVersion: undefined
  /**
   *The given location could not be used (e.g. because it cannot be expressed in the
   *desired version of XCM).
   */
  BadLocation: undefined
  /**
   *The referenced subscription could not be found.
   */
  NoSubscription: undefined
  /**
   *The location is invalid since it already has a subscription from us.
   */
  AlreadySubscribed: undefined
  /**
   *Could not check-out the assets for teleportation to the destination chain.
   */
  CannotCheckOutTeleport: undefined
  /**
   *The owner does not own (all) of the asset that they wish to do the operation on.
   */
  LowBalance: undefined
  /**
   *The asset owner has too many locks on the asset.
   */
  TooManyLocks: undefined
  /**
   *The given account is not an identifiable sovereign account for any location.
   */
  AccountNotSovereign: undefined
  /**
   *The operation required fees to be paid which the initiator could not meet.
   */
  FeesNotMet: undefined
  /**
   *A remote lock with the corresponding data could not be found.
   */
  LockNotFound: undefined
  /**
   *The unlock operation cannot succeed because there are still consumers of the lock.
   */
  InUse: undefined
  /**
   *Invalid asset, reserve chain could not be determined for it.
   */
  InvalidAssetUnknownReserve: undefined
  /**
   *Invalid asset, do not support remote asset reserves with different fees reserves.
   */
  InvalidAssetUnsupportedReserve: undefined
  /**
   *Too many assets with different reserve locations have been attempted for transfer.
   */
  TooManyReserves: undefined
  /**
   *Local XCM execution incomplete.
   */
  LocalExecutionIncomplete: undefined
}>
export type I5iupade5ag2dp = AnonymousEnum<{
  /**
   *Page is not reapable because it has items remaining to be processed and is not old
   *enough.
   */
  NotReapable: undefined
  /**
   *Page to be reaped does not exist.
   */
  NoPage: undefined
  /**
   *The referenced message could not be found.
   */
  NoMessage: undefined
  /**
   *The message was already processed and cannot be processed again.
   */
  AlreadyProcessed: undefined
  /**
   *The message is queued for future execution.
   */
  Queued: undefined
  /**
   *There is temporarily not enough weight to continue servicing messages.
   */
  InsufficientWeight: undefined
  /**
   *This message is temporarily unprocessable.
   *
   *Such errors are expected, but not guaranteed, to resolve themselves eventually through
   *retrying.
   */
  TemporarilyUnprocessable: undefined
  /**
   *The queue is paused and no message can be executed from it.
   *
   *This can change at any time and may resolve in the future by re-trying.
   */
  QueuePaused: undefined
  /**
   *Another call is in progress and needs to finish before this call can happen.
   */
  RecursiveDisallowed: undefined
}>
export type I3qgd61cgli6cp = AnonymousEnum<{
  /**
   *The given asset ID is unknown.
   */
  UnknownAssetKind: undefined
  /**
   *The given asset ID already has an assigned conversion rate and cannot be re-created.
   */
  AlreadyExists: undefined
  /**
   *Overflow ocurred when calculating the inverse rate.
   */
  Overflow: undefined
}>
export type Iflve6qd33ah68 = AnonymousEnum<{
  /**
   *A key ownership proof provided as part of an equivocation report is invalid.
   */
  InvalidKeyOwnershipProof: undefined
  /**
   *A double voting proof provided as part of an equivocation report is invalid.
   */
  InvalidDoubleVotingProof: undefined
  /**
   *A fork voting proof provided as part of an equivocation report is invalid.
   */
  InvalidForkVotingProof: undefined
  /**
   *A future block voting proof provided as part of an equivocation report is invalid.
   */
  InvalidFutureBlockVotingProof: undefined
  /**
   *The session of the equivocation proof is invalid
   */
  InvalidEquivocationProofSession: undefined
  /**
   *A given equivocation report is valid but already previously reported.
   */
  DuplicateOffenceReport: undefined
  /**
   *Submitted configuration is invalid.
   */
  InvalidConfiguration: undefined
}>
export type Ieq0677kv2oqb2 = AnonymousEnum<{
  /**
   *The specified parachain is not registered.
   */
  ParaDoesntExist: undefined
  /**
   *The specified parachain is already registered.
   */
  ParaAlreadyExists: undefined
  /**
   *A DMP message couldn't be sent because it exceeds the maximum size allowed for a
   *downward message.
   */
  ExceedsMaxMessageSize: undefined
  /**
   *Could not schedule para cleanup.
   */
  CouldntCleanup: undefined
  /**
   *Not a parathread (on-demand parachain).
   */
  NotParathread: undefined
  /**
   *Not a lease holding parachain.
   */
  NotParachain: undefined
  /**
   *Cannot upgrade on-demand parachain to lease holding parachain.
   */
  CannotUpgrade: undefined
  /**
   *Cannot downgrade lease holding parachain to on-demand.
   */
  CannotDowngrade: undefined
  /**
   *There are more cores than supported by the runtime.
   */
  TooManyCores: undefined
}>
export type Iaug04qjhbli00 = AnonymousEnum<{
  /**
   *Sender must be the Sudo account.
   */
  RequireSudo: undefined
}>
export type TokenError = Enum<{
  FundsUnavailable: undefined
  OnlyProvider: undefined
  BelowMinimum: undefined
  CannotCreate: undefined
  UnknownAsset: undefined
  Frozen: undefined
  Unsupported: undefined
  CannotCreateHold: undefined
  NotExpendable: undefined
  Blocked: undefined
}>
export declare const TokenError: GetEnum<TokenError>
export type ArithmeticError = Enum<{
  Underflow: undefined
  Overflow: undefined
  DivisionByZero: undefined
}>
export declare const ArithmeticError: GetEnum<ArithmeticError>
export type TransactionalError = Enum<{
  LimitReached: undefined
  NoLayer: undefined
}>
export declare const TransactionalError: GetEnum<TransactionalError>
export type Icbccs0ug47ilf = {
  account: SS58String
}
export type I855j4i3kr8ko1 = {
  sender: SS58String
  hash: FixedSizeBinary<32>
}
export type Ibgl04rn6nbfm6 = {
  code_hash: FixedSizeBinary<32>
  check_version: boolean
}
export type Iec0kq3298o9ia = AnonymousEnum<{
  /**
   *Scheduled some task.
   */
  Scheduled: Anonymize<I5n4sebgkfr760>
  /**
   *Canceled some task.
   */
  Canceled: Anonymize<I5n4sebgkfr760>
  /**
   *Dispatched some task.
   */
  Dispatched: Anonymize<I1sffdca1onf37>
  /**
   *Set a retry configuration for some task.
   */
  RetrySet: Anonymize<Ia3c82eadg79bj>
  /**
   *Cancel a retry configuration for some task.
   */
  RetryCancelled: Anonymize<Ienusoeb625ftq>
  /**
   *The call for the provided hash was not found so the task has been aborted.
   */
  CallUnavailable: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be renewed since the agenda is full at that block.
   */
  PeriodicFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be retried since the agenda is full at that block or there
   *was not enough weight to reschedule it.
   */
  RetryFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task can never be executed since it is overweight.
   */
  PermanentlyOverweight: Anonymize<Ienusoeb625ftq>
}>
export type I5n4sebgkfr760 = {
  when: number
  index: number
}
export type I1sffdca1onf37 = {
  task: Anonymize<I9jd27rnpm8ttv>
  id?: Anonymize<I4s6vifaf8k998>
  result: Anonymize<I69hcjbv3dno0j>
}
export type I9jd27rnpm8ttv = FixedSizeArray<2, number>
export type I4s6vifaf8k998 = FixedSizeBinary<32> | undefined
export type I69hcjbv3dno0j = ResultPayload<undefined, Anonymize<I995flrivt70on>>
export type Ia3c82eadg79bj = {
  task: Anonymize<I9jd27rnpm8ttv>
  id?: Anonymize<I4s6vifaf8k998>
  period: number
  retries: number
}
export type Ienusoeb625ftq = {
  task: Anonymize<I9jd27rnpm8ttv>
  id?: Anonymize<I4s6vifaf8k998>
}
export type PreimageEvent = Enum<{
  /**
   *A preimage has been noted.
   */
  Noted: Anonymize<I1jm8m1rh9e20v>
  /**
   *A preimage has been requested.
   */
  Requested: Anonymize<I1jm8m1rh9e20v>
  /**
   *A preimage has ben cleared.
   */
  Cleared: Anonymize<I1jm8m1rh9e20v>
}>
export declare const PreimageEvent: GetEnum<PreimageEvent>
export type I1jm8m1rh9e20v = {
  hash: FixedSizeBinary<32>
}
export type IndicesEvent = Enum<{
  /**
   *A account index was assigned.
   */
  IndexAssigned: Anonymize<Ia1u3jll6a06ae>
  /**
   *A account index has been freed up (unassigned).
   */
  IndexFreed: Anonymize<I666bl2fqjkejo>
  /**
   *A account index has been frozen to its current account ID.
   */
  IndexFrozen: Anonymize<Ia1u3jll6a06ae>
}>
export declare const IndicesEvent: GetEnum<IndicesEvent>
export type Ia1u3jll6a06ae = {
  who: SS58String
  index: number
}
export type I666bl2fqjkejo = {
  index: number
}
export type Iao8h4hv7atnq3 = AnonymousEnum<{
  /**
   *An account was created with some free balance.
   */
  Endowed: Anonymize<Icv68aq8841478>
  /**
   *An account was removed whose balance was non-zero but below ExistentialDeposit,
   *resulting in an outright loss.
   */
  DustLost: Anonymize<Ic262ibdoec56a>
  /**
   *Transfer succeeded.
   */
  Transfer: Anonymize<Iflcfm9b6nlmdd>
  /**
   *A balance was set by root.
   */
  BalanceSet: Anonymize<Ijrsf4mnp3eka>
  /**
   *Some balance was reserved (moved from free to reserved).
   */
  Reserved: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some balance was unreserved (moved from reserved to free).
   */
  Unreserved: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some balance was moved from the reserve of the first account to the second account.
   *Final argument indicates the destination balance type.
   */
  ReserveRepatriated: Anonymize<I8tjvj9uq4b7hi>
  /**
   *Some amount was deposited (e.g. for transaction fees).
   */
  Deposit: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  Withdraw: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was removed from the account (e.g. for misbehavior).
   */
  Slashed: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was minted into an account.
   */
  Minted: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was burned from an account.
   */
  Burned: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was suspended from an account (it can be restored later).
   */
  Suspended: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some amount was restored into an account.
   */
  Restored: Anonymize<Id5fm4p8lj5qgi>
  /**
   *An account was upgraded.
   */
  Upgraded: Anonymize<I4cbvqmqadhrea>
  /**
   *Total issuance was increased by `amount`, creating a credit to be balanced.
   */
  Issued: Anonymize<I3qt1hgg4djhgb>
  /**
   *Total issuance was decreased by `amount`, creating a debt to be balanced.
   */
  Rescinded: Anonymize<I3qt1hgg4djhgb>
  /**
   *Some balance was locked.
   */
  Locked: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some balance was unlocked.
   */
  Unlocked: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some balance was frozen.
   */
  Frozen: Anonymize<Id5fm4p8lj5qgi>
  /**
   *Some balance was thawed.
   */
  Thawed: Anonymize<Id5fm4p8lj5qgi>
  /**
   *The `TotalIssuance` was forcefully changed.
   */
  TotalIssuanceForced: Anonymize<I4fooe9dun9o0t>
}>
export type Icv68aq8841478 = {
  account: SS58String
  free_balance: bigint
}
export type Ic262ibdoec56a = {
  account: SS58String
  amount: bigint
}
export type Iflcfm9b6nlmdd = {
  from: SS58String
  to: SS58String
  amount: bigint
}
export type Ijrsf4mnp3eka = {
  who: SS58String
  free: bigint
}
export type Id5fm4p8lj5qgi = {
  who: SS58String
  amount: bigint
}
export type I8tjvj9uq4b7hi = {
  from: SS58String
  to: SS58String
  amount: bigint
  destination_status: BalanceStatus
}
export type BalanceStatus = Enum<{
  Free: undefined
  Reserved: undefined
}>
export declare const BalanceStatus: GetEnum<BalanceStatus>
export type I4cbvqmqadhrea = {
  who: SS58String
}
export type I3qt1hgg4djhgb = {
  amount: bigint
}
export type I4fooe9dun9o0t = {
  old: bigint
  new: bigint
}
export type TransactionPaymentEvent = Enum<{
  /**
   *A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
   *has been paid by `who`.
   */
  TransactionFeePaid: Anonymize<Ier2cke86dqbr2>
}>
export declare const TransactionPaymentEvent: GetEnum<TransactionPaymentEvent>
export type Ier2cke86dqbr2 = {
  who: SS58String
  actual_fee: bigint
  tip: bigint
}
export type StakingEvent = Enum<{
  /**
   *The era payout has been set; the first balance is the validator-payout; the second is
   *the remainder from the maximum amount of reward.
   */
  EraPaid: Anonymize<I1au3fq4n84nv3>
  /**
   *The nominator has been rewarded by this amount to this destination.
   */
  Rewarded: Anonymize<Iejaj7m7qka9tr>
  /**
   *A staker (validator or nominator) has been slashed by the given amount.
   */
  Slashed: Anonymize<Idnak900lt5lm8>
  /**
   *A slash for the given validator, for the given percentage of their stake, at the given
   *era as been reported.
   */
  SlashReported: Anonymize<I27n7lbd66730p>
  /**
   *An old slashing report from a prior era was discarded because it could
   *not be processed.
   */
  OldSlashingReportDiscarded: Anonymize<I2hq50pu2kdjpo>
  /**
   *A new set of stakers was elected.
   */
  StakersElected: undefined
  /**
   *An account has bonded this amount. \[stash, amount\]
   *
   *NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *it will not be emitted for staking rewards when they are added to stake.
   */
  Bonded: Anonymize<Ifk8eme5o7mukf>
  /**
   *An account has unbonded this amount.
   */
  Unbonded: Anonymize<Ifk8eme5o7mukf>
  /**
   *An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *from the unlocking queue.
   */
  Withdrawn: Anonymize<Ifk8eme5o7mukf>
  /**
   *A nominator has been kicked from a validator.
   */
  Kicked: Anonymize<Iau4cgm6ih61cf>
  /**
   *The election failed. No new era is planned.
   */
  StakingElectionFailed: undefined
  /**
   *An account has stopped participating as either a validator or nominator.
   */
  Chilled: Anonymize<Idl3umm12u5pa>
  /**
   *The stakers' rewards are getting paid.
   */
  PayoutStarted: Anonymize<I6ir616rur362k>
  /**
   *A validator has set their preferences.
   */
  ValidatorPrefsSet: Anonymize<Ic19as7nbst738>
  /**
   *Voters size limit reached.
   */
  SnapshotVotersSizeExceeded: Anonymize<I54umskavgc9du>
  /**
   *Targets size limit reached.
   */
  SnapshotTargetsSizeExceeded: Anonymize<I54umskavgc9du>
  /**
   *A new force era mode was set.
   */
  ForceEra: Anonymize<I2ip7o9e2tc5sf>
  /**
   *Report of a controller batch deprecation.
   */
  ControllerBatchDeprecated: Anonymize<I5egvk6hadac5h>
}>
export declare const StakingEvent: GetEnum<StakingEvent>
export type I1au3fq4n84nv3 = {
  era_index: number
  validator_payout: bigint
  remainder: bigint
}
export type Iejaj7m7qka9tr = {
  stash: SS58String
  dest: StakingRewardDestination
  amount: bigint
}
export type StakingRewardDestination = Enum<{
  Staked: undefined
  Stash: undefined
  Controller: undefined
  Account: SS58String
  None: undefined
}>
export declare const StakingRewardDestination: GetEnum<StakingRewardDestination>
export type Idnak900lt5lm8 = {
  staker: SS58String
  amount: bigint
}
export type I27n7lbd66730p = {
  validator: SS58String
  fraction: number
  slash_era: number
}
export type I2hq50pu2kdjpo = {
  session_index: number
}
export type Ifk8eme5o7mukf = {
  stash: SS58String
  amount: bigint
}
export type Iau4cgm6ih61cf = {
  nominator: SS58String
  stash: SS58String
}
export type Idl3umm12u5pa = {
  stash: SS58String
}
export type I6ir616rur362k = {
  era_index: number
  validator_stash: SS58String
}
export type Ic19as7nbst738 = {
  stash: SS58String
  prefs: Anonymize<I9o7ssi9vmhmgr>
}
export type I9o7ssi9vmhmgr = {
  commission: number
  blocked: boolean
}
export type I54umskavgc9du = {
  size: number
}
export type I2ip7o9e2tc5sf = {
  mode: StakingForcing
}
export type StakingForcing = Enum<{
  NotForcing: undefined
  ForceNew: undefined
  ForceNone: undefined
  ForceAlways: undefined
}>
export declare const StakingForcing: GetEnum<StakingForcing>
export type I5egvk6hadac5h = {
  failures: number
}
export type OffencesEvent = Enum<{
  /**
   *There is an offence reported of the given `kind` happened at the `session_index` and
   *(kind-specific) time slot. This event is not deposited for duplicate slashes.
   *\[kind, timeslot\].
   */
  Offence: Anonymize<Iempvdlhc5ih6g>
}>
export declare const OffencesEvent: GetEnum<OffencesEvent>
export type Iempvdlhc5ih6g = {
  kind: FixedSizeBinary<16>
  timeslot: Binary
}
export type SessionEvent = Enum<{
  /**
   *New session has happened. Note that the argument is the session index, not the
   *block number as the type might suggest.
   */
  NewSession: Anonymize<I2hq50pu2kdjpo>
}>
export declare const SessionEvent: GetEnum<SessionEvent>
export type GrandpaEvent = Enum<{
  /**
   *New authority set has been applied.
   */
  NewAuthorities: Anonymize<I5768ac424h061>
  /**
   *Current authority set has been paused.
   */
  Paused: undefined
  /**
   *Current authority set has been resumed.
   */
  Resumed: undefined
}>
export declare const GrandpaEvent: GetEnum<GrandpaEvent>
export type I5768ac424h061 = {
  authority_set: Anonymize<I3geksg000c171>
}
export type I3geksg000c171 = Array<[FixedSizeBinary<32>, bigint]>
export type Iceo3qo846468b = AnonymousEnum<{
  /**
   *We have ended a spend period and will now allocate funds.
   */
  Spending: Anonymize<I8iksqi3eani0a>
  /**
   *Some funds have been allocated.
   */
  Awarded: Anonymize<I16enopmju1p0q>
  /**
   *Some of our funds have been burnt.
   */
  Burnt: Anonymize<I43kq8qudg7pq9>
  /**
   *Spending has finished; this is the amount that rolls over until next spend.
   */
  Rollover: Anonymize<I76riseemre533>
  /**
   *Some funds have been deposited.
   */
  Deposit: Anonymize<Ie5v6njpckr05b>
  /**
   *A new spend proposal has been approved.
   */
  SpendApproved: Anonymize<I38bmcrmh852rk>
  /**
   *The inactive funds of the pallet have been updated.
   */
  UpdatedInactive: Anonymize<I4hcillge8de5f>
  /**
   *A new asset spend proposal has been approved.
   */
  AssetSpendApproved: Anonymize<If52u7u3r3ve0n>
  /**
   *An approved spend was voided.
   */
  AssetSpendVoided: Anonymize<I666bl2fqjkejo>
  /**
   *A payment happened.
   */
  Paid: Anonymize<Iek7v4hrgnq6iv>
  /**
   *A payment failed and can be retried.
   */
  PaymentFailed: Anonymize<Iek7v4hrgnq6iv>
  /**
   *A spend was processed and removed from the storage. It might have been successfully
   *paid or it may have expired.
   */
  SpendProcessed: Anonymize<I666bl2fqjkejo>
}>
export type I8iksqi3eani0a = {
  budget_remaining: bigint
}
export type I16enopmju1p0q = {
  proposal_index: number
  award: bigint
  account: SS58String
}
export type I43kq8qudg7pq9 = {
  burnt_funds: bigint
}
export type I76riseemre533 = {
  rollover_balance: bigint
}
export type Ie5v6njpckr05b = {
  value: bigint
}
export type I38bmcrmh852rk = {
  proposal_index: number
  amount: bigint
  beneficiary: SS58String
}
export type I4hcillge8de5f = {
  reactivated: bigint
  deactivated: bigint
}
export type If52u7u3r3ve0n = {
  index: number
  asset_kind: VersionedLocatableAsset
  amount: bigint
  beneficiary: PaseoXcmVersionedLocation
  valid_from: number
  expire_at: number
}
export type VersionedLocatableAsset = Enum<{
  V3: {
    location: Anonymize<I4c0s5cioidn76>
    asset_id: XcmV3MultiassetAssetId
  }
  V4: {
    location: Anonymize<I4c0s5cioidn76>
    asset_id: Anonymize<I4c0s5cioidn76>
  }
}>
export declare const VersionedLocatableAsset: GetEnum<VersionedLocatableAsset>
export type I4c0s5cioidn76 = {
  parents: number
  interior: XcmV3Junctions
}
export type XcmV3Junctions = Enum<{
  Here: undefined
  X1: XcmV3Junction
  X2: FixedSizeArray<2, XcmV3Junction>
  X3: FixedSizeArray<3, XcmV3Junction>
  X4: FixedSizeArray<4, XcmV3Junction>
  X5: FixedSizeArray<5, XcmV3Junction>
  X6: FixedSizeArray<6, XcmV3Junction>
  X7: FixedSizeArray<7, XcmV3Junction>
  X8: FixedSizeArray<8, XcmV3Junction>
}>
export declare const XcmV3Junctions: GetEnum<XcmV3Junctions>
export type XcmV3Junction = Enum<{
  Parachain: number
  AccountId32: {
    network?: Anonymize<Idcq3vns9tgp5p>
    id: FixedSizeBinary<32>
  }
  AccountIndex64: {
    network?: Anonymize<Idcq3vns9tgp5p>
    index: bigint
  }
  AccountKey20: {
    network?: Anonymize<Idcq3vns9tgp5p>
    key: FixedSizeBinary<20>
  }
  PalletInstance: number
  GeneralIndex: bigint
  GeneralKey: Anonymize<I15lht6t53odo4>
  OnlyChild: undefined
  Plurality: Anonymize<I518fbtnclg1oc>
  GlobalConsensus: XcmV3JunctionNetworkId
}>
export declare const XcmV3Junction: GetEnum<XcmV3Junction>
export type Idcq3vns9tgp5p = XcmV3JunctionNetworkId | undefined
export type XcmV3JunctionNetworkId = Enum<{
  ByGenesis: FixedSizeBinary<32>
  ByFork: Anonymize<I15vf5oinmcgps>
  Polkadot: undefined
  Kusama: undefined
  Westend: undefined
  Rococo: undefined
  Wococo: undefined
  Ethereum: Anonymize<I623eo8t3jrbeo>
  BitcoinCore: undefined
  BitcoinCash: undefined
  PolkadotBulletin: undefined
}>
export declare const XcmV3JunctionNetworkId: GetEnum<XcmV3JunctionNetworkId>
export type I15vf5oinmcgps = {
  block_number: bigint
  block_hash: FixedSizeBinary<32>
}
export type I623eo8t3jrbeo = {
  chain_id: bigint
}
export type I15lht6t53odo4 = {
  length: number
  data: FixedSizeBinary<32>
}
export type I518fbtnclg1oc = {
  id: XcmV3JunctionBodyId
  part: XcmV2JunctionBodyPart
}
export type XcmV3JunctionBodyId = Enum<{
  Unit: undefined
  Moniker: FixedSizeBinary<4>
  Index: number
  Executive: undefined
  Technical: undefined
  Legislative: undefined
  Judicial: undefined
  Defense: undefined
  Administration: undefined
  Treasury: undefined
}>
export declare const XcmV3JunctionBodyId: GetEnum<XcmV3JunctionBodyId>
export type XcmV2JunctionBodyPart = Enum<{
  Voice: undefined
  Members: Anonymize<Iafscmv8tjf0ou>
  Fraction: {
    nom: number
    denom: number
  }
  AtLeastProportion: {
    nom: number
    denom: number
  }
  MoreThanProportion: {
    nom: number
    denom: number
  }
}>
export declare const XcmV2JunctionBodyPart: GetEnum<XcmV2JunctionBodyPart>
export type Iafscmv8tjf0ou = {
  count: number
}
export type XcmV3MultiassetAssetId = Enum<{
  Concrete: Anonymize<I4c0s5cioidn76>
  Abstract: FixedSizeBinary<32>
}>
export declare const XcmV3MultiassetAssetId: GetEnum<XcmV3MultiassetAssetId>
export type PaseoXcmVersionedLocation = Enum<{
  V2: Anonymize<I4frqunb5hj2km>
  V3: Anonymize<I4c0s5cioidn76>
  V4: Anonymize<I4c0s5cioidn76>
}>
export declare const PaseoXcmVersionedLocation: GetEnum<PaseoXcmVersionedLocation>
export type I4frqunb5hj2km = {
  parents: number
  interior: XcmV2MultilocationJunctions
}
export type XcmV2MultilocationJunctions = Enum<{
  Here: undefined
  X1: XcmV2Junction
  X2: FixedSizeArray<2, XcmV2Junction>
  X3: FixedSizeArray<3, XcmV2Junction>
  X4: FixedSizeArray<4, XcmV2Junction>
  X5: FixedSizeArray<5, XcmV2Junction>
  X6: FixedSizeArray<6, XcmV2Junction>
  X7: FixedSizeArray<7, XcmV2Junction>
  X8: FixedSizeArray<8, XcmV2Junction>
}>
export declare const XcmV2MultilocationJunctions: GetEnum<XcmV2MultilocationJunctions>
export type XcmV2Junction = Enum<{
  Parachain: number
  AccountId32: {
    network: XcmV2NetworkId
    id: FixedSizeBinary<32>
  }
  AccountIndex64: {
    network: XcmV2NetworkId
    index: bigint
  }
  AccountKey20: {
    network: XcmV2NetworkId
    key: FixedSizeBinary<20>
  }
  PalletInstance: number
  GeneralIndex: bigint
  GeneralKey: Binary
  OnlyChild: undefined
  Plurality: {
    id: XcmV2BodyId
    part: XcmV2JunctionBodyPart
  }
}>
export declare const XcmV2Junction: GetEnum<XcmV2Junction>
export type XcmV2NetworkId = Enum<{
  Any: undefined
  Named: Binary
  Polkadot: undefined
  Kusama: undefined
}>
export declare const XcmV2NetworkId: GetEnum<XcmV2NetworkId>
export type XcmV2BodyId = Enum<{
  Unit: undefined
  Named: Binary
  Index: number
  Executive: undefined
  Technical: undefined
  Legislative: undefined
  Judicial: undefined
  Defense: undefined
  Administration: undefined
  Treasury: undefined
}>
export declare const XcmV2BodyId: GetEnum<XcmV2BodyId>
export type Iek7v4hrgnq6iv = {
  index: number
  payment_id: bigint
}
export type Itdqso6dq8jq1 = AnonymousEnum<{
  /**
   *An account has delegated their vote to another account. \[who, target\]
   */
  Delegated: Anonymize<I2na29tt2afp0j>
  /**
   *An \[account\] has cancelled a previous delegation operation.
   */
  Undelegated: SS58String
  /**
   *An account that has voted
   */
  Voted: Anonymize<I9qfchhljqsjjl>
  /**
   *A vote that been removed
   */
  VoteRemoved: Anonymize<I9qfchhljqsjjl>
}>
export type I2na29tt2afp0j = FixedSizeArray<2, SS58String>
export type I9qfchhljqsjjl = {
  who: SS58String
  vote: ConvictionVotingVoteAccountVote
}
export type ConvictionVotingVoteAccountVote = Enum<{
  Standard: {
    vote: number
    balance: bigint
  }
  Split: {
    aye: bigint
    nay: bigint
  }
  SplitAbstain: {
    aye: bigint
    nay: bigint
    abstain: bigint
  }
}>
export declare const ConvictionVotingVoteAccountVote: GetEnum<ConvictionVotingVoteAccountVote>
export type Idfraa3b4eu018 = AnonymousEnum<{
  /**
   *A referendum has been submitted.
   */
  Submitted: Anonymize<I229ijht536qdu>
  /**
   *The decision deposit has been placed.
   */
  DecisionDepositPlaced: Anonymize<I62nte77gksm0f>
  /**
   *The decision deposit has been refunded.
   */
  DecisionDepositRefunded: Anonymize<I62nte77gksm0f>
  /**
   *A deposit has been slashed.
   */
  DepositSlashed: Anonymize<Id5fm4p8lj5qgi>
  /**
   *A referendum has moved into the deciding phase.
   */
  DecisionStarted: Anonymize<I9cg2delv92pvq>
  ConfirmStarted: Anonymize<I666bl2fqjkejo>
  ConfirmAborted: Anonymize<I666bl2fqjkejo>
  /**
   *A referendum has ended its confirmation phase and is ready for approval.
   */
  Confirmed: Anonymize<Ilhp45uime5tp>
  /**
   *A referendum has been approved and its proposal has been scheduled.
   */
  Approved: Anonymize<I666bl2fqjkejo>
  /**
   *A proposal has been rejected by referendum.
   */
  Rejected: Anonymize<Ilhp45uime5tp>
  /**
   *A referendum has been timed out without being decided.
   */
  TimedOut: Anonymize<Ilhp45uime5tp>
  /**
   *A referendum has been cancelled.
   */
  Cancelled: Anonymize<Ilhp45uime5tp>
  /**
   *A referendum has been killed.
   */
  Killed: Anonymize<Ilhp45uime5tp>
  /**
   *The submission deposit has been refunded.
   */
  SubmissionDepositRefunded: Anonymize<I62nte77gksm0f>
  /**
   *Metadata for a referendum has been set.
   */
  MetadataSet: Anonymize<I4f1hv034jf1dt>
  /**
   *Metadata for a referendum has been cleared.
   */
  MetadataCleared: Anonymize<I4f1hv034jf1dt>
}>
export type I229ijht536qdu = {
  /**
   *Index of the referendum.
   */
  index: number
  /**
   *The track (and by extension proposal dispatch origin) of this referendum.
   */
  track: number
  /**
   *The proposal for the referendum.
   */
  proposal: PreimagesBounded
}
export type PreimagesBounded = Enum<{
  Legacy: Anonymize<I1jm8m1rh9e20v>
  Inline: Binary
  Lookup: {
    hash: FixedSizeBinary<32>
    len: number
  }
}>
export declare const PreimagesBounded: GetEnum<PreimagesBounded>
export type I62nte77gksm0f = {
  /**
   *Index of the referendum.
   */
  index: number
  /**
   *The account who placed the deposit.
   */
  who: SS58String
  /**
   *The amount placed by the account.
   */
  amount: bigint
}
export type I9cg2delv92pvq = {
  /**
   *Index of the referendum.
   */
  index: number
  /**
   *The track (and by extension proposal dispatch origin) of this referendum.
   */
  track: number
  /**
   *The proposal for the referendum.
   */
  proposal: PreimagesBounded
  /**
   *The current tally of votes in this referendum.
   */
  tally: Anonymize<Ifsk7cbmtit1jd>
}
export type Ifsk7cbmtit1jd = {
  ayes: bigint
  nays: bigint
  support: bigint
}
export type Ilhp45uime5tp = {
  /**
   *Index of the referendum.
   */
  index: number
  /**
   *The final tally of votes in this referendum.
   */
  tally: Anonymize<Ifsk7cbmtit1jd>
}
export type I4f1hv034jf1dt = {
  /**
   *Index of the referendum.
   */
  index: number
  /**
   *Preimage hash.
   */
  hash: FixedSizeBinary<32>
}
export type I63jaf0cm93ti5 = AnonymousEnum<{
  CallWhitelisted: Anonymize<I1adbcfi5uc62r>
  WhitelistedCallRemoved: Anonymize<I1adbcfi5uc62r>
  WhitelistedCallDispatched: Anonymize<I1nrkfcn3ckah6>
}>
export type I1adbcfi5uc62r = {
  call_hash: FixedSizeBinary<32>
}
export type I1nrkfcn3ckah6 = {
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I6ngqh4u0vq3tq>
}
export type I6ngqh4u0vq3tq = ResultPayload<
  Anonymize<Ia1u1r3n74r13c>,
  {
    post_info: Anonymize<Ia1u1r3n74r13c>
    error: Anonymize<I995flrivt70on>
  }
>
export type Ia1u1r3n74r13c = {
  actual_weight?: Anonymize<Iasb8k6ash5mjn>
  pays_fee: Anonymize<Iehg04bj71rkd>
}
export type Iasb8k6ash5mjn = Anonymize<I4q39t5hn830vp> | undefined
export type In3t00aurfuda = AnonymousEnum<{
  /**
   *A Parameter was set.
   *
   *Is also emitted when the value was not changed.
   */
  Updated: Anonymize<I9f0v9ntn9g19p>
}>
export type I9f0v9ntn9g19p = {
  /**
   *The key that was updated.
   */
  key: Anonymize<I9h43amtitrqum>
  /**
   *The old value before this call.
   */
  old_value?: Anonymize<I22o1tjs56dvi2> | undefined
  /**
   *The new value after this call.
   */
  new_value?: Anonymize<I22o1tjs56dvi2> | undefined
}
export type I9h43amtitrqum = AnonymousEnum<{
  Inflation: Enum<{
    MinInflation: undefined
    MaxInflation: undefined
    IdealStake: undefined
    Falloff: undefined
    UseAuctionSlots: undefined
  }>
}>
export type I22o1tjs56dvi2 = AnonymousEnum<{
  Inflation: Enum<{
    MinInflation: bigint
    MaxInflation: bigint
    IdealStake: bigint
    Falloff: bigint
    UseAuctionSlots: boolean
  }>
}>
export type CommonClaimsEvent = Enum<{
  /**
   *Someone claimed some DOTs.
   */
  Claimed: Anonymize<Ie3hcrrq6r18fs>
}>
export declare const CommonClaimsEvent: GetEnum<CommonClaimsEvent>
export type Ie3hcrrq6r18fs = {
  who: SS58String
  ethereum_address: FixedSizeBinary<20>
  amount: bigint
}
export type VestingEvent = Enum<{
  /**
   *The amount vested has been updated. This could indicate a change in funds available.
   *The balance given is the amount which is left unvested (and thus locked).
   */
  VestingUpdated: Anonymize<Ievr89968437gm>
  /**
   *An \[account\] has become fully vested.
   */
  VestingCompleted: Anonymize<Icbccs0ug47ilf>
}>
export declare const VestingEvent: GetEnum<VestingEvent>
export type Ievr89968437gm = {
  account: SS58String
  unvested: bigint
}
export type I7lrl32mdblrmo = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<I11ol29h30it9d>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<I4ia3ug7fptrem>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<Ie7fast1ejp9q2>
}>
export type I11ol29h30it9d = {
  index: number
  error: Anonymize<I995flrivt70on>
}
export type I4ia3ug7fptrem = {
  error: Anonymize<I995flrivt70on>
}
export type Ie7fast1ejp9q2 = {
  result: Anonymize<I69hcjbv3dno0j>
}
export type I5b00gr573u14r = AnonymousEnum<{
  /**
   *A proxy was executed correctly, with the given.
   */
  ProxyExecuted: Anonymize<Ie7fast1ejp9q2>
  /**
   *A pure account has been created by new proxy with given
   *disambiguation index and proxy type.
   */
  PureCreated: Anonymize<Iamng908a7suk4>
  /**
   *An announcement was placed to make a call in the future.
   */
  Announced: Anonymize<I2ur0oeqg495j8>
  /**
   *A proxy was added.
   */
  ProxyAdded: Anonymize<Iejcjkg8bsr2ik>
  /**
   *A proxy was removed.
   */
  ProxyRemoved: Anonymize<Iejcjkg8bsr2ik>
}>
export type Iamng908a7suk4 = {
  pure: SS58String
  who: SS58String
  proxy_type: Anonymize<I7adrgaqb51jb9>
  disambiguation_index: number
}
export type I7adrgaqb51jb9 = AnonymousEnum<{
  Any: undefined
  NonTransfer: undefined
  Governance: undefined
  Staking: undefined
  CancelProxy: undefined
  Auction: undefined
  NominationPools: undefined
  ParaRegistration: undefined
}>
export type I2ur0oeqg495j8 = {
  real: SS58String
  proxy: SS58String
  call_hash: FixedSizeBinary<32>
}
export type Iejcjkg8bsr2ik = {
  delegator: SS58String
  delegatee: SS58String
  proxy_type: Anonymize<I7adrgaqb51jb9>
  delay: number
}
export type I6d3qfl959ikkv = AnonymousEnum<{
  /**
   *A new multisig operation has begun.
   */
  NewMultisig: Anonymize<Iep27ialq4a7o7>
  /**
   *A multisig operation has been approved by someone.
   */
  MultisigApproval: Anonymize<Iasu5jvoqr43mv>
  /**
   *A multisig operation has been executed.
   */
  MultisigExecuted: Anonymize<Ie2kqu9tmo6isc>
  /**
   *A multisig operation has been cancelled.
   */
  MultisigCancelled: Anonymize<I5qolde99acmd1>
}>
export type Iep27ialq4a7o7 = {
  approving: SS58String
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
}
export type Iasu5jvoqr43mv = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
}
export type Itvprrpb0nm3o = {
  height: number
  index: number
}
export type Ie2kqu9tmo6isc = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I69hcjbv3dno0j>
}
export type I5qolde99acmd1 = {
  cancelling: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
}
export type BountiesEvent = Enum<{
  /**
   *New bounty proposal.
   */
  BountyProposed: Anonymize<I666bl2fqjkejo>
  /**
   *A bounty proposal was rejected; funds were slashed.
   */
  BountyRejected: Anonymize<Id9idaj83175f9>
  /**
   *A bounty proposal is funded and became active.
   */
  BountyBecameActive: Anonymize<I666bl2fqjkejo>
  /**
   *A bounty is awarded to a beneficiary.
   */
  BountyAwarded: Anonymize<Ie1semicfuv5uu>
  /**
   *A bounty is claimed by beneficiary.
   */
  BountyClaimed: Anonymize<If25fjs9o37co1>
  /**
   *A bounty is cancelled.
   */
  BountyCanceled: Anonymize<I666bl2fqjkejo>
  /**
   *A bounty expiry is extended.
   */
  BountyExtended: Anonymize<I666bl2fqjkejo>
  /**
   *A bounty is approved.
   */
  BountyApproved: Anonymize<I666bl2fqjkejo>
  /**
   *A bounty curator is proposed.
   */
  CuratorProposed: Anonymize<I70sc1pdo8vtos>
  /**
   *A bounty curator is unassigned.
   */
  CuratorUnassigned: Anonymize<Ia9p5bg6p18r0i>
  /**
   *A bounty curator is accepted.
   */
  CuratorAccepted: Anonymize<I70sc1pdo8vtos>
}>
export declare const BountiesEvent: GetEnum<BountiesEvent>
export type Id9idaj83175f9 = {
  index: number
  bond: bigint
}
export type Ie1semicfuv5uu = {
  index: number
  beneficiary: SS58String
}
export type If25fjs9o37co1 = {
  index: number
  payout: bigint
  beneficiary: SS58String
}
export type I70sc1pdo8vtos = {
  bounty_id: number
  curator: SS58String
}
export type Ia9p5bg6p18r0i = {
  bounty_id: number
}
export type ChildBountiesEvent = Enum<{
  /**
   *A child-bounty is added.
   */
  Added: Anonymize<I60p8l86a8cm59>
  /**
   *A child-bounty is awarded to a beneficiary.
   */
  Awarded: Anonymize<I3m3sk2lgcabvp>
  /**
   *A child-bounty is claimed by beneficiary.
   */
  Claimed: Anonymize<I5pf572duh4oeg>
  /**
   *A child-bounty is cancelled.
   */
  Canceled: Anonymize<I60p8l86a8cm59>
}>
export declare const ChildBountiesEvent: GetEnum<ChildBountiesEvent>
export type I60p8l86a8cm59 = {
  index: number
  child_index: number
}
export type I3m3sk2lgcabvp = {
  index: number
  child_index: number
  beneficiary: SS58String
}
export type I5pf572duh4oeg = {
  index: number
  child_index: number
  payout: bigint
  beneficiary: SS58String
}
export type ElectionProviderMultiPhaseEvent = Enum<{
  /**
   *A solution was stored with the given compute.
   *
   *The `origin` indicates the origin of the solution. If `origin` is `Some(AccountId)`,
   *the stored solution was submitted in the signed phase by a miner with the `AccountId`.
   *Otherwise, the solution was stored either during the unsigned phase or by
   *`T::ForceOrigin`. The `bool` is `true` when a previous solution was ejected to make
   *room for this one.
   */
  SolutionStored: Anonymize<I4mol6k10mv0io>
  /**
   *The election has been finalized, with the given computation and score.
   */
  ElectionFinalized: Anonymize<Iec90vukseit9e>
  /**
   *An election failed.
   *
   *Not much can be said about which computes failed in the process.
   */
  ElectionFailed: undefined
  /**
   *An account has been rewarded for their signed submission being finalized.
   */
  Rewarded: Anonymize<I7j4m7a3pkvsf4>
  /**
   *An account has been slashed for submitting an invalid signed submission.
   */
  Slashed: Anonymize<I7j4m7a3pkvsf4>
  /**
   *There was a phase transition in a given round.
   */
  PhaseTransitioned: Anonymize<Ic2n50kpnu5mae>
}>
export declare const ElectionProviderMultiPhaseEvent: GetEnum<ElectionProviderMultiPhaseEvent>
export type I4mol6k10mv0io = {
  compute: ElectionProviderMultiPhaseElectionCompute
  origin?: Anonymize<Ihfphjolmsqq1>
  prev_ejected: boolean
}
export type ElectionProviderMultiPhaseElectionCompute = Enum<{
  OnChain: undefined
  Signed: undefined
  Unsigned: undefined
  Fallback: undefined
  Emergency: undefined
}>
export declare const ElectionProviderMultiPhaseElectionCompute: GetEnum<ElectionProviderMultiPhaseElectionCompute>
export type Ihfphjolmsqq1 = SS58String | undefined
export type Iec90vukseit9e = {
  compute: ElectionProviderMultiPhaseElectionCompute
  score: Anonymize<I8s6n43okuj2b1>
}
export type I8s6n43okuj2b1 = {
  minimal_stake: bigint
  sum_stake: bigint
  sum_stake_squared: bigint
}
export type I7j4m7a3pkvsf4 = {
  account: SS58String
  value: bigint
}
export type Ic2n50kpnu5mae = {
  from: ElectionProviderMultiPhasePhase
  to: ElectionProviderMultiPhasePhase
  round: number
}
export type ElectionProviderMultiPhasePhase = Enum<{
  Off: undefined
  Signed: undefined
  Unsigned: [boolean, number]
  Emergency: undefined
}>
export declare const ElectionProviderMultiPhasePhase: GetEnum<ElectionProviderMultiPhasePhase>
export type BagsListEvent = Enum<{
  /**
   *Moved an account from one bag to another.
   */
  Rebagged: Anonymize<I37454vatvmm1l>
  /**
   *Updated the score of some account to the given amount.
   */
  ScoreUpdated: Anonymize<Iblau1qa7u7fet>
}>
export declare const BagsListEvent: GetEnum<BagsListEvent>
export type I37454vatvmm1l = {
  who: SS58String
  from: bigint
  to: bigint
}
export type Iblau1qa7u7fet = {
  who: SS58String
  new_score: bigint
}
export type I1mroqu3ca6qo2 = AnonymousEnum<{
  /**
   *A pool has been created.
   */
  Created: Anonymize<I1ti389kf8t6oi>
  /**
   *A member has became bonded in a pool.
   */
  Bonded: Anonymize<If4nnre373amul>
  /**
   *A payout has been made to a member.
   */
  PaidOut: Anonymize<I55kbor0ocqk6h>
  /**
   *A member has unbonded from their pool.
   *
   *- `balance` is the corresponding balance of the number of points that has been
   *  requested to be unbonded (the argument of the `unbond` transaction) from the bonded
   *  pool.
   *- `points` is the number of points that are issued as a result of `balance` being
   *dissolved into the corresponding unbonding pool.
   *- `era` is the era in which the balance will be unbonded.
   *In the absence of slashing, these values will match. In the presence of slashing, the
   *number of points that are issued in the unbonding pool will be less than the amount
   *requested to be unbonded.
   */
  Unbonded: Anonymize<Idsj9cg7j96kpc>
  /**
   *A member has withdrawn from their pool.
   *
   *The given number of `points` have been dissolved in return of `balance`.
   *
   *Similar to `Unbonded` event, in the absence of slashing, the ratio of point to balance
   *will be 1.
   */
  Withdrawn: Anonymize<Ido4u9drncfaml>
  /**
   *A pool has been destroyed.
   */
  Destroyed: Anonymize<I931cottvong90>
  /**
   *The state of a pool has changed
   */
  StateChanged: Anonymize<Ie8c7ctks8ur2p>
  /**
   *A member has been removed from a pool.
   *
   *The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
   *Any funds that are still delegated (i.e. dangling delegation) are released and are
   *represented by `released_balance`.
   */
  MemberRemoved: Anonymize<I6c6fpqmnqijqd>
  /**
   *The roles of a pool have been updated to the given new roles. Note that the depositor
   *can never change.
   */
  RolesUpdated: Anonymize<I6mik29s5073td>
  /**
   *The active balance of pool `pool_id` has been slashed to `balance`.
   */
  PoolSlashed: Anonymize<I2m0sqmb75cnpb>
  /**
   *The unbond pool at `era` of pool `pool_id` has been slashed to `balance`.
   */
  UnbondingPoolSlashed: Anonymize<I49agc5b62mehu>
  /**
   *A pool's commission setting has been changed.
   */
  PoolCommissionUpdated: Anonymize<Iatq9jda4hq6pg>
  /**
   *A pool's maximum commission setting has been changed.
   */
  PoolMaxCommissionUpdated: Anonymize<I8cbluptqo8kbp>
  /**
   *A pool's commission `change_rate` has been changed.
   */
  PoolCommissionChangeRateUpdated: Anonymize<I81cc4plffa1dm>
  /**
   *Pool commission claim permission has been updated.
   */
  PoolCommissionClaimPermissionUpdated: Anonymize<I3ihan8icf0c5k>
  /**
   *Pool commission has been claimed.
   */
  PoolCommissionClaimed: Anonymize<I2g87evcjlgmqi>
  /**
   *Topped up deficit in frozen ED of the reward pool.
   */
  MinBalanceDeficitAdjusted: Anonymize<Ieg1oc56mamrl5>
  /**
   *Claimed excess frozen ED of af the reward pool.
   */
  MinBalanceExcessAdjusted: Anonymize<Ieg1oc56mamrl5>
}>
export type I1ti389kf8t6oi = {
  depositor: SS58String
  pool_id: number
}
export type If4nnre373amul = {
  member: SS58String
  pool_id: number
  bonded: bigint
  joined: boolean
}
export type I55kbor0ocqk6h = {
  member: SS58String
  pool_id: number
  payout: bigint
}
export type Idsj9cg7j96kpc = {
  member: SS58String
  pool_id: number
  balance: bigint
  points: bigint
  era: number
}
export type Ido4u9drncfaml = {
  member: SS58String
  pool_id: number
  balance: bigint
  points: bigint
}
export type I931cottvong90 = {
  pool_id: number
}
export type Ie8c7ctks8ur2p = {
  pool_id: number
  new_state: NominationPoolsPoolState
}
export type NominationPoolsPoolState = Enum<{
  Open: undefined
  Blocked: undefined
  Destroying: undefined
}>
export declare const NominationPoolsPoolState: GetEnum<NominationPoolsPoolState>
export type I6c6fpqmnqijqd = {
  pool_id: number
  member: SS58String
  released_balance: bigint
}
export type I6mik29s5073td = {
  root?: Anonymize<Ihfphjolmsqq1>
  bouncer?: Anonymize<Ihfphjolmsqq1>
  nominator?: Anonymize<Ihfphjolmsqq1>
}
export type I2m0sqmb75cnpb = {
  pool_id: number
  balance: bigint
}
export type I49agc5b62mehu = {
  pool_id: number
  era: number
  balance: bigint
}
export type Iatq9jda4hq6pg = {
  pool_id: number
  current?: Anonymize<Ie8iutm7u02lmj>
}
export type Ie8iutm7u02lmj = Anonymize<I7svnfko10tq2e> | undefined
export type I7svnfko10tq2e = [number, SS58String]
export type I8cbluptqo8kbp = {
  pool_id: number
  max_commission: number
}
export type I81cc4plffa1dm = {
  pool_id: number
  change_rate: Anonymize<Ibqul338t9c1ll>
}
export type Ibqul338t9c1ll = {
  max_increase: number
  min_delay: number
}
export type I3ihan8icf0c5k = {
  pool_id: number
  permission?: Anonymize<I16m1kn78dee7v>
}
export type I16m1kn78dee7v = NominationPoolsCommissionClaimPermission | undefined
export type NominationPoolsCommissionClaimPermission = Enum<{
  Permissionless: undefined
  Account: SS58String
}>
export declare const NominationPoolsCommissionClaimPermission: GetEnum<NominationPoolsCommissionClaimPermission>
export type I2g87evcjlgmqi = {
  pool_id: number
  commission: bigint
}
export type Ieg1oc56mamrl5 = {
  pool_id: number
  amount: bigint
}
export type Ia06jdijgcs3un = AnonymousEnum<{
  /**
   *A staker was unstaked.
   */
  Unstaked: Anonymize<I2huiijt4fog3v>
  /**
   *A staker was slashed for requesting fast-unstake whilst being exposed.
   */
  Slashed: Anonymize<Ifk8eme5o7mukf>
  /**
   *A batch was partially checked for the given eras, but the process did not finish.
   */
  BatchChecked: Anonymize<Ic0he9tlf9ll0u>
  /**
   *A batch of a given size was terminated.
   *
   *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
   *of the batch. A new batch will be created upon next block.
   */
  BatchFinished: Anonymize<I54umskavgc9du>
  /**
   *An internal error happened. Operations will be paused now.
   */
  InternalError: undefined
}>
export type I2huiijt4fog3v = {
  stash: SS58String
  result: Anonymize<I69hcjbv3dno0j>
}
export type Ic0he9tlf9ll0u = {
  eras: Anonymize<Icgljjb6j82uhn>
}
export type Icgljjb6j82uhn = Array<number>
export type I1nq1se98idofq = AnonymousEnum<{
  /**
   *Funds delegated by a delegator.
   */
  Delegated: Anonymize<Id2aanom2jncf1>
  /**
   *Funds released to a delegator.
   */
  Released: Anonymize<Id2aanom2jncf1>
  /**
   *Funds slashed from a delegator.
   */
  Slashed: Anonymize<Id2aanom2jncf1>
  /**
   *Unclaimed delegation funds migrated to delegator.
   */
  MigratedDelegation: Anonymize<Id2aanom2jncf1>
}>
export type Id2aanom2jncf1 = {
  agent: SS58String
  delegator: SS58String
  amount: bigint
}
export type ParachainsInclusionEvent = Enum<{
  /**
   *A candidate was backed. `[candidate, head_data]`
   */
  CandidateBacked: Anonymize<Icdu1nb48l753j>
  /**
   *A candidate was included. `[candidate, head_data]`
   */
  CandidateIncluded: Anonymize<Icdu1nb48l753j>
  /**
   *A candidate timed out. `[candidate, head_data]`
   */
  CandidateTimedOut: Anonymize<I618m2uag0aopg>
  /**
   *Some upward messages have been received and will be processed.
   */
  UpwardMessagesReceived: Anonymize<Ic8i89mfkmn3n7>
}>
export declare const ParachainsInclusionEvent: GetEnum<ParachainsInclusionEvent>
export type Icdu1nb48l753j = [Anonymize<I9o5v7cmfi9c85>, Binary, number, number]
export type I9o5v7cmfi9c85 = {
  descriptor: Anonymize<Ic7r865c0luc3k>
  commitments_hash: FixedSizeBinary<32>
}
export type Ic7r865c0luc3k = {
  para_id: number
  relay_parent: FixedSizeBinary<32>
  collator: FixedSizeBinary<32>
  persisted_validation_data_hash: FixedSizeBinary<32>
  pov_hash: FixedSizeBinary<32>
  erasure_root: FixedSizeBinary<32>
  signature: FixedSizeBinary<64>
  para_head: FixedSizeBinary<32>
  validation_code_hash: FixedSizeBinary<32>
}
export type I618m2uag0aopg = [Anonymize<I9o5v7cmfi9c85>, Binary, number]
export type Ic8i89mfkmn3n7 = {
  from: number
  count: number
}
export type ParachainsParasEvent = Enum<{
  /**
   *Current code has been updated for a Para. `para_id`
   */
  CurrentCodeUpdated: number
  /**
   *Current head has been updated for a Para. `para_id`
   */
  CurrentHeadUpdated: number
  /**
   *A code upgrade has been scheduled for a Para. `para_id`
   */
  CodeUpgradeScheduled: number
  /**
   *A new head has been noted for a Para. `para_id`
   */
  NewHeadNoted: number
  /**
   *A para has been queued to execute pending actions. `para_id`
   */
  ActionQueued: Anonymize<I9jd27rnpm8ttv>
  /**
   *The given para either initiated or subscribed to a PVF check for the given validation
   *code. `code_hash` `para_id`
   */
  PvfCheckStarted: Anonymize<I4pact7n2e9a0i>
  /**
   *The given validation code was accepted by the PVF pre-checking vote.
   *`code_hash` `para_id`
   */
  PvfCheckAccepted: Anonymize<I4pact7n2e9a0i>
  /**
   *The given validation code was rejected by the PVF pre-checking vote.
   *`code_hash` `para_id`
   */
  PvfCheckRejected: Anonymize<I4pact7n2e9a0i>
}>
export declare const ParachainsParasEvent: GetEnum<ParachainsParasEvent>
export type I4pact7n2e9a0i = [FixedSizeBinary<32>, number]
export type ParachainsHrmpEvent = Enum<{
  /**
   *Open HRMP channel requested.
   */
  OpenChannelRequested: Anonymize<Id2bej717ckub0>
  /**
   *An HRMP channel request sent by the receiver was canceled by either party.
   */
  OpenChannelCanceled: Anonymize<I545vo2e86o5i4>
  /**
   *Open HRMP channel accepted.
   */
  OpenChannelAccepted: Anonymize<I50mrcbubp554e>
  /**
   *HRMP channel closed.
   */
  ChannelClosed: Anonymize<I545vo2e86o5i4>
  /**
   *An HRMP channel was opened via Root origin.
   */
  HrmpChannelForceOpened: Anonymize<Id2bej717ckub0>
  /**
   *An HRMP channel was opened with a system chain.
   */
  HrmpSystemChannelOpened: Anonymize<Id2bej717ckub0>
  /**
   *An HRMP channel's deposits were updated.
   */
  OpenChannelDepositsUpdated: Anonymize<I50mrcbubp554e>
}>
export declare const ParachainsHrmpEvent: GetEnum<ParachainsHrmpEvent>
export type Id2bej717ckub0 = {
  sender: number
  recipient: number
  proposed_max_capacity: number
  proposed_max_message_size: number
}
export type I545vo2e86o5i4 = {
  by_parachain: number
  channel_id: Anonymize<I50mrcbubp554e>
}
export type I50mrcbubp554e = {
  sender: number
  recipient: number
}
export type ParachainsDisputesEvent = Enum<{
  /**
   *A dispute has been initiated. \[candidate hash, dispute location\]
   */
  DisputeInitiated: Anonymize<I3i09nus3ku37s>
  /**
   *A dispute has concluded for or against a candidate.
   *`\[para id, candidate hash, dispute result\]`
   */
  DisputeConcluded: Anonymize<I2e447aa6a0imh>
  /**
   *A dispute has concluded with supermajority against a candidate.
   *Block authors should no longer build on top of this head and should
   *instead revert the block at the given height. This should be the
   *number of the child of the last known valid block in the chain.
   */
  Revert: number
}>
export declare const ParachainsDisputesEvent: GetEnum<ParachainsDisputesEvent>
export type I3i09nus3ku37s = [FixedSizeBinary<32>, ParachainsDisputeLocation]
export type ParachainsDisputeLocation = Enum<{
  Local: undefined
  Remote: undefined
}>
export declare const ParachainsDisputeLocation: GetEnum<ParachainsDisputeLocation>
export type I2e447aa6a0imh = [FixedSizeBinary<32>, ParachainsDisputeResult]
export type ParachainsDisputeResult = Enum<{
  Valid: undefined
  Invalid: undefined
}>
export declare const ParachainsDisputeResult: GetEnum<ParachainsDisputeResult>
export type Icuu6jjue8o6eb = AnonymousEnum<{
  /**
   *An order was placed at some spot price amount by orderer ordered_by
   */
  OnDemandOrderPlaced: Anonymize<I82n7gg49bvucn>
  /**
   *The value of the spot price has likely changed
   */
  SpotPriceSet: Anonymize<I58qkru548f7dl>
}>
export type I82n7gg49bvucn = {
  para_id: number
  spot_price: bigint
  ordered_by: SS58String
}
export type I58qkru548f7dl = {
  spot_price: bigint
}
export type CommonParasRegistrarEvent = Enum<{
  Registered: Anonymize<Ibs22tt76qp5bi>
  Deregistered: Anonymize<I37r4bdai8o9mp>
  Reserved: Anonymize<Idn2ghub1o4i40>
  Swapped: Anonymize<I48u78djt89dod>
}>
export declare const CommonParasRegistrarEvent: GetEnum<CommonParasRegistrarEvent>
export type Ibs22tt76qp5bi = {
  para_id: number
  manager: SS58String
}
export type I37r4bdai8o9mp = {
  para_id: number
}
export type Idn2ghub1o4i40 = {
  para_id: number
  who: SS58String
}
export type I48u78djt89dod = {
  para_id: number
  other_id: number
}
export type CommonSlotsEvent = Enum<{
  /**
   *A new `[lease_period]` is beginning.
   */
  NewLeasePeriod: Anonymize<Ib85m5kfbepu2t>
  /**
   *A para has won the right to a continuous set of lease periods as a parachain.
   *First balance is any extra amount reserved on top of the para's existing deposit.
   *Second balance is the total amount reserved.
   */
  Leased: Anonymize<Idaml5bdhsfcsl>
}>
export declare const CommonSlotsEvent: GetEnum<CommonSlotsEvent>
export type Ib85m5kfbepu2t = {
  lease_period: number
}
export type Idaml5bdhsfcsl = {
  para_id: number
  leaser: SS58String
  period_begin: number
  period_count: number
  extra_reserved: bigint
  total_amount: bigint
}
export type CommonAuctionsEvent = Enum<{
  /**
   *An auction started. Provides its index and the block number where it will begin to
   *close and the first lease period of the quadruplet that is auctioned.
   */
  AuctionStarted: Anonymize<Ieec0cu336gteb>
  /**
   *An auction ended. All funds become unreserved.
   */
  AuctionClosed: Anonymize<I815d5k4ij85nv>
  /**
   *Funds were reserved for a winning bid. First balance is the extra amount reserved.
   *Second is the total.
   */
  Reserved: Anonymize<Ifi98fgi9o46v7>
  /**
   *Funds were unreserved since bidder is no longer active. `[bidder, amount]`
   */
  Unreserved: Anonymize<Ic0oj9tok33uap>
  /**
   *Someone attempted to lease the same slot twice for a parachain. The amount is held in
   *reserve but no parachain slot has been leased.
   */
  ReserveConfiscated: Anonymize<I3tdutpfjuk32j>
  /**
   *A new bid has been accepted as the current winner.
   */
  BidAccepted: Anonymize<I1esdujrkdacpb>
  /**
   *The winning offset was chosen for an auction. This will map into the `Winning` storage
   *map.
   */
  WinningOffset: Anonymize<I9g1d820jf9m2s>
}>
export declare const CommonAuctionsEvent: GetEnum<CommonAuctionsEvent>
export type Ieec0cu336gteb = {
  auction_index: number
  lease_period: number
  ending: number
}
export type I815d5k4ij85nv = {
  auction_index: number
}
export type Ifi98fgi9o46v7 = {
  bidder: SS58String
  extra_reserved: bigint
  total_amount: bigint
}
export type Ic0oj9tok33uap = {
  bidder: SS58String
  amount: bigint
}
export type I3tdutpfjuk32j = {
  para_id: number
  leaser: SS58String
  amount: bigint
}
export type I1esdujrkdacpb = {
  bidder: SS58String
  para_id: number
  amount: bigint
  first_slot: number
  last_slot: number
}
export type I9g1d820jf9m2s = {
  auction_index: number
  block_number: number
}
export type I367eprhi559e0 = AnonymousEnum<{
  /**
   *Create a new crowdloaning campaign.
   */
  Created: Anonymize<I37r4bdai8o9mp>
  /**
   *Contributed to a crowd sale.
   */
  Contributed: Anonymize<I8ve4g3egaln6a>
  /**
   *Withdrew full balance of a contributor.
   */
  Withdrew: Anonymize<I8ve4g3egaln6a>
  /**
   *The loans in a fund have been partially dissolved, i.e. there are some left
   *over child keys that still need to be killed.
   */
  PartiallyRefunded: Anonymize<I37r4bdai8o9mp>
  /**
   *All loans in a fund have been refunded.
   */
  AllRefunded: Anonymize<I37r4bdai8o9mp>
  /**
   *Fund is dissolved.
   */
  Dissolved: Anonymize<I37r4bdai8o9mp>
  /**
   *The result of trying to submit a new bid to the Slots pallet.
   */
  HandleBidResult: Anonymize<Iev026hooag970>
  /**
   *The configuration to a crowdloan has been edited.
   */
  Edited: Anonymize<I37r4bdai8o9mp>
  /**
   *A memo has been updated.
   */
  MemoUpdated: Anonymize<If4hvqaeoqq5us>
  /**
   *A parachain has been moved to `NewRaise`
   */
  AddedToNewRaise: Anonymize<I37r4bdai8o9mp>
}>
export type I8ve4g3egaln6a = {
  who: SS58String
  fund_index: number
  amount: bigint
}
export type Iev026hooag970 = {
  para_id: number
  result: Anonymize<I69hcjbv3dno0j>
}
export type If4hvqaeoqq5us = {
  who: SS58String
  para_id: number
  memo: Binary
}
export type PolkadotRuntimeParachainsCoretimeEvent = Enum<{
  /**
   *The broker chain has asked for revenue information for a specific block.
   */
  RevenueInfoRequested: Anonymize<Ibtsa3docbr9el>
  /**
   *A core has received a new assignment from the broker chain.
   */
  CoreAssigned: Anonymize<Iaiqv5prlisjkg>
}>
export declare const PolkadotRuntimeParachainsCoretimeEvent: GetEnum<PolkadotRuntimeParachainsCoretimeEvent>
export type Ibtsa3docbr9el = {
  when: number
}
export type Iaiqv5prlisjkg = {
  core: number
}
export type I61dksvl51aujo = AnonymousEnum<{
  /**
   *Given number of `(top, child)` keys were migrated respectively, with the given
   *`compute`.
   */
  Migrated: Anonymize<Iagqcb06kbevb1>
  /**
   *Some account got slashed by the given amount.
   */
  Slashed: Anonymize<Id5fm4p8lj5qgi>
  /**
   *The auto migration task finished.
   */
  AutoMigrationFinished: undefined
  /**
   *Migration got halted due to an error or miss-configuration.
   */
  Halted: Anonymize<Iec8defeh924b6>
}>
export type Iagqcb06kbevb1 = {
  top: number
  child: number
  compute: Enum<{
    Signed: undefined
    Auto: undefined
  }>
}
export type Iec8defeh924b6 = {
  error: Anonymize<I96objte63brjr>
}
export type I5ce1ru810vv9d = AnonymousEnum<{
  /**
   *Execution of an XCM message was attempted.
   */
  Attempted: Anonymize<I2aatv5i0cb96a>
  /**
   *A XCM message was sent.
   */
  Sent: Anonymize<Ib9msr5sr8t3dn>
  /**
   *Query response received which does not match a registered query. This may be because a
   *matching query was never registered, it may be because it is a duplicate response, or
   *because the query timed out.
   */
  UnexpectedResponse: Anonymize<I3le5tr7ugg6l2>
  /**
   *Query response has been received and is ready for taking with `take_response`. There is
   *no registered notification call.
   */
  ResponseReady: Anonymize<I3iun9sig164po>
  /**
   *Query response has been received and query is removed. The registered notification has
   *been dispatched and executed successfully.
   */
  Notified: Anonymize<I2uqmls7kcdnii>
  /**
   *Query response has been received and query is removed. The registered notification
   *could not be dispatched because the dispatch weight is greater than the maximum weight
   *originally budgeted by this runtime for the query result.
   */
  NotifyOverweight: Anonymize<Idg69klialbkb8>
  /**
   *Query response has been received and query is removed. There was a general error with
   *dispatching the notification call.
   */
  NotifyDispatchError: Anonymize<I2uqmls7kcdnii>
  /**
   *Query response has been received and query is removed. The dispatch was unable to be
   *decoded into a `Call`; this might be due to dispatch function having a signature which
   *is not `(origin, QueryId, Response)`.
   */
  NotifyDecodeFailed: Anonymize<I2uqmls7kcdnii>
  /**
   *Expected query response has been received but the origin location of the response does
   *not match that expected. The query remains registered for a later, valid, response to
   *be received and acted upon.
   */
  InvalidResponder: Anonymize<I13jboebjcbglr>
  /**
   *Expected query response has been received but the expected origin location placed in
   *storage by this runtime previously cannot be decoded. The query remains registered.
   *
   *This is unexpected (since a location placed in storage in a previously executing
   *runtime should be readable prior to query timeout) and dangerous since the possibly
   *valid response will be dropped. Manual governance intervention is probably going to be
   *needed.
   */
  InvalidResponderVersion: Anonymize<I3le5tr7ugg6l2>
  /**
   *Received query response has been read and removed.
   */
  ResponseTaken: Anonymize<I30pg328m00nr3>
  /**
   *Some assets have been placed in an asset trap.
   */
  AssetsTrapped: Anonymize<I381dkhrurdhrs>
  /**
   *An XCM version change notification message has been attempted to be sent.
   *
   *The cost of sending it (borne by the chain) is included.
   */
  VersionChangeNotified: Anonymize<Ic8hi3qr11vngc>
  /**
   *The supported version of a location has been changed. This might be through an
   *automatic notification or a manual intervention.
   */
  SupportedVersionChanged: Anonymize<Iabk8ljl5g8c86>
  /**
   *A given location which had a version change subscription was dropped owing to an error
   *sending the notification to it.
   */
  NotifyTargetSendFail: Anonymize<Ibjdlecumfu7q7>
  /**
   *A given location which had a version change subscription was dropped owing to an error
   *migrating the location to our new XCM format.
   */
  NotifyTargetMigrationFail: Anonymize<Ia9ems1kg7laoc>
  /**
   *Expected query response has been received but the expected querier location placed in
   *storage by this runtime previously cannot be decoded. The query remains registered.
   *
   *This is unexpected (since a location placed in storage in a previously executing
   *runtime should be readable prior to query timeout) and dangerous since the possibly
   *valid response will be dropped. Manual governance intervention is probably going to be
   *needed.
   */
  InvalidQuerierVersion: Anonymize<I3le5tr7ugg6l2>
  /**
   *Expected query response has been received but the querier location of the response does
   *not match the expected. The query remains registered for a later, valid, response to
   *be received and acted upon.
   */
  InvalidQuerier: Anonymize<I92fq0fa45vi3>
  /**
   *A remote has requested XCM version change notification from us and we have honored it.
   *A version information message is sent to them and its cost is included.
   */
  VersionNotifyStarted: Anonymize<Id01dpp0dn2cj0>
  /**
   *We have requested that a remote chain send us XCM version change notifications.
   */
  VersionNotifyRequested: Anonymize<Id01dpp0dn2cj0>
  /**
   *We have requested that a remote chain stops sending us XCM version change
   *notifications.
   */
  VersionNotifyUnrequested: Anonymize<Id01dpp0dn2cj0>
  /**
   *Fees were paid from a location for an operation (often for using `SendXcm`).
   */
  FeesPaid: Anonymize<I6nu8k62ck9o8o>
  /**
   *Some assets have been claimed from an asset trap
   */
  AssetsClaimed: Anonymize<I381dkhrurdhrs>
  /**
   *A XCM version migration finished.
   */
  VersionMigrationFinished: Anonymize<I6s1nbislhk619>
}>
export type I2aatv5i0cb96a = {
  outcome: XcmV4TraitsOutcome
}
export type XcmV4TraitsOutcome = Enum<{
  Complete: Anonymize<I30iff2d192eu7>
  Incomplete: {
    used: Anonymize<I4q39t5hn830vp>
    error: XcmV3TraitsError
  }
  Error: {
    error: XcmV3TraitsError
  }
}>
export declare const XcmV4TraitsOutcome: GetEnum<XcmV4TraitsOutcome>
export type I30iff2d192eu7 = {
  used: Anonymize<I4q39t5hn830vp>
}
export type XcmV3TraitsError = Enum<{
  Overflow: undefined
  Unimplemented: undefined
  UntrustedReserveLocation: undefined
  UntrustedTeleportLocation: undefined
  LocationFull: undefined
  LocationNotInvertible: undefined
  BadOrigin: undefined
  InvalidLocation: undefined
  AssetNotFound: undefined
  FailedToTransactAsset: undefined
  NotWithdrawable: undefined
  LocationCannotHold: undefined
  ExceedsMaxMessageSize: undefined
  DestinationUnsupported: undefined
  Transport: undefined
  Unroutable: undefined
  UnknownClaim: undefined
  FailedToDecode: undefined
  MaxWeightInvalid: undefined
  NotHoldingFees: undefined
  TooExpensive: undefined
  Trap: bigint
  ExpectationFalse: undefined
  PalletNotFound: undefined
  NameMismatch: undefined
  VersionIncompatible: undefined
  HoldingWouldOverflow: undefined
  ExportError: undefined
  ReanchorFailed: undefined
  NoDeal: undefined
  FeesNotMet: undefined
  LockError: undefined
  NoPermission: undefined
  Unanchored: undefined
  NotDepositable: undefined
  UnhandledXcmVersion: undefined
  WeightLimitReached: Anonymize<I4q39t5hn830vp>
  Barrier: undefined
  WeightNotComputable: undefined
  ExceedsStackLimit: undefined
}>
export declare const XcmV3TraitsError: GetEnum<XcmV3TraitsError>
export type Ib9msr5sr8t3dn = {
  origin: Anonymize<I4c0s5cioidn76>
  destination: Anonymize<I4c0s5cioidn76>
  message: Anonymize<Iegrepoo0c1jc5>
  message_id: FixedSizeBinary<32>
}
export type Iegrepoo0c1jc5 = Array<XcmV4Instruction>
export type XcmV4Instruction = Enum<{
  WithdrawAsset: Anonymize<I50mli3hb64f9b>
  ReserveAssetDeposited: Anonymize<I50mli3hb64f9b>
  ReceiveTeleportedAsset: Anonymize<I50mli3hb64f9b>
  QueryResponse: {
    query_id: bigint
    response: XcmV4Response
    max_weight: Anonymize<I4q39t5hn830vp>
    querier?: Anonymize<Ia9cgf4r40b26h>
  }
  TransferAsset: {
    assets: Anonymize<I50mli3hb64f9b>
    beneficiary: Anonymize<I4c0s5cioidn76>
  }
  TransferReserveAsset: {
    assets: Anonymize<I50mli3hb64f9b>
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Iegrepoo0c1jc5>
  }
  Transact: Anonymize<I92p6l5cs3fr50>
  HrmpNewChannelOpenRequest: Anonymize<I5uhhrjqfuo4e5>
  HrmpChannelAccepted: Anonymize<Ifij4jam0o7sub>
  HrmpChannelClosing: Anonymize<Ieeb4svd9i8fji>
  ClearOrigin: undefined
  DescendOrigin: XcmV3Junctions
  ReportError: Anonymize<I4r3v6e91d1qbs>
  DepositAsset: {
    assets: XcmV4AssetAssetFilter
    beneficiary: Anonymize<I4c0s5cioidn76>
  }
  DepositReserveAsset: {
    assets: XcmV4AssetAssetFilter
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Iegrepoo0c1jc5>
  }
  ExchangeAsset: {
    give: XcmV4AssetAssetFilter
    want: Anonymize<I50mli3hb64f9b>
    maximal: boolean
  }
  InitiateReserveWithdraw: {
    assets: XcmV4AssetAssetFilter
    reserve: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Iegrepoo0c1jc5>
  }
  InitiateTeleport: {
    assets: XcmV4AssetAssetFilter
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Iegrepoo0c1jc5>
  }
  ReportHolding: {
    response_info: Anonymize<I4r3v6e91d1qbs>
    assets: XcmV4AssetAssetFilter
  }
  BuyExecution: {
    fees: Anonymize<Ia5l7mu5a6v49o>
    weight_limit: XcmV3WeightLimit
  }
  RefundSurplus: undefined
  SetErrorHandler: Anonymize<Iegrepoo0c1jc5>
  SetAppendix: Anonymize<Iegrepoo0c1jc5>
  ClearError: undefined
  ClaimAsset: {
    assets: Anonymize<I50mli3hb64f9b>
    ticket: Anonymize<I4c0s5cioidn76>
  }
  Trap: bigint
  SubscribeVersion: Anonymize<Ieprdqqu7ildvr>
  UnsubscribeVersion: undefined
  BurnAsset: Anonymize<I50mli3hb64f9b>
  ExpectAsset: Anonymize<I50mli3hb64f9b>
  ExpectOrigin?: Anonymize<Ia9cgf4r40b26h>
  ExpectError?: Anonymize<I7sltvf8v2nure>
  ExpectTransactStatus: XcmV3MaybeErrorCode
  QueryPallet: Anonymize<Iba5bdbapp16oo>
  ExpectPallet: Anonymize<Id7mf37dkpgfjs>
  ReportTransactStatus: Anonymize<I4r3v6e91d1qbs>
  ClearTransactStatus: undefined
  UniversalOrigin: XcmV3Junction
  ExportMessage: {
    network: XcmV3JunctionNetworkId
    destination: XcmV3Junctions
    xcm: Anonymize<Iegrepoo0c1jc5>
  }
  LockAsset: {
    asset: Anonymize<Ia5l7mu5a6v49o>
    unlocker: Anonymize<I4c0s5cioidn76>
  }
  UnlockAsset: {
    asset: Anonymize<Ia5l7mu5a6v49o>
    target: Anonymize<I4c0s5cioidn76>
  }
  NoteUnlockable: {
    asset: Anonymize<Ia5l7mu5a6v49o>
    owner: Anonymize<I4c0s5cioidn76>
  }
  RequestUnlock: {
    asset: Anonymize<Ia5l7mu5a6v49o>
    locker: Anonymize<I4c0s5cioidn76>
  }
  SetFeesMode: Anonymize<I4nae9rsql8fa7>
  SetTopic: FixedSizeBinary<32>
  ClearTopic: undefined
  AliasOrigin: Anonymize<I4c0s5cioidn76>
  UnpaidExecution: Anonymize<I40d50jeai33oq>
}>
export declare const XcmV4Instruction: GetEnum<XcmV4Instruction>
export type I50mli3hb64f9b = Array<Anonymize<Ia5l7mu5a6v49o>>
export type Ia5l7mu5a6v49o = {
  id: Anonymize<I4c0s5cioidn76>
  fun: XcmV3MultiassetFungibility
}
export type XcmV3MultiassetFungibility = Enum<{
  Fungible: bigint
  NonFungible: XcmV3MultiassetAssetInstance
}>
export declare const XcmV3MultiassetFungibility: GetEnum<XcmV3MultiassetFungibility>
export type XcmV3MultiassetAssetInstance = Enum<{
  Undefined: undefined
  Index: bigint
  Array4: FixedSizeBinary<4>
  Array8: FixedSizeBinary<8>
  Array16: FixedSizeBinary<16>
  Array32: FixedSizeBinary<32>
}>
export declare const XcmV3MultiassetAssetInstance: GetEnum<XcmV3MultiassetAssetInstance>
export type XcmV4Response = Enum<{
  Null: undefined
  Assets: Anonymize<I50mli3hb64f9b>
  ExecutionResult?: Anonymize<I7sltvf8v2nure>
  Version: number
  PalletsInfo: Anonymize<I599u7h20b52at>
  DispatchResult: XcmV3MaybeErrorCode
}>
export declare const XcmV4Response: GetEnum<XcmV4Response>
export type I7sltvf8v2nure = [number, XcmV3TraitsError] | undefined
export type I599u7h20b52at = Array<{
  index: number
  name: Binary
  module_name: Binary
  major: number
  minor: number
  patch: number
}>
export type XcmV3MaybeErrorCode = Enum<{
  Success: undefined
  Error: Binary
  TruncatedError: Binary
}>
export declare const XcmV3MaybeErrorCode: GetEnum<XcmV3MaybeErrorCode>
export type Ia9cgf4r40b26h = Anonymize<I4c0s5cioidn76> | undefined
export type I92p6l5cs3fr50 = {
  origin_kind: XcmV2OriginKind
  require_weight_at_most: Anonymize<I4q39t5hn830vp>
  call: Binary
}
export type XcmV2OriginKind = Enum<{
  Native: undefined
  SovereignAccount: undefined
  Superuser: undefined
  Xcm: undefined
}>
export declare const XcmV2OriginKind: GetEnum<XcmV2OriginKind>
export type I5uhhrjqfuo4e5 = {
  sender: number
  max_message_size: number
  max_capacity: number
}
export type Ifij4jam0o7sub = {
  recipient: number
}
export type Ieeb4svd9i8fji = {
  initiator: number
  sender: number
  recipient: number
}
export type I4r3v6e91d1qbs = {
  destination: Anonymize<I4c0s5cioidn76>
  query_id: bigint
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type XcmV4AssetAssetFilter = Enum<{
  Definite: Anonymize<I50mli3hb64f9b>
  Wild: XcmV4AssetWildAsset
}>
export declare const XcmV4AssetAssetFilter: GetEnum<XcmV4AssetAssetFilter>
export type XcmV4AssetWildAsset = Enum<{
  All: undefined
  AllOf: {
    id: Anonymize<I4c0s5cioidn76>
    fun: XcmV2MultiassetWildFungibility
  }
  AllCounted: number
  AllOfCounted: {
    id: Anonymize<I4c0s5cioidn76>
    fun: XcmV2MultiassetWildFungibility
    count: number
  }
}>
export declare const XcmV4AssetWildAsset: GetEnum<XcmV4AssetWildAsset>
export type XcmV2MultiassetWildFungibility = Enum<{
  Fungible: undefined
  NonFungible: undefined
}>
export declare const XcmV2MultiassetWildFungibility: GetEnum<XcmV2MultiassetWildFungibility>
export type XcmV3WeightLimit = Enum<{
  Unlimited: undefined
  Limited: Anonymize<I4q39t5hn830vp>
}>
export declare const XcmV3WeightLimit: GetEnum<XcmV3WeightLimit>
export type Ieprdqqu7ildvr = {
  query_id: bigint
  max_response_weight: Anonymize<I4q39t5hn830vp>
}
export type Iba5bdbapp16oo = {
  module_name: Binary
  response_info: Anonymize<I4r3v6e91d1qbs>
}
export type Id7mf37dkpgfjs = {
  index: number
  name: Binary
  module_name: Binary
  crate_major: number
  min_crate_minor: number
}
export type I4nae9rsql8fa7 = {
  jit_withdraw: boolean
}
export type I40d50jeai33oq = {
  weight_limit: XcmV3WeightLimit
  check_origin?: Anonymize<Ia9cgf4r40b26h>
}
export type I3le5tr7ugg6l2 = {
  origin: Anonymize<I4c0s5cioidn76>
  query_id: bigint
}
export type I3iun9sig164po = {
  query_id: bigint
  response: XcmV4Response
}
export type I2uqmls7kcdnii = {
  query_id: bigint
  pallet_index: number
  call_index: number
}
export type Idg69klialbkb8 = {
  query_id: bigint
  pallet_index: number
  call_index: number
  actual_weight: Anonymize<I4q39t5hn830vp>
  max_budgeted_weight: Anonymize<I4q39t5hn830vp>
}
export type I13jboebjcbglr = {
  origin: Anonymize<I4c0s5cioidn76>
  query_id: bigint
  expected_location?: Anonymize<Ia9cgf4r40b26h>
}
export type I30pg328m00nr3 = {
  query_id: bigint
}
export type I381dkhrurdhrs = {
  hash: FixedSizeBinary<32>
  origin: Anonymize<I4c0s5cioidn76>
  assets: PaseoXcmVersionedAssets
}
export type PaseoXcmVersionedAssets = Enum<{
  V2: Anonymize<I2sllmucln1iic>
  V3: Anonymize<Iai6dhqiq3bach>
  V4: Anonymize<I50mli3hb64f9b>
}>
export declare const PaseoXcmVersionedAssets: GetEnum<PaseoXcmVersionedAssets>
export type I2sllmucln1iic = Array<Anonymize<Id8h647t880l31>>
export type Id8h647t880l31 = {
  id: XcmV2MultiassetAssetId
  fun: XcmV2MultiassetFungibility
}
export type XcmV2MultiassetAssetId = Enum<{
  Concrete: Anonymize<I4frqunb5hj2km>
  Abstract: Binary
}>
export declare const XcmV2MultiassetAssetId: GetEnum<XcmV2MultiassetAssetId>
export type XcmV2MultiassetFungibility = Enum<{
  Fungible: bigint
  NonFungible: XcmV2MultiassetAssetInstance
}>
export declare const XcmV2MultiassetFungibility: GetEnum<XcmV2MultiassetFungibility>
export type XcmV2MultiassetAssetInstance = Enum<{
  Undefined: undefined
  Index: bigint
  Array4: FixedSizeBinary<4>
  Array8: FixedSizeBinary<8>
  Array16: FixedSizeBinary<16>
  Array32: FixedSizeBinary<32>
  Blob: Binary
}>
export declare const XcmV2MultiassetAssetInstance: GetEnum<XcmV2MultiassetAssetInstance>
export type Iai6dhqiq3bach = Array<Anonymize<Idcm24504c8bkk>>
export type Idcm24504c8bkk = {
  id: XcmV3MultiassetAssetId
  fun: XcmV3MultiassetFungibility
}
export type Ic8hi3qr11vngc = {
  destination: Anonymize<I4c0s5cioidn76>
  result: number
  cost: Anonymize<I50mli3hb64f9b>
  message_id: FixedSizeBinary<32>
}
export type Iabk8ljl5g8c86 = {
  location: Anonymize<I4c0s5cioidn76>
  version: number
}
export type Ibjdlecumfu7q7 = {
  location: Anonymize<I4c0s5cioidn76>
  query_id: bigint
  error: XcmV3TraitsError
}
export type Ia9ems1kg7laoc = {
  location: PaseoXcmVersionedLocation
  query_id: bigint
}
export type I92fq0fa45vi3 = {
  origin: Anonymize<I4c0s5cioidn76>
  query_id: bigint
  expected_querier: Anonymize<I4c0s5cioidn76>
  maybe_actual_querier?: Anonymize<Ia9cgf4r40b26h>
}
export type Id01dpp0dn2cj0 = {
  destination: Anonymize<I4c0s5cioidn76>
  cost: Anonymize<I50mli3hb64f9b>
  message_id: FixedSizeBinary<32>
}
export type I6nu8k62ck9o8o = {
  paying: Anonymize<I4c0s5cioidn76>
  fees: Anonymize<I50mli3hb64f9b>
}
export type I6s1nbislhk619 = {
  version: number
}
export type I13vul90391uuv = AnonymousEnum<{
  /**
   *Message discarded due to an error in the `MessageProcessor` (usually a format error).
   */
  ProcessingFailed: Anonymize<I218fa3heih67o>
  /**
   *Message is processed.
   */
  Processed: Anonymize<I1tf93k54ltg1v>
  /**
   *Message placed in overweight queue.
   */
  OverweightEnqueued: Anonymize<I6ove5at7hfiur>
  /**
   *This page was reaped.
   */
  PageReaped: Anonymize<I9c0urppp07b8b>
}>
export type I218fa3heih67o = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: ParachainsInclusionAggregateMessageOrigin
  /**
   *The error that occurred.
   *
   *This error is pretty opaque. More fine-grained errors need to be emitted as events
   *by the `MessageProcessor`.
   */
  error: Anonymize<I5hhsj7l9obr84>
}
export type ParachainsInclusionAggregateMessageOrigin = Enum<{
  Ump: ParachainsInclusionUmpQueueId
}>
export declare const ParachainsInclusionAggregateMessageOrigin: GetEnum<ParachainsInclusionAggregateMessageOrigin>
export type ParachainsInclusionUmpQueueId = Enum<{
  Para: number
}>
export declare const ParachainsInclusionUmpQueueId: GetEnum<ParachainsInclusionUmpQueueId>
export type I5hhsj7l9obr84 = AnonymousEnum<{
  BadFormat: undefined
  Corrupt: undefined
  Unsupported: undefined
  Overweight: Anonymize<I4q39t5hn830vp>
  Yield: undefined
  StackLimitReached: undefined
}>
export type I1tf93k54ltg1v = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: ParachainsInclusionAggregateMessageOrigin
  /**
   *How much weight was used to process the message.
   */
  weight_used: Anonymize<I4q39t5hn830vp>
  /**
   *Whether the message was processed.
   *
   *Note that this does not mean that the underlying `MessageProcessor` was internally
   *successful. It *solely* means that the MQ pallet will treat this as a success
   *condition and discard the message. Any internal error needs to be emitted as events
   *by the `MessageProcessor`.
   */
  success: boolean
}
export type I6ove5at7hfiur = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: ParachainsInclusionAggregateMessageOrigin
  /**
   *The page of the message.
   */
  page_index: number
  /**
   *The index of the message within the page.
   */
  message_index: number
}
export type I9c0urppp07b8b = {
  /**
   *The queue of the page.
   */
  origin: ParachainsInclusionAggregateMessageOrigin
  /**
   *The index of the page.
   */
  index: number
}
export type AssetRateEvent = Enum<{
  AssetRateCreated: Anonymize<I6nmp4rhqla35>
  AssetRateRemoved: Anonymize<I8ndstn7sf4kek>
  AssetRateUpdated: Anonymize<I1a3ecmnlnvr59>
}>
export declare const AssetRateEvent: GetEnum<AssetRateEvent>
export type I6nmp4rhqla35 = {
  asset_kind: VersionedLocatableAsset
  rate: bigint
}
export type I8ndstn7sf4kek = {
  asset_kind: VersionedLocatableAsset
}
export type I1a3ecmnlnvr59 = {
  asset_kind: VersionedLocatableAsset
  old: bigint
  new: bigint
}
export type I4t9gtn2r19fen = AnonymousEnum<{
  /**
   *A sudo call just took place.
   */
  Sudid: Anonymize<Ia6bningo7umml>
  /**
   *The sudo key has been updated.
   */
  KeyChanged: Anonymize<I5rtkmhm2dng4u>
  /**
   *The key was permanently removed.
   */
  KeyRemoved: undefined
  /**
   *A [sudo_as](Pallet::sudo_as) call just took place.
   */
  SudoAsDone: Anonymize<Ia6bningo7umml>
}>
export type Ia6bningo7umml = {
  /**
   *The result of the call made by the sudo user.
   */
  sudo_result: Anonymize<I69hcjbv3dno0j>
}
export type I5rtkmhm2dng4u = {
  /**
   *The old sudo key (if one was previously set).
   */
  old?: Anonymize<Ihfphjolmsqq1>
  /**
   *The new sudo key (if one was set).
   */
  new: SS58String
}
export type Ic5m5lp1oioo8r = Array<FixedSizeBinary<32>>
export type I95g6i7ilua7lq = Array<Anonymize<I9jd27rnpm8ttv>>
export type Ieniouoqkq4icf = {
  spec_version: number
  spec_name: string
}
export type I9tv51sgspensk = Array<
  | {
      maybe_id?: Anonymize<I4s6vifaf8k998>
      priority: number
      call: PreimagesBounded
      maybe_periodic?: Anonymize<Iep7au1720bm0e>
      origin: PolkadotRuntimeOriginCaller
    }
  | undefined
>
export type Iep7au1720bm0e = Anonymize<I9jd27rnpm8ttv> | undefined
export type PolkadotRuntimeOriginCaller = Enum<{
  system: DispatchRawOrigin
  Origins: GovernanceOrigin
  ParachainsOrigin: ParachainsOrigin
  XcmPallet: XcmPalletOrigin
  Void: undefined
}>
export declare const PolkadotRuntimeOriginCaller: GetEnum<PolkadotRuntimeOriginCaller>
export type DispatchRawOrigin = Enum<{
  Root: undefined
  Signed: SS58String
  None: undefined
}>
export declare const DispatchRawOrigin: GetEnum<DispatchRawOrigin>
export type GovernanceOrigin = Enum<{
  StakingAdmin: undefined
  Treasurer: undefined
  FellowshipAdmin: undefined
  GeneralAdmin: undefined
  AuctionAdmin: undefined
  LeaseAdmin: undefined
  ReferendumCanceller: undefined
  ReferendumKiller: undefined
  SmallTipper: undefined
  BigTipper: undefined
  SmallSpender: undefined
  MediumSpender: undefined
  BigSpender: undefined
  WhitelistedCaller: undefined
  WishForChange: undefined
}>
export declare const GovernanceOrigin: GetEnum<GovernanceOrigin>
export type ParachainsOrigin = Enum<{
  Parachain: number
}>
export declare const ParachainsOrigin: GetEnum<ParachainsOrigin>
export type XcmPalletOrigin = Enum<{
  Xcm: Anonymize<I4c0s5cioidn76>
  Response: Anonymize<I4c0s5cioidn76>
}>
export declare const XcmPalletOrigin: GetEnum<XcmPalletOrigin>
export type I56u24ncejr5kt = {
  total_retries: number
  remaining: number
  period: number
}
export type PreimageOldRequestStatus = Enum<{
  Unrequested: {
    deposit: Anonymize<I95l2k9b1re95f>
    len: number
  }
  Requested: {
    deposit?: Anonymize<I92hdo1clkbp4g>
    count: number
    len?: Anonymize<I4arjljr6dpflb>
  }
}>
export declare const PreimageOldRequestStatus: GetEnum<PreimageOldRequestStatus>
export type I95l2k9b1re95f = [SS58String, bigint]
export type I92hdo1clkbp4g = Anonymize<I95l2k9b1re95f> | undefined
export type I4arjljr6dpflb = number | undefined
export type PreimageRequestStatus = Enum<{
  Unrequested: {
    ticket: Anonymize<I95l2k9b1re95f>
    len: number
  }
  Requested: {
    maybe_ticket?: Anonymize<I92hdo1clkbp4g>
    count: number
    maybe_len?: Anonymize<I4arjljr6dpflb>
  }
}>
export declare const PreimageRequestStatus: GetEnum<PreimageRequestStatus>
export type BabeDigestsNextConfigDescriptor = Enum<{
  V1: Anonymize<I8jnd4d8ip6djo>
}>
export declare const BabeDigestsNextConfigDescriptor: GetEnum<BabeDigestsNextConfigDescriptor>
export type I8jnd4d8ip6djo = {
  c: Anonymize<I200n1ov5tbcvr>
  allowed_slots: BabeAllowedSlots
}
export type I200n1ov5tbcvr = FixedSizeArray<2, bigint>
export type BabeAllowedSlots = Enum<{
  PrimarySlots: undefined
  PrimaryAndSecondaryPlainSlots: undefined
  PrimaryAndSecondaryVRFSlots: undefined
}>
export declare const BabeAllowedSlots: GetEnum<BabeAllowedSlots>
export type Idq7or56ds2f13 = BabeDigestsPreDigest | undefined
export type BabeDigestsPreDigest = Enum<{
  Primary: {
    authority_index: number
    slot: bigint
    vrf_signature: {
      pre_output: FixedSizeBinary<32>
      proof: FixedSizeBinary<64>
    }
  }
  SecondaryPlain: {
    authority_index: number
    slot: bigint
  }
  SecondaryVRF: {
    authority_index: number
    slot: bigint
    vrf_signature: {
      pre_output: FixedSizeBinary<32>
      proof: FixedSizeBinary<64>
    }
  }
}>
export declare const BabeDigestsPreDigest: GetEnum<BabeDigestsPreDigest>
export type Ifip05kcrl65am = Array<Anonymize<I6cs1itejju2vv>>
export type I6cs1itejju2vv = [bigint, number]
export type Iff9heri56m1mb = [SS58String, bigint, boolean]
export type I8ds64oj6581v0 = Array<{
  id: FixedSizeBinary<8>
  amount: bigint
  reasons: BalancesTypesReasons
}>
export type BalancesTypesReasons = Enum<{
  Fee: undefined
  Misc: undefined
  All: undefined
}>
export declare const BalancesTypesReasons: GetEnum<BalancesTypesReasons>
export type Ia7pdug7cdsg8g = Array<{
  id: FixedSizeBinary<8>
  amount: bigint
}>
export type I1c9k8m3rn472d = Array<{
  id: Enum<{
    Preimage: PreimagePalletHoldReason
    DelegatedStaking: Enum<{
      StakingDelegation: undefined
    }>
    StateTrieMigration: Anonymize<I7lf1val3vmpq0>
  }>
  amount: bigint
}>
export type PreimagePalletHoldReason = Enum<{
  Preimage: undefined
}>
export declare const PreimagePalletHoldReason: GetEnum<PreimagePalletHoldReason>
export type I7lf1val3vmpq0 = AnonymousEnum<{
  SlashForMigrate: undefined
}>
export type I2l1ctuihi2mfd = Array<{
  id: WestendRuntimeRuntimeFreezeReason
  amount: bigint
}>
export type WestendRuntimeRuntimeFreezeReason = Enum<{
  NominationPools: NominationPoolsPalletFreezeReason
}>
export declare const WestendRuntimeRuntimeFreezeReason: GetEnum<WestendRuntimeRuntimeFreezeReason>
export type NominationPoolsPalletFreezeReason = Enum<{
  PoolMinBalance: undefined
}>
export declare const NominationPoolsPalletFreezeReason: GetEnum<NominationPoolsPalletFreezeReason>
export type TransactionPaymentReleases = Enum<{
  V1Ancient: undefined
  V2: undefined
}>
export declare const TransactionPaymentReleases: GetEnum<TransactionPaymentReleases>
export type Ia2lhg7l2hilo3 = Array<SS58String>
export type Ic12aht5vh2sen = {
  stash: SS58String
  total: bigint
  active: bigint
  unlocking: Anonymize<I9nc4v1upo2c8e>
  legacy_claimed_rewards: Anonymize<Icgljjb6j82uhn>
}
export type I9nc4v1upo2c8e = Array<{
  value: bigint
  era: number
}>
export type Ic3m9d6tdl6gi2 = {
  targets: Anonymize<Ia2lhg7l2hilo3>
  submitted_in: number
  suppressed: boolean
}
export type Ib3j7gb0jgs38u = {
  index: number
  start?: Anonymize<I35p85j063s0il>
}
export type I35p85j063s0il = bigint | undefined
export type Ifekshcrgkl12g = {
  total: bigint
  own: bigint
  others: Anonymize<I252o97fo263q7>
}
export type I252o97fo263q7 = Array<{
  who: SS58String
  value: bigint
}>
export type I6flrronqs3l6n = {
  total: bigint
  own: bigint
  nominator_count: number
  page_count: number
}
export type I97fulj5h3ik95 = {
  page_total: bigint
  others: Anonymize<I252o97fo263q7>
}
export type Ia8896dq44k9m4 = [number, SS58String, number]
export type Iff9p3c7k6pfoi = {
  total: number
  individual: Array<Anonymize<I6ouflveob4eli>>
}
export type I6ouflveob4eli = [SS58String, number]
export type Iafq6t4rgheait = Array<{
  validator: SS58String
  own: bigint
  others: Anonymize<Iba9inugg1atvo>
  reporters: Anonymize<Ia2lhg7l2hilo3>
  payout: bigint
}>
export type Iba9inugg1atvo = Array<Anonymize<I95l2k9b1re95f>>
export type I4ojmnsk1dchql = [number, bigint]
export type Iinkhfdlka9ch = {
  span_index: number
  last_start: number
  last_nonzero_slash: number
  prior: Anonymize<Icgljjb6j82uhn>
}
export type I2kj4j6mp68hf8 = {
  slashed: bigint
  paid_out: bigint
}
export type I2bqvqrg0sbrdj = {
  offender: [SS58String, Anonymize<Ifekshcrgkl12g>]
  reporters: Anonymize<Ia2lhg7l2hilo3>
}
export type I23nq3fsgtejt = [FixedSizeBinary<16>, Binary]
export type Idt624nf41g34e = Array<[SS58String, Anonymize<I9kr8cseidc66h>]>
export type I9kr8cseidc66h = {
  grandpa: FixedSizeBinary<32>
  babe: FixedSizeBinary<32>
  para_validator: FixedSizeBinary<32>
  para_assignment: FixedSizeBinary<32>
  authority_discovery: FixedSizeBinary<32>
  beefy: FixedSizeBinary<33>
}
export type GrandpaStoredState = Enum<{
  Live: undefined
  PendingPause: {
    scheduled_at: number
    delay: number
  }
  Paused: undefined
  PendingResume: {
    scheduled_at: number
    delay: number
  }
}>
export declare const GrandpaStoredState: GetEnum<GrandpaStoredState>
export type I7pe2me3i3vtn9 = {
  scheduled_at: number
  delay: number
  next_authorities: Anonymize<I3geksg000c171>
  forced?: Anonymize<I4arjljr6dpflb>
}
export type Iegmj7n48sc3am = {
  proposer: SS58String
  value: bigint
  beneficiary: SS58String
  bond: bigint
}
export type I5v9a2mdqq4t8u = {
  asset_kind: VersionedLocatableAsset
  amount: bigint
  beneficiary: PaseoXcmVersionedLocation
  valid_from: number
  expire_at: number
  status: TreasuryPaymentState
}
export type TreasuryPaymentState = Enum<{
  Pending: undefined
  Attempted: Anonymize<I4ov6e94l79mbg>
  Failed: undefined
}>
export declare const TreasuryPaymentState: GetEnum<TreasuryPaymentState>
export type I4ov6e94l79mbg = {
  id: bigint
}
export type ConvictionVotingVoteVoting = Enum<{
  Casting: {
    votes: Array<[number, ConvictionVotingVoteAccountVote]>
    delegations: Anonymize<I538qha8r4j3ii>
    prior: Anonymize<I4ojmnsk1dchql>
  }
  Delegating: {
    balance: bigint
    target: SS58String
    conviction: VotingConviction
    delegations: Anonymize<I538qha8r4j3ii>
    prior: Anonymize<I4ojmnsk1dchql>
  }
}>
export declare const ConvictionVotingVoteVoting: GetEnum<ConvictionVotingVoteVoting>
export type I538qha8r4j3ii = {
  votes: bigint
  capital: bigint
}
export type VotingConviction = Enum<{
  None: undefined
  Locked1x: undefined
  Locked2x: undefined
  Locked3x: undefined
  Locked4x: undefined
  Locked5x: undefined
  Locked6x: undefined
}>
export declare const VotingConviction: GetEnum<VotingConviction>
export type If9jidduiuq7vv = Array<Anonymize<I4ojmnsk1dchql>>
export type Idu11e295qqjep = AnonymousEnum<{
  Ongoing: {
    track: number
    origin: PolkadotRuntimeOriginCaller
    proposal: PreimagesBounded
    enactment: TraitsScheduleDispatchTime
    submitted: number
    submission_deposit: Anonymize<Id5fm4p8lj5qgi>
    decision_deposit?: Anonymize<Ibd24caul84kv2>
    deciding?:
      | {
          since: number
          confirming?: Anonymize<I4arjljr6dpflb>
        }
      | undefined
    tally: Anonymize<Ifsk7cbmtit1jd>
    in_queue: boolean
    alarm?: [number, Anonymize<I9jd27rnpm8ttv>] | undefined
  }
  Approved: [number, Anonymize<Ibd24caul84kv2>, Anonymize<Ibd24caul84kv2>]
  Rejected: [number, Anonymize<Ibd24caul84kv2>, Anonymize<Ibd24caul84kv2>]
  Cancelled: [number, Anonymize<Ibd24caul84kv2>, Anonymize<Ibd24caul84kv2>]
  TimedOut: [number, Anonymize<Ibd24caul84kv2>, Anonymize<Ibd24caul84kv2>]
  Killed: number
}>
export type TraitsScheduleDispatchTime = Enum<{
  At: number
  After: number
}>
export declare const TraitsScheduleDispatchTime: GetEnum<TraitsScheduleDispatchTime>
export type Ibd24caul84kv2 = Anonymize<Id5fm4p8lj5qgi> | undefined
export type I2phecamkn3pej = [bigint, bigint, number]
export type ClaimsStatementKind = Enum<{
  Regular: undefined
  Saft: undefined
}>
export declare const ClaimsStatementKind: GetEnum<ClaimsStatementKind>
export type Ifble4juuml5ig = Array<Anonymize<I4aro1m78pdrtt>>
export type I4aro1m78pdrtt = {
  locked: bigint
  per_block: bigint
  starting_block: number
}
export type Version = Enum<{
  V0: undefined
  V1: undefined
}>
export declare const Version: GetEnum<Version>
export type I8oad3rb9oe9n1 = [
  Array<{
    delegate: SS58String
    proxy_type: Anonymize<I7adrgaqb51jb9>
    delay: number
  }>,
  bigint,
]
export type I9p9lq3rej5bhc = [
  Array<{
    real: SS58String
    call_hash: FixedSizeBinary<32>
    height: number
  }>,
  bigint,
]
export type Iag146hmjgqfgj = {
  when: Anonymize<Itvprrpb0nm3o>
  deposit: bigint
  depositor: SS58String
  approvals: Anonymize<Ia2lhg7l2hilo3>
}
export type I8uo3fpd3bcc6f = [SS58String, FixedSizeBinary<32>]
export type I8phqps8r3of7e = {
  proposer: SS58String
  value: bigint
  fee: bigint
  curator_deposit: bigint
  bond: bigint
  status: BountiesBountyStatus
}
export type BountiesBountyStatus = Enum<{
  Proposed: undefined
  Approved: undefined
  Funded: undefined
  CuratorProposed: Anonymize<I846573mdj1pfn>
  Active: {
    curator: SS58String
    update_due: number
  }
  PendingPayout: Anonymize<I4aulgjqrdphrm>
}>
export declare const BountiesBountyStatus: GetEnum<BountiesBountyStatus>
export type I846573mdj1pfn = {
  curator: SS58String
}
export type I4aulgjqrdphrm = {
  curator: SS58String
  beneficiary: SS58String
  unlock_at: number
}
export type Ibofbvvaehln4e = {
  parent_bounty: number
  value: bigint
  fee: bigint
  curator_deposit: bigint
  status: ChildBountyStatus
}
export type ChildBountyStatus = Enum<{
  Added: undefined
  CuratorProposed: Anonymize<I846573mdj1pfn>
  Active: Anonymize<I846573mdj1pfn>
  PendingPayout: Anonymize<I4aulgjqrdphrm>
}>
export declare const ChildBountyStatus: GetEnum<ChildBountyStatus>
export type Ictkaqdbfabuek = {
  supports: Anonymize<I4bboqsv44evel>
  score: Anonymize<I8s6n43okuj2b1>
  compute: ElectionProviderMultiPhaseElectionCompute
}
export type I4bboqsv44evel = Array<
  [
    SS58String,
    {
      total: bigint
      voters: Anonymize<Iba9inugg1atvo>
    },
  ]
>
export type Ia7o65280hur3p = {
  voters: Array<[SS58String, bigint, Anonymize<Ia2lhg7l2hilo3>]>
  targets: Anonymize<Ia2lhg7l2hilo3>
}
export type Iasd2iat48n080 = {
  voters: number
  targets: number
}
export type Ic8d01sg6acf60 = Array<[Anonymize<I8s6n43okuj2b1>, number, number]>
export type Irl37q7erstrb = {
  who: SS58String
  deposit: bigint
  raw_solution: Anonymize<I7je4n92ump862>
  call_fee: bigint
}
export type I7je4n92ump862 = {
  solution: {
    votes1: Array<Anonymize<I5g2vv0ckl2m8b>>
    votes2: Array<[number, Anonymize<I5g2vv0ckl2m8b>, number]>
    votes3: Array<[number, FixedSizeArray<2, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes4: Array<[number, FixedSizeArray<3, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes5: Array<[number, FixedSizeArray<4, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes6: Array<[number, FixedSizeArray<5, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes7: Array<[number, FixedSizeArray<6, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes8: Array<[number, FixedSizeArray<7, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes9: Array<[number, FixedSizeArray<8, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes10: Array<[number, FixedSizeArray<9, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes11: Array<[number, FixedSizeArray<10, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes12: Array<[number, FixedSizeArray<11, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes13: Array<[number, FixedSizeArray<12, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes14: Array<[number, FixedSizeArray<13, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes15: Array<[number, FixedSizeArray<14, Anonymize<I5g2vv0ckl2m8b>>, number]>
    votes16: Array<[number, FixedSizeArray<15, Anonymize<I5g2vv0ckl2m8b>>, number]>
  }
  score: Anonymize<I8s6n43okuj2b1>
  round: number
}
export type I5g2vv0ckl2m8b = [number, number]
export type Ic5t26f9cp3tvk = {
  id: SS58String
  prev?: Anonymize<Ihfphjolmsqq1>
  next?: Anonymize<Ihfphjolmsqq1>
  bag_upper: bigint
  score: bigint
}
export type I39k39h6vu4hbq = {
  head?: Anonymize<Ihfphjolmsqq1>
  tail?: Anonymize<Ihfphjolmsqq1>
}
export type Idphjddn2h69vc = {
  pool_id: number
  points: bigint
  last_recorded_reward_counter: bigint
  unbonding_eras: Anonymize<If9jidduiuq7vv>
}
export type Idhh9vuu2bderg = {
  commission: {
    current?: Anonymize<Ie8iutm7u02lmj>
    max?: Anonymize<I4arjljr6dpflb>
    change_rate?: Anonymize<Ibqul338t9c1ll> | undefined
    throttle_from?: Anonymize<I4arjljr6dpflb>
    claim_permission?: Anonymize<I16m1kn78dee7v>
  }
  member_counter: number
  points: bigint
  roles: {
    depositor: SS58String
    root?: Anonymize<Ihfphjolmsqq1>
    nominator?: Anonymize<Ihfphjolmsqq1>
    bouncer?: Anonymize<Ihfphjolmsqq1>
  }
  state: NominationPoolsPoolState
}
export type If6qa32dj75gu1 = {
  last_recorded_reward_counter: bigint
  last_recorded_total_payouts: bigint
  total_rewards_claimed: bigint
  total_commission_pending: bigint
  total_commission_claimed: bigint
}
export type I7oo2mprv1qd1s = {
  no_era: Anonymize<I4h0cfnkiqrna6>
  with_era: Array<[number, Anonymize<I4h0cfnkiqrna6>]>
}
export type I4h0cfnkiqrna6 = {
  points: bigint
  balance: bigint
}
export type NominationPoolsClaimPermission = Enum<{
  Permissioned: undefined
  PermissionlessCompound: undefined
  PermissionlessWithdraw: undefined
  PermissionlessAll: undefined
}>
export declare const NominationPoolsClaimPermission: GetEnum<NominationPoolsClaimPermission>
export type I2eh80qovrl7h2 = {
  stashes: Anonymize<Iba9inugg1atvo>
  checked: Anonymize<Icgljjb6j82uhn>
}
export type I542q009qbgt8k = {
  agent: SS58String
  amount: bigint
}
export type I4e5ujckjq61g8 = {
  payee: SS58String
  total_delegated: bigint
  unclaimed_withdrawals: bigint
  pending_slash: bigint
}
export type Idinvj2ldfa0k7 = {
  max_code_size: number
  max_head_data_size: number
  max_upward_queue_count: number
  max_upward_queue_size: number
  max_upward_message_size: number
  max_upward_message_num_per_candidate: number
  hrmp_max_message_num_per_candidate: number
  validation_upgrade_cooldown: number
  validation_upgrade_delay: number
  async_backing_params: Anonymize<Iavuvfkop6318c>
  max_pov_size: number
  max_downward_message_size: number
  hrmp_max_parachain_outbound_channels: number
  hrmp_sender_deposit: bigint
  hrmp_recipient_deposit: bigint
  hrmp_channel_max_capacity: number
  hrmp_channel_max_total_size: number
  hrmp_max_parachain_inbound_channels: number
  hrmp_channel_max_message_size: number
  executor_params: Anonymize<I80rnntpog8qp6>
  code_retention_period: number
  max_validators?: Anonymize<I4arjljr6dpflb>
  dispute_period: number
  dispute_post_conclusion_acceptance_period: number
  no_show_slots: number
  n_delay_tranches: number
  zeroth_delay_tranche_width: number
  needed_approvals: number
  relay_vrf_modulo_samples: number
  pvf_voting_ttl: number
  minimum_validation_upgrade_delay: number
  minimum_backing_votes: number
  node_features: {
    bytes: Uint8Array
    bitsLen: number
  }
  approval_voting_params: number
  scheduler_params: Anonymize<I555j7pvb27qd5>
}
export type Iavuvfkop6318c = {
  max_candidate_depth: number
  allowed_ancestry_len: number
}
export type I80rnntpog8qp6 = Array<PolkadotPrimitivesV6ExecutorParamsExecutorParam>
export type PolkadotPrimitivesV6ExecutorParamsExecutorParam = Enum<{
  MaxMemoryPages: number
  StackLogicalMax: number
  StackNativeMax: number
  PrecheckingMaxMemory: bigint
  PvfPrepTimeout: [PolkadotPrimitivesV6PvfPrepKind, bigint]
  PvfExecTimeout: [PvfExecKind, bigint]
  WasmExtBulkMemory: undefined
}>
export declare const PolkadotPrimitivesV6ExecutorParamsExecutorParam: GetEnum<PolkadotPrimitivesV6ExecutorParamsExecutorParam>
export type PolkadotPrimitivesV6PvfPrepKind = Enum<{
  Precheck: undefined
  Prepare: undefined
}>
export declare const PolkadotPrimitivesV6PvfPrepKind: GetEnum<PolkadotPrimitivesV6PvfPrepKind>
export type PvfExecKind = Enum<{
  Backing: undefined
  Approval: undefined
}>
export declare const PvfExecKind: GetEnum<PvfExecKind>
export type I555j7pvb27qd5 = {
  group_rotation_frequency: number
  paras_availability_period: number
  max_validators_per_core?: Anonymize<I4arjljr6dpflb>
  lookahead: number
  num_cores: number
  max_availability_timeouts: number
  on_demand_queue_max_size: number
  on_demand_target_queue_utilization: number
  on_demand_fee_variability: number
  on_demand_base_fee: bigint
  ttl: number
}
export type I78k2970vpbt1t = Array<[number, Anonymize<Idinvj2ldfa0k7>]>
export type I27il479s8gsv0 = {
  buffer: Array<FixedSizeArray<2, FixedSizeBinary<32>>>
  latest_number: number
}
export type Id375uoldedict = Array<{
  core: number
  hash: FixedSizeBinary<32>
  descriptor: Anonymize<Ic7r865c0luc3k>
  commitments: Anonymize<Ic1d4u2opv3fst>
  availability_votes: {
    bytes: Uint8Array
    bitsLen: number
  }
  backers: {
    bytes: Uint8Array
    bitsLen: number
  }
  relay_parent_number: number
  backed_in_number: number
  backing_group: number
}>
export type Ic1d4u2opv3fst = {
  upward_messages: Anonymize<Itom7fk49o0c9>
  horizontal_messages: Anonymize<I6r5cbv8ttrb09>
  new_validation_code?: Anonymize<Iabpgqcjikia83>
  head_data: Binary
  processed_downward_messages: number
  hrmp_watermark: number
}
export type Itom7fk49o0c9 = Array<Binary>
export type I6r5cbv8ttrb09 = Array<{
  recipient: number
  data: Binary
}>
export type Iabpgqcjikia83 = Binary | undefined
export type Ilg2fqs6cjgs3 = {
  session: number
  backing_validators_per_candidate: Array<
    [Anonymize<I9o5v7cmfi9c85>, Array<[number, ValidityAttestation]>]
  >
  disputes: Anonymize<Ibt1op6l47p1r2>
}
export type ValidityAttestation = Enum<{
  Implicit: FixedSizeBinary<64>
  Explicit: FixedSizeBinary<64>
}>
export declare const ValidityAttestation: GetEnum<ValidityAttestation>
export type Ibt1op6l47p1r2 = Array<{
  candidate_hash: FixedSizeBinary<32>
  session: number
  statements: Array<[PolkadotPrimitivesV6DisputeStatement, number, FixedSizeBinary<64>]>
}>
export type PolkadotPrimitivesV6DisputeStatement = Enum<{
  Valid: PolkadotPrimitivesV6ValidDisputeStatementKind
  Invalid: InvalidDisputeStatementKind
}>
export declare const PolkadotPrimitivesV6DisputeStatement: GetEnum<PolkadotPrimitivesV6DisputeStatement>
export type PolkadotPrimitivesV6ValidDisputeStatementKind = Enum<{
  Explicit: undefined
  BackingSeconded: FixedSizeBinary<32>
  BackingValid: FixedSizeBinary<32>
  ApprovalChecking: undefined
  ApprovalCheckingMultipleCandidates: Anonymize<Ic5m5lp1oioo8r>
}>
export declare const PolkadotPrimitivesV6ValidDisputeStatementKind: GetEnum<PolkadotPrimitivesV6ValidDisputeStatementKind>
export type InvalidDisputeStatementKind = Enum<{
  Explicit: undefined
}>
export declare const InvalidDisputeStatementKind: GetEnum<InvalidDisputeStatementKind>
export type Iarlj3qd8u1v13 = Array<Anonymize<Icgljjb6j82uhn>>
export type I2ng2krd94ceva = Array<PolkadotRuntimeParachainsSchedulerPalletCoreOccupied>
export type PolkadotRuntimeParachainsSchedulerPalletCoreOccupied = Enum<{
  Free: undefined
  Paras: Anonymize<Iuf24b6e93i3q>
}>
export declare const PolkadotRuntimeParachainsSchedulerPalletCoreOccupied: GetEnum<PolkadotRuntimeParachainsSchedulerPalletCoreOccupied>
export type Iuf24b6e93i3q = {
  assignment: PolkadotRuntimeParachainsSchedulerCommonAssignment
  availability_timeouts: number
  ttl: number
}
export type PolkadotRuntimeParachainsSchedulerCommonAssignment = Enum<{
  Pool: {
    para_id: number
    core_index: number
  }
  Bulk: number
}>
export declare const PolkadotRuntimeParachainsSchedulerCommonAssignment: GetEnum<PolkadotRuntimeParachainsSchedulerCommonAssignment>
export type Ie18mk3nmrn3nr = Array<[number, Array<Anonymize<Iuf24b6e93i3q>>]>
export type I4vk12npmr8ll0 = {
  votes_accept: {
    bytes: Uint8Array
    bitsLen: number
  }
  votes_reject: {
    bytes: Uint8Array
    bitsLen: number
  }
  age: number
  created_at: number
  causes: Array<
    Enum<{
      Onboarding: number
      Upgrade: {
        id: number
        included_at: number
        upgrade_strategy: Enum<{
          SetGoAheadSignal: undefined
          ApplyAtExpectedBlock: undefined
        }>
      }
    }>
  >
}
export type ParachainsParasParaLifecycle = Enum<{
  Onboarding: undefined
  Parathread: undefined
  Parachain: undefined
  UpgradingParathread: undefined
  DowngradingParachain: undefined
  OffboardingParathread: undefined
  OffboardingParachain: undefined
}>
export declare const ParachainsParasParaLifecycle: GetEnum<ParachainsParasParaLifecycle>
export type I79cs1p3m59mo7 = {
  upgrade_times: Array<{
    expected_at: number
    activated_at: number
  }>
  last_pruned?: Anonymize<I4arjljr6dpflb>
}
export type UpgradeGoAhead = Enum<{
  Abort: undefined
  GoAhead: undefined
}>
export declare const UpgradeGoAhead: GetEnum<UpgradeGoAhead>
export type UpgradeRestriction = Enum<{
  Present: undefined
}>
export declare const UpgradeRestriction: GetEnum<UpgradeRestriction>
export type I2duhnt686rv0q = {
  genesis_head: Binary
  validation_code: Binary
  para_kind: boolean
}
export type I7ulu3h1ibu60i = Array<{
  validators: Anonymize<Ic5m5lp1oioo8r>
  queued: Anonymize<Ic5m5lp1oioo8r>
  session_index: number
}>
export type I6ljjd4b5fa4ov = Array<{
  sent_at: number
  msg: Binary
}>
export type Ibhmrlkcu01imb = {
  confirmed: boolean
  _age: number
  sender_deposit: bigint
  max_message_size: number
  max_capacity: number
  max_total_size: number
}
export type Id43g4eveajpkl = Array<Anonymize<I50mrcbubp554e>>
export type I7iua3ehrgl4va = {
  max_capacity: number
  max_total_size: number
  max_message_size: number
  msg_count: number
  total_size: number
  mqc_head?: Anonymize<I4s6vifaf8k998>
  sender_deposit: bigint
  recipient_deposit: bigint
}
export type Iev3u09i2vqn93 = Array<{
  sent_at: number
  data: Binary
}>
export type I9olhgo2o08h7b = Array<[number, Anonymize<Icgljjb6j82uhn>]>
export type I9m4rd2a7lc9md = {
  active_validator_indices: Anonymize<Icgljjb6j82uhn>
  random_seed: FixedSizeBinary<32>
  dispute_period: number
  validators: Anonymize<Ic5m5lp1oioo8r>
  discovery_keys: Anonymize<Ic5m5lp1oioo8r>
  assignment_keys: Anonymize<Ic5m5lp1oioo8r>
  validator_groups: Anonymize<Iarlj3qd8u1v13>
  n_cores: number
  zeroth_delay_tranche_width: number
  relay_vrf_modulo_samples: number
  n_delay_tranches: number
  no_show_slots: number
  needed_approvals: number
}
export type I87u7jalc0lhah = {
  validators_for: {
    bytes: Uint8Array
    bitsLen: number
  }
  validators_against: {
    bytes: Uint8Array
    bitsLen: number
  }
  start: number
  concluded_at?: Anonymize<I4arjljr6dpflb>
}
export type I4p5t2krb1gmvp = [number, FixedSizeBinary<32>]
export type I5kqchhvguhfvt = {
  keys: Anonymize<Iqnbvitf7a7l3>
  kind: SlashingOffenceKind
}
export type Iqnbvitf7a7l3 = Array<Anonymize<I4p5t2krb1gmvp>>
export type SlashingOffenceKind = Enum<{
  ForInvalid: undefined
  AgainstValid: undefined
}>
export declare const SlashingOffenceKind: GetEnum<SlashingOffenceKind>
export type I4akf1ifqeclef = {
  core_index: number
  count: number
}
export type Ido5stnsbghtpd = {
  traffic: bigint
  next_index: number
  smallest_index: number
  freed_indices: Anonymize<Icgljjb6j82uhn>
}
export type I3ndpvu09rj685 = Array<{
  para_id: number
  idx: number
}>
export type Iafqnechp3omqg = Array<bigint>
export type I9dasmua8326io = {
  assignments: Anonymize<Idt36labebpqsd>
  end_hint?: Anonymize<I4arjljr6dpflb>
  next_schedule?: Anonymize<I4arjljr6dpflb>
}
export type Idt36labebpqsd = Array<[BrokerCoretimeInterfaceCoreAssignment, number]>
export type BrokerCoretimeInterfaceCoreAssignment = Enum<{
  Idle: undefined
  Pool: undefined
  Task: number
}>
export declare const BrokerCoretimeInterfaceCoreAssignment: GetEnum<BrokerCoretimeInterfaceCoreAssignment>
export type I3g90iebhds6kb = {
  queue?:
    | {
        first: number
        last: number
      }
    | undefined
  current_work?:
    | {
        assignments: Array<
          [
            BrokerCoretimeInterfaceCoreAssignment,
            {
              ratio: number
              remaining: number
            },
          ]
        >
        end_hint?: Anonymize<I4arjljr6dpflb>
        pos: number
        step: number
      }
    | undefined
}
export type I3av628q6dt6mq = {
  manager: SS58String
  deposit: bigint
  locked?: Anonymize<I8ie0dco0kcuq5>
}
export type I8ie0dco0kcuq5 = boolean | undefined
export type Ifmaahl40gom3g = Array<Anonymize<I92hdo1clkbp4g>>
export type I70iuri2ilha1f = FixedSizeArray<36, [SS58String, number, bigint] | undefined>
export type I6gun5k9fbb4s0 = {
  depositor: SS58String
  verifier?: Anonymize<I21lmi57mmu91l>
  deposit: bigint
  raised: bigint
  end: number
  cap: bigint
  last_contribution: CommonCrowdloanLastContribution
  first_period: number
  last_period: number
  fund_index: number
}
export type I21lmi57mmu91l = MultiSigner | undefined
export type MultiSigner = Enum<{
  Ed25519: FixedSizeBinary<32>
  Sr25519: FixedSizeBinary<32>
  Ecdsa: FixedSizeBinary<33>
}>
export declare const MultiSigner: GetEnum<MultiSigner>
export type CommonCrowdloanLastContribution = Enum<{
  Never: undefined
  PreEnding: number
  Ending: number
}>
export declare const CommonCrowdloanLastContribution: GetEnum<CommonCrowdloanLastContribution>
export type If354jrdedj0pj = {
  progress_top: Anonymize<I1ufmh6d8psvik>
  progress_child: Anonymize<I1ufmh6d8psvik>
  size: number
  top_items: number
  child_items: number
}
export type I1ufmh6d8psvik = AnonymousEnum<{
  ToStart: undefined
  LastKey: Binary
  Complete: undefined
}>
export type Ib17t3992hb64n = Anonymize<I215mkl885p4da> | undefined
export type I215mkl885p4da = {
  size: number
  item: number
}
export type XcmPalletQueryStatus = Enum<{
  Pending: {
    responder: PaseoXcmVersionedLocation
    maybe_match_querier?: PaseoXcmVersionedLocation | undefined
    maybe_notify?: Anonymize<I1faufi0iffstp>
    timeout: number
  }
  VersionNotifier: {
    origin: PaseoXcmVersionedLocation
    is_active: boolean
  }
  Ready: {
    response: XcmVersionedResponse
    at: number
  }
}>
export declare const XcmPalletQueryStatus: GetEnum<XcmPalletQueryStatus>
export type I1faufi0iffstp = FixedSizeBinary<2> | undefined
export type XcmVersionedResponse = Enum<{
  V2: XcmV2Response
  V3: XcmV3Response
  V4: XcmV4Response
}>
export declare const XcmVersionedResponse: GetEnum<XcmVersionedResponse>
export type XcmV2Response = Enum<{
  Null: undefined
  Assets: Anonymize<I2sllmucln1iic>
  ExecutionResult?: [number, XcmV2TraitsError] | undefined
  Version: number
}>
export declare const XcmV2Response: GetEnum<XcmV2Response>
export type XcmV2TraitsError = Enum<{
  Overflow: undefined
  Unimplemented: undefined
  UntrustedReserveLocation: undefined
  UntrustedTeleportLocation: undefined
  MultiLocationFull: undefined
  MultiLocationNotInvertible: undefined
  BadOrigin: undefined
  InvalidLocation: undefined
  AssetNotFound: undefined
  FailedToTransactAsset: undefined
  NotWithdrawable: undefined
  LocationCannotHold: undefined
  ExceedsMaxMessageSize: undefined
  DestinationUnsupported: undefined
  Transport: undefined
  Unroutable: undefined
  UnknownClaim: undefined
  FailedToDecode: undefined
  MaxWeightInvalid: undefined
  NotHoldingFees: undefined
  TooExpensive: undefined
  Trap: bigint
  UnhandledXcmVersion: undefined
  WeightLimitReached: bigint
  Barrier: undefined
  WeightNotComputable: undefined
}>
export declare const XcmV2TraitsError: GetEnum<XcmV2TraitsError>
export type XcmV3Response = Enum<{
  Null: undefined
  Assets: Anonymize<Iai6dhqiq3bach>
  ExecutionResult?: Anonymize<I7sltvf8v2nure>
  Version: number
  PalletsInfo: Anonymize<I599u7h20b52at>
  DispatchResult: XcmV3MaybeErrorCode
}>
export declare const XcmV3Response: GetEnum<XcmV3Response>
export type Ic4qvh5df9s5gp = [number, PaseoXcmVersionedLocation]
export type I7vlvrrl2pnbgk = [bigint, Anonymize<I4q39t5hn830vp>, number]
export type I50sjs3s5lud21 = Array<[PaseoXcmVersionedLocation, number]>
export type XcmPalletVersionMigrationStage = Enum<{
  MigrateSupportedVersion: undefined
  MigrateVersionNotifiers: undefined
  NotifyCurrentTargets?: Anonymize<Iabpgqcjikia83>
  MigrateAndNotifyOldTargets: undefined
}>
export declare const XcmPalletVersionMigrationStage: GetEnum<XcmPalletVersionMigrationStage>
export type I50qp0ij7h62g2 = {
  amount: bigint
  owner: PaseoXcmVersionedLocation
  locker: PaseoXcmVersionedLocation
  consumers: Anonymize<I2ia97v5nng96b>
}
export type I2ia97v5nng96b = Array<[undefined, bigint]>
export type Iteuj23is2ed5 = [number, SS58String, PaseoXcmVersionedAssetId]
export type PaseoXcmVersionedAssetId = Enum<{
  V3: XcmV3MultiassetAssetId
  V4: Anonymize<I4c0s5cioidn76>
}>
export declare const PaseoXcmVersionedAssetId: GetEnum<PaseoXcmVersionedAssetId>
export type I3rp19gb4dadaa = Array<[bigint, PaseoXcmVersionedLocation]>
export type I260m120dp9sbk = {
  begin: number
  end: number
  count: number
  ready_neighbours?:
    | {
        prev: ParachainsInclusionAggregateMessageOrigin
        next: ParachainsInclusionAggregateMessageOrigin
      }
    | undefined
  message_count: bigint
  size: bigint
}
export type I53esa2ms463bk = {
  remaining: number
  remaining_size: number
  first_index: number
  first: number
  last: number
  heap: Binary
}
export type I1lfimt2mpej64 = [ParachainsInclusionAggregateMessageOrigin, number]
export type I2fb54desdqd9n = Array<FixedSizeBinary<33>>
export type Idjett00s2gd = {
  id: bigint
  len: number
  keyset_commitment: FixedSizeBinary<32>
}
export type In7a38730s6qs = {
  base_block: Anonymize<I4q39t5hn830vp>
  max_block: Anonymize<I4q39t5hn830vp>
  per_class: {
    normal: {
      base_extrinsic: Anonymize<I4q39t5hn830vp>
      max_extrinsic?: Anonymize<Iasb8k6ash5mjn>
      max_total?: Anonymize<Iasb8k6ash5mjn>
      reserved?: Anonymize<Iasb8k6ash5mjn>
    }
    operational: {
      base_extrinsic: Anonymize<I4q39t5hn830vp>
      max_extrinsic?: Anonymize<Iasb8k6ash5mjn>
      max_total?: Anonymize<Iasb8k6ash5mjn>
      reserved?: Anonymize<Iasb8k6ash5mjn>
    }
    mandatory: {
      base_extrinsic: Anonymize<I4q39t5hn830vp>
      max_extrinsic?: Anonymize<Iasb8k6ash5mjn>
      max_total?: Anonymize<Iasb8k6ash5mjn>
      reserved?: Anonymize<Iasb8k6ash5mjn>
    }
  }
}
export type If15el53dd76v9 = {
  normal: number
  operational: number
  mandatory: number
}
export type I9s0ave7t0vnrk = {
  read: bigint
  write: bigint
}
export type Ic6nglu2db2c36 = {
  spec_name: string
  impl_name: string
  authoring_version: number
  spec_version: number
  impl_version: number
  apis: Anonymize<Ic9hg6pp5pkea5>
  transaction_version: number
  state_version: number
}
export type Ic9hg6pp5pkea5 = Array<[FixedSizeBinary<8>, number]>
export type Ibafpkl9hhno69 = Array<
  [
    number,
    {
      name: string
      max_deciding: number
      decision_deposit: bigint
      prepare_period: number
      decision_period: number
      confirm_period: number
      min_enactment_period: number
      min_approval: ReferendaTypesCurve
      min_support: ReferendaTypesCurve
    },
  ]
>
export type ReferendaTypesCurve = Enum<{
  LinearDecreasing: {
    length: number
    floor: number
    ceil: number
  }
  SteppedDecreasing: {
    begin: number
    end: number
    step: number
    period: number
  }
  Reciprocal: {
    factor: bigint
    x_offset: bigint
    y_offset: bigint
  }
}>
export declare const ReferendaTypesCurve: GetEnum<ReferendaTypesCurve>
export type Iekve0i6djpd9f = AnonymousEnum<{
  /**
   *Make some on-chain remark.
   *
   *Can be executed by every `origin`.
   */
  remark: Anonymize<I8ofcg5rbj0g2c>
  /**
   *Set the number of pages in the WebAssembly environment's heap.
   */
  set_heap_pages: Anonymize<I4adgbll7gku4i>
  /**
   *Set the new runtime code.
   */
  set_code: Anonymize<I6pjjpfvhvcfru>
  /**
   *Set the new runtime code without doing any checks of the given `code`.
   *
   *Note that runtime upgrades will not run if this is called with a not-increasing spec
   *version!
   */
  set_code_without_checks: Anonymize<I6pjjpfvhvcfru>
  /**
   *Set some items of storage.
   */
  set_storage: Anonymize<I9pj91mj79qekl>
  /**
   *Kill some items from storage.
   */
  kill_storage: Anonymize<I39uah9nss64h9>
  /**
   *Kill all storage items with a key that starts with the given prefix.
   *
   ***NOTE:** We rely on the Root origin to provide us the number of subkeys under
   *the prefix we are removing to accurately calculate the weight of this function.
   */
  kill_prefix: Anonymize<Ik64dknsq7k08>
  /**
   *Make some on-chain remark and emit event.
   */
  remark_with_event: Anonymize<I8ofcg5rbj0g2c>
  /**
   *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
   *later.
   *
   *This call requires Root origin.
   */
  authorize_upgrade: Anonymize<Ib51vk42m1po4n>
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
  authorize_upgrade_without_checks: Anonymize<Ib51vk42m1po4n>
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
  apply_authorized_upgrade: Anonymize<I6pjjpfvhvcfru>
}>
export type I8ofcg5rbj0g2c = {
  remark: Binary
}
export type I4adgbll7gku4i = {
  pages: bigint
}
export type I6pjjpfvhvcfru = {
  code: Binary
}
export type I9pj91mj79qekl = {
  items: Anonymize<I6pi5ou8r1hblk>
}
export type I6pi5ou8r1hblk = Array<FixedSizeArray<2, Binary>>
export type I39uah9nss64h9 = {
  keys: Anonymize<Itom7fk49o0c9>
}
export type Ik64dknsq7k08 = {
  prefix: Binary
  subkeys: number
}
export type Ib51vk42m1po4n = {
  code_hash: FixedSizeBinary<32>
}
export type I2tnpqo44cdqnb = AnonymousEnum<{
  /**
   *Anonymously schedule a task.
   */
  schedule: Anonymize<I2uq6qrdsvkuju>
  /**
   *Cancel an anonymously scheduled task.
   */
  cancel: Anonymize<I5n4sebgkfr760>
  /**
   *Schedule a named task.
   */
  schedule_named: Anonymize<Ichrrdrl9bf6tu>
  /**
   *Cancel a named scheduled task.
   */
  cancel_named: Anonymize<Ifs1i5fk9cqvr6>
  /**
   *Anonymously schedule a task after a delay.
   */
  schedule_after: Anonymize<I5ichh8ro4g582>
  /**
   *Schedule a named task after a delay.
   */
  schedule_named_after: Anonymize<I6lrkpripqgf54>
  /**
   *Set a retry configuration for a task so that, in case its scheduled run fails, it will
   *be retried after `period` blocks, for a total amount of `retries` retries or until it
   *succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry: Anonymize<Ieg3fd8p4pkt10>
  /**
   *Set a retry configuration for a named task so that, in case its scheduled run fails, it
   *will be retried after `period` blocks, for a total amount of `retries` retries or until
   *it succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry_named: Anonymize<I8kg5ll427kfqq>
  /**
   *Removes the retry configuration of a task.
   */
  cancel_retry: Anonymize<I467333262q1l9>
  /**
   *Cancel the retry configuration of a named task.
   */
  cancel_retry_named: Anonymize<Ifs1i5fk9cqvr6>
}>
export type I2uq6qrdsvkuju = {
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type Ichrrdrl9bf6tu = {
  id: FixedSizeBinary<32>
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type Ifs1i5fk9cqvr6 = {
  id: FixedSizeBinary<32>
}
export type I5ichh8ro4g582 = {
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I6lrkpripqgf54 = {
  id: FixedSizeBinary<32>
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type Ieg3fd8p4pkt10 = {
  task: Anonymize<I9jd27rnpm8ttv>
  retries: number
  period: number
}
export type I8kg5ll427kfqq = {
  id: FixedSizeBinary<32>
  retries: number
  period: number
}
export type I467333262q1l9 = {
  task: Anonymize<I9jd27rnpm8ttv>
}
export type If81ks88t5mpk5 = AnonymousEnum<{
  /**
   *Register a preimage on-chain.
   *
   *If the preimage was previously requested, no fees or deposits are taken for providing
   *the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
   */
  note_preimage: Anonymize<I82nfqfkd48n10>
  /**
   *Clear an unrequested preimage from the runtime storage.
   *
   *If `len` is provided, then it will be a much cheaper operation.
   *
   *- `hash`: The hash of the preimage to be removed from the store.
   *- `len`: The length of the preimage of `hash`.
   */
  unnote_preimage: Anonymize<I1jm8m1rh9e20v>
  /**
   *Request a preimage be uploaded to the chain without paying any fees or deposits.
   *
   *If the preimage requests has already been provided on-chain, we unreserve any deposit
   *a user may have paid, and take the control of the preimage out of their hands.
   */
  request_preimage: Anonymize<I1jm8m1rh9e20v>
  /**
   *Clear a previously made request for a preimage.
   *
   *NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
   */
  unrequest_preimage: Anonymize<I1jm8m1rh9e20v>
  /**
   *Ensure that the a bulk of pre-images is upgraded.
   *
   *The caller pays no fee if at least 90% of pre-images were successfully updated.
   */
  ensure_updated: Anonymize<I3o5j3bli1pd8e>
}>
export type I82nfqfkd48n10 = {
  bytes: Binary
}
export type I3o5j3bli1pd8e = {
  hashes: Anonymize<Ic5m5lp1oioo8r>
}
export type I1jeo0dpbkma5g = AnonymousEnum<{
  /**
   *Report authority equivocation/misbehavior. This method will verify
   *the equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence will
   *be reported.
   */
  report_equivocation: Anonymize<I50ppnqasq4tjq>
  /**
   *Report authority equivocation/misbehavior. This method will verify
   *the equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence will
   *be reported.
   *This extrinsic must be called unsigned and it is expected that only
   *block authors will call it (validated in `ValidateUnsigned`), as such
   *if the block author is defined it will be defined as the equivocation
   *reporter.
   */
  report_equivocation_unsigned: Anonymize<I50ppnqasq4tjq>
  /**
   *Plan an epoch config change. The epoch config change is recorded and will be enacted on
   *the next call to `enact_epoch_change`. The config will be activated one epoch after.
   *Multiple calls to this method will replace any existing planned config change that had
   *not been enacted yet.
   */
  plan_config_change: Anonymize<I9fin09kkg0jaj>
}>
export type I50ppnqasq4tjq = {
  equivocation_proof: Anonymize<I68ii5ik8avr9o>
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type I68ii5ik8avr9o = {
  offender: FixedSizeBinary<32>
  slot: bigint
  first_header: Anonymize<Ic952bubvq4k7d>
  second_header: Anonymize<Ic952bubvq4k7d>
}
export type Ic952bubvq4k7d = {
  parent_hash: FixedSizeBinary<32>
  number: number
  state_root: FixedSizeBinary<32>
  extrinsics_root: FixedSizeBinary<32>
  digest: Anonymize<I4mddgoa69c0a2>
}
export type I3ia7aufsoj0l1 = {
  session: number
  trie_nodes: Anonymize<Itom7fk49o0c9>
  validator_count: number
}
export type I9fin09kkg0jaj = {
  config: BabeDigestsNextConfigDescriptor
}
export type I7d75gqfg6jh9c = AnonymousEnum<{
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
  set: Anonymize<Idcr6u6361oad9>
}>
export type Idcr6u6361oad9 = {
  now: bigint
}
export type I66vlm8f4l1oll = AnonymousEnum<{
  /**
   *Assign an previously unassigned index.
   *
   *Payment: `Deposit` is reserved from the sender account.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `index`: the index to be claimed. This must not be in use.
   *
   *Emits `IndexAssigned` if successful.
   *
   *## Complexity
   *- `O(1)`.
   */
  claim: Anonymize<I666bl2fqjkejo>
  /**
   *Assign an index already owned by the sender to another account. The balance reservation
   *is effectively transferred to the new account.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `index`: the index to be re-assigned. This must be owned by the sender.
   *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
   *
   *Emits `IndexAssigned` if successful.
   *
   *## Complexity
   *- `O(1)`.
   */
  transfer: Anonymize<I6o1er683vod1j>
  /**
   *Free up an index owned by the sender.
   *
   *Payment: Any previous deposit placed for the index is unreserved in the sender account.
   *
   *The dispatch origin for this call must be _Signed_ and the sender must own the index.
   *
   *- `index`: the index to be freed. This must be owned by the sender.
   *
   *Emits `IndexFreed` if successful.
   *
   *## Complexity
   *- `O(1)`.
   */
  free: Anonymize<I666bl2fqjkejo>
  /**
   *Force an index to an account. This doesn't require a deposit. If the index is already
   *held, then any deposit is reimbursed to its current owner.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *- `index`: the index to be (re-)assigned.
   *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
   *- `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
   *
   *Emits `IndexAssigned` if successful.
   *
   *## Complexity
   *- `O(1)`.
   */
  force_transfer: Anonymize<I5bq561t4gpfva>
  /**
   *Freeze an index so it will always point to the sender account. This consumes the
   *deposit.
   *
   *The dispatch origin for this call must be _Signed_ and the signing account must have a
   *non-frozen account `index`.
   *
   *- `index`: the index to be frozen in place.
   *
   *Emits `IndexFrozen` if successful.
   *
   *## Complexity
   *- `O(1)`.
   */
  freeze: Anonymize<I666bl2fqjkejo>
}>
export type I6o1er683vod1j = {
  new: MultiAddress
  index: number
}
export type MultiAddress = Enum<{
  Id: SS58String
  Index: undefined
  Raw: Binary
  Address32: FixedSizeBinary<32>
  Address20: FixedSizeBinary<20>
}>
export declare const MultiAddress: GetEnum<MultiAddress>
export type I5bq561t4gpfva = {
  new: MultiAddress
  index: number
  freeze: boolean
}
export type I9svldsp29mh87 = AnonymousEnum<{
  /**
   *Transfer some liquid free balance to another account.
   *
   *`transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
   *If the sender's account is below the existential deposit as a result
   *of the transfer, the account will be reaped.
   *
   *The dispatch origin for this call must be `Signed` by the transactor.
   */
  transfer_allow_death: Anonymize<I4ktuaksf5i1gk>
  /**
   *Exactly as `transfer_allow_death`, except the origin must be root and the source account
   *may be specified.
   */
  force_transfer: Anonymize<I9bqtpv2ii35mp>
  /**
   *Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
   *kill the origin account.
   *
   *99% of the time you want [`transfer_allow_death`] instead.
   *
   *[`transfer_allow_death`]: struct.Pallet.html#method.transfer
   */
  transfer_keep_alive: Anonymize<I4ktuaksf5i1gk>
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
  transfer_all: Anonymize<I9j7pagd6d4bda>
  /**
   *Unreserve some balance from a user by force.
   *
   *Can only be called by ROOT.
   */
  force_unreserve: Anonymize<I2h9pmio37r7fb>
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
  upgrade_accounts: Anonymize<Ibmr18suc9ikh9>
  /**
   *Set the regular balance of a given account.
   *
   *The dispatch origin for this call is `root`.
   */
  force_set_balance: Anonymize<I9iq22t0burs89>
  /**
   *Adjust the total issuance in a saturating way.
   *
   *Can only be called by root and always needs a positive `delta`.
   *
   *# Example
   */
  force_adjust_total_issuance: Anonymize<I5u8olqbbvfnvf>
  /**
   *Burn the specified liquid free balance from the origin account.
   *
   *If the origin's account ends up below the existential deposit as a result
   *of the burn and `keep_alive` is false, the account will be reaped.
   *
   *Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
   *this `burn` operation will reduce total issuance by the amount _burned_.
   */
  burn: Anonymize<I5utcetro501ir>
}>
export type I4ktuaksf5i1gk = {
  dest: MultiAddress
  value: bigint
}
export type I9bqtpv2ii35mp = {
  source: MultiAddress
  dest: MultiAddress
  value: bigint
}
export type I9j7pagd6d4bda = {
  dest: MultiAddress
  keep_alive: boolean
}
export type I2h9pmio37r7fb = {
  who: MultiAddress
  amount: bigint
}
export type Ibmr18suc9ikh9 = {
  who: Anonymize<Ia2lhg7l2hilo3>
}
export type I9iq22t0burs89 = {
  who: MultiAddress
  new_free: bigint
}
export type I5u8olqbbvfnvf = {
  direction: BalancesAdjustmentDirection
  delta: bigint
}
export type BalancesAdjustmentDirection = Enum<{
  Increase: undefined
  Decrease: undefined
}>
export declare const BalancesAdjustmentDirection: GetEnum<BalancesAdjustmentDirection>
export type I5utcetro501ir = {
  value: bigint
  keep_alive: boolean
}
export type I43p3eod37a43i = AnonymousEnum<{
  /**
   *Take the origin account as a stash and lock up `value` of its balance. `controller` will
   *be the account that controls it.
   *
   *`value` must be more than the `minimum_balance` specified by `T::Currency`.
   *
   *The dispatch origin for this call must be _Signed_ by the stash account.
   *
   *Emits `Bonded`.
   *## Complexity
   *- Independent of the arguments. Moderate complexity.
   *- O(1).
   *- Three extra DB entries.
   *
   *NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
   *unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
   *as dust.
   */
  bond: Anonymize<I2eip8tc75dpje>
  /**
   *Add some extra amount that have appeared in the stash `free_balance` into the balance up
   *for staking.
   *
   *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   *
   *Use this if there are additional funds in your stash account that you wish to bond.
   *Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
   *any limitation on the amount that can be added.
   *
   *Emits `Bonded`.
   *
   *## Complexity
   *- Independent of the arguments. Insignificant complexity.
   *- O(1).
   */
  bond_extra: Anonymize<I564va64vtidbq>
  /**
   *Schedule a portion of the stash to be unlocked ready for transfer out after the bond
   *period ends. If this leaves an amount actively bonded less than
   *T::Currency::minimum_balance(), then it is increased to the full amount.
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *
   *Once the unlock period is done, you can call `withdraw_unbonded` to actually move
   *the funds out of management ready for transfer.
   *
   *No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
   *can co-exists at the same time. If there are no unlocking chunks slots available
   *[`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
   *
   *If a user encounters the `InsufficientBond` error when calling this extrinsic,
   *they should call `chill` first in order to free up their bonded funds.
   *
   *Emits `Unbonded`.
   *
   *See also [`Call::withdraw_unbonded`].
   */
  unbond: Anonymize<Ie5v6njpckr05b>
  /**
   *Remove any unlocked chunks from the `unlocking` queue from our management.
   *
   *This essentially frees up that balance to be used by the stash account to do whatever
   *it wants.
   *
   *The dispatch origin for this call must be _Signed_ by the controller.
   *
   *Emits `Withdrawn`.
   *
   *See also [`Call::unbond`].
   *
   *## Parameters
   *
   *- `num_slashing_spans` indicates the number of metadata slashing spans to clear when
   *this call results in a complete removal of all the data related to the stash account.
   *In this case, the `num_slashing_spans` must be larger or equal to the number of
   *slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
   *otherwise the call will fail. The call weight is directly proportional to
   *`num_slashing_spans`.
   *
   *## Complexity
   *O(S) where S is the number of slashing spans to remove
   *NOTE: Weight annotation is the kill scenario, we refund otherwise.
   */
  withdraw_unbonded: Anonymize<I328av3j0bgmjb>
  /**
   *Declare the desire to validate for the origin controller.
   *
   *Effects will be felt at the beginning of the next era.
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   */
  validate: Anonymize<I4tuqm9ato907i>
  /**
   *Declare the desire to nominate `targets` for the origin controller.
   *
   *Effects will be felt at the beginning of the next era.
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *
   *## Complexity
   *- The transaction's complexity is proportional to the size of `targets` (N)
   *which is capped at CompactAssignments::LIMIT (T::MaxNominations).
   *- Both the reads and writes follow a similar pattern.
   */
  nominate: Anonymize<Iagi89qt4h1lqg>
  /**
   *Declare no desire to either validate or nominate.
   *
   *Effects will be felt at the beginning of the next era.
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *
   *## Complexity
   *- Independent of the arguments. Insignificant complexity.
   *- Contains one read.
   *- Writes are limited to the `origin` account key.
   */
  chill: undefined
  /**
   *(Re-)set the payment target for a controller.
   *
   *Effects will be felt instantly (as soon as this function is completed successfully).
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *
   *## Complexity
   *- O(1)
   *- Independent of the arguments. Insignificant complexity.
   *- Contains a limited number of reads.
   *- Writes are limited to the `origin` account key.
   *---------
   */
  set_payee: Anonymize<I9dgmcnuamt5p8>
  /**
   *(Re-)sets the controller of a stash to the stash itself. This function previously
   *accepted a `controller` argument to set the controller to an account other than the
   *stash itself. This functionality has now been removed, now only setting the controller
   *to the stash, if it is not already.
   *
   *Effects will be felt instantly (as soon as this function is completed successfully).
   *
   *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
   *
   *## Complexity
   *O(1)
   *- Independent of the arguments. Insignificant complexity.
   *- Contains a limited number of reads.
   *- Writes are limited to the `origin` account key.
   */
  set_controller: undefined
  /**
   *Sets the ideal number of validators.
   *
   *The dispatch origin must be Root.
   *
   *## Complexity
   *O(1)
   */
  set_validator_count: Anonymize<I3vh014cqgmrfd>
  /**
   *Increments the ideal number of validators up to maximum of
   *`ElectionProviderBase::MaxWinners`.
   *
   *The dispatch origin must be Root.
   *
   *## Complexity
   *Same as [`Self::set_validator_count`].
   */
  increase_validator_count: Anonymize<Ifhs60omlhvt3>
  /**
   *Scale up the ideal number of validators by a factor up to maximum of
   *`ElectionProviderBase::MaxWinners`.
   *
   *The dispatch origin must be Root.
   *
   *## Complexity
   *Same as [`Self::set_validator_count`].
   */
  scale_validator_count: Anonymize<If34udpd5e57vi>
  /**
   *Force there to be no new eras indefinitely.
   *
   *The dispatch origin must be Root.
   *
   *# Warning
   *
   *The election process starts multiple blocks before the end of the era.
   *Thus the election process may be ongoing when this is called. In this case the
   *election will continue until the next era is triggered.
   *
   *## Complexity
   *- No arguments.
   *- Weight: O(1)
   */
  force_no_eras: undefined
  /**
   *Force there to be a new era at the end of the next session. After this, it will be
   *reset to normal (non-forced) behaviour.
   *
   *The dispatch origin must be Root.
   *
   *# Warning
   *
   *The election process starts multiple blocks before the end of the era.
   *If this is called just before a new era is triggered, the election process may not
   *have enough blocks to get a result.
   *
   *## Complexity
   *- No arguments.
   *- Weight: O(1)
   */
  force_new_era: undefined
  /**
   *Set the validators who cannot be slashed (if any).
   *
   *The dispatch origin must be Root.
   */
  set_invulnerables: Anonymize<I39t01nnod9109>
  /**
   *Force a current staker to become completely unstaked, immediately.
   *
   *The dispatch origin must be Root.
   *
   *## Parameters
   *
   *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
   *details.
   */
  force_unstake: Anonymize<Ie5vbnd9198quk>
  /**
   *Force there to be a new era at the end of sessions indefinitely.
   *
   *The dispatch origin must be Root.
   *
   *# Warning
   *
   *The election process starts multiple blocks before the end of the era.
   *If this is called just before a new era is triggered, the election process may not
   *have enough blocks to get a result.
   */
  force_new_era_always: undefined
  /**
   *Cancel enactment of a deferred slash.
   *
   *Can be called by the `T::AdminOrigin`.
   *
   *Parameters: era and indices of the slashes for that era to kill.
   */
  cancel_deferred_slash: Anonymize<I3h6murn8bd4v5>
  /**
   *Pay out next page of the stakers behind a validator for the given era.
   *
   *- `validator_stash` is the stash account of the validator.
   *- `era` may be any era between `[current_era - history_depth; current_era]`.
   *
   *The origin of this call must be _Signed_. Any account can call this function, even if
   *it is not one of the stakers.
   *
   *The reward payout could be paged in case there are too many nominators backing the
   *`validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
   *specific page, use `payout_stakers_by_page`.`
   *
   *If all pages are claimed, it returns an error `InvalidPage`.
   */
  payout_stakers: Anonymize<I6k6jf8ncesuu3>
  /**
   *Rebond a portion of the stash scheduled to be unlocked.
   *
   *The dispatch origin must be signed by the controller.
   *
   *## Complexity
   *- Time complexity: O(L), where L is unlocking chunks
   *- Bounded by `MaxUnlockingChunks`.
   */
  rebond: Anonymize<Ie5v6njpckr05b>
  /**
   *Remove all data structures concerning a staker/stash once it is at a state where it can
   *be considered `dust` in the staking system. The requirements are:
   *
   *1. the `total_balance` of the stash is below existential deposit.
   *2. or, the `ledger.total` of the stash is below existential deposit.
   *3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
   *
   *The former can happen in cases like a slash; the latter when a fully unbonded account
   *is still receiving staking rewards in `RewardDestination::Staked`.
   *
   *It can be called by anyone, as long as `stash` meets the above requirements.
   *
   *Refunds the transaction fees upon successful execution.
   *
   *## Parameters
   *
   *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
   *details.
   */
  reap_stash: Anonymize<Ie5vbnd9198quk>
  /**
   *Remove the given nominations from the calling validator.
   *
   *Effects will be felt at the beginning of the next era.
   *
   *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *
   *- `who`: A list of nominator stash accounts who are nominating this validator which
   *  should no longer be nominating this validator.
   *
   *Note: Making this call only makes sense if you first set the validator preferences to
   *block any further nominations.
   */
  kick: Anonymize<I3qhk481i120pk>
  /**
   *Update the various staking configurations .
   *
   ** `min_nominator_bond`: The minimum active bond needed to be a nominator.
   ** `min_validator_bond`: The minimum active bond needed to be a validator.
   ** `max_nominator_count`: The max number of users who can be a nominator at once. When
   *  set to `None`, no limit is enforced.
   ** `max_validator_count`: The max number of users who can be a validator at once. When
   *  set to `None`, no limit is enforced.
   ** `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
   *  should be filled in order for the `chill_other` transaction to work.
   ** `min_commission`: The minimum amount of commission that each validators must maintain.
   *  This is checked only upon calling `validate`. Existing validators are not affected.
   *
   *RuntimeOrigin must be Root to call this function.
   *
   *NOTE: Existing nominators and validators will not be affected by this update.
   *to kick people under the new limits, `chill_other` should be called.
   */
  set_staking_configs: Anonymize<If1qr0kbbl298c>
  /**
   *Declare a `controller` to stop participating as either a validator or nominator.
   *
   *Effects will be felt at the beginning of the next era.
   *
   *The dispatch origin for this call must be _Signed_, but can be called by anyone.
   *
   *If the caller is the same as the controller being targeted, then no further checks are
   *enforced, and this function behaves just like `chill`.
   *
   *If the caller is different than the controller being targeted, the following conditions
   *must be met:
   *
   ** `controller` must belong to a nominator who has become non-decodable,
   *
   *Or:
   *
   ** A `ChillThreshold` must be set and checked which defines how close to the max
   *  nominators or validators we must reach before users can start chilling one-another.
   ** A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
   *  how close we are to the threshold.
   ** A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
   *  if this is a person that should be chilled because they have not met the threshold
   *  bond required.
   *
   *This can be helpful if bond requirements are updated, and we need to remove old users
   *who do not satisfy these requirements.
   */
  chill_other: Anonymize<Idl3umm12u5pa>
  /**
   *Force a validator to have at least the minimum commission. This will not affect a
   *validator who already has a commission greater than or equal to the minimum. Any account
   *can call this.
   */
  force_apply_min_commission: Anonymize<I5ont0141q9ss5>
  /**
   *Sets the minimum amount of commission that each validators must maintain.
   *
   *This call has lower privilege requirements than `set_staking_config` and can be called
   *by the `T::AdminOrigin`. Root can always call this.
   */
  set_min_commission: Anonymize<I3vh014cqgmrfd>
  /**
   *Pay out a page of the stakers behind a validator for the given era and page.
   *
   *- `validator_stash` is the stash account of the validator.
   *- `era` may be any era between `[current_era - history_depth; current_era]`.
   *- `page` is the page index of nominators to pay out with value between 0 and
   *  `num_nominators / T::MaxExposurePageSize`.
   *
   *The origin of this call must be _Signed_. Any account can call this function, even if
   *it is not one of the stakers.
   *
   *If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
   *them, then the list of nominators is paged, with each page being capped at
   *[`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
   *the call needs to be made for each page separately in order for all the nominators
   *backing a validator to receive the reward. The nominators are not sorted across pages
   *and so it should not be assumed the highest staker would be on the topmost page and vice
   *versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
   */
  payout_stakers_by_page: Anonymize<Ie6j49utvii126>
  /**
   *Migrates an account's `RewardDestination::Controller` to
   *`RewardDestination::Account(controller)`.
   *
   *Effects will be felt instantly (as soon as this function is completed successfully).
   *
   *This will waive the transaction fee if the `payee` is successfully migrated.
   */
  update_payee: Anonymize<I3v6ks33uluhnj>
  /**
   *Updates a batch of controller accounts to their corresponding stash account if they are
   *not the same. Ignores any controller accounts that do not exist, and does not operate if
   *the stash and controller are already the same.
   *
   *Effects will be felt instantly (as soon as this function is completed successfully).
   *
   *The dispatch origin must be `T::AdminOrigin`.
   */
  deprecate_controller_batch: Anonymize<I3kiiim1cds68i>
  /**
   *Restores the state of a ledger which is in an inconsistent state.
   *
   *The requirements to restore a ledger are the following:
   ** The stash is bonded; or
   ** The stash is not bonded but it has a staking lock left behind; or
   ** If the stash has an associated ledger and its state is inconsistent; or
   ** If the ledger is not corrupted *but* its staking lock is out of sync.
   *
   *The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
   *ledger associated with the stash. If the input parameters are not set, the ledger will
   *be reset values from on-chain state.
   */
  restore_ledger: Anonymize<I4k60mkh2r6jjg>
  /**
   *Adjusts the staking ledger by withdrawing any excess staked amount.
   *
   *This function corrects cases where a user's recorded stake in the ledger
   *exceeds their actual staked funds. This situation can arise due to cases such as
   *external slashing by another pallet, leading to an inconsistency between the ledger
   *and the actual stake.
   */
  withdraw_overstake: Anonymize<Idl3umm12u5pa>
}>
export type I2eip8tc75dpje = {
  value: bigint
  payee: StakingRewardDestination
}
export type I564va64vtidbq = {
  max_additional: bigint
}
export type I328av3j0bgmjb = {
  num_slashing_spans: number
}
export type I4tuqm9ato907i = {
  prefs: Anonymize<I9o7ssi9vmhmgr>
}
export type Iagi89qt4h1lqg = {
  targets: Anonymize<I28gn91b2ttnbk>
}
export type I28gn91b2ttnbk = Array<MultiAddress>
export type I9dgmcnuamt5p8 = {
  payee: StakingRewardDestination
}
export type I3vh014cqgmrfd = {
  new: number
}
export type Ifhs60omlhvt3 = {
  additional: number
}
export type If34udpd5e57vi = {
  factor: number
}
export type I39t01nnod9109 = {
  invulnerables: Anonymize<Ia2lhg7l2hilo3>
}
export type Ie5vbnd9198quk = {
  stash: SS58String
  num_slashing_spans: number
}
export type I3h6murn8bd4v5 = {
  era: number
  slash_indices: Anonymize<Icgljjb6j82uhn>
}
export type I6k6jf8ncesuu3 = {
  validator_stash: SS58String
  era: number
}
export type I3qhk481i120pk = {
  who: Anonymize<I28gn91b2ttnbk>
}
export type If1qr0kbbl298c = {
  min_nominator_bond: StakingPalletConfigOpBig
  min_validator_bond: StakingPalletConfigOpBig
  max_nominator_count: StakingPalletConfigOp
  max_validator_count: StakingPalletConfigOp
  chill_threshold: StakingPalletConfigOp
  min_commission: StakingPalletConfigOp
  max_staked_rewards: StakingPalletConfigOp
}
export type StakingPalletConfigOpBig = Enum<{
  Noop: undefined
  Set: bigint
  Remove: undefined
}>
export declare const StakingPalletConfigOpBig: GetEnum<StakingPalletConfigOpBig>
export type StakingPalletConfigOp = Enum<{
  Noop: undefined
  Set: number
  Remove: undefined
}>
export declare const StakingPalletConfigOp: GetEnum<StakingPalletConfigOp>
export type I5ont0141q9ss5 = {
  validator_stash: SS58String
}
export type Ie6j49utvii126 = {
  validator_stash: SS58String
  era: number
  page: number
}
export type I3v6ks33uluhnj = {
  controller: SS58String
}
export type I3kiiim1cds68i = {
  controllers: Anonymize<Ia2lhg7l2hilo3>
}
export type I4k60mkh2r6jjg = {
  stash: SS58String
  maybe_controller?: Anonymize<Ihfphjolmsqq1>
  maybe_total?: Anonymize<I35p85j063s0il>
  maybe_unlocking?: Anonymize<I9nc4v1upo2c8e> | undefined
}
export type Iceajactc9a8pc = AnonymousEnum<{
  /**
   *Sets the session key(s) of the function caller to `keys`.
   *Allows an account to set its session key prior to becoming a validator.
   *This doesn't take effect until the next session.
   *
   *The dispatch origin of this function must be signed.
   *
   *## Complexity
   *- `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
   *  fixed.
   */
  set_keys: Anonymize<I5oi8saufice6j>
  /**
   *Removes any session key(s) of the function caller.
   *
   *This doesn't take effect until the next session.
   *
   *The dispatch origin of this function must be Signed and the account must be either be
   *convertible to a validator ID using the chain's typical addressing system (this usually
   *means being a controller account) or directly convertible into a validator ID (which
   *usually means being a stash account).
   *
   *## Complexity
   *- `O(1)` in number of key types. Actual cost depends on the number of length of
   *  `T::Keys::key_ids()` which is fixed.
   */
  purge_keys: undefined
}>
export type I5oi8saufice6j = {
  keys: Anonymize<I9kr8cseidc66h>
  proof: Binary
}
export type I5u9ggmn8umfqm = AnonymousEnum<{
  /**
   *Report voter equivocation/misbehavior. This method will verify the
   *equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence
   *will be reported.
   */
  report_equivocation: Anonymize<I7ne83r38c2sqq>
  /**
   *Report voter equivocation/misbehavior. This method will verify the
   *equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence
   *will be reported.
   *
   *This extrinsic must be called unsigned and it is expected that only
   *block authors will call it (validated in `ValidateUnsigned`), as such
   *if the block author is defined it will be defined as the equivocation
   *reporter.
   */
  report_equivocation_unsigned: Anonymize<I7ne83r38c2sqq>
  /**
   *Note that the current authority set of the GRANDPA finality gadget has stalled.
   *
   *This will trigger a forced authority set change at the beginning of the next session, to
   *be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
   *that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
   *The block production rate (which may be slowed down because of finality lagging) should
   *be taken into account when choosing the `delay`. The GRANDPA voters based on the new
   *authority will start voting on top of `best_finalized_block_number` for new finalized
   *blocks. `best_finalized_block_number` should be the highest of the latest finalized
   *block of all validators of the new authority set.
   *
   *Only callable by root.
   */
  note_stalled: Anonymize<I2hviml3snvhhn>
}>
export type I7ne83r38c2sqq = {
  equivocation_proof: Anonymize<I9puqgoda8ofk4>
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type I9puqgoda8ofk4 = {
  set_id: bigint
  equivocation: GrandpaEquivocation
}
export type GrandpaEquivocation = Enum<{
  Prevote: {
    round_number: bigint
    identity: FixedSizeBinary<32>
    first: [
      {
        target_hash: FixedSizeBinary<32>
        target_number: number
      },
      FixedSizeBinary<64>,
    ]
    second: [
      {
        target_hash: FixedSizeBinary<32>
        target_number: number
      },
      FixedSizeBinary<64>,
    ]
  }
  Precommit: {
    round_number: bigint
    identity: FixedSizeBinary<32>
    first: [
      {
        target_hash: FixedSizeBinary<32>
        target_number: number
      },
      FixedSizeBinary<64>,
    ]
    second: [
      {
        target_hash: FixedSizeBinary<32>
        target_number: number
      },
      FixedSizeBinary<64>,
    ]
  }
}>
export declare const GrandpaEquivocation: GetEnum<GrandpaEquivocation>
export type I2hviml3snvhhn = {
  delay: number
  best_finalized_block_number: number
}
export type I1s28h18nhih63 = AnonymousEnum<{
  /**
   *Propose and approve a spend of treasury funds.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
   *
   *### Details
   *NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
   *beneficiary.
   *
   *### Parameters
   *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
   *- `beneficiary`: The destination account for the transfer.
   *
   *## Events
   *
   *Emits [`Event::SpendApproved`] if successful.
   */
  spend_local: Anonymize<Icnrv1mfbd3in1>
  /**
   *Force a previously approved proposal to be removed from the approval queue.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::RejectOrigin`].
   *
   *## Details
   *
   *The original deposit will no longer be returned.
   *
   *### Parameters
   *- `proposal_id`: The index of a proposal
   *
   *### Complexity
   *- O(A) where `A` is the number of approvals
   *
   *### Errors
   *- [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
   *  approval queue, i.e., the proposal has not been approved. This could also mean the
   *  proposal does not exist altogether, thus there is no way it would have been approved
   *  in the first place.
   */
  remove_approval: Anonymize<Icm9m0qeemu66d>
  /**
   *Propose and approve a spend of treasury funds.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::SpendOrigin`] with the `Success` value being at least
   *`amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
   *for assertion using the [`Config::BalanceConverter`].
   *
   *## Details
   *
   *Create an approved spend for transferring a specific `amount` of `asset_kind` to a
   *designated beneficiary. The spend must be claimed using the `payout` dispatchable within
   *the [`Config::PayoutPeriod`].
   *
   *### Parameters
   *- `asset_kind`: An indicator of the specific asset class to be spent.
   *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
   *- `beneficiary`: The beneficiary of the spend.
   *- `valid_from`: The block number from which the spend can be claimed. It can refer to
   *  the past if the resulting spend has not yet expired according to the
   *  [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
   *  approval.
   *
   *## Events
   *
   *Emits [`Event::AssetSpendApproved`] if successful.
   */
  spend: Anonymize<Ibv74ul0c0qf0f>
  /**
   *Claim a spend.
   *
   *## Dispatch Origin
   *
   *Must be signed
   *
   *## Details
   *
   *Spends must be claimed within some temporal bounds. A spend may be claimed within one
   *[`Config::PayoutPeriod`] from the `valid_from` block.
   *In case of a payout failure, the spend status must be updated with the `check_status`
   *dispatchable before retrying with the current function.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::Paid`] if successful.
   */
  payout: Anonymize<I666bl2fqjkejo>
  /**
   *Check the status of the spend and remove it from the storage if processed.
   *
   *## Dispatch Origin
   *
   *Must be signed.
   *
   *## Details
   *
   *The status check is a prerequisite for retrying a failed payout.
   *If a spend has either succeeded or expired, it is removed from the storage by this
   *function. In such instances, transaction fees are refunded.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::PaymentFailed`] if the spend payout has failed.
   *Emits [`Event::SpendProcessed`] if the spend payout has succeed.
   */
  check_status: Anonymize<I666bl2fqjkejo>
  /**
   *Void previously approved spend.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::RejectOrigin`].
   *
   *## Details
   *
   *A spend void is only possible if the payout has not been attempted yet.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::AssetSpendVoided`] if successful.
   */
  void_spend: Anonymize<I666bl2fqjkejo>
}>
export type Icnrv1mfbd3in1 = {
  amount: bigint
  beneficiary: MultiAddress
}
export type Icm9m0qeemu66d = {
  proposal_id: number
}
export type Ibv74ul0c0qf0f = {
  asset_kind: VersionedLocatableAsset
  amount: bigint
  beneficiary: PaseoXcmVersionedLocation
  valid_from?: Anonymize<I4arjljr6dpflb>
}
export type Ie5kd08tutk56t = AnonymousEnum<{
  /**
   *Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
   *otherwise it is a vote to keep the status quo.
   *
   *The dispatch origin of this call must be _Signed_.
   *
   *- `poll_index`: The index of the poll to vote for.
   *- `vote`: The vote configuration.
   *
   *Weight: `O(R)` where R is the number of polls the voter has voted on.
   */
  vote: Anonymize<Idnsr2pndm36h0>
  /**
   *Delegate the voting power (with some given conviction) of the sending account for a
   *particular class of polls.
   *
   *The balance delegated is locked for as long as it's delegated, and thereafter for the
   *time appropriate for the conviction's lock period.
   *
   *The dispatch origin of this call must be _Signed_, and the signing account must either:
   *  - be delegating already; or
   *  - have no voting activity (if there is, then it will need to be removed through
   *    `remove_vote`).
   *
   *- `to`: The account whose voting the `target` account's voting power will follow.
   *- `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
   *  to this function are required.
   *- `conviction`: The conviction that will be attached to the delegated votes. When the
   *  account is undelegated, the funds will be locked for the corresponding period.
   *- `balance`: The amount of the account's balance to be used in delegating. This must not
   *  be more than the account's current balance.
   *
   *Emits `Delegated`.
   *
   *Weight: `O(R)` where R is the number of polls the voter delegating to has
   *  voted on. Weight is initially charged as if maximum votes, but is refunded later.
   */
  delegate: Anonymize<Ia1pvdcbhuqf8m>
  /**
   *Undelegate the voting power of the sending account for a particular class of polls.
   *
   *Tokens may be unlocked following once an amount of time consistent with the lock period
   *of the conviction with which the delegation was issued has passed.
   *
   *The dispatch origin of this call must be _Signed_ and the signing account must be
   *currently delegating.
   *
   *- `class`: The class of polls to remove the delegation from.
   *
   *Emits `Undelegated`.
   *
   *Weight: `O(R)` where R is the number of polls the voter delegating to has
   *  voted on. Weight is initially charged as if maximum votes, but is refunded later.
   */
  undelegate: Anonymize<I8steo882k7qns>
  /**
   *Remove the lock caused by prior voting/delegating which has expired within a particular
   *class.
   *
   *The dispatch origin of this call must be _Signed_.
   *
   *- `class`: The class of polls to unlock.
   *- `target`: The account to remove the lock on.
   *
   *Weight: `O(R)` with R number of vote of target.
   */
  unlock: Anonymize<I4pa4q37gj6fua>
  /**
   *Remove a vote for a poll.
   *
   *If:
   *- the poll was cancelled, or
   *- the poll is ongoing, or
   *- the poll has ended such that
   *  - the vote of the account was in opposition to the result; or
   *  - there was no conviction to the account's vote; or
   *  - the account made a split vote
   *...then the vote is removed cleanly and a following call to `unlock` may result in more
   *funds being available.
   *
   *If, however, the poll has ended and:
   *- it finished corresponding to the vote of the account, and
   *- the account made a standard vote with conviction, and
   *- the lock period of the conviction is not over
   *...then the lock will be aggregated into the overall account's lock, which may involve
   **overlocking* (where the two locks are combined into a single lock that is the maximum
   *of both the amount locked and the time is it locked for).
   *
   *The dispatch origin of this call must be _Signed_, and the signer must have a vote
   *registered for poll `index`.
   *
   *- `index`: The index of poll of the vote to be removed.
   *- `class`: Optional parameter, if given it indicates the class of the poll. For polls
   *  which have finished or are cancelled, this must be `Some`.
   *
   *Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
   *  Weight is calculated for the maximum number of vote.
   */
  remove_vote: Anonymize<I5f178ab6b89t3>
  /**
   *Remove a vote for a poll.
   *
   *If the `target` is equal to the signer, then this function is exactly equivalent to
   *`remove_vote`. If not equal to the signer, then the vote must have expired,
   *either because the poll was cancelled, because the voter lost the poll or
   *because the conviction period is over.
   *
   *The dispatch origin of this call must be _Signed_.
   *
   *- `target`: The account of the vote to be removed; this account must have voted for poll
   *  `index`.
   *- `index`: The index of poll of the vote to be removed.
   *- `class`: The class of the poll.
   *
   *Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
   *  Weight is calculated for the maximum number of vote.
   */
  remove_other_vote: Anonymize<I4nakhtbsk3c5s>
}>
export type Idnsr2pndm36h0 = {
  poll_index: number
  vote: ConvictionVotingVoteAccountVote
}
export type Ia1pvdcbhuqf8m = {
  class: number
  to: MultiAddress
  conviction: VotingConviction
  balance: bigint
}
export type I8steo882k7qns = {
  class: number
}
export type I4pa4q37gj6fua = {
  class: number
  target: MultiAddress
}
export type I5f178ab6b89t3 = {
  class?: Anonymize<I4arjljr6dpflb>
  index: number
}
export type I4nakhtbsk3c5s = {
  target: MultiAddress
  class: number
  index: number
}
export type I657vbelok0a1m = AnonymousEnum<{
  /**
   *Propose a referendum on a privileged action.
   *
   *- `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
   *  available.
   *- `proposal_origin`: The origin from which the proposal should be executed.
   *- `proposal`: The proposal.
   *- `enactment_moment`: The moment that the proposal should be enacted.
   *
   *Emits `Submitted`.
   */
  submit: Anonymize<Ici1c3ahlkpcj1>
  /**
   *Post the Decision Deposit for a referendum.
   *
   *- `origin`: must be `Signed` and the account must have funds available for the
   *  referendum's track's Decision Deposit.
   *- `index`: The index of the submitted referendum whose Decision Deposit is yet to be
   *  posted.
   *
   *Emits `DecisionDepositPlaced`.
   */
  place_decision_deposit: Anonymize<I666bl2fqjkejo>
  /**
   *Refund the Decision Deposit for a closed referendum back to the depositor.
   *
   *- `origin`: must be `Signed` or `Root`.
   *- `index`: The index of a closed referendum whose Decision Deposit has not yet been
   *  refunded.
   *
   *Emits `DecisionDepositRefunded`.
   */
  refund_decision_deposit: Anonymize<I666bl2fqjkejo>
  /**
   *Cancel an ongoing referendum.
   *
   *- `origin`: must be the `CancelOrigin`.
   *- `index`: The index of the referendum to be cancelled.
   *
   *Emits `Cancelled`.
   */
  cancel: Anonymize<I666bl2fqjkejo>
  /**
   *Cancel an ongoing referendum and slash the deposits.
   *
   *- `origin`: must be the `KillOrigin`.
   *- `index`: The index of the referendum to be cancelled.
   *
   *Emits `Killed` and `DepositSlashed`.
   */
  kill: Anonymize<I666bl2fqjkejo>
  /**
   *Advance a referendum onto its next logical state. Only used internally.
   *
   *- `origin`: must be `Root`.
   *- `index`: the referendum to be advanced.
   */
  nudge_referendum: Anonymize<I666bl2fqjkejo>
  /**
   *Advance a track onto its next logical state. Only used internally.
   *
   *- `origin`: must be `Root`.
   *- `track`: the track to be advanced.
   *
   *Action item for when there is now one fewer referendum in the deciding phase and the
   *`DecidingCount` is not yet updated. This means that we should either:
   *- begin deciding another referendum (and leave `DecidingCount` alone); or
   *- decrement `DecidingCount`.
   */
  one_fewer_deciding: Anonymize<Icbio0e1f0034b>
  /**
   *Refund the Submission Deposit for a closed referendum back to the depositor.
   *
   *- `origin`: must be `Signed` or `Root`.
   *- `index`: The index of a closed referendum whose Submission Deposit has not yet been
   *  refunded.
   *
   *Emits `SubmissionDepositRefunded`.
   */
  refund_submission_deposit: Anonymize<I666bl2fqjkejo>
  /**
   *Set or clear metadata of a referendum.
   *
   *Parameters:
   *- `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
   *  metadata of a finished referendum.
   *- `index`:  The index of a referendum to set or clear metadata for.
   *- `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
   */
  set_metadata: Anonymize<I8c0vkqjjipnuj>
}>
export type Ici1c3ahlkpcj1 = {
  proposal_origin: PolkadotRuntimeOriginCaller
  proposal: PreimagesBounded
  enactment_moment: TraitsScheduleDispatchTime
}
export type Icbio0e1f0034b = {
  track: number
}
export type I8c0vkqjjipnuj = {
  index: number
  maybe_hash?: Anonymize<I4s6vifaf8k998>
}
export type Iak3vuv8a1mgfv = AnonymousEnum<{
  whitelist_call: Anonymize<I1adbcfi5uc62r>
  remove_whitelisted_call: Anonymize<I1adbcfi5uc62r>
  dispatch_whitelisted_call: Anonymize<Ibf6ucefn8fh49>
  dispatch_whitelisted_call_with_preimage: Anonymize<Id5stappeln7cb>
}>
export type Ibf6ucefn8fh49 = {
  call_hash: FixedSizeBinary<32>
  call_encoded_len: number
  call_weight_witness: Anonymize<I4q39t5hn830vp>
}
export type Id5stappeln7cb = {
  call: TxCallData
}
export type Ic5v5ffa0cr70p = AnonymousEnum<{
  /**
   *Set the value of a parameter.
   *
   *The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
   *deleted by setting them to `None`.
   */
  set_parameter: Anonymize<I9j2r9vmc9atsu>
}>
export type I9j2r9vmc9atsu = {
  key_value: Enum<{
    Inflation: Enum<{
      MinInflation: FixedSizeArray<1, Anonymize<I35p85j063s0il>>
      MaxInflation: FixedSizeArray<1, Anonymize<I35p85j063s0il>>
      IdealStake: FixedSizeArray<1, Anonymize<I35p85j063s0il>>
      Falloff: FixedSizeArray<1, Anonymize<I35p85j063s0il>>
      UseAuctionSlots: FixedSizeArray<1, Anonymize<I8ie0dco0kcuq5>>
    }>
  }>
}
export type Id0dj18ct09hlp = AnonymousEnum<{
  /**
   *Make a claim to collect your DOTs.
   *
   *The dispatch origin for this call must be _None_.
   *
   *Unsigned Validation:
   *A call to claim is deemed valid if the signature provided matches
   *the expected signed message of:
   *
   *> Ethereum Signed Message:
   *> (configured prefix string)(address)
   *
   *and `address` matches the `dest` account.
   *
   *Parameters:
   *- `dest`: The destination account to payout the claim.
   *- `ethereum_signature`: The signature of an ethereum signed message matching the format
   *  described above.
   *
   *<weight>
   *The weight of this call is invariant over the input parameters.
   *Weight includes logic to validate unsigned `claim` call.
   *
   *Total Complexity: O(1)
   *</weight>
   */
  claim: Anonymize<I6uag8j5aql8q>
  /**
   *Mint a new claim to collect DOTs.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *Parameters:
   *- `who`: The Ethereum address allowed to collect this claim.
   *- `value`: The number of DOTs that will be claimed.
   *- `vesting_schedule`: An optional vesting schedule for these DOTs.
   *
   *<weight>
   *The weight of this call is invariant over the input parameters.
   *We assume worst case that both vesting and statement is being inserted.
   *
   *Total Complexity: O(1)
   *</weight>
   */
  mint_claim: Anonymize<Isq3k9rh2c0l4>
  /**
   *Make a claim to collect your DOTs by signing a statement.
   *
   *The dispatch origin for this call must be _None_.
   *
   *Unsigned Validation:
   *A call to `claim_attest` is deemed valid if the signature provided matches
   *the expected signed message of:
   *
   *> Ethereum Signed Message:
   *> (configured prefix string)(address)(statement)
   *
   *and `address` matches the `dest` account; the `statement` must match that which is
   *expected according to your purchase arrangement.
   *
   *Parameters:
   *- `dest`: The destination account to payout the claim.
   *- `ethereum_signature`: The signature of an ethereum signed message matching the format
   *  described above.
   *- `statement`: The identity of the statement which is being attested to in the
   *  signature.
   *
   *<weight>
   *The weight of this call is invariant over the input parameters.
   *Weight includes logic to validate unsigned `claim_attest` call.
   *
   *Total Complexity: O(1)
   *</weight>
   */
  claim_attest: Anonymize<I1dqiovk0tpoah>
  /**
   *Attest to a statement, needed to finalize the claims process.
   *
   *WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
   *`SignedExtension`.
   *
   *Unsigned Validation:
   *A call to attest is deemed valid if the sender has a `Preclaim` registered
   *and provides a `statement` which is expected for the account.
   *
   *Parameters:
   *- `statement`: The identity of the statement which is being attested to in the
   *  signature.
   *
   *<weight>
   *The weight of this call is invariant over the input parameters.
   *Weight includes logic to do pre-validation on `attest` call.
   *
   *Total Complexity: O(1)
   *</weight>
   */
  attest: Anonymize<I1ntko0oih7v1a>
  move_claim: Anonymize<I2tf5qmg09624f>
}>
export type I6uag8j5aql8q = {
  dest: SS58String
  ethereum_signature: FixedSizeBinary<65>
}
export type Isq3k9rh2c0l4 = {
  who: FixedSizeBinary<20>
  value: bigint
  vesting_schedule?: Anonymize<I2phecamkn3pej> | undefined
  statement?: ClaimsStatementKind | undefined
}
export type I1dqiovk0tpoah = {
  dest: SS58String
  ethereum_signature: FixedSizeBinary<65>
  statement: Binary
}
export type I1ntko0oih7v1a = {
  statement: Binary
}
export type I2tf5qmg09624f = {
  old: FixedSizeBinary<20>
  new: FixedSizeBinary<20>
  maybe_preclaim?: Anonymize<Ihfphjolmsqq1>
}
export type Icgf8vmtkbnu4u = AnonymousEnum<{
  /**
   *Unlock any vested funds of the sender account.
   *
   *The dispatch origin for this call must be _Signed_ and the sender must have funds still
   *locked under this pallet.
   *
   *Emits either `VestingCompleted` or `VestingUpdated`.
   *
   *## Complexity
   *- `O(1)`.
   */
  vest: undefined
  /**
   *Unlock any vested funds of a `target` account.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `target`: The account whose vested funds should be unlocked. Must have funds still
   *locked under this pallet.
   *
   *Emits either `VestingCompleted` or `VestingUpdated`.
   *
   *## Complexity
   *- `O(1)`.
   */
  vest_other: Anonymize<Id9uqtigc0il3v>
  /**
   *Create a vested transfer.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `target`: The account receiving the vested funds.
   *- `schedule`: The vesting schedule attached to the transfer.
   *
   *Emits `VestingCreated`.
   *
   *NOTE: This will unlock all schedules through the current block.
   *
   *## Complexity
   *- `O(1)`.
   */
  vested_transfer: Anonymize<Iaa2o6cgjdpdn5>
  /**
   *Force a vested transfer.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *- `source`: The account whose funds should be transferred.
   *- `target`: The account that should be transferred the vested funds.
   *- `schedule`: The vesting schedule attached to the transfer.
   *
   *Emits `VestingCreated`.
   *
   *NOTE: This will unlock all schedules through the current block.
   *
   *## Complexity
   *- `O(1)`.
   */
  force_vested_transfer: Anonymize<Iam6hrl7ptd85l>
  /**
   *Merge two vesting schedules together, creating a new vesting schedule that unlocks over
   *the highest possible start and end blocks. If both schedules have already started the
   *current block will be used as the schedule start; with the caveat that if one schedule
   *is finished by the current block, the other will be treated as the new merged schedule,
   *unmodified.
   *
   *NOTE: If `schedule1_index == schedule2_index` this is a no-op.
   *NOTE: This will unlock all schedules through the current block prior to merging.
   *NOTE: If both schedules have ended by the current block, no new schedule will be created
   *and both will be removed.
   *
   *Merged schedule attributes:
   *- `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
   *  current_block)`.
   *- `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
   *- `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `schedule1_index`: index of the first schedule to merge.
   *- `schedule2_index`: index of the second schedule to merge.
   */
  merge_schedules: Anonymize<Ict9ivhr2c5hv0>
  /**
   *Force remove a vesting schedule
   *
   *The dispatch origin for this call must be _Root_.
   *
   *- `target`: An account that has a vesting schedule
   *- `schedule_index`: The vesting schedule index that should be removed
   */
  force_remove_vesting_schedule: Anonymize<I8t4vv03357lk9>
}>
export type Id9uqtigc0il3v = {
  target: MultiAddress
}
export type Iaa2o6cgjdpdn5 = {
  target: MultiAddress
  schedule: Anonymize<I4aro1m78pdrtt>
}
export type Iam6hrl7ptd85l = {
  source: MultiAddress
  target: MultiAddress
  schedule: Anonymize<I4aro1m78pdrtt>
}
export type Ict9ivhr2c5hv0 = {
  schedule1_index: number
  schedule2_index: number
}
export type I8t4vv03357lk9 = {
  target: MultiAddress
  schedule_index: number
}
export type I9gkib66u3t8ci = AnonymousEnum<{
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
  batch: Anonymize<I4nb01eacqov6l>
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
  as_derivative: Anonymize<Iecl8plhq7qh1b>
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
  batch_all: Anonymize<I4nb01eacqov6l>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<I279r3q210l87h>
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
  force_batch: Anonymize<I4nb01eacqov6l>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<Ie51nb7b7usk0>
}>
export type I4nb01eacqov6l = {
  calls: Array<TxCallData>
}
export type Iecl8plhq7qh1b = {
  index: number
  call: TxCallData
}
export type I279r3q210l87h = {
  as_origin: PolkadotRuntimeOriginCaller
  call: TxCallData
}
export type Ie51nb7b7usk0 = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type I4v0vcfbktbouk = AnonymousEnum<{
  /**
   *Dispatch the given `call` from an account that the sender is authorised for through
   *`add_proxy`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy: Anonymize<Ieptj1gkplgf1s>
  /**
   *Register a proxy account for the sender that is able to make calls on its behalf.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to make a proxy.
   *- `proxy_type`: The permissions allowed for this proxy account.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   */
  add_proxy: Anonymize<Ib1tr5ljcskalg>
  /**
   *Unregister a proxy account for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to remove as a proxy.
   *- `proxy_type`: The permissions currently enabled for the removed proxy account.
   */
  remove_proxy: Anonymize<Ib1tr5ljcskalg>
  /**
   *Unregister all proxy accounts for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *WARNING: This may be called on accounts created by `pure`, however if done, then
   *the unreserved fees will be inaccessible. **All access to this account will be lost.**
   */
  remove_proxies: undefined
  /**
   *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
   *initialize it with a proxy of `proxy_type` for `origin` sender.
   *
   *Requires a `Signed` origin.
   *
   *- `proxy_type`: The type of the proxy that the sender will be registered as over the
   *new account. This will almost always be the most permissive `ProxyType` possible to
   *allow for maximum flexibility.
   *- `index`: A disambiguation index, in case this is called multiple times in the same
   *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
   *want to use `0`.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   *
   *Fails with `Duplicate` if this has already been called in this transaction, from the
   *same sender, with the same parameters.
   *
   *Fails if there are insufficient funds to pay for deposit.
   */
  create_pure: Anonymize<I7l4hu9floq5js>
  /**
   *Removes a previously spawned pure proxy.
   *
   *WARNING: **All access to this account will be lost.** Any funds held in it will be
   *inaccessible.
   *
   *Requires a `Signed` origin, and the sender account must have been created by a call to
   *`pure` with corresponding parameters.
   *
   *- `spawner`: The account that originally called `pure` to create this account.
   *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
   *- `proxy_type`: The proxy type originally passed to `pure`.
   *- `height`: The height of the chain when the call to `pure` was processed.
   *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
   *
   *Fails with `NoPermission` in case the caller is not a previously created pure
   *account whose `pure` call has corresponding parameters.
   */
  kill_pure: Anonymize<I5860vql6ga92>
  /**
   *Publish the hash of a proxy-call that will be made in the future.
   *
   *This must be called some number of blocks before the corresponding `proxy` is attempted
   *if the delay associated with the proxy relationship is greater than zero.
   *
   *No more than `MaxPending` announcements may be made at any one time.
   *
   *This will take a deposit of `AnnouncementDepositFactor` as well as
   *`AnnouncementDepositBase` if there are no other pending announcements.
   *
   *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  announce: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove a given announcement.
   *
   *May be called by a proxy account to remove a call they previously announced and return
   *the deposit.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  remove_announcement: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove the given announcement of a delegate.
   *
   *May be called by a target (proxied) account to remove a call that one of their delegates
   *(`delegate`) has announced they want to execute. The deposit is returned.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `delegate`: The account that previously announced the call.
   *- `call_hash`: The hash of the call to be made.
   */
  reject_announcement: Anonymize<Ianmuoljk2sk1u>
  /**
   *Dispatch the given `call` from an account that the sender is authorized for through
   *`add_proxy`.
   *
   *Removes any corresponding announcement(s).
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy_announced: Anonymize<I8080me5lhivu8>
}>
export type Ieptj1gkplgf1s = {
  real: MultiAddress
  force_proxy_type?: Anonymize<I93g3hgcn0dpaj>
  call: TxCallData
}
export type I93g3hgcn0dpaj = Anonymize<I7adrgaqb51jb9> | undefined
export type Ib1tr5ljcskalg = {
  delegate: MultiAddress
  proxy_type: Anonymize<I7adrgaqb51jb9>
  delay: number
}
export type I7l4hu9floq5js = {
  proxy_type: Anonymize<I7adrgaqb51jb9>
  delay: number
  index: number
}
export type I5860vql6ga92 = {
  spawner: MultiAddress
  proxy_type: Anonymize<I7adrgaqb51jb9>
  index: number
  height: number
  ext_index: number
}
export type I2eb501t8s6hsq = {
  real: MultiAddress
  call_hash: FixedSizeBinary<32>
}
export type Ianmuoljk2sk1u = {
  delegate: MultiAddress
  call_hash: FixedSizeBinary<32>
}
export type I8080me5lhivu8 = {
  delegate: MultiAddress
  real: MultiAddress
  force_proxy_type?: Anonymize<I93g3hgcn0dpaj>
  call: TxCallData
}
export type I8phhmkb56o2s3 = AnonymousEnum<{
  /**
   *Immediately dispatch a multi-signature call using a single approval from the caller.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `other_signatories`: The accounts (other than the sender) who are part of the
   *multi-signature, but do not participate in the approval process.
   *- `call`: The call to be executed.
   *
   *Result is equivalent to the dispatched result.
   *
   *## Complexity
   *O(Z + C) where Z is the length of the call and C its execution weight.
   */
  as_multi_threshold_1: Anonymize<I93kgr9aofdoko>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *If there are enough, then dispatch the call.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call`: The call to be executed.
   *
   *NOTE: Unless this is the final approval, you will generally want to use
   *`approve_as_multi` instead, since it only requires a hash of the call.
   *
   *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *on success, result is `Ok` and the result from the interior call, if it was executed,
   *may be found in the deposited `MultisigExecuted` event.
   *
   *## Complexity
   *- `O(S + Z + Call)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- The weight of the `call`.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  as_multi: Anonymize<I7rn80p4scd5ak>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call_hash`: The hash of the call to be executed.
   *
   *NOTE: If this is the final approval, you will want to use `as_multi` instead.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  approve_as_multi: Anonymize<Ideaemvoneh309>
  /**
   *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
   *for this operation will be unreserved on success.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `timepoint`: The timepoint (block number and transaction index) of the first approval
   *transaction for this dispatch.
   *- `call_hash`: The hash of the call to be executed.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- One event.
   *- I/O: 1 read `O(S)`, one remove.
   *- Storage: removes one item.
   */
  cancel_as_multi: Anonymize<I3d9o9d7epp66v>
}>
export type I93kgr9aofdoko = {
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  call: TxCallData
}
export type I7rn80p4scd5ak = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call: TxCallData
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type I95jfd8j5cr5eh = Anonymize<Itvprrpb0nm3o> | undefined
export type Ideaemvoneh309 = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call_hash: FixedSizeBinary<32>
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type I3d9o9d7epp66v = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  timepoint: Anonymize<Itvprrpb0nm3o>
  call_hash: FixedSizeBinary<32>
}
export type I91kpi5kjh9on2 = AnonymousEnum<{
  /**
   *Propose a new bounty.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
   *`DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
   *or slashed when rejected.
   *
   *- `curator`: The curator account whom will manage this bounty.
   *- `fee`: The curator fee.
   *- `value`: The total payment amount of this bounty, curator fee included.
   *- `description`: The description of this bounty.
   */
  propose_bounty: Anonymize<I2a839vbf5817q>
  /**
   *Approve a bounty proposal. At a later time, the bounty will be funded and become active
   *and the original deposit will be returned.
   *
   *May only be called from `T::SpendOrigin`.
   *
   *## Complexity
   *- O(1).
   */
  approve_bounty: Anonymize<Ia9p5bg6p18r0i>
  /**
   *Propose a curator to a funded bounty.
   *
   *May only be called from `T::SpendOrigin`.
   *
   *## Complexity
   *- O(1).
   */
  propose_curator: Anonymize<I42bqh279uf7oa>
  /**
   *Unassign curator from a bounty.
   *
   *This function can only be called by the `RejectOrigin` a signed origin.
   *
   *If this function is called by the `RejectOrigin`, we assume that the curator is
   *malicious or inactive. As a result, we will slash the curator when possible.
   *
   *If the origin is the curator, we take this as a sign they are unable to do their job and
   *they willingly give up. We could slash them, but for now we allow them to recover their
   *deposit and exit without issue. (We may want to change this if it is abused.)
   *
   *Finally, the origin can be anyone if and only if the curator is "inactive". This allows
   *anyone in the community to call out that a curator is not doing their due diligence, and
   *we should pick a new curator. In this case the curator should also be slashed.
   *
   *## Complexity
   *- O(1).
   */
  unassign_curator: Anonymize<Ia9p5bg6p18r0i>
  /**
   *Accept the curator role for a bounty.
   *A deposit will be reserved from curator and refund upon successful payout.
   *
   *May only be called from the curator.
   *
   *## Complexity
   *- O(1).
   */
  accept_curator: Anonymize<Ia9p5bg6p18r0i>
  /**
   *Award bounty to a beneficiary account. The beneficiary will be able to claim the funds
   *after a delay.
   *
   *The dispatch origin for this call must be the curator of this bounty.
   *
   *- `bounty_id`: Bounty ID to award.
   *- `beneficiary`: The beneficiary account whom will receive the payout.
   *
   *## Complexity
   *- O(1).
   */
  award_bounty: Anonymize<I4p6v96cffstms>
  /**
   *Claim the payout from an awarded bounty after payout delay.
   *
   *The dispatch origin for this call must be the beneficiary of this bounty.
   *
   *- `bounty_id`: Bounty ID to claim.
   *
   *## Complexity
   *- O(1).
   */
  claim_bounty: Anonymize<Ia9p5bg6p18r0i>
  /**
   *Cancel a proposed or active bounty. All the funds will be sent to treasury and
   *the curator deposit will be unreserved if possible.
   *
   *Only `T::RejectOrigin` is able to cancel a bounty.
   *
   *- `bounty_id`: Bounty ID to cancel.
   *
   *## Complexity
   *- O(1).
   */
  close_bounty: Anonymize<Ia9p5bg6p18r0i>
  /**
   *Extend the expiry time of an active bounty.
   *
   *The dispatch origin for this call must be the curator of this bounty.
   *
   *- `bounty_id`: Bounty ID to extend.
   *- `remark`: additional information.
   *
   *## Complexity
   *- O(1).
   */
  extend_bounty_expiry: Anonymize<I90n6nnkpdahrh>
}>
export type I2a839vbf5817q = {
  value: bigint
  description: Binary
}
export type I42bqh279uf7oa = {
  bounty_id: number
  curator: MultiAddress
  fee: bigint
}
export type I4p6v96cffstms = {
  bounty_id: number
  beneficiary: MultiAddress
}
export type I90n6nnkpdahrh = {
  bounty_id: number
  remark: Binary
}
export type I1b6drdhvt5hl9 = AnonymousEnum<{
  /**
   *Add a new child-bounty.
   *
   *The dispatch origin for this call must be the curator of parent
   *bounty and the parent bounty must be in "active" state.
   *
   *Child-bounty gets added successfully & fund gets transferred from
   *parent bounty to child-bounty account, if parent bounty has enough
   *funds, else the call fails.
   *
   *Upper bound to maximum number of active  child bounties that can be
   *added are managed via runtime trait config
   *[`Config::MaxActiveChildBountyCount`].
   *
   *If the call is success, the status of child-bounty is updated to
   *"Added".
   *
   *- `parent_bounty_id`: Index of parent bounty for which child-bounty is being added.
   *- `value`: Value for executing the proposal.
   *- `description`: Text description for the child-bounty.
   */
  add_child_bounty: Anonymize<I8mk5kjgn02hi8>
  /**
   *Propose curator for funded child-bounty.
   *
   *The dispatch origin for this call must be curator of parent bounty.
   *
   *Parent bounty must be in active state, for this child-bounty call to
   *work.
   *
   *Child-bounty must be in "Added" state, for processing the call. And
   *state of child-bounty is moved to "CuratorProposed" on successful
   *call completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   *- `curator`: Address of child-bounty curator.
   *- `fee`: payment fee to child-bounty curator for execution.
   */
  propose_curator: Anonymize<Ieqvq91sbe02ko>
  /**
   *Accept the curator role for the child-bounty.
   *
   *The dispatch origin for this call must be the curator of this
   *child-bounty.
   *
   *A deposit will be reserved from the curator and refund upon
   *successful payout or cancellation.
   *
   *Fee for curator is deducted from curator fee of parent bounty.
   *
   *Parent bounty must be in active state, for this child-bounty call to
   *work.
   *
   *Child-bounty must be in "CuratorProposed" state, for processing the
   *call. And state of child-bounty is moved to "Active" on successful
   *call completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   */
  accept_curator: Anonymize<I2gr10p66od9ch>
  /**
   *Unassign curator from a child-bounty.
   *
   *The dispatch origin for this call can be either `RejectOrigin`, or
   *the curator of the parent bounty, or any signed origin.
   *
   *For the origin other than T::RejectOrigin and the child-bounty
   *curator, parent bounty must be in active state, for this call to
   *work. We allow child-bounty curator and T::RejectOrigin to execute
   *this call irrespective of the parent bounty state.
   *
   *If this function is called by the `RejectOrigin` or the
   *parent bounty curator, we assume that the child-bounty curator is
   *malicious or inactive. As a result, child-bounty curator deposit is
   *slashed.
   *
   *If the origin is the child-bounty curator, we take this as a sign
   *that they are unable to do their job, and are willingly giving up.
   *We could slash the deposit, but for now we allow them to unreserve
   *their deposit and exit without issue. (We may want to change this if
   *it is abused.)
   *
   *Finally, the origin can be anyone iff the child-bounty curator is
   *"inactive". Expiry update due of parent bounty is used to estimate
   *inactive state of child-bounty curator.
   *
   *This allows anyone in the community to call out that a child-bounty
   *curator is not doing their due diligence, and we should pick a new
   *one. In this case the child-bounty curator deposit is slashed.
   *
   *State of child-bounty is moved to Added state on successful call
   *completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   */
  unassign_curator: Anonymize<I2gr10p66od9ch>
  /**
   *Award child-bounty to a beneficiary.
   *
   *The beneficiary will be able to claim the funds after a delay.
   *
   *The dispatch origin for this call must be the parent curator or
   *curator of this child-bounty.
   *
   *Parent bounty must be in active state, for this child-bounty call to
   *work.
   *
   *Child-bounty must be in active state, for processing the call. And
   *state of child-bounty is moved to "PendingPayout" on successful call
   *completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   *- `beneficiary`: Beneficiary account.
   */
  award_child_bounty: Anonymize<I9mcq66cm3gibo>
  /**
   *Claim the payout from an awarded child-bounty after payout delay.
   *
   *The dispatch origin for this call may be any signed origin.
   *
   *Call works independent of parent bounty state, No need for parent
   *bounty to be in active state.
   *
   *The Beneficiary is paid out with agreed bounty value. Curator fee is
   *paid & curator deposit is unreserved.
   *
   *Child-bounty must be in "PendingPayout" state, for processing the
   *call. And instance of child-bounty is removed from the state on
   *successful call completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   */
  claim_child_bounty: Anonymize<I2gr10p66od9ch>
  /**
   *Cancel a proposed or active child-bounty. Child-bounty account funds
   *are transferred to parent bounty account. The child-bounty curator
   *deposit may be unreserved if possible.
   *
   *The dispatch origin for this call must be either parent curator or
   *`T::RejectOrigin`.
   *
   *If the state of child-bounty is `Active`, curator deposit is
   *unreserved.
   *
   *If the state of child-bounty is `PendingPayout`, call fails &
   *returns `PendingPayout` error.
   *
   *For the origin other than T::RejectOrigin, parent bounty must be in
   *active state, for this child-bounty call to work. For origin
   *T::RejectOrigin execution is forced.
   *
   *Instance of child-bounty is removed from the state on successful
   *call completion.
   *
   *- `parent_bounty_id`: Index of parent bounty.
   *- `child_bounty_id`: Index of child bounty.
   */
  close_child_bounty: Anonymize<I2gr10p66od9ch>
}>
export type I8mk5kjgn02hi8 = {
  parent_bounty_id: number
  value: bigint
  description: Binary
}
export type Ieqvq91sbe02ko = {
  parent_bounty_id: number
  child_bounty_id: number
  curator: MultiAddress
  fee: bigint
}
export type I2gr10p66od9ch = {
  parent_bounty_id: number
  child_bounty_id: number
}
export type I9mcq66cm3gibo = {
  parent_bounty_id: number
  child_bounty_id: number
  beneficiary: MultiAddress
}
export type I15soeogelbbbh = AnonymousEnum<{
  /**
   *Submit a solution for the unsigned phase.
   *
   *The dispatch origin fo this call must be __none__.
   *
   *This submission is checked on the fly. Moreover, this unsigned solution is only
   *validated when submitted to the pool from the **local** node. Effectively, this means
   *that only active validators can submit this transaction when authoring a block (similar
   *to an inherent).
   *
   *To prevent any incorrect solution (and thus wasted time/weight), this transaction will
   *panic if the solution submitted by the validator is invalid in any way, effectively
   *putting their authoring reward at risk.
   *
   *No deposit or reward is associated with this submission.
   */
  submit_unsigned: Anonymize<I31k9f0jol8ko4>
  /**
   *Set a new value for `MinimumUntrustedScore`.
   *
   *Dispatch origin must be aligned with `T::ForceOrigin`.
   *
   *This check can be turned off by setting the value to `None`.
   */
  set_minimum_untrusted_score: Anonymize<I80q14um2s2ckg>
  /**
   *Set a solution in the queue, to be handed out to the client of this pallet in the next
   *call to `ElectionProvider::elect`.
   *
   *This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
   *
   *The solution is not checked for any feasibility and is assumed to be trustworthy, as any
   *feasibility check itself can in principle cause the election process to fail (due to
   *memory/weight constrains).
   */
  set_emergency_election_result: Anonymize<I5qs1t1erfi7u8>
  /**
   *Submit a solution for the signed phase.
   *
   *The dispatch origin fo this call must be __signed__.
   *
   *The solution is potentially queued, based on the claimed score and processed at the end
   *of the signed phase.
   *
   *A deposit is reserved and recorded for the solution. Based on the outcome, the solution
   *might be rewarded, slashed, or get all or a part of the deposit back.
   */
  submit: Anonymize<I9et13knvdvgpb>
  /**
   *Trigger the governance fallback.
   *
   *This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
   *calling [`Call::set_emergency_election_result`].
   */
  governance_fallback: Anonymize<Ifsme8miqq9006>
}>
export type I31k9f0jol8ko4 = {
  raw_solution: Anonymize<I7je4n92ump862>
  witness: Anonymize<Iasd2iat48n080>
}
export type I80q14um2s2ckg = {
  maybe_next_score?: Anonymize<I8s6n43okuj2b1> | undefined
}
export type I5qs1t1erfi7u8 = {
  supports: Anonymize<I4bboqsv44evel>
}
export type I9et13knvdvgpb = {
  raw_solution: Anonymize<I7je4n92ump862>
}
export type Ifsme8miqq9006 = {
  maybe_max_voters?: Anonymize<I4arjljr6dpflb>
  maybe_max_targets?: Anonymize<I4arjljr6dpflb>
}
export type Ifvfo1l0vu2o7e = AnonymousEnum<{
  /**
   *Declare that some `dislocated` account has, through rewards or penalties, sufficiently
   *changed its score that it should properly fall into a different bag than its current
   *one.
   *
   *Anyone can call this function about any potentially dislocated account.
   *
   *Will always update the stored score of `dislocated` to the correct score, based on
   *`ScoreProvider`.
   *
   *If `dislocated` does not exists, it returns an error.
   */
  rebag: Anonymize<Id9js0aucdivjk>
  /**
   *Move the caller's Id directly in front of `lighter`.
   *
   *The dispatch origin for this call must be _Signed_ and can only be called by the Id of
   *the account going in front of `lighter`. Fee is payed by the origin under all
   *circumstances.
   *
   *Only works if:
   *
   *- both nodes are within the same bag,
   *- and `origin` has a greater `Score` than `lighter`.
   */
  put_in_front_of: Anonymize<I1vj3e1a62je3o>
  /**
   *Same as [`Pallet::put_in_front_of`], but it can be called by anyone.
   *
   *Fee is paid by the origin under all circumstances.
   */
  put_in_front_of_other: Anonymize<I6c1t14l6giceg>
}>
export type Id9js0aucdivjk = {
  dislocated: MultiAddress
}
export type I1vj3e1a62je3o = {
  lighter: MultiAddress
}
export type I6c1t14l6giceg = {
  heavier: MultiAddress
  lighter: MultiAddress
}
export type I57mljkkr28m9p = AnonymousEnum<{
  /**
   *Stake funds with a pool. The amount to bond is delegated (or transferred based on
   *[`adapter::StakeStrategyType`]) from the member to the pool account and immediately
   *increases the pool's bond.
   *
   *The method of transferring the amount to the pool account is determined by
   *[`adapter::StakeStrategyType`]. If the pool is configured to use
   *[`adapter::StakeStrategyType::Delegate`], the funds remain in the account of
   *the `origin`, while the pool gains the right to use these funds for staking.
   *
   *# Note
   *
   ** An account can only be a member of a single pool.
   ** An account cannot join the same pool multiple times.
   ** This call will *not* dust the member account, so the member must have at least
   *  `existential deposit + amount` in their account.
   ** Only a pool with [`PoolState::Open`] can be joined
   */
  join: Anonymize<Ieg1oc56mamrl5>
  /**
   *Bond `extra` more funds from `origin` into the pool to which they already belong.
   *
   *Additional funds can come from either the free balance of the account, of from the
   *accumulated rewards, see [`BondExtra`].
   *
   *Bonding extra funds implies an automatic payout of all pending rewards as well.
   *See `bond_extra_other` to bond pending rewards of `other` members.
   */
  bond_extra: Anonymize<I2vu5vj7173ik9>
  /**
   *A bonded member can use this to claim their payout based on the rewards that the pool
   *has accumulated since their last claimed payout (OR since joining if this is their first
   *time claiming rewards). The payout will be transferred to the member's account.
   *
   *The member will earn rewards pro rata based on the members stake vs the sum of the
   *members in the pools stake. Rewards do not "expire".
   *
   *See `claim_payout_other` to claim rewards on behalf of some `other` pool member.
   */
  claim_payout: undefined
  /**
   *Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It
   *implicitly collects the rewards one last time, since not doing so would mean some
   *rewards would be forfeited.
   *
   *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
   *account).
   *
   *# Conditions for a permissionless dispatch.
   *
   ** The pool is blocked and the caller is either the root or bouncer. This is refereed to
   *  as a kick.
   ** The pool is destroying and the member is not the depositor.
   ** The pool is destroying, the member is the depositor and no other members are in the
   *  pool.
   *
   *## Conditions for permissioned dispatch (i.e. the caller is also the
   *`member_account`):
   *
   ** The caller is not the depositor.
   ** The caller is the depositor, the pool is destroying and no other members are in the
   *  pool.
   *
   *# Note
   *
   *If there are too many unlocking chunks to unbond with the pool account,
   *[`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.
   *The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]
   *to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks
   *are available). However, it may not be possible to release the current unlocking chunks,
   *in which case, the result of this call will likely be the `NoMoreChunks` error from the
   *staking system.
   */
  unbond: Anonymize<I6galqkn58q3bl>
  /**
   *Call `withdraw_unbonded` for the pools account. This call can be made by any account.
   *
   *This is useful if there are too many unlocking chunks to call `unbond`, and some
   *can be cleared by withdrawing. In the case there are too many unlocking chunks, the user
   *would probably see an error like `NoMoreChunks` emitted from the staking system when
   *they attempt to unbond.
   */
  pool_withdraw_unbonded: Anonymize<I36uoc8t9liv80>
  /**
   *Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an
   *error is returned.
   *
   *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
   *account).
   *
   *# Conditions for a permissionless dispatch
   *
   ** The pool is in destroy mode and the target is not the depositor.
   ** The target is the depositor and they are the only member in the sub pools.
   ** The pool is blocked and the caller is either the root or bouncer.
   *
   *# Conditions for permissioned dispatch
   *
   ** The caller is the target and they are not the depositor.
   *
   *# Note
   *
   *- If the target is the depositor, the pool will be destroyed.
   *- If the pool has any pending slash, we also try to slash the member before letting them
   *withdraw. This calculation adds some weight overhead and is only defensive. In reality,
   *pool slashes must have been already applied via permissionless [`Call::apply_slash`].
   */
  withdraw_unbonded: Anonymize<Ibunghsg9qa7f7>
  /**
   *Create a new delegation pool.
   *
   *# Arguments
   *
   ** `amount` - The amount of funds to delegate to the pool. This also acts of a sort of
   *  deposit since the pools creator cannot fully unbond funds until the pool is being
   *  destroyed.
   ** `index` - A disambiguation index for creating the account. Likely only useful when
   *  creating multiple pools in the same extrinsic.
   ** `root` - The account to set as [`PoolRoles::root`].
   ** `nominator` - The account to set as the [`PoolRoles::nominator`].
   ** `bouncer` - The account to set as the [`PoolRoles::bouncer`].
   *
   *# Note
   *
   *In addition to `amount`, the caller will transfer the existential deposit; so the caller
   *needs at have at least `amount + existential_deposit` transferable.
   */
  create: Anonymize<I8qnouj2c0igph>
  /**
   *Create a new delegation pool with a previously used pool id
   *
   *# Arguments
   *
   *same as `create` with the inclusion of
   ** `pool_id` - `A valid PoolId.
   */
  create_with_pool_id: Anonymize<Ic30e2k517a3ns>
  /**
   *Nominate on behalf of the pool.
   *
   *The dispatch origin of this call must be signed by the pool nominator or the pool
   *root role.
   *
   *This directly forward the call to the staking pallet, on behalf of the pool bonded
   *account.
   *
   *# Note
   *
   *In addition to a `root` or `nominator` role of `origin`, pool's depositor needs to have
   *at least `depositor_min_bond` in the pool to start nominating.
   */
  nominate: Anonymize<I47a2tsd2o2b1c>
  /**
   *Set a new state for the pool.
   *
   *If a pool is already in the `Destroying` state, then under no condition can its state
   *change again.
   *
   *The dispatch origin of this call must be either:
   *
   *1. signed by the bouncer, or the root role of the pool,
   *2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and
   *   then the state of the pool can be permissionlessly changed to `Destroying`.
   */
  set_state: Anonymize<Ifc9k1s0e9nv8e>
  /**
   *Set a new metadata for the pool.
   *
   *The dispatch origin of this call must be signed by the bouncer, or the root role of the
   *pool.
   */
  set_metadata: Anonymize<I4ihj26hl75e5p>
  /**
   *Update configurations for the nomination pools. The origin for this call must be
   *[`Config::AdminOrigin`].
   *
   *# Arguments
   *
   ** `min_join_bond` - Set [`MinJoinBond`].
   ** `min_create_bond` - Set [`MinCreateBond`].
   ** `max_pools` - Set [`MaxPools`].
   ** `max_members` - Set [`MaxPoolMembers`].
   ** `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].
   ** `global_max_commission` - Set [`GlobalMaxCommission`].
   */
  set_configs: Anonymize<I2dl8ekhm2t22h>
  /**
   *Update the roles of the pool.
   *
   *The root is the only entity that can change any of the roles, including itself,
   *excluding the depositor, who can never change.
   *
   *It emits an event, notifying UIs of the role change. This event is quite relevant to
   *most pool members and they should be informed of changes to pool roles.
   */
  update_roles: Anonymize<I13us5e5h5645o>
  /**
   *Chill on behalf of the pool.
   *
   *The dispatch origin of this call can be signed by the pool nominator or the pool
   *root role, same as [`Pallet::nominate`].
   *
   *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
   *account).
   *
   *# Conditions for a permissionless dispatch:
   ** When pool depositor has less than `MinNominatorBond` staked, otherwise  pool members
   *  are unable to unbond.
   *
   *# Conditions for permissioned dispatch:
   ** The caller has a nominator or root role of the pool.
   *This directly forward the call to the staking pallet, on behalf of the pool bonded
   *account.
   */
  chill: Anonymize<I931cottvong90>
  /**
   *`origin` bonds funds from `extra` for some pool member `member` into their respective
   *pools.
   *
   *`origin` can bond extra funds from free balance or pending rewards when `origin ==
   *other`.
   *
   *In the case of `origin != other`, `origin` can only bond extra pending rewards of
   *`other` members assuming set_claim_permission for the given member is
   *`PermissionlessCompound` or `PermissionlessAll`.
   */
  bond_extra_other: Anonymize<I7sujb8gfvuo7n>
  /**
   *Allows a pool member to set a claim permission to allow or disallow permissionless
   *bonding and withdrawing.
   *
   *# Arguments
   *
   ** `origin` - Member of a pool.
   ** `permission` - The permission to be applied.
   */
  set_claim_permission: Anonymize<I1ors0vru14it3>
  /**
   *`origin` can claim payouts on some pool member `other`'s behalf.
   *
   *Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim
   *permission for this call to be successful.
   */
  claim_payout_other: Anonymize<I40s11r8nagn2g>
  /**
   *Set the commission of a pool.
   *Both a commission percentage and a commission payee must be provided in the `current`
   *tuple. Where a `current` of `None` is provided, any current commission will be removed.
   *
   *- If a `None` is supplied to `new_commission`, existing commission will be removed.
   */
  set_commission: Anonymize<I6bjj87fr5g9nl>
  /**
   *Set the maximum commission of a pool.
   *
   *- Initial max can be set to any `Perbill`, and only smaller values thereafter.
   *- Current commission will be lowered in the event it is higher than a new max
   *  commission.
   */
  set_commission_max: Anonymize<I8cbluptqo8kbp>
  /**
   *Set the commission change rate for a pool.
   *
   *Initial change rate is not bounded, whereas subsequent updates can only be more
   *restrictive than the current.
   */
  set_commission_change_rate: Anonymize<I81cc4plffa1dm>
  /**
   *Claim pending commission.
   *
   *The dispatch origin of this call must be signed by the `root` role of the pool. Pending
   *commission is paid out and added to total claimed commission`. Total pending commission
   *is reset to zero. the current.
   */
  claim_commission: Anonymize<I931cottvong90>
  /**
   *Top up the deficit or withdraw the excess ED from the pool.
   *
   *When a pool is created, the pool depositor transfers ED to the reward account of the
   *pool. ED is subject to change and over time, the deposit in the reward account may be
   *insufficient to cover the ED deficit of the pool or vice-versa where there is excess
   *deposit to the pool. This call allows anyone to adjust the ED deposit of the
   *pool by either topping up the deficit or claiming the excess.
   */
  adjust_pool_deposit: Anonymize<I931cottvong90>
  /**
   *Set or remove a pool's commission claim permission.
   *
   *Determines who can claim the pool's pending commission. Only the `Root` role of the pool
   *is able to configure commission claim permissions.
   */
  set_commission_claim_permission: Anonymize<I3ihan8icf0c5k>
  /**
   *Apply a pending slash on a member.
   *
   *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
   *[`adapter::StakeStrategyType::Delegate`].
   *
   *The pending slash amount of the member must be equal or more than `ExistentialDeposit`.
   *This call can be dispatched permissionlessly (i.e. by any account). If the execution
   *is successful, fee is refunded and caller may be rewarded with a part of the slash
   *based on the [`crate::pallet::Config::StakeAdapter`] configuration.
   */
  apply_slash: Anonymize<I7ibh0fckqou49>
  /**
   *Migrates delegated funds from the pool account to the `member_account`.
   *
   *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
   *[`adapter::StakeStrategyType::Delegate`].
   *
   *This is a permission-less call and refunds any fee if claim is successful.
   *
   *If the pool has migrated to delegation based staking, the staked tokens of pool members
   *can be moved and held in their own account. See [`adapter::DelegateStake`]
   */
  migrate_delegation: Anonymize<I7ibh0fckqou49>
  /**
   *Migrate pool from [`adapter::StakeStrategyType::Transfer`] to
   *[`adapter::StakeStrategyType::Delegate`].
   *
   *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
   *[`adapter::StakeStrategyType::Delegate`].
   *
   *This call can be dispatched permissionlessly, and refunds any fee if successful.
   *
   *If the pool has already migrated to delegation based staking, this call will fail.
   */
  migrate_pool_to_delegate_stake: Anonymize<I931cottvong90>
}>
export type I2vu5vj7173ik9 = {
  extra: NominationPoolsBondExtra
}
export type NominationPoolsBondExtra = Enum<{
  FreeBalance: bigint
  Rewards: undefined
}>
export declare const NominationPoolsBondExtra: GetEnum<NominationPoolsBondExtra>
export type I6galqkn58q3bl = {
  member_account: MultiAddress
  unbonding_points: bigint
}
export type I36uoc8t9liv80 = {
  pool_id: number
  num_slashing_spans: number
}
export type Ibunghsg9qa7f7 = {
  member_account: MultiAddress
  num_slashing_spans: number
}
export type I8qnouj2c0igph = {
  amount: bigint
  root: MultiAddress
  nominator: MultiAddress
  bouncer: MultiAddress
}
export type Ic30e2k517a3ns = {
  amount: bigint
  root: MultiAddress
  nominator: MultiAddress
  bouncer: MultiAddress
  pool_id: number
}
export type I47a2tsd2o2b1c = {
  pool_id: number
  validators: Anonymize<Ia2lhg7l2hilo3>
}
export type Ifc9k1s0e9nv8e = {
  pool_id: number
  state: NominationPoolsPoolState
}
export type I4ihj26hl75e5p = {
  pool_id: number
  metadata: Binary
}
export type I2dl8ekhm2t22h = {
  min_join_bond: StakingPalletConfigOpBig
  min_create_bond: StakingPalletConfigOpBig
  max_pools: StakingPalletConfigOp
  max_members: StakingPalletConfigOp
  max_members_per_pool: StakingPalletConfigOp
  global_max_commission: StakingPalletConfigOp
}
export type I13us5e5h5645o = {
  pool_id: number
  new_root: NominationPoolsConfigOp
  new_nominator: NominationPoolsConfigOp
  new_bouncer: NominationPoolsConfigOp
}
export type NominationPoolsConfigOp = Enum<{
  Noop: undefined
  Set: SS58String
  Remove: undefined
}>
export declare const NominationPoolsConfigOp: GetEnum<NominationPoolsConfigOp>
export type I7sujb8gfvuo7n = {
  member: MultiAddress
  extra: NominationPoolsBondExtra
}
export type I1ors0vru14it3 = {
  permission: NominationPoolsClaimPermission
}
export type I40s11r8nagn2g = {
  other: SS58String
}
export type I6bjj87fr5g9nl = {
  pool_id: number
  new_commission?: Anonymize<Ie8iutm7u02lmj>
}
export type I7ibh0fckqou49 = {
  member_account: MultiAddress
}
export type I44snhj1gahvrd = AnonymousEnum<{
  /**
   *Register oneself for fast-unstake.
   *
   *## Dispatch Origin
   *
   *The dispatch origin of this call must be *signed* by whoever is permitted to call
   *unbond funds by the staking system. See [`Config::Staking`].
   *
   *## Details
   *
   *The stash associated with the origin must have no ongoing unlocking chunks. If
   *successful, this will fully unbond and chill the stash. Then, it will enqueue the stash
   *to be checked in further blocks.
   *
   *If by the time this is called, the stash is actually eligible for fast-unstake, then
   *they are guaranteed to remain eligible, because the call will chill them as well.
   *
   *If the check works, the entire staking data is removed, i.e. the stash is fully
   *unstaked.
   *
   *If the check fails, the stash remains chilled and waiting for being unbonded as in with
   *the normal staking system, but they lose part of their unbonding chunks due to consuming
   *the chain's resources.
   *
   *## Events
   *
   *Some events from the staking and currency system might be emitted.
   */
  register_fast_unstake: undefined
  /**
   *Deregister oneself from the fast-unstake.
   *
   *## Dispatch Origin
   *
   *The dispatch origin of this call must be *signed* by whoever is permitted to call
   *unbond funds by the staking system. See [`Config::Staking`].
   *
   *## Details
   *
   *This is useful if one is registered, they are still waiting, and they change their mind.
   *
   *Note that the associated stash is still fully unbonded and chilled as a consequence of
   *calling [`Pallet::register_fast_unstake`]. Therefore, this should probably be followed
   *by a call to `rebond` in the staking system.
   *
   *## Events
   *
   *Some events from the staking and currency system might be emitted.
   */
  deregister: undefined
  /**
   *Control the operation of this pallet.
   *
   *## Dispatch Origin
   *
   *The dispatch origin of this call must be [`Config::ControlOrigin`].
   *
   *## Details
   *
   *Can set the number of eras to check per block, and potentially other admin work.
   *
   *## Events
   *
   *No events are emitted from this dispatch.
   */
  control: Anonymize<I9j0ul7nh7b8jv>
}>
export type I9j0ul7nh7b8jv = {
  eras_to_check: number
}
export type Ia9ptue949ognv = AnonymousEnum<{
  /**
   *Set the validation upgrade cooldown.
   */
  set_validation_upgrade_cooldown: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the validation upgrade delay.
   */
  set_validation_upgrade_delay: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the acceptance period for an included candidate.
   */
  set_code_retention_period: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the max validation code size for incoming upgrades.
   */
  set_max_code_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the max POV block size for incoming upgrades.
   */
  set_max_pov_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the max head data size for paras.
   */
  set_max_head_data_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the number of coretime execution cores.
   *
   *NOTE: that this configuration is managed by the coretime chain. Only manually change
   *this, if you really know what you are doing!
   */
  set_coretime_cores: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the max number of times a claim may timeout on a core before it is abandoned
   */
  set_max_availability_timeouts: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the parachain validator-group rotation frequency
   */
  set_group_rotation_frequency: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the availability period for paras.
   */
  set_paras_availability_period: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the scheduling lookahead, in expected number of blocks at peak throughput.
   */
  set_scheduling_lookahead: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the maximum number of validators to assign to any core.
   */
  set_max_validators_per_core: Anonymize<Id581arok0b1nj>
  /**
   *Set the maximum number of validators to use in parachain consensus.
   */
  set_max_validators: Anonymize<Id581arok0b1nj>
  /**
   *Set the dispute period, in number of sessions to keep for disputes.
   */
  set_dispute_period: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the dispute post conclusion acceptance period.
   */
  set_dispute_post_conclusion_acceptance_period: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the no show slots, in number of number of consensus slots.
   *Must be at least 1.
   */
  set_no_show_slots: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the total number of delay tranches.
   */
  set_n_delay_tranches: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the zeroth delay tranche width.
   */
  set_zeroth_delay_tranche_width: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the number of validators needed to approve a block.
   */
  set_needed_approvals: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the number of samples to do of the `RelayVRFModulo` approval assignment criterion.
   */
  set_relay_vrf_modulo_samples: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum items that can present in a upward dispatch queue at once.
   */
  set_max_upward_queue_count: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum total size of items that can present in a upward dispatch queue at
   *once.
   */
  set_max_upward_queue_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the critical downward message size.
   */
  set_max_downward_message_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum size of an upward message that can be sent by a candidate.
   */
  set_max_upward_message_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum number of messages that a candidate can contain.
   */
  set_max_upward_message_num_per_candidate: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the number of sessions after which an HRMP open channel request expires.
   */
  set_hrmp_open_request_ttl: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the amount of funds that the sender should provide for opening an HRMP channel.
   */
  set_hrmp_sender_deposit: Anonymize<I9jsikd1ghmc7l>
  /**
   *Sets the amount of funds that the recipient should provide for accepting opening an HRMP
   *channel.
   */
  set_hrmp_recipient_deposit: Anonymize<I9jsikd1ghmc7l>
  /**
   *Sets the maximum number of messages allowed in an HRMP channel at once.
   */
  set_hrmp_channel_max_capacity: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum total size of messages in bytes allowed in an HRMP channel at once.
   */
  set_hrmp_channel_max_total_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum number of inbound HRMP channels a parachain is allowed to accept.
   */
  set_hrmp_max_parachain_inbound_channels: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum size of a message that could ever be put into an HRMP channel.
   */
  set_hrmp_channel_max_message_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum number of outbound HRMP channels a parachain is allowed to open.
   */
  set_hrmp_max_parachain_outbound_channels: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the maximum number of outbound HRMP messages can be sent by a candidate.
   */
  set_hrmp_max_message_num_per_candidate: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the number of session changes after which a PVF pre-checking voting is rejected.
   */
  set_pvf_voting_ttl: Anonymize<I3vh014cqgmrfd>
  /**
   *Sets the minimum delay between announcing the upgrade block for a parachain until the
   *upgrade taking place.
   *
   *See the field documentation for information and constraints for the new value.
   */
  set_minimum_validation_upgrade_delay: Anonymize<I3vh014cqgmrfd>
  /**
   *Setting this to true will disable consistency checks for the configuration setters.
   *Use with caution.
   */
  set_bypass_consistency_check: Anonymize<I2f6mha3v4ooda>
  /**
   *Set the asynchronous backing parameters.
   */
  set_async_backing_params: Anonymize<Iasqjdhasi408s>
  /**
   *Set PVF executor parameters.
   */
  set_executor_params: Anonymize<I6krn2lsleo87n>
  /**
   *Set the on demand (parathreads) base fee.
   */
  set_on_demand_base_fee: Anonymize<I9jsikd1ghmc7l>
  /**
   *Set the on demand (parathreads) fee variability.
   */
  set_on_demand_fee_variability: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the on demand (parathreads) queue max size.
   */
  set_on_demand_queue_max_size: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the on demand (parathreads) fee variability.
   */
  set_on_demand_target_queue_utilization: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the on demand (parathreads) ttl in the claimqueue.
   */
  set_on_demand_ttl: Anonymize<I3vh014cqgmrfd>
  /**
   *Set the minimum backing votes threshold.
   */
  set_minimum_backing_votes: Anonymize<I3vh014cqgmrfd>
  /**
   *Set/Unset a node feature.
   */
  set_node_feature: Anonymize<Iaid4btmkr5thp>
  /**
   *Set approval-voting-params.
   */
  set_approval_voting_params: Anonymize<I3vh014cqgmrfd>
  /**
   *Set scheduler-params.
   */
  set_scheduler_params: Anonymize<I559fv6um7nmhd>
}>
export type Id581arok0b1nj = {
  new?: Anonymize<I4arjljr6dpflb>
}
export type I9jsikd1ghmc7l = {
  new: bigint
}
export type I2f6mha3v4ooda = {
  new: boolean
}
export type Iasqjdhasi408s = {
  new: Anonymize<Iavuvfkop6318c>
}
export type I6krn2lsleo87n = {
  new: Anonymize<I80rnntpog8qp6>
}
export type Iaid4btmkr5thp = {
  index: number
  value: boolean
}
export type I559fv6um7nmhd = {
  new: Anonymize<I555j7pvb27qd5>
}
export type Id5l4f3jqtnb0u = AnonymousEnum<{
  /**
   *Enter the paras inherent. This will process bitfields and backed candidates.
   */
  enter: Anonymize<Ibbf0j7ol2abrv>
}>
export type Ibbf0j7ol2abrv = {
  data: {
    bitfields: Array<{
      payload: {
        bytes: Uint8Array
        bitsLen: number
      }
      validator_index: number
      signature: FixedSizeBinary<64>
    }>
    backed_candidates: Array<{
      candidate: Anonymize<I7t2ron16fup67>
      validity_votes: Array<ValidityAttestation>
      validator_indices: {
        bytes: Uint8Array
        bitsLen: number
      }
    }>
    disputes: Anonymize<Ibt1op6l47p1r2>
    parent_header: Anonymize<Ic952bubvq4k7d>
  }
}
export type I7t2ron16fup67 = {
  descriptor: Anonymize<Ic7r865c0luc3k>
  commitments: Anonymize<Ic1d4u2opv3fst>
}
export type Ie2dden5k4kk7t = AnonymousEnum<{
  /**
   *Set the storage for the parachain validation code immediately.
   */
  force_set_current_code: Anonymize<I1k3urvkqqshbc>
  /**
   *Set the storage for the current parachain head data immediately.
   */
  force_set_current_head: Anonymize<I2ff0ffsh15vej>
  /**
   *Schedule an upgrade as if it was scheduled in the given relay parent block.
   */
  force_schedule_code_upgrade: Anonymize<I1orfg86bkg123>
  /**
   *Note a new block head for para within the context of the current block.
   */
  force_note_new_head: Anonymize<I2ff0ffsh15vej>
  /**
   *Put a parachain directly into the next session's action queue.
   *We can't queue it any sooner than this without going into the
   *initializer...
   */
  force_queue_action: Anonymize<Iaus4cb3drhu9q>
  /**
   *Adds the validation code to the storage.
   *
   *The code will not be added if it is already present. Additionally, if PVF pre-checking
   *is running for that code, it will be instantly accepted.
   *
   *Otherwise, the code will be added into the storage. Note that the code will be added
   *into storage with reference count 0. This is to account the fact that there are no users
   *for this code yet. The caller will have to make sure that this code eventually gets
   *used by some parachain or removed from the storage to avoid storage leaks. For the
   *latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
   *manipulation.
   *
   *This function is mainly meant to be used for upgrading parachains that do not follow
   *the go-ahead signal while the PVF pre-checking feature is enabled.
   */
  add_trusted_validation_code: Anonymize<Ivnsat10lv9d6>
  /**
   *Remove the validation code from the storage iff the reference count is 0.
   *
   *This is better than removing the storage directly, because it will not remove the code
   *that was suddenly got used by some parachain while this dispatchable was pending
   *dispatching.
   */
  poke_unused_validation_code: Anonymize<Ibncli8qttt2c2>
  /**
   *Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
   *enacts the results if that was the last vote before achieving the supermajority.
   */
  include_pvf_check_statement: Anonymize<I33rft6ag34efs>
  /**
   *Set the storage for the current parachain head data immediately.
   */
  force_set_most_recent_context: Anonymize<I9tmok5kceg2bg>
}>
export type I1k3urvkqqshbc = {
  para: number
  new_code: Binary
}
export type I2ff0ffsh15vej = {
  para: number
  new_head: Binary
}
export type I1orfg86bkg123 = {
  para: number
  new_code: Binary
  relay_parent_number: number
}
export type Iaus4cb3drhu9q = {
  para: number
}
export type Ivnsat10lv9d6 = {
  validation_code: Binary
}
export type Ibncli8qttt2c2 = {
  validation_code_hash: FixedSizeBinary<32>
}
export type I33rft6ag34efs = {
  stmt: Anonymize<I36e6rra3ikq65>
  signature: FixedSizeBinary<64>
}
export type I36e6rra3ikq65 = {
  accept: boolean
  subject: FixedSizeBinary<32>
  session_index: number
  validator_index: number
}
export type I9tmok5kceg2bg = {
  para: number
  context: number
}
export type Ieggtnkc96vvt7 = AnonymousEnum<{
  /**
   *Issue a signal to the consensus engine to forcibly act as though all parachain
   *blocks in all relay chain blocks up to and including the given number in the current
   *chain are valid and should be finalized.
   */
  force_approve: Anonymize<I85icj2qbjeqbe>
}>
export type I85icj2qbjeqbe = {
  up_to: number
}
export type I45adic8nko129 = AnonymousEnum<{
  /**
   *Initiate opening a channel from a parachain to a given recipient with given channel
   *parameters.
   *
   *- `proposed_max_capacity` - specifies how many messages can be in the channel at once.
   *- `proposed_max_message_size` - specifies the maximum size of the messages.
   *
   *These numbers are a subject to the relay-chain configuration limits.
   *
   *The channel can be opened only after the recipient confirms it and only on a session
   *change.
   */
  hrmp_init_open_channel: Anonymize<Ibuhbp68e6tkct>
  /**
   *Accept a pending open channel request from the given sender.
   *
   *The channel will be opened only on the next session boundary.
   */
  hrmp_accept_open_channel: Anonymize<Idrevppfiubhve>
  /**
   *Initiate unilateral closing of a channel. The origin must be either the sender or the
   *recipient in the channel being closed.
   *
   *The closure can only happen on a session change.
   */
  hrmp_close_channel: Anonymize<I9s2h36kr71vk9>
  /**
   *This extrinsic triggers the cleanup of all the HRMP storage items that a para may have.
   *Normally this happens once per session, but this allows you to trigger the cleanup
   *immediately for a specific parachain.
   *
   *Number of inbound and outbound channels for `para` must be provided as witness data.
   *
   *Origin must be the `ChannelManager`.
   */
  force_clean_hrmp: Anonymize<I4lkbiubo9ogq9>
  /**
   *Force process HRMP open channel requests.
   *
   *If there are pending HRMP open channel requests, you can use this function to process
   *all of those requests immediately.
   *
   *Total number of opening channels must be provided as witness data.
   *
   *Origin must be the `ChannelManager`.
   */
  force_process_hrmp_open: Anonymize<Id1baei7m8gkhk>
  /**
   *Force process HRMP close channel requests.
   *
   *If there are pending HRMP close channel requests, you can use this function to process
   *all of those requests immediately.
   *
   *Total number of closing channels must be provided as witness data.
   *
   *Origin must be the `ChannelManager`.
   */
  force_process_hrmp_close: Anonymize<Id1baei7m8gkhk>
  /**
   *This cancels a pending open channel request. It can be canceled by either of the sender
   *or the recipient for that request. The origin must be either of those.
   *
   *The cancellation happens immediately. It is not possible to cancel the request if it is
   *already accepted.
   *
   *Total number of open requests (i.e. `HrmpOpenChannelRequestsList`) must be provided as
   *witness data.
   */
  hrmp_cancel_open_request: Anonymize<I96ftepqm4vs7m>
  /**
   *Open a channel from a `sender` to a `recipient` `ParaId`. Although opened by governance,
   *the `max_capacity` and `max_message_size` are still subject to the Relay Chain's
   *configured limits.
   *
   *Expected use is when one (and only one) of the `ParaId`s involved in the channel is
   *governed by the system, e.g. a system parachain.
   *
   *Origin must be the `ChannelManager`.
   */
  force_open_hrmp_channel: Anonymize<Ic3430470j4mbv>
  /**
   *Establish an HRMP channel between two system chains. If the channel does not already
   *exist, the transaction fees will be refunded to the caller. The system does not take
   *deposits for channels between system chains, and automatically sets the message number
   *and size limits to the maximum allowed by the network's configuration.
   *
   *Arguments:
   *
   *- `sender`: A system chain, `ParaId`.
   *- `recipient`: A system chain, `ParaId`.
   *
   *Any signed origin can call this function, but _both_ inputs MUST be system chains. If
   *the channel does not exist yet, there is no fee.
   */
  establish_system_channel: Anonymize<I50mrcbubp554e>
  /**
   *Update the deposits held for an HRMP channel to the latest `Configuration`. Channels
   *with system chains do not require a deposit.
   *
   *Arguments:
   *
   *- `sender`: A chain, `ParaId`.
   *- `recipient`: A chain, `ParaId`.
   *
   *Any signed origin can call this function.
   */
  poke_channel_deposits: Anonymize<I50mrcbubp554e>
  /**
   *Establish a bidirectional HRMP channel between a parachain and a system chain.
   *
   *Arguments:
   *
   *- `target_system_chain`: A system chain, `ParaId`.
   *
   *The origin needs to be the parachain origin.
   */
  establish_channel_with_system: Anonymize<Ic3n7nqb6fffo0>
}>
export type Ibuhbp68e6tkct = {
  recipient: number
  proposed_max_capacity: number
  proposed_max_message_size: number
}
export type Idrevppfiubhve = {
  sender: number
}
export type I9s2h36kr71vk9 = {
  channel_id: Anonymize<I50mrcbubp554e>
}
export type I4lkbiubo9ogq9 = {
  para: number
  num_inbound: number
  num_outbound: number
}
export type Id1baei7m8gkhk = {
  channels: number
}
export type I96ftepqm4vs7m = {
  channel_id: Anonymize<I50mrcbubp554e>
  open_requests: number
}
export type Ic3430470j4mbv = {
  sender: number
  recipient: number
  max_capacity: number
  max_message_size: number
}
export type Ic3n7nqb6fffo0 = {
  target_system_chain: number
}
export type Ifkh1ep7g9h3rv = AnonymousEnum<{
  force_unfreeze: undefined
}>
export type I3jj054kp2bjol = AnonymousEnum<{
  report_dispute_lost_unsigned: Anonymize<I437u7rqtshfms>
}>
export type I437u7rqtshfms = {
  dispute_proof: Anonymize<I943rhn463avqr>
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type I943rhn463avqr = {
  time_slot: {
    session_index: number
    candidate_hash: FixedSizeBinary<32>
  }
  kind: SlashingOffenceKind
  validator_index: number
  validator_id: FixedSizeBinary<32>
}
export type I9s7urueli180g = AnonymousEnum<{
  /**
   *Create a single on demand core order.
   *Will use the spot price for the current block and will reap the account if needed.
   *
   *Parameters:
   *- `origin`: The sender of the call, funds will be withdrawn from this account.
   *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
   *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
   *
   *Errors:
   *- `InsufficientBalance`: from the Currency implementation
   *- `QueueFull`
   *- `SpotPriceHigherThanMaxAmount`
   *
   *Events:
   *- `OnDemandOrderPlaced`
   */
  place_order_allow_death: Anonymize<Iaa7g3f5tlv3gf>
  /**
   *Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
   *check that placing the order will not reap the account.
   *
   *Parameters:
   *- `origin`: The sender of the call, funds will be withdrawn from this account.
   *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
   *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
   *
   *Errors:
   *- `InsufficientBalance`: from the Currency implementation
   *- `QueueFull`
   *- `SpotPriceHigherThanMaxAmount`
   *
   *Events:
   *- `OnDemandOrderPlaced`
   */
  place_order_keep_alive: Anonymize<Iaa7g3f5tlv3gf>
}>
export type Iaa7g3f5tlv3gf = {
  max_amount: bigint
  para_id: number
}
export type Icclqj5sge2nc7 = AnonymousEnum<{
  /**
   *Register head data and validation code for a reserved Para Id.
   *
   *## Arguments
   *- `origin`: Must be called by a `Signed` origin.
   *- `id`: The para ID. Must be owned/managed by the `origin` signing account.
   *- `genesis_head`: The genesis head data of the parachain/thread.
   *- `validation_code`: The initial validation code of the parachain/thread.
   *
   *## Deposits/Fees
   *The account with the originating signature must reserve a deposit.
   *
   *The deposit is required to cover the costs associated with storing the genesis head
   *data and the validation code.
   *This accounts for the potential to store validation code of a size up to the
   *`max_code_size`, as defined in the configuration pallet
   *
   *Anything already reserved previously for this para ID is accounted for.
   *
   *## Events
   *The `Registered` event is emitted in case of success.
   */
  register: Anonymize<I7mf0sij342109>
  /**
   *Force the registration of a Para Id on the relay chain.
   *
   *This function must be called by a Root origin.
   *
   *The deposit taken can be specified for this registration. Any `ParaId`
   *can be registered, including sub-1000 IDs which are System Parachains.
   */
  force_register: Anonymize<Ibvirp862qkkup>
  /**
   *Deregister a Para Id, freeing all data and returning any deposit.
   *
   *The caller must be Root, the `para` owner, or the `para` itself. The para must be an
   *on-demand parachain.
   */
  deregister: Anonymize<Ic5b47dj4coa3r>
  /**
   *Swap a lease holding parachain with another parachain, either on-demand or lease
   *holding.
   *
   *The origin must be Root, the `para` owner, or the `para` itself.
   *
   *The swap will happen only if there is already an opposite swap pending. If there is not,
   *the swap will be stored in the pending swaps map, ready for a later confirmatory swap.
   *
   *The `ParaId`s remain mapped to the same head data and code so external code can rely on
   *`ParaId` to be a long-term identifier of a notional "parachain". However, their
   *scheduling info (i.e. whether they're an on-demand parachain or lease holding
   *parachain), auction information and the auction deposit are switched.
   */
  swap: Anonymize<Idehabrqi23sc0>
  /**
   *Remove a manager lock from a para. This will allow the manager of a
   *previously locked para to deregister or swap a para without using governance.
   *
   *Can only be called by the Root origin or the parachain.
   */
  remove_lock: Anonymize<Iaus4cb3drhu9q>
  /**
   *Reserve a Para Id on the relay chain.
   *
   *This function will reserve a new Para Id to be owned/managed by the origin account.
   *The origin account is able to register head data and validation code using `register` to
   *create an on-demand parachain. Using the Slots pallet, an on-demand parachain can then
   *be upgraded to a lease holding parachain.
   *
   *## Arguments
   *- `origin`: Must be called by a `Signed` origin. Becomes the manager/owner of the new
   *  para ID.
   *
   *## Deposits/Fees
   *The origin must reserve a deposit of `ParaDeposit` for the registration.
   *
   *## Events
   *The `Reserved` event is emitted in case of success, which provides the ID reserved for
   *use.
   */
  reserve: undefined
  /**
   *Add a manager lock from a para. This will prevent the manager of a
   *para to deregister or swap a para.
   *
   *Can be called by Root, the parachain, or the parachain manager if the parachain is
   *unlocked.
   */
  add_lock: Anonymize<Iaus4cb3drhu9q>
  /**
   *Schedule a parachain upgrade.
   *
   *This will kick off a check of `new_code` by all validators. After the majority of the
   *validators have reported on the validity of the code, the code will either be enacted
   *or the upgrade will be rejected. If the code will be enacted, the current code of the
   *parachain will be overwritten directly. This means that any PoV will be checked by this
   *new code. The parachain itself will not be informed explicitly that the validation code
   *has changed.
   *
   *Can be called by Root, the parachain, or the parachain manager if the parachain is
   *unlocked.
   */
  schedule_code_upgrade: Anonymize<I1k3urvkqqshbc>
  /**
   *Set the parachain's current head.
   *
   *Can be called by Root, the parachain, or the parachain manager if the parachain is
   *unlocked.
   */
  set_current_head: Anonymize<I2ff0ffsh15vej>
}>
export type I7mf0sij342109 = {
  id: number
  genesis_head: Binary
  validation_code: Binary
}
export type Ibvirp862qkkup = {
  who: SS58String
  deposit: bigint
  id: number
  genesis_head: Binary
  validation_code: Binary
}
export type Ic5b47dj4coa3r = {
  id: number
}
export type Idehabrqi23sc0 = {
  id: number
  other: number
}
export type Iafhis924j14hg = AnonymousEnum<{
  /**
   *Just a connect into the `lease_out` call, in case Root wants to force some lease to
   *happen independently of any other on-chain mechanism to use it.
   *
   *The dispatch origin for this call must match `T::ForceOrigin`.
   */
  force_lease: Anonymize<Idfpo6162k0hq>
  /**
   *Clear all leases for a Para Id, refunding any deposits back to the original owners.
   *
   *The dispatch origin for this call must match `T::ForceOrigin`.
   */
  clear_all_leases: Anonymize<Iaus4cb3drhu9q>
  /**
   *Try to onboard a parachain that has a lease for the current lease period.
   *
   *This function can be useful if there was some state issue with a para that should
   *have onboarded, but was unable to. As long as they have a lease period, we can
   *let them onboard from here.
   *
   *Origin must be signed, but can be called by anyone.
   */
  trigger_onboard: Anonymize<Iaus4cb3drhu9q>
}>
export type Idfpo6162k0hq = {
  para: number
  leaser: SS58String
  amount: bigint
  period_begin: number
  period_count: number
}
export type I4a8qeimc5p3qn = AnonymousEnum<{
  /**
   *Create a new auction.
   *
   *This can only happen when there isn't already an auction in progress and may only be
   *called by the root origin. Accepts the `duration` of this auction and the
   *`lease_period_index` of the initial lease period of the four that are to be auctioned.
   */
  new_auction: Anonymize<I19hvnphoaj44l>
  /**
   *Make a new bid from an account (including a parachain account) for deploying a new
   *parachain.
   *
   *Multiple simultaneous bids from the same bidder are allowed only as long as all active
   *bids overlap each other (i.e. are mutually exclusive). Bids cannot be redacted.
   *
   *- `sub` is the sub-bidder ID, allowing for multiple competing bids to be made by (and
   *funded by) the same account.
   *- `auction_index` is the index of the auction to bid on. Should just be the present
   *value of `AuctionCounter`.
   *- `first_slot` is the first lease period index of the range to bid on. This is the
   *absolute lease period index value, not an auction-specific offset.
   *- `last_slot` is the last lease period index of the range to bid on. This is the
   *absolute lease period index value, not an auction-specific offset.
   *- `amount` is the amount to bid to be held as deposit for the parachain should the
   *bid win. This amount is held throughout the range.
   */
  bid: Anonymize<I1ng31ej27mh4k>
  /**
   *Cancel an in-progress auction.
   *
   *Can only be called by Root origin.
   */
  cancel_auction: undefined
}>
export type I19hvnphoaj44l = {
  duration: number
  lease_period_index: number
}
export type I1ng31ej27mh4k = {
  para: number
  auction_index: number
  first_slot: number
  last_slot: number
  amount: bigint
}
export type Iaj4q75nu5v2i2 = AnonymousEnum<{
  /**
   *Create a new crowdloaning campaign for a parachain slot with the given lease period
   *range.
   *
   *This applies a lock to your parachain configuration, ensuring that it cannot be changed
   *by the parachain manager.
   */
  create: Anonymize<I85qkvekflgteq>
  /**
   *Contribute to a crowd sale. This will transfer some balance over to fund a parachain
   *slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
   */
  contribute: Anonymize<I1qt5nua7ua655>
  /**
   *Withdraw full balance of a specific contributor.
   *
   *Origin must be signed, but can come from anyone.
   *
   *The fund must be either in, or ready for, retirement. For a fund to be *in* retirement,
   *then the retirement flag must be set. For a fund to be ready for retirement, then:
   *- it must not already be in retirement;
   *- the amount of raised funds must be bigger than the _free_ balance of the account;
   *- and either:
   *  - the block number must be at least `end`; or
   *  - the current lease period must be greater than the fund's `last_period`.
   *
   *In this case, the fund's retirement flag is set and its `end` is reset to the current
   *block number.
   *
   *- `who`: The account whose contribution should be withdrawn.
   *- `index`: The parachain to whose crowdloan the contribution was made.
   */
  withdraw: Anonymize<Ia1u3jll6a06ae>
  /**
   *Automatically refund contributors of an ended crowdloan.
   *Due to weight restrictions, this function may need to be called multiple
   *times to fully refund all users. We will refund `RemoveKeysLimit` users at a time.
   *
   *Origin must be signed, but can come from anyone.
   */
  refund: Anonymize<I666bl2fqjkejo>
  /**
   *Remove a fund after the retirement period has ended and all funds have been returned.
   */
  dissolve: Anonymize<I666bl2fqjkejo>
  /**
   *Edit the configuration for an in-progress crowdloan.
   *
   *Can only be called by Root origin.
   */
  edit: Anonymize<I85qkvekflgteq>
  /**
   *Add an optional memo to an existing crowdloan contribution.
   *
   *Origin must be Signed, and the user must have contributed to the crowdloan.
   */
  add_memo: Anonymize<I7cl9esn1l72m7>
  /**
   *Poke the fund into `NewRaise`
   *
   *Origin must be Signed, and the fund has non-zero raise.
   */
  poke: Anonymize<I666bl2fqjkejo>
  /**
   *Contribute your entire balance to a crowd sale. This will transfer the entire balance of
   *a user over to fund a parachain slot. It will be withdrawable when the crowdloan has
   *ended and the funds are unused.
   */
  contribute_all: Anonymize<Id68sq6o2gm8qi>
}>
export type I85qkvekflgteq = {
  index: number
  cap: bigint
  first_period: number
  last_period: number
  end: number
  verifier?: Anonymize<I21lmi57mmu91l>
}
export type I1qt5nua7ua655 = {
  index: number
  value: bigint
  signature?: Anonymize<I86cdjmsf3a81s>
}
export type I86cdjmsf3a81s = MultiSignature | undefined
export type MultiSignature = Enum<{
  Ed25519: FixedSizeBinary<64>
  Sr25519: FixedSizeBinary<64>
  Ecdsa: FixedSizeBinary<65>
}>
export declare const MultiSignature: GetEnum<MultiSignature>
export type I7cl9esn1l72m7 = {
  index: number
  memo: Binary
}
export type Id68sq6o2gm8qi = {
  index: number
  signature?: Anonymize<I86cdjmsf3a81s>
}
export type Idu7bbtd2jtnb9 = AnonymousEnum<{
  /**
   *Request the configuration to be updated with the specified number of cores. Warning:
   *Since this only schedules a configuration update, it takes two sessions to come into
   *effect.
   *
   *- `origin`: Root or the Coretime Chain
   *- `count`: total number of cores
   */
  request_core_count: Anonymize<Iafscmv8tjf0ou>
  /**
   *Request to claim the instantaneous coretime sales revenue starting from the block it was
   *last claimed until and up to the block specified. The claimed amount value is sent back
   *to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
   *teleported to the Coretime chain.
   */
  request_revenue_at: Anonymize<Ibtsa3docbr9el>
  /**
   *Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
   *to be used.
   *
   *Parameters:
   *-`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
   *-`core`: The core that should be scheduled.
   *-`begin`: The starting blockheight of the instruction.
   *-`assignment`: How the blockspace should be utilised.
   *-`end_hint`: An optional hint as to when this particular set of instructions will end.
   */
  assign_core: Anonymize<I2gpmmfdqv3cdc>
}>
export type I2gpmmfdqv3cdc = {
  core: number
  begin: number
  assignment: Anonymize<Idt36labebpqsd>
  end_hint?: Anonymize<I4arjljr6dpflb>
}
export type I39l72gdmkk30t = AnonymousEnum<{
  /**
   *Control the automatic migration.
   *
   *The dispatch origin of this call must be [`Config::ControlOrigin`].
   */
  control_auto_migration: Anonymize<I7psec5e6ghc64>
  /**
   *Continue the migration for the given `limits`.
   *
   *The dispatch origin of this call can be any signed account.
   *
   *This transaction has NO MONETARY INCENTIVES. calling it will not reward anyone. Albeit,
   *Upon successful execution, the transaction fee is returned.
   *
   *The (potentially over-estimated) of the byte length of all the data read must be
   *provided for up-front fee-payment and weighing. In essence, the caller is guaranteeing
   *that executing the current `MigrationTask` with the given `limits` will not exceed
   *`real_size_upper` bytes of read data.
   *
   *The `witness_task` is merely a helper to prevent the caller from being slashed or
   *generally trigger a migration that they do not intend. This parameter is just a message
   *from caller, saying that they believed `witness_task` was the last state of the
   *migration, and they only wish for their transaction to do anything, if this assumption
   *holds. In case `witness_task` does not match, the transaction fails.
   *
   *Based on the documentation of [`MigrationTask::migrate_until_exhaustion`], the
   *recommended way of doing this is to pass a `limit` that only bounds `count`, as the
   *`size` limit can always be overwritten.
   */
  continue_migrate: Anonymize<I2psb0sladd863>
  /**
   *Migrate the list of top keys by iterating each of them one by one.
   *
   *This does not affect the global migration process tracker ([`MigrationProcess`]), and
   *should only be used in case any keys are leftover due to a bug.
   */
  migrate_custom_top: Anonymize<I585tk8khua0gk>
  /**
   *Migrate the list of child keys by iterating each of them one by one.
   *
   *All of the given child keys must be present under one `child_root`.
   *
   *This does not affect the global migration process tracker ([`MigrationProcess`]), and
   *should only be used in case any keys are leftover due to a bug.
   */
  migrate_custom_child: Anonymize<I3ut99di214ru2>
  /**
   *Set the maximum limit of the signed migration.
   */
  set_signed_max_limits: Anonymize<Iemkp87d26vsbh>
  /**
   *Forcefully set the progress the running migration.
   *
   *This is only useful in one case: the next key to migrate is too big to be migrated with
   *a signed account, in a parachain context, and we simply want to skip it. A reasonable
   *example of this would be `:code:`, which is both very expensive to migrate, and commonly
   *used, so probably it is already migrated.
   *
   *In case you mess things up, you can also, in principle, use this to reset the migration
   *process.
   */
  force_set_progress: Anonymize<I4ahfrt5dscf6q>
}>
export type I7psec5e6ghc64 = {
  maybe_config?: Anonymize<Ib17t3992hb64n>
}
export type I2psb0sladd863 = {
  limits: Anonymize<I215mkl885p4da>
  real_size_upper: number
  witness_task: Anonymize<If354jrdedj0pj>
}
export type I585tk8khua0gk = {
  keys: Anonymize<Itom7fk49o0c9>
  witness_size: number
}
export type I3ut99di214ru2 = {
  root: Binary
  child_keys: Anonymize<Itom7fk49o0c9>
  total_size: number
}
export type Iemkp87d26vsbh = {
  limits: Anonymize<I215mkl885p4da>
}
export type I4ahfrt5dscf6q = {
  progress_top: Anonymize<I1ufmh6d8psvik>
  progress_child: Anonymize<I1ufmh6d8psvik>
}
export type I9nbjvlrb9bp1g = AnonymousEnum<{
  send: Anonymize<I9paqujeb1fpv6>
  /**
   *Teleport some assets from the local chain to some destination chain.
   *
   ***This function is deprecated: Use `limited_teleport_assets` instead.**
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
   *with all fees taken as needed from the asset.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` chain.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   */
  teleport_assets: Anonymize<Iakevv83i18n4r>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve.
   *
   *`assets` must have same reserve location and may not be teleportable to `dest`.
   * - `assets` have local reserve: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `assets` have destination reserve: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
   *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
   *   to mint and deposit reserve-based assets to `beneficiary`.
   *
   ***This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
   *with all fees taken as needed from the asset.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   */
  reserve_transfer_assets: Anonymize<Iakevv83i18n4r>
  /**
   *Execute an XCM message from a local, signed, origin.
   *
   *An event is deposited indicating whether `msg` could be executed completely or only
   *partially.
   *
   *No more than `max_weight` will be used in its attempted execution. If this is less than
   *the maximum amount of weight that the message could take to be executed, then no
   *execution attempt will be made.
   */
  execute: Anonymize<If2ssl12kcglhg>
  /**
   *Extoll that a particular destination can be communicated with through a particular
   *version of XCM.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The destination that is being described.
   *- `xcm_version`: The latest version of XCM that `location` supports.
   */
  force_xcm_version: Anonymize<Iabk8ljl5g8c86>
  /**
   *Set a safe XCM version (the version that XCM should be encoded with if the most recent
   *version a destination can accept is unknown).
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
   */
  force_default_xcm_version: Anonymize<Ic76kfh5ebqkpl>
  /**
   *Ask a location to notify us regarding their XCM version and any changes to it.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The location to which we should subscribe for XCM version notifications.
   */
  force_subscribe_version_notify: Anonymize<Icrujen33bbibf>
  /**
   *Require that a particular destination should no longer notify us regarding any XCM
   *version changes.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The location to which we are currently subscribed for XCM version
   *  notifications which we no longer desire.
   */
  force_unsubscribe_version_notify: Anonymize<Icrujen33bbibf>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve.
   *
   *`assets` must have same reserve location and may not be teleportable to `dest`.
   * - `assets` have local reserve: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `assets` have destination reserve: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
   *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
   *   to mint and deposit reserve-based assets to `beneficiary`.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  limited_reserve_transfer_assets: Anonymize<I5gi8h3e5lkbeq>
  /**
   *Teleport some assets from the local chain to some destination chain.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` chain.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  limited_teleport_assets: Anonymize<I5gi8h3e5lkbeq>
  /**
   *Set or unset the global suspension state of the XCM executor.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `suspended`: `true` to suspend, `false` to resume.
   */
  force_suspension: Anonymize<Ibgm4rnf22lal1>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve, or through teleports.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
   *`weight_limit` of weight. If more weight is needed than `weight_limit`, then the
   *operation will fail and the sent assets may be at risk.
   *
   *`assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
   *to `dest`, no limitations imposed on `fees`.
   * - for local reserve: transfer assets to sovereign account of destination chain and
   *   forward a notification XCM to `dest` to mint and deposit reserve-based assets to
   *   `beneficiary`.
   * - for destination reserve: burn local assets and forward a notification to `dest` chain
   *   to withdraw the reserve assets from this chain's sovereign account and deposit them
   *   to `beneficiary`.
   * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
   *   from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
   *   and deposit reserve-based assets to `beneficiary`.
   * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
   *   assets and deposit them to `beneficiary`.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `X2(Parent,
   *  Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
   *  from relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  transfer_assets: Anonymize<I5gi8h3e5lkbeq>
  /**
   *Claims assets trapped on this pallet because of leftover assets during XCM execution.
   *
   *- `origin`: Anyone can call this extrinsic.
   *- `assets`: The exact assets that were trapped. Use the version to specify what version
   *was the latest when they were trapped.
   *- `beneficiary`: The location/account where the claimed assets will be deposited.
   */
  claim_assets: Anonymize<I8mmaab8je28oo>
  /**
   *Transfer assets from the local chain to the destination chain using explicit transfer
   *types for assets and fees.
   *
   *`assets` must have same reserve location or may be teleportable to `dest`. Caller must
   *provide the `assets_transfer_type` to be used for `assets`:
   * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
   *   chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
   *   XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
   *   the remote `reserve` is Asset Hub.
   * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
   *   mint/teleport assets and deposit them to `beneficiary`.
   *
   *On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
   *buy execution using transferred `assets` identified by `remote_fees_id`.
   *Make sure enough of the specified `remote_fees_id` asset is included in the given list
   *of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *`remote_fees_id` may use different transfer type than rest of `assets` and can be
   *specified through `fees_transfer_type`.
   *
   *The caller needs to specify what should happen to the transferred assets once they reach
   *the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
   *contains the instructions to execute on `dest` as a final step.
   *  This is usually as simple as:
   *  `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
   *  but could be something more exotic like sending the `assets` even further.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
   *  parachain across a bridge to another ecosystem destination.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
   *- `remote_fees_id`: One of the included `assets` to be used to pay fees.
   *- `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
   *- `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
   *  transfer, which also determines what happens to the assets on the destination chain.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  transfer_assets_using_type_and_then: Anonymize<I6r0pr82pbiftt>
}>
export type I9paqujeb1fpv6 = {
  dest: PaseoXcmVersionedLocation
  message: PaseoXcmVersionedXcm
}
export type PaseoXcmVersionedXcm = Enum<{
  V2: Anonymize<Iemqgk0vect4v7>
  V3: Anonymize<Ianvng4e08j9ii>
  V4: Anonymize<Iegrepoo0c1jc5>
}>
export declare const PaseoXcmVersionedXcm: GetEnum<PaseoXcmVersionedXcm>
export type Iemqgk0vect4v7 = Array<XcmV2Instruction>
export type XcmV2Instruction = Enum<{
  WithdrawAsset: Anonymize<I2sllmucln1iic>
  ReserveAssetDeposited: Anonymize<I2sllmucln1iic>
  ReceiveTeleportedAsset: Anonymize<I2sllmucln1iic>
  QueryResponse: {
    query_id: bigint
    response: XcmV2Response
    max_weight: bigint
  }
  TransferAsset: {
    assets: Anonymize<I2sllmucln1iic>
    beneficiary: Anonymize<I4frqunb5hj2km>
  }
  TransferReserveAsset: {
    assets: Anonymize<I2sllmucln1iic>
    dest: Anonymize<I4frqunb5hj2km>
    xcm: Anonymize<Iemqgk0vect4v7>
  }
  Transact: {
    origin_type: XcmV2OriginKind
    require_weight_at_most: bigint
    call: Binary
  }
  HrmpNewChannelOpenRequest: Anonymize<I5uhhrjqfuo4e5>
  HrmpChannelAccepted: Anonymize<Ifij4jam0o7sub>
  HrmpChannelClosing: Anonymize<Ieeb4svd9i8fji>
  ClearOrigin: undefined
  DescendOrigin: XcmV2MultilocationJunctions
  ReportError: {
    query_id: bigint
    dest: Anonymize<I4frqunb5hj2km>
    max_response_weight: bigint
  }
  DepositAsset: {
    assets: XcmV2MultiAssetFilter
    max_assets: number
    beneficiary: Anonymize<I4frqunb5hj2km>
  }
  DepositReserveAsset: {
    assets: XcmV2MultiAssetFilter
    max_assets: number
    dest: Anonymize<I4frqunb5hj2km>
    xcm: Anonymize<Iemqgk0vect4v7>
  }
  ExchangeAsset: {
    give: XcmV2MultiAssetFilter
    receive: Anonymize<I2sllmucln1iic>
  }
  InitiateReserveWithdraw: {
    assets: XcmV2MultiAssetFilter
    reserve: Anonymize<I4frqunb5hj2km>
    xcm: Anonymize<Iemqgk0vect4v7>
  }
  InitiateTeleport: {
    assets: XcmV2MultiAssetFilter
    dest: Anonymize<I4frqunb5hj2km>
    xcm: Anonymize<Iemqgk0vect4v7>
  }
  QueryHolding: {
    query_id: bigint
    dest: Anonymize<I4frqunb5hj2km>
    assets: XcmV2MultiAssetFilter
    max_response_weight: bigint
  }
  BuyExecution: {
    fees: Anonymize<Id8h647t880l31>
    weight_limit: XcmV2WeightLimit
  }
  RefundSurplus: undefined
  SetErrorHandler: Anonymize<Iemqgk0vect4v7>
  SetAppendix: Anonymize<Iemqgk0vect4v7>
  ClearError: undefined
  ClaimAsset: {
    assets: Anonymize<I2sllmucln1iic>
    ticket: Anonymize<I4frqunb5hj2km>
  }
  Trap: bigint
  SubscribeVersion: {
    query_id: bigint
    max_response_weight: bigint
  }
  UnsubscribeVersion: undefined
}>
export declare const XcmV2Instruction: GetEnum<XcmV2Instruction>
export type XcmV2MultiAssetFilter = Enum<{
  Definite: Anonymize<I2sllmucln1iic>
  Wild: XcmV2MultiassetWildMultiAsset
}>
export declare const XcmV2MultiAssetFilter: GetEnum<XcmV2MultiAssetFilter>
export type XcmV2MultiassetWildMultiAsset = Enum<{
  All: undefined
  AllOf: {
    id: XcmV2MultiassetAssetId
    fun: XcmV2MultiassetWildFungibility
  }
}>
export declare const XcmV2MultiassetWildMultiAsset: GetEnum<XcmV2MultiassetWildMultiAsset>
export type XcmV2WeightLimit = Enum<{
  Unlimited: undefined
  Limited: bigint
}>
export declare const XcmV2WeightLimit: GetEnum<XcmV2WeightLimit>
export type Ianvng4e08j9ii = Array<XcmV3Instruction>
export type XcmV3Instruction = Enum<{
  WithdrawAsset: Anonymize<Iai6dhqiq3bach>
  ReserveAssetDeposited: Anonymize<Iai6dhqiq3bach>
  ReceiveTeleportedAsset: Anonymize<Iai6dhqiq3bach>
  QueryResponse: {
    query_id: bigint
    response: XcmV3Response
    max_weight: Anonymize<I4q39t5hn830vp>
    querier?: Anonymize<Ia9cgf4r40b26h>
  }
  TransferAsset: {
    assets: Anonymize<Iai6dhqiq3bach>
    beneficiary: Anonymize<I4c0s5cioidn76>
  }
  TransferReserveAsset: {
    assets: Anonymize<Iai6dhqiq3bach>
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Ianvng4e08j9ii>
  }
  Transact: Anonymize<I92p6l5cs3fr50>
  HrmpNewChannelOpenRequest: Anonymize<I5uhhrjqfuo4e5>
  HrmpChannelAccepted: Anonymize<Ifij4jam0o7sub>
  HrmpChannelClosing: Anonymize<Ieeb4svd9i8fji>
  ClearOrigin: undefined
  DescendOrigin: XcmV3Junctions
  ReportError: Anonymize<I4r3v6e91d1qbs>
  DepositAsset: {
    assets: XcmV3MultiassetMultiAssetFilter
    beneficiary: Anonymize<I4c0s5cioidn76>
  }
  DepositReserveAsset: {
    assets: XcmV3MultiassetMultiAssetFilter
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Ianvng4e08j9ii>
  }
  ExchangeAsset: {
    give: XcmV3MultiassetMultiAssetFilter
    want: Anonymize<Iai6dhqiq3bach>
    maximal: boolean
  }
  InitiateReserveWithdraw: {
    assets: XcmV3MultiassetMultiAssetFilter
    reserve: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Ianvng4e08j9ii>
  }
  InitiateTeleport: {
    assets: XcmV3MultiassetMultiAssetFilter
    dest: Anonymize<I4c0s5cioidn76>
    xcm: Anonymize<Ianvng4e08j9ii>
  }
  ReportHolding: {
    response_info: Anonymize<I4r3v6e91d1qbs>
    assets: XcmV3MultiassetMultiAssetFilter
  }
  BuyExecution: {
    fees: Anonymize<Idcm24504c8bkk>
    weight_limit: XcmV3WeightLimit
  }
  RefundSurplus: undefined
  SetErrorHandler: Anonymize<Ianvng4e08j9ii>
  SetAppendix: Anonymize<Ianvng4e08j9ii>
  ClearError: undefined
  ClaimAsset: {
    assets: Anonymize<Iai6dhqiq3bach>
    ticket: Anonymize<I4c0s5cioidn76>
  }
  Trap: bigint
  SubscribeVersion: Anonymize<Ieprdqqu7ildvr>
  UnsubscribeVersion: undefined
  BurnAsset: Anonymize<Iai6dhqiq3bach>
  ExpectAsset: Anonymize<Iai6dhqiq3bach>
  ExpectOrigin?: Anonymize<Ia9cgf4r40b26h>
  ExpectError?: Anonymize<I7sltvf8v2nure>
  ExpectTransactStatus: XcmV3MaybeErrorCode
  QueryPallet: Anonymize<Iba5bdbapp16oo>
  ExpectPallet: Anonymize<Id7mf37dkpgfjs>
  ReportTransactStatus: Anonymize<I4r3v6e91d1qbs>
  ClearTransactStatus: undefined
  UniversalOrigin: XcmV3Junction
  ExportMessage: {
    network: XcmV3JunctionNetworkId
    destination: XcmV3Junctions
    xcm: Anonymize<Ianvng4e08j9ii>
  }
  LockAsset: {
    asset: Anonymize<Idcm24504c8bkk>
    unlocker: Anonymize<I4c0s5cioidn76>
  }
  UnlockAsset: {
    asset: Anonymize<Idcm24504c8bkk>
    target: Anonymize<I4c0s5cioidn76>
  }
  NoteUnlockable: {
    asset: Anonymize<Idcm24504c8bkk>
    owner: Anonymize<I4c0s5cioidn76>
  }
  RequestUnlock: {
    asset: Anonymize<Idcm24504c8bkk>
    locker: Anonymize<I4c0s5cioidn76>
  }
  SetFeesMode: Anonymize<I4nae9rsql8fa7>
  SetTopic: FixedSizeBinary<32>
  ClearTopic: undefined
  AliasOrigin: Anonymize<I4c0s5cioidn76>
  UnpaidExecution: Anonymize<I40d50jeai33oq>
}>
export declare const XcmV3Instruction: GetEnum<XcmV3Instruction>
export type XcmV3MultiassetMultiAssetFilter = Enum<{
  Definite: Anonymize<Iai6dhqiq3bach>
  Wild: XcmV3MultiassetWildMultiAsset
}>
export declare const XcmV3MultiassetMultiAssetFilter: GetEnum<XcmV3MultiassetMultiAssetFilter>
export type XcmV3MultiassetWildMultiAsset = Enum<{
  All: undefined
  AllOf: {
    id: XcmV3MultiassetAssetId
    fun: XcmV2MultiassetWildFungibility
  }
  AllCounted: number
  AllOfCounted: {
    id: XcmV3MultiassetAssetId
    fun: XcmV2MultiassetWildFungibility
    count: number
  }
}>
export declare const XcmV3MultiassetWildMultiAsset: GetEnum<XcmV3MultiassetWildMultiAsset>
export type Iakevv83i18n4r = {
  dest: PaseoXcmVersionedLocation
  beneficiary: PaseoXcmVersionedLocation
  assets: PaseoXcmVersionedAssets
  fee_asset_item: number
}
export type If2ssl12kcglhg = {
  message: PaseoXcmVersionedXcm
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type Ic76kfh5ebqkpl = {
  maybe_xcm_version?: Anonymize<I4arjljr6dpflb>
}
export type Icrujen33bbibf = {
  location: PaseoXcmVersionedLocation
}
export type I5gi8h3e5lkbeq = {
  dest: PaseoXcmVersionedLocation
  beneficiary: PaseoXcmVersionedLocation
  assets: PaseoXcmVersionedAssets
  fee_asset_item: number
  weight_limit: XcmV3WeightLimit
}
export type Ibgm4rnf22lal1 = {
  suspended: boolean
}
export type I8mmaab8je28oo = {
  assets: PaseoXcmVersionedAssets
  beneficiary: PaseoXcmVersionedLocation
}
export type I6r0pr82pbiftt = {
  dest: PaseoXcmVersionedLocation
  assets: PaseoXcmVersionedAssets
  assets_transfer_type: Enum<{
    Teleport: undefined
    LocalReserve: undefined
    DestinationReserve: undefined
    RemoteReserve: PaseoXcmVersionedLocation
  }>
  remote_fees_id: PaseoXcmVersionedAssetId
  fees_transfer_type: Enum<{
    Teleport: undefined
    LocalReserve: undefined
    DestinationReserve: undefined
    RemoteReserve: PaseoXcmVersionedLocation
  }>
  custom_xcm_on_dest: PaseoXcmVersionedXcm
  weight_limit: XcmV3WeightLimit
}
export type I3lic4llm6egbr = AnonymousEnum<{
  /**
   *Remove a page which has no more messages remaining to be processed or is stale.
   */
  reap_page: Anonymize<Ibv4ep0hngvn9e>
  /**
   *Execute an overweight message.
   *
   *Temporary processing errors will be propagated whereas permanent errors are treated
   *as success condition.
   *
   *- `origin`: Must be `Signed`.
   *- `message_origin`: The origin from which the message to be executed arrived.
   *- `page`: The page in the queue in which the message to be executed is sitting.
   *- `index`: The index into the queue of the message to be executed.
   *- `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
   *  of the message.
   *
   *Benchmark complexity considerations: O(index + weight_limit).
   */
  execute_overweight: Anonymize<Ieoqregtp7b00>
}>
export type Ibv4ep0hngvn9e = {
  message_origin: ParachainsInclusionAggregateMessageOrigin
  page_index: number
}
export type Ieoqregtp7b00 = {
  message_origin: ParachainsInclusionAggregateMessageOrigin
  page: number
  index: number
  weight_limit: Anonymize<I4q39t5hn830vp>
}
export type I85dm8mgt48css = AnonymousEnum<{
  /**
   *Initialize a conversion rate to native balance for the given asset.
   *
   *## Complexity
   *- O(1)
   */
  create: Anonymize<I6nmp4rhqla35>
  /**
   *Update the conversion rate to native balance for the given asset.
   *
   *## Complexity
   *- O(1)
   */
  update: Anonymize<I6nmp4rhqla35>
  /**
   *Remove an existing conversion rate to native balance for the given asset.
   *
   *## Complexity
   *- O(1)
   */
  remove: Anonymize<I8ndstn7sf4kek>
}>
export type Idmcmrk34p8gic = AnonymousEnum<{
  /**
   *Report voter equivocation/misbehavior. This method will verify the
   *equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence
   *will be reported.
   */
  report_double_voting: Anonymize<I3pirohb0sp3ic>
  /**
   *Report voter equivocation/misbehavior. This method will verify the
   *equivocation proof and validate the given key ownership proof
   *against the extracted offender. If both are valid, the offence
   *will be reported.
   *
   *This extrinsic must be called unsigned and it is expected that only
   *block authors will call it (validated in `ValidateUnsigned`), as such
   *if the block author is defined it will be defined as the equivocation
   *reporter.
   */
  report_double_voting_unsigned: Anonymize<I3pirohb0sp3ic>
  /**
   *Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the
   *future.
   *
   *Note: `delay_in_blocks` has to be at least 1.
   */
  set_new_genesis: Anonymize<Iemqna2uucuei9>
  /**
   *Report fork voting equivocation. This method will verify the equivocation proof
   *and validate the given key ownership proof against the extracted offender.
   *If both are valid, the offence will be reported.
   */
  report_fork_voting: Anonymize<Idrvp50hbkv2k2>
  /**
   *Report fork voting equivocation. This method will verify the equivocation proof
   *and validate the given key ownership proof against the extracted offender.
   *If both are valid, the offence will be reported.
   *
   *This extrinsic must be called unsigned and it is expected that only
   *block authors will call it (validated in `ValidateUnsigned`), as such
   *if the block author is defined it will be defined as the equivocation
   *reporter.
   */
  report_fork_voting_unsigned: Anonymize<Idrvp50hbkv2k2>
  /**
   *Report future block voting equivocation. This method will verify the equivocation proof
   *and validate the given key ownership proof against the extracted offender.
   *If both are valid, the offence will be reported.
   */
  report_future_block_voting: Anonymize<Ie11u326g2gsj3>
  /**
   *Report future block voting equivocation. This method will verify the equivocation proof
   *and validate the given key ownership proof against the extracted offender.
   *If both are valid, the offence will be reported.
   *
   *This extrinsic must be called unsigned and it is expected that only
   *block authors will call it (validated in `ValidateUnsigned`), as such
   *if the block author is defined it will be defined as the equivocation
   *reporter.
   */
  report_future_block_voting_unsigned: Anonymize<Ie11u326g2gsj3>
}>
export type I3pirohb0sp3ic = {
  equivocation_proof: Anonymize<Ifiofttj73fsk1>
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type Ifiofttj73fsk1 = {
  first: Anonymize<I3eao7ea0kppv8>
  second: Anonymize<I3eao7ea0kppv8>
}
export type I3eao7ea0kppv8 = {
  commitment: {
    payload: Array<[FixedSizeBinary<2>, Binary]>
    block_number: number
    validator_set_id: bigint
  }
  id: FixedSizeBinary<33>
  signature: FixedSizeBinary<65>
}
export type Iemqna2uucuei9 = {
  delay_in_blocks: number
}
export type Idrvp50hbkv2k2 = {
  equivocation_proof: {
    vote: Anonymize<I3eao7ea0kppv8>
    ancestry_proof: {
      prev_peaks: Anonymize<Ic5m5lp1oioo8r>
      prev_leaf_count: bigint
      leaf_count: bigint
      items: Array<[bigint, FixedSizeBinary<32>]>
    }
    header: Anonymize<Ic952bubvq4k7d>
  }
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type Ie11u326g2gsj3 = {
  equivocation_proof: Anonymize<I3eao7ea0kppv8>
  key_owner_proof: Anonymize<I3ia7aufsoj0l1>
}
export type I8tnfu4hpnpsg = AnonymousEnum<{
  /**
   *Schedule a para to be initialized at the start of the next session.
   *
   *This should only be used for TESTING and not on PRODUCTION chains. It automatically
   *assigns Coretime to the chain and increases the number of cores. Thus, there is no
   *running coretime chain required.
   */
  sudo_schedule_para_initialize: Anonymize<I9geq5evbpu4im>
  /**
   *Schedule a para to be cleaned up at the start of the next session.
   */
  sudo_schedule_para_cleanup: Anonymize<Ic5b47dj4coa3r>
  /**
   *Upgrade a parathread (on-demand parachain) to a lease holding parachain
   */
  sudo_schedule_parathread_upgrade: Anonymize<Ic5b47dj4coa3r>
  /**
   *Downgrade a lease holding parachain to an on-demand parachain
   */
  sudo_schedule_parachain_downgrade: Anonymize<Ic5b47dj4coa3r>
  /**
   *Send a downward XCM to the given para.
   *
   *The given parachain should exist and the payload should not exceed the preconfigured
   *size `config.max_downward_message_size`.
   */
  sudo_queue_downward_xcm: Anonymize<I7mlkc61s5tj4l>
  /**
   *Forcefully establish a channel from the sender to the recipient.
   *
   *This is equivalent to sending an `Hrmp::hrmp_init_open_channel` extrinsic followed by
   *`Hrmp::hrmp_accept_open_channel`.
   */
  sudo_establish_hrmp_channel: Anonymize<Ic3430470j4mbv>
}>
export type I9geq5evbpu4im = {
  id: number
  genesis: Anonymize<I2duhnt686rv0q>
}
export type I7mlkc61s5tj4l = {
  id: number
  xcm: PaseoXcmVersionedXcm
}
export type I6dm6n9d9gg8h1 = AnonymousEnum<{
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   */
  sudo: Anonymize<Id5stappeln7cb>
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   *This function does not check the weight of the call, and instead allows the
   *Sudo user to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_unchecked_weight: Anonymize<Ie51nb7b7usk0>
  /**
   *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
   *key.
   */
  set_key: Anonymize<I8k3rnvpeeh4hv>
  /**
   *Authenticates the sudo key and dispatches a function call with `Signed` origin from
   *a given account.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_as: Anonymize<I99906uhdjbsag>
  /**
   *Permanently removes the sudo key.
   *
   ***This cannot be un-done.**
   */
  remove_key: undefined
}>
export type I8k3rnvpeeh4hv = {
  new: MultiAddress
}
export type I99906uhdjbsag = {
  who: MultiAddress
  call: TxCallData
}
export type I3he5stuuhiokq = {
  inflation: bigint
  next_mint: Anonymize<I200n1ov5tbcvr>
}
export type Iaqet9jc3ihboe = {
  header: Anonymize<Ic952bubvq4k7d>
  extrinsics: Anonymize<Itom7fk49o0c9>
}
export type I2v50gu3s1aqk6 = AnonymousEnum<{
  AllExtrinsics: undefined
  OnlyInherents: undefined
}>
export type Idffb59t47hua4 = ResultPayload<Anonymize<I69hcjbv3dno0j>, TransactionValidityError>
export type TransactionValidityError = Enum<{
  Invalid: TransactionValidityInvalidTransaction
  Unknown: TransactionValidityUnknownTransaction
}>
export declare const TransactionValidityError: GetEnum<TransactionValidityError>
export type TransactionValidityInvalidTransaction = Enum<{
  Call: undefined
  Payment: undefined
  Future: undefined
  Stale: undefined
  BadProof: undefined
  AncientBirthBlock: undefined
  ExhaustsResources: undefined
  Custom: number
  BadMandatory: undefined
  MandatoryValidation: undefined
  BadSigner: undefined
}>
export declare const TransactionValidityInvalidTransaction: GetEnum<TransactionValidityInvalidTransaction>
export type TransactionValidityUnknownTransaction = Enum<{
  CannotLookup: undefined
  NoUnsignedValidator: undefined
  Custom: number
}>
export declare const TransactionValidityUnknownTransaction: GetEnum<TransactionValidityUnknownTransaction>
export type If7uv525tdvv7a = Array<[FixedSizeBinary<8>, Binary]>
export type I2an1fs2eiebjp = {
  okay: boolean
  fatal_error: boolean
  errors: Anonymize<If7uv525tdvv7a>
}
export type TransactionValidityTransactionSource = Enum<{
  InBlock: undefined
  Local: undefined
  External: undefined
}>
export declare const TransactionValidityTransactionSource: GetEnum<TransactionValidityTransactionSource>
export type Iajbob6uln5jct = ResultPayload<Anonymize<I6g5lcd9vf2cr0>, TransactionValidityError>
export type I6g5lcd9vf2cr0 = {
  priority: bigint
  requires: Anonymize<Itom7fk49o0c9>
  provides: Anonymize<Itom7fk49o0c9>
  longevity: bigint
  propagate: boolean
}
export type I5985kfq7sspta = [
  Anonymize<Iarlj3qd8u1v13>,
  {
    session_start_block: number
    group_rotation_frequency: number
    now: number
  },
]
export type I4jmodim0td97u = Array<CoreState>
export type CoreState = Enum<{
  Occupied: {
    next_up_on_available?: Anonymize<I4fn9prq249c92> | undefined
    occupied_since: number
    time_out_at: number
    next_up_on_time_out?: Anonymize<I4fn9prq249c92> | undefined
    availability: {
      bytes: Uint8Array
      bitsLen: number
    }
    group_responsible: number
    candidate_hash: FixedSizeBinary<32>
    candidate_descriptor: Anonymize<Ic7r865c0luc3k>
  }
  Scheduled: Anonymize<I4fn9prq249c92>
  Free: undefined
}>
export declare const CoreState: GetEnum<CoreState>
export type I4fn9prq249c92 = {
  para_id: number
  collator?: Anonymize<I4s6vifaf8k998>
}
export type OccupiedCoreAssumption = Enum<{
  Included: undefined
  TimedOut: undefined
  Free: undefined
}>
export declare const OccupiedCoreAssumption: GetEnum<OccupiedCoreAssumption>
export type I9kavsa730sjfr = Anonymize<Ifn6q3equiq9qi> | undefined
export type Ifn6q3equiq9qi = {
  parent_head: Binary
  relay_parent_number: number
  relay_parent_storage_root: FixedSizeBinary<32>
  max_pov_size: number
}
export type Ifn3gc8nc1jruq = [Anonymize<Ifn6q3equiq9qi>, FixedSizeBinary<32>] | undefined
export type Ic5plng3kq7oc8 = Anonymize<I7t2ron16fup67> | undefined
export type Iajdik7eaq7pn0 = Array<CandidateEvent>
export type CandidateEvent = Enum<{
  CandidateBacked: Anonymize<Icdu1nb48l753j>
  CandidateIncluded: Anonymize<Icdu1nb48l753j>
  CandidateTimedOut: Anonymize<I618m2uag0aopg>
}>
export declare const CandidateEvent: GetEnum<CandidateEvent>
export type I2pf0b05mc7sdr = Array<[number, Anonymize<Iev3u09i2vqn93>]>
export type I7n1him6iq79fv = Anonymize<Ilg2fqs6cjgs3> | undefined
export type Ialuks4a6iupcs = Anonymize<I9m4rd2a7lc9md> | undefined
export type Idv6tqqnmb3i1j = Array<[number, FixedSizeBinary<32>, Anonymize<I87u7jalc0lhah>]>
export type Iekan13fn586c2 = Anonymize<I80rnntpog8qp6> | undefined
export type Idrp5a1qbbi2au = Array<[number, FixedSizeBinary<32>, Anonymize<I5kqchhvguhfvt>]>
export type Iacuu7pfj40eo5 =
  | {
      constraints: {
        min_relay_parent_number: number
        max_pov_size: number
        max_code_size: number
        ump_remaining: number
        ump_remaining_bytes: number
        max_ump_num_per_candidate: number
        dmp_remaining_messages: Anonymize<Icgljjb6j82uhn>
        hrmp_inbound: Anonymize<Icgljjb6j82uhn>
        hrmp_channels_out: Array<
          [
            number,
            {
              bytes_remaining: number
              messages_remaining: number
            },
          ]
        >
        max_hrmp_num_per_candidate: number
        required_parent: Binary
        validation_code_hash: FixedSizeBinary<32>
        upgrade_restriction?: Anonymize<Ia3sb0vgvovhtg>
        future_validation_code?: Anonymize<I4p5t2krb1gmvp> | undefined
      }
      pending_availability: Array<{
        candidate_hash: FixedSizeBinary<32>
        descriptor: Anonymize<Ic7r865c0luc3k>
        commitments: Anonymize<Ic1d4u2opv3fst>
        relay_parent_number: number
        max_pov_size: number
      }>
    }
  | undefined
export type Ia3sb0vgvovhtg = UpgradeRestriction | undefined
export type I3cs5lehnlql7v = Array<Anonymize<I7t2ron16fup67>>
export type Ifogo2hpqpe6b4 =
  | {
      validators: Anonymize<I2fb54desdqd9n>
      id: bigint
    }
  | undefined
export type I25plekc1moieu = {
  vote: Anonymize<I3eao7ea0kppv8>
  ancestry_proof: Binary
  header: Anonymize<Ic952bubvq4k7d>
}
export type I7rj2bnb76oko1 = ResultPayload<FixedSizeBinary<32>, MmrPrimitivesError>
export type MmrPrimitivesError = Enum<{
  InvalidNumericOp: undefined
  Push: undefined
  GetRoot: undefined
  Commit: undefined
  GenerateProof: undefined
  Verify: undefined
  LeafNotFound: undefined
  PalletNotIncluded: undefined
  InvalidLeafIndex: undefined
  InvalidBestKnownBlock: undefined
}>
export declare const MmrPrimitivesError: GetEnum<MmrPrimitivesError>
export type I4o356o7eq06ms = ResultPayload<bigint, MmrPrimitivesError>
export type I46e127tr8ma2h = ResultPayload<
  [Anonymize<Itom7fk49o0c9>, Anonymize<I38ee9is0n4jn9>],
  MmrPrimitivesError
>
export type I38ee9is0n4jn9 = {
  leaf_indices: Anonymize<Iafqnechp3omqg>
  leaf_count: bigint
  items: Anonymize<Ic5m5lp1oioo8r>
}
export type Ie88mmnuvmuvp5 = ResultPayload<undefined, MmrPrimitivesError>
export type Iems84l8lk2v0c = {
  slot_duration: bigint
  epoch_length: bigint
  c: Anonymize<I200n1ov5tbcvr>
  authorities: Anonymize<I3geksg000c171>
  randomness: FixedSizeBinary<32>
  allowed_slots: BabeAllowedSlots
}
export type I1r5ke30ueqo0r = {
  epoch_index: bigint
  start_slot: bigint
  duration: bigint
  authorities: Anonymize<I3geksg000c171>
  randomness: FixedSizeBinary<32>
  config: Anonymize<I8jnd4d8ip6djo>
}
export type Icerf8h8pdu8ss = Array<[Binary, FixedSizeBinary<4>]> | undefined
export type I6spmpef2c7svf = {
  weight: Anonymize<I4q39t5hn830vp>
  class: DispatchClass
  partial_fee: bigint
}
export type Iei2mvq0mjvt81 = {
  inclusion_fee?:
    | {
        base_fee: bigint
        len_fee: bigint
        adjusted_weight_fee: bigint
      }
    | undefined
  tip: bigint
}
export type If684pu32bptn4 = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  Scheduler: Anonymize<I2tnpqo44cdqnb>
  Preimage: Anonymize<If81ks88t5mpk5>
  Babe: Anonymize<I1jeo0dpbkma5g>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  Indices: Anonymize<I66vlm8f4l1oll>
  Balances: Anonymize<I9svldsp29mh87>
  Staking: Anonymize<I43p3eod37a43i>
  Session: Anonymize<Iceajactc9a8pc>
  Grandpa: Anonymize<I5u9ggmn8umfqm>
  Treasury: Anonymize<I1s28h18nhih63>
  ConvictionVoting: Anonymize<Ie5kd08tutk56t>
  Referenda: Anonymize<I657vbelok0a1m>
  Whitelist: Anonymize<Iak3vuv8a1mgfv>
  Parameters: Anonymize<Ic5v5ffa0cr70p>
  Claims: Anonymize<Id0dj18ct09hlp>
  Vesting: Anonymize<Icgf8vmtkbnu4u>
  Utility: Anonymize<I9gkib66u3t8ci>
  Proxy: Anonymize<I4v0vcfbktbouk>
  Multisig: Anonymize<I8phhmkb56o2s3>
  Bounties: Anonymize<I91kpi5kjh9on2>
  ChildBounties: Anonymize<I1b6drdhvt5hl9>
  ElectionProviderMultiPhase: Anonymize<I15soeogelbbbh>
  VoterList: Anonymize<Ifvfo1l0vu2o7e>
  NominationPools: Anonymize<I57mljkkr28m9p>
  FastUnstake: Anonymize<I44snhj1gahvrd>
  Configuration: Anonymize<Ia9ptue949ognv>
  ParasShared: undefined
  ParaInclusion: undefined
  ParaInherent: Anonymize<Id5l4f3jqtnb0u>
  Paras: Anonymize<Ie2dden5k4kk7t>
  Initializer: Anonymize<Ieggtnkc96vvt7>
  Hrmp: Anonymize<I45adic8nko129>
  ParasDisputes: Anonymize<Ifkh1ep7g9h3rv>
  ParasSlashing: Anonymize<I3jj054kp2bjol>
  OnDemand: Anonymize<I9s7urueli180g>
  Registrar: Anonymize<Icclqj5sge2nc7>
  Slots: Anonymize<Iafhis924j14hg>
  Auctions: Anonymize<I4a8qeimc5p3qn>
  Crowdloan: Anonymize<Iaj4q75nu5v2i2>
  Coretime: Anonymize<Idu7bbtd2jtnb9>
  StateTrieMigration: Anonymize<I39l72gdmkk30t>
  XcmPallet: Anonymize<I9nbjvlrb9bp1g>
  MessageQueue: Anonymize<I3lic4llm6egbr>
  AssetRate: Anonymize<I85dm8mgt48css>
  Beefy: Anonymize<Idmcmrk34p8gic>
  ParaSudoWrapper: Anonymize<I8tnfu4hpnpsg>
  Sudo: Anonymize<I6dm6n9d9gg8h1>
}>
export type I1p1369d52j8jd = ResultPayload<
  Array<PaseoXcmVersionedAssetId>,
  Anonymize<Iavct6f844hfju>
>
export type Iavct6f844hfju = AnonymousEnum<{
  Unimplemented: undefined
  VersionedConversionFailed: undefined
  WeightNotComputable: undefined
  UnhandledXcmVersion: undefined
  AssetNotFound: undefined
  Unroutable: undefined
}>
export type Ic0c3req3mlc1l = ResultPayload<Anonymize<I4q39t5hn830vp>, Anonymize<Iavct6f844hfju>>
export type I7ocn4njqde3v5 = ResultPayload<bigint, Anonymize<Iavct6f844hfju>>
export type I5rlt6h8ph553n = ResultPayload<PaseoXcmVersionedAssets, Anonymize<Iavct6f844hfju>>
export type I2mj15bm0lbuld = ResultPayload<
  {
    execution_result: Anonymize<I6ngqh4u0vq3tq>
    emitted_events: Anonymize<I44f9uepoll2ss>
    local_xcm?: Anonymize<I3i0ce56p044d2>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I44f9uepoll2ss = Array<Anonymize<Idj9mkv75vhk2v>>
export type I3i0ce56p044d2 = PaseoXcmVersionedXcm | undefined
export type I47tkk5e5nm6g7 = Array<[PaseoXcmVersionedLocation, Array<PaseoXcmVersionedXcm>]>
export type I55ku9c5gk50hb = AnonymousEnum<{
  Unimplemented: undefined
  VersionedConversionFailed: undefined
}>
export type I58v29g4r9j9ir = ResultPayload<
  {
    execution_result: XcmV4TraitsOutcome
    emitted_events: Anonymize<I44f9uepoll2ss>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type Ieh6nis3hdbtgi = ResultPayload<
  SS58String,
  Enum<{
    Unsupported: undefined
    VersionedConversionFailed: undefined
  }>
>
export type Ie9sr1iqcg3cgm = ResultPayload<undefined, string>
export type I1mqgk2tmnn9i2 = string | undefined
export type I6lr8sctk0bi4e = Array<string>
export type Ifc1lrgdnfp93l = Array<{
  phase: Phase
  event: Anonymize<I8smilpcv7aec9>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type I8smilpcv7aec9 = AnonymousEnum<{
  System: Anonymize<I5fqrg2qng9r8o>
  Scheduler: Anonymize<Iad9kj6s9m553>
  Preimage: PreimageEvent
  Indices: IndicesEvent
  Balances: Anonymize<Iao8h4hv7atnq3>
  TransactionPayment: TransactionPaymentEvent
  Staking: StakingEvent
  Offences: OffencesEvent
  Session: SessionEvent
  Grandpa: GrandpaEvent
  Treasury: Anonymize<Iceo3qo846468b>
  ConvictionVoting: Anonymize<Itdqso6dq8jq1>
  Referenda: Anonymize<Idfraa3b4eu018>
  Whitelist: Anonymize<Ieofpoa31c25jb>
  Claims: CommonClaimsEvent
  Vesting: VestingEvent
  Utility: Anonymize<I6jacn074qudka>
  Proxy: Anonymize<I2ipgkitk6hugv>
  Multisig: Anonymize<Idlvrfgkmrjruk>
  Bounties: BountiesEvent
  ChildBounties: ChildBountiesEvent
  ElectionProviderMultiPhase: ElectionProviderMultiPhaseEvent
  VoterList: BagsListEvent
  NominationPools: Anonymize<I1mroqu3ca6qo2>
  FastUnstake: Anonymize<I2krhsbp98ssdj>
  DelegatedStaking: Anonymize<I1nq1se98idofq>
  ParaInclusion: ParachainsInclusionEvent
  Paras: ParachainsParasEvent
  Hrmp: ParachainsHrmpEvent
  ParasDisputes: ParachainsDisputesEvent
  OnDemand: Anonymize<Icuu6jjue8o6eb>
  Registrar: CommonParasRegistrarEvent
  Slots: CommonSlotsEvent
  Auctions: CommonAuctionsEvent
  Crowdloan: Anonymize<I4u43p5fhdoasl>
  Coretime: PolkadotRuntimeParachainsCoretimeEvent
  StateTrieMigration: Anonymize<I61dksvl51aujo>
  XcmPallet: Anonymize<I5ce1ru810vv9d>
  MessageQueue: Anonymize<I13vul90391uuv>
  AssetRate: AssetRateEvent
}>
export type I5fqrg2qng9r8o = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<Ie1apphr8o5a96>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
}>
export type Ie1apphr8o5a96 = {
  dispatch_error: Anonymize<Iasuqahos5nsl>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type Iasuqahos5nsl = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    Scheduler: Anonymize<If7oa8fprnilo5>
    Preimage: Anonymize<I4cfhml1prt4lu>
    Babe: Anonymize<Ib6q602k6o213a>
    Timestamp: undefined
    Indices: Anonymize<Icq1825fru3di2>
    Balances: Anonymize<Idj13i7adlomht>
    TransactionPayment: undefined
    Authorship: undefined
    Staking: Anonymize<I2vmrg3q4huhgg>
    Offences: undefined
    Historical: undefined
    Session: Anonymize<I1e07dgbaqd1sq>
    Grandpa: Anonymize<I7q8i0pp1gkas6>
    AuthorityDiscovery: undefined
    Treasury: Anonymize<I36uss0m9fpcsf>
    ConvictionVoting: Anonymize<Idfa8k8ikssbsf>
    Referenda: Anonymize<I84u4ul208g742>
    Origins: undefined
    Whitelist: Anonymize<I15nctscutpbeh>
    Claims: Anonymize<Ijh2jbbqvb176>
    Vesting: Anonymize<Icof2acl69lq3c>
    Utility: Anonymize<I8dt2g2hcrgh36>
    Proxy: Anonymize<Iuvt54ei4cehc>
    Multisig: Anonymize<Ia76qmhhg4jvb9>
    Bounties: Anonymize<Ibfvjqqblobf53>
    ChildBounties: Anonymize<I4u5ou5u3tthff>
    ElectionProviderMultiPhase: Anonymize<Idb84kfjd998sl>
    VoterList: Anonymize<Ic35l5bgiij29p>
    NominationPools: Anonymize<Iuudu4kursojc>
    FastUnstake: Anonymize<Iau9bur8dc3bec>
    DelegatedStaking: Anonymize<Iaogv3iimefnis>
    ParachainsOrigin: undefined
    Configuration: Anonymize<In1jctfv299lm>
    ParasShared: undefined
    ParaInclusion: Anonymize<I4rrcn97hglfls>
    ParaInherent: Anonymize<Idfqgoii3heb2f>
    ParaScheduler: undefined
    Paras: Anonymize<Ieo97unb4d08rl>
    Initializer: undefined
    Dmp: undefined
    Hrmp: Anonymize<Ibns95nfmm92df>
    ParaSessionInfo: undefined
    ParasDisputes: Anonymize<Iakburbqot4g58>
    ParasSlashing: Anonymize<I1v70p1j0r2q1j>
    OnDemand: Anonymize<I8htscm3ert491>
    CoretimeAssignmentProvider: Anonymize<Ie3b9qd0nd59gs>
    Registrar: Anonymize<I97vkspnd0b8bh>
    Slots: Anonymize<Iers095sa65pbg>
    Auctions: Anonymize<I4kgo47o2v3701>
    Crowdloan: Anonymize<I9o6l1c4r4qc3s>
    Coretime: Anonymize<Ifju0orssp9h7o>
    StateTrieMigration: Anonymize<I96objte63brjr>
    XcmPallet: Anonymize<I87j95aq93d7dq>
    MessageQueue: Anonymize<I5iupade5ag2dp>
    AssetRate: Anonymize<I3qgd61cgli6cp>
    Beefy: Anonymize<Iflve6qd33ah68>
    Mmr: undefined
    BeefyMmrLeaf: undefined
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
}>
export type Iad9kj6s9m553 = AnonymousEnum<{
  /**
   *Scheduled some task.
   */
  Scheduled: Anonymize<I5n4sebgkfr760>
  /**
   *Canceled some task.
   */
  Canceled: Anonymize<I5n4sebgkfr760>
  /**
   *Dispatched some task.
   */
  Dispatched: Anonymize<Ido4754sslradr>
  /**
   *Set a retry configuration for some task.
   */
  RetrySet: Anonymize<Ia3c82eadg79bj>
  /**
   *Cancel a retry configuration for some task.
   */
  RetryCancelled: Anonymize<Ienusoeb625ftq>
  /**
   *The call for the provided hash was not found so the task has been aborted.
   */
  CallUnavailable: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be renewed since the agenda is full at that block.
   */
  PeriodicFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be retried since the agenda is full at that block or there
   *was not enough weight to reschedule it.
   */
  RetryFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task can never be executed since it is overweight.
   */
  PermanentlyOverweight: Anonymize<Ienusoeb625ftq>
}>
export type Ido4754sslradr = {
  task: Anonymize<I9jd27rnpm8ttv>
  id?: Anonymize<I4s6vifaf8k998>
  result: Anonymize<Iamp5gnmld9ask>
}
export type Iamp5gnmld9ask = ResultPayload<undefined, Anonymize<Iasuqahos5nsl>>
export type Ieofpoa31c25jb = AnonymousEnum<{
  CallWhitelisted: Anonymize<I1adbcfi5uc62r>
  WhitelistedCallRemoved: Anonymize<I1adbcfi5uc62r>
  WhitelistedCallDispatched: Anonymize<I4u5vbi92efqr2>
}>
export type I4u5vbi92efqr2 = {
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I2521drcmelk94>
}
export type I2521drcmelk94 = ResultPayload<
  Anonymize<Ia1u1r3n74r13c>,
  {
    post_info: Anonymize<Ia1u1r3n74r13c>
    error: Anonymize<Iasuqahos5nsl>
  }
>
export type I6jacn074qudka = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<Ibingl7cng5dvj>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<I8c8d3j0mf0r8k>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<Iepesff449kkdr>
}>
export type Ibingl7cng5dvj = {
  index: number
  error: Anonymize<Iasuqahos5nsl>
}
export type I8c8d3j0mf0r8k = {
  error: Anonymize<Iasuqahos5nsl>
}
export type Iepesff449kkdr = {
  result: Anonymize<Iamp5gnmld9ask>
}
export type I2ipgkitk6hugv = AnonymousEnum<{
  /**
   *A proxy was executed correctly, with the given.
   */
  ProxyExecuted: Anonymize<Iepesff449kkdr>
  /**
   *A pure account has been created by new proxy with given
   *disambiguation index and proxy type.
   */
  PureCreated: Anonymize<Iamng908a7suk4>
  /**
   *An announcement was placed to make a call in the future.
   */
  Announced: Anonymize<I2ur0oeqg495j8>
  /**
   *A proxy was added.
   */
  ProxyAdded: Anonymize<Iejcjkg8bsr2ik>
  /**
   *A proxy was removed.
   */
  ProxyRemoved: Anonymize<Iejcjkg8bsr2ik>
}>
export type Idlvrfgkmrjruk = AnonymousEnum<{
  /**
   *A new multisig operation has begun.
   */
  NewMultisig: Anonymize<Iep27ialq4a7o7>
  /**
   *A multisig operation has been approved by someone.
   */
  MultisigApproval: Anonymize<Iasu5jvoqr43mv>
  /**
   *A multisig operation has been executed.
   */
  MultisigExecuted: Anonymize<Iep2qi870lrp7o>
  /**
   *A multisig operation has been cancelled.
   */
  MultisigCancelled: Anonymize<I5qolde99acmd1>
}>
export type Iep2qi870lrp7o = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
  result: Anonymize<Iamp5gnmld9ask>
}
export type I2krhsbp98ssdj = AnonymousEnum<{
  /**
   *A staker was unstaked.
   */
  Unstaked: Anonymize<Id34eq8cv04htb>
  /**
   *A staker was slashed for requesting fast-unstake whilst being exposed.
   */
  Slashed: Anonymize<Ifk8eme5o7mukf>
  /**
   *A batch was partially checked for the given eras, but the process did not finish.
   */
  BatchChecked: Anonymize<Ic0he9tlf9ll0u>
  /**
   *A batch of a given size was terminated.
   *
   *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
   *of the batch. A new batch will be created upon next block.
   */
  BatchFinished: Anonymize<I54umskavgc9du>
  /**
   *An internal error happened. Operations will be paused now.
   */
  InternalError: undefined
}>
export type Id34eq8cv04htb = {
  stash: SS58String
  result: Anonymize<Iamp5gnmld9ask>
}
export type I4u43p5fhdoasl = AnonymousEnum<{
  /**
   *Create a new crowdloaning campaign.
   */
  Created: Anonymize<I37r4bdai8o9mp>
  /**
   *Contributed to a crowd sale.
   */
  Contributed: Anonymize<I8ve4g3egaln6a>
  /**
   *Withdrew full balance of a contributor.
   */
  Withdrew: Anonymize<I8ve4g3egaln6a>
  /**
   *The loans in a fund have been partially dissolved, i.e. there are some left
   *over child keys that still need to be killed.
   */
  PartiallyRefunded: Anonymize<I37r4bdai8o9mp>
  /**
   *All loans in a fund have been refunded.
   */
  AllRefunded: Anonymize<I37r4bdai8o9mp>
  /**
   *Fund is dissolved.
   */
  Dissolved: Anonymize<I37r4bdai8o9mp>
  /**
   *The result of trying to submit a new bid to the Slots pallet.
   */
  HandleBidResult: Anonymize<I7o17b2v4n3s9a>
  /**
   *The configuration to a crowdloan has been edited.
   */
  Edited: Anonymize<I37r4bdai8o9mp>
  /**
   *A memo has been updated.
   */
  MemoUpdated: Anonymize<If4hvqaeoqq5us>
  /**
   *A parachain has been moved to `NewRaise`
   */
  AddedToNewRaise: Anonymize<I37r4bdai8o9mp>
}>
export type I7o17b2v4n3s9a = {
  para_id: number
  result: Anonymize<Iamp5gnmld9ask>
}
export type I3tp4u8h6s5ugk = AnonymousEnum<{
  /**
   *Anonymously schedule a task.
   */
  schedule: Anonymize<I6qrul5ppjg04o>
  /**
   *Cancel an anonymously scheduled task.
   */
  cancel: Anonymize<I5n4sebgkfr760>
  /**
   *Schedule a named task.
   */
  schedule_named: Anonymize<I39hrm1ul9d7j3>
  /**
   *Cancel a named scheduled task.
   */
  cancel_named: Anonymize<Ifs1i5fk9cqvr6>
  /**
   *Anonymously schedule a task after a delay.
   */
  schedule_after: Anonymize<I3dqq1kl4ta3h1>
  /**
   *Schedule a named task after a delay.
   */
  schedule_named_after: Anonymize<Iedm48sjgjthn1>
  /**
   *Set a retry configuration for a task so that, in case its scheduled run fails, it will
   *be retried after `period` blocks, for a total amount of `retries` retries or until it
   *succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry: Anonymize<Ieg3fd8p4pkt10>
  /**
   *Set a retry configuration for a named task so that, in case its scheduled run fails, it
   *will be retried after `period` blocks, for a total amount of `retries` retries or until
   *it succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry_named: Anonymize<I8kg5ll427kfqq>
  /**
   *Removes the retry configuration of a task.
   */
  cancel_retry: Anonymize<I467333262q1l9>
  /**
   *Cancel the retry configuration of a named task.
   */
  cancel_retry_named: Anonymize<Ifs1i5fk9cqvr6>
}>
export type I6qrul5ppjg04o = {
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I39hrm1ul9d7j3 = {
  id: FixedSizeBinary<32>
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I3dqq1kl4ta3h1 = {
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type Iedm48sjgjthn1 = {
  id: FixedSizeBinary<32>
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type If5ln3jubo7bdo = AnonymousEnum<{
  whitelist_call: Anonymize<I1adbcfi5uc62r>
  remove_whitelisted_call: Anonymize<I1adbcfi5uc62r>
  dispatch_whitelisted_call: Anonymize<Ibf6ucefn8fh49>
  dispatch_whitelisted_call_with_preimage: Anonymize<Iakiss84dgak4n>
}>
export type Iakiss84dgak4n = {
  call: TxCallData
}
export type Idqqpjh8qu65et = AnonymousEnum<{
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
  batch: Anonymize<I9p0um8kpbr12g>
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
  as_derivative: Anonymize<I7uhrd29q39ufc>
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
  batch_all: Anonymize<I9p0um8kpbr12g>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<I67mcnf0a999m8>
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
  force_batch: Anonymize<I9p0um8kpbr12g>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<Iaglml4f420m9p>
}>
export type I9p0um8kpbr12g = {
  calls: Array<TxCallData>
}
export type I7uhrd29q39ufc = {
  index: number
  call: TxCallData
}
export type I67mcnf0a999m8 = {
  as_origin: PolkadotRuntimeOriginCaller
  call: TxCallData
}
export type Iaglml4f420m9p = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type I1huvf244av28n = AnonymousEnum<{
  /**
   *Dispatch the given `call` from an account that the sender is authorised for through
   *`add_proxy`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy: Anonymize<Ift6640jkhjjp7>
  /**
   *Register a proxy account for the sender that is able to make calls on its behalf.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to make a proxy.
   *- `proxy_type`: The permissions allowed for this proxy account.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   */
  add_proxy: Anonymize<Ib1tr5ljcskalg>
  /**
   *Unregister a proxy account for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to remove as a proxy.
   *- `proxy_type`: The permissions currently enabled for the removed proxy account.
   */
  remove_proxy: Anonymize<Ib1tr5ljcskalg>
  /**
   *Unregister all proxy accounts for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *WARNING: This may be called on accounts created by `pure`, however if done, then
   *the unreserved fees will be inaccessible. **All access to this account will be lost.**
   */
  remove_proxies: undefined
  /**
   *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
   *initialize it with a proxy of `proxy_type` for `origin` sender.
   *
   *Requires a `Signed` origin.
   *
   *- `proxy_type`: The type of the proxy that the sender will be registered as over the
   *new account. This will almost always be the most permissive `ProxyType` possible to
   *allow for maximum flexibility.
   *- `index`: A disambiguation index, in case this is called multiple times in the same
   *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
   *want to use `0`.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   *
   *Fails with `Duplicate` if this has already been called in this transaction, from the
   *same sender, with the same parameters.
   *
   *Fails if there are insufficient funds to pay for deposit.
   */
  create_pure: Anonymize<I7l4hu9floq5js>
  /**
   *Removes a previously spawned pure proxy.
   *
   *WARNING: **All access to this account will be lost.** Any funds held in it will be
   *inaccessible.
   *
   *Requires a `Signed` origin, and the sender account must have been created by a call to
   *`pure` with corresponding parameters.
   *
   *- `spawner`: The account that originally called `pure` to create this account.
   *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
   *- `proxy_type`: The proxy type originally passed to `pure`.
   *- `height`: The height of the chain when the call to `pure` was processed.
   *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
   *
   *Fails with `NoPermission` in case the caller is not a previously created pure
   *account whose `pure` call has corresponding parameters.
   */
  kill_pure: Anonymize<I5860vql6ga92>
  /**
   *Publish the hash of a proxy-call that will be made in the future.
   *
   *This must be called some number of blocks before the corresponding `proxy` is attempted
   *if the delay associated with the proxy relationship is greater than zero.
   *
   *No more than `MaxPending` announcements may be made at any one time.
   *
   *This will take a deposit of `AnnouncementDepositFactor` as well as
   *`AnnouncementDepositBase` if there are no other pending announcements.
   *
   *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  announce: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove a given announcement.
   *
   *May be called by a proxy account to remove a call they previously announced and return
   *the deposit.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  remove_announcement: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove the given announcement of a delegate.
   *
   *May be called by a target (proxied) account to remove a call that one of their delegates
   *(`delegate`) has announced they want to execute. The deposit is returned.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `delegate`: The account that previously announced the call.
   *- `call_hash`: The hash of the call to be made.
   */
  reject_announcement: Anonymize<Ianmuoljk2sk1u>
  /**
   *Dispatch the given `call` from an account that the sender is authorized for through
   *`add_proxy`.
   *
   *Removes any corresponding announcement(s).
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy_announced: Anonymize<Ibi0iatpvqjc0n>
}>
export type Ift6640jkhjjp7 = {
  real: MultiAddress
  force_proxy_type?: Anonymize<I93g3hgcn0dpaj>
  call: TxCallData
}
export type Ibi0iatpvqjc0n = {
  delegate: MultiAddress
  real: MultiAddress
  force_proxy_type?: Anonymize<I93g3hgcn0dpaj>
  call: TxCallData
}
export type I713ipp3b4eds9 = AnonymousEnum<{
  /**
   *Immediately dispatch a multi-signature call using a single approval from the caller.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `other_signatories`: The accounts (other than the sender) who are part of the
   *multi-signature, but do not participate in the approval process.
   *- `call`: The call to be executed.
   *
   *Result is equivalent to the dispatched result.
   *
   *## Complexity
   *O(Z + C) where Z is the length of the call and C its execution weight.
   */
  as_multi_threshold_1: Anonymize<I2u5nmvda3ksut>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *If there are enough, then dispatch the call.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call`: The call to be executed.
   *
   *NOTE: Unless this is the final approval, you will generally want to use
   *`approve_as_multi` instead, since it only requires a hash of the call.
   *
   *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *on success, result is `Ok` and the result from the interior call, if it was executed,
   *may be found in the deposited `MultisigExecuted` event.
   *
   *## Complexity
   *- `O(S + Z + Call)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- The weight of the `call`.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  as_multi: Anonymize<I5062qdvfub72u>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call_hash`: The hash of the call to be executed.
   *
   *NOTE: If this is the final approval, you will want to use `as_multi` instead.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  approve_as_multi: Anonymize<Ideaemvoneh309>
  /**
   *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
   *for this operation will be unreserved on success.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `timepoint`: The timepoint (block number and transaction index) of the first approval
   *transaction for this dispatch.
   *- `call_hash`: The hash of the call to be executed.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- One event.
   *- I/O: 1 read `O(S)`, one remove.
   *- Storage: removes one item.
   */
  cancel_as_multi: Anonymize<I3d9o9d7epp66v>
}>
export type I2u5nmvda3ksut = {
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  call: TxCallData
}
export type I5062qdvfub72u = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call: TxCallData
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type I5l34omdfueora = ResultPayload<Anonymize<Iamp5gnmld9ask>, TransactionValidityError>
export type I9slagtkgsv9j0 = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  Scheduler: Anonymize<I3tp4u8h6s5ugk>
  Preimage: Anonymize<If81ks88t5mpk5>
  Babe: Anonymize<I1jeo0dpbkma5g>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  Indices: Anonymize<I66vlm8f4l1oll>
  Balances: Anonymize<I9svldsp29mh87>
  Staking: Anonymize<I43p3eod37a43i>
  Session: Anonymize<Iceajactc9a8pc>
  Grandpa: Anonymize<I5u9ggmn8umfqm>
  Treasury: Anonymize<I1s28h18nhih63>
  ConvictionVoting: Anonymize<Ie5kd08tutk56t>
  Referenda: Anonymize<I657vbelok0a1m>
  Whitelist: Anonymize<If5ln3jubo7bdo>
  Claims: Anonymize<Id0dj18ct09hlp>
  Vesting: Anonymize<Icgf8vmtkbnu4u>
  Utility: Anonymize<Idqqpjh8qu65et>
  Proxy: Anonymize<I1huvf244av28n>
  Multisig: Anonymize<I713ipp3b4eds9>
  Bounties: Anonymize<I91kpi5kjh9on2>
  ChildBounties: Anonymize<I1b6drdhvt5hl9>
  ElectionProviderMultiPhase: Anonymize<I15soeogelbbbh>
  VoterList: Anonymize<Ifvfo1l0vu2o7e>
  NominationPools: Anonymize<I57mljkkr28m9p>
  FastUnstake: Anonymize<I44snhj1gahvrd>
  Configuration: Anonymize<Ia9ptue949ognv>
  ParasShared: undefined
  ParaInclusion: undefined
  ParaInherent: Anonymize<Id5l4f3jqtnb0u>
  Paras: Anonymize<Ie2dden5k4kk7t>
  Initializer: Anonymize<Ieggtnkc96vvt7>
  Hrmp: Anonymize<I45adic8nko129>
  ParasDisputes: Anonymize<Ifkh1ep7g9h3rv>
  ParasSlashing: Anonymize<I3jj054kp2bjol>
  OnDemand: Anonymize<I9s7urueli180g>
  Registrar: Anonymize<Icclqj5sge2nc7>
  Slots: Anonymize<Iafhis924j14hg>
  Auctions: Anonymize<I4a8qeimc5p3qn>
  Crowdloan: Anonymize<Iaj4q75nu5v2i2>
  Coretime: Anonymize<Idu7bbtd2jtnb9>
  StateTrieMigration: Anonymize<I39l72gdmkk30t>
  XcmPallet: Anonymize<I9nbjvlrb9bp1g>
  MessageQueue: Anonymize<I3lic4llm6egbr>
  AssetRate: Anonymize<I85dm8mgt48css>
  Beefy: Anonymize<Idmcmrk34p8gic>
}>
export type If1fmg4i09v1d8 = ResultPayload<
  {
    execution_result: Anonymize<I2521drcmelk94>
    emitted_events: Anonymize<I85ef80qr5efoc>
    local_xcm?: Anonymize<I3i0ce56p044d2>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I85ef80qr5efoc = Array<Anonymize<I8smilpcv7aec9>>
export type I76k77qd5gtluu = ResultPayload<
  {
    execution_result: XcmV4TraitsOutcome
    emitted_events: Anonymize<I85ef80qr5efoc>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type Ia3633h9pfkn7c = Array<{
  phase: Phase
  event: Anonymize<Id5ug5m0fg64gg>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type Id5ug5m0fg64gg = AnonymousEnum<{
  System: Anonymize<I2bl9sgf1ebv22>
  ParachainSystem: Anonymize<Icbsekf57miplo>
  Balances: Anonymize<Iao8h4hv7atnq3>
  TransactionPayment: TransactionPaymentEvent
  AssetTxPayment: Anonymize<Ifagg2q2o5fgjl>
  Vesting: VestingEvent
  CollatorSelection: Anonymize<I4srakrmf0fspo>
  Session: SessionEvent
  XcmpQueue: Anonymize<Idsqc7mhp6nnle>
  PolkadotXcm: Anonymize<I5ce1ru810vv9d>
  CumulusXcm: Anonymize<Ibvp9t1gqae5ct>
  MessageQueue: Anonymize<I2kosejppk3jon>
  Utility: Anonymize<Idc9gec0hbd2kq>
  Multisig: Anonymize<I92uujjintei36>
  Proxy: Anonymize<Ia8vt8ujoq488u>
  Assets: Anonymize<I6avancvg8fd05>
  Uniques: Anonymize<Ia0j71vjrjqu9p>
  Nfts: Anonymize<I6qicn8jn4fftj>
  ForeignAssets: Anonymize<I81i2fkdo6nple>
  PoolAssets: Anonymize<I6avancvg8fd05>
  AssetConversion: Anonymize<I31lqq0fjfmnfv>
  Sudo: Anonymize<Ie0gnsvlvopved>
}>
export type I2bl9sgf1ebv22 = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<I70us7eipq4rid>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
}>
export type I70us7eipq4rid = {
  dispatch_error: Anonymize<Id1b6jh4cusamh>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type Id1b6jh4cusamh = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    ParachainSystem: Anonymize<I9p95gln24a0rn>
    Timestamp: undefined
    ParachainInfo: undefined
    Balances: Anonymize<Idj13i7adlomht>
    TransactionPayment: undefined
    AssetTxPayment: undefined
    Vesting: Anonymize<Icof2acl69lq3c>
    Authorship: undefined
    CollatorSelection: Anonymize<I36bcffk2387dv>
    Session: Anonymize<I1e07dgbaqd1sq>
    Aura: undefined
    AuraExt: undefined
    XcmpQueue: Anonymize<Idnnbndsjjeqqs>
    PolkadotXcm: Anonymize<I87j95aq93d7dq>
    CumulusXcm: undefined
    ToKusamaXcmRouter: undefined
    MessageQueue: Anonymize<I5iupade5ag2dp>
    Utility: Anonymize<I8dt2g2hcrgh36>
    Multisig: Anonymize<Ia76qmhhg4jvb9>
    Proxy: Anonymize<Iuvt54ei4cehc>
    Assets: Anonymize<Iapedqb0veh71>
    Uniques: Anonymize<Ienq2ge2rhv4jm>
    Nfts: Anonymize<I58r1150kmj18u>
    ForeignAssets: Anonymize<Iapedqb0veh71>
    PoolAssets: Anonymize<Iapedqb0veh71>
    AssetConversion: Anonymize<I4u78hb23uhvi2>
    Sudo: Anonymize<Iaug04qjhbli00>
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
}>
export type I9p95gln24a0rn = AnonymousEnum<{
  /**
   *Attempt to upgrade validation function while existing upgrade pending.
   */
  OverlappingUpgrades: undefined
  /**
   *Polkadot currently prohibits this parachain from upgrading its validation function.
   */
  ProhibitedByPolkadot: undefined
  /**
   *The supplied validation function has compiled into a blob larger than Polkadot is
   *willing to run.
   */
  TooBig: undefined
  /**
   *The inherent which supplies the validation data did not run this block.
   */
  ValidationDataNotAvailable: undefined
  /**
   *The inherent which supplies the host configuration did not run this block.
   */
  HostConfigurationNotAvailable: undefined
  /**
   *No validation function upgrade is currently scheduled.
   */
  NotScheduled: undefined
  /**
   *No code upgrade has been authorized.
   */
  NothingAuthorized: undefined
  /**
   *The given code upgrade has not been authorized.
   */
  Unauthorized: undefined
}>
export type I36bcffk2387dv = AnonymousEnum<{
  /**
   *The pallet has too many candidates.
   */
  TooManyCandidates: undefined
  /**
   *Leaving would result in too few candidates.
   */
  TooFewEligibleCollators: undefined
  /**
   *Account is already a candidate.
   */
  AlreadyCandidate: undefined
  /**
   *Account is not a candidate.
   */
  NotCandidate: undefined
  /**
   *There are too many Invulnerables.
   */
  TooManyInvulnerables: undefined
  /**
   *Account is already an Invulnerable.
   */
  AlreadyInvulnerable: undefined
  /**
   *Account is not an Invulnerable.
   */
  NotInvulnerable: undefined
  /**
   *Account has no associated validator ID.
   */
  NoAssociatedValidatorId: undefined
  /**
   *Validator ID is not yet registered.
   */
  ValidatorNotRegistered: undefined
  /**
   *Could not insert in the candidate list.
   */
  InsertToCandidateListFailed: undefined
  /**
   *Could not remove from the candidate list.
   */
  RemoveFromCandidateListFailed: undefined
  /**
   *New deposit amount would be below the minimum candidacy bond.
   */
  DepositTooLow: undefined
  /**
   *Could not update the candidate list.
   */
  UpdateCandidateListFailed: undefined
  /**
   *Deposit amount is too low to take the target's slot in the candidate list.
   */
  InsufficientBond: undefined
  /**
   *The target account to be replaced in the candidate list is not a candidate.
   */
  TargetIsNotCandidate: undefined
  /**
   *The updated deposit amount is equal to the amount already reserved.
   */
  IdenticalDeposit: undefined
  /**
   *Cannot lower candidacy bond while occupying a future collator slot in the list.
   */
  InvalidUnreserve: undefined
}>
export type Idnnbndsjjeqqs = AnonymousEnum<{
  /**
   *Setting the queue config failed since one of its values was invalid.
   */
  BadQueueConfig: undefined
  /**
   *The execution is already suspended.
   */
  AlreadySuspended: undefined
  /**
   *The execution is already resumed.
   */
  AlreadyResumed: undefined
  /**
   *There are too many active outbound channels.
   */
  TooManyActiveOutboundChannels: undefined
  /**
   *The message is too big.
   */
  TooBig: undefined
}>
export type Iapedqb0veh71 = AnonymousEnum<{
  /**
   *Account balance must be greater than or equal to the transfer amount.
   */
  BalanceLow: undefined
  /**
   *The account to alter does not exist.
   */
  NoAccount: undefined
  /**
   *The signing account has no permission to do the operation.
   */
  NoPermission: undefined
  /**
   *The given asset ID is unknown.
   */
  Unknown: undefined
  /**
   *The origin account is frozen.
   */
  Frozen: undefined
  /**
   *The asset ID is already taken.
   */
  InUse: undefined
  /**
   *Invalid witness data given.
   */
  BadWitness: undefined
  /**
   *Minimum balance should be non-zero.
   */
  MinBalanceZero: undefined
  /**
   *Unable to increment the consumer reference counters on the account. Either no provider
   *reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
   *fewer then the maximum number of consumers has been reached.
   */
  UnavailableConsumer: undefined
  /**
   *Invalid metadata given.
   */
  BadMetadata: undefined
  /**
   *No approval exists that would allow the transfer.
   */
  Unapproved: undefined
  /**
   *The source account would not survive the transfer and it needs to stay alive.
   */
  WouldDie: undefined
  /**
   *The asset-account already exists.
   */
  AlreadyExists: undefined
  /**
   *The asset-account doesn't have an associated deposit.
   */
  NoDeposit: undefined
  /**
   *The operation would result in funds being burned.
   */
  WouldBurn: undefined
  /**
   *The asset is a live asset and is actively being used. Usually emit for operations such
   *as `start_destroy` which require the asset to be in a destroying state.
   */
  LiveAsset: undefined
  /**
   *The asset is not live, and likely being destroyed.
   */
  AssetNotLive: undefined
  /**
   *The asset status is not the expected status.
   */
  IncorrectStatus: undefined
  /**
   *The asset should be frozen before the given operation.
   */
  NotFrozen: undefined
  /**
   *Callback action resulted in error
   */
  CallbackFailed: undefined
  /**
   *The asset ID must be equal to the [`NextAssetId`].
   */
  BadAssetId: undefined
}>
export type Ienq2ge2rhv4jm = AnonymousEnum<{
  /**
   *The signing account has no permission to do the operation.
   */
  NoPermission: undefined
  /**
   *The given item ID is unknown.
   */
  UnknownCollection: undefined
  /**
   *The item ID has already been used for an item.
   */
  AlreadyExists: undefined
  /**
   *The owner turned out to be different to what was expected.
   */
  WrongOwner: undefined
  /**
   *Invalid witness data given.
   */
  BadWitness: undefined
  /**
   *The item ID is already taken.
   */
  InUse: undefined
  /**
   *The item or collection is frozen.
   */
  Frozen: undefined
  /**
   *The delegate turned out to be different to what was expected.
   */
  WrongDelegate: undefined
  /**
   *There is no delegate approved.
   */
  NoDelegate: undefined
  /**
   *No approval exists that would allow the transfer.
   */
  Unapproved: undefined
  /**
   *The named owner has not signed ownership of the collection is acceptable.
   */
  Unaccepted: undefined
  /**
   *The item is locked.
   */
  Locked: undefined
  /**
   *All items have been minted.
   */
  MaxSupplyReached: undefined
  /**
   *The max supply has already been set.
   */
  MaxSupplyAlreadySet: undefined
  /**
   *The provided max supply is less to the amount of items a collection already has.
   */
  MaxSupplyTooSmall: undefined
  /**
   *The given item ID is unknown.
   */
  UnknownItem: undefined
  /**
   *Item is not for sale.
   */
  NotForSale: undefined
  /**
   *The provided bid is too low.
   */
  BidTooLow: undefined
}>
export type I58r1150kmj18u = AnonymousEnum<{
  /**
   *The signing account has no permission to do the operation.
   */
  NoPermission: undefined
  /**
   *The given item ID is unknown.
   */
  UnknownCollection: undefined
  /**
   *The item ID has already been used for an item.
   */
  AlreadyExists: undefined
  /**
   *The approval had a deadline that expired, so the approval isn't valid anymore.
   */
  ApprovalExpired: undefined
  /**
   *The owner turned out to be different to what was expected.
   */
  WrongOwner: undefined
  /**
   *The witness data given does not match the current state of the chain.
   */
  BadWitness: undefined
  /**
   *Collection ID is already taken.
   */
  CollectionIdInUse: undefined
  /**
   *Items within that collection are non-transferable.
   */
  ItemsNonTransferable: undefined
  /**
   *The provided account is not a delegate.
   */
  NotDelegate: undefined
  /**
   *The delegate turned out to be different to what was expected.
   */
  WrongDelegate: undefined
  /**
   *No approval exists that would allow the transfer.
   */
  Unapproved: undefined
  /**
   *The named owner has not signed ownership acceptance of the collection.
   */
  Unaccepted: undefined
  /**
   *The item is locked (non-transferable).
   */
  ItemLocked: undefined
  /**
   *Item's attributes are locked.
   */
  LockedItemAttributes: undefined
  /**
   *Collection's attributes are locked.
   */
  LockedCollectionAttributes: undefined
  /**
   *Item's metadata is locked.
   */
  LockedItemMetadata: undefined
  /**
   *Collection's metadata is locked.
   */
  LockedCollectionMetadata: undefined
  /**
   *All items have been minted.
   */
  MaxSupplyReached: undefined
  /**
   *The max supply is locked and can't be changed.
   */
  MaxSupplyLocked: undefined
  /**
   *The provided max supply is less than the number of items a collection already has.
   */
  MaxSupplyTooSmall: undefined
  /**
   *The given item ID is unknown.
   */
  UnknownItem: undefined
  /**
   *Swap doesn't exist.
   */
  UnknownSwap: undefined
  /**
   *The given item has no metadata set.
   */
  MetadataNotFound: undefined
  /**
   *The provided attribute can't be found.
   */
  AttributeNotFound: undefined
  /**
   *Item is not for sale.
   */
  NotForSale: undefined
  /**
   *The provided bid is too low.
   */
  BidTooLow: undefined
  /**
   *The item has reached its approval limit.
   */
  ReachedApprovalLimit: undefined
  /**
   *The deadline has already expired.
   */
  DeadlineExpired: undefined
  /**
   *The duration provided should be less than or equal to `MaxDeadlineDuration`.
   */
  WrongDuration: undefined
  /**
   *The method is disabled by system settings.
   */
  MethodDisabled: undefined
  /**
   *The provided setting can't be set.
   */
  WrongSetting: undefined
  /**
   *Item's config already exists and should be equal to the provided one.
   */
  InconsistentItemConfig: undefined
  /**
   *Config for a collection or an item can't be found.
   */
  NoConfig: undefined
  /**
   *Some roles were not cleared.
   */
  RolesNotCleared: undefined
  /**
   *Mint has not started yet.
   */
  MintNotStarted: undefined
  /**
   *Mint has already ended.
   */
  MintEnded: undefined
  /**
   *The provided Item was already used for claiming.
   */
  AlreadyClaimed: undefined
  /**
   *The provided data is incorrect.
   */
  IncorrectData: undefined
  /**
   *The extrinsic was sent by the wrong origin.
   */
  WrongOrigin: undefined
  /**
   *The provided signature is incorrect.
   */
  WrongSignature: undefined
  /**
   *The provided metadata might be too long.
   */
  IncorrectMetadata: undefined
  /**
   *Can't set more attributes per one call.
   */
  MaxAttributesLimitReached: undefined
  /**
   *The provided namespace isn't supported in this call.
   */
  WrongNamespace: undefined
  /**
   *Can't delete non-empty collections.
   */
  CollectionNotEmpty: undefined
  /**
   *The witness data should be provided.
   */
  WitnessRequired: undefined
}>
export type I4u78hb23uhvi2 = AnonymousEnum<{
  /**
   *Provided asset pair is not supported for pool.
   */
  InvalidAssetPair: undefined
  /**
   *Pool already exists.
   */
  PoolExists: undefined
  /**
   *Desired amount can't be zero.
   */
  WrongDesiredAmount: undefined
  /**
   *Provided amount should be greater than or equal to the existential deposit/asset's
   *minimal amount.
   */
  AmountOneLessThanMinimal: undefined
  /**
   *Provided amount should be greater than or equal to the existential deposit/asset's
   *minimal amount.
   */
  AmountTwoLessThanMinimal: undefined
  /**
   *Reserve needs to always be greater than or equal to the existential deposit/asset's
   *minimal amount.
   */
  ReserveLeftLessThanMinimal: undefined
  /**
   *Desired amount can't be equal to the pool reserve.
   */
  AmountOutTooHigh: undefined
  /**
   *The pool doesn't exist.
   */
  PoolNotFound: undefined
  /**
   *An overflow happened.
   */
  Overflow: undefined
  /**
   *The minimal amount requirement for the first token in the pair wasn't met.
   */
  AssetOneDepositDidNotMeetMinimum: undefined
  /**
   *The minimal amount requirement for the second token in the pair wasn't met.
   */
  AssetTwoDepositDidNotMeetMinimum: undefined
  /**
   *The minimal amount requirement for the first token in the pair wasn't met.
   */
  AssetOneWithdrawalDidNotMeetMinimum: undefined
  /**
   *The minimal amount requirement for the second token in the pair wasn't met.
   */
  AssetTwoWithdrawalDidNotMeetMinimum: undefined
  /**
   *Optimal calculated amount is less than desired.
   */
  OptimalAmountLessThanDesired: undefined
  /**
   *Insufficient liquidity minted.
   */
  InsufficientLiquidityMinted: undefined
  /**
   *Requested liquidity can't be zero.
   */
  ZeroLiquidity: undefined
  /**
   *Amount can't be zero.
   */
  ZeroAmount: undefined
  /**
   *Calculated amount out is less than provided minimum amount.
   */
  ProvidedMinimumNotSufficientForSwap: undefined
  /**
   *Provided maximum amount is not sufficient for swap.
   */
  ProvidedMaximumNotSufficientForSwap: undefined
  /**
   *The provided path must consists of 2 assets at least.
   */
  InvalidPath: undefined
  /**
   *The provided path must consists of unique assets.
   */
  NonUniquePath: undefined
  /**
   *It was not possible to get or increment the Id of the pool.
   */
  IncorrectPoolAssetId: undefined
  /**
   *The destination account cannot exist with the swapped funds.
   */
  BelowMinimum: undefined
}>
export type Icbsekf57miplo = AnonymousEnum<{
  /**
   *The validation function has been scheduled to apply.
   */
  ValidationFunctionStored: undefined
  /**
   *The validation function was applied as of the contained relay chain block number.
   */
  ValidationFunctionApplied: Anonymize<Idd7hd99u0ho0n>
  /**
   *The relay-chain aborted the upgrade process.
   */
  ValidationFunctionDiscarded: undefined
  /**
   *Some downward messages have been received and will be processed.
   */
  DownwardMessagesReceived: Anonymize<Iafscmv8tjf0ou>
  /**
   *Downward messages were processed using the given weight.
   */
  DownwardMessagesProcessed: Anonymize<I100l07kaehdlp>
  /**
   *An upward message was sent to the relay chain.
   */
  UpwardMessageSent: Anonymize<I6gnbnvip5vvdi>
}>
export type Idd7hd99u0ho0n = {
  relay_chain_block_num: number
}
export type I100l07kaehdlp = {
  weight_used: Anonymize<I4q39t5hn830vp>
  dmq_head: FixedSizeBinary<32>
}
export type I6gnbnvip5vvdi = {
  message_hash?: Anonymize<I4s6vifaf8k998>
}
export type Ifagg2q2o5fgjl = AnonymousEnum<{
  /**
   *A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
   *has been paid by `who` in an asset `asset_id`.
   */
  AssetTxFeePaid: Anonymize<Iqjk6s1a2lmkt>
  /**
   *A swap of the refund in native currency back to asset failed.
   */
  AssetRefundFailed: Anonymize<Icjchvrijclvlv>
}>
export type Iqjk6s1a2lmkt = {
  who: SS58String
  actual_fee: bigint
  tip: bigint
  asset_id: Anonymize<I4c0s5cioidn76>
}
export type Icjchvrijclvlv = {
  native_amount_kept: bigint
}
export type I4srakrmf0fspo = AnonymousEnum<{
  /**
   *New Invulnerables were set.
   */
  NewInvulnerables: Anonymize<I39t01nnod9109>
  /**
   *A new Invulnerable was added.
   */
  InvulnerableAdded: Anonymize<I6v8sm60vvkmk7>
  /**
   *An Invulnerable was removed.
   */
  InvulnerableRemoved: Anonymize<I6v8sm60vvkmk7>
  /**
   *The number of desired candidates was set.
   */
  NewDesiredCandidates: Anonymize<I1qmtmbe5so8r3>
  /**
   *The candidacy bond was set.
   */
  NewCandidacyBond: Anonymize<Ih99m6ehpcar7>
  /**
   *A new candidate joined.
   */
  CandidateAdded: Anonymize<Idgorhsbgdq2ap>
  /**
   *Bond of a candidate updated.
   */
  CandidateBondUpdated: Anonymize<Idgorhsbgdq2ap>
  /**
   *A candidate was removed.
   */
  CandidateRemoved: Anonymize<I6v8sm60vvkmk7>
  /**
   *An account was replaced in the candidate list by another one.
   */
  CandidateReplaced: Anonymize<I9ubb2kqevnu6t>
  /**
   *An account was unable to be added to the Invulnerables because they did not have keys
   *registered. Other Invulnerables may have been set.
   */
  InvalidInvulnerableSkipped: Anonymize<I6v8sm60vvkmk7>
}>
export type I6v8sm60vvkmk7 = {
  account_id: SS58String
}
export type I1qmtmbe5so8r3 = {
  desired_candidates: number
}
export type Ih99m6ehpcar7 = {
  bond_amount: bigint
}
export type Idgorhsbgdq2ap = {
  account_id: SS58String
  deposit: bigint
}
export type I9ubb2kqevnu6t = {
  old: SS58String
  new: SS58String
  deposit: bigint
}
export type Idsqc7mhp6nnle = AnonymousEnum<{
  /**
   *An HRMP message was sent to a sibling parachain.
   */
  XcmpMessageSent: Anonymize<I137t1cld92pod>
}>
export type I137t1cld92pod = {
  message_hash: FixedSizeBinary<32>
}
export type Ibvp9t1gqae5ct = AnonymousEnum<{
  /**
   *Downward message is invalid XCM.
   *\[ id \]
   */
  InvalidFormat: FixedSizeBinary<32>
  /**
   *Downward message is unsupported version of XCM.
   *\[ id \]
   */
  UnsupportedVersion: FixedSizeBinary<32>
  /**
   *Downward message executed with the given outcome.
   *\[ id, outcome \]
   */
  ExecutedDownward: Anonymize<Iea25i7vqm7ot3>
}>
export type Iea25i7vqm7ot3 = [FixedSizeBinary<32>, XcmV4TraitsOutcome]
export type I2kosejppk3jon = AnonymousEnum<{
  /**
   *Message discarded due to an error in the `MessageProcessor` (usually a format error).
   */
  ProcessingFailed: Anonymize<I1rvj4ubaplho0>
  /**
   *Message is processed.
   */
  Processed: Anonymize<Ia3uu7lqcc1q1i>
  /**
   *Message placed in overweight queue.
   */
  OverweightEnqueued: Anonymize<I7crucfnonitkn>
  /**
   *This page was reaped.
   */
  PageReaped: Anonymize<I7tmrp94r9sq4n>
}>
export type I1rvj4ubaplho0 = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: Anonymize<Iejeo53sea6n4q>
  /**
   *The error that occurred.
   *
   *This error is pretty opaque. More fine-grained errors need to be emitted as events
   *by the `MessageProcessor`.
   */
  error: Anonymize<I5hhsj7l9obr84>
}
export type Iejeo53sea6n4q = AnonymousEnum<{
  Here: undefined
  Parent: undefined
  Sibling: number
}>
export type Ia3uu7lqcc1q1i = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: Anonymize<Iejeo53sea6n4q>
  /**
   *How much weight was used to process the message.
   */
  weight_used: Anonymize<I4q39t5hn830vp>
  /**
   *Whether the message was processed.
   *
   *Note that this does not mean that the underlying `MessageProcessor` was internally
   *successful. It *solely* means that the MQ pallet will treat this as a success
   *condition and discard the message. Any internal error needs to be emitted as events
   *by the `MessageProcessor`.
   */
  success: boolean
}
export type I7crucfnonitkn = {
  /**
   *The `blake2_256` hash of the message.
   */
  id: FixedSizeBinary<32>
  /**
   *The queue of the message.
   */
  origin: Anonymize<Iejeo53sea6n4q>
  /**
   *The page of the message.
   */
  page_index: number
  /**
   *The index of the message within the page.
   */
  message_index: number
}
export type I7tmrp94r9sq4n = {
  /**
   *The queue of the page.
   */
  origin: Anonymize<Iejeo53sea6n4q>
  /**
   *The index of the page.
   */
  index: number
}
export type Idc9gec0hbd2kq = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<Iea0lsafm2p8h3>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<Ifaqukm8une709>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<I9boj13dfc48k>
}>
export type Iea0lsafm2p8h3 = {
  index: number
  error: Anonymize<Id1b6jh4cusamh>
}
export type Ifaqukm8une709 = {
  error: Anonymize<Id1b6jh4cusamh>
}
export type I9boj13dfc48k = {
  result: Anonymize<I72g50ec7tste6>
}
export type I72g50ec7tste6 = ResultPayload<undefined, Anonymize<Id1b6jh4cusamh>>
export type I92uujjintei36 = AnonymousEnum<{
  /**
   *A new multisig operation has begun.
   */
  NewMultisig: Anonymize<Iep27ialq4a7o7>
  /**
   *A multisig operation has been approved by someone.
   */
  MultisigApproval: Anonymize<Iasu5jvoqr43mv>
  /**
   *A multisig operation has been executed.
   */
  MultisigExecuted: Anonymize<Ia2mdf02dvjvfj>
  /**
   *A multisig operation has been cancelled.
   */
  MultisigCancelled: Anonymize<I5qolde99acmd1>
}>
export type Ia2mdf02dvjvfj = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I72g50ec7tste6>
}
export type Ia8vt8ujoq488u = AnonymousEnum<{
  /**
   *A proxy was executed correctly, with the given.
   */
  ProxyExecuted: Anonymize<I9boj13dfc48k>
  /**
   *A pure account has been created by new proxy with given
   *disambiguation index and proxy type.
   */
  PureCreated: Anonymize<Ie7cuj84ohvg56>
  /**
   *An announcement was placed to make a call in the future.
   */
  Announced: Anonymize<I2ur0oeqg495j8>
  /**
   *A proxy was added.
   */
  ProxyAdded: Anonymize<I8ioopvokvl3ud>
  /**
   *A proxy was removed.
   */
  ProxyRemoved: Anonymize<I8ioopvokvl3ud>
}>
export type Ie7cuj84ohvg56 = {
  pure: SS58String
  who: SS58String
  proxy_type: Anonymize<I5ftepkjop3g1u>
  disambiguation_index: number
}
export type I5ftepkjop3g1u = AnonymousEnum<{
  Any: undefined
  NonTransfer: undefined
  CancelProxy: undefined
  Assets: undefined
  AssetOwner: undefined
  AssetManager: undefined
  Collator: undefined
}>
export type I8ioopvokvl3ud = {
  delegator: SS58String
  delegatee: SS58String
  proxy_type: Anonymize<I5ftepkjop3g1u>
  delay: number
}
export type I6avancvg8fd05 = AnonymousEnum<{
  /**
   *Some asset class was created.
   */
  Created: Anonymize<I88ff3u4dpivk>
  /**
   *Some assets were issued.
   */
  Issued: Anonymize<I33cp947glv1ks>
  /**
   *Some assets were transferred.
   */
  Transferred: Anonymize<Ic9om1gmmqu7rq>
  /**
   *Some assets were destroyed.
   */
  Burned: Anonymize<I5hfov2b68ppb6>
  /**
   *The management team changed.
   */
  TeamChanged: Anonymize<Ibthhb2m9vneds>
  /**
   *The owner changed.
   */
  OwnerChanged: Anonymize<Iaitn5bqfacj7k>
  /**
   *Some account `who` was frozen.
   */
  Frozen: Anonymize<If4ebvclj2ugvi>
  /**
   *Some account `who` was thawed.
   */
  Thawed: Anonymize<If4ebvclj2ugvi>
  /**
   *Some asset `asset_id` was frozen.
   */
  AssetFrozen: Anonymize<Ia5le7udkgbaq9>
  /**
   *Some asset `asset_id` was thawed.
   */
  AssetThawed: Anonymize<Ia5le7udkgbaq9>
  /**
   *Accounts were destroyed for given asset.
   */
  AccountsDestroyed: Anonymize<Ieduc1e6frq8rb>
  /**
   *Approvals were destroyed for given asset.
   */
  ApprovalsDestroyed: Anonymize<I9h6gbtabovtm4>
  /**
   *An asset class is in the process of being destroyed.
   */
  DestructionStarted: Anonymize<Ia5le7udkgbaq9>
  /**
   *An asset class was destroyed.
   */
  Destroyed: Anonymize<Ia5le7udkgbaq9>
  /**
   *Some asset class was force-created.
   */
  ForceCreated: Anonymize<Iaitn5bqfacj7k>
  /**
   *New metadata has been set for an asset.
   */
  MetadataSet: Anonymize<Ifnsa0dkkpf465>
  /**
   *Metadata has been cleared for an asset.
   */
  MetadataCleared: Anonymize<Ia5le7udkgbaq9>
  /**
   *(Additional) funds have been approved for transfer to a destination account.
   */
  ApprovedTransfer: Anonymize<I65dtqr2egjbc3>
  /**
   *An approval for account `delegate` was cancelled by `owner`.
   */
  ApprovalCancelled: Anonymize<Ibqj3vg5s5lk0c>
  /**
   *An `amount` was transferred in its entirety from `owner` to `destination` by
   *the approved `delegate`.
   */
  TransferredApproved: Anonymize<I6l73u513p8rna>
  /**
   *An asset has had its attributes changed by the `Force` origin.
   */
  AssetStatusChanged: Anonymize<Ia5le7udkgbaq9>
  /**
   *The min_balance of an asset has been updated by the asset owner.
   */
  AssetMinBalanceChanged: Anonymize<Iefqmt2htu1dlu>
  /**
   *Some account `who` was created with a deposit from `depositor`.
   */
  Touched: Anonymize<If8bgtgqrchjtu>
  /**
   *Some account `who` was blocked.
   */
  Blocked: Anonymize<If4ebvclj2ugvi>
  /**
   *Some assets were deposited (e.g. for transaction fees).
   */
  Deposited: Anonymize<Idusmq77988cmt>
  /**
   *Some assets were withdrawn from the account (e.g. for transaction fees).
   */
  Withdrawn: Anonymize<Idusmq77988cmt>
}>
export type I88ff3u4dpivk = {
  asset_id: number
  creator: SS58String
  owner: SS58String
}
export type I33cp947glv1ks = {
  asset_id: number
  owner: SS58String
  amount: bigint
}
export type Ic9om1gmmqu7rq = {
  asset_id: number
  from: SS58String
  to: SS58String
  amount: bigint
}
export type I5hfov2b68ppb6 = {
  asset_id: number
  owner: SS58String
  balance: bigint
}
export type Ibthhb2m9vneds = {
  asset_id: number
  issuer: SS58String
  admin: SS58String
  freezer: SS58String
}
export type Iaitn5bqfacj7k = {
  asset_id: number
  owner: SS58String
}
export type If4ebvclj2ugvi = {
  asset_id: number
  who: SS58String
}
export type Ia5le7udkgbaq9 = {
  asset_id: number
}
export type Ieduc1e6frq8rb = {
  asset_id: number
  accounts_destroyed: number
  accounts_remaining: number
}
export type I9h6gbtabovtm4 = {
  asset_id: number
  approvals_destroyed: number
  approvals_remaining: number
}
export type Ifnsa0dkkpf465 = {
  asset_id: number
  name: Binary
  symbol: Binary
  decimals: number
  is_frozen: boolean
}
export type I65dtqr2egjbc3 = {
  asset_id: number
  source: SS58String
  delegate: SS58String
  amount: bigint
}
export type Ibqj3vg5s5lk0c = {
  asset_id: number
  owner: SS58String
  delegate: SS58String
}
export type I6l73u513p8rna = {
  asset_id: number
  owner: SS58String
  delegate: SS58String
  destination: SS58String
  amount: bigint
}
export type Iefqmt2htu1dlu = {
  asset_id: number
  new_min_balance: bigint
}
export type If8bgtgqrchjtu = {
  asset_id: number
  who: SS58String
  depositor: SS58String
}
export type Idusmq77988cmt = {
  asset_id: number
  who: SS58String
  amount: bigint
}
export type Ia0j71vjrjqu9p = AnonymousEnum<{
  /**
   *A `collection` was created.
   */
  Created: Anonymize<I9gqanbbbe917p>
  /**
   *A `collection` was force-created.
   */
  ForceCreated: Anonymize<Id1m1230297f7a>
  /**
   *A `collection` was destroyed.
   */
  Destroyed: Anonymize<I6cu7obfo0rr0o>
  /**
   *An `item` was issued.
   */
  Issued: Anonymize<Ifvb1p5munhhv4>
  /**
   *An `item` was transferred.
   */
  Transferred: Anonymize<I46h83ilqeed3g>
  /**
   *An `item` was destroyed.
   */
  Burned: Anonymize<Ifvb1p5munhhv4>
  /**
   *Some `item` was frozen.
   */
  Frozen: Anonymize<Iafkqus0ohh6l6>
  /**
   *Some `item` was thawed.
   */
  Thawed: Anonymize<Iafkqus0ohh6l6>
  /**
   *Some `collection` was frozen.
   */
  CollectionFrozen: Anonymize<I6cu7obfo0rr0o>
  /**
   *Some `collection` was thawed.
   */
  CollectionThawed: Anonymize<I6cu7obfo0rr0o>
  /**
   *The owner changed.
   */
  OwnerChanged: Anonymize<Icahse3uoi76n7>
  /**
   *The management team changed.
   */
  TeamChanged: Anonymize<I75sj3uv7gnemk>
  /**
   *An `item` of a `collection` has been approved by the `owner` for transfer by
   *a `delegate`.
   */
  ApprovedTransfer: Anonymize<I5fjkvcb5vr6nb>
  /**
   *An approval for a `delegate` account to transfer the `item` of an item
   *`collection` was cancelled by its `owner`.
   */
  ApprovalCancelled: Anonymize<I5fjkvcb5vr6nb>
  /**
   *A `collection` has had its attributes changed by the `Force` origin.
   */
  ItemStatusChanged: Anonymize<I6cu7obfo0rr0o>
  /**
   *New metadata has been set for a `collection`.
   */
  CollectionMetadataSet: Anonymize<I9viqhmdtuof5e>
  /**
   *Metadata has been cleared for a `collection`.
   */
  CollectionMetadataCleared: Anonymize<I6cu7obfo0rr0o>
  /**
   *New metadata has been set for an item.
   */
  MetadataSet: Anonymize<Iceq9fmmp9aeqv>
  /**
   *Metadata has been cleared for an item.
   */
  MetadataCleared: Anonymize<Iafkqus0ohh6l6>
  /**
   *Metadata has been cleared for an item.
   */
  Redeposited: Anonymize<I2gr1toekv86b9>
  /**
   *New attribute metadata has been set for a `collection` or `item`.
   */
  AttributeSet: Anonymize<I5tvvgui05tn6e>
  /**
   *Attribute metadata has been cleared for a `collection` or `item`.
   */
  AttributeCleared: Anonymize<Ibal0joadvdc2h>
  /**
   *Ownership acceptance has changed for an account.
   */
  OwnershipAcceptanceChanged: Anonymize<I2v2ikqt2trp52>
  /**
   *Max supply has been set for a collection.
   */
  CollectionMaxSupplySet: Anonymize<I6h88h8vba22v8>
  /**
   *The price was set for the instance.
   */
  ItemPriceSet: Anonymize<If3057hi1g5qlo>
  /**
   *The price for the instance was removed.
   */
  ItemPriceRemoved: Anonymize<Iafkqus0ohh6l6>
  /**
   *An item was bought.
   */
  ItemBought: Anonymize<Iaii5qf41d5n3d>
}>
export type I9gqanbbbe917p = {
  collection: number
  creator: SS58String
  owner: SS58String
}
export type Id1m1230297f7a = {
  collection: number
  owner: SS58String
}
export type I6cu7obfo0rr0o = {
  collection: number
}
export type Ifvb1p5munhhv4 = {
  collection: number
  item: number
  owner: SS58String
}
export type I46h83ilqeed3g = {
  collection: number
  item: number
  from: SS58String
  to: SS58String
}
export type Iafkqus0ohh6l6 = {
  collection: number
  item: number
}
export type Icahse3uoi76n7 = {
  collection: number
  new_owner: SS58String
}
export type I75sj3uv7gnemk = {
  collection: number
  issuer: SS58String
  admin: SS58String
  freezer: SS58String
}
export type I5fjkvcb5vr6nb = {
  collection: number
  item: number
  owner: SS58String
  delegate: SS58String
}
export type I9viqhmdtuof5e = {
  collection: number
  data: Binary
  is_frozen: boolean
}
export type Iceq9fmmp9aeqv = {
  collection: number
  item: number
  data: Binary
  is_frozen: boolean
}
export type I2gr1toekv86b9 = {
  collection: number
  successful_items: Anonymize<Icgljjb6j82uhn>
}
export type I5tvvgui05tn6e = {
  collection: number
  maybe_item?: Anonymize<I4arjljr6dpflb>
  key: Binary
  value: Binary
}
export type Ibal0joadvdc2h = {
  collection: number
  maybe_item?: Anonymize<I4arjljr6dpflb>
  key: Binary
}
export type I2v2ikqt2trp52 = {
  who: SS58String
  maybe_collection?: Anonymize<I4arjljr6dpflb>
}
export type I6h88h8vba22v8 = {
  collection: number
  max_supply: number
}
export type If3057hi1g5qlo = {
  collection: number
  item: number
  price: bigint
  whitelisted_buyer?: Anonymize<Ihfphjolmsqq1>
}
export type Iaii5qf41d5n3d = {
  collection: number
  item: number
  price: bigint
  seller: SS58String
  buyer: SS58String
}
export type I6qicn8jn4fftj = AnonymousEnum<{
  /**
   *A `collection` was created.
   */
  Created: Anonymize<I9gqanbbbe917p>
  /**
   *A `collection` was force-created.
   */
  ForceCreated: Anonymize<Id1m1230297f7a>
  /**
   *A `collection` was destroyed.
   */
  Destroyed: Anonymize<I6cu7obfo0rr0o>
  /**
   *An `item` was issued.
   */
  Issued: Anonymize<Ifvb1p5munhhv4>
  /**
   *An `item` was transferred.
   */
  Transferred: Anonymize<I46h83ilqeed3g>
  /**
   *An `item` was destroyed.
   */
  Burned: Anonymize<Ifvb1p5munhhv4>
  /**
   *An `item` became non-transferable.
   */
  ItemTransferLocked: Anonymize<Iafkqus0ohh6l6>
  /**
   *An `item` became transferable.
   */
  ItemTransferUnlocked: Anonymize<Iafkqus0ohh6l6>
  /**
   *`item` metadata or attributes were locked.
   */
  ItemPropertiesLocked: Anonymize<I1jj31tn29ie3c>
  /**
   *Some `collection` was locked.
   */
  CollectionLocked: Anonymize<I6cu7obfo0rr0o>
  /**
   *The owner changed.
   */
  OwnerChanged: Anonymize<Icahse3uoi76n7>
  /**
   *The management team changed.
   */
  TeamChanged: Anonymize<Ico8bnjc6taa27>
  /**
   *An `item` of a `collection` has been approved by the `owner` for transfer by
   *a `delegate`.
   */
  TransferApproved: Anonymize<I78i1bvlonei69>
  /**
   *An approval for a `delegate` account to transfer the `item` of an item
   *`collection` was cancelled by its `owner`.
   */
  ApprovalCancelled: Anonymize<I5fjkvcb5vr6nb>
  /**
   *All approvals of an item got cancelled.
   */
  AllApprovalsCancelled: Anonymize<Ifvb1p5munhhv4>
  /**
   *A `collection` has had its config changed by the `Force` origin.
   */
  CollectionConfigChanged: Anonymize<I6cu7obfo0rr0o>
  /**
   *New metadata has been set for a `collection`.
   */
  CollectionMetadataSet: Anonymize<I78u60nqh0etah>
  /**
   *Metadata has been cleared for a `collection`.
   */
  CollectionMetadataCleared: Anonymize<I6cu7obfo0rr0o>
  /**
   *New metadata has been set for an item.
   */
  ItemMetadataSet: Anonymize<Icrkms46uh8tpb>
  /**
   *Metadata has been cleared for an item.
   */
  ItemMetadataCleared: Anonymize<Iafkqus0ohh6l6>
  /**
   *The deposit for a set of `item`s within a `collection` has been updated.
   */
  Redeposited: Anonymize<I2gr1toekv86b9>
  /**
   *New attribute metadata has been set for a `collection` or `item`.
   */
  AttributeSet: Anonymize<I5llu6o6a0go5i>
  /**
   *Attribute metadata has been cleared for a `collection` or `item`.
   */
  AttributeCleared: Anonymize<I93r2effh7od84>
  /**
   *A new approval to modify item attributes was added.
   */
  ItemAttributesApprovalAdded: Anonymize<I9i1f9mrso1hmf>
  /**
   *A new approval to modify item attributes was removed.
   */
  ItemAttributesApprovalRemoved: Anonymize<I9i1f9mrso1hmf>
  /**
   *Ownership acceptance has changed for an account.
   */
  OwnershipAcceptanceChanged: Anonymize<I2v2ikqt2trp52>
  /**
   *Max supply has been set for a collection.
   */
  CollectionMaxSupplySet: Anonymize<I6h88h8vba22v8>
  /**
   *Mint settings for a collection had changed.
   */
  CollectionMintSettingsUpdated: Anonymize<I6cu7obfo0rr0o>
  /**
   *Event gets emitted when the `NextCollectionId` gets incremented.
   */
  NextCollectionIdIncremented: Anonymize<I9ksla2si91s56>
  /**
   *The price was set for the item.
   */
  ItemPriceSet: Anonymize<If3057hi1g5qlo>
  /**
   *The price for the item was removed.
   */
  ItemPriceRemoved: Anonymize<Iafkqus0ohh6l6>
  /**
   *An item was bought.
   */
  ItemBought: Anonymize<Iaii5qf41d5n3d>
  /**
   *A tip was sent.
   */
  TipSent: Anonymize<Id9j7b85otvjru>
  /**
   *An `item` swap intent was created.
   */
  SwapCreated: Anonymize<Iaihk9pek2ajl9>
  /**
   *The swap was cancelled.
   */
  SwapCancelled: Anonymize<Iaihk9pek2ajl9>
  /**
   *The swap has been claimed.
   */
  SwapClaimed: Anonymize<Id9av23h47ufb2>
  /**
   *New attributes have been set for an `item` of the `collection`.
   */
  PreSignedAttributesSet: Anonymize<Ib4kpnijas4jqp>
  /**
   *A new attribute in the `Pallet` namespace was set for the `collection` or an `item`
   *within that `collection`.
   */
  PalletAttributeSet: Anonymize<I2vnu5k0u1i65h>
}>
export type I1jj31tn29ie3c = {
  collection: number
  item: number
  lock_metadata: boolean
  lock_attributes: boolean
}
export type Ico8bnjc6taa27 = {
  collection: number
  issuer?: Anonymize<Ihfphjolmsqq1>
  admin?: Anonymize<Ihfphjolmsqq1>
  freezer?: Anonymize<Ihfphjolmsqq1>
}
export type I78i1bvlonei69 = {
  collection: number
  item: number
  owner: SS58String
  delegate: SS58String
  deadline?: Anonymize<I4arjljr6dpflb>
}
export type I78u60nqh0etah = {
  collection: number
  data: Binary
}
export type Icrkms46uh8tpb = {
  collection: number
  item: number
  data: Binary
}
export type I5llu6o6a0go5i = {
  collection: number
  maybe_item?: Anonymize<I4arjljr6dpflb>
  key: Binary
  value: Binary
  namespace: Anonymize<If3jjadhmug6qc>
}
export type If3jjadhmug6qc = AnonymousEnum<{
  Pallet: undefined
  CollectionOwner: undefined
  ItemOwner: undefined
  Account: SS58String
}>
export type I93r2effh7od84 = {
  collection: number
  maybe_item?: Anonymize<I4arjljr6dpflb>
  key: Binary
  namespace: Anonymize<If3jjadhmug6qc>
}
export type I9i1f9mrso1hmf = {
  collection: number
  item: number
  delegate: SS58String
}
export type I9ksla2si91s56 = {
  next_id?: Anonymize<I4arjljr6dpflb>
}
export type Id9j7b85otvjru = {
  collection: number
  item: number
  sender: SS58String
  receiver: SS58String
  amount: bigint
}
export type Iaihk9pek2ajl9 = {
  offered_collection: number
  offered_item: number
  desired_collection: number
  desired_item?: Anonymize<I4arjljr6dpflb>
  price?: Anonymize<I6oogc1jbmmi81>
  deadline: number
}
export type I6oogc1jbmmi81 =
  | {
      amount: bigint
      direction: Enum<{
        Send: undefined
        Receive: undefined
      }>
    }
  | undefined
export type Id9av23h47ufb2 = {
  sent_collection: number
  sent_item: number
  sent_item_owner: SS58String
  received_collection: number
  received_item: number
  received_item_owner: SS58String
  price?: Anonymize<I6oogc1jbmmi81>
  deadline: number
}
export type Ib4kpnijas4jqp = {
  collection: number
  item: number
  namespace: Anonymize<If3jjadhmug6qc>
}
export type I2vnu5k0u1i65h = {
  collection: number
  item?: Anonymize<I4arjljr6dpflb>
  attribute: Enum<{
    UsedToClaim: number
    TransferDisabled: undefined
  }>
  value: Binary
}
export type I81i2fkdo6nple = AnonymousEnum<{
  /**
   *Some asset class was created.
   */
  Created: Anonymize<I36h211fbvstks>
  /**
   *Some assets were issued.
   */
  Issued: Anonymize<I2k9iu40qhp841>
  /**
   *Some assets were transferred.
   */
  Transferred: Anonymize<I3dufa2gr145hf>
  /**
   *Some assets were destroyed.
   */
  Burned: Anonymize<Ie66s9cr50m7sr>
  /**
   *The management team changed.
   */
  TeamChanged: Anonymize<I3msvtljqnu799>
  /**
   *The owner changed.
   */
  OwnerChanged: Anonymize<I467a79vcdbrec>
  /**
   *Some account `who` was frozen.
   */
  Frozen: Anonymize<Ia8imt144v3n25>
  /**
   *Some account `who` was thawed.
   */
  Thawed: Anonymize<Ia8imt144v3n25>
  /**
   *Some asset `asset_id` was frozen.
   */
  AssetFrozen: Anonymize<I35uvf5ij009e8>
  /**
   *Some asset `asset_id` was thawed.
   */
  AssetThawed: Anonymize<I35uvf5ij009e8>
  /**
   *Accounts were destroyed for given asset.
   */
  AccountsDestroyed: Anonymize<I1mmtcsmkng8nj>
  /**
   *Approvals were destroyed for given asset.
   */
  ApprovalsDestroyed: Anonymize<I30qmuqbs4i8i4>
  /**
   *An asset class is in the process of being destroyed.
   */
  DestructionStarted: Anonymize<I35uvf5ij009e8>
  /**
   *An asset class was destroyed.
   */
  Destroyed: Anonymize<I35uvf5ij009e8>
  /**
   *Some asset class was force-created.
   */
  ForceCreated: Anonymize<I467a79vcdbrec>
  /**
   *New metadata has been set for an asset.
   */
  MetadataSet: Anonymize<Iarmm62t3lm37e>
  /**
   *Metadata has been cleared for an asset.
   */
  MetadataCleared: Anonymize<I35uvf5ij009e8>
  /**
   *(Additional) funds have been approved for transfer to a destination account.
   */
  ApprovedTransfer: Anonymize<I9nm7qticlhmgl>
  /**
   *An approval for account `delegate` was cancelled by `owner`.
   */
  ApprovalCancelled: Anonymize<Iev4iv86ng02ck>
  /**
   *An `amount` was transferred in its entirety from `owner` to `destination` by
   *the approved `delegate`.
   */
  TransferredApproved: Anonymize<I5s8p7gejoudvh>
  /**
   *An asset has had its attributes changed by the `Force` origin.
   */
  AssetStatusChanged: Anonymize<I35uvf5ij009e8>
  /**
   *The min_balance of an asset has been updated by the asset owner.
   */
  AssetMinBalanceChanged: Anonymize<If4jtj68r1gabq>
  /**
   *Some account `who` was created with a deposit from `depositor`.
   */
  Touched: Anonymize<I8s66oebjsgqga>
  /**
   *Some account `who` was blocked.
   */
  Blocked: Anonymize<Ia8imt144v3n25>
  /**
   *Some assets were deposited (e.g. for transaction fees).
   */
  Deposited: Anonymize<I42gee3b9iotl3>
  /**
   *Some assets were withdrawn from the account (e.g. for transaction fees).
   */
  Withdrawn: Anonymize<I42gee3b9iotl3>
}>
export type I36h211fbvstks = {
  asset_id: Anonymize<I4c0s5cioidn76>
  creator: SS58String
  owner: SS58String
}
export type I2k9iu40qhp841 = {
  asset_id: Anonymize<I4c0s5cioidn76>
  owner: SS58String
  amount: bigint
}
export type I3dufa2gr145hf = {
  asset_id: Anonymize<I4c0s5cioidn76>
  from: SS58String
  to: SS58String
  amount: bigint
}
export type Ie66s9cr50m7sr = {
  asset_id: Anonymize<I4c0s5cioidn76>
  owner: SS58String
  balance: bigint
}
export type I3msvtljqnu799 = {
  asset_id: Anonymize<I4c0s5cioidn76>
  issuer: SS58String
  admin: SS58String
  freezer: SS58String
}
export type I467a79vcdbrec = {
  asset_id: Anonymize<I4c0s5cioidn76>
  owner: SS58String
}
export type Ia8imt144v3n25 = {
  asset_id: Anonymize<I4c0s5cioidn76>
  who: SS58String
}
export type I35uvf5ij009e8 = {
  asset_id: Anonymize<I4c0s5cioidn76>
}
export type I1mmtcsmkng8nj = {
  asset_id: Anonymize<I4c0s5cioidn76>
  accounts_destroyed: number
  accounts_remaining: number
}
export type I30qmuqbs4i8i4 = {
  asset_id: Anonymize<I4c0s5cioidn76>
  approvals_destroyed: number
  approvals_remaining: number
}
export type Iarmm62t3lm37e = {
  asset_id: Anonymize<I4c0s5cioidn76>
  name: Binary
  symbol: Binary
  decimals: number
  is_frozen: boolean
}
export type I9nm7qticlhmgl = {
  asset_id: Anonymize<I4c0s5cioidn76>
  source: SS58String
  delegate: SS58String
  amount: bigint
}
export type Iev4iv86ng02ck = {
  asset_id: Anonymize<I4c0s5cioidn76>
  owner: SS58String
  delegate: SS58String
}
export type I5s8p7gejoudvh = {
  asset_id: Anonymize<I4c0s5cioidn76>
  owner: SS58String
  delegate: SS58String
  destination: SS58String
  amount: bigint
}
export type If4jtj68r1gabq = {
  asset_id: Anonymize<I4c0s5cioidn76>
  new_min_balance: bigint
}
export type I8s66oebjsgqga = {
  asset_id: Anonymize<I4c0s5cioidn76>
  who: SS58String
  depositor: SS58String
}
export type I42gee3b9iotl3 = {
  asset_id: Anonymize<I4c0s5cioidn76>
  who: SS58String
  amount: bigint
}
export type I31lqq0fjfmnfv = AnonymousEnum<{
  /**
   *A successful call of the `CreatePool` extrinsic will create this event.
   */
  PoolCreated: Anonymize<I9eo7u28un09g0>
  /**
   *A successful call of the `AddLiquidity` extrinsic will create this event.
   */
  LiquidityAdded: Anonymize<I99d21a0mjv4oo>
  /**
   *A successful call of the `RemoveLiquidity` extrinsic will create this event.
   */
  LiquidityRemoved: Anonymize<I6l4cdn6bhfq84>
  /**
   *Assets have been converted from one to another. Both `SwapExactTokenForToken`
   *and `SwapTokenForExactToken` will generate this event.
   */
  SwapExecuted: Anonymize<Iduk3pajm13p5c>
  /**
   *Assets have been converted from one to another.
   */
  SwapCreditExecuted: Anonymize<I9cgel74dg00ig>
  /**
   *Pool has been touched in order to fulfill operational requirements.
   */
  Touched: Anonymize<Ibkbs6pj6cn1hv>
}>
export type I9eo7u28un09g0 = {
  /**
   *The account that created the pool.
   */
  creator: SS58String
  /**
   *The pool id associated with the pool. Note that the order of the assets may not be
   *the same as the order specified in the create pool extrinsic.
   */
  pool_id: Anonymize<Id0as9l3s817qs>
  /**
   *The account ID of the pool.
   */
  pool_account: SS58String
  /**
   *The id of the liquidity tokens that will be minted when assets are added to this
   *pool.
   */
  lp_token: number
}
export type Id0as9l3s817qs = FixedSizeArray<2, Anonymize<I4c0s5cioidn76>>
export type I99d21a0mjv4oo = {
  /**
   *The account that the liquidity was taken from.
   */
  who: SS58String
  /**
   *The account that the liquidity tokens were minted to.
   */
  mint_to: SS58String
  /**
   *The pool id of the pool that the liquidity was added to.
   */
  pool_id: Anonymize<Id0as9l3s817qs>
  /**
   *The amount of the first asset that was added to the pool.
   */
  amount1_provided: bigint
  /**
   *The amount of the second asset that was added to the pool.
   */
  amount2_provided: bigint
  /**
   *The id of the lp token that was minted.
   */
  lp_token: number
  /**
   *The amount of lp tokens that were minted of that id.
   */
  lp_token_minted: bigint
}
export type I6l4cdn6bhfq84 = {
  /**
   *The account that the liquidity tokens were burned from.
   */
  who: SS58String
  /**
   *The account that the assets were transferred to.
   */
  withdraw_to: SS58String
  /**
   *The pool id that the liquidity was removed from.
   */
  pool_id: Anonymize<Id0as9l3s817qs>
  /**
   *The amount of the first asset that was removed from the pool.
   */
  amount1: bigint
  /**
   *The amount of the second asset that was removed from the pool.
   */
  amount2: bigint
  /**
   *The id of the lp token that was burned.
   */
  lp_token: number
  /**
   *The amount of lp tokens that were burned of that id.
   */
  lp_token_burned: bigint
  /**
   *Liquidity withdrawal fee (%).
   */
  withdrawal_fee: number
}
export type Iduk3pajm13p5c = {
  /**
   *Which account was the instigator of the swap.
   */
  who: SS58String
  /**
   *The account that the assets were transferred to.
   */
  send_to: SS58String
  /**
   *The amount of the first asset that was swapped.
   */
  amount_in: bigint
  /**
   *The amount of the second asset that was received.
   */
  amount_out: bigint
  /**
   *The route of asset IDs with amounts that the swap went through.
   *E.g. (A, amount_in) -> (Dot, amount_out) -> (B, amount_out)
   */
  path: Anonymize<Ibirh7ova056d>
}
export type Ibirh7ova056d = Array<[Anonymize<I4c0s5cioidn76>, bigint]>
export type I9cgel74dg00ig = {
  /**
   *The amount of the first asset that was swapped.
   */
  amount_in: bigint
  /**
   *The amount of the second asset that was received.
   */
  amount_out: bigint
  /**
   *The route of asset IDs with amounts that the swap went through.
   *E.g. (A, amount_in) -> (Dot, amount_out) -> (B, amount_out)
   */
  path: Anonymize<Ibirh7ova056d>
}
export type Ibkbs6pj6cn1hv = {
  /**
   *The ID of the pool.
   */
  pool_id: Anonymize<Id0as9l3s817qs>
  /**
   *The account initiating the touch.
   */
  who: SS58String
}
export type Ie0gnsvlvopved = AnonymousEnum<{
  /**
   *A sudo call just took place.
   */
  Sudid: Anonymize<I82lkrm3332ng0>
  /**
   *The sudo key has been updated.
   */
  KeyChanged: Anonymize<I5rtkmhm2dng4u>
  /**
   *The key was permanently removed.
   */
  KeyRemoved: undefined
  /**
   *A [sudo_as](Pallet::sudo_as) call just took place.
   */
  SudoAsDone: Anonymize<I82lkrm3332ng0>
}>
export type I82lkrm3332ng0 = {
  /**
   *The result of the call made by the sudo user.
   */
  sudo_result: Anonymize<I72g50ec7tste6>
}
export type I1v7jbnil3tjns = Array<{
  used_bandwidth: Anonymize<Ieafp1gui1o4cl>
  para_head_hash?: Anonymize<I4s6vifaf8k998>
  consumed_go_ahead_signal?: Anonymize<Iav8k1edbj86k7>
}>
export type Ieafp1gui1o4cl = {
  ump_msg_count: number
  ump_total_bytes: number
  hrmp_outgoing: Array<
    [
      number,
      {
        msg_count: number
        total_bytes: number
      },
    ]
  >
}
export type Iav8k1edbj86k7 = UpgradeGoAhead | undefined
export type I8jgj1nhcr2dg8 = {
  used_bandwidth: Anonymize<Ieafp1gui1o4cl>
  hrmp_watermark?: Anonymize<I4arjljr6dpflb>
  consumed_go_ahead_signal?: Anonymize<Iav8k1edbj86k7>
}
export type I4i91h98n3cv1b = {
  dmq_mqc_head: FixedSizeBinary<32>
  relay_dispatch_queue_remaining_capacity: {
    remaining_count: number
    remaining_size: number
  }
  ingress_channels: Array<
    [
      number,
      {
        max_capacity: number
        max_total_size: number
        max_message_size: number
        msg_count: number
        total_size: number
        mqc_head?: Anonymize<I4s6vifaf8k998>
      },
    ]
  >
  egress_channels: Array<
    [
      number,
      {
        max_capacity: number
        max_total_size: number
        max_message_size: number
        msg_count: number
        total_size: number
        mqc_head?: Anonymize<I4s6vifaf8k998>
      },
    ]
  >
}
export type I4iumukclgj8ej = {
  max_code_size: number
  max_head_data_size: number
  max_upward_queue_count: number
  max_upward_queue_size: number
  max_upward_message_size: number
  max_upward_message_num_per_candidate: number
  hrmp_max_message_num_per_candidate: number
  validation_upgrade_cooldown: number
  validation_upgrade_delay: number
  async_backing_params: Anonymize<Iavuvfkop6318c>
}
export type I9bin2jc70qt6q = Array<Anonymize<I3qt1hgg4djhgb>>
export type Ifi4da1gej1fri = Array<{
  who: SS58String
  deposit: bigint
}>
export type Ifvgo9568rpmqc = Array<Anonymize<I8uo3fpd3bcc6f>>
export type Ib77b0fp1a6mjr = Array<{
  recipient: number
  state: Enum<{
    Ok: undefined
    Suspended: undefined
  }>
  signals_exist: boolean
  first_index: number
  last_index: number
}>
export type Ifup3lg9ro8a0f = {
  suspend_threshold: number
  drop_threshold: number
  resume_threshold: number
}
export type I7f4alf2hnuu8s = {
  delivery_fee_factor: bigint
  is_congested: boolean
}
export type Idh2ug6ou4a8og = {
  begin: number
  end: number
  count: number
  ready_neighbours?:
    | {
        prev: Anonymize<Iejeo53sea6n4q>
        next: Anonymize<Iejeo53sea6n4q>
      }
    | undefined
  message_count: bigint
  size: bigint
}
export type Ib4jhb8tt3uung = [Anonymize<Iejeo53sea6n4q>, number]
export type I32or1mos65f9o = [
  Array<{
    delegate: SS58String
    proxy_type: Anonymize<I5ftepkjop3g1u>
    delay: number
  }>,
  bigint,
]
export type I3qklfjubrljqh = {
  owner: SS58String
  issuer: SS58String
  admin: SS58String
  freezer: SS58String
  supply: bigint
  deposit: bigint
  min_balance: bigint
  is_sufficient: boolean
  accounts: number
  sufficients: number
  approvals: number
  status: Enum<{
    Live: undefined
    Frozen: undefined
    Destroying: undefined
  }>
}
export type Iag3f1hum3p4c8 = {
  balance: bigint
  status: Enum<{
    Liquid: undefined
    Frozen: undefined
    Blocked: undefined
  }>
  reason: Enum<{
    Consumer: undefined
    Sufficient: undefined
    DepositHeld: bigint
    DepositRefunded: undefined
    DepositFrom: Anonymize<I95l2k9b1re95f>
  }>
}
export type I4s6jkha20aoh0 = {
  amount: bigint
  deposit: bigint
}
export type I2brm5b9jij1st = [number, SS58String, SS58String]
export type I78s05f59eoi8b = {
  deposit: bigint
  name: Binary
  symbol: Binary
  decimals: number
  is_frozen: boolean
}
export type Ianufjuplcj6u4 = {
  owner: SS58String
  issuer: SS58String
  admin: SS58String
  freezer: SS58String
  total_deposit: bigint
  free_holding: boolean
  items: number
  item_metadatas: number
  attributes: number
  is_frozen: boolean
}
export type Id32h28hjj1tch = [SS58String, number, number]
export type I2mv9dvsaj3kcr = {
  owner: SS58String
  approved?: Anonymize<Ihfphjolmsqq1>
  is_frozen: boolean
  deposit: bigint
}
export type I7781vnk0rm9eq = {
  deposit: bigint
  data: Binary
  is_frozen: boolean
}
export type Ie2iqtdb0stqo1 = [Binary, bigint]
export type I5irutptk105do = [number, Anonymize<I4arjljr6dpflb>, Binary]
export type Ic9nev69d8grv1 = [bigint, Anonymize<Ihfphjolmsqq1>]
export type I18m6a0sc4k7s9 = {
  owner: SS58String
  owner_deposit: bigint
  items: number
  item_metadatas: number
  item_configs: number
  attributes: number
}
export type Ic9iokm15iigt6 = {
  owner: SS58String
  approvals: Array<[SS58String, Anonymize<I4arjljr6dpflb>]>
  deposit: Anonymize<Ic262ibdoec56a>
}
export type I35m96p3u4vl0p = {
  deposit: bigint
  data: Binary
}
export type Iapmji0h53pmkn = {
  deposit: Anonymize<I6e70ge7ubff75>
  data: Binary
}
export type I6e70ge7ubff75 = {
  account?: Anonymize<Ihfphjolmsqq1>
  amount: bigint
}
export type Idrr42svup341f = [Binary, Anonymize<I6e70ge7ubff75>]
export type I4ugih6gb4fmug = [number, Anonymize<I4arjljr6dpflb>, Anonymize<If3jjadhmug6qc>, Binary]
export type Idac0t49lnd4ls = {
  desired_collection: number
  desired_item?: Anonymize<I4arjljr6dpflb>
  price?: Anonymize<I6oogc1jbmmi81>
  deadline: number
}
export type I72ndo6phms8ik = {
  settings: bigint
  max_supply?: Anonymize<I4arjljr6dpflb>
  mint_settings: Anonymize<Ia3s8qquibn97v>
}
export type Ia3s8qquibn97v = {
  mint_type: Enum<{
    Issuer: undefined
    Public: undefined
    HolderOf: number
  }>
  price?: Anonymize<I35p85j063s0il>
  start_block?: Anonymize<I4arjljr6dpflb>
  end_block?: Anonymize<I4arjljr6dpflb>
  default_item_settings: bigint
}
export type I7rv8d2nr55kkq = [Anonymize<I4c0s5cioidn76>, SS58String]
export type I6lh06el3bdfqq = [Anonymize<I4c0s5cioidn76>, SS58String, SS58String]
export type I3jmip7qjlcqot = AnonymousEnum<{
  /**
   *Set the current validation data.
   *
   *This should be invoked exactly once per block. It will panic at the finalization
   *phase if the call was not invoked.
   *
   *The dispatch origin for this call must be `Inherent`
   *
   *As a side effect, this function upgrades the current validation function
   *if the appropriate time has come.
   */
  set_validation_data: Anonymize<I60v7bikk54tpu>
  sudo_send_upward_message: Anonymize<Ifpj261e8s63m3>
  /**
   *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
   *later.
   *
   *The `check_version` parameter sets a boolean flag for whether or not the runtime's spec
   *version and name should be verified on upgrade. Since the authorization only has a hash,
   *it cannot actually perform the verification.
   *
   *This call requires Root origin.
   */
  authorize_upgrade: Anonymize<Ibgl04rn6nbfm6>
  /**
   *Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
   *
   *If the authorization required a version check, this call will ensure the spec name
   *remains unchanged and that the spec version has increased.
   *
   *Note that this function will not apply the new `code`, but only attempt to schedule the
   *upgrade with the Relay Chain.
   *
   *All origins are allowed.
   */
  enact_authorized_upgrade: Anonymize<I6pjjpfvhvcfru>
}>
export type I60v7bikk54tpu = {
  data: {
    validation_data: Anonymize<Ifn6q3equiq9qi>
    relay_chain_state: Anonymize<Itom7fk49o0c9>
    downward_messages: Anonymize<I6ljjd4b5fa4ov>
    horizontal_messages: Anonymize<I2pf0b05mc7sdr>
  }
}
export type Ifpj261e8s63m3 = {
  message: Binary
}
export type I9dpq5287dur8b = AnonymousEnum<{
  /**
   *Set the list of invulnerable (fixed) collators. These collators must do some
   *preparation, namely to have registered session keys.
   *
   *The call will remove any accounts that have not registered keys from the set. That is,
   *it is non-atomic; the caller accepts all `AccountId`s passed in `new` _individually_ as
   *acceptable Invulnerables, and is not proposing a _set_ of new Invulnerables.
   *
   *This call does not maintain mutual exclusivity of `Invulnerables` and `Candidates`. It
   *is recommended to use a batch of `add_invulnerable` and `remove_invulnerable` instead. A
   *`batch_all` can also be used to enforce atomicity. If any candidates are included in
   *`new`, they should be removed with `remove_invulnerable_candidate` after execution.
   *
   *Must be called by the `UpdateOrigin`.
   */
  set_invulnerables: Anonymize<Ifccifqltb5obi>
  /**
   *Set the ideal number of non-invulnerable collators. If lowering this number, then the
   *number of running collators could be higher than this figure. Aside from that edge case,
   *there should be no other way to have more candidates than the desired number.
   *
   *The origin for this call must be the `UpdateOrigin`.
   */
  set_desired_candidates: Anonymize<Iadtsfv699cq8b>
  /**
   *Set the candidacy bond amount.
   *
   *If the candidacy bond is increased by this call, all current candidates which have a
   *deposit lower than the new bond will be kicked from the list and get their deposits
   *back.
   *
   *The origin for this call must be the `UpdateOrigin`.
   */
  set_candidacy_bond: Anonymize<Ialpmgmhr3gk5r>
  /**
   *Register this account as a collator candidate. The account must (a) already have
   *registered session keys and (b) be able to reserve the `CandidacyBond`.
   *
   *This call is not available to `Invulnerable` collators.
   */
  register_as_candidate: undefined
  /**
   *Deregister `origin` as a collator candidate. Note that the collator can only leave on
   *session change. The `CandidacyBond` will be unreserved immediately.
   *
   *This call will fail if the total number of candidates would drop below
   *`MinEligibleCollators`.
   */
  leave_intent: undefined
  /**
   *Add a new account `who` to the list of `Invulnerables` collators. `who` must have
   *registered session keys. If `who` is a candidate, they will be removed.
   *
   *The origin for this call must be the `UpdateOrigin`.
   */
  add_invulnerable: Anonymize<I4cbvqmqadhrea>
  /**
   *Remove an account `who` from the list of `Invulnerables` collators. `Invulnerables` must
   *be sorted.
   *
   *The origin for this call must be the `UpdateOrigin`.
   */
  remove_invulnerable: Anonymize<I4cbvqmqadhrea>
  /**
   *Update the candidacy bond of collator candidate `origin` to a new amount `new_deposit`.
   *
   *Setting a `new_deposit` that is lower than the current deposit while `origin` is
   *occupying a top-`DesiredCandidates` slot is not allowed.
   *
   *This call will fail if `origin` is not a collator candidate, the updated bond is lower
   *than the minimum candidacy bond, and/or the amount cannot be reserved.
   */
  update_bond: Anonymize<I3sdol54kg5jaq>
  /**
   *The caller `origin` replaces a candidate `target` in the collator candidate list by
   *reserving `deposit`. The amount `deposit` reserved by the caller must be greater than
   *the existing bond of the target it is trying to replace.
   *
   *This call will fail if the caller is already a collator candidate or invulnerable, the
   *caller does not have registered session keys, the target is not a collator candidate,
   *and/or the `deposit` amount cannot be reserved.
   */
  take_candidate_slot: Anonymize<I8fougodaj6di6>
}>
export type Ifccifqltb5obi = {
  new: Anonymize<Ia2lhg7l2hilo3>
}
export type Iadtsfv699cq8b = {
  max: number
}
export type Ialpmgmhr3gk5r = {
  bond: bigint
}
export type I3sdol54kg5jaq = {
  new_deposit: bigint
}
export type I8fougodaj6di6 = {
  deposit: bigint
  target: SS58String
}
export type I77dda7hps0u37 = AnonymousEnum<{
  /**
   *Sets the session key(s) of the function caller to `keys`.
   *Allows an account to set its session key prior to becoming a validator.
   *This doesn't take effect until the next session.
   *
   *The dispatch origin of this function must be signed.
   *
   *## Complexity
   *- `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
   *  fixed.
   */
  set_keys: Anonymize<I81vt5eq60l4b6>
  /**
   *Removes any session key(s) of the function caller.
   *
   *This doesn't take effect until the next session.
   *
   *The dispatch origin of this function must be Signed and the account must be either be
   *convertible to a validator ID using the chain's typical addressing system (this usually
   *means being a controller account) or directly convertible into a validator ID (which
   *usually means being a stash account).
   *
   *## Complexity
   *- `O(1)` in number of key types. Actual cost depends on the number of length of
   *  `T::Keys::key_ids()` which is fixed.
   */
  purge_keys: undefined
}>
export type I81vt5eq60l4b6 = {
  keys: FixedSizeBinary<32>
  proof: Binary
}
export type Ib7tahn20bvsep = AnonymousEnum<{
  /**
   *Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
   *
   *- `origin`: Must pass `ControllerOrigin`.
   */
  suspend_xcm_execution: undefined
  /**
   *Resumes all XCM executions for the XCMP queue.
   *
   *Note that this function doesn't change the status of the in/out bound channels.
   *
   *- `origin`: Must pass `ControllerOrigin`.
   */
  resume_xcm_execution: undefined
  /**
   *Overwrites the number of pages which must be in the queue for the other side to be
   *told to suspend their sending.
   *
   *- `origin`: Must pass `Root`.
   *- `new`: Desired value for `QueueConfigData.suspend_value`
   */
  update_suspend_threshold: Anonymize<I3vh014cqgmrfd>
  /**
   *Overwrites the number of pages which must be in the queue after which we drop any
   *further messages from the channel.
   *
   *- `origin`: Must pass `Root`.
   *- `new`: Desired value for `QueueConfigData.drop_threshold`
   */
  update_drop_threshold: Anonymize<I3vh014cqgmrfd>
  /**
   *Overwrites the number of pages which the queue must be reduced to before it signals
   *that message sending may recommence after it has been suspended.
   *
   *- `origin`: Must pass `Root`.
   *- `new`: Desired value for `QueueConfigData.resume_threshold`
   */
  update_resume_threshold: Anonymize<I3vh014cqgmrfd>
}>
export type I6epb28bkd5aqn = AnonymousEnum<{
  /**
   *Notification about congested bridge queue.
   */
  report_bridge_status: Anonymize<Idlampfle3vh6q>
}>
export type Idlampfle3vh6q = {
  bridge_id: FixedSizeBinary<32>
  is_congested: boolean
}
export type Ic2uoe7jdksosp = AnonymousEnum<{
  /**
   *Remove a page which has no more messages remaining to be processed or is stale.
   */
  reap_page: Anonymize<I40pqum1mu8qg3>
  /**
   *Execute an overweight message.
   *
   *Temporary processing errors will be propagated whereas permanent errors are treated
   *as success condition.
   *
   *- `origin`: Must be `Signed`.
   *- `message_origin`: The origin from which the message to be executed arrived.
   *- `page`: The page in the queue in which the message to be executed is sitting.
   *- `index`: The index into the queue of the message to be executed.
   *- `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
   *  of the message.
   *
   *Benchmark complexity considerations: O(index + weight_limit).
   */
  execute_overweight: Anonymize<I1r4c2ghbtvjuc>
}>
export type I40pqum1mu8qg3 = {
  message_origin: Anonymize<Iejeo53sea6n4q>
  page_index: number
}
export type I1r4c2ghbtvjuc = {
  message_origin: Anonymize<Iejeo53sea6n4q>
  page: number
  index: number
  weight_limit: Anonymize<I4q39t5hn830vp>
}
export type I6klbk16est7ri = AnonymousEnum<{
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
  batch: Anonymize<Ic8op9rkehldqm>
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
  as_derivative: Anonymize<I1oss3cbkjdb8e>
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
  batch_all: Anonymize<Ic8op9rkehldqm>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<I8gc4nnphta0mn>
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
  force_batch: Anonymize<Ic8op9rkehldqm>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<Idd3pmare7cfmb>
}>
export type Ic8op9rkehldqm = {
  calls: Array<TxCallData>
}
export type I1oss3cbkjdb8e = {
  index: number
  call: TxCallData
}
export type I8gc4nnphta0mn = {
  as_origin: Anonymize<I48v5riethqckl>
  call: TxCallData
}
export type I48v5riethqckl = AnonymousEnum<{
  system: DispatchRawOrigin
  PolkadotXcm: XcmPalletOrigin
  CumulusXcm: Anonymize<I3in0d0lb61qi8>
  Void: undefined
}>
export type I3in0d0lb61qi8 = AnonymousEnum<{
  Relay: undefined
  SiblingParachain: number
}>
export type Idd3pmare7cfmb = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type Ic5rdiqm6spalv = AnonymousEnum<{
  /**
   *Immediately dispatch a multi-signature call using a single approval from the caller.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `other_signatories`: The accounts (other than the sender) who are part of the
   *multi-signature, but do not participate in the approval process.
   *- `call`: The call to be executed.
   *
   *Result is equivalent to the dispatched result.
   *
   *## Complexity
   *O(Z + C) where Z is the length of the call and C its execution weight.
   */
  as_multi_threshold_1: Anonymize<Iegcuqs7gopsn>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *If there are enough, then dispatch the call.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call`: The call to be executed.
   *
   *NOTE: Unless this is the final approval, you will generally want to use
   *`approve_as_multi` instead, since it only requires a hash of the call.
   *
   *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *on success, result is `Ok` and the result from the interior call, if it was executed,
   *may be found in the deposited `MultisigExecuted` event.
   *
   *## Complexity
   *- `O(S + Z + Call)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- The weight of the `call`.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  as_multi: Anonymize<I4kik4fr82b8sg>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call_hash`: The hash of the call to be executed.
   *
   *NOTE: If this is the final approval, you will want to use `as_multi` instead.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  approve_as_multi: Anonymize<Ideaemvoneh309>
  /**
   *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
   *for this operation will be unreserved on success.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `timepoint`: The timepoint (block number and transaction index) of the first approval
   *transaction for this dispatch.
   *- `call_hash`: The hash of the call to be executed.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- One event.
   *- I/O: 1 read `O(S)`, one remove.
   *- Storage: removes one item.
   */
  cancel_as_multi: Anonymize<I3d9o9d7epp66v>
}>
export type Iegcuqs7gopsn = {
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  call: TxCallData
}
export type I4kik4fr82b8sg = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call: TxCallData
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type I9bckvt4ge4t1v = AnonymousEnum<{
  /**
   *Dispatch the given `call` from an account that the sender is authorised for through
   *`add_proxy`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy: Anonymize<I93qep6uulr6h3>
  /**
   *Register a proxy account for the sender that is able to make calls on its behalf.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to make a proxy.
   *- `proxy_type`: The permissions allowed for this proxy account.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   */
  add_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister a proxy account for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to remove as a proxy.
   *- `proxy_type`: The permissions currently enabled for the removed proxy account.
   */
  remove_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister all proxy accounts for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *WARNING: This may be called on accounts created by `pure`, however if done, then
   *the unreserved fees will be inaccessible. **All access to this account will be lost.**
   */
  remove_proxies: undefined
  /**
   *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
   *initialize it with a proxy of `proxy_type` for `origin` sender.
   *
   *Requires a `Signed` origin.
   *
   *- `proxy_type`: The type of the proxy that the sender will be registered as over the
   *new account. This will almost always be the most permissive `ProxyType` possible to
   *allow for maximum flexibility.
   *- `index`: A disambiguation index, in case this is called multiple times in the same
   *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
   *want to use `0`.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   *
   *Fails with `Duplicate` if this has already been called in this transaction, from the
   *same sender, with the same parameters.
   *
   *Fails if there are insufficient funds to pay for deposit.
   */
  create_pure: Anonymize<Iefr8jgtgfk8um>
  /**
   *Removes a previously spawned pure proxy.
   *
   *WARNING: **All access to this account will be lost.** Any funds held in it will be
   *inaccessible.
   *
   *Requires a `Signed` origin, and the sender account must have been created by a call to
   *`pure` with corresponding parameters.
   *
   *- `spawner`: The account that originally called `pure` to create this account.
   *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
   *- `proxy_type`: The proxy type originally passed to `pure`.
   *- `height`: The height of the chain when the call to `pure` was processed.
   *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
   *
   *Fails with `NoPermission` in case the caller is not a previously created pure
   *account whose `pure` call has corresponding parameters.
   */
  kill_pure: Anonymize<I3j05hul54uj7q>
  /**
   *Publish the hash of a proxy-call that will be made in the future.
   *
   *This must be called some number of blocks before the corresponding `proxy` is attempted
   *if the delay associated with the proxy relationship is greater than zero.
   *
   *No more than `MaxPending` announcements may be made at any one time.
   *
   *This will take a deposit of `AnnouncementDepositFactor` as well as
   *`AnnouncementDepositBase` if there are no other pending announcements.
   *
   *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  announce: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove a given announcement.
   *
   *May be called by a proxy account to remove a call they previously announced and return
   *the deposit.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  remove_announcement: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove the given announcement of a delegate.
   *
   *May be called by a target (proxied) account to remove a call that one of their delegates
   *(`delegate`) has announced they want to execute. The deposit is returned.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `delegate`: The account that previously announced the call.
   *- `call_hash`: The hash of the call to be made.
   */
  reject_announcement: Anonymize<Ianmuoljk2sk1u>
  /**
   *Dispatch the given `call` from an account that the sender is authorized for through
   *`add_proxy`.
   *
   *Removes any corresponding announcement(s).
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy_announced: Anonymize<Iah6ud3n0qbnq5>
}>
export type I93qep6uulr6h3 = {
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type I7rk1n3vg3et43 = Anonymize<I5ftepkjop3g1u> | undefined
export type Iovrcu9bfelfq = {
  delegate: MultiAddress
  proxy_type: Anonymize<I5ftepkjop3g1u>
  delay: number
}
export type Iefr8jgtgfk8um = {
  proxy_type: Anonymize<I5ftepkjop3g1u>
  delay: number
  index: number
}
export type I3j05hul54uj7q = {
  spawner: MultiAddress
  proxy_type: Anonymize<I5ftepkjop3g1u>
  index: number
  height: number
  ext_index: number
}
export type Iah6ud3n0qbnq5 = {
  delegate: MultiAddress
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type Ideusanoto4b1j = AnonymousEnum<{
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
  create: Anonymize<Ic357tcepuvo5c>
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
  force_create: Anonymize<I2rnoam876ruhj>
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
   *The asset class must be frozen before calling `start_destroy`.
   */
  start_destroy: Anonymize<Ic5b47dj4coa3r>
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
  destroy_accounts: Anonymize<Ic5b47dj4coa3r>
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
  destroy_approvals: Anonymize<Ic5b47dj4coa3r>
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
  finish_destroy: Anonymize<Ic5b47dj4coa3r>
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
  mint: Anonymize<Ib3qnc19gu633c>
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
  burn: Anonymize<Ifira6u9hi7cu1>
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
  transfer: Anonymize<I72tqocvdoqfff>
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
  transfer_keep_alive: Anonymize<I72tqocvdoqfff>
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
  force_transfer: Anonymize<I2i27f3sfmvc05>
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
  freeze: Anonymize<I1nlrtd1epki2d>
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
  thaw: Anonymize<I1nlrtd1epki2d>
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
  freeze_asset: Anonymize<Ic5b47dj4coa3r>
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
  thaw_asset: Anonymize<Ic5b47dj4coa3r>
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
  transfer_ownership: Anonymize<I3abtumcmempjs>
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
  set_team: Anonymize<Id81m8flopt8ha>
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
  set_metadata: Anonymize<I8hff7chabggkd>
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
  clear_metadata: Anonymize<Ic5b47dj4coa3r>
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
  force_set_metadata: Anonymize<I49i39mtj1ivbs>
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
  force_clear_metadata: Anonymize<Ic5b47dj4coa3r>
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
  force_asset_status: Anonymize<Ifkr2kcak2vto1>
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
  approve_transfer: Anonymize<I1ju6r8q0cs9jt>
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
  cancel_approval: Anonymize<I4kpeq6j7cd5bu>
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
  force_cancel_approval: Anonymize<I5na1ka76k6811>
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
  transfer_approved: Anonymize<I59mhdb9omdqfa>
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
  touch: Anonymize<Ic5b47dj4coa3r>
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
   *Emits `Refunded` event when successful.
   */
  refund: Anonymize<I9vl5kpk0fpakt>
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
  set_min_balance: Anonymize<I717jt61hu19b4>
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
  touch_other: Anonymize<I1nlrtd1epki2d>
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
   *Emits `Refunded` event when successful.
   */
  refund_other: Anonymize<I1nlrtd1epki2d>
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
  block: Anonymize<I1nlrtd1epki2d>
}>
export type Ic357tcepuvo5c = {
  id: number
  admin: MultiAddress
  min_balance: bigint
}
export type I2rnoam876ruhj = {
  id: number
  owner: MultiAddress
  is_sufficient: boolean
  min_balance: bigint
}
export type Ib3qnc19gu633c = {
  id: number
  beneficiary: MultiAddress
  amount: bigint
}
export type Ifira6u9hi7cu1 = {
  id: number
  who: MultiAddress
  amount: bigint
}
export type I72tqocvdoqfff = {
  id: number
  target: MultiAddress
  amount: bigint
}
export type I2i27f3sfmvc05 = {
  id: number
  source: MultiAddress
  dest: MultiAddress
  amount: bigint
}
export type I1nlrtd1epki2d = {
  id: number
  who: MultiAddress
}
export type I3abtumcmempjs = {
  id: number
  owner: MultiAddress
}
export type Id81m8flopt8ha = {
  id: number
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
}
export type I8hff7chabggkd = {
  id: number
  name: Binary
  symbol: Binary
  decimals: number
}
export type I49i39mtj1ivbs = {
  id: number
  name: Binary
  symbol: Binary
  decimals: number
  is_frozen: boolean
}
export type Ifkr2kcak2vto1 = {
  id: number
  owner: MultiAddress
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
  min_balance: bigint
  is_sufficient: boolean
  is_frozen: boolean
}
export type I1ju6r8q0cs9jt = {
  id: number
  delegate: MultiAddress
  amount: bigint
}
export type I4kpeq6j7cd5bu = {
  id: number
  delegate: MultiAddress
}
export type I5na1ka76k6811 = {
  id: number
  owner: MultiAddress
  delegate: MultiAddress
}
export type I59mhdb9omdqfa = {
  id: number
  owner: MultiAddress
  destination: MultiAddress
  amount: bigint
}
export type I9vl5kpk0fpakt = {
  id: number
  allow_burn: boolean
}
export type I717jt61hu19b4 = {
  id: number
  min_balance: bigint
}
export type Icu49uv7rfej74 = AnonymousEnum<{
  /**
   *Issue a new collection of non-fungible items from a public origin.
   *
   *This new collection has no items initially and its owner is the origin.
   *
   *The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
   *
   *`ItemDeposit` funds of sender are reserved.
   *
   *Parameters:
   *- `collection`: The identifier of the new collection. This must not be currently in use.
   *- `admin`: The admin of this collection. The admin is the initial address of each
   *member of the collection's admin team.
   *
   *Emits `Created` event when successful.
   *
   *Weight: `O(1)`
   */
  create: Anonymize<If66ivi02f7256>
  /**
   *Issue a new collection of non-fungible items from a privileged origin.
   *
   *This new collection has no items initially.
   *
   *The origin must conform to `ForceOrigin`.
   *
   *Unlike `create`, no funds are reserved.
   *
   *- `collection`: The identifier of the new item. This must not be currently in use.
   *- `owner`: The owner of this collection of items. The owner has full superuser
   *  permissions
   *over this item, but may later change and configure the permissions using
   *`transfer_ownership` and `set_team`.
   *
   *Emits `ForceCreated` event when successful.
   *
   *Weight: `O(1)`
   */
  force_create: Anonymize<I223jtcatlfkrc>
  /**
   *Destroy a collection of fungible items.
   *
   *The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
   *owner of the `collection`.
   *
   *- `collection`: The identifier of the collection to be destroyed.
   *- `witness`: Information on the items minted in the collection. This must be
   *correct.
   *
   *Emits `Destroyed` event when successful.
   *
   *Weight: `O(n + m)` where:
   *- `n = witness.items`
   *- `m = witness.item_metadatas`
   *- `a = witness.attributes`
   */
  destroy: Anonymize<I223jg78mng8hq>
  /**
   *Mint an item of a particular collection.
   *
   *The origin must be Signed and the sender must be the Issuer of the `collection`.
   *
   *- `collection`: The collection of the item to be minted.
   *- `item`: The item value of the item to be minted.
   *- `beneficiary`: The initial owner of the minted item.
   *
   *Emits `Issued` event when successful.
   *
   *Weight: `O(1)`
   */
  mint: Anonymize<I4iiuiftkpq3fd>
  /**
   *Destroy a single item.
   *
   *Origin must be Signed and the signing account must be either:
   *- the Admin of the `collection`;
   *- the Owner of the `item`;
   *
   *- `collection`: The collection of the item to be burned.
   *- `item`: The item of the item to be burned.
   *- `check_owner`: If `Some` then the operation will fail with `WrongOwner` unless the
   *  item is owned by this value.
   *
   *Emits `Burned` with the actual amount burned.
   *
   *Weight: `O(1)`
   *Modes: `check_owner.is_some()`.
   */
  burn: Anonymize<Ibra6533h92c0a>
  /**
   *Move an item from the sender account to another.
   *
   *This resets the approved account of the item.
   *
   *Origin must be Signed and the signing account must be either:
   *- the Admin of the `collection`;
   *- the Owner of the `item`;
   *- the approved delegate for the `item` (in this case, the approval is reset).
   *
   *Arguments:
   *- `collection`: The collection of the item to be transferred.
   *- `item`: The item of the item to be transferred.
   *- `dest`: The account to receive ownership of the item.
   *
   *Emits `Transferred`.
   *
   *Weight: `O(1)`
   */
  transfer: Anonymize<Ibgvkh96s68a66>
  /**
   *Reevaluate the deposits on some items.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection to be frozen.
   *- `items`: The items of the collection whose deposits will be reevaluated.
   *
   *NOTE: This exists as a best-effort function. Any items which are unknown or
   *in the case that the owner account does not have reservable funds to pay for a
   *deposit increase are ignored. Generally the owner isn't going to call this on items
   *whose existing deposit is less than the refreshed deposit as it would only cost them,
   *so it's of little consequence.
   *
   *It will still return an error in the case that the collection is unknown of the signer
   *is not permitted to call it.
   *
   *Weight: `O(items.len())`
   */
  redeposit: Anonymize<If9vko7pv0231m>
  /**
   *Disallow further unprivileged transfer of an item.
   *
   *Origin must be Signed and the sender should be the Freezer of the `collection`.
   *
   *- `collection`: The collection of the item to be frozen.
   *- `item`: The item of the item to be frozen.
   *
   *Emits `Frozen`.
   *
   *Weight: `O(1)`
   */
  freeze: Anonymize<Iafkqus0ohh6l6>
  /**
   *Re-allow unprivileged transfer of an item.
   *
   *Origin must be Signed and the sender should be the Freezer of the `collection`.
   *
   *- `collection`: The collection of the item to be thawed.
   *- `item`: The item of the item to be thawed.
   *
   *Emits `Thawed`.
   *
   *Weight: `O(1)`
   */
  thaw: Anonymize<Iafkqus0ohh6l6>
  /**
   *Disallow further unprivileged transfers for a whole collection.
   *
   *Origin must be Signed and the sender should be the Freezer of the `collection`.
   *
   *- `collection`: The collection to be frozen.
   *
   *Emits `CollectionFrozen`.
   *
   *Weight: `O(1)`
   */
  freeze_collection: Anonymize<I6cu7obfo0rr0o>
  /**
   *Re-allow unprivileged transfers for a whole collection.
   *
   *Origin must be Signed and the sender should be the Admin of the `collection`.
   *
   *- `collection`: The collection to be thawed.
   *
   *Emits `CollectionThawed`.
   *
   *Weight: `O(1)`
   */
  thaw_collection: Anonymize<I6cu7obfo0rr0o>
  /**
   *Change the Owner of a collection.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection whose owner should be changed.
   *- `owner`: The new Owner of this collection. They must have called
   *  `set_accept_ownership` with `collection` in order for this operation to succeed.
   *
   *Emits `OwnerChanged`.
   *
   *Weight: `O(1)`
   */
  transfer_ownership: Anonymize<I736lv5q9m5bot>
  /**
   *Change the Issuer, Admin and Freezer of a collection.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection whose team should be changed.
   *- `issuer`: The new Issuer of this collection.
   *- `admin`: The new Admin of this collection.
   *- `freezer`: The new Freezer of this collection.
   *
   *Emits `TeamChanged`.
   *
   *Weight: `O(1)`
   */
  set_team: Anonymize<I1ap9tlenhr44l>
  /**
   *Approve an item to be transferred by a delegated third-party account.
   *
   *The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be
   *either the owner of the `item` or the admin of the collection.
   *
   *- `collection`: The collection of the item to be approved for delegated transfer.
   *- `item`: The item of the item to be approved for delegated transfer.
   *- `delegate`: The account to delegate permission to transfer the item.
   *
   *Important NOTE: The `approved` account gets reset after each transfer.
   *
   *Emits `ApprovedTransfer` on success.
   *
   *Weight: `O(1)`
   */
  approve_transfer: Anonymize<Ib92t90p616grb>
  /**
   *Cancel the prior approval for the transfer of an item by a delegate.
   *
   *Origin must be either:
   *- the `Force` origin;
   *- `Signed` with the signer being the Admin of the `collection`;
   *- `Signed` with the signer being the Owner of the `item`;
   *
   *Arguments:
   *- `collection`: The collection of the item of whose approval will be cancelled.
   *- `item`: The item of the item of whose approval will be cancelled.
   *- `maybe_check_delegate`: If `Some` will ensure that the given account is the one to
   *  which permission of transfer is delegated.
   *
   *Emits `ApprovalCancelled` on success.
   *
   *Weight: `O(1)`
   */
  cancel_approval: Anonymize<Ieipuujd6879do>
  /**
   *Alter the attributes of a given item.
   *
   *Origin must be `ForceOrigin`.
   *
   *- `collection`: The identifier of the item.
   *- `owner`: The new Owner of this item.
   *- `issuer`: The new Issuer of this item.
   *- `admin`: The new Admin of this item.
   *- `freezer`: The new Freezer of this item.
   *- `free_holding`: Whether a deposit is taken for holding an item of this collection.
   *- `is_frozen`: Whether this collection is frozen except for permissioned/admin
   *instructions.
   *
   *Emits `ItemStatusChanged` with the identity of the item.
   *
   *Weight: `O(1)`
   */
  force_item_status: Anonymize<Ie56eq9sg1rsoc>
  /**
   *Set an attribute for a collection or item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`collection`.
   *
   *If the origin is Signed, then funds of signer are reserved according to the formula:
   *`MetadataDepositBase + DepositPerByte * (key.len + value.len)` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the collection whose item's metadata to set.
   *- `maybe_item`: The identifier of the item whose metadata to set.
   *- `key`: The key of the attribute.
   *- `value`: The value to which to set the attribute.
   *
   *Emits `AttributeSet`.
   *
   *Weight: `O(1)`
   */
  set_attribute: Anonymize<I5tvvgui05tn6e>
  /**
   *Clear an attribute for a collection or item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`collection`.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose item's metadata to clear.
   *- `maybe_item`: The identifier of the item whose metadata to clear.
   *- `key`: The key of the attribute.
   *
   *Emits `AttributeCleared`.
   *
   *Weight: `O(1)`
   */
  clear_attribute: Anonymize<Ibal0joadvdc2h>
  /**
   *Set the metadata for an item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`collection`.
   *
   *If the origin is Signed, then funds of signer are reserved according to the formula:
   *`MetadataDepositBase + DepositPerByte * data.len` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the collection whose item's metadata to set.
   *- `item`: The identifier of the item whose metadata to set.
   *- `data`: The general information of this item. Limited in length by `StringLimit`.
   *- `is_frozen`: Whether the metadata should be frozen against further changes.
   *
   *Emits `MetadataSet`.
   *
   *Weight: `O(1)`
   */
  set_metadata: Anonymize<Iceq9fmmp9aeqv>
  /**
   *Clear the metadata for an item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`item`.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose item's metadata to clear.
   *- `item`: The identifier of the item whose metadata to clear.
   *
   *Emits `MetadataCleared`.
   *
   *Weight: `O(1)`
   */
  clear_metadata: Anonymize<Iafkqus0ohh6l6>
  /**
   *Set the metadata for a collection.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
   *the `collection`.
   *
   *If the origin is `Signed`, then funds of signer are reserved according to the formula:
   *`MetadataDepositBase + DepositPerByte * data.len` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the item whose metadata to update.
   *- `data`: The general information of this item. Limited in length by `StringLimit`.
   *- `is_frozen`: Whether the metadata should be frozen against further changes.
   *
   *Emits `CollectionMetadataSet`.
   *
   *Weight: `O(1)`
   */
  set_collection_metadata: Anonymize<I9viqhmdtuof5e>
  /**
   *Clear the metadata for a collection.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
   *the `collection`.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose metadata to clear.
   *
   *Emits `CollectionMetadataCleared`.
   *
   *Weight: `O(1)`
   */
  clear_collection_metadata: Anonymize<I6cu7obfo0rr0o>
  /**
   *Set (or reset) the acceptance of ownership for a particular account.
   *
   *Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
   *provider reference.
   *
   *- `maybe_collection`: The identifier of the collection whose ownership the signer is
   *  willing to accept, or if `None`, an indication that the signer is willing to accept no
   *  ownership transferal.
   *
   *Emits `OwnershipAcceptanceChanged`.
   */
  set_accept_ownership: Anonymize<Ibqooroq6rr5kr>
  /**
   *Set the maximum amount of items a collection could have.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
   *the `collection`.
   *
   *Note: This function can only succeed once per collection.
   *
   *- `collection`: The identifier of the collection to change.
   *- `max_supply`: The maximum amount of items a collection could have.
   *
   *Emits `CollectionMaxSupplySet` event when successful.
   */
  set_collection_max_supply: Anonymize<I6h88h8vba22v8>
  /**
   *Set (or reset) the price for an item.
   *
   *Origin must be Signed and must be the owner of the asset `item`.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item to set the price for.
   *- `price`: The price for the item. Pass `None`, to reset the price.
   *- `buyer`: Restricts the buy operation to a specific account.
   *
   *Emits `ItemPriceSet` on success if the price is not `None`.
   *Emits `ItemPriceRemoved` on success if the price is `None`.
   */
  set_price: Anonymize<Ia9cd4jqb5eecb>
  /**
   *Allows to buy an item if it's up for sale.
   *
   *Origin must be Signed and must not be the owner of the `item`.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item the sender wants to buy.
   *- `bid_price`: The price the sender is willing to pay.
   *
   *Emits `ItemBought` on success.
   */
  buy_item: Anonymize<I19jiel1ftbcce>
}>
export type If66ivi02f7256 = {
  collection: number
  admin: MultiAddress
}
export type I223jtcatlfkrc = {
  collection: number
  owner: MultiAddress
  free_holding: boolean
}
export type I223jg78mng8hq = {
  collection: number
  witness: {
    items: number
    item_metadatas: number
    attributes: number
  }
}
export type I4iiuiftkpq3fd = {
  collection: number
  item: number
  owner: MultiAddress
}
export type Ibra6533h92c0a = {
  collection: number
  item: number
  check_owner?: Anonymize<Ia0jlc0rcbskuk>
}
export type Ia0jlc0rcbskuk = MultiAddress | undefined
export type Ibgvkh96s68a66 = {
  collection: number
  item: number
  dest: MultiAddress
}
export type If9vko7pv0231m = {
  collection: number
  items: Anonymize<Icgljjb6j82uhn>
}
export type I736lv5q9m5bot = {
  collection: number
  new_owner: MultiAddress
}
export type I1ap9tlenhr44l = {
  collection: number
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
}
export type Ib92t90p616grb = {
  collection: number
  item: number
  delegate: MultiAddress
}
export type Ieipuujd6879do = {
  collection: number
  item: number
  maybe_check_delegate?: Anonymize<Ia0jlc0rcbskuk>
}
export type Ie56eq9sg1rsoc = {
  collection: number
  owner: MultiAddress
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
  free_holding: boolean
  is_frozen: boolean
}
export type Ibqooroq6rr5kr = {
  maybe_collection?: Anonymize<I4arjljr6dpflb>
}
export type Ia9cd4jqb5eecb = {
  collection: number
  item: number
  price?: Anonymize<I35p85j063s0il>
  whitelisted_buyer?: Anonymize<Ia0jlc0rcbskuk>
}
export type I19jiel1ftbcce = {
  collection: number
  item: number
  bid_price: bigint
}
export type I1k4il7i5elhc7 = AnonymousEnum<{
  /**
   *Issue a new collection of non-fungible items from a public origin.
   *
   *This new collection has no items initially and its owner is the origin.
   *
   *The origin must be Signed and the sender must have sufficient funds free.
   *
   *`CollectionDeposit` funds of sender are reserved.
   *
   *Parameters:
   *- `admin`: The admin of this collection. The admin is the initial address of each
   *member of the collection's admin team.
   *
   *Emits `Created` event when successful.
   *
   *Weight: `O(1)`
   */
  create: Anonymize<I43aobns89nbkh>
  /**
   *Issue a new collection of non-fungible items from a privileged origin.
   *
   *This new collection has no items initially.
   *
   *The origin must conform to `ForceOrigin`.
   *
   *Unlike `create`, no funds are reserved.
   *
   *- `owner`: The owner of this collection of items. The owner has full superuser
   *  permissions over this item, but may later change and configure the permissions using
   *  `transfer_ownership` and `set_team`.
   *
   *Emits `ForceCreated` event when successful.
   *
   *Weight: `O(1)`
   */
  force_create: Anonymize<Iamd7rovec1hfb>
  /**
   *Destroy a collection of fungible items.
   *
   *The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
   *owner of the `collection`.
   *
   *NOTE: The collection must have 0 items to be destroyed.
   *
   *- `collection`: The identifier of the collection to be destroyed.
   *- `witness`: Information on the items minted in the collection. This must be
   *correct.
   *
   *Emits `Destroyed` event when successful.
   *
   *Weight: `O(m + c + a)` where:
   *- `m = witness.item_metadatas`
   *- `c = witness.item_configs`
   *- `a = witness.attributes`
   */
  destroy: Anonymize<I77ie723ncd4co>
  /**
   *Mint an item of a particular collection.
   *
   *The origin must be Signed and the sender must comply with the `mint_settings` rules.
   *
   *- `collection`: The collection of the item to be minted.
   *- `item`: An identifier of the new item.
   *- `mint_to`: Account into which the item will be minted.
   *- `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
   *  item_id from that collection needs to be provided within the witness data object. If
   *  the mint price is set, then it should be additionally confirmed in the `witness_data`.
   *
   *Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
   *
   *Emits `Issued` event when successful.
   *
   *Weight: `O(1)`
   */
  mint: Anonymize<Ieebloeahma3ke>
  /**
   *Mint an item of a particular collection from a privileged origin.
   *
   *The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
   *Issuer of the `collection`.
   *
   *- `collection`: The collection of the item to be minted.
   *- `item`: An identifier of the new item.
   *- `mint_to`: Account into which the item will be minted.
   *- `item_config`: A config of the new item.
   *
   *Emits `Issued` event when successful.
   *
   *Weight: `O(1)`
   */
  force_mint: Anonymize<I4mbtpf4pu3rec>
  /**
   *Destroy a single item.
   *
   *The origin must conform to `ForceOrigin` or must be Signed and the signing account must
   *be the owner of the `item`.
   *
   *- `collection`: The collection of the item to be burned.
   *- `item`: The item to be burned.
   *
   *Emits `Burned`.
   *
   *Weight: `O(1)`
   */
  burn: Anonymize<Iafkqus0ohh6l6>
  /**
   *Move an item from the sender account to another.
   *
   *Origin must be Signed and the signing account must be either:
   *- the Owner of the `item`;
   *- the approved delegate for the `item` (in this case, the approval is reset).
   *
   *Arguments:
   *- `collection`: The collection of the item to be transferred.
   *- `item`: The item to be transferred.
   *- `dest`: The account to receive ownership of the item.
   *
   *Emits `Transferred`.
   *
   *Weight: `O(1)`
   */
  transfer: Anonymize<Ibgvkh96s68a66>
  /**
   *Re-evaluate the deposits on some items.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection of the items to be reevaluated.
   *- `items`: The items of the collection whose deposits will be reevaluated.
   *
   *NOTE: This exists as a best-effort function. Any items which are unknown or
   *in the case that the owner account does not have reservable funds to pay for a
   *deposit increase are ignored. Generally the owner isn't going to call this on items
   *whose existing deposit is less than the refreshed deposit as it would only cost them,
   *so it's of little consequence.
   *
   *It will still return an error in the case that the collection is unknown or the signer
   *is not permitted to call it.
   *
   *Weight: `O(items.len())`
   */
  redeposit: Anonymize<If9vko7pv0231m>
  /**
   *Disallow further unprivileged transfer of an item.
   *
   *Origin must be Signed and the sender should be the Freezer of the `collection`.
   *
   *- `collection`: The collection of the item to be changed.
   *- `item`: The item to become non-transferable.
   *
   *Emits `ItemTransferLocked`.
   *
   *Weight: `O(1)`
   */
  lock_item_transfer: Anonymize<Iafkqus0ohh6l6>
  /**
   *Re-allow unprivileged transfer of an item.
   *
   *Origin must be Signed and the sender should be the Freezer of the `collection`.
   *
   *- `collection`: The collection of the item to be changed.
   *- `item`: The item to become transferable.
   *
   *Emits `ItemTransferUnlocked`.
   *
   *Weight: `O(1)`
   */
  unlock_item_transfer: Anonymize<Iafkqus0ohh6l6>
  /**
   *Disallows specified settings for the whole collection.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection to be locked.
   *- `lock_settings`: The settings to be locked.
   *
   *Note: it's possible to only lock(set) the setting, but not to unset it.
   *
   *Emits `CollectionLocked`.
   *
   *Weight: `O(1)`
   */
  lock_collection: Anonymize<I1ahf3pvgsgbu>
  /**
   *Change the Owner of a collection.
   *
   *Origin must be Signed and the sender should be the Owner of the `collection`.
   *
   *- `collection`: The collection whose owner should be changed.
   *- `owner`: The new Owner of this collection. They must have called
   *  `set_accept_ownership` with `collection` in order for this operation to succeed.
   *
   *Emits `OwnerChanged`.
   *
   *Weight: `O(1)`
   */
  transfer_ownership: Anonymize<I736lv5q9m5bot>
  /**
   *Change the Issuer, Admin and Freezer of a collection.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`collection`.
   *
   *Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
   *after to `Some(account)`.
   *
   *- `collection`: The collection whose team should be changed.
   *- `issuer`: The new Issuer of this collection.
   *- `admin`: The new Admin of this collection.
   *- `freezer`: The new Freezer of this collection.
   *
   *Emits `TeamChanged`.
   *
   *Weight: `O(1)`
   */
  set_team: Anonymize<I9uapdn16emsti>
  /**
   *Change the Owner of a collection.
   *
   *Origin must be `ForceOrigin`.
   *
   *- `collection`: The identifier of the collection.
   *- `owner`: The new Owner of this collection.
   *
   *Emits `OwnerChanged`.
   *
   *Weight: `O(1)`
   */
  force_collection_owner: Anonymize<Ie5i0q2glmr0md>
  /**
   *Change the config of a collection.
   *
   *Origin must be `ForceOrigin`.
   *
   *- `collection`: The identifier of the collection.
   *- `config`: The new config of this collection.
   *
   *Emits `CollectionConfigChanged`.
   *
   *Weight: `O(1)`
   */
  force_collection_config: Anonymize<I97qcg6i3l8gee>
  /**
   *Approve an item to be transferred by a delegated third-party account.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *`item`.
   *
   *- `collection`: The collection of the item to be approved for delegated transfer.
   *- `item`: The item to be approved for delegated transfer.
   *- `delegate`: The account to delegate permission to transfer the item.
   *- `maybe_deadline`: Optional deadline for the approval. Specified by providing the
   *	number of blocks after which the approval will expire
   *
   *Emits `TransferApproved` on success.
   *
   *Weight: `O(1)`
   */
  approve_transfer: Anonymize<Ib5udrahak005b>
  /**
   *Cancel one of the transfer approvals for a specific item.
   *
   *Origin must be either:
   *- the `Force` origin;
   *- `Signed` with the signer being the Owner of the `item`;
   *
   *Arguments:
   *- `collection`: The collection of the item of whose approval will be cancelled.
   *- `item`: The item of the collection of whose approval will be cancelled.
   *- `delegate`: The account that is going to loose their approval.
   *
   *Emits `ApprovalCancelled` on success.
   *
   *Weight: `O(1)`
   */
  cancel_approval: Anonymize<Ib92t90p616grb>
  /**
   *Cancel all the approvals of a specific item.
   *
   *Origin must be either:
   *- the `Force` origin;
   *- `Signed` with the signer being the Owner of the `item`;
   *
   *Arguments:
   *- `collection`: The collection of the item of whose approvals will be cleared.
   *- `item`: The item of the collection of whose approvals will be cleared.
   *
   *Emits `AllApprovalsCancelled` on success.
   *
   *Weight: `O(1)`
   */
  clear_all_transfer_approvals: Anonymize<Iafkqus0ohh6l6>
  /**
   *Disallows changing the metadata or attributes of the item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
   *of the `collection`.
   *
   *- `collection`: The collection if the `item`.
   *- `item`: An item to be locked.
   *- `lock_metadata`: Specifies whether the metadata should be locked.
   *- `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
   *  should be locked.
   *
   *Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
   *When the metadata or attributes are locked, it won't be possible the unlock them.
   *
   *Emits `ItemPropertiesLocked`.
   *
   *Weight: `O(1)`
   */
  lock_item_properties: Anonymize<I1jj31tn29ie3c>
  /**
   *Set an attribute for a collection or item.
   *
   *Origin must be Signed and must conform to the namespace ruleset:
   *- `CollectionOwner` namespace could be modified by the `collection` Admin only;
   *- `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
   *  should be set in that case;
   *- `Account(AccountId)` namespace could be modified only when the `origin` was given a
   *  permission to do so;
   *
   *The funds of `origin` are reserved according to the formula:
   *`AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the collection whose item's metadata to set.
   *- `maybe_item`: The identifier of the item whose metadata to set.
   *- `namespace`: Attribute's namespace.
   *- `key`: The key of the attribute.
   *- `value`: The value to which to set the attribute.
   *
   *Emits `AttributeSet`.
   *
   *Weight: `O(1)`
   */
  set_attribute: Anonymize<I5llu6o6a0go5i>
  /**
   *Force-set an attribute for a collection or item.
   *
   *Origin must be `ForceOrigin`.
   *
   *If the attribute already exists and it was set by another account, the deposit
   *will be returned to the previous owner.
   *
   *- `set_as`: An optional owner of the attribute.
   *- `collection`: The identifier of the collection whose item's metadata to set.
   *- `maybe_item`: The identifier of the item whose metadata to set.
   *- `namespace`: Attribute's namespace.
   *- `key`: The key of the attribute.
   *- `value`: The value to which to set the attribute.
   *
   *Emits `AttributeSet`.
   *
   *Weight: `O(1)`
   */
  force_set_attribute: Anonymize<Ic8b8561e6t9ie>
  /**
   *Clear an attribute for a collection or item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
   *attribute.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose item's metadata to clear.
   *- `maybe_item`: The identifier of the item whose metadata to clear.
   *- `namespace`: Attribute's namespace.
   *- `key`: The key of the attribute.
   *
   *Emits `AttributeCleared`.
   *
   *Weight: `O(1)`
   */
  clear_attribute: Anonymize<I93r2effh7od84>
  /**
   *Approve item's attributes to be changed by a delegated third-party account.
   *
   *Origin must be Signed and must be an owner of the `item`.
   *
   *- `collection`: A collection of the item.
   *- `item`: The item that holds attributes.
   *- `delegate`: The account to delegate permission to change attributes of the item.
   *
   *Emits `ItemAttributesApprovalAdded` on success.
   */
  approve_item_attributes: Anonymize<Ib92t90p616grb>
  /**
   *Cancel the previously provided approval to change item's attributes.
   *All the previously set attributes by the `delegate` will be removed.
   *
   *Origin must be Signed and must be an owner of the `item`.
   *
   *- `collection`: Collection that the item is contained within.
   *- `item`: The item that holds attributes.
   *- `delegate`: The previously approved account to remove.
   *
   *Emits `ItemAttributesApprovalRemoved` on success.
   */
  cancel_item_attributes_approval: Anonymize<I6afd7fllr8otc>
  /**
   *Set the metadata for an item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
   *`collection`.
   *
   *If the origin is Signed, then funds of signer are reserved according to the formula:
   *`MetadataDepositBase + DepositPerByte * data.len` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the collection whose item's metadata to set.
   *- `item`: The identifier of the item whose metadata to set.
   *- `data`: The general information of this item. Limited in length by `StringLimit`.
   *
   *Emits `ItemMetadataSet`.
   *
   *Weight: `O(1)`
   */
  set_metadata: Anonymize<Icrkms46uh8tpb>
  /**
   *Clear the metadata for an item.
   *
   *Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
   *`collection`.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose item's metadata to clear.
   *- `item`: The identifier of the item whose metadata to clear.
   *
   *Emits `ItemMetadataCleared`.
   *
   *Weight: `O(1)`
   */
  clear_metadata: Anonymize<Iafkqus0ohh6l6>
  /**
   *Set the metadata for a collection.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
   *the `collection`.
   *
   *If the origin is `Signed`, then funds of signer are reserved according to the formula:
   *`MetadataDepositBase + DepositPerByte * data.len` taking into
   *account any already reserved funds.
   *
   *- `collection`: The identifier of the item whose metadata to update.
   *- `data`: The general information of this item. Limited in length by `StringLimit`.
   *
   *Emits `CollectionMetadataSet`.
   *
   *Weight: `O(1)`
   */
  set_collection_metadata: Anonymize<I78u60nqh0etah>
  /**
   *Clear the metadata for a collection.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
   *the `collection`.
   *
   *Any deposit is freed for the collection's owner.
   *
   *- `collection`: The identifier of the collection whose metadata to clear.
   *
   *Emits `CollectionMetadataCleared`.
   *
   *Weight: `O(1)`
   */
  clear_collection_metadata: Anonymize<I6cu7obfo0rr0o>
  /**
   *Set (or reset) the acceptance of ownership for a particular account.
   *
   *Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
   *provider reference.
   *
   *- `maybe_collection`: The identifier of the collection whose ownership the signer is
   *  willing to accept, or if `None`, an indication that the signer is willing to accept no
   *  ownership transferal.
   *
   *Emits `OwnershipAcceptanceChanged`.
   */
  set_accept_ownership: Anonymize<Ibqooroq6rr5kr>
  /**
   *Set the maximum number of items a collection could have.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
   *the `collection`.
   *
   *- `collection`: The identifier of the collection to change.
   *- `max_supply`: The maximum number of items a collection could have.
   *
   *Emits `CollectionMaxSupplySet` event when successful.
   */
  set_collection_max_supply: Anonymize<I6h88h8vba22v8>
  /**
   *Update mint settings.
   *
   *Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
   *of the `collection`.
   *
   *- `collection`: The identifier of the collection to change.
   *- `mint_settings`: The new mint settings.
   *
   *Emits `CollectionMintSettingsUpdated` event when successful.
   */
  update_mint_settings: Anonymize<I1lso3vlgherue>
  /**
   *Set (or reset) the price for an item.
   *
   *Origin must be Signed and must be the owner of the `item`.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item to set the price for.
   *- `price`: The price for the item. Pass `None`, to reset the price.
   *- `buyer`: Restricts the buy operation to a specific account.
   *
   *Emits `ItemPriceSet` on success if the price is not `None`.
   *Emits `ItemPriceRemoved` on success if the price is `None`.
   */
  set_price: Anonymize<Ia9cd4jqb5eecb>
  /**
   *Allows to buy an item if it's up for sale.
   *
   *Origin must be Signed and must not be the owner of the `item`.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item the sender wants to buy.
   *- `bid_price`: The price the sender is willing to pay.
   *
   *Emits `ItemBought` on success.
   */
  buy_item: Anonymize<I19jiel1ftbcce>
  /**
   *Allows to pay the tips.
   *
   *Origin must be Signed.
   *
   *- `tips`: Tips array.
   *
   *Emits `TipSent` on every tip transfer.
   */
  pay_tips: Anonymize<I26c8p47106toa>
  /**
   *Register a new atomic swap, declaring an intention to send an `item` in exchange for
   *`desired_item` from origin to target on the current blockchain.
   *The target can execute the swap during the specified `duration` of blocks (if set).
   *Additionally, the price could be set for the desired `item`.
   *
   *Origin must be Signed and must be an owner of the `item`.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item an owner wants to give.
   *- `desired_collection`: The collection of the desired item.
   *- `desired_item`: The desired item an owner wants to receive.
   *- `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
   *- `duration`: A deadline for the swap. Specified by providing the number of blocks
   *	after which the swap will expire.
   *
   *Emits `SwapCreated` on success.
   */
  create_swap: Anonymize<Iq82b3qvf20ne>
  /**
   *Cancel an atomic swap.
   *
   *Origin must be Signed.
   *Origin must be an owner of the `item` if the deadline hasn't expired.
   *
   *- `collection`: The collection of the item.
   *- `item`: The item an owner wants to give.
   *
   *Emits `SwapCancelled` on success.
   */
  cancel_swap: Anonymize<Ic3j8ku6mbsms4>
  /**
   *Claim an atomic swap.
   *This method executes a pending swap, that was created by a counterpart before.
   *
   *Origin must be Signed and must be an owner of the `item`.
   *
   *- `send_collection`: The collection of the item to be sent.
   *- `send_item`: The item to be sent.
   *- `receive_collection`: The collection of the item to be received.
   *- `receive_item`: The item to be received.
   *- `witness_price`: A price that was previously agreed on.
   *
   *Emits `SwapClaimed` on success.
   */
  claim_swap: Anonymize<I3nvoqsi8f05ph>
  /**
   *Mint an item by providing the pre-signed approval.
   *
   *Origin must be Signed.
   *
   *- `mint_data`: The pre-signed approval that consists of the information about the item,
   *  its metadata, attributes, who can mint it (`None` for anyone) and until what block
   *  number.
   *- `signature`: The signature of the `data` object.
   *- `signer`: The `data` object's signer. Should be an Issuer of the collection.
   *
   *Emits `Issued` on success.
   *Emits `AttributeSet` if the attributes were provided.
   *Emits `ItemMetadataSet` if the metadata was not empty.
   */
  mint_pre_signed: Anonymize<I3eoft5md071do>
  /**
   *Set attributes for an item by providing the pre-signed approval.
   *
   *Origin must be Signed and must be an owner of the `data.item`.
   *
   *- `data`: The pre-signed approval that consists of the information about the item,
   *  attributes to update and until what block number.
   *- `signature`: The signature of the `data` object.
   *- `signer`: The `data` object's signer. Should be an Admin of the collection for the
   *  `CollectionOwner` namespace.
   *
   *Emits `AttributeSet` for each provided attribute.
   *Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.
   *Emits `PreSignedAttributesSet` on success.
   */
  set_attributes_pre_signed: Anonymize<I923eug653ra0o>
}>
export type I43aobns89nbkh = {
  admin: MultiAddress
  config: Anonymize<I72ndo6phms8ik>
}
export type Iamd7rovec1hfb = {
  owner: MultiAddress
  config: Anonymize<I72ndo6phms8ik>
}
export type I77ie723ncd4co = {
  collection: number
  witness: {
    item_metadatas: number
    item_configs: number
    attributes: number
  }
}
export type Ieebloeahma3ke = {
  collection: number
  item: number
  mint_to: MultiAddress
  witness_data?:
    | {
        owned_item?: Anonymize<I4arjljr6dpflb>
        mint_price?: Anonymize<I35p85j063s0il>
      }
    | undefined
}
export type I4mbtpf4pu3rec = {
  collection: number
  item: number
  mint_to: MultiAddress
  item_config: bigint
}
export type I1ahf3pvgsgbu = {
  collection: number
  lock_settings: bigint
}
export type I9uapdn16emsti = {
  collection: number
  issuer?: Anonymize<Ia0jlc0rcbskuk>
  admin?: Anonymize<Ia0jlc0rcbskuk>
  freezer?: Anonymize<Ia0jlc0rcbskuk>
}
export type Ie5i0q2glmr0md = {
  collection: number
  owner: MultiAddress
}
export type I97qcg6i3l8gee = {
  collection: number
  config: Anonymize<I72ndo6phms8ik>
}
export type Ib5udrahak005b = {
  collection: number
  item: number
  delegate: MultiAddress
  maybe_deadline?: Anonymize<I4arjljr6dpflb>
}
export type Ic8b8561e6t9ie = {
  set_as?: Anonymize<Ihfphjolmsqq1>
  collection: number
  maybe_item?: Anonymize<I4arjljr6dpflb>
  namespace: Anonymize<If3jjadhmug6qc>
  key: Binary
  value: Binary
}
export type I6afd7fllr8otc = {
  collection: number
  item: number
  delegate: MultiAddress
  witness: number
}
export type I1lso3vlgherue = {
  collection: number
  mint_settings: Anonymize<Ia3s8qquibn97v>
}
export type I26c8p47106toa = {
  tips: Array<{
    collection: number
    item: number
    receiver: SS58String
    amount: bigint
  }>
}
export type Iq82b3qvf20ne = {
  offered_collection: number
  offered_item: number
  desired_collection: number
  maybe_desired_item?: Anonymize<I4arjljr6dpflb>
  maybe_price?: Anonymize<I6oogc1jbmmi81>
  duration: number
}
export type Ic3j8ku6mbsms4 = {
  offered_collection: number
  offered_item: number
}
export type I3nvoqsi8f05ph = {
  send_collection: number
  send_item: number
  receive_collection: number
  receive_item: number
  witness_price?: Anonymize<I6oogc1jbmmi81>
}
export type I3eoft5md071do = {
  mint_data: {
    collection: number
    item: number
    attributes: Anonymize<I6pi5ou8r1hblk>
    metadata: Binary
    only_account?: Anonymize<Ihfphjolmsqq1>
    deadline: number
    mint_price?: Anonymize<I35p85j063s0il>
  }
  signature: MultiSignature
  signer: SS58String
}
export type I923eug653ra0o = {
  data: {
    collection: number
    item: number
    attributes: Anonymize<I6pi5ou8r1hblk>
    namespace: Anonymize<If3jjadhmug6qc>
    deadline: number
  }
  signature: MultiSignature
  signer: SS58String
}
export type I2clougp67ufee = AnonymousEnum<{
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
  create: Anonymize<I7p44cr9g492tc>
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
  force_create: Anonymize<Ibn8gm2jugarek>
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
   *The asset class must be frozen before calling `start_destroy`.
   */
  start_destroy: Anonymize<Iekg0q69obfi0f>
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
  destroy_accounts: Anonymize<Iekg0q69obfi0f>
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
  destroy_approvals: Anonymize<Iekg0q69obfi0f>
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
  finish_destroy: Anonymize<Iekg0q69obfi0f>
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
  mint: Anonymize<I8dh2oimnihksg>
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
  burn: Anonymize<Ib8mfkapk4u9hs>
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
  transfer: Anonymize<Ikm68gg7akl51>
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
  transfer_keep_alive: Anonymize<Ikm68gg7akl51>
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
  force_transfer: Anonymize<If3csb5ben9n1v>
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
  freeze: Anonymize<If90dk6l9lmtfv>
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
  thaw: Anonymize<If90dk6l9lmtfv>
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
  freeze_asset: Anonymize<Iekg0q69obfi0f>
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
  thaw_asset: Anonymize<Iekg0q69obfi0f>
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
  transfer_ownership: Anonymize<Ifoahm8m43v9q2>
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
  set_team: Anonymize<I1rrgcjpoiot5q>
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
  set_metadata: Anonymize<I2hc61n7o8dso4>
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
  clear_metadata: Anonymize<Iekg0q69obfi0f>
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
  force_set_metadata: Anonymize<I5787kv2d05f94>
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
  force_clear_metadata: Anonymize<Iekg0q69obfi0f>
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
  force_asset_status: Anonymize<Ia8g1imc1kclf4>
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
  approve_transfer: Anonymize<Id26ouo5lt2551>
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
  cancel_approval: Anonymize<Iap1up3prsbtvg>
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
  force_cancel_approval: Anonymize<I8m5mvhifj6pm>
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
  transfer_approved: Anonymize<I8ucc4915s9qvj>
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
  touch: Anonymize<Iekg0q69obfi0f>
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
   *Emits `Refunded` event when successful.
   */
  refund: Anonymize<I1pjcv2ha0997v>
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
  set_min_balance: Anonymize<Ifnm6nai2i47ar>
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
  touch_other: Anonymize<If90dk6l9lmtfv>
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
   *Emits `Refunded` event when successful.
   */
  refund_other: Anonymize<If90dk6l9lmtfv>
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
  block: Anonymize<If90dk6l9lmtfv>
}>
export type I7p44cr9g492tc = {
  id: Anonymize<I4c0s5cioidn76>
  admin: MultiAddress
  min_balance: bigint
}
export type Ibn8gm2jugarek = {
  id: Anonymize<I4c0s5cioidn76>
  owner: MultiAddress
  is_sufficient: boolean
  min_balance: bigint
}
export type Iekg0q69obfi0f = {
  id: Anonymize<I4c0s5cioidn76>
}
export type I8dh2oimnihksg = {
  id: Anonymize<I4c0s5cioidn76>
  beneficiary: MultiAddress
  amount: bigint
}
export type Ib8mfkapk4u9hs = {
  id: Anonymize<I4c0s5cioidn76>
  who: MultiAddress
  amount: bigint
}
export type Ikm68gg7akl51 = {
  id: Anonymize<I4c0s5cioidn76>
  target: MultiAddress
  amount: bigint
}
export type If3csb5ben9n1v = {
  id: Anonymize<I4c0s5cioidn76>
  source: MultiAddress
  dest: MultiAddress
  amount: bigint
}
export type If90dk6l9lmtfv = {
  id: Anonymize<I4c0s5cioidn76>
  who: MultiAddress
}
export type Ifoahm8m43v9q2 = {
  id: Anonymize<I4c0s5cioidn76>
  owner: MultiAddress
}
export type I1rrgcjpoiot5q = {
  id: Anonymize<I4c0s5cioidn76>
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
}
export type I2hc61n7o8dso4 = {
  id: Anonymize<I4c0s5cioidn76>
  name: Binary
  symbol: Binary
  decimals: number
}
export type I5787kv2d05f94 = {
  id: Anonymize<I4c0s5cioidn76>
  name: Binary
  symbol: Binary
  decimals: number
  is_frozen: boolean
}
export type Ia8g1imc1kclf4 = {
  id: Anonymize<I4c0s5cioidn76>
  owner: MultiAddress
  issuer: MultiAddress
  admin: MultiAddress
  freezer: MultiAddress
  min_balance: bigint
  is_sufficient: boolean
  is_frozen: boolean
}
export type Id26ouo5lt2551 = {
  id: Anonymize<I4c0s5cioidn76>
  delegate: MultiAddress
  amount: bigint
}
export type Iap1up3prsbtvg = {
  id: Anonymize<I4c0s5cioidn76>
  delegate: MultiAddress
}
export type I8m5mvhifj6pm = {
  id: Anonymize<I4c0s5cioidn76>
  owner: MultiAddress
  delegate: MultiAddress
}
export type I8ucc4915s9qvj = {
  id: Anonymize<I4c0s5cioidn76>
  owner: MultiAddress
  destination: MultiAddress
  amount: bigint
}
export type I1pjcv2ha0997v = {
  id: Anonymize<I4c0s5cioidn76>
  allow_burn: boolean
}
export type Ifnm6nai2i47ar = {
  id: Anonymize<I4c0s5cioidn76>
  min_balance: bigint
}
export type I9eemk0c7gip8o = AnonymousEnum<{
  /**
   *Creates an empty liquidity pool and an associated new `lp_token` asset
   *(the id of which is returned in the `Event::PoolCreated` event).
   *
   *Once a pool is created, someone may [`Pallet::add_liquidity`] to it.
   */
  create_pool: Anonymize<I8eoqk45hnet27>
  /**
   *Provide liquidity into the pool of `asset1` and `asset2`.
   *NOTE: an optimal amount of asset1 and asset2 will be calculated and
   *might be different than the provided `amount1_desired`/`amount2_desired`
   *thus you should provide the min amount you're happy to provide.
   *Params `amount1_min`/`amount2_min` represent that.
   *`mint_to` will be sent the liquidity tokens that represent this share of the pool.
   *
   *NOTE: when encountering an incorrect exchange rate and non-withdrawable pool liquidity,
   *batch an atomic call with [`Pallet::add_liquidity`] and
   *[`Pallet::swap_exact_tokens_for_tokens`] or [`Pallet::swap_tokens_for_exact_tokens`]
   *calls to render the liquidity withdrawable and rectify the exchange rate.
   *
   *Once liquidity is added, someone may successfully call
   *[`Pallet::swap_exact_tokens_for_tokens`] successfully.
   */
  add_liquidity: Anonymize<Iddvk596rbl31l>
  /**
   *Allows you to remove liquidity by providing the `lp_token_burn` tokens that will be
   *burned in the process. With the usage of `amount1_min_receive`/`amount2_min_receive`
   *it's possible to control the min amount of returned tokens you're happy with.
   */
  remove_liquidity: Anonymize<I3iap9ri572kjf>
  /**
   *Swap the exact amount of `asset1` into `asset2`.
   *`amount_out_min` param allows you to specify the min amount of the `asset2`
   *you're happy to receive.
   *
   *[`AssetConversionApi::quote_price_exact_tokens_for_tokens`] runtime call can be called
   *for a quote.
   */
  swap_exact_tokens_for_tokens: Anonymize<I48iqqqmt2pr38>
  /**
   *Swap any amount of `asset1` to get the exact amount of `asset2`.
   *`amount_in_max` param allows to specify the max amount of the `asset1`
   *you're happy to provide.
   *
   *[`AssetConversionApi::quote_price_tokens_for_exact_tokens`] runtime call can be called
   *for a quote.
   */
  swap_tokens_for_exact_tokens: Anonymize<I90ob4vr51rue4>
  /**
   *Touch an existing pool to fulfill prerequisites before providing liquidity, such as
   *ensuring that the pool's accounts are in place. It is typically useful when a pool
   *creator removes the pool's accounts and does not provide a liquidity. This action may
   *involve holding assets from the caller as a deposit for creating the pool's accounts.
   *
   *The origin must be Signed.
   *
   *- `asset1`: The asset ID of an existing pool with a pair (asset1, asset2).
   *- `asset2`: The asset ID of an existing pool with a pair (asset1, asset2).
   *
   *Emits `Touched` event when successful.
   */
  touch: Anonymize<I8eoqk45hnet27>
}>
export type I8eoqk45hnet27 = {
  asset1: Anonymize<I4c0s5cioidn76>
  asset2: Anonymize<I4c0s5cioidn76>
}
export type Iddvk596rbl31l = {
  asset1: Anonymize<I4c0s5cioidn76>
  asset2: Anonymize<I4c0s5cioidn76>
  amount1_desired: bigint
  amount2_desired: bigint
  amount1_min: bigint
  amount2_min: bigint
  mint_to: SS58String
}
export type I3iap9ri572kjf = {
  asset1: Anonymize<I4c0s5cioidn76>
  asset2: Anonymize<I4c0s5cioidn76>
  lp_token_burn: bigint
  amount1_min_receive: bigint
  amount2_min_receive: bigint
  withdraw_to: SS58String
}
export type I48iqqqmt2pr38 = {
  path: Anonymize<Ia88a8r9e89e2p>
  amount_in: bigint
  amount_out_min: bigint
  send_to: SS58String
  keep_alive: boolean
}
export type Ia88a8r9e89e2p = Array<Anonymize<I4c0s5cioidn76>>
export type I90ob4vr51rue4 = {
  path: Anonymize<Ia88a8r9e89e2p>
  amount_out: bigint
  amount_in_max: bigint
  send_to: SS58String
  keep_alive: boolean
}
export type I8pll4amlg6pps = AnonymousEnum<{
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   */
  sudo: Anonymize<I1upc9064fdsne>
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   *This function does not check the weight of the call, and instead allows the
   *Sudo user to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_unchecked_weight: Anonymize<Idd3pmare7cfmb>
  /**
   *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
   *key.
   */
  set_key: Anonymize<I8k3rnvpeeh4hv>
  /**
   *Authenticates the sudo key and dispatches a function call with `Signed` origin from
   *a given account.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_as: Anonymize<Iebffjs9r0dqo4>
  /**
   *Permanently removes the sudo key.
   *
   ***This cannot be un-done.**
   */
  remove_key: undefined
}>
export type I1upc9064fdsne = {
  call: TxCallData
}
export type Iebffjs9r0dqo4 = {
  who: MultiAddress
  call: TxCallData
}
export type I7l4uu3dsbji = ResultPayload<Anonymize<I72g50ec7tste6>, TransactionValidityError>
export type Ibbsf5u46f61r4 = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  ParachainSystem: Anonymize<I3jmip7qjlcqot>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  ParachainInfo: undefined
  Balances: Anonymize<I9svldsp29mh87>
  Vesting: Anonymize<Icgf8vmtkbnu4u>
  CollatorSelection: Anonymize<I9dpq5287dur8b>
  Session: Anonymize<I77dda7hps0u37>
  XcmpQueue: Anonymize<Ib7tahn20bvsep>
  PolkadotXcm: Anonymize<I9nbjvlrb9bp1g>
  CumulusXcm: undefined
  ToKusamaXcmRouter: Anonymize<I6epb28bkd5aqn>
  MessageQueue: Anonymize<Ic2uoe7jdksosp>
  Utility: Anonymize<I6klbk16est7ri>
  Multisig: Anonymize<Ic5rdiqm6spalv>
  Proxy: Anonymize<I9bckvt4ge4t1v>
  Assets: Anonymize<Ideusanoto4b1j>
  Uniques: Anonymize<Icu49uv7rfej74>
  Nfts: Anonymize<I1k4il7i5elhc7>
  ForeignAssets: Anonymize<I2clougp67ufee>
  PoolAssets: Anonymize<Ideusanoto4b1j>
  AssetConversion: Anonymize<I9eemk0c7gip8o>
  Sudo: Anonymize<I8pll4amlg6pps>
}>
export type Ic4l4p5329mqka = ResultPayload<
  {
    execution_result: ResultPayload<
      Anonymize<Ia1u1r3n74r13c>,
      {
        post_info: Anonymize<Ia1u1r3n74r13c>
        error: Anonymize<Id1b6jh4cusamh>
      }
    >
    emitted_events: Anonymize<I2jj85brfrm4p2>
    local_xcm?: Anonymize<I3i0ce56p044d2>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I2jj85brfrm4p2 = Array<Anonymize<Id5ug5m0fg64gg>>
export type I28cpqn91oi3ns = ResultPayload<
  {
    execution_result: XcmV4TraitsOutcome
    emitted_events: Anonymize<I2jj85brfrm4p2>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I93k1anhb5gs2q = ResultPayload<
  PaseoXcmVersionedAssets,
  Enum<{
    AssetIdConversionFailed: undefined
    AmountToBalanceConversionFailed: undefined
  }>
>
export type I5vv5n03oo8gas = Anonymize<I200n1ov5tbcvr> | undefined
export type I8vp3ucscuqg86 = Array<{
  phase: Phase
  event: Anonymize<I6i56ns3hnf864>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type I6i56ns3hnf864 = AnonymousEnum<{
  System: Anonymize<Ibtc914i8vkb9c>
  ParachainSystem: Anonymize<Icbsekf57miplo>
  Balances: Anonymize<Iao8h4hv7atnq3>
  TransactionPayment: TransactionPaymentEvent
  AssetTxPayment: Anonymize<Ifagg2q2o5fgjl>
  Vesting: VestingEvent
  CollatorSelection: Anonymize<I4srakrmf0fspo>
  Session: SessionEvent
  XcmpQueue: Anonymize<Idsqc7mhp6nnle>
  PolkadotXcm: Anonymize<I5ce1ru810vv9d>
  CumulusXcm: Anonymize<Ibvp9t1gqae5ct>
  ToKusamaXcmRouter: Anonymize<Ift4p4jnj5bri1>
  MessageQueue: Anonymize<I2kosejppk3jon>
  Utility: Anonymize<Ids8tm3fmsni8t>
  Multisig: Anonymize<I46lloumhk0kag>
  Proxy: Anonymize<Ici8p4rq6ahbpj>
  Assets: Anonymize<I6avancvg8fd05>
  Uniques: Anonymize<Ia0j71vjrjqu9p>
  Nfts: Anonymize<I6qicn8jn4fftj>
  ForeignAssets: Anonymize<I81i2fkdo6nple>
  PoolAssets: Anonymize<I6avancvg8fd05>
  AssetConversion: Anonymize<I31lqq0fjfmnfv>
  StateTrieMigration: Anonymize<I61dksvl51aujo>
}>
export type Ibtc914i8vkb9c = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<I7g72pd5e26jk0>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
}>
export type I7g72pd5e26jk0 = {
  dispatch_error: Anonymize<Ici671kun64gm5>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type Ici671kun64gm5 = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    ParachainSystem: Anonymize<I9p95gln24a0rn>
    Timestamp: undefined
    ParachainInfo: undefined
    Balances: Anonymize<Idj13i7adlomht>
    TransactionPayment: undefined
    AssetTxPayment: undefined
    Vesting: Anonymize<Icof2acl69lq3c>
    Authorship: undefined
    CollatorSelection: Anonymize<I36bcffk2387dv>
    Session: Anonymize<I1e07dgbaqd1sq>
    Aura: undefined
    AuraExt: undefined
    XcmpQueue: Anonymize<Idnnbndsjjeqqs>
    PolkadotXcm: Anonymize<I87j95aq93d7dq>
    CumulusXcm: undefined
    ToKusamaXcmRouter: undefined
    MessageQueue: Anonymize<I5iupade5ag2dp>
    Utility: Anonymize<I8dt2g2hcrgh36>
    Multisig: Anonymize<Ia76qmhhg4jvb9>
    Proxy: Anonymize<Iuvt54ei4cehc>
    Assets: Anonymize<Iapedqb0veh71>
    Uniques: Anonymize<Ienq2ge2rhv4jm>
    Nfts: Anonymize<I58r1150kmj18u>
    ForeignAssets: Anonymize<Iapedqb0veh71>
    PoolAssets: Anonymize<Iapedqb0veh71>
    AssetConversion: Anonymize<I4u78hb23uhvi2>
    StateTrieMigration: Anonymize<I96objte63brjr>
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
}>
export type Ift4p4jnj5bri1 = AnonymousEnum<{
  /**
   *Delivery fee factor has been decreased.
   */
  DeliveryFeeFactorDecreased: Anonymize<Ie8hpsm3jhsvo3>
  /**
   *Delivery fee factor has been increased.
   */
  DeliveryFeeFactorIncreased: Anonymize<Ie8hpsm3jhsvo3>
}>
export type Ie8hpsm3jhsvo3 = {
  /**
   *New value of the `DeliveryFeeFactor`.
   */
  new_value: bigint
}
export type Ids8tm3fmsni8t = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<Ifqbis6nqo7ebb>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<I19gn0eidsg4mb>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<I7kun49uv35bgq>
}>
export type Ifqbis6nqo7ebb = {
  index: number
  error: Anonymize<Ici671kun64gm5>
}
export type I19gn0eidsg4mb = {
  error: Anonymize<Ici671kun64gm5>
}
export type I7kun49uv35bgq = {
  result: Anonymize<I5i2d0ndlj3qas>
}
export type I5i2d0ndlj3qas = ResultPayload<undefined, Anonymize<Ici671kun64gm5>>
export type I46lloumhk0kag = AnonymousEnum<{
  /**
   *A new multisig operation has begun.
   */
  NewMultisig: Anonymize<Iep27ialq4a7o7>
  /**
   *A multisig operation has been approved by someone.
   */
  MultisigApproval: Anonymize<Iasu5jvoqr43mv>
  /**
   *A multisig operation has been executed.
   */
  MultisigExecuted: Anonymize<If35js3cp0m9nh>
  /**
   *A multisig operation has been cancelled.
   */
  MultisigCancelled: Anonymize<I5qolde99acmd1>
}>
export type If35js3cp0m9nh = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I5i2d0ndlj3qas>
}
export type Ici8p4rq6ahbpj = AnonymousEnum<{
  /**
   *A proxy was executed correctly, with the given.
   */
  ProxyExecuted: Anonymize<I7kun49uv35bgq>
  /**
   *A pure account has been created by new proxy with given
   *disambiguation index and proxy type.
   */
  PureCreated: Anonymize<Ie7cuj84ohvg56>
  /**
   *An announcement was placed to make a call in the future.
   */
  Announced: Anonymize<I2ur0oeqg495j8>
  /**
   *A proxy was added.
   */
  ProxyAdded: Anonymize<I8ioopvokvl3ud>
  /**
   *A proxy was removed.
   */
  ProxyRemoved: Anonymize<I8ioopvokvl3ud>
}>
export type Ibjr62thfhmen3 = Array<{
  id: Enum<{
    StateTrieMigration: Anonymize<I7lf1val3vmpq0>
  }>
  amount: bigint
}>
export type I5kev21p7u6ajb = AnonymousEnum<{
  /**
   *Set the current validation data.
   *
   *This should be invoked exactly once per block. It will panic at the finalization
   *phase if the call was not invoked.
   *
   *The dispatch origin for this call must be `Inherent`
   *
   *As a side effect, this function upgrades the current validation function
   *if the appropriate time has come.
   */
  set_validation_data: Anonymize<I60v7bikk54tpu>
  sudo_send_upward_message: Anonymize<Ifpj261e8s63m3>
}>
export type I62h6k8dkucj33 = AnonymousEnum<{
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
  batch: Anonymize<I3g7j9h7jht691>
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
  as_derivative: Anonymize<Iar8b84jas6g1>
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
  batch_all: Anonymize<I3g7j9h7jht691>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<I9cg6e96hjjme2>
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
  force_batch: Anonymize<I3g7j9h7jht691>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<I97jqcgk4bcg3n>
}>
export type I3g7j9h7jht691 = {
  calls: Array<TxCallData>
}
export type Iar8b84jas6g1 = {
  index: number
  call: TxCallData
}
export type I9cg6e96hjjme2 = {
  as_origin: Anonymize<I48v5riethqckl>
  call: TxCallData
}
export type I97jqcgk4bcg3n = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type I91edsd5tnhod7 = AnonymousEnum<{
  /**
   *Immediately dispatch a multi-signature call using a single approval from the caller.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `other_signatories`: The accounts (other than the sender) who are part of the
   *multi-signature, but do not participate in the approval process.
   *- `call`: The call to be executed.
   *
   *Result is equivalent to the dispatched result.
   *
   *## Complexity
   *O(Z + C) where Z is the length of the call and C its execution weight.
   */
  as_multi_threshold_1: Anonymize<I9p3t2kcp8f20j>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *If there are enough, then dispatch the call.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call`: The call to be executed.
   *
   *NOTE: Unless this is the final approval, you will generally want to use
   *`approve_as_multi` instead, since it only requires a hash of the call.
   *
   *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *on success, result is `Ok` and the result from the interior call, if it was executed,
   *may be found in the deposited `MultisigExecuted` event.
   *
   *## Complexity
   *- `O(S + Z + Call)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- The weight of the `call`.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  as_multi: Anonymize<I4mqa3vatnn2lb>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call_hash`: The hash of the call to be executed.
   *
   *NOTE: If this is the final approval, you will want to use `as_multi` instead.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  approve_as_multi: Anonymize<Ideaemvoneh309>
  /**
   *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
   *for this operation will be unreserved on success.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `timepoint`: The timepoint (block number and transaction index) of the first approval
   *transaction for this dispatch.
   *- `call_hash`: The hash of the call to be executed.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- One event.
   *- I/O: 1 read `O(S)`, one remove.
   *- Storage: removes one item.
   */
  cancel_as_multi: Anonymize<I3d9o9d7epp66v>
}>
export type I9p3t2kcp8f20j = {
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  call: TxCallData
}
export type I4mqa3vatnn2lb = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call: TxCallData
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type Id7gvb9s4gkn3d = AnonymousEnum<{
  /**
   *Dispatch the given `call` from an account that the sender is authorised for through
   *`add_proxy`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy: Anonymize<Icu9npfap4elaq>
  /**
   *Register a proxy account for the sender that is able to make calls on its behalf.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to make a proxy.
   *- `proxy_type`: The permissions allowed for this proxy account.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   */
  add_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister a proxy account for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to remove as a proxy.
   *- `proxy_type`: The permissions currently enabled for the removed proxy account.
   */
  remove_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister all proxy accounts for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *WARNING: This may be called on accounts created by `pure`, however if done, then
   *the unreserved fees will be inaccessible. **All access to this account will be lost.**
   */
  remove_proxies: undefined
  /**
   *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
   *initialize it with a proxy of `proxy_type` for `origin` sender.
   *
   *Requires a `Signed` origin.
   *
   *- `proxy_type`: The type of the proxy that the sender will be registered as over the
   *new account. This will almost always be the most permissive `ProxyType` possible to
   *allow for maximum flexibility.
   *- `index`: A disambiguation index, in case this is called multiple times in the same
   *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
   *want to use `0`.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   *
   *Fails with `Duplicate` if this has already been called in this transaction, from the
   *same sender, with the same parameters.
   *
   *Fails if there are insufficient funds to pay for deposit.
   */
  create_pure: Anonymize<Iefr8jgtgfk8um>
  /**
   *Removes a previously spawned pure proxy.
   *
   *WARNING: **All access to this account will be lost.** Any funds held in it will be
   *inaccessible.
   *
   *Requires a `Signed` origin, and the sender account must have been created by a call to
   *`pure` with corresponding parameters.
   *
   *- `spawner`: The account that originally called `pure` to create this account.
   *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
   *- `proxy_type`: The proxy type originally passed to `pure`.
   *- `height`: The height of the chain when the call to `pure` was processed.
   *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
   *
   *Fails with `NoPermission` in case the caller is not a previously created pure
   *account whose `pure` call has corresponding parameters.
   */
  kill_pure: Anonymize<I3j05hul54uj7q>
  /**
   *Publish the hash of a proxy-call that will be made in the future.
   *
   *This must be called some number of blocks before the corresponding `proxy` is attempted
   *if the delay associated with the proxy relationship is greater than zero.
   *
   *No more than `MaxPending` announcements may be made at any one time.
   *
   *This will take a deposit of `AnnouncementDepositFactor` as well as
   *`AnnouncementDepositBase` if there are no other pending announcements.
   *
   *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  announce: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove a given announcement.
   *
   *May be called by a proxy account to remove a call they previously announced and return
   *the deposit.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  remove_announcement: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove the given announcement of a delegate.
   *
   *May be called by a target (proxied) account to remove a call that one of their delegates
   *(`delegate`) has announced they want to execute. The deposit is returned.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `delegate`: The account that previously announced the call.
   *- `call_hash`: The hash of the call to be made.
   */
  reject_announcement: Anonymize<Ianmuoljk2sk1u>
  /**
   *Dispatch the given `call` from an account that the sender is authorized for through
   *`add_proxy`.
   *
   *Removes any corresponding announcement(s).
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy_announced: Anonymize<I4fbn1vad0gvp8>
}>
export type Icu9npfap4elaq = {
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type I4fbn1vad0gvp8 = {
  delegate: MultiAddress
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type I84851acvod2ic = AnonymousEnum<{
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
  create: Anonymize<Ic357tcepuvo5c>
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
  force_create: Anonymize<I2rnoam876ruhj>
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
   */
  start_destroy: Anonymize<Ic5b47dj4coa3r>
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
  destroy_accounts: Anonymize<Ic5b47dj4coa3r>
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
  destroy_approvals: Anonymize<Ic5b47dj4coa3r>
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
  finish_destroy: Anonymize<Ic5b47dj4coa3r>
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
  mint: Anonymize<Ib3qnc19gu633c>
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
  burn: Anonymize<Ifira6u9hi7cu1>
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
  transfer: Anonymize<I72tqocvdoqfff>
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
  transfer_keep_alive: Anonymize<I72tqocvdoqfff>
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
  force_transfer: Anonymize<I2i27f3sfmvc05>
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
  freeze: Anonymize<I1nlrtd1epki2d>
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
  thaw: Anonymize<I1nlrtd1epki2d>
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
  freeze_asset: Anonymize<Ic5b47dj4coa3r>
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
  thaw_asset: Anonymize<Ic5b47dj4coa3r>
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
  transfer_ownership: Anonymize<I3abtumcmempjs>
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
  set_team: Anonymize<Id81m8flopt8ha>
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
  set_metadata: Anonymize<I8hff7chabggkd>
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
  clear_metadata: Anonymize<Ic5b47dj4coa3r>
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
  force_set_metadata: Anonymize<I49i39mtj1ivbs>
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
  force_clear_metadata: Anonymize<Ic5b47dj4coa3r>
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
  force_asset_status: Anonymize<Ifkr2kcak2vto1>
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
  approve_transfer: Anonymize<I1ju6r8q0cs9jt>
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
  cancel_approval: Anonymize<I4kpeq6j7cd5bu>
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
  force_cancel_approval: Anonymize<I5na1ka76k6811>
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
  transfer_approved: Anonymize<I59mhdb9omdqfa>
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
  touch: Anonymize<Ic5b47dj4coa3r>
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
   *Emits `Refunded` event when successful.
   */
  refund: Anonymize<I9vl5kpk0fpakt>
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
  set_min_balance: Anonymize<I717jt61hu19b4>
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
  touch_other: Anonymize<I1nlrtd1epki2d>
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
   *Emits `Refunded` event when successful.
   */
  refund_other: Anonymize<I1nlrtd1epki2d>
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
  block: Anonymize<I1nlrtd1epki2d>
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
  transfer_all: Anonymize<I7f7v8192r1lmq>
}>
export type I7f7v8192r1lmq = {
  id: number
  dest: MultiAddress
  keep_alive: boolean
}
export type I8ktel4pq9nbjk = AnonymousEnum<{
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
  create: Anonymize<I7p44cr9g492tc>
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
  force_create: Anonymize<Ibn8gm2jugarek>
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
   */
  start_destroy: Anonymize<Iekg0q69obfi0f>
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
  destroy_accounts: Anonymize<Iekg0q69obfi0f>
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
  destroy_approvals: Anonymize<Iekg0q69obfi0f>
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
  finish_destroy: Anonymize<Iekg0q69obfi0f>
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
  mint: Anonymize<I8dh2oimnihksg>
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
  burn: Anonymize<Ib8mfkapk4u9hs>
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
  transfer: Anonymize<Ikm68gg7akl51>
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
  transfer_keep_alive: Anonymize<Ikm68gg7akl51>
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
  force_transfer: Anonymize<If3csb5ben9n1v>
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
  freeze: Anonymize<If90dk6l9lmtfv>
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
  thaw: Anonymize<If90dk6l9lmtfv>
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
  freeze_asset: Anonymize<Iekg0q69obfi0f>
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
  thaw_asset: Anonymize<Iekg0q69obfi0f>
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
  transfer_ownership: Anonymize<Ifoahm8m43v9q2>
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
  set_team: Anonymize<I1rrgcjpoiot5q>
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
  set_metadata: Anonymize<I2hc61n7o8dso4>
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
  clear_metadata: Anonymize<Iekg0q69obfi0f>
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
  force_set_metadata: Anonymize<I5787kv2d05f94>
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
  force_clear_metadata: Anonymize<Iekg0q69obfi0f>
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
  force_asset_status: Anonymize<Ia8g1imc1kclf4>
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
  approve_transfer: Anonymize<Id26ouo5lt2551>
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
  cancel_approval: Anonymize<Iap1up3prsbtvg>
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
  force_cancel_approval: Anonymize<I8m5mvhifj6pm>
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
  transfer_approved: Anonymize<I8ucc4915s9qvj>
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
  touch: Anonymize<Iekg0q69obfi0f>
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
   *Emits `Refunded` event when successful.
   */
  refund: Anonymize<I1pjcv2ha0997v>
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
  set_min_balance: Anonymize<Ifnm6nai2i47ar>
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
  touch_other: Anonymize<If90dk6l9lmtfv>
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
   *Emits `Refunded` event when successful.
   */
  refund_other: Anonymize<If90dk6l9lmtfv>
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
  block: Anonymize<If90dk6l9lmtfv>
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
  transfer_all: Anonymize<Ic6a3rlcsqmjnp>
}>
export type Ic6a3rlcsqmjnp = {
  id: Anonymize<I4c0s5cioidn76>
  dest: MultiAddress
  keep_alive: boolean
}
export type I1efgsn6u9dfti = ResultPayload<Anonymize<I5i2d0ndlj3qas>, TransactionValidityError>
export type Ib38e3m2bhrav3 = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  ParachainSystem: Anonymize<I5kev21p7u6ajb>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  ParachainInfo: undefined
  Balances: Anonymize<I9svldsp29mh87>
  Vesting: Anonymize<Icgf8vmtkbnu4u>
  CollatorSelection: Anonymize<I9dpq5287dur8b>
  Session: Anonymize<I77dda7hps0u37>
  XcmpQueue: Anonymize<Ib7tahn20bvsep>
  PolkadotXcm: Anonymize<I9nbjvlrb9bp1g>
  CumulusXcm: undefined
  ToKusamaXcmRouter: Anonymize<I6epb28bkd5aqn>
  MessageQueue: Anonymize<Ic2uoe7jdksosp>
  Utility: Anonymize<I62h6k8dkucj33>
  Multisig: Anonymize<I91edsd5tnhod7>
  Proxy: Anonymize<Id7gvb9s4gkn3d>
  Assets: Anonymize<I84851acvod2ic>
  Uniques: Anonymize<Icu49uv7rfej74>
  Nfts: Anonymize<I1k4il7i5elhc7>
  ForeignAssets: Anonymize<I8ktel4pq9nbjk>
  PoolAssets: Anonymize<I84851acvod2ic>
  AssetConversion: Anonymize<I9eemk0c7gip8o>
  StateTrieMigration: Anonymize<I39l72gdmkk30t>
}>
export type I5mpf9ieem1p8b = ResultPayload<
  {
    execution_result: ResultPayload<
      Anonymize<Ia1u1r3n74r13c>,
      {
        post_info: Anonymize<Ia1u1r3n74r13c>
        error: Anonymize<Ici671kun64gm5>
      }
    >
    emitted_events: Anonymize<I8tvftgoosgqm3>
    local_xcm?: Anonymize<I3i0ce56p044d2>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I8tvftgoosgqm3 = Array<Anonymize<I6i56ns3hnf864>>
export type Iceqok2pmntdsu = ResultPayload<
  {
    execution_result: XcmV4TraitsOutcome
    emitted_events: Anonymize<I8tvftgoosgqm3>
    forwarded_xcms: Anonymize<I47tkk5e5nm6g7>
  },
  Anonymize<I55ku9c5gk50hb>
>
export type I2jgn7040prr3d = Array<{
  phase: Phase
  event: Enum<{
    System: Anonymize<Iablbnhsmi9hkd>
    ParachainSystem: Anonymize<Icbsekf57miplo>
    Balances: Anonymize<Iao8h4hv7atnq3>
    TransactionPayment: TransactionPaymentEvent
    Treasury: Anonymize<I3kfo09eqm1214>
    Sudo: Anonymize<If1rj3ppu5aead>
    Council: Anonymize<Ijd8ecn634s41>
    Motion: Anonymize<I94k3fbi8ct9r8>
    CollatorSelection: Anonymize<I4srakrmf0fspo>
    Session: SessionEvent
    Scheduler: Anonymize<I9fr19934dl4ub>
    Preimage: PreimageEvent
    XcmpQueue: Anonymize<Idsqc7mhp6nnle>
    PolkadotXcm: Anonymize<Iel5f66clbekc3>
    CumulusXcm: Anonymize<Ihpdgvt7vs2cb>
    MessageQueue: Anonymize<I2kosejppk3jon>
    Ismp: Anonymize<Ievgparagrf8s9>
    IsmpParachain: Anonymize<Ie6qh3o3afje2f>
    Contracts: Anonymize<I211sbjvh5hjqu>
    Proxy: Anonymize<Ic51o0fgloeigd>
    Multisig: Anonymize<Ic60mbude2lnbo>
    Utility: Anonymize<Iarcv79cv39slr>
    Nfts: Anonymize<I6qicn8jn4fftj>
    NftFractionalization: Anonymize<I41s7j0hsp2u0b>
    Assets: Anonymize<I6avancvg8fd05>
    Revive: Anonymize<I1jo9ctv03grf7>
    Fungibles: Anonymize<I2158jcepe2iig>
    Messaging: Anonymize<I7d8ds7nir5quj>
  }>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type Iablbnhsmi9hkd = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<I77bka8ftqacuq>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
}>
export type I77bka8ftqacuq = {
  dispatch_error: Anonymize<I9j620s5v5l35m>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type I9j620s5v5l35m = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    ParachainSystem: Anonymize<I9p95gln24a0rn>
    Timestamp: undefined
    ParachainInfo: undefined
    Balances: Anonymize<Idj13i7adlomht>
    TransactionPayment: undefined
    Treasury: Anonymize<I36uss0m9fpcsf>
    Sudo: Anonymize<Iaug04qjhbli00>
    Council: Anonymize<I7n7mcmnnfjfl2>
    Motion: undefined
    Authorship: undefined
    CollatorSelection: Anonymize<I36bcffk2387dv>
    Session: Anonymize<I1e07dgbaqd1sq>
    Aura: undefined
    AuraExt: undefined
    Scheduler: Anonymize<If7oa8fprnilo5>
    Preimage: Anonymize<I4cfhml1prt4lu>
    XcmpQueue: Anonymize<Idnnbndsjjeqqs>
    PolkadotXcm: Anonymize<I87j95aq93d7dq>
    CumulusXcm: undefined
    MessageQueue: Anonymize<I5iupade5ag2dp>
    Ismp: Anonymize<Iu66k013uv34p>
    IsmpParachain: undefined
    Contracts: Anonymize<I2489g9rnboo1t>
    Proxy: Anonymize<Iuvt54ei4cehc>
    Multisig: Anonymize<Ia76qmhhg4jvb9>
    Utility: Anonymize<I8dt2g2hcrgh36>
    Nfts: Anonymize<I58r1150kmj18u>
    NftFractionalization: Anonymize<Ib24bvufha821j>
    Assets: Anonymize<Iapedqb0veh71>
    Revive: Anonymize<Ifa8vgdbjdkof7>
    Fungibles: undefined
    Messaging: Anonymize<Idobm8kis57q7d>
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
  Trie: Anonymize<Idh4cj79bvroj8>
}>
export type I7n7mcmnnfjfl2 = AnonymousEnum<{
  /**
   *Account is not a member
   */
  NotMember: undefined
  /**
   *Duplicate proposals not allowed
   */
  DuplicateProposal: undefined
  /**
   *Proposal must exist
   */
  ProposalMissing: undefined
  /**
   *Mismatched index
   */
  WrongIndex: undefined
  /**
   *Duplicate vote ignored
   */
  DuplicateVote: undefined
  /**
   *Members are already initialized!
   */
  AlreadyInitialized: undefined
  /**
   *The close call was made too early, before the end of the voting.
   */
  TooEarly: undefined
  /**
   *There can only be a maximum of `MaxProposals` active proposals.
   */
  TooManyProposals: undefined
  /**
   *The given weight bound for the proposal was too low.
   */
  WrongProposalWeight: undefined
  /**
   *The given length bound for the proposal was too low.
   */
  WrongProposalLength: undefined
  /**
   *Prime account is not a member
   */
  PrimeAccountNotMember: undefined
  /**
   *Proposal is still active.
   */
  ProposalActive: undefined
}>
export type Iu66k013uv34p = AnonymousEnum<{
  /**
   *Invalid ISMP message
   */
  InvalidMessage: undefined
  /**
   *Requested message was not found
   */
  MessageNotFound: undefined
  /**
   *Encountered an error while creating the consensus client.
   */
  ConsensusClientCreationFailed: undefined
  /**
   *Couldn't update unbonding period
   */
  UnbondingPeriodUpdateFailed: undefined
  /**
   *Couldn't update challenge period
   */
  ChallengePeriodUpdateFailed: undefined
}>
export type I2489g9rnboo1t = AnonymousEnum<{
  /**
   *Invalid schedule supplied, e.g. with zero weight of a basic operation.
   */
  InvalidSchedule: undefined
  /**
   *Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
   */
  InvalidCallFlags: undefined
  /**
   *The executed contract exhausted its gas limit.
   */
  OutOfGas: undefined
  /**
   *The output buffer supplied to a contract API call was too small.
   */
  OutputBufferTooSmall: undefined
  /**
   *Performing the requested transfer failed. Probably because there isn't enough
   *free balance in the sender's account.
   */
  TransferFailed: undefined
  /**
   *Performing a call was denied because the calling depth reached the limit
   *of what is specified in the schedule.
   */
  MaxCallDepthReached: undefined
  /**
   *No contract was found at the specified address.
   */
  ContractNotFound: undefined
  /**
   *The code supplied to `instantiate_with_code` exceeds the limit specified in the
   *current schedule.
   */
  CodeTooLarge: undefined
  /**
   *No code could be found at the supplied code hash.
   */
  CodeNotFound: undefined
  /**
   *No code info could be found at the supplied code hash.
   */
  CodeInfoNotFound: undefined
  /**
   *A buffer outside of sandbox memory was passed to a contract API function.
   */
  OutOfBounds: undefined
  /**
   *Input passed to a contract API function failed to decode as expected type.
   */
  DecodingFailed: undefined
  /**
   *Contract trapped during execution.
   */
  ContractTrapped: undefined
  /**
   *The size defined in `T::MaxValueSize` was exceeded.
   */
  ValueTooLarge: undefined
  /**
   *Termination of a contract is not allowed while the contract is already
   *on the call stack. Can be triggered by `seal_terminate`.
   */
  TerminatedWhileReentrant: undefined
  /**
   *`seal_call` forwarded this contracts input. It therefore is no longer available.
   */
  InputForwarded: undefined
  /**
   *The subject passed to `seal_random` exceeds the limit.
   */
  RandomSubjectTooLong: undefined
  /**
   *The amount of topics passed to `seal_deposit_events` exceeds the limit.
   */
  TooManyTopics: undefined
  /**
   *The chain does not provide a chain extension. Calling the chain extension results
   *in this error. Note that this usually  shouldn't happen as deploying such contracts
   *is rejected.
   */
  NoChainExtension: undefined
  /**
   *Failed to decode the XCM program.
   */
  XCMDecodeFailed: undefined
  /**
   *A contract with the same AccountId already exists.
   */
  DuplicateContract: undefined
  /**
   *A contract self destructed in its constructor.
   *
   *This can be triggered by a call to `seal_terminate`.
   */
  TerminatedInConstructor: undefined
  /**
   *A call tried to invoke a contract that is flagged as non-reentrant.
   *The only other cause is that a call from a contract into the runtime tried to call back
   *into `pallet-contracts`. This would make the whole pallet reentrant with regard to
   *contract code execution which is not supported.
   */
  ReentranceDenied: undefined
  /**
   *A contract attempted to invoke a state modifying API while being in read-only mode.
   */
  StateChangeDenied: undefined
  /**
   *Origin doesn't have enough balance to pay the required storage deposits.
   */
  StorageDepositNotEnoughFunds: undefined
  /**
   *More storage was created than allowed by the storage deposit limit.
   */
  StorageDepositLimitExhausted: undefined
  /**
   *Code removal was denied because the code is still in use by at least one contract.
   */
  CodeInUse: undefined
  /**
   *The contract ran to completion but decided to revert its storage changes.
   *Please note that this error is only returned from extrinsics. When called directly
   *or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
   *to determine whether a reversion has taken place.
   */
  ContractReverted: undefined
  /**
   *The contract's code was found to be invalid during validation.
   *
   *The most likely cause of this is that an API was used which is not supported by the
   *node. This happens if an older node is used with a new version of ink!. Try updating
   *your node to the newest available version.
   *
   *A more detailed error can be found on the node console if debug messages are enabled
   *by supplying `-lruntime::contracts=debug`.
   */
  CodeRejected: undefined
  /**
   *An indeterministic code was used in a context where this is not permitted.
   */
  Indeterministic: undefined
  /**
   *A pending migration needs to complete before the extrinsic can be called.
   */
  MigrationInProgress: undefined
  /**
   *Migrate dispatch call was attempted but no migration was performed.
   */
  NoMigrationPerformed: undefined
  /**
   *The contract has reached its maximum number of delegate dependencies.
   */
  MaxDelegateDependenciesReached: undefined
  /**
   *The dependency was not found in the contract's delegate dependencies.
   */
  DelegateDependencyNotFound: undefined
  /**
   *The contract already depends on the given delegate dependency.
   */
  DelegateDependencyAlreadyExists: undefined
  /**
   *Can not add a delegate dependency to the code hash of the contract itself.
   */
  CannotAddSelfAsDelegateDependency: undefined
  /**
   *Can not add more data to transient storage.
   */
  OutOfTransientStorage: undefined
}>
export type Ib24bvufha821j = AnonymousEnum<{
  /**
   *Asset ID does not correspond to locked NFT.
   */
  IncorrectAssetId: undefined
  /**
   *The signing account has no permission to do the operation.
   */
  NoPermission: undefined
  /**
   *NFT doesn't exist.
   */
  NftNotFound: undefined
  /**
   *NFT has not yet been fractionalised.
   */
  NftNotFractionalized: undefined
}>
export type Ifa8vgdbjdkof7 = AnonymousEnum<{
  /**
   *Invalid schedule supplied, e.g. with zero weight of a basic operation.
   */
  InvalidSchedule: undefined
  /**
   *Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
   */
  InvalidCallFlags: undefined
  /**
   *The executed contract exhausted its gas limit.
   */
  OutOfGas: undefined
  /**
   *Performing the requested transfer failed. Probably because there isn't enough
   *free balance in the sender's account.
   */
  TransferFailed: undefined
  /**
   *Performing a call was denied because the calling depth reached the limit
   *of what is specified in the schedule.
   */
  MaxCallDepthReached: undefined
  /**
   *No contract was found at the specified address.
   */
  ContractNotFound: undefined
  /**
   *No code could be found at the supplied code hash.
   */
  CodeNotFound: undefined
  /**
   *No code info could be found at the supplied code hash.
   */
  CodeInfoNotFound: undefined
  /**
   *A buffer outside of sandbox memory was passed to a contract API function.
   */
  OutOfBounds: undefined
  /**
   *Input passed to a contract API function failed to decode as expected type.
   */
  DecodingFailed: undefined
  /**
   *Contract trapped during execution.
   */
  ContractTrapped: undefined
  /**
   *The size defined in `T::MaxValueSize` was exceeded.
   */
  ValueTooLarge: undefined
  /**
   *Termination of a contract is not allowed while the contract is already
   *on the call stack. Can be triggered by `seal_terminate`.
   */
  TerminatedWhileReentrant: undefined
  /**
   *`seal_call` forwarded this contracts input. It therefore is no longer available.
   */
  InputForwarded: undefined
  /**
   *The amount of topics passed to `seal_deposit_events` exceeds the limit.
   */
  TooManyTopics: undefined
  /**
   *The chain does not provide a chain extension. Calling the chain extension results
   *in this error. Note that this usually  shouldn't happen as deploying such contracts
   *is rejected.
   */
  NoChainExtension: undefined
  /**
   *Failed to decode the XCM program.
   */
  XCMDecodeFailed: undefined
  /**
   *A contract with the same AccountId already exists.
   */
  DuplicateContract: undefined
  /**
   *A contract self destructed in its constructor.
   *
   *This can be triggered by a call to `seal_terminate`.
   */
  TerminatedInConstructor: undefined
  /**
   *A call tried to invoke a contract that is flagged as non-reentrant.
   */
  ReentranceDenied: undefined
  /**
   *A contract called into the runtime which then called back into this pallet.
   */
  ReenteredPallet: undefined
  /**
   *A contract attempted to invoke a state modifying API while being in read-only mode.
   */
  StateChangeDenied: undefined
  /**
   *Origin doesn't have enough balance to pay the required storage deposits.
   */
  StorageDepositNotEnoughFunds: undefined
  /**
   *More storage was created than allowed by the storage deposit limit.
   */
  StorageDepositLimitExhausted: undefined
  /**
   *Code removal was denied because the code is still in use by at least one contract.
   */
  CodeInUse: undefined
  /**
   *The contract ran to completion but decided to revert its storage changes.
   *Please note that this error is only returned from extrinsics. When called directly
   *or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
   *to determine whether a reversion has taken place.
   */
  ContractReverted: undefined
  /**
   *The contract failed to compile or is missing the correct entry points.
   *
   *A more detailed error can be found on the node console if debug messages are enabled
   *by supplying `-lruntime::revive=debug`.
   */
  CodeRejected: undefined
  /**
   *The code blob supplied is larger than [`limits::code::BLOB_BYTES`].
   */
  BlobTooLarge: undefined
  /**
   *The static memory consumption of the blob will be larger than
   *[`limits::code::STATIC_MEMORY_BYTES`].
   */
  StaticMemoryTooLarge: undefined
  /**
   *The program contains a basic block that is larger than allowed.
   */
  BasicBlockTooLarge: undefined
  /**
   *The program contains an invalid instruction.
   */
  InvalidInstruction: undefined
  /**
   *The contract has reached its maximum number of delegate dependencies.
   */
  MaxDelegateDependenciesReached: undefined
  /**
   *The dependency was not found in the contract's delegate dependencies.
   */
  DelegateDependencyNotFound: undefined
  /**
   *The contract already depends on the given delegate dependency.
   */
  DelegateDependencyAlreadyExists: undefined
  /**
   *Can not add a delegate dependency to the code hash of the contract itself.
   */
  CannotAddSelfAsDelegateDependency: undefined
  /**
   *Can not add more data to transient storage.
   */
  OutOfTransientStorage: undefined
  /**
   *The contract tried to call a syscall which does not exist (at its current api level).
   */
  InvalidSyscall: undefined
  /**
   *Invalid storage flags were passed to one of the storage syscalls.
   */
  InvalidStorageFlags: undefined
  /**
   *PolkaVM failed during code execution. Probably due to a malformed program.
   */
  ExecutionFailed: undefined
  /**
   *Failed to convert a U256 to a Balance.
   */
  BalanceConversionFailed: undefined
  /**
   *Immutable data can only be set during deploys and only be read during calls.
   *Additionally, it is only valid to set the data once and it must not be empty.
   */
  InvalidImmutableAccess: undefined
  /**
   *An `AccountID32` account tried to interact with the pallet without having a mapping.
   *
   *Call [`Pallet::map_account`] in order to create a mapping for the account.
   */
  AccountUnmapped: undefined
  /**
   *Tried to map an account that is already mapped.
   */
  AccountAlreadyMapped: undefined
}>
export type Idobm8kis57q7d = AnonymousEnum<{
  DispatchFailed: undefined
  InvalidMessage: undefined
  InvalidQuery: undefined
  OriginConversionFailed: undefined
  MessageExists: undefined
  RequestPending: undefined
}>
export type Idh4cj79bvroj8 = AnonymousEnum<{
  InvalidStateRoot: undefined
  IncompleteDatabase: undefined
  ValueAtIncompleteKey: undefined
  DecoderError: undefined
  InvalidHash: undefined
  DuplicateKey: undefined
  ExtraneousNode: undefined
  ExtraneousValue: undefined
  ExtraneousHashReference: undefined
  InvalidChildReference: undefined
  ValueMismatch: undefined
  IncompleteProof: undefined
  RootMismatch: undefined
  DecodeError: undefined
}>
export type I3kfo09eqm1214 = AnonymousEnum<{
  /**
   *We have ended a spend period and will now allocate funds.
   */
  Spending: Anonymize<I8iksqi3eani0a>
  /**
   *Some funds have been allocated.
   */
  Awarded: Anonymize<I16enopmju1p0q>
  /**
   *Some of our funds have been burnt.
   */
  Burnt: Anonymize<I43kq8qudg7pq9>
  /**
   *Spending has finished; this is the amount that rolls over until next spend.
   */
  Rollover: Anonymize<I76riseemre533>
  /**
   *Some funds have been deposited.
   */
  Deposit: Anonymize<Ie5v6njpckr05b>
  /**
   *A new spend proposal has been approved.
   */
  SpendApproved: Anonymize<I38bmcrmh852rk>
  /**
   *The inactive funds of the pallet have been updated.
   */
  UpdatedInactive: Anonymize<I4hcillge8de5f>
  /**
   *A new asset spend proposal has been approved.
   */
  AssetSpendApproved: Anonymize<I8usdc6tg7829p>
  /**
   *An approved spend was voided.
   */
  AssetSpendVoided: Anonymize<I666bl2fqjkejo>
  /**
   *A payment happened.
   */
  Paid: Anonymize<I666bl2fqjkejo>
  /**
   *A payment failed and can be retried.
   */
  PaymentFailed: Anonymize<I666bl2fqjkejo>
  /**
   *A spend was processed and removed from the storage. It might have been successfully
   *paid or it may have expired.
   */
  SpendProcessed: Anonymize<I666bl2fqjkejo>
}>
export type I8usdc6tg7829p = {
  index: number
  amount: bigint
  beneficiary: SS58String
  valid_from: number
  expire_at: number
}
export type If1rj3ppu5aead = AnonymousEnum<{
  /**
   *A sudo call just took place.
   */
  Sudid: Anonymize<I8iltohe2c6pm6>
  /**
   *The sudo key has been updated.
   */
  KeyChanged: Anonymize<I5rtkmhm2dng4u>
  /**
   *The key was permanently removed.
   */
  KeyRemoved: undefined
  /**
   *A [sudo_as](Pallet::sudo_as) call just took place.
   */
  SudoAsDone: Anonymize<I8iltohe2c6pm6>
}>
export type I8iltohe2c6pm6 = {
  /**
   *The result of the call made by the sudo user.
   */
  sudo_result: Anonymize<I3h92tin7sv08f>
}
export type I3h92tin7sv08f = ResultPayload<undefined, Anonymize<I9j620s5v5l35m>>
export type Ijd8ecn634s41 = AnonymousEnum<{
  /**
   *A motion (given hash) has been proposed (by given account) with a threshold (given
   *`MemberCount`).
   */
  Proposed: Anonymize<Ift6f10887nk72>
  /**
   *A motion (given hash) has been voted on by given account, leaving
   *a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  Voted: Anonymize<I7qc53b1tvqjg2>
  /**
   *A motion was approved by the required threshold.
   */
  Approved: Anonymize<I2ev73t79f46tb>
  /**
   *A motion was not approved by the required threshold.
   */
  Disapproved: Anonymize<I2ev73t79f46tb>
  /**
   *A motion was executed; result will be `Ok` if it returned without error.
   */
  Executed: Anonymize<Ie5m6thckn9sr0>
  /**
   *A single member did some action; result will be `Ok` if it returned without error.
   */
  MemberExecuted: Anonymize<Ie5m6thckn9sr0>
  /**
   *A proposal was closed because its threshold was reached or after its duration was up.
   */
  Closed: Anonymize<Iak7fhrgb9jnnq>
  /**
   *A proposal was killed.
   */
  Killed: Anonymize<I2ev73t79f46tb>
  /**
   *Some cost for storing a proposal was burned.
   */
  ProposalCostBurned: Anonymize<I9ad1o9mv4cm3>
  /**
   *Some cost for storing a proposal was released.
   */
  ProposalCostReleased: Anonymize<I9ad1o9mv4cm3>
}>
export type Ift6f10887nk72 = {
  account: SS58String
  proposal_index: number
  proposal_hash: FixedSizeBinary<32>
  threshold: number
}
export type I7qc53b1tvqjg2 = {
  account: SS58String
  proposal_hash: FixedSizeBinary<32>
  voted: boolean
  yes: number
  no: number
}
export type I2ev73t79f46tb = {
  proposal_hash: FixedSizeBinary<32>
}
export type Ie5m6thckn9sr0 = {
  proposal_hash: FixedSizeBinary<32>
  result: Anonymize<I3h92tin7sv08f>
}
export type Iak7fhrgb9jnnq = {
  proposal_hash: FixedSizeBinary<32>
  yes: number
  no: number
}
export type I9ad1o9mv4cm3 = {
  proposal_hash: FixedSizeBinary<32>
  who: SS58String
}
export type I94k3fbi8ct9r8 = AnonymousEnum<{
  /**
   *A [SimpleMajorityOrigin] motion was executed. [motion_result] contains the call result
   */
  DispatchSimpleMajority: Anonymize<Ifuv7pq1hdu3iq>
  /**
   *A [SuperMajorityOrigin] motion was executed. [motion_result] contains the call result
   */
  DispatchSuperMajority: Anonymize<Ifuv7pq1hdu3iq>
  /**
   *A [UnanimousOrigin] motion was executed. [motion_result] contains the call result
   */
  DispatchUnanimous: Anonymize<Ifuv7pq1hdu3iq>
}>
export type Ifuv7pq1hdu3iq = {
  /**
   *Result of dispatching the proposed call.
   */
  motion_result: Anonymize<I3h92tin7sv08f>
}
export type I9fr19934dl4ub = AnonymousEnum<{
  /**
   *Scheduled some task.
   */
  Scheduled: Anonymize<I5n4sebgkfr760>
  /**
   *Canceled some task.
   */
  Canceled: Anonymize<I5n4sebgkfr760>
  /**
   *Dispatched some task.
   */
  Dispatched: Anonymize<Idn7l4jp0bc7rf>
  /**
   *Set a retry configuration for some task.
   */
  RetrySet: Anonymize<Ia3c82eadg79bj>
  /**
   *Cancel a retry configuration for some task.
   */
  RetryCancelled: Anonymize<Ienusoeb625ftq>
  /**
   *The call for the provided hash was not found so the task has been aborted.
   */
  CallUnavailable: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be renewed since the agenda is full at that block.
   */
  PeriodicFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task was unable to be retried since the agenda is full at that block or there
   *was not enough weight to reschedule it.
   */
  RetryFailed: Anonymize<Ienusoeb625ftq>
  /**
   *The given task can never be executed since it is overweight.
   */
  PermanentlyOverweight: Anonymize<Ienusoeb625ftq>
}>
export type Idn7l4jp0bc7rf = {
  task: Anonymize<I9jd27rnpm8ttv>
  id?: Anonymize<I4s6vifaf8k998>
  result: Anonymize<I3h92tin7sv08f>
}
export type Iel5f66clbekc3 = AnonymousEnum<{
  /**
   *Execution of an XCM message was attempted.
   */
  Attempted: Anonymize<Ia72eet39sf8j9>
  /**
   *A XCM message was sent.
   */
  Sent: Anonymize<If8u5kl4h8070m>
  /**
   *Query response received which does not match a registered query. This may be because a
   *matching query was never registered, it may be because it is a duplicate response, or
   *because the query timed out.
   */
  UnexpectedResponse: Anonymize<Icl7nl1rfeog3i>
  /**
   *Query response has been received and is ready for taking with `take_response`. There is
   *no registered notification call.
   */
  ResponseReady: Anonymize<Iasr6pj6shs0fl>
  /**
   *Query response has been received and query is removed. The registered notification has
   *been dispatched and executed successfully.
   */
  Notified: Anonymize<I2uqmls7kcdnii>
  /**
   *Query response has been received and query is removed. The registered notification
   *could not be dispatched because the dispatch weight is greater than the maximum weight
   *originally budgeted by this runtime for the query result.
   */
  NotifyOverweight: Anonymize<Idg69klialbkb8>
  /**
   *Query response has been received and query is removed. There was a general error with
   *dispatching the notification call.
   */
  NotifyDispatchError: Anonymize<I2uqmls7kcdnii>
  /**
   *Query response has been received and query is removed. The dispatch was unable to be
   *decoded into a `Call`; this might be due to dispatch function having a signature which
   *is not `(origin, QueryId, Response)`.
   */
  NotifyDecodeFailed: Anonymize<I2uqmls7kcdnii>
  /**
   *Expected query response has been received but the origin location of the response does
   *not match that expected. The query remains registered for a later, valid, response to
   *be received and acted upon.
   */
  InvalidResponder: Anonymize<I7r6b7145022pp>
  /**
   *Expected query response has been received but the expected origin location placed in
   *storage by this runtime previously cannot be decoded. The query remains registered.
   *
   *This is unexpected (since a location placed in storage in a previously executing
   *runtime should be readable prior to query timeout) and dangerous since the possibly
   *valid response will be dropped. Manual governance intervention is probably going to be
   *needed.
   */
  InvalidResponderVersion: Anonymize<Icl7nl1rfeog3i>
  /**
   *Received query response has been read and removed.
   */
  ResponseTaken: Anonymize<I30pg328m00nr3>
  /**
   *Some assets have been placed in an asset trap.
   */
  AssetsTrapped: Anonymize<Icmrn7bogp28cs>
  /**
   *An XCM version change notification message has been attempted to be sent.
   *
   *The cost of sending it (borne by the chain) is included.
   */
  VersionChangeNotified: Anonymize<I7m9b5plj4h5ot>
  /**
   *The supported version of a location has been changed. This might be through an
   *automatic notification or a manual intervention.
   */
  SupportedVersionChanged: Anonymize<I9kt8c221c83ln>
  /**
   *A given location which had a version change subscription was dropped owing to an error
   *sending the notification to it.
   */
  NotifyTargetSendFail: Anonymize<I9onhk772nfs4f>
  /**
   *A given location which had a version change subscription was dropped owing to an error
   *migrating the location to our new XCM format.
   */
  NotifyTargetMigrationFail: Anonymize<I3l6bnksrmt56r>
  /**
   *Expected query response has been received but the expected querier location placed in
   *storage by this runtime previously cannot be decoded. The query remains registered.
   *
   *This is unexpected (since a location placed in storage in a previously executing
   *runtime should be readable prior to query timeout) and dangerous since the possibly
   *valid response will be dropped. Manual governance intervention is probably going to be
   *needed.
   */
  InvalidQuerierVersion: Anonymize<Icl7nl1rfeog3i>
  /**
   *Expected query response has been received but the querier location of the response does
   *not match the expected. The query remains registered for a later, valid, response to
   *be received and acted upon.
   */
  InvalidQuerier: Anonymize<Idh09k0l2pmdcg>
  /**
   *A remote has requested XCM version change notification from us and we have honored it.
   *A version information message is sent to them and its cost is included.
   */
  VersionNotifyStarted: Anonymize<I7uoiphbm0tj4r>
  /**
   *We have requested that a remote chain send us XCM version change notifications.
   */
  VersionNotifyRequested: Anonymize<I7uoiphbm0tj4r>
  /**
   *We have requested that a remote chain stops sending us XCM version change
   *notifications.
   */
  VersionNotifyUnrequested: Anonymize<I7uoiphbm0tj4r>
  /**
   *Fees were paid from a location for an operation (often for using `SendXcm`).
   */
  FeesPaid: Anonymize<I512p1n7qt24l8>
  /**
   *Some assets have been claimed from an asset trap
   */
  AssetsClaimed: Anonymize<Icmrn7bogp28cs>
  /**
   *A XCM version migration finished.
   */
  VersionMigrationFinished: Anonymize<I6s1nbislhk619>
}>
export type Ia72eet39sf8j9 = {
  outcome: Anonymize<I6uq5gb4s805s7>
}
export type I6uq5gb4s805s7 = AnonymousEnum<{
  Complete: Anonymize<I30iff2d192eu7>
  Incomplete: {
    used: Anonymize<I4q39t5hn830vp>
    error: Anonymize<Id56rgs0bdb7gl>
  }
  Error: {
    error: Anonymize<Id56rgs0bdb7gl>
  }
}>
export type Id56rgs0bdb7gl = AnonymousEnum<{
  Overflow: undefined
  Unimplemented: undefined
  UntrustedReserveLocation: undefined
  UntrustedTeleportLocation: undefined
  LocationFull: undefined
  LocationNotInvertible: undefined
  BadOrigin: undefined
  InvalidLocation: undefined
  AssetNotFound: undefined
  FailedToTransactAsset: undefined
  NotWithdrawable: undefined
  LocationCannotHold: undefined
  ExceedsMaxMessageSize: undefined
  DestinationUnsupported: undefined
  Transport: undefined
  Unroutable: undefined
  UnknownClaim: undefined
  FailedToDecode: undefined
  MaxWeightInvalid: undefined
  NotHoldingFees: undefined
  TooExpensive: undefined
  Trap: bigint
  ExpectationFalse: undefined
  PalletNotFound: undefined
  NameMismatch: undefined
  VersionIncompatible: undefined
  HoldingWouldOverflow: undefined
  ExportError: undefined
  ReanchorFailed: undefined
  NoDeal: undefined
  FeesNotMet: undefined
  LockError: undefined
  NoPermission: undefined
  Unanchored: undefined
  NotDepositable: undefined
  TooManyAssets: undefined
  UnhandledXcmVersion: undefined
  WeightLimitReached: Anonymize<I4q39t5hn830vp>
  Barrier: undefined
  WeightNotComputable: undefined
  ExceedsStackLimit: undefined
}>
export type If8u5kl4h8070m = {
  origin: Anonymize<If9iqq7i64mur8>
  destination: Anonymize<If9iqq7i64mur8>
  message: Anonymize<Ict03eedr8de9s>
  message_id: FixedSizeBinary<32>
}
export type If9iqq7i64mur8 = {
  parents: number
  interior: XcmV5Junctions
}
export type XcmV5Junctions = Enum<{
  Here: undefined
  X1: XcmV5Junction
  X2: FixedSizeArray<2, XcmV5Junction>
  X3: FixedSizeArray<3, XcmV5Junction>
  X4: FixedSizeArray<4, XcmV5Junction>
  X5: FixedSizeArray<5, XcmV5Junction>
  X6: FixedSizeArray<6, XcmV5Junction>
  X7: FixedSizeArray<7, XcmV5Junction>
  X8: FixedSizeArray<8, XcmV5Junction>
}>
export declare const XcmV5Junctions: GetEnum<XcmV5Junctions>
export type XcmV5Junction = Enum<{
  Parachain: number
  AccountId32: {
    network?: Anonymize<I97pd2rst02a7r>
    id: FixedSizeBinary<32>
  }
  AccountIndex64: {
    network?: Anonymize<I97pd2rst02a7r>
    index: bigint
  }
  AccountKey20: {
    network?: Anonymize<I97pd2rst02a7r>
    key: FixedSizeBinary<20>
  }
  PalletInstance: number
  GeneralIndex: bigint
  GeneralKey: Anonymize<I15lht6t53odo4>
  OnlyChild: undefined
  Plurality: Anonymize<I518fbtnclg1oc>
  GlobalConsensus: XcmV5NetworkId
}>
export declare const XcmV5Junction: GetEnum<XcmV5Junction>
export type I97pd2rst02a7r = XcmV5NetworkId | undefined
export type XcmV5NetworkId = Enum<{
  ByGenesis: FixedSizeBinary<32>
  ByFork: Anonymize<I15vf5oinmcgps>
  Polkadot: undefined
  Kusama: undefined
  Ethereum: Anonymize<I623eo8t3jrbeo>
  BitcoinCore: undefined
  BitcoinCash: undefined
  PolkadotBulletin: undefined
}>
export declare const XcmV5NetworkId: GetEnum<XcmV5NetworkId>
export type Ict03eedr8de9s = Array<XcmV5Instruction>
export type XcmV5Instruction = Enum<{
  WithdrawAsset: Anonymize<I4npjalvhmfuj>
  ReserveAssetDeposited: Anonymize<I4npjalvhmfuj>
  ReceiveTeleportedAsset: Anonymize<I4npjalvhmfuj>
  QueryResponse: {
    query_id: bigint
    response: Anonymize<I7vucpgm2c6959>
    max_weight: Anonymize<I4q39t5hn830vp>
    querier?: Anonymize<I4pai6qnfk426l>
  }
  TransferAsset: {
    assets: Anonymize<I4npjalvhmfuj>
    beneficiary: Anonymize<If9iqq7i64mur8>
  }
  TransferReserveAsset: {
    assets: Anonymize<I4npjalvhmfuj>
    dest: Anonymize<If9iqq7i64mur8>
    xcm: Anonymize<Ict03eedr8de9s>
  }
  Transact: {
    origin_kind: XcmV2OriginKind
    fallback_max_weight?: Anonymize<Iasb8k6ash5mjn>
    call: Binary
  }
  HrmpNewChannelOpenRequest: Anonymize<I5uhhrjqfuo4e5>
  HrmpChannelAccepted: Anonymize<Ifij4jam0o7sub>
  HrmpChannelClosing: Anonymize<Ieeb4svd9i8fji>
  ClearOrigin: undefined
  DescendOrigin: XcmV5Junctions
  ReportError: Anonymize<I6vsmh07hrp1rc>
  DepositAsset: {
    assets: XcmV5AssetFilter
    beneficiary: Anonymize<If9iqq7i64mur8>
  }
  DepositReserveAsset: {
    assets: XcmV5AssetFilter
    dest: Anonymize<If9iqq7i64mur8>
    xcm: Anonymize<Ict03eedr8de9s>
  }
  ExchangeAsset: {
    give: XcmV5AssetFilter
    want: Anonymize<I4npjalvhmfuj>
    maximal: boolean
  }
  InitiateReserveWithdraw: {
    assets: XcmV5AssetFilter
    reserve: Anonymize<If9iqq7i64mur8>
    xcm: Anonymize<Ict03eedr8de9s>
  }
  InitiateTeleport: {
    assets: XcmV5AssetFilter
    dest: Anonymize<If9iqq7i64mur8>
    xcm: Anonymize<Ict03eedr8de9s>
  }
  ReportHolding: {
    response_info: Anonymize<I6vsmh07hrp1rc>
    assets: XcmV5AssetFilter
  }
  BuyExecution: {
    fees: Anonymize<Iffh1nc5e1mod6>
    weight_limit: XcmV3WeightLimit
  }
  RefundSurplus: undefined
  SetErrorHandler: Anonymize<Ict03eedr8de9s>
  SetAppendix: Anonymize<Ict03eedr8de9s>
  ClearError: undefined
  ClaimAsset: {
    assets: Anonymize<I4npjalvhmfuj>
    ticket: Anonymize<If9iqq7i64mur8>
  }
  Trap: bigint
  SubscribeVersion: Anonymize<Ieprdqqu7ildvr>
  UnsubscribeVersion: undefined
  BurnAsset: Anonymize<I4npjalvhmfuj>
  ExpectAsset: Anonymize<I4npjalvhmfuj>
  ExpectOrigin?: Anonymize<I4pai6qnfk426l>
  ExpectError?: Anonymize<I3l6ejee750fv1>
  ExpectTransactStatus: XcmV3MaybeErrorCode
  QueryPallet: {
    module_name: Binary
    response_info: Anonymize<I6vsmh07hrp1rc>
  }
  ExpectPallet: Anonymize<Id7mf37dkpgfjs>
  ReportTransactStatus: Anonymize<I6vsmh07hrp1rc>
  ClearTransactStatus: undefined
  UniversalOrigin: XcmV5Junction
  ExportMessage: {
    network: XcmV5NetworkId
    destination: XcmV5Junctions
    xcm: Anonymize<Ict03eedr8de9s>
  }
  LockAsset: {
    asset: Anonymize<Iffh1nc5e1mod6>
    unlocker: Anonymize<If9iqq7i64mur8>
  }
  UnlockAsset: {
    asset: Anonymize<Iffh1nc5e1mod6>
    target: Anonymize<If9iqq7i64mur8>
  }
  NoteUnlockable: {
    asset: Anonymize<Iffh1nc5e1mod6>
    owner: Anonymize<If9iqq7i64mur8>
  }
  RequestUnlock: {
    asset: Anonymize<Iffh1nc5e1mod6>
    locker: Anonymize<If9iqq7i64mur8>
  }
  SetFeesMode: Anonymize<I4nae9rsql8fa7>
  SetTopic: FixedSizeBinary<32>
  ClearTopic: undefined
  AliasOrigin: Anonymize<If9iqq7i64mur8>
  UnpaidExecution: {
    weight_limit: XcmV3WeightLimit
    check_origin?: Anonymize<I4pai6qnfk426l>
  }
  PayFees: {
    asset: Anonymize<Iffh1nc5e1mod6>
  }
  InitiateTransfer: {
    destination: Anonymize<If9iqq7i64mur8>
    remote_fees?: Anonymize<Ifhmc9e7vpeeig> | undefined
    preserve_origin: boolean
    assets: Array<Anonymize<Ifhmc9e7vpeeig>>
    remote_xcm: Anonymize<Ict03eedr8de9s>
  }
  ExecuteWithOrigin: {
    descendant_origin?: XcmV5Junctions | undefined
    xcm: Anonymize<Ict03eedr8de9s>
  }
  SetHints: {
    hints: Array<
      Enum<{
        AssetClaimer: {
          location: Anonymize<If9iqq7i64mur8>
        }
      }>
    >
  }
}>
export declare const XcmV5Instruction: GetEnum<XcmV5Instruction>
export type I4npjalvhmfuj = Array<Anonymize<Iffh1nc5e1mod6>>
export type Iffh1nc5e1mod6 = {
  id: Anonymize<If9iqq7i64mur8>
  fun: XcmV3MultiassetFungibility
}
export type I7vucpgm2c6959 = AnonymousEnum<{
  Null: undefined
  Assets: Anonymize<I4npjalvhmfuj>
  ExecutionResult?: Anonymize<I3l6ejee750fv1>
  Version: number
  PalletsInfo: Anonymize<I599u7h20b52at>
  DispatchResult: XcmV3MaybeErrorCode
}>
export type I3l6ejee750fv1 = [number, Anonymize<Id56rgs0bdb7gl>] | undefined
export type I4pai6qnfk426l = Anonymize<If9iqq7i64mur8> | undefined
export type I6vsmh07hrp1rc = {
  destination: Anonymize<If9iqq7i64mur8>
  query_id: bigint
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type XcmV5AssetFilter = Enum<{
  Definite: Anonymize<I4npjalvhmfuj>
  Wild: XcmV5WildAsset
}>
export declare const XcmV5AssetFilter: GetEnum<XcmV5AssetFilter>
export type XcmV5WildAsset = Enum<{
  All: undefined
  AllOf: {
    id: Anonymize<If9iqq7i64mur8>
    fun: XcmV2MultiassetWildFungibility
  }
  AllCounted: number
  AllOfCounted: {
    id: Anonymize<If9iqq7i64mur8>
    fun: XcmV2MultiassetWildFungibility
    count: number
  }
}>
export declare const XcmV5WildAsset: GetEnum<XcmV5WildAsset>
export type Ifhmc9e7vpeeig = AnonymousEnum<{
  Teleport: XcmV5AssetFilter
  ReserveDeposit: XcmV5AssetFilter
  ReserveWithdraw: XcmV5AssetFilter
}>
export type Icl7nl1rfeog3i = {
  origin: Anonymize<If9iqq7i64mur8>
  query_id: bigint
}
export type Iasr6pj6shs0fl = {
  query_id: bigint
  response: Anonymize<I7vucpgm2c6959>
}
export type I7r6b7145022pp = {
  origin: Anonymize<If9iqq7i64mur8>
  query_id: bigint
  expected_location?: Anonymize<I4pai6qnfk426l>
}
export type Icmrn7bogp28cs = {
  hash: FixedSizeBinary<32>
  origin: Anonymize<If9iqq7i64mur8>
  assets: XcmVersionedAssets
}
export type XcmVersionedAssets = Enum<{
  V3: Anonymize<Iai6dhqiq3bach>
  V4: Anonymize<I50mli3hb64f9b>
  V5: Anonymize<I4npjalvhmfuj>
}>
export declare const XcmVersionedAssets: GetEnum<XcmVersionedAssets>
export type I7m9b5plj4h5ot = {
  destination: Anonymize<If9iqq7i64mur8>
  result: number
  cost: Anonymize<I4npjalvhmfuj>
  message_id: FixedSizeBinary<32>
}
export type I9kt8c221c83ln = {
  location: Anonymize<If9iqq7i64mur8>
  version: number
}
export type I9onhk772nfs4f = {
  location: Anonymize<If9iqq7i64mur8>
  query_id: bigint
  error: Anonymize<Id56rgs0bdb7gl>
}
export type I3l6bnksrmt56r = {
  location: XcmVersionedLocation
  query_id: bigint
}
export type XcmVersionedLocation = Enum<{
  V3: Anonymize<I4c0s5cioidn76>
  V4: Anonymize<I4c0s5cioidn76>
  V5: Anonymize<If9iqq7i64mur8>
}>
export declare const XcmVersionedLocation: GetEnum<XcmVersionedLocation>
export type Idh09k0l2pmdcg = {
  origin: Anonymize<If9iqq7i64mur8>
  query_id: bigint
  expected_querier: Anonymize<If9iqq7i64mur8>
  maybe_actual_querier?: Anonymize<I4pai6qnfk426l>
}
export type I7uoiphbm0tj4r = {
  destination: Anonymize<If9iqq7i64mur8>
  cost: Anonymize<I4npjalvhmfuj>
  message_id: FixedSizeBinary<32>
}
export type I512p1n7qt24l8 = {
  paying: Anonymize<If9iqq7i64mur8>
  fees: Anonymize<I4npjalvhmfuj>
}
export type Ihpdgvt7vs2cb = AnonymousEnum<{
  /**
   *Downward message is invalid XCM.
   *\[ id \]
   */
  InvalidFormat: FixedSizeBinary<32>
  /**
   *Downward message is unsupported version of XCM.
   *\[ id \]
   */
  UnsupportedVersion: FixedSizeBinary<32>
  /**
   *Downward message executed with the given outcome.
   *\[ id, outcome \]
   */
  ExecutedDownward: Anonymize<Ibeto40kl3r5j7>
}>
export type Ibeto40kl3r5j7 = [FixedSizeBinary<32>, Anonymize<I6uq5gb4s805s7>]
export type Ievgparagrf8s9 = AnonymousEnum<{
  /**
   *Emitted when a state machine is successfully updated to a new height
   */
  StateMachineUpdated: Anonymize<Icuomvkc5d2ldo>
  /**
   *Emitted when a state commitment is vetoed by a fisherman
   */
  StateCommitmentVetoed: Anonymize<Imnb7a0a14ts1>
  /**
   *Indicates that a consensus client has been created
   */
  ConsensusClientCreated: Anonymize<I9ljfa9qc631nt>
  /**
   *Indicates that a consensus client has been created
   */
  ConsensusClientFrozen: Anonymize<I9ljfa9qc631nt>
  /**
   *An Outgoing Response has been deposited
   */
  Response: Anonymize<I5ntoea33t507g>
  /**
   *An Outgoing Request has been deposited
   */
  Request: Anonymize<Icvhvdg4guj0u2>
  /**
   *Some errors handling some ismp messages
   */
  Errors: Anonymize<I6vqpfjes12rn2>
  /**
   *Post Request Handled
   */
  PostRequestHandled: Anonymize<I7qo7cp2e3aerl>
  /**
   *Post Response Handled
   */
  PostResponseHandled: Anonymize<I7qo7cp2e3aerl>
  /**
   *Get Response Handled
   */
  GetRequestHandled: Anonymize<I7qo7cp2e3aerl>
  /**
   *Post request timeout handled
   */
  PostRequestTimeoutHandled: Anonymize<I7hm2lpanae6vf>
  /**
   *Post response timeout handled
   */
  PostResponseTimeoutHandled: Anonymize<I7hm2lpanae6vf>
  /**
   *Get request timeout handled
   */
  GetRequestTimeoutHandled: Anonymize<I7hm2lpanae6vf>
}>
export type Icuomvkc5d2ldo = {
  /**
   *State machine identifier
   */
  state_machine_id: Anonymize<I58bf8c7kp5i84>
  /**
   *State machine latest height
   */
  latest_height: bigint
}
export type I58bf8c7kp5i84 = {
  state_id: Anonymize<I25ubidgt5kbu2>
  consensus_state_id: FixedSizeBinary<4>
}
export type I25ubidgt5kbu2 = AnonymousEnum<{
  Evm: number
  Polkadot: number
  Kusama: number
  Substrate: FixedSizeBinary<4>
  Tendermint: FixedSizeBinary<4>
}>
export type Imnb7a0a14ts1 = {
  /**
   *State machine height
   */
  height: Anonymize<I7jr7fpe101ton>
  /**
   *responsible fisherman
   */
  fisherman: Binary
}
export type I7jr7fpe101ton = {
  id: Anonymize<I58bf8c7kp5i84>
  height: bigint
}
export type I9ljfa9qc631nt = {
  /**
   *Consensus client id
   */
  consensus_client_id: FixedSizeBinary<4>
}
export type I5ntoea33t507g = {
  /**
   *Chain that this response will be routed to
   */
  dest_chain: Anonymize<I25ubidgt5kbu2>
  /**
   *Source Chain for this response
   */
  source_chain: Anonymize<I25ubidgt5kbu2>
  /**
   *Nonce for the request which this response is for
   */
  request_nonce: bigint
  /**
   *Response Commitment
   */
  commitment: FixedSizeBinary<32>
  /**
   *Request commitment
   */
  req_commitment: FixedSizeBinary<32>
}
export type Icvhvdg4guj0u2 = {
  /**
   *Chain that this request will be routed to
   */
  dest_chain: Anonymize<I25ubidgt5kbu2>
  /**
   *Source Chain for request
   */
  source_chain: Anonymize<I25ubidgt5kbu2>
  /**
   *Request nonce
   */
  request_nonce: bigint
  /**
   *Commitment
   */
  commitment: FixedSizeBinary<32>
}
export type I6vqpfjes12rn2 = {
  /**
   *Message handling errors
   */
  errors: Anonymize<Itom7fk49o0c9>
}
export type I7qo7cp2e3aerl = {
  commitment: FixedSizeBinary<32>
  relayer: Binary
}
export type I7hm2lpanae6vf = {
  commitment: FixedSizeBinary<32>
  source: Anonymize<I25ubidgt5kbu2>
  dest: Anonymize<I25ubidgt5kbu2>
}
export type Ie6qh3o3afje2f = AnonymousEnum<{
  /**
   *Parachains with the `para_ids` have been added to the whitelist
   */
  ParachainsAdded: Anonymize<Ivalbtb85o2h0>
  /**
   *Parachains with the `para_ids` have been removed from the whitelist
   */
  ParachainsRemoved: Anonymize<Ic8hk838gccoml>
}>
export type Ivalbtb85o2h0 = {
  /**
   *The parachains in question
   */
  para_ids: Array<{
    id: number
    slot_duration: bigint
  }>
}
export type Ic8hk838gccoml = {
  /**
   *The parachains in question
   */
  para_ids: Anonymize<Icgljjb6j82uhn>
}
export type I211sbjvh5hjqu = AnonymousEnum<{
  /**
   *Contract deployed by address at the specified address.
   */
  Instantiated: Anonymize<Ie5222qfrr24ek>
  /**
   *Contract has been removed.
   *
   *# Note
   *
   *The only way for a contract to be removed and emitting this event is by calling
   *`seal_terminate`.
   */
  Terminated: Anonymize<I28g8sphdu312k>
  /**
   *Code with the specified hash has been stored.
   */
  CodeStored: Anonymize<Idqbjt2c6r46t6>
  /**
   *A custom event emitted by the contract.
   */
  ContractEmitted: Anonymize<I853aigjva3f0t>
  /**
   *A code with the specified hash was removed.
   */
  CodeRemoved: Anonymize<I9uehhems5hkqm>
  /**
   *A contract's code was updated.
   */
  ContractCodeUpdated: Anonymize<I7q5qk4uoanhof>
  /**
   *A contract was called either by a plain account or another contract.
   *
   *# Note
   *
   *Please keep in mind that like all events this is only emitted for successful
   *calls. This is because on failure all storage changes including events are
   *rolled back.
   */
  Called: Anonymize<Iehpbs40l3jkit>
  /**
   *A contract delegate called a code hash.
   *
   *# Note
   *
   *Please keep in mind that like all events this is only emitted for successful
   *calls. This is because on failure all storage changes including events are
   *rolled back.
   */
  DelegateCalled: Anonymize<Idht9upmipvd4j>
  /**
   *Some funds have been transferred and held as storage deposit.
   */
  StorageDepositTransferredAndHeld: Anonymize<Iflcfm9b6nlmdd>
  /**
   *Some storage deposit funds have been transferred and released.
   */
  StorageDepositTransferredAndReleased: Anonymize<Iflcfm9b6nlmdd>
}>
export type Ie5222qfrr24ek = {
  deployer: SS58String
  contract: SS58String
}
export type I28g8sphdu312k = {
  /**
   *The contract that was terminated.
   */
  contract: SS58String
  /**
   *The account that received the contracts remaining balance
   */
  beneficiary: SS58String
}
export type Idqbjt2c6r46t6 = {
  code_hash: FixedSizeBinary<32>
  deposit_held: bigint
  uploader: SS58String
}
export type I853aigjva3f0t = {
  /**
   *The contract that emitted the event.
   */
  contract: SS58String
  /**
   *Data supplied by the contract. Metadata generated during contract compilation
   *is needed to decode it.
   */
  data: Binary
}
export type I9uehhems5hkqm = {
  code_hash: FixedSizeBinary<32>
  deposit_released: bigint
  remover: SS58String
}
export type I7q5qk4uoanhof = {
  /**
   *The contract that has been updated.
   */
  contract: SS58String
  /**
   *New code hash that was set for the contract.
   */
  new_code_hash: FixedSizeBinary<32>
  /**
   *Previous code hash of the contract.
   */
  old_code_hash: FixedSizeBinary<32>
}
export type Iehpbs40l3jkit = {
  /**
   *The caller of the `contract`.
   */
  caller: Anonymize<I7d474666mmg78>
  /**
   *The contract that was called.
   */
  contract: SS58String
}
export type I7d474666mmg78 = AnonymousEnum<{
  Root: undefined
  Signed: SS58String
}>
export type Idht9upmipvd4j = {
  /**
   *The contract that performed the delegate call and hence in whose context
   *the `code_hash` is executed.
   */
  contract: SS58String
  /**
   *The code hash that was delegate called.
   */
  code_hash: FixedSizeBinary<32>
}
export type Ic51o0fgloeigd = AnonymousEnum<{
  /**
   *A proxy was executed correctly, with the given.
   */
  ProxyExecuted: Anonymize<Ibbphjjdg3p1u1>
  /**
   *A pure account has been created by new proxy with given
   *disambiguation index and proxy type.
   */
  PureCreated: Anonymize<Ie7cuj84ohvg56>
  /**
   *An announcement was placed to make a call in the future.
   */
  Announced: Anonymize<I2ur0oeqg495j8>
  /**
   *A proxy was added.
   */
  ProxyAdded: Anonymize<I8ioopvokvl3ud>
  /**
   *A proxy was removed.
   */
  ProxyRemoved: Anonymize<I8ioopvokvl3ud>
}>
export type Ibbphjjdg3p1u1 = {
  result: Anonymize<I3h92tin7sv08f>
}
export type Ic60mbude2lnbo = AnonymousEnum<{
  /**
   *A new multisig operation has begun.
   */
  NewMultisig: Anonymize<Iep27ialq4a7o7>
  /**
   *A multisig operation has been approved by someone.
   */
  MultisigApproval: Anonymize<Iasu5jvoqr43mv>
  /**
   *A multisig operation has been executed.
   */
  MultisigExecuted: Anonymize<I7m6c66di17l41>
  /**
   *A multisig operation has been cancelled.
   */
  MultisigCancelled: Anonymize<I5qolde99acmd1>
}>
export type I7m6c66di17l41 = {
  approving: SS58String
  timepoint: Anonymize<Itvprrpb0nm3o>
  multisig: SS58String
  call_hash: FixedSizeBinary<32>
  result: Anonymize<I3h92tin7sv08f>
}
export type Iarcv79cv39slr = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<I6vgs5eq4upmff>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<Iat8ca8l6b897g>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<Ibbphjjdg3p1u1>
}>
export type I6vgs5eq4upmff = {
  index: number
  error: Anonymize<I9j620s5v5l35m>
}
export type Iat8ca8l6b897g = {
  error: Anonymize<I9j620s5v5l35m>
}
export type I41s7j0hsp2u0b = AnonymousEnum<{
  /**
   *An NFT was successfully fractionalized.
   */
  NftFractionalized: Anonymize<Ib67harsthtcvr>
  /**
   *An NFT was successfully returned back.
   */
  NftUnified: Anonymize<Ic7ok3lq0728f7>
}>
export type Ib67harsthtcvr = {
  nft_collection: number
  nft: number
  fractions: bigint
  asset: number
  beneficiary: SS58String
}
export type Ic7ok3lq0728f7 = {
  nft_collection: number
  nft: number
  asset: number
  beneficiary: SS58String
}
export type I1jo9ctv03grf7 = AnonymousEnum<{
  /**
   *Contract deployed by address at the specified address.
   */
  Instantiated: Anonymize<I8jhsbaiultviu>
  /**
   *Contract has been removed.
   *
   *# Note
   *
   *The only way for a contract to be removed and emitting this event is by calling
   *`seal_terminate`.
   */
  Terminated: Anonymize<I2kh24hh747r7a>
  /**
   *Code with the specified hash has been stored.
   */
  CodeStored: Anonymize<Iadkk9fja0v9gb>
  /**
   *A custom event emitted by the contract.
   */
  ContractEmitted: Anonymize<I7svbvm6hg57aj>
  /**
   *A code with the specified hash was removed.
   */
  CodeRemoved: Anonymize<I36kcene7j10ck>
  /**
   *A contract's code was updated.
   */
  ContractCodeUpdated: Anonymize<Idj4m9dgi2uob4>
  /**
   *A contract was called either by a plain account or another contract.
   *
   *# Note
   *
   *Please keep in mind that like all events this is only emitted for successful
   *calls. This is because on failure all storage changes including events are
   *rolled back.
   */
  Called: Anonymize<I5mt66p7ke9kv1>
  /**
   *A contract delegate called a code hash.
   *
   *# Note
   *
   *Please keep in mind that like all events this is only emitted for successful
   *calls. This is because on failure all storage changes including events are
   *rolled back.
   */
  DelegateCalled: Anonymize<I6jtuvng77672>
  /**
   *Some funds have been transferred and held as storage deposit.
   */
  StorageDepositTransferredAndHeld: Anonymize<Ielefh9fukpeue>
  /**
   *Some storage deposit funds have been transferred and released.
   */
  StorageDepositTransferredAndReleased: Anonymize<Ielefh9fukpeue>
}>
export type I8jhsbaiultviu = {
  deployer: FixedSizeBinary<20>
  contract: FixedSizeBinary<20>
}
export type I2kh24hh747r7a = {
  /**
   *The contract that was terminated.
   */
  contract: FixedSizeBinary<20>
  /**
   *The account that received the contracts remaining balance
   */
  beneficiary: FixedSizeBinary<20>
}
export type Iadkk9fja0v9gb = {
  code_hash: FixedSizeBinary<32>
  deposit_held: bigint
  uploader: FixedSizeBinary<20>
}
export type I7svbvm6hg57aj = {
  /**
   *The contract that emitted the event.
   */
  contract: FixedSizeBinary<20>
  /**
   *Data supplied by the contract. Metadata generated during contract compilation
   *is needed to decode it.
   */
  data: Binary
  /**
   *A list of topics used to index the event.
   *Number of topics is capped by [`limits::NUM_EVENT_TOPICS`].
   */
  topics: Anonymize<Ic5m5lp1oioo8r>
}
export type I36kcene7j10ck = {
  code_hash: FixedSizeBinary<32>
  deposit_released: bigint
  remover: FixedSizeBinary<20>
}
export type Idj4m9dgi2uob4 = {
  /**
   *The contract that has been updated.
   */
  contract: FixedSizeBinary<20>
  /**
   *New code hash that was set for the contract.
   */
  new_code_hash: FixedSizeBinary<32>
  /**
   *Previous code hash of the contract.
   */
  old_code_hash: FixedSizeBinary<32>
}
export type I5mt66p7ke9kv1 = {
  /**
   *The caller of the `contract`.
   */
  caller: Anonymize<I7d474666mmg78>
  /**
   *The contract that was called.
   */
  contract: FixedSizeBinary<20>
}
export type I6jtuvng77672 = {
  /**
   *The contract that performed the delegate call and hence in whose context
   *the `code_hash` is executed.
   */
  contract: FixedSizeBinary<20>
  /**
   *The code hash that was delegate called.
   */
  code_hash: FixedSizeBinary<32>
}
export type Ielefh9fukpeue = {
  from: FixedSizeBinary<20>
  to: FixedSizeBinary<20>
  amount: bigint
}
export type I2158jcepe2iig = AnonymousEnum<{
  /**
   *Event emitted when allowance by `owner` to `spender` changes.
   */
  Approval: Anonymize<Ibrq3me0n6l1aa>
  /**
   *Event emitted when a token transfer occurs.
   */
  Transfer: Anonymize<Ib1lp1vvi0snto>
  /**
   *Event emitted when a token is created.
   */
  Created: Anonymize<Ib1tuirknugkf0>
}>
export type Ibrq3me0n6l1aa = {
  /**
   *The token.
   */
  token: number
  /**
   *The owner providing the allowance.
   */
  owner: SS58String
  /**
   *The beneficiary of the allowance.
   */
  spender: SS58String
  /**
   *The new allowance amount.
   */
  value: bigint
}
export type Ib1lp1vvi0snto = {
  /**
   *The token.
   */
  token: number
  /**
   *The source of the transfer. `None` when minting.
   */
  from?: Anonymize<Ihfphjolmsqq1>
  /**
   *The recipient of the transfer. `None` when burning.
   */
  to?: Anonymize<Ihfphjolmsqq1>
  /**
   *The amount transferred (or minted/burned).
   */
  value: bigint
}
export type Ib1tuirknugkf0 = {
  /**
   *The token identifier.
   */
  id: number
  /**
   *The creator of the token.
   */
  creator: SS58String
  /**
   *The administrator of the token.
   */
  admin: SS58String
}
export type I7d8ds7nir5quj = AnonymousEnum<{
  /**
   *A GET has been dispatched via ISMP.
   */
  IsmpGetDispatched: Anonymize<I9h4l0ivnpllq2>
  /**
   *A response to a GET has been received via ISMP.
   */
  IsmpGetResponseReceived: Anonymize<I9e44up6jrgtq8>
  /**
   *A POST has been dispatched via ISMP.
   */
  IsmpPostDispatched: Anonymize<I9h4l0ivnpllq2>
  /**
   *A response to a POST has been received via ISMP.
   */
  IsmpPostResponseReceived: Anonymize<I9e44up6jrgtq8>
  /**
   *A XCM query has been created.
   */
  XcmQueryCreated: Anonymize<I8lbid96jmoifn>
  /**
   *A response to a XCM query has been received.
   */
  XcmResponseReceived: Anonymize<I6f9cs95vga45t>
  /**
   *A callback has been executed successfully.
   */
  CallbackExecuted: Anonymize<I1q7llba29achm>
  /**
   *A callback has failed.
   */
  CallbackFailed: Anonymize<Ib607ohs5aitst>
  /**
   *One or more messages have been removed for the origin.
   */
  Removed: Anonymize<I787j4cmbcfj1a>
}>
export type I9h4l0ivnpllq2 = {
  /**
   *The origin of the request.
   */
  origin: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The ISMP request commitment.
   */
  commitment: FixedSizeBinary<32>
  /**
   *An optional callback to be used to return the response.
   */
  callback?: Anonymize<I7fiq10lpou70j>
}
export type I7fiq10lpou70j = Anonymize<I8mru2c22eqefg> | undefined
export type I8mru2c22eqefg = {
  selector: FixedSizeBinary<4>
  weight: Anonymize<I4q39t5hn830vp>
}
export type I9e44up6jrgtq8 = {
  /**
   *The destination of the response.
   */
  dest: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The ISMP request commitment.
   */
  commitment: FixedSizeBinary<32>
}
export type I8lbid96jmoifn = {
  /**
   *The origin of the request.
   */
  origin: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The identifier of the created XCM query.
   */
  query_id: bigint
  /**
   *An optional callback to be used to return the response.
   */
  callback?: Anonymize<I7fiq10lpou70j>
}
export type I6f9cs95vga45t = {
  /**
   *The destination of the response.
   */
  dest: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The identifier of the XCM query.
   */
  query_id: bigint
  /**
   *The query response.
   */
  response: Anonymize<I7vucpgm2c6959>
}
export type I1q7llba29achm = {
  /**
   *The origin of the callback.
   */
  origin: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The successful callback.
   */
  callback: Anonymize<I8mru2c22eqefg>
}
export type Ib607ohs5aitst = {
  /**
   *The origin of the callback.
   */
  origin: SS58String
  /**
   *The identifier specified for the request.
   */
  id: bigint
  /**
   *The callback which failed.
   */
  callback: Anonymize<I8mru2c22eqefg>
  /**
   *The error which occurred.
   */
  error: Anonymize<I9j620s5v5l35m>
}
export type I787j4cmbcfj1a = {
  /**
   *The origin of the messages.
   */
  origin: SS58String
  /**
   *The messages which were removed.
   */
  messages: Anonymize<Iafqnechp3omqg>
}
export type Ict7qc7viimd4r = Array<{
  id: Enum<{
    Council: Enum<{
      ProposalSubmission: undefined
    }>
    Preimage: PreimagePalletHoldReason
    Contracts: Enum<{
      CodeUploadDepositReserve: undefined
      StorageDepositReserve: undefined
    }>
    NftFractionalization: Enum<{
      Fractionalized: undefined
    }>
    Revive: Anonymize<I364se861k3md3>
    Messaging: Enum<{
      Messaging: undefined
    }>
  }>
  amount: bigint
}>
export type I364se861k3md3 = AnonymousEnum<{
  CodeUploadDepositReserve: undefined
  StorageDepositReserve: undefined
  AddressMapping: undefined
}>
export type Ie9j1itogtv7p5 = {
  amount: bigint
  beneficiary: SS58String
  valid_from: number
  expire_at: number
  status: Enum<{
    Pending: undefined
    Attempted: Anonymize<I3m5sq54sjdlso>
    Failed: undefined
  }>
}
export type I3m5sq54sjdlso = {}
export type Ibk6kh085vmll9 = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  ParachainSystem: Anonymize<I5kev21p7u6ajb>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  ParachainInfo: undefined
  Balances: Anonymize<I9svldsp29mh87>
  Treasury: Anonymize<I78c6gap1snbjh>
  Sudo: Anonymize<It4l0gt1nhrk9>
  Council: Anonymize<I5f4rh05l5fq9u>
  Motion: Anonymize<Ieqvb3qkb6uj7c>
  CollatorSelection: Anonymize<I9dpq5287dur8b>
  Session: Anonymize<I77dda7hps0u37>
  Scheduler: Anonymize<I6lkpeo220eeie>
  Preimage: Anonymize<If81ks88t5mpk5>
  XcmpQueue: Anonymize<Ib7tahn20bvsep>
  PolkadotXcm: Anonymize<I4up31a3q8cjhp>
  CumulusXcm: undefined
  MessageQueue: Anonymize<Ic2uoe7jdksosp>
  Ismp: Anonymize<I1g9mc02pcnc5d>
  IsmpParachain: Anonymize<I41rj1hc4lfv1r>
  Contracts: Anonymize<I6jivj2j5qp8sa>
  Proxy: Anonymize<I3fs4cv9m4ntif>
  Multisig: Anonymize<Ibeq0u50u4nha7>
  Utility: Anonymize<Icqed8h1g3g2i9>
  Nfts: Anonymize<I1k4il7i5elhc7>
  NftFractionalization: Anonymize<Ifrervtb291iin>
  Assets: Anonymize<I84851acvod2ic>
  Revive: Anonymize<Ib6kmmh2pgsi48>
  Fungibles: Anonymize<I40f5j8i48gohc>
  Messaging: Anonymize<Ibe6s087pv1dhb>
}>
export type I78c6gap1snbjh = AnonymousEnum<{
  /**
   *Propose and approve a spend of treasury funds.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
   *
   *### Details
   *NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
   *beneficiary.
   *
   *### Parameters
   *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
   *- `beneficiary`: The destination account for the transfer.
   *
   *## Events
   *
   *Emits [`Event::SpendApproved`] if successful.
   */
  spend_local: Anonymize<Icnrv1mfbd3in1>
  /**
   *Force a previously approved proposal to be removed from the approval queue.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::RejectOrigin`].
   *
   *## Details
   *
   *The original deposit will no longer be returned.
   *
   *### Parameters
   *- `proposal_id`: The index of a proposal
   *
   *### Complexity
   *- O(A) where `A` is the number of approvals
   *
   *### Errors
   *- [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
   *  approval queue, i.e., the proposal has not been approved. This could also mean the
   *  proposal does not exist altogether, thus there is no way it would have been approved
   *  in the first place.
   */
  remove_approval: Anonymize<Icm9m0qeemu66d>
  /**
   *Propose and approve a spend of treasury funds.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::SpendOrigin`] with the `Success` value being at least
   *`amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
   *for assertion using the [`Config::BalanceConverter`].
   *
   *## Details
   *
   *Create an approved spend for transferring a specific `amount` of `asset_kind` to a
   *designated beneficiary. The spend must be claimed using the `payout` dispatchable within
   *the [`Config::PayoutPeriod`].
   *
   *### Parameters
   *- `asset_kind`: An indicator of the specific asset class to be spent.
   *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
   *- `beneficiary`: The beneficiary of the spend.
   *- `valid_from`: The block number from which the spend can be claimed. It can refer to
   *  the past if the resulting spend has not yet expired according to the
   *  [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
   *  approval.
   *
   *## Events
   *
   *Emits [`Event::AssetSpendApproved`] if successful.
   */
  spend: Anonymize<I6qq5nnbjegi8u>
  /**
   *Claim a spend.
   *
   *## Dispatch Origin
   *
   *Must be signed
   *
   *## Details
   *
   *Spends must be claimed within some temporal bounds. A spend may be claimed within one
   *[`Config::PayoutPeriod`] from the `valid_from` block.
   *In case of a payout failure, the spend status must be updated with the `check_status`
   *dispatchable before retrying with the current function.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::Paid`] if successful.
   */
  payout: Anonymize<I666bl2fqjkejo>
  /**
   *Check the status of the spend and remove it from the storage if processed.
   *
   *## Dispatch Origin
   *
   *Must be signed.
   *
   *## Details
   *
   *The status check is a prerequisite for retrying a failed payout.
   *If a spend has either succeeded or expired, it is removed from the storage by this
   *function. In such instances, transaction fees are refunded.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::PaymentFailed`] if the spend payout has failed.
   *Emits [`Event::SpendProcessed`] if the spend payout has succeed.
   */
  check_status: Anonymize<I666bl2fqjkejo>
  /**
   *Void previously approved spend.
   *
   *## Dispatch Origin
   *
   *Must be [`Config::RejectOrigin`].
   *
   *## Details
   *
   *A spend void is only possible if the payout has not been attempted yet.
   *
   *### Parameters
   *- `index`: The spend index.
   *
   *## Events
   *
   *Emits [`Event::AssetSpendVoided`] if successful.
   */
  void_spend: Anonymize<I666bl2fqjkejo>
}>
export type I6qq5nnbjegi8u = {
  amount: bigint
  beneficiary: SS58String
  valid_from?: Anonymize<I4arjljr6dpflb>
}
export type It4l0gt1nhrk9 = AnonymousEnum<{
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   */
  sudo: Anonymize<Id8pf79kk0gqn5>
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   *This function does not check the weight of the call, and instead allows the
   *Sudo user to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_unchecked_weight: Anonymize<I2ahpqe4f8nqj1>
  /**
   *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
   *key.
   */
  set_key: Anonymize<I8k3rnvpeeh4hv>
  /**
   *Authenticates the sudo key and dispatches a function call with `Signed` origin from
   *a given account.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_as: Anonymize<I45o7tagkh6j2q>
  /**
   *Permanently removes the sudo key.
   *
   ***This cannot be un-done.**
   */
  remove_key: undefined
}>
export type Id8pf79kk0gqn5 = {
  call: TxCallData
}
export type I2ahpqe4f8nqj1 = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type I45o7tagkh6j2q = {
  who: MultiAddress
  call: TxCallData
}
export type I5f4rh05l5fq9u = AnonymousEnum<{
  /**
   *Set the collective's membership.
   *
   *- `new_members`: The new member list. Be nice to the chain and provide it sorted.
   *- `prime`: The prime member whose vote sets the default.
   *- `old_count`: The upper bound for the previous number of members in storage. Used for
   *  weight estimation.
   *
   *The dispatch of this call must be `SetMembersOrigin`.
   *
   *NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
   *      the weight estimations rely on it to estimate dispatchable weight.
   *
   *# WARNING:
   *
   *The `pallet-collective` can also be managed by logic outside of the pallet through the
   *implementation of the trait [`ChangeMembers`].
   *Any call to `set_members` must be careful that the member set doesn't get out of sync
   *with other logic managing the member set.
   *
   *## Complexity:
   *- `O(MP + N)` where:
   *  - `M` old-members-count (code- and governance-bounded)
   *  - `N` new-members-count (code- and governance-bounded)
   *  - `P` proposals-count (code-bounded)
   */
  set_members: Anonymize<I38jfk5li8iang>
  /**
   *Dispatch a proposal from a member using the `Member` origin.
   *
   *Origin must be a member of the collective.
   *
   *## Complexity:
   *- `O(B + M + P)` where:
   *- `B` is `proposal` size in bytes (length-fee-bounded)
   *- `M` members-count (code-bounded)
   *- `P` complexity of dispatching `proposal`
   */
  execute: Anonymize<Idamjnvf89b7tg>
  /**
   *Add a new proposal to either be voted on or executed directly.
   *
   *Requires the sender to be member.
   *
   *`threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *or put up for voting.
   *
   *## Complexity
   *- `O(B + M + P1)` or `O(B + M + P2)` where:
   *  - `B` is `proposal` size in bytes (length-fee-bounded)
   *  - `M` is members-count (code- and governance-bounded)
   *  - branching is influenced by `threshold` where:
   *    - `P1` is proposal execution complexity (`threshold < 2`)
   *    - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   */
  propose: Anonymize<Ibeupi46rev16l>
  /**
   *Add an aye or nay vote for the sender to the given proposal.
   *
   *Requires the sender to be a member.
   *
   *Transaction fees will be waived if the member is voting on any particular proposal
   *for the first time and the call is successful. Subsequent vote changes will charge a
   *fee.
   *## Complexity
   *- `O(M)` where `M` is members-count (code- and governance-bounded)
   */
  vote: Anonymize<I2dtrijkm5601t>
  /**
   *Disapprove a proposal, close, and remove it from the system, regardless of its current
   *state.
   *
   *Must be called by the Root origin.
   *
   *Parameters:
   ** `proposal_hash`: The hash of the proposal that should be disapproved.
   *
   *## Complexity
   *O(P) where P is the number of max proposals
   */
  disapprove_proposal: Anonymize<I2ev73t79f46tb>
  /**
   *Close a vote that is either approved, disapproved or whose voting period has ended.
   *
   *May be called by any signed account in order to finish voting and close the proposal.
   *
   *If called before the end of the voting period it will only close the vote if it is
   *has enough votes to be approved or disapproved.
   *
   *If called after the end of the voting period abstentions are counted as rejections
   *unless there is a prime member set and the prime member cast an approval.
   *
   *If the close operation completes successfully with disapproval, the transaction fee will
   *be waived. Otherwise execution of the approved operation will be charged to the caller.
   *
   *+ `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
   *proposal.
   *+ `length_bound`: The upper bound for the length of the proposal in storage. Checked via
   *`storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
   *
   *## Complexity
   *- `O(B + M + P1 + P2)` where:
   *  - `B` is `proposal` size in bytes (length-fee-bounded)
   *  - `M` is members-count (code- and governance-bounded)
   *  - `P1` is the complexity of `proposal` preimage.
   *  - `P2` is proposal-count (code-bounded)
   */
  close: Anonymize<Ib2obgji960euh>
  /**
   *Disapprove the proposal and burn the cost held for storing this proposal.
   *
   *Parameters:
   *- `origin`: must be the `KillOrigin`.
   *- `proposal_hash`: The hash of the proposal that should be killed.
   *
   *Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal.
   */
  kill: Anonymize<I2ev73t79f46tb>
  /**
   *Release the cost held for storing a proposal once the given proposal is completed.
   *
   *If there is no associated cost for the given proposal, this call will have no effect.
   *
   *Parameters:
   *- `origin`: must be `Signed` or `Root`.
   *- `proposal_hash`: The hash of the proposal.
   *
   *Emits `ProposalCostReleased` if any cost held for a given proposal.
   */
  release_proposal_cost: Anonymize<I2ev73t79f46tb>
}>
export type I38jfk5li8iang = {
  new_members: Anonymize<Ia2lhg7l2hilo3>
  prime?: Anonymize<Ihfphjolmsqq1>
  old_count: number
}
export type Idamjnvf89b7tg = {
  proposal: TxCallData
  length_bound: number
}
export type Ibeupi46rev16l = {
  threshold: number
  proposal: TxCallData
  length_bound: number
}
export type I2dtrijkm5601t = {
  proposal: FixedSizeBinary<32>
  index: number
  approve: boolean
}
export type Ib2obgji960euh = {
  proposal_hash: FixedSizeBinary<32>
  index: number
  proposal_weight_bound: Anonymize<I4q39t5hn830vp>
  length_bound: number
}
export type Ieqvb3qkb6uj7c = AnonymousEnum<{
  /**
   *Ensures the simple majority is met and dispatches a call with `Root` origin.
   *
   *# <weight>
   *- O(1).
   *- Limited storage reads.
   *- One DB write (event).
   *- Weight of derivative `call` execution.
   *# </weight>
   */
  simple_majority: Anonymize<Id8pf79kk0gqn5>
  /**
   *Ensures the super majority is met and dispatches a call with `Root` origin.
   *
   *# <weight>
   *- O(1).
   *- Limited storage reads.
   *- One DB write (event).
   *- Weight of derivative `call` execution.
   *# </weight>
   */
  super_majority: Anonymize<Id8pf79kk0gqn5>
  /**
   *Ensures unanimous voting is met and dispatches a call with `Root` origin.
   *
   *# <weight>
   *- O(1).
   *- Limited storage reads.
   *- One DB write (event).
   *- Weight of derivative `call` execution.
   *# </weight>
   */
  unanimous: Anonymize<Id8pf79kk0gqn5>
}>
export type I6lkpeo220eeie = AnonymousEnum<{
  /**
   *Anonymously schedule a task.
   */
  schedule: Anonymize<I39ghjgiq2dkl4>
  /**
   *Cancel an anonymously scheduled task.
   */
  cancel: Anonymize<I5n4sebgkfr760>
  /**
   *Schedule a named task.
   */
  schedule_named: Anonymize<Idigemtibvhakn>
  /**
   *Cancel a named scheduled task.
   */
  cancel_named: Anonymize<Ifs1i5fk9cqvr6>
  /**
   *Anonymously schedule a task after a delay.
   */
  schedule_after: Anonymize<I66kierssm8vch>
  /**
   *Schedule a named task after a delay.
   */
  schedule_named_after: Anonymize<I37e9npd9q3ddo>
  /**
   *Set a retry configuration for a task so that, in case its scheduled run fails, it will
   *be retried after `period` blocks, for a total amount of `retries` retries or until it
   *succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry: Anonymize<Ieg3fd8p4pkt10>
  /**
   *Set a retry configuration for a named task so that, in case its scheduled run fails, it
   *will be retried after `period` blocks, for a total amount of `retries` retries or until
   *it succeeds.
   *
   *Tasks which need to be scheduled for a retry are still subject to weight metering and
   *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
   *normally while the task is retrying.
   *
   *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
   *clones of the original task. Their retry configuration will be derived from the
   *original task's configuration, but will have a lower value for `remaining` than the
   *original `total_retries`.
   */
  set_retry_named: Anonymize<I8kg5ll427kfqq>
  /**
   *Removes the retry configuration of a task.
   */
  cancel_retry: Anonymize<I467333262q1l9>
  /**
   *Cancel the retry configuration of a named task.
   */
  cancel_retry_named: Anonymize<Ifs1i5fk9cqvr6>
}>
export type I39ghjgiq2dkl4 = {
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type Idigemtibvhakn = {
  id: FixedSizeBinary<32>
  when: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I66kierssm8vch = {
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I37e9npd9q3ddo = {
  id: FixedSizeBinary<32>
  after: number
  maybe_periodic?: Anonymize<Iep7au1720bm0e>
  priority: number
  call: TxCallData
}
export type I4up31a3q8cjhp = AnonymousEnum<{
  send: Anonymize<Ia5cotcvi888ln>
  /**
   *Teleport some assets from the local chain to some destination chain.
   *
   ***This function is deprecated: Use `limited_teleport_assets` instead.**
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
   *with all fees taken as needed from the asset.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` chain.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   */
  teleport_assets: Anonymize<I21jsa919m88fd>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve.
   *
   *`assets` must have same reserve location and may not be teleportable to `dest`.
   * - `assets` have local reserve: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `assets` have destination reserve: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
   *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
   *   to mint and deposit reserve-based assets to `beneficiary`.
   *
   ***This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
   *with all fees taken as needed from the asset.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   */
  reserve_transfer_assets: Anonymize<I21jsa919m88fd>
  /**
   *Execute an XCM message from a local, signed, origin.
   *
   *An event is deposited indicating whether `msg` could be executed completely or only
   *partially.
   *
   *No more than `max_weight` will be used in its attempted execution. If this is less than
   *the maximum amount of weight that the message could take to be executed, then no
   *execution attempt will be made.
   */
  execute: Anonymize<Iegif7m3upfe1k>
  /**
   *Extoll that a particular destination can be communicated with through a particular
   *version of XCM.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The destination that is being described.
   *- `xcm_version`: The latest version of XCM that `location` supports.
   */
  force_xcm_version: Anonymize<I9kt8c221c83ln>
  /**
   *Set a safe XCM version (the version that XCM should be encoded with if the most recent
   *version a destination can accept is unknown).
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
   */
  force_default_xcm_version: Anonymize<Ic76kfh5ebqkpl>
  /**
   *Ask a location to notify us regarding their XCM version and any changes to it.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The location to which we should subscribe for XCM version notifications.
   */
  force_subscribe_version_notify: Anonymize<Icscpmubum33bq>
  /**
   *Require that a particular destination should no longer notify us regarding any XCM
   *version changes.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `location`: The location to which we are currently subscribed for XCM version
   *  notifications which we no longer desire.
   */
  force_unsubscribe_version_notify: Anonymize<Icscpmubum33bq>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve.
   *
   *`assets` must have same reserve location and may not be teleportable to `dest`.
   * - `assets` have local reserve: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `assets` have destination reserve: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
   *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
   *   to mint and deposit reserve-based assets to `beneficiary`.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  limited_reserve_transfer_assets: Anonymize<I21d2olof7eb60>
  /**
   *Teleport some assets from the local chain to some destination chain.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` chain.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  limited_teleport_assets: Anonymize<I21d2olof7eb60>
  /**
   *Set or unset the global suspension state of the XCM executor.
   *
   *- `origin`: Must be an origin specified by AdminOrigin.
   *- `suspended`: `true` to suspend, `false` to resume.
   */
  force_suspension: Anonymize<Ibgm4rnf22lal1>
  /**
   *Transfer some assets from the local chain to the destination chain through their local,
   *destination or remote reserve, or through teleports.
   *
   *Fee payment on the destination side is made from the asset in the `assets` vector of
   *index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
   *`weight_limit` of weight. If more weight is needed than `weight_limit`, then the
   *operation will fail and the sent assets may be at risk.
   *
   *`assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
   *to `dest`, no limitations imposed on `fees`.
   * - for local reserve: transfer assets to sovereign account of destination chain and
   *   forward a notification XCM to `dest` to mint and deposit reserve-based assets to
   *   `beneficiary`.
   * - for destination reserve: burn local assets and forward a notification to `dest` chain
   *   to withdraw the reserve assets from this chain's sovereign account and deposit them
   *   to `beneficiary`.
   * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
   *   from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
   *   and deposit reserve-based assets to `beneficiary`.
   * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
   *   assets and deposit them to `beneficiary`.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `X2(Parent,
   *  Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
   *  from relay to parachain.
   *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
   *  generally be an `AccountId32` value.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
   *  fees.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  transfer_assets: Anonymize<I21d2olof7eb60>
  /**
   *Claims assets trapped on this pallet because of leftover assets during XCM execution.
   *
   *- `origin`: Anyone can call this extrinsic.
   *- `assets`: The exact assets that were trapped. Use the version to specify what version
   *was the latest when they were trapped.
   *- `beneficiary`: The location/account where the claimed assets will be deposited.
   */
  claim_assets: Anonymize<Ie68np0vpihith>
  /**
   *Transfer assets from the local chain to the destination chain using explicit transfer
   *types for assets and fees.
   *
   *`assets` must have same reserve location or may be teleportable to `dest`. Caller must
   *provide the `assets_transfer_type` to be used for `assets`:
   * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
   *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
   *   assets to `beneficiary`.
   * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
   *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
   *   deposit them to `beneficiary`.
   * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
   *   chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
   *   XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
   *   the remote `reserve` is Asset Hub.
   * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
   *   mint/teleport assets and deposit them to `beneficiary`.
   *
   *On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
   *buy execution using transferred `assets` identified by `remote_fees_id`.
   *Make sure enough of the specified `remote_fees_id` asset is included in the given list
   *of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
   *is needed than `weight_limit`, then the operation will fail and the sent assets may be
   *at risk.
   *
   *`remote_fees_id` may use different transfer type than rest of `assets` and can be
   *specified through `fees_transfer_type`.
   *
   *The caller needs to specify what should happen to the transferred assets once they reach
   *the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
   *contains the instructions to execute on `dest` as a final step.
   *  This is usually as simple as:
   *  `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
   *  but could be something more exotic like sending the `assets` even further.
   *
   *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
   *- `dest`: Destination context for the assets. Will typically be `[Parent,
   *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
   *  relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
   *  parachain across a bridge to another ecosystem destination.
   *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
   *  fee on the `dest` (and possibly reserve) chains.
   *- `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
   *- `remote_fees_id`: One of the included `assets` to be used to pay fees.
   *- `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
   *- `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
   *  transfer, which also determines what happens to the assets on the destination chain.
   *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
   */
  transfer_assets_using_type_and_then: Anonymize<I9bnv6lu0crf1q>
}>
export type Ia5cotcvi888ln = {
  dest: XcmVersionedLocation
  message: XcmVersionedXcm
}
export type XcmVersionedXcm = Enum<{
  V3: Anonymize<Ianvng4e08j9ii>
  V4: Anonymize<Iegrepoo0c1jc5>
  V5: Anonymize<Ict03eedr8de9s>
}>
export declare const XcmVersionedXcm: GetEnum<XcmVersionedXcm>
export type I21jsa919m88fd = {
  dest: XcmVersionedLocation
  beneficiary: XcmVersionedLocation
  assets: XcmVersionedAssets
  fee_asset_item: number
}
export type Iegif7m3upfe1k = {
  message: XcmVersionedXcm
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type Icscpmubum33bq = {
  location: XcmVersionedLocation
}
export type I21d2olof7eb60 = {
  dest: XcmVersionedLocation
  beneficiary: XcmVersionedLocation
  assets: XcmVersionedAssets
  fee_asset_item: number
  weight_limit: XcmV3WeightLimit
}
export type Ie68np0vpihith = {
  assets: XcmVersionedAssets
  beneficiary: XcmVersionedLocation
}
export type I9bnv6lu0crf1q = {
  dest: XcmVersionedLocation
  assets: XcmVersionedAssets
  assets_transfer_type: Enum<{
    Teleport: undefined
    LocalReserve: undefined
    DestinationReserve: undefined
    RemoteReserve: XcmVersionedLocation
  }>
  remote_fees_id: XcmVersionedAssetId
  fees_transfer_type: Enum<{
    Teleport: undefined
    LocalReserve: undefined
    DestinationReserve: undefined
    RemoteReserve: XcmVersionedLocation
  }>
  custom_xcm_on_dest: XcmVersionedXcm
  weight_limit: XcmV3WeightLimit
}
export type XcmVersionedAssetId = Enum<{
  V3: XcmV3MultiassetAssetId
  V4: Anonymize<I4c0s5cioidn76>
  V5: Anonymize<If9iqq7i64mur8>
}>
export declare const XcmVersionedAssetId: GetEnum<XcmVersionedAssetId>
export type I1g9mc02pcnc5d = AnonymousEnum<{
  /**
   *Execute the provided batch of ISMP messages, this will short-circuit and revert if any
   *of the provided messages are invalid. This is an unsigned extrinsic that permits anyone
   *execute ISMP messages for free, provided they have valid proofs and the messages have
   *not been previously processed.
   *
   *The dispatch origin for this call must be an unsigned one.
   *
   *- `messages`: the messages to handle or process.
   *
   *Emits different message events based on the Message received if successful.
   */
  handle_unsigned: Anonymize<I8upsupg73d8i4>
  /**
   *Create a consensus client, using a subjectively chosen consensus state. This can also
   *be used to overwrite an existing consensus state. The dispatch origin for this
   *call must be `T::AdminOrigin`.
   *
   *- `message`: [`CreateConsensusState`] struct.
   *
   *Emits [`Event::ConsensusClientCreated`] if successful.
   */
  create_consensus_client: Anonymize<I3ths77bld8nc8>
  /**
   *Modify the unbonding period and challenge period for a consensus state.
   *The dispatch origin for this call must be `T::AdminOrigin`.
   *
   *- `message`: `UpdateConsensusState` struct.
   */
  update_consensus_state: Anonymize<Ib5meainq870pm>
  /**
   *Add more funds to a message (request or response) to be used for delivery and execution.
   *
   *Should not be called on a message that has been completed (delivered or timed-out) as
   *those funds will be lost forever.
   */
  fund_message: Anonymize<I739ltdlbnqckb>
}>
export type I8upsupg73d8i4 = {
  messages: Array<
    Enum<{
      Consensus: Anonymize<Ilqg87gbv0ge4>
      FraudProof: {
        proof_1: Binary
        proof_2: Binary
        consensus_state_id: FixedSizeBinary<4>
      }
      Request: {
        requests: Array<Anonymize<I684i1f0bq33p6>>
        proof: Anonymize<I9n2v92qi4mqji>
        signer: Binary
      }
      Response: {
        datagram: Enum<{
          Request: Anonymize<Ianhcjhlrgugp>
          Response: Array<
            Enum<{
              Post: Anonymize<Ieormoqov9c0al>
              Get: {
                get: Anonymize<I9hm9675anglvq>
                values: Array<{
                  key: Binary
                  value?: Anonymize<Iabpgqcjikia83>
                }>
              }
            }>
          >
        }>
        proof: Anonymize<I9n2v92qi4mqji>
        signer: Binary
      }
      Timeout: Enum<{
        Post: {
          requests: Anonymize<Ianhcjhlrgugp>
          timeout_proof: Anonymize<I9n2v92qi4mqji>
        }
        PostResponse: {
          responses: Array<Anonymize<Ieormoqov9c0al>>
          timeout_proof: Anonymize<I9n2v92qi4mqji>
        }
        Get: {
          requests: Anonymize<Ianhcjhlrgugp>
        }
      }>
    }>
  >
}
export type Ilqg87gbv0ge4 = {
  consensus_proof: Binary
  consensus_state_id: FixedSizeBinary<4>
  signer: Binary
}
export type I684i1f0bq33p6 = {
  source: Anonymize<I25ubidgt5kbu2>
  dest: Anonymize<I25ubidgt5kbu2>
  nonce: bigint
  from: Binary
  to: Binary
  timeout_timestamp: bigint
  body: Binary
}
export type I9n2v92qi4mqji = {
  height: Anonymize<I7jr7fpe101ton>
  proof: Binary
}
export type Ianhcjhlrgugp = Array<
  Enum<{
    Post: Anonymize<I684i1f0bq33p6>
    Get: Anonymize<I9hm9675anglvq>
  }>
>
export type I9hm9675anglvq = {
  source: Anonymize<I25ubidgt5kbu2>
  dest: Anonymize<I25ubidgt5kbu2>
  nonce: bigint
  from: Binary
  keys: Anonymize<Itom7fk49o0c9>
  height: bigint
  context: Binary
  timeout_timestamp: bigint
}
export type Ieormoqov9c0al = {
  post: Anonymize<I684i1f0bq33p6>
  response: Binary
  timeout_timestamp: bigint
}
export type I3ths77bld8nc8 = {
  message: {
    consensus_state: Binary
    consensus_client_id: FixedSizeBinary<4>
    consensus_state_id: FixedSizeBinary<4>
    unbonding_period: bigint
    challenge_periods: Anonymize<I2h8un11jpeic1>
    state_machine_commitments: Array<
      [
        Anonymize<I58bf8c7kp5i84>,
        {
          commitment: Anonymize<Idqnu98dduluv8>
          height: bigint
        },
      ]
    >
  }
}
export type I2h8un11jpeic1 = Array<[Anonymize<I25ubidgt5kbu2>, bigint]>
export type Idqnu98dduluv8 = {
  timestamp: bigint
  overlay_root?: Anonymize<I4s6vifaf8k998>
  state_root: FixedSizeBinary<32>
}
export type Ib5meainq870pm = {
  message: {
    consensus_state_id: FixedSizeBinary<4>
    unbonding_period?: Anonymize<I35p85j063s0il>
    challenge_periods: Anonymize<I2h8un11jpeic1>
  }
}
export type I739ltdlbnqckb = {
  message: {
    commitment: Enum<{
      Request: FixedSizeBinary<32>
      Response: FixedSizeBinary<32>
    }>
    amount: bigint
  }
}
export type I41rj1hc4lfv1r = AnonymousEnum<{
  /**
   *This allows block builders submit parachain consensus proofs as inherents. If the
   *provided [`ConsensusMessage`] is not for a parachain, this call will fail.
   */
  update_parachain_consensus: Anonymize<I5nk49fqq83rft>
  /**
   *Add some new parachains to the parachains whitelist
   */
  add_parachain: Anonymize<Ivalbtb85o2h0>
  /**
   *Removes some parachains from the parachains whitelist
   */
  remove_parachain: Anonymize<Ic8hk838gccoml>
}>
export type I5nk49fqq83rft = {
  data: Anonymize<Ilqg87gbv0ge4>
}
export type I6jivj2j5qp8sa = AnonymousEnum<{
  /**
   *Deprecated version if [`Self::call`] for use in an in-storage `Call`.
   */
  call_old_weight: Anonymize<Ia2rnh5pfua40a>
  /**
   *Deprecated version if [`Self::instantiate_with_code`] for use in an in-storage `Call`.
   */
  instantiate_with_code_old_weight: Anonymize<I3otc7e9a35k1k>
  /**
   *Deprecated version if [`Self::instantiate`] for use in an in-storage `Call`.
   */
  instantiate_old_weight: Anonymize<I89ier5tb9ne0s>
  /**
   *Upload new `code` without instantiating a contract from it.
   *
   *If the code does not already exist a deposit is reserved from the caller
   *and unreserved only when [`Self::remove_code`] is called. The size of the reserve
   *depends on the size of the supplied `code`.
   *
   *If the code already exists in storage it will still return `Ok` and upgrades
   *the in storage version to the current
   *[`InstructionWeights::version`](InstructionWeights).
   *
   *- `determinism`: If this is set to any other value but [`Determinism::Enforced`] then
   *  the only way to use this code is to delegate call into it from an offchain execution.
   *  Set to [`Determinism::Enforced`] if in doubt.
   *
   *# Note
   *
   *Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
   *To avoid this situation a constructor could employ access control so that it can
   *only be instantiated by permissioned entities. The same is true when uploading
   *through [`Self::instantiate_with_code`].
   *
   *Use [`Determinism::Relaxed`] exclusively for non-deterministic code. If the uploaded
   *code is deterministic, specifying [`Determinism::Relaxed`] will be disregarded and
   *result in higher gas costs.
   */
  upload_code: Anonymize<Im2f0numhevg3>
  /**
   *Remove the code stored under `code_hash` and refund the deposit to its owner.
   *
   *A code can only be removed by its original uploader (its owner) and only if it is
   *not used by any contract.
   */
  remove_code: Anonymize<Ib51vk42m1po4n>
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
  set_code: Anonymize<I2agkcpojhkk43>
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
  call: Anonymize<I32rvg545edabm>
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
   ** `salt`: Used for the address derivation. See [`Pallet::contract_address`].
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
  instantiate_with_code: Anonymize<I83fv0vi59md7i>
  /**
   *Instantiates a contract from a previously deployed wasm binary.
   *
   *This function is identical to [`Self::instantiate_with_code`] but without the
   *code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
   *must be supplied.
   */
  instantiate: Anonymize<I5tjjqcdd4tae0>
  /**
   *When a migration is in progress, this dispatchable can be used to run migration steps.
   *Calls that contribute to advancing the migration have their fees waived, as it's helpful
   *for the chain. Note that while the migration is in progress, the pallet will also
   *leverage the `on_idle` hooks to run migration steps.
   */
  migrate: Anonymize<I1894dm1lf1ae7>
}>
export type Ia2rnh5pfua40a = {
  dest: MultiAddress
  value: bigint
  gas_limit: bigint
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  data: Binary
}
export type I3otc7e9a35k1k = {
  value: bigint
  gas_limit: bigint
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  code: Binary
  data: Binary
  salt: Binary
}
export type I89ier5tb9ne0s = {
  value: bigint
  gas_limit: bigint
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  code_hash: FixedSizeBinary<32>
  data: Binary
  salt: Binary
}
export type Im2f0numhevg3 = {
  code: Binary
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  determinism: Anonymize<I2dfliekq1ed7e>
}
export type I2dfliekq1ed7e = AnonymousEnum<{
  Enforced: undefined
  Relaxed: undefined
}>
export type I2agkcpojhkk43 = {
  dest: MultiAddress
  code_hash: FixedSizeBinary<32>
}
export type I32rvg545edabm = {
  dest: MultiAddress
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  data: Binary
}
export type I83fv0vi59md7i = {
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  code: Binary
  data: Binary
  salt: Binary
}
export type I5tjjqcdd4tae0 = {
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit?: Anonymize<I35p85j063s0il>
  code_hash: FixedSizeBinary<32>
  data: Binary
  salt: Binary
}
export type I1894dm1lf1ae7 = {
  weight_limit: Anonymize<I4q39t5hn830vp>
}
export type I3fs4cv9m4ntif = AnonymousEnum<{
  /**
   *Dispatch the given `call` from an account that the sender is authorised for through
   *`add_proxy`.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy: Anonymize<I9e3ie6m2s48rj>
  /**
   *Register a proxy account for the sender that is able to make calls on its behalf.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to make a proxy.
   *- `proxy_type`: The permissions allowed for this proxy account.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   */
  add_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister a proxy account for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `proxy`: The account that the `caller` would like to remove as a proxy.
   *- `proxy_type`: The permissions currently enabled for the removed proxy account.
   */
  remove_proxy: Anonymize<Iovrcu9bfelfq>
  /**
   *Unregister all proxy accounts for the sender.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *WARNING: This may be called on accounts created by `pure`, however if done, then
   *the unreserved fees will be inaccessible. **All access to this account will be lost.**
   */
  remove_proxies: undefined
  /**
   *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
   *initialize it with a proxy of `proxy_type` for `origin` sender.
   *
   *Requires a `Signed` origin.
   *
   *- `proxy_type`: The type of the proxy that the sender will be registered as over the
   *new account. This will almost always be the most permissive `ProxyType` possible to
   *allow for maximum flexibility.
   *- `index`: A disambiguation index, in case this is called multiple times in the same
   *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
   *want to use `0`.
   *- `delay`: The announcement period required of the initial proxy. Will generally be
   *zero.
   *
   *Fails with `Duplicate` if this has already been called in this transaction, from the
   *same sender, with the same parameters.
   *
   *Fails if there are insufficient funds to pay for deposit.
   */
  create_pure: Anonymize<Iefr8jgtgfk8um>
  /**
   *Removes a previously spawned pure proxy.
   *
   *WARNING: **All access to this account will be lost.** Any funds held in it will be
   *inaccessible.
   *
   *Requires a `Signed` origin, and the sender account must have been created by a call to
   *`pure` with corresponding parameters.
   *
   *- `spawner`: The account that originally called `pure` to create this account.
   *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
   *- `proxy_type`: The proxy type originally passed to `pure`.
   *- `height`: The height of the chain when the call to `pure` was processed.
   *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
   *
   *Fails with `NoPermission` in case the caller is not a previously created pure
   *account whose `pure` call has corresponding parameters.
   */
  kill_pure: Anonymize<I3j05hul54uj7q>
  /**
   *Publish the hash of a proxy-call that will be made in the future.
   *
   *This must be called some number of blocks before the corresponding `proxy` is attempted
   *if the delay associated with the proxy relationship is greater than zero.
   *
   *No more than `MaxPending` announcements may be made at any one time.
   *
   *This will take a deposit of `AnnouncementDepositFactor` as well as
   *`AnnouncementDepositBase` if there are no other pending announcements.
   *
   *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  announce: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove a given announcement.
   *
   *May be called by a proxy account to remove a call they previously announced and return
   *the deposit.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `call_hash`: The hash of the call to be made by the `real` account.
   */
  remove_announcement: Anonymize<I2eb501t8s6hsq>
  /**
   *Remove the given announcement of a delegate.
   *
   *May be called by a target (proxied) account to remove a call that one of their delegates
   *(`delegate`) has announced they want to execute. The deposit is returned.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `delegate`: The account that previously announced the call.
   *- `call_hash`: The hash of the call to be made.
   */
  reject_announcement: Anonymize<Ianmuoljk2sk1u>
  /**
   *Dispatch the given `call` from an account that the sender is authorized for through
   *`add_proxy`.
   *
   *Removes any corresponding announcement(s).
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *Parameters:
   *- `real`: The account that the proxy will make a call on behalf of.
   *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
   *- `call`: The call to be made by the `real` account.
   */
  proxy_announced: Anonymize<I12jci5m2cg0ra>
}>
export type I9e3ie6m2s48rj = {
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type I12jci5m2cg0ra = {
  delegate: MultiAddress
  real: MultiAddress
  force_proxy_type?: Anonymize<I7rk1n3vg3et43>
  call: TxCallData
}
export type Ibeq0u50u4nha7 = AnonymousEnum<{
  /**
   *Immediately dispatch a multi-signature call using a single approval from the caller.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `other_signatories`: The accounts (other than the sender) who are part of the
   *multi-signature, but do not participate in the approval process.
   *- `call`: The call to be executed.
   *
   *Result is equivalent to the dispatched result.
   *
   *## Complexity
   *O(Z + C) where Z is the length of the call and C its execution weight.
   */
  as_multi_threshold_1: Anonymize<I2i11lc3nmm2kh>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *If there are enough, then dispatch the call.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call`: The call to be executed.
   *
   *NOTE: Unless this is the final approval, you will generally want to use
   *`approve_as_multi` instead, since it only requires a hash of the call.
   *
   *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *on success, result is `Ok` and the result from the interior call, if it was executed,
   *may be found in the deposited `MultisigExecuted` event.
   *
   *## Complexity
   *- `O(S + Z + Call)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- The weight of the `call`.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  as_multi: Anonymize<I20q49clmhqcq1>
  /**
   *Register approval for a dispatch to be made from a deterministic composite account if
   *approved by a total of `threshold - 1` of `other_signatories`.
   *
   *Payment: `DepositBase` will be reserved if this is the first approval, plus
   *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *is cancelled.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *not the first approval, then it must be `Some`, with the timepoint (block number and
   *transaction index) of the first approval transaction.
   *- `call_hash`: The hash of the call to be executed.
   *
   *NOTE: If this is the final approval, you will want to use `as_multi` instead.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- Up to one binary search and insert (`O(logS + S)`).
   *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *- One event.
   *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   */
  approve_as_multi: Anonymize<Ideaemvoneh309>
  /**
   *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
   *for this operation will be unreserved on success.
   *
   *The dispatch origin for this call must be _Signed_.
   *
   *- `threshold`: The total number of approvals for this dispatch before it is executed.
   *- `other_signatories`: The accounts (other than the sender) who can approve this
   *dispatch. May not be empty.
   *- `timepoint`: The timepoint (block number and transaction index) of the first approval
   *transaction for this dispatch.
   *- `call_hash`: The hash of the call to be executed.
   *
   *## Complexity
   *- `O(S)`.
   *- Up to one balance-reserve or unreserve operation.
   *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *- One encode & hash, both of complexity `O(S)`.
   *- One event.
   *- I/O: 1 read `O(S)`, one remove.
   *- Storage: removes one item.
   */
  cancel_as_multi: Anonymize<I3d9o9d7epp66v>
}>
export type I2i11lc3nmm2kh = {
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  call: TxCallData
}
export type I20q49clmhqcq1 = {
  threshold: number
  other_signatories: Anonymize<Ia2lhg7l2hilo3>
  maybe_timepoint?: Anonymize<I95jfd8j5cr5eh>
  call: TxCallData
  max_weight: Anonymize<I4q39t5hn830vp>
}
export type Icqed8h1g3g2i9 = AnonymousEnum<{
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
  batch: Anonymize<Iefvcot44cm0ts>
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
  as_derivative: Anonymize<Ieslqe1cb18gq6>
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
  batch_all: Anonymize<Iefvcot44cm0ts>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<Ifiktfqev0bd2m>
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
  force_batch: Anonymize<Iefvcot44cm0ts>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<I2ahpqe4f8nqj1>
}>
export type Iefvcot44cm0ts = {
  calls: Array<TxCallData>
}
export type Ieslqe1cb18gq6 = {
  index: number
  call: TxCallData
}
export type Ifiktfqev0bd2m = {
  as_origin: Anonymize<If6j1n7bq9ipac>
  call: TxCallData
}
export type If6j1n7bq9ipac = AnonymousEnum<{
  system: DispatchRawOrigin
  Council: Enum<{
    Members: Anonymize<I9jd27rnpm8ttv>
    Member: SS58String
    _Phantom: undefined
  }>
  PolkadotXcm: Enum<{
    Xcm: Anonymize<If9iqq7i64mur8>
    Response: Anonymize<If9iqq7i64mur8>
  }>
  CumulusXcm: Anonymize<I3in0d0lb61qi8>
  Void: undefined
}>
export type Ifrervtb291iin = AnonymousEnum<{
  /**
   *Lock the NFT and mint a new fungible asset.
   *
   *The dispatch origin for this call must be Signed.
   *The origin must be the owner of the NFT they are trying to lock.
   *
   *`Deposit` funds of sender are reserved.
   *
   *- `nft_collection_id`: The ID used to identify the collection of the NFT.
   *Is used within the context of `pallet_nfts`.
   *- `nft_id`: The ID used to identify the NFT within the given collection.
   *Is used within the context of `pallet_nfts`.
   *- `asset_id`: The ID of the new asset. It must not exist.
   *Is used within the context of `pallet_assets`.
   *- `beneficiary`: The account that will receive the newly created asset.
   *- `fractions`: The total issuance of the newly created asset class.
   *
   *Emits `NftFractionalized` event when successful.
   */
  fractionalize: Anonymize<I9gf2bs80kgbnk>
  /**
   *Burn the total issuance of the fungible asset and return (unlock) the locked NFT.
   *
   *The dispatch origin for this call must be Signed.
   *
   *`Deposit` funds will be returned to `asset_creator`.
   *
   *- `nft_collection_id`: The ID used to identify the collection of the NFT.
   *Is used within the context of `pallet_nfts`.
   *- `nft_id`: The ID used to identify the NFT within the given collection.
   *Is used within the context of `pallet_nfts`.
   *- `asset_id`: The ID of the asset being returned and destroyed. Must match
   *the original ID of the created asset, corresponding to the NFT.
   *Is used within the context of `pallet_assets`.
   *- `beneficiary`: The account that will receive the unified NFT.
   *
   *Emits `NftUnified` event when successful.
   */
  unify: Anonymize<I5urb3tva4ave5>
}>
export type I9gf2bs80kgbnk = {
  nft_collection_id: number
  nft_id: number
  asset_id: number
  beneficiary: MultiAddress
  fractions: bigint
}
export type I5urb3tva4ave5 = {
  nft_collection_id: number
  nft_id: number
  asset_id: number
  beneficiary: MultiAddress
}
export type Ib6kmmh2pgsi48 = AnonymousEnum<{
  /**
   *A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
   *
   *# Parameters
   *
   ** `payload`: The RLP-encoded [`crate::evm::TransactionLegacySigned`].
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
  eth_transact: Anonymize<I1r5bjl4so2h37>
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
  call: Anonymize<Idsg8aod8e8fqn>
  /**
   *Instantiates a contract from a previously deployed wasm binary.
   *
   *This function is identical to [`Self::instantiate_with_code`] but without the
   *code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
   *must be supplied.
   */
  instantiate: Anonymize<I46nktn22m6hbi>
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
  instantiate_with_code: Anonymize<Ibgj1cthra7lte>
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
  upload_code: Anonymize<I10ra4g1rl6k2f>
  /**
   *Remove the code stored under `code_hash` and refund the deposit to its owner.
   *
   *A code can only be removed by its original uploader (its owner) and only if it is
   *not used by any contract.
   */
  remove_code: Anonymize<Ib51vk42m1po4n>
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
  set_code: Anonymize<I1uihehkdsggvp>
  /**
   *Register the callers account id so that it can be used in contract interactions.
   *
   *This will error if the origin is already mapped or is a eth native `Address20`. It will
   *take a deposit that can be released by calling [`Self::unmap_account`].
   */
  map_account: undefined
  /**
   *Unregister the callers account id in order to free the deposit.
   *
   *There is no reason to ever call this function other than freeing up the deposit.
   *This is only useful when the account should no longer be used.
   */
  unmap_account: undefined
  /**
   *Dispatch an `call` with the origin set to the callers fallback address.
   *
   *Every `AccountId32` can control its corresponding fallback account. The fallback account
   *is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
   *recovery function in case an `AccountId20` was used without creating a mapping first.
   */
  dispatch_as_fallback_account: Anonymize<Id8pf79kk0gqn5>
}>
export type I1r5bjl4so2h37 = {
  payload: Binary
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit: bigint
}
export type Idsg8aod8e8fqn = {
  dest: FixedSizeBinary<20>
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit: bigint
  data: Binary
}
export type I46nktn22m6hbi = {
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit: bigint
  code_hash: FixedSizeBinary<32>
  data: Binary
  salt?: Anonymize<I4s6vifaf8k998>
}
export type Ibgj1cthra7lte = {
  value: bigint
  gas_limit: Anonymize<I4q39t5hn830vp>
  storage_deposit_limit: bigint
  code: Binary
  data: Binary
  salt?: Anonymize<I4s6vifaf8k998>
}
export type I10ra4g1rl6k2f = {
  code: Binary
  storage_deposit_limit: bigint
}
export type I1uihehkdsggvp = {
  dest: FixedSizeBinary<20>
  code_hash: FixedSizeBinary<32>
}
export type I40f5j8i48gohc = AnonymousEnum<{
  /**
   *Transfers `value` amount of tokens from the caller's account to account `to`.
   *
   *# Parameters
   *- `token` - The token to transfer.
   *- `to` - The recipient account.
   *- `value` - The number of tokens to transfer.
   */
  transfer: Anonymize<I9tbfhd14k3gir>
  /**
   *Transfers `value` amount tokens on behalf of `from` to account `to` with additional
   *`data` in unspecified format.
   *
   *# Parameters
   *- `token` - The token to transfer.
   *- `from` - The account from which the token balance will be withdrawn.
   *- `to` - The recipient account.
   *- `value` - The number of tokens to transfer.
   */
  transfer_from: Anonymize<I7skr1ar9c2b3r>
  /**
   *Approves `spender` to spend `value` amount of tokens on behalf of the caller.
   *
   *# Parameters
   *- `token` - The token to approve.
   *- `spender` - The account that is allowed to spend the tokens.
   *- `value` - The number of tokens to approve.
   */
  approve: Anonymize<Iersu5s46p8jg1>
  /**
   *Increases the allowance of `spender` by `value` amount of tokens.
   *
   *# Parameters
   *- `token` - The token to have an allowance increased.
   *- `spender` - The account that is allowed to spend the tokens.
   *- `value` - The number of tokens to increase the allowance by.
   */
  increase_allowance: Anonymize<Iersu5s46p8jg1>
  /**
   *Decreases the allowance of `spender` by `value` amount of tokens.
   *
   *# Parameters
   *- `token` - The token to have an allowance decreased.
   *- `spender` - The account that is allowed to spend the tokens.
   *- `value` - The number of tokens to decrease the allowance by.
   */
  decrease_allowance: Anonymize<Iersu5s46p8jg1>
  /**
   *Create a new token with a given identifier.
   *
   *# Parameters
   *- `id` - The identifier of the token.
   *- `admin` - The account that will administer the token.
   *- `min_balance` - The minimum balance required for accounts holding this token.
   */
  create: Anonymize<I2obi88g7eeev0>
  /**
   *Start the process of destroying a token.
   *
   *# Parameters
   *- `token` - The token to be destroyed.
   */
  start_destroy: Anonymize<I1rvj8qc6u04i2>
  /**
   *Set the metadata for a token.
   *
   *# Parameters
   *- `token`: The token to update.
   *- `name`: The user friendly name of this token.
   *- `symbol`: The exchange symbol for this token.
   *- `decimals`: The number of decimals this token uses to represent one unit.
   */
  set_metadata: Anonymize<I7m4m3sn3ouhp0>
  /**
   *Clear the metadata for a token.
   *
   *# Parameters
   *- `token` - The token to update.
   */
  clear_metadata: Anonymize<I1rvj8qc6u04i2>
  /**
   *Creates `value` amount of tokens and assigns them to `account`, increasing the total
   *supply.
   *
   *# Parameters
   *- `token` - The token to mint.
   *- `account` - The account to be credited with the created tokens.
   *- `value` - The number of tokens to mint.
   */
  mint: Anonymize<Ifiphvnhbdlk4m>
  /**
   *Destroys `value` amount of tokens from `account`, reducing the total supply.
   *
   *# Parameters
   *- `token` - the token to burn.
   *- `account` - The account from which the tokens will be destroyed.
   *- `value` - The number of tokens to destroy.
   */
  burn: Anonymize<Ifiphvnhbdlk4m>
}>
export type I9tbfhd14k3gir = {
  token: number
  to: SS58String
  value: bigint
}
export type I7skr1ar9c2b3r = {
  token: number
  from: SS58String
  to: SS58String
  value: bigint
}
export type Iersu5s46p8jg1 = {
  token: number
  spender: SS58String
  value: bigint
}
export type I2obi88g7eeev0 = {
  id: number
  admin: SS58String
  min_balance: bigint
}
export type I1rvj8qc6u04i2 = {
  token: number
}
export type I7m4m3sn3ouhp0 = {
  token: number
  name: Binary
  symbol: Binary
  decimals: number
}
export type Ifiphvnhbdlk4m = {
  token: number
  account: SS58String
  value: bigint
}
export type Ibe6s087pv1dhb = AnonymousEnum<{
  send: Anonymize<I4ov6e94l79mbg>
  ismp_get: Anonymize<I21mg138mq0dm1>
  ismp_post: Anonymize<Ibcgh77idehr6f>
  xcm_new_query: Anonymize<Ia72crscsnehc6>
  xcm_response: Anonymize<Iasr6pj6shs0fl>
  remove: Anonymize<I3iv5pqub2hu31>
}>
export type I21mg138mq0dm1 = {
  id: bigint
  message: {
    dest: number
    height: number
    timeout: bigint
    context: Binary
    keys: Anonymize<Itom7fk49o0c9>
  }
  fee: bigint
  callback?: Anonymize<I7fiq10lpou70j>
}
export type Ibcgh77idehr6f = {
  id: bigint
  message: {
    dest: number
    timeout: bigint
    data: Binary
  }
  fee: bigint
  callback?: Anonymize<I7fiq10lpou70j>
}
export type Ia72crscsnehc6 = {
  id: bigint
  responder: Anonymize<If9iqq7i64mur8>
  timeout: number
  callback?: Anonymize<I7fiq10lpou70j>
}
export type I3iv5pqub2hu31 = {
  messages: Anonymize<Iafqnechp3omqg>
}
export type Ifvqn3ldat80ai = [SS58String, undefined]
export type I99bb69usss9gs = {
  index: number
  threshold: number
  ayes: Anonymize<Ia2lhg7l2hilo3>
  nays: Anonymize<Ia2lhg7l2hilo3>
  end: number
}
export type Icq35sqpqi9623 = Array<
  | {
      maybe_id?: Anonymize<I4s6vifaf8k998>
      priority: number
      call: PreimagesBounded
      maybe_periodic?: Anonymize<Iep7au1720bm0e>
      origin: Anonymize<If6j1n7bq9ipac>
    }
  | undefined
>
export type I5qfubnuvrnqn6 = AnonymousEnum<{
  Pending: {
    responder: XcmVersionedLocation
    maybe_match_querier?: XcmVersionedLocation | undefined
    maybe_notify?: Anonymize<I1faufi0iffstp>
    timeout: number
  }
  VersionNotifier: {
    origin: XcmVersionedLocation
    is_active: boolean
  }
  Ready: {
    response: Enum<{
      V3: XcmV3Response
      V4: XcmV4Response
      V5: Anonymize<I7vucpgm2c6959>
    }>
    at: number
  }
}>
export type I8t3u2dv73ahbd = [number, XcmVersionedLocation]
export type Ie0rpl5bahldfk = Array<[XcmVersionedLocation, number]>
export type I7e5oaj2qi4kl1 = {
  amount: bigint
  owner: XcmVersionedLocation
  locker: XcmVersionedLocation
  consumers: Anonymize<I2ia97v5nng96b>
}
export type Ie849h3gncgvok = [number, SS58String, XcmVersionedAssetId]
export type Iat62vud7hlod2 = Array<[bigint, XcmVersionedLocation]>
export type I5kulbesqc1h1t = {
  owner: SS58String
  deposit: bigint
  refcount: bigint
  determinism: Anonymize<I2dfliekq1ed7e>
  code_len: number
}
export type I36dvimehsh2tm = {
  trie_id: Binary
  code_hash: FixedSizeBinary<32>
  storage_bytes: number
  storage_items: number
  storage_byte_deposit: bigint
  storage_item_deposit: bigint
  storage_base_deposit: bigint
  delegate_dependencies: Anonymize<I3geksg000c171>
}
export type I8t4pajubp34g3 = {
  insert_counter: number
  delete_counter: number
}
export type I1b2ckfeib3nig = {
  asset: number
  fractions: bigint
  deposit: bigint
  asset_creator: SS58String
}
export type Ifffvds72jdcre = {
  owner: SS58String
  deposit: bigint
  refcount: bigint
  code_len: number
  api_version: number
  behaviour_version: number
}
export type I3eg7tau01jhnb = {
  trie_id: Binary
  code_hash: FixedSizeBinary<32>
  storage_bytes: number
  storage_items: number
  storage_byte_deposit: bigint
  storage_item_deposit: bigint
  storage_base_deposit: bigint
  delegate_dependencies: Anonymize<I3geksg000c171>
  immutable_data_len: number
}
export type Ib1ql4t5slo00r = AnonymousEnum<{
  Ismp: {
    commitment: FixedSizeBinary<32>
    callback?: Anonymize<I7fiq10lpou70j>
    deposit: bigint
  }
  IsmpTimedOut: {
    commitment: FixedSizeBinary<32>
    deposit: bigint
  }
  IsmpResponse: {
    commitment: FixedSizeBinary<32>
    deposit: bigint
    response: Binary
  }
  XcmQuery: {
    query_id: bigint
    callback?: Anonymize<I7fiq10lpou70j>
    deposit: bigint
  }
  XcmResponse: {
    query_id: bigint
    deposit: bigint
    response: Anonymize<I7vucpgm2c6959>
  }
}>
export type I4fo08joqmcqnm = {
  spec_name: string
  impl_name: string
  authoring_version: number
  spec_version: number
  impl_version: number
  apis: Anonymize<Ic9hg6pp5pkea5>
  transaction_version: number
  system_version: number
}
export type Ijc5n210o8bbf = {
  limits: {
    event_topics: number
    memory_pages: number
    subject_len: number
    payload_len: number
    runtime_memory: number
    validator_runtime_memory: number
    event_ref_time: bigint
  }
  instruction_weights: number
}
export type Iabiqg569vk0k = Array<{
  phase: Phase
  event: Enum<{
    System: Anonymize<Ibhp2392vtqo2b>
    Utility: Anonymize<I4l97tr8rl1un2>
    Balances: Anonymize<Iao8h4hv7atnq3>
    TransactionPayment: TransactionPaymentEvent
    Sudo: Anonymize<I5650l5diig748>
    Revive: Anonymize<I3vl9org1c535t>
    Assets: Anonymize<I6avancvg8fd05>
  }>
  topics: Anonymize<Ic5m5lp1oioo8r>
}>
export type Ibhp2392vtqo2b = AnonymousEnum<{
  /**
   *An extrinsic completed successfully.
   */
  ExtrinsicSuccess: Anonymize<Ia82mnkmeo2rhc>
  /**
   *An extrinsic failed.
   */
  ExtrinsicFailed: Anonymize<Id41b1nccqdhkb>
  /**
   *`:code` was updated.
   */
  CodeUpdated: undefined
  /**
   *A new account was created.
   */
  NewAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *An account was reaped.
   */
  KilledAccount: Anonymize<Icbccs0ug47ilf>
  /**
   *On on-chain remark happened.
   */
  Remarked: Anonymize<I855j4i3kr8ko1>
  /**
   *An upgrade was authorized.
   */
  UpgradeAuthorized: Anonymize<Ibgl04rn6nbfm6>
  /**
   *An invalid authorized upgrade was rejected while trying to apply it.
   */
  RejectedInvalidAuthorizedUpgrade: Anonymize<I27io5p4nt3tn4>
}>
export type Id41b1nccqdhkb = {
  dispatch_error: Anonymize<Ia19hov8g2tmuu>
  dispatch_info: Anonymize<Ic9s8f85vjtncc>
}
export type Ia19hov8g2tmuu = AnonymousEnum<{
  Other: undefined
  CannotLookup: undefined
  BadOrigin: undefined
  Module: Enum<{
    System: Anonymize<I5o0s7c8q1cc9b>
    RandomnessCollectiveFlip: undefined
    Utility: Anonymize<I8dt2g2hcrgh36>
    Timestamp: undefined
    Balances: Anonymize<Idj13i7adlomht>
    Authorship: undefined
    TransactionPayment: undefined
    Sudo: Anonymize<Iaug04qjhbli00>
    Revive: Anonymize<Icrbvluqac3l8s>
    Assets: Anonymize<Ieqmcndp78shme>
  }>
  ConsumerRemaining: undefined
  NoProviders: undefined
  TooManyConsumers: undefined
  Token: TokenError
  Arithmetic: ArithmeticError
  Transactional: TransactionalError
  Exhausted: undefined
  Corruption: undefined
  Unavailable: undefined
  RootNotAllowed: undefined
  Trie: Anonymize<Idh4cj79bvroj8>
}>
export type Icrbvluqac3l8s = AnonymousEnum<{
  /**
   *Invalid schedule supplied, e.g. with zero weight of a basic operation.
   */
  InvalidSchedule: undefined
  /**
   *Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
   */
  InvalidCallFlags: undefined
  /**
   *The executed contract exhausted its gas limit.
   */
  OutOfGas: undefined
  /**
   *Performing the requested transfer failed. Probably because there isn't enough
   *free balance in the sender's account.
   */
  TransferFailed: undefined
  /**
   *Performing a call was denied because the calling depth reached the limit
   *of what is specified in the schedule.
   */
  MaxCallDepthReached: undefined
  /**
   *No contract was found at the specified address.
   */
  ContractNotFound: undefined
  /**
   *No code could be found at the supplied code hash.
   */
  CodeNotFound: undefined
  /**
   *No code info could be found at the supplied code hash.
   */
  CodeInfoNotFound: undefined
  /**
   *A buffer outside of sandbox memory was passed to a contract API function.
   */
  OutOfBounds: undefined
  /**
   *Input passed to a contract API function failed to decode as expected type.
   */
  DecodingFailed: undefined
  /**
   *Contract trapped during execution.
   */
  ContractTrapped: undefined
  /**
   *The size defined in `T::MaxValueSize` was exceeded.
   */
  ValueTooLarge: undefined
  /**
   *Termination of a contract is not allowed while the contract is already
   *on the call stack. Can be triggered by `seal_terminate`.
   */
  TerminatedWhileReentrant: undefined
  /**
   *`seal_call` forwarded this contracts input. It therefore is no longer available.
   */
  InputForwarded: undefined
  /**
   *The amount of topics passed to `seal_deposit_events` exceeds the limit.
   */
  TooManyTopics: undefined
  /**
   *The chain does not provide a chain extension. Calling the chain extension results
   *in this error. Note that this usually  shouldn't happen as deploying such contracts
   *is rejected.
   */
  NoChainExtension: undefined
  /**
   *Failed to decode the XCM program.
   */
  XCMDecodeFailed: undefined
  /**
   *A contract with the same AccountId already exists.
   */
  DuplicateContract: undefined
  /**
   *A contract self destructed in its constructor.
   *
   *This can be triggered by a call to `seal_terminate`.
   */
  TerminatedInConstructor: undefined
  /**
   *A call tried to invoke a contract that is flagged as non-reentrant.
   */
  ReentranceDenied: undefined
  /**
   *A contract called into the runtime which then called back into this pallet.
   */
  ReenteredPallet: undefined
  /**
   *A contract attempted to invoke a state modifying API while being in read-only mode.
   */
  StateChangeDenied: undefined
  /**
   *Origin doesn't have enough balance to pay the required storage deposits.
   */
  StorageDepositNotEnoughFunds: undefined
  /**
   *More storage was created than allowed by the storage deposit limit.
   */
  StorageDepositLimitExhausted: undefined
  /**
   *Code removal was denied because the code is still in use by at least one contract.
   */
  CodeInUse: undefined
  /**
   *The contract ran to completion but decided to revert its storage changes.
   *Please note that this error is only returned from extrinsics. When called directly
   *or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
   *to determine whether a reversion has taken place.
   */
  ContractReverted: undefined
  /**
   *The contract failed to compile or is missing the correct entry points.
   *
   *A more detailed error can be found on the node console if debug messages are enabled
   *by supplying `-lruntime::revive=debug`.
   */
  CodeRejected: undefined
  /**
   *The code blob supplied is larger than [`limits::code::BLOB_BYTES`].
   */
  BlobTooLarge: undefined
  /**
   *The static memory consumption of the blob will be larger than
   *[`limits::code::STATIC_MEMORY_BYTES`].
   */
  StaticMemoryTooLarge: undefined
  /**
   *The program contains a basic block that is larger than allowed.
   */
  BasicBlockTooLarge: undefined
  /**
   *The program contains an invalid instruction.
   */
  InvalidInstruction: undefined
  /**
   *The contract has reached its maximum number of delegate dependencies.
   */
  MaxDelegateDependenciesReached: undefined
  /**
   *The dependency was not found in the contract's delegate dependencies.
   */
  DelegateDependencyNotFound: undefined
  /**
   *The contract already depends on the given delegate dependency.
   */
  DelegateDependencyAlreadyExists: undefined
  /**
   *Can not add a delegate dependency to the code hash of the contract itself.
   */
  CannotAddSelfAsDelegateDependency: undefined
  /**
   *Can not add more data to transient storage.
   */
  OutOfTransientStorage: undefined
  /**
   *The contract tried to call a syscall which does not exist (at its current api level).
   */
  InvalidSyscall: undefined
  /**
   *Invalid storage flags were passed to one of the storage syscalls.
   */
  InvalidStorageFlags: undefined
  /**
   *PolkaVM failed during code execution. Probably due to a malformed program.
   */
  ExecutionFailed: undefined
  /**
   *Failed to convert a U256 to a Balance.
   */
  BalanceConversionFailed: undefined
  /**
   *Failed to convert an EVM balance to a native balance.
   */
  DecimalPrecisionLoss: undefined
  /**
   *Immutable data can only be set during deploys and only be read during calls.
   *Additionally, it is only valid to set the data once and it must not be empty.
   */
  InvalidImmutableAccess: undefined
  /**
   *An `AccountID32` account tried to interact with the pallet without having a mapping.
   *
   *Call [`Pallet::map_account`] in order to create a mapping for the account.
   */
  AccountUnmapped: undefined
  /**
   *Tried to map an account that is already mapped.
   */
  AccountAlreadyMapped: undefined
  /**
   *The transaction used to dry-run a contract is invalid.
   */
  InvalidGenericTransaction: undefined
  /**
   *The refcount of a code either over or underflowed.
   */
  RefcountOverOrUnderflow: undefined
  /**
   *Unsupported precompile address
   */
  UnsupportedPrecompileAddress: undefined
  /**
   *Precompile Error
   */
  PrecompileFailure: undefined
}>
export type Ieqmcndp78shme = AnonymousEnum<{
  /**
   *Account balance must be greater than or equal to the transfer amount.
   */
  BalanceLow: undefined
  /**
   *The account to alter does not exist.
   */
  NoAccount: undefined
  /**
   *The signing account has no permission to do the operation.
   */
  NoPermission: undefined
  /**
   *The given asset ID is unknown.
   */
  Unknown: undefined
  /**
   *The origin account is frozen.
   */
  Frozen: undefined
  /**
   *The asset ID is already taken.
   */
  InUse: undefined
  /**
   *Invalid witness data given.
   */
  BadWitness: undefined
  /**
   *Minimum balance should be non-zero.
   */
  MinBalanceZero: undefined
  /**
   *Unable to increment the consumer reference counters on the account. Either no provider
   *reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
   *fewer then the maximum number of consumers has been reached.
   */
  UnavailableConsumer: undefined
  /**
   *Invalid metadata given.
   */
  BadMetadata: undefined
  /**
   *No approval exists that would allow the transfer.
   */
  Unapproved: undefined
  /**
   *The source account would not survive the transfer and it needs to stay alive.
   */
  WouldDie: undefined
  /**
   *The asset-account already exists.
   */
  AlreadyExists: undefined
  /**
   *The asset-account doesn't have an associated deposit.
   */
  NoDeposit: undefined
  /**
   *The operation would result in funds being burned.
   */
  WouldBurn: undefined
  /**
   *The asset is a live asset and is actively being used. Usually emit for operations such
   *as `start_destroy` which require the asset to be in a destroying state.
   */
  LiveAsset: undefined
  /**
   *The asset is not live, and likely being destroyed.
   */
  AssetNotLive: undefined
  /**
   *The asset status is not the expected status.
   */
  IncorrectStatus: undefined
  /**
   *The asset should be frozen before the given operation.
   */
  NotFrozen: undefined
  /**
   *Callback action resulted in error
   */
  CallbackFailed: undefined
  /**
   *The asset ID must be equal to the [`NextAssetId`].
   */
  BadAssetId: undefined
  /**
   *The asset cannot be destroyed because some accounts for this asset contain freezes.
   */
  ContainsFreezes: undefined
  /**
   *The asset cannot be destroyed because some accounts for this asset contain holds.
   */
  ContainsHolds: undefined
}>
export type I27io5p4nt3tn4 = {
  code_hash: FixedSizeBinary<32>
  error: Anonymize<Ia19hov8g2tmuu>
}
export type I4l97tr8rl1un2 = AnonymousEnum<{
  /**
   *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   *well as the error.
   */
  BatchInterrupted: Anonymize<Ifvc5tgjjgl73e>
  /**
   *Batch of dispatches completed fully with no error.
   */
  BatchCompleted: undefined
  /**
   *Batch of dispatches completed but has errors.
   */
  BatchCompletedWithErrors: undefined
  /**
   *A single item within a Batch of dispatches has completed with no error.
   */
  ItemCompleted: undefined
  /**
   *A single item within a Batch of dispatches has completed with error.
   */
  ItemFailed: Anonymize<I980sokmk9d49d>
  /**
   *A call was dispatched.
   */
  DispatchedAs: Anonymize<I2hcot1khne4on>
  /**
   *Main call was dispatched.
   */
  IfElseMainSuccess: undefined
  /**
   *The fallback call was dispatched.
   */
  IfElseFallbackCalled: Anonymize<I65pfgf00q39p1>
}>
export type Ifvc5tgjjgl73e = {
  index: number
  error: Anonymize<Ia19hov8g2tmuu>
}
export type I980sokmk9d49d = {
  error: Anonymize<Ia19hov8g2tmuu>
}
export type I2hcot1khne4on = {
  result: Anonymize<I8hod3lvgsmp5o>
}
export type I8hod3lvgsmp5o = ResultPayload<undefined, Anonymize<Ia19hov8g2tmuu>>
export type I65pfgf00q39p1 = {
  main_error: Anonymize<Ia19hov8g2tmuu>
}
export type I5650l5diig748 = AnonymousEnum<{
  /**
   *A sudo call just took place.
   */
  Sudid: Anonymize<I29ai3jnl05o3c>
  /**
   *The sudo key has been updated.
   */
  KeyChanged: Anonymize<I5rtkmhm2dng4u>
  /**
   *The key was permanently removed.
   */
  KeyRemoved: undefined
  /**
   *A [sudo_as](Pallet::sudo_as) call just took place.
   */
  SudoAsDone: Anonymize<I29ai3jnl05o3c>
}>
export type I29ai3jnl05o3c = {
  /**
   *The result of the call made by the sudo user.
   */
  sudo_result: Anonymize<I8hod3lvgsmp5o>
}
export type I3vl9org1c535t = AnonymousEnum<{
  /**
   *A custom event emitted by the contract.
   */
  ContractEmitted: Anonymize<I7svbvm6hg57aj>
}>
export type I9f8oguielpkem = Array<{
  id: Enum<{
    Revive: Anonymize<I364se861k3md3>
  }>
  amount: bigint
}>
export type Idtkgtc4to05ia = {
  owner: SS58String
  deposit: bigint
  refcount: bigint
  code_len: number
  behaviour_version: number
}
export type I5t5eoogd7ekut = {
  trie_id: Binary
  code_hash: FixedSizeBinary<32>
  storage_bytes: number
  storage_items: number
  storage_byte_deposit: bigint
  storage_item_deposit: bigint
  storage_base_deposit: bigint
  immutable_data_len: number
}
export type I36ofciakfv8sc = AnonymousEnum<{
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
  batch: Anonymize<I8r91mv11kqo2h>
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
  as_derivative: Anonymize<Ic6ju3fp77do49>
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
  batch_all: Anonymize<I8r91mv11kqo2h>
  /**
   *Dispatches a function call with a provided origin.
   *
   *The dispatch origin for this call must be _Root_.
   *
   *## Complexity
   *- O(1).
   */
  dispatch_as: Anonymize<I2m2h8f492qvj7>
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
  force_batch: Anonymize<I8r91mv11kqo2h>
  /**
   *Dispatch a function call with a specified weight.
   *
   *This function does not check the weight of the call, and instead allows the
   *Root origin to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  with_weight: Anonymize<Ib9r5mo3ahn8u4>
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
  if_else: Anonymize<I53lq4gl06dhst>
  /**
   *Dispatches a function call with a provided origin.
   *
   *Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
   *
   *The dispatch origin for this call must be _Root_.
   */
  dispatch_as_fallible: Anonymize<I2m2h8f492qvj7>
}>
export type I8r91mv11kqo2h = {
  calls: Array<TxCallData>
}
export type Ic6ju3fp77do49 = {
  index: number
  call: TxCallData
}
export type I2m2h8f492qvj7 = {
  as_origin: Enum<{
    system: DispatchRawOrigin
  }>
  call: TxCallData
}
export type Ib9r5mo3ahn8u4 = {
  call: TxCallData
  weight: Anonymize<I4q39t5hn830vp>
}
export type I53lq4gl06dhst = {
  main: TxCallData
  fallback: TxCallData
}
export type I72fgnlss1dvqd = AnonymousEnum<{
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   */
  sudo: Anonymize<I1vhgj8u0atb1n>
  /**
   *Authenticates the sudo key and dispatches a function call with `Root` origin.
   *This function does not check the weight of the call, and instead allows the
   *Sudo user to specify the weight of the call.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_unchecked_weight: Anonymize<Ib9r5mo3ahn8u4>
  /**
   *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
   *key.
   */
  set_key: Anonymize<I8k3rnvpeeh4hv>
  /**
   *Authenticates the sudo key and dispatches a function call with `Signed` origin from
   *a given account.
   *
   *The dispatch origin for this call must be _Signed_.
   */
  sudo_as: Anonymize<Idlk847h1qk2g0>
  /**
   *Permanently removes the sudo key.
   *
   ***This cannot be un-done.**
   */
  remove_key: undefined
}>
export type I1vhgj8u0atb1n = {
  call: TxCallData
}
export type Idlk847h1qk2g0 = {
  who: MultiAddress
  call: TxCallData
}
export type I68p3tos4vdni4 = AnonymousEnum<{
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
  eth_transact: Anonymize<Ida37oe44osb06>
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
  call: Anonymize<Idsg8aod8e8fqn>
  /**
   *Instantiates a contract from a previously deployed wasm binary.
   *
   *This function is identical to [`Self::instantiate_with_code`] but without the
   *code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
   *must be supplied.
   */
  instantiate: Anonymize<I46nktn22m6hbi>
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
  instantiate_with_code: Anonymize<Ibgj1cthra7lte>
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
  upload_code: Anonymize<I10ra4g1rl6k2f>
  /**
   *Remove the code stored under `code_hash` and refund the deposit to its owner.
   *
   *A code can only be removed by its original uploader (its owner) and only if it is
   *not used by any contract.
   */
  remove_code: Anonymize<Ib51vk42m1po4n>
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
  set_code: Anonymize<I1uihehkdsggvp>
  /**
   *Register the callers account id so that it can be used in contract interactions.
   *
   *This will error if the origin is already mapped or is a eth native `Address20`. It will
   *take a deposit that can be released by calling [`Self::unmap_account`].
   */
  map_account: undefined
  /**
   *Unregister the callers account id in order to free the deposit.
   *
   *There is no reason to ever call this function other than freeing up the deposit.
   *This is only useful when the account should no longer be used.
   */
  unmap_account: undefined
  /**
   *Dispatch an `call` with the origin set to the callers fallback address.
   *
   *Every `AccountId32` can control its corresponding fallback account. The fallback account
   *is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
   *recovery function in case an `AccountId20` was used without creating a mapping first.
   */
  dispatch_as_fallback_account: Anonymize<I1vhgj8u0atb1n>
}>
export type Ida37oe44osb06 = {
  payload: Binary
}
export type I4gil44d08grh = {
  prefix: FixedSizeBinary<16>
  suffix: FixedSizeBinary<16>
}
export type I7u915mvkdsb08 = ResultPayload<
  Binary,
  Enum<{
    NotImplemented: undefined
    NotFound: Anonymize<I4gil44d08grh>
    Codec: undefined
  }>
>
export type Idom4bv4opbkn3 = ResultPayload<Anonymize<I8hod3lvgsmp5o>, Anonymize<I5nrjkj9qumobs>>
export type I5nrjkj9qumobs = AnonymousEnum<{
  Invalid: Enum<{
    Call: undefined
    Payment: undefined
    Future: undefined
    Stale: undefined
    BadProof: undefined
    AncientBirthBlock: undefined
    ExhaustsResources: undefined
    Custom: number
    BadMandatory: undefined
    MandatoryValidation: undefined
    BadSigner: undefined
    IndeterminateImplicit: undefined
    UnknownOrigin: undefined
  }>
  Unknown: TransactionValidityUnknownTransaction
}>
export type I9ask1o4tfvcvs = ResultPayload<Anonymize<I6g5lcd9vf2cr0>, Anonymize<I5nrjkj9qumobs>>
export type I22sqe2i8oe0ft = AnonymousEnum<{
  System: Anonymize<Iekve0i6djpd9f>
  Utility: Anonymize<I36ofciakfv8sc>
  Timestamp: Anonymize<I7d75gqfg6jh9c>
  Balances: Anonymize<I9svldsp29mh87>
  Sudo: Anonymize<I72fgnlss1dvqd>
  Revive: Anonymize<I68p3tos4vdni4>
  Assets: Anonymize<I84851acvod2ic>
}>
export type I4totqt881mlti = FixedSizeArray<4, bigint>
export type I1r5trie5v36he = {
  gas_consumed: Anonymize<I4q39t5hn830vp>
  gas_required: Anonymize<I4q39t5hn830vp>
  storage_deposit: Anonymize<If7bmpttbdmqu4>
  result: ResultPayload<Anonymize<I620n7irgfspm4>, Anonymize<Ia19hov8g2tmuu>>
}
export type If7bmpttbdmqu4 = AnonymousEnum<{
  Refund: bigint
  Charge: bigint
}>
export type I620n7irgfspm4 = {
  flags: number
  data: Binary
}
export type I9sijb8gfrns29 = AnonymousEnum<{
  Upload: Binary
  Existing: FixedSizeBinary<32>
}>
export type Idg5sqhk4n61oc = {
  gas_consumed: Anonymize<I4q39t5hn830vp>
  gas_required: Anonymize<I4q39t5hn830vp>
  storage_deposit: Anonymize<If7bmpttbdmqu4>
  result: ResultPayload<
    {
      result: Anonymize<I620n7irgfspm4>
      addr: FixedSizeBinary<20>
    },
    Anonymize<Ia19hov8g2tmuu>
  >
}
export type I741pl2pidmim6 = {
  access_list?:
    | Array<{
        address: FixedSizeBinary<20>
        storage_keys: Anonymize<Ic5m5lp1oioo8r>
      }>
    | undefined
  blob_versioned_hashes: Anonymize<Ic5m5lp1oioo8r>
  blobs: Anonymize<Itom7fk49o0c9>
  chain_id?: Anonymize<Ic4rgfgksgmm3e>
  from?: FixedSizeBinary<20> | undefined
  gas?: Anonymize<Ic4rgfgksgmm3e>
  gas_price?: Anonymize<Ic4rgfgksgmm3e>
  input: {
    input?: Anonymize<Iabpgqcjikia83>
    data?: Anonymize<Iabpgqcjikia83>
  }
  max_fee_per_blob_gas?: Anonymize<Ic4rgfgksgmm3e>
  max_fee_per_gas?: Anonymize<Ic4rgfgksgmm3e>
  max_priority_fee_per_gas?: Anonymize<Ic4rgfgksgmm3e>
  nonce?: Anonymize<Ic4rgfgksgmm3e>
  to?: FixedSizeBinary<20> | undefined
  'r#type'?: Anonymize<I4arjljr6dpflb>
  value?: Anonymize<Ic4rgfgksgmm3e>
}
export type Ic4rgfgksgmm3e = Anonymize<I4totqt881mlti> | undefined
export type I8abab09ak4pi1 = ResultPayload<
  {
    gas_required: Anonymize<I4q39t5hn830vp>
    storage_deposit: bigint
    eth_gas: Anonymize<I4totqt881mlti>
    data: Binary
  },
  Anonymize<I8mb9f26m2cgi5>
>
export type I8mb9f26m2cgi5 = AnonymousEnum<{
  Data: Binary
  Message: string
}>
export type I4mjui2i82gvdb = ResultPayload<
  {
    code_hash: FixedSizeBinary<32>
    deposit: bigint
  },
  Anonymize<Ia19hov8g2tmuu>
>
export type Iehnkjehe1oeva = ResultPayload<
  Anonymize<Iabpgqcjikia83>,
  Enum<{
    DoesntExist: undefined
    KeyDecodingFailed: undefined
  }>
>
export type Ifbmd9e2argcmg = AnonymousEnum<{
  CallTracer: {
    with_logs: boolean
  }
}>
export type I2bl5e7he0kaq9 = Array<[number, Anonymize<Icvq0fpjdcem8r>]>
export type Icvq0fpjdcem8r = {
  from: FixedSizeBinary<20>
  gas: Anonymize<I4totqt881mlti>
  gas_used: Anonymize<I4totqt881mlti>
  to: FixedSizeBinary<20>
  input: Binary
  output: Binary
  error?: Anonymize<I1mqgk2tmnn9i2>
  revert_reason?: Anonymize<I1mqgk2tmnn9i2>
  calls: Array<Anonymize<Icvq0fpjdcem8r>>
  logs: Array<{
    address: FixedSizeBinary<20>
    topics: Anonymize<Ic5m5lp1oioo8r>
    data: Binary
    position: number
  }>
  value?: Anonymize<Ic4rgfgksgmm3e>
  call_type: Enum<{
    Call: undefined
    StaticCall: undefined
    DelegateCall: undefined
  }>
}
export type I2d63hfvrckrkc = Anonymize<Icvq0fpjdcem8r> | undefined
export type Ibabtpgk9h20k6 = ResultPayload<Anonymize<Icvq0fpjdcem8r>, Anonymize<I8mb9f26m2cgi5>>
export {}
