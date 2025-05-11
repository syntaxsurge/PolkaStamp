import { __export } from './chunk-7P6ASYW6.mjs'

// .papi/descriptors/src/paseo.ts
var toBinary = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues = import('./descriptors-WSMO32T5.mjs').then((module) => module['Paseo'])
var metadataTypes = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary('default' in module ? module.default : module),
)
var asset = {}
var getMetadata = () =>
  import('./paseo_metadata-ZF6K43YI.mjs').then((module) =>
    toBinary('default' in module ? module.default : module),
  )
var genesis = '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f'
var _allDescriptors = { descriptors: descriptorValues, metadataTypes, asset, getMetadata, genesis }
var paseo_default = _allDescriptors

// .papi/descriptors/src/polkadot.ts
var toBinary2 = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues2 = import('./descriptors-WSMO32T5.mjs').then((module) => module['Polkadot'])
var metadataTypes2 = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary2('default' in module ? module.default : module),
)
var asset2 = {}
var getMetadata2 = () =>
  import('./polkadot_metadata-6WT4FYDP.mjs').then((module) =>
    toBinary2('default' in module ? module.default : module),
  )
var genesis2 = '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
var _allDescriptors2 = {
  descriptors: descriptorValues2,
  metadataTypes: metadataTypes2,
  asset: asset2,
  getMetadata: getMetadata2,
  genesis: genesis2,
}
var polkadot_default = _allDescriptors2

// .papi/descriptors/src/paseo_asset_hub.ts
var toBinary3 = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues3 = import('./descriptors-WSMO32T5.mjs').then(
  (module) => module['Paseo_asset_hub'],
)
var metadataTypes3 = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary3('default' in module ? module.default : module),
)
var asset3 = {}
var getMetadata3 = () =>
  import('./paseo_asset_hub_metadata-NMTSH2MU.mjs').then((module) =>
    toBinary3('default' in module ? module.default : module),
  )
var genesis3 = '0xd6eec26135305a8ad257a20d003357284c8aa03d0bdb2b357ab0a22371e11ef2'
var _allDescriptors3 = {
  descriptors: descriptorValues3,
  metadataTypes: metadataTypes3,
  asset: asset3,
  getMetadata: getMetadata3,
  genesis: genesis3,
}
var paseo_asset_hub_default = _allDescriptors3

// .papi/descriptors/src/polkadot_asset_hub.ts
var toBinary4 = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues4 = import('./descriptors-WSMO32T5.mjs').then(
  (module) => module['Polkadot_asset_hub'],
)
var metadataTypes4 = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary4('default' in module ? module.default : module),
)
var asset4 = {}
var getMetadata4 = () =>
  import('./polkadot_asset_hub_metadata-Z3QZWGN5.mjs').then((module) =>
    toBinary4('default' in module ? module.default : module),
  )
var genesis4 = '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f'
var _allDescriptors4 = {
  descriptors: descriptorValues4,
  metadataTypes: metadataTypes4,
  asset: asset4,
  getMetadata: getMetadata4,
  genesis: genesis4,
}
var polkadot_asset_hub_default = _allDescriptors4

// .papi/descriptors/src/pop.ts
var toBinary5 = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues5 = import('./descriptors-WSMO32T5.mjs').then((module) => module['Pop'])
var metadataTypes5 = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary5('default' in module ? module.default : module),
)
var asset5 = {}
var getMetadata5 = () =>
  import('./pop_metadata-AUPRFIYQ.mjs').then((module) =>
    toBinary5('default' in module ? module.default : module),
  )
var genesis5 = '0xe8b2d197b82a0da1fffca832c050894ebe343b289c61ef439aa694bdcef78aa1'
var _allDescriptors5 = {
  descriptors: descriptorValues5,
  metadataTypes: metadataTypes5,
  asset: asset5,
  getMetadata: getMetadata5,
  genesis: genesis5,
}
var pop_default = _allDescriptors5

// .papi/descriptors/src/localnode.ts
var toBinary6 = (() => {
  const table = new Uint8Array(128)
  for (let i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
  return (base64) => {
    const n = base64.length,
      bytes = new Uint8Array(
        (((n - Number(base64[n - 1] === '=') - Number(base64[n - 2] === '=')) * 3) / 4) | 0,
      )
    for (let i2 = 0, j = 0; i2 < n; ) {
      const c0 = table[base64.charCodeAt(i2++)],
        c1 = table[base64.charCodeAt(i2++)]
      const c2 = table[base64.charCodeAt(i2++)],
        c3 = table[base64.charCodeAt(i2++)]
      bytes[j++] = (c0 << 2) | (c1 >> 4)
      bytes[j++] = (c1 << 4) | (c2 >> 2)
      bytes[j++] = (c2 << 6) | c3
    }
    return bytes
  }
})()
var descriptorValues6 = import('./descriptors-WSMO32T5.mjs').then((module) => module['Localnode'])
var metadataTypes6 = import('./metadataTypes-H4336ZNE.mjs').then((module) =>
  toBinary6('default' in module ? module.default : module),
)
var asset6 = {}
var getMetadata6 = () =>
  import('./localnode_metadata-2IZOL53U.mjs').then((module) =>
    toBinary6('default' in module ? module.default : module),
  )
var genesis6 = '0x4545454545454545454545454545454545454545454545454545454545454545'
var _allDescriptors6 = {
  descriptors: descriptorValues6,
  metadataTypes: metadataTypes6,
  asset: asset6,
  getMetadata: getMetadata6,
  genesis: genesis6,
}
var localnode_default = _allDescriptors6

// .papi/descriptors/src/common-types.ts
import { _Enum } from 'polkadot-api'
var DigestItem = _Enum
var Phase = _Enum
var DispatchClass = _Enum
var BagsListListListError = _Enum
var TokenError = _Enum
var ArithmeticError = _Enum
var TransactionalError = _Enum
var PreimageEvent = _Enum
var IndicesEvent = _Enum
var BalanceStatus = _Enum
var TransactionPaymentEvent = _Enum
var StakingEvent = _Enum
var StakingRewardDestination = _Enum
var StakingForcing = _Enum
var OffencesEvent = _Enum
var SessionEvent = _Enum
var GrandpaEvent = _Enum
var VersionedLocatableAsset = _Enum
var XcmV3Junctions = _Enum
var XcmV3Junction = _Enum
var XcmV3JunctionNetworkId = _Enum
var XcmV3JunctionBodyId = _Enum
var XcmV2JunctionBodyPart = _Enum
var XcmV3MultiassetAssetId = _Enum
var PaseoXcmVersionedLocation = _Enum
var XcmV2MultilocationJunctions = _Enum
var XcmV2Junction = _Enum
var XcmV2NetworkId = _Enum
var XcmV2BodyId = _Enum
var ConvictionVotingVoteAccountVote = _Enum
var PreimagesBounded = _Enum
var CommonClaimsEvent = _Enum
var VestingEvent = _Enum
var BountiesEvent = _Enum
var ChildBountiesEvent = _Enum
var ElectionProviderMultiPhaseEvent = _Enum
var ElectionProviderMultiPhaseElectionCompute = _Enum
var ElectionProviderMultiPhasePhase = _Enum
var BagsListEvent = _Enum
var NominationPoolsPoolState = _Enum
var NominationPoolsCommissionClaimPermission = _Enum
var ParachainsInclusionEvent = _Enum
var ParachainsParasEvent = _Enum
var ParachainsHrmpEvent = _Enum
var ParachainsDisputesEvent = _Enum
var ParachainsDisputeLocation = _Enum
var ParachainsDisputeResult = _Enum
var CommonParasRegistrarEvent = _Enum
var CommonSlotsEvent = _Enum
var CommonAuctionsEvent = _Enum
var PolkadotRuntimeParachainsCoretimeEvent = _Enum
var XcmV4TraitsOutcome = _Enum
var XcmV3TraitsError = _Enum
var XcmV4Instruction = _Enum
var XcmV3MultiassetFungibility = _Enum
var XcmV3MultiassetAssetInstance = _Enum
var XcmV4Response = _Enum
var XcmV3MaybeErrorCode = _Enum
var XcmV2OriginKind = _Enum
var XcmV4AssetAssetFilter = _Enum
var XcmV4AssetWildAsset = _Enum
var XcmV2MultiassetWildFungibility = _Enum
var XcmV3WeightLimit = _Enum
var PaseoXcmVersionedAssets = _Enum
var XcmV2MultiassetAssetId = _Enum
var XcmV2MultiassetFungibility = _Enum
var XcmV2MultiassetAssetInstance = _Enum
var ParachainsInclusionAggregateMessageOrigin = _Enum
var ParachainsInclusionUmpQueueId = _Enum
var AssetRateEvent = _Enum
var PolkadotRuntimeOriginCaller = _Enum
var DispatchRawOrigin = _Enum
var GovernanceOrigin = _Enum
var ParachainsOrigin = _Enum
var XcmPalletOrigin = _Enum
var PreimageOldRequestStatus = _Enum
var PreimageRequestStatus = _Enum
var BabeDigestsNextConfigDescriptor = _Enum
var BabeAllowedSlots = _Enum
var BabeDigestsPreDigest = _Enum
var BalancesTypesReasons = _Enum
var PreimagePalletHoldReason = _Enum
var WestendRuntimeRuntimeFreezeReason = _Enum
var NominationPoolsPalletFreezeReason = _Enum
var TransactionPaymentReleases = _Enum
var GrandpaStoredState = _Enum
var TreasuryPaymentState = _Enum
var ConvictionVotingVoteVoting = _Enum
var VotingConviction = _Enum
var TraitsScheduleDispatchTime = _Enum
var ClaimsStatementKind = _Enum
var Version = _Enum
var BountiesBountyStatus = _Enum
var ChildBountyStatus = _Enum
var NominationPoolsClaimPermission = _Enum
var PolkadotPrimitivesV6ExecutorParamsExecutorParam = _Enum
var PolkadotPrimitivesV6PvfPrepKind = _Enum
var PvfExecKind = _Enum
var ValidityAttestation = _Enum
var PolkadotPrimitivesV6DisputeStatement = _Enum
var PolkadotPrimitivesV6ValidDisputeStatementKind = _Enum
var InvalidDisputeStatementKind = _Enum
var PolkadotRuntimeParachainsSchedulerPalletCoreOccupied = _Enum
var PolkadotRuntimeParachainsSchedulerCommonAssignment = _Enum
var ParachainsParasParaLifecycle = _Enum
var UpgradeGoAhead = _Enum
var UpgradeRestriction = _Enum
var SlashingOffenceKind = _Enum
var BrokerCoretimeInterfaceCoreAssignment = _Enum
var MultiSigner = _Enum
var CommonCrowdloanLastContribution = _Enum
var XcmPalletQueryStatus = _Enum
var XcmVersionedResponse = _Enum
var XcmV2Response = _Enum
var XcmV2TraitsError = _Enum
var XcmV3Response = _Enum
var XcmPalletVersionMigrationStage = _Enum
var PaseoXcmVersionedAssetId = _Enum
var ReferendaTypesCurve = _Enum
var MultiAddress = _Enum
var BalancesAdjustmentDirection = _Enum
var StakingPalletConfigOpBig = _Enum
var StakingPalletConfigOp = _Enum
var GrandpaEquivocation = _Enum
var NominationPoolsBondExtra = _Enum
var NominationPoolsConfigOp = _Enum
var MultiSignature = _Enum
var PaseoXcmVersionedXcm = _Enum
var XcmV2Instruction = _Enum
var XcmV2MultiAssetFilter = _Enum
var XcmV2MultiassetWildMultiAsset = _Enum
var XcmV2WeightLimit = _Enum
var XcmV3Instruction = _Enum
var XcmV3MultiassetMultiAssetFilter = _Enum
var XcmV3MultiassetWildMultiAsset = _Enum
var TransactionValidityError = _Enum
var TransactionValidityInvalidTransaction = _Enum
var TransactionValidityUnknownTransaction = _Enum
var TransactionValidityTransactionSource = _Enum
var CoreState = _Enum
var OccupiedCoreAssumption = _Enum
var CandidateEvent = _Enum
var MmrPrimitivesError = _Enum
var XcmV5Junctions = _Enum
var XcmV5Junction = _Enum
var XcmV5NetworkId = _Enum
var XcmV5Instruction = _Enum
var XcmV5AssetFilter = _Enum
var XcmV5WildAsset = _Enum
var XcmVersionedAssets = _Enum
var XcmVersionedLocation = _Enum
var XcmVersionedXcm = _Enum
var XcmVersionedAssetId = _Enum

// .papi/descriptors/src/contracts/index.ts
var contracts_exports = {}
__export(contracts_exports, {
  credential_nft: () => descriptor,
  did_registry: () => descriptor2,
  subscription_manager: () => descriptor3,
})

// .papi/descriptors/src/contracts/credential_nft.ts
var descriptor = {
  metadata: {
    source: {
      hash: '0xe91f8a31d1f1e235939a8a8a6c5767a2f264c5acba66ef75900cafca7faedb20',
      language: 'ink! 6.0.0-alpha',
      compiler: 'rustc 1.86.0',
      build_info: {
        build_mode: 'Release',
        cargo_contract_version: '6.0.0-alpha',
        rust_toolchain: 'stable-aarch64-apple-darwin',
      },
    },
    contract: {
      name: 'credential_nft',
      version: '0.1.0',
      authors: ['PolkaStamp <dev@polkastamp.io>'],
    },
    image: null,
    spec: {
      constructors: [
        {
          args: [
            { label: 'admin', type: { displayName: ['H160'], type: 0 } },
            { label: 'platform', type: { displayName: ['H160'], type: 0 } },
          ],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: { displayName: ['ink_primitives', 'ConstructorResult'], type: 26 },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: { displayName: ['AccountId'], type: 35 },
        balance: { displayName: ['Balance'], type: 4 },
        blockNumber: { displayName: ['BlockNumber'], type: 37 },
        chainExtension: { displayName: ['ChainExtension'], type: 38 },
        hash: { displayName: ['Hash'], type: 13 },
        maxEventTopics: 4,
        staticBufferSize: 16384,
        timestamp: { displayName: ['Timestamp'], type: 36 },
      },
      events: [
        {
          args: [
            { docs: [], indexed: true, label: 'to', type: { displayName: ['H160'], type: 0 } },
            {
              docs: [],
              indexed: true,
              label: 'token_id',
              type: { displayName: ['TokenId'], type: 4 },
            },
            {
              docs: [],
              indexed: false,
              label: 'vc_hash',
              type: { displayName: ['Hash'], type: 13 },
            },
            { docs: [], indexed: false, label: 'uri', type: { displayName: ['String'], type: 9 } },
          ],
          docs: [],
          label: 'CredentialMinted',
          module_path: 'credential_nft::credential_nft',
          signature_topic: '0x506a691538452cec1d6b0ca74596e5a32976cdcaaa35cc2b2a9db149aeaa858f',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'token_id',
              type: { displayName: ['TokenId'], type: 4 },
            },
            {
              docs: [],
              indexed: false,
              label: 'vc_hash',
              type: { displayName: ['Hash'], type: 13 },
            },
            { docs: [], indexed: false, label: 'uri', type: { displayName: ['String'], type: 9 } },
          ],
          docs: [],
          label: 'CredentialUpdated',
          module_path: 'credential_nft::credential_nft',
          signature_topic: '0x6e953aa04b11ee0f06dcbaa837fb6cb122f8fa22fdc5f2790e397dd69d0ffaaf',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'token_id',
              type: { displayName: ['TokenId'], type: 4 },
            },
          ],
          docs: [],
          label: 'CredentialRevoked',
          module_path: 'credential_nft::credential_nft',
          signature_topic: '0x5e28e489d1898cc05d59b3d1ebcc2ad836e52231be72c7634da955baec5f68c2',
        },
      ],
      lang_error: { displayName: ['ink', 'LangError'], type: 27 },
      messages: [
        {
          args: [{ label: 'account', type: { displayName: ['H160'], type: 0 } }],
          default: false,
          docs: [],
          label: 'grant_issuer_role',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 26 },
          selector: '0x8a840a11',
        },
        {
          args: [
            { label: 'to', type: { displayName: ['H160'], type: 0 } },
            { label: 'vc_hash', type: { displayName: ['Hash'], type: 13 } },
            { label: 'uri', type: { displayName: ['String'], type: 9 } },
          ],
          default: false,
          docs: [],
          label: 'mint_credential',
          mutates: true,
          payable: true,
          returnType: { displayName: ['ink', 'MessageResult'], type: 28 },
          selector: '0x1893bc36',
        },
        {
          args: [
            { label: 'token_id', type: { displayName: ['TokenId'], type: 4 } },
            { label: 'new_vc_hash', type: { displayName: ['Hash'], type: 13 } },
            { label: 'new_uri', type: { displayName: ['String'], type: 9 } },
          ],
          default: false,
          docs: [],
          label: 'update_credential',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 26 },
          selector: '0x52cacc31',
        },
        {
          args: [{ label: 'token_id', type: { displayName: ['TokenId'], type: 4 } }],
          default: false,
          docs: [],
          label: 'revoke_credential',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 26 },
          selector: '0x09800b8d',
        },
        {
          args: [{ label: 'token_id', type: { displayName: ['TokenId'], type: 4 } }],
          default: false,
          docs: [],
          label: 'owner_of',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 29 },
          selector: '0x99720c1e',
        },
        {
          args: [{ label: 'token_id', type: { displayName: ['TokenId'], type: 4 } }],
          default: false,
          docs: [],
          label: 'token_uri',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 31 },
          selector: '0x5b64e66a',
        },
        {
          args: [{ label: 'token_id', type: { displayName: ['TokenId'], type: 4 } }],
          default: false,
          docs: [],
          label: 'vc_hash',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 33 },
          selector: '0x2bd52850',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0xa9004f9e', ty: 0 } },
                    root_key: '0xa9004f9e',
                    ty: 3,
                  },
                },
                name: 'owner_of',
              },
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0x697b3380', ty: 9 } },
                    root_key: '0x697b3380',
                    ty: 10,
                  },
                },
                name: 'token_uri',
              },
              {
                layout: {
                  root: {
                    layout: {
                      struct: {
                        fields: [
                          { layout: { leaf: { key: '0x8c680a19', ty: 13 } }, name: 'vc_hash' },
                        ],
                        name: 'CredentialData',
                      },
                    },
                    root_key: '0x8c680a19',
                    ty: 15,
                  },
                },
                name: 'credential',
              },
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0x5e4c188b', ty: 8 } },
                    root_key: '0x5e4c188b',
                    ty: 19,
                  },
                },
                name: 'minted_hashes',
              },
              { layout: { leaf: { key: '0x00000000', ty: 4 } }, name: 'next_id' },
              { layout: { leaf: { key: '0x00000000', ty: 0 } }, name: 'admin' },
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0xbef8491f', ty: 8 } },
                    root_key: '0xbef8491f',
                    ty: 22,
                  },
                },
                name: 'issuers',
              },
              { layout: { leaf: { key: '0x00000000', ty: 0 } }, name: 'platform' },
            ],
            name: 'CredentialNft',
          },
        },
        root_key: '0x00000000',
        ty: 25,
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: { composite: { fields: [{ type: 1, typeName: '[u8; 20]' }] } },
          path: ['primitive_types', 'H160'],
        },
      },
      { id: 1, type: { def: { array: { len: 20, type: 2 } } } },
      { id: 2, type: { def: { primitive: 'u8' } } },
      {
        id: 3,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 4 },
            { name: 'V', type: 0 },
            { name: 'KeyType', type: 5 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      { id: 4, type: { def: { primitive: 'u128' } } },
      {
        id: 5,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 7 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      { id: 6, type: { def: { composite: {} }, path: ['ink_storage_traits', 'impls', 'AutoKey'] } },
      {
        id: 7,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      { id: 8, type: { def: { tuple: [] } } },
      { id: 9, type: { def: { primitive: 'str' } } },
      {
        id: 10,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 4 },
            { name: 'V', type: 9 },
            { name: 'KeyType', type: 11 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 11,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 12 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 12,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      {
        id: 13,
        type: {
          def: { composite: { fields: [{ type: 14, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      { id: 14, type: { def: { array: { len: 32, type: 2 } } } },
      {
        id: 15,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 4 },
            { name: 'V', type: 16 },
            { name: 'KeyType', type: 17 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 16,
        type: {
          def: { composite: { fields: [{ name: 'vc_hash', type: 13, typeName: 'Hash' }] } },
          path: ['credential_nft', 'credential_nft', 'CredentialData'],
        },
      },
      {
        id: 17,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 18 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 18,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      {
        id: 19,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 13 },
            { name: 'V', type: 8 },
            { name: 'KeyType', type: 20 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 20,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 21 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 21,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      {
        id: 22,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 0 },
            { name: 'V', type: 8 },
            { name: 'KeyType', type: 23 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 23,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 24 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 24,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      {
        id: 25,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'owner_of',
                  type: 3,
                  typeName:
                    '<Mapping<TokenId, H160> as::ink::storage::traits::AutoStorableHint\n<::ink::storage::traits::ManualKey<2655977641u32, ()>,>>::Type',
                },
                {
                  name: 'token_uri',
                  type: 10,
                  typeName:
                    '<Mapping<TokenId, String> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<2150857577u32,\n()>,>>::Type',
                },
                {
                  name: 'credential',
                  type: 15,
                  typeName:
                    '<Mapping<TokenId, CredentialData> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<420112524u32, ()\n>,>>::Type',
                },
                {
                  name: 'minted_hashes',
                  type: 19,
                  typeName:
                    '<Mapping<Hash, ()> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<2333625438u32, ()>,>>::Type',
                },
                {
                  name: 'next_id',
                  type: 4,
                  typeName:
                    '<TokenId as::ink::storage::traits::AutoStorableHint<::ink::\nstorage::traits::ManualKey<3884535443u32, ()>,>>::Type',
                },
                {
                  name: 'admin',
                  type: 0,
                  typeName:
                    '<H160 as::ink::storage::traits::AutoStorableHint<::ink::storage\n::traits::ManualKey<691580690u32, ()>,>>::Type',
                },
                {
                  name: 'issuers',
                  type: 22,
                  typeName:
                    '<Mapping<H160, ()> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<524941502u32, ()>,>>::Type',
                },
                {
                  name: 'platform',
                  type: 0,
                  typeName:
                    '<H160 as::ink::storage::traits::AutoStorableHint<::ink::storage\n::traits::ManualKey<2796985733u32, ()>,>>::Type',
                },
              ],
            },
          },
          path: ['credential_nft', 'credential_nft', 'CredentialNft'],
        },
      },
      {
        id: 26,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 8 }], index: 0, name: 'Ok' },
                { fields: [{ type: 27 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 8 },
            { name: 'E', type: 27 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 27,
        type: {
          def: { variant: { variants: [{ index: 1, name: 'CouldNotReadInput' }] } },
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 28,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 4 }], index: 0, name: 'Ok' },
                { fields: [{ type: 27 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 4 },
            { name: 'E', type: 27 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 29,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 30 }], index: 0, name: 'Ok' },
                { fields: [{ type: 27 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 30 },
            { name: 'E', type: 27 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 30,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'None' },
                { fields: [{ type: 0 }], index: 1, name: 'Some' },
              ],
            },
          },
          params: [{ name: 'T', type: 0 }],
          path: ['Option'],
        },
      },
      {
        id: 31,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 32 }], index: 0, name: 'Ok' },
                { fields: [{ type: 27 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 32 },
            { name: 'E', type: 27 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 32,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'None' },
                { fields: [{ type: 9 }], index: 1, name: 'Some' },
              ],
            },
          },
          params: [{ name: 'T', type: 9 }],
          path: ['Option'],
        },
      },
      {
        id: 33,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 34 }], index: 0, name: 'Ok' },
                { fields: [{ type: 27 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 34 },
            { name: 'E', type: 27 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 34,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'None' },
                { fields: [{ type: 13 }], index: 1, name: 'Some' },
              ],
            },
          },
          params: [{ name: 'T', type: 13 }],
          path: ['Option'],
        },
      },
      {
        id: 35,
        type: {
          def: { composite: { fields: [{ type: 14, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      { id: 36, type: { def: { primitive: 'u64' } } },
      { id: 37, type: { def: { primitive: 'u32' } } },
      {
        id: 38,
        type: { def: { variant: {} }, path: ['ink_primitives', 'types', 'NoChainExtension'] },
      },
    ],
    version: 5,
  },
}

// .papi/descriptors/src/contracts/did_registry.ts
var descriptor2 = {
  metadata: {
    source: {
      hash: '0xc66accc222bd79941fba1d8884c1399f73e345805169a05f855df79abe7ecad8',
      language: 'ink! 6.0.0-alpha',
      compiler: 'rustc 1.86.0',
      build_info: {
        build_mode: 'Release',
        cargo_contract_version: '6.0.0-alpha',
        rust_toolchain: 'stable-aarch64-apple-darwin',
      },
    },
    contract: {
      name: 'did_registry',
      version: '0.1.0',
      authors: ['PolkaStamp <dev@polkastamp.io>'],
    },
    image: null,
    spec: {
      constructors: [
        {
          args: [{ label: 'admin', type: { displayName: ['H160'], type: 5 } }],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: { displayName: ['ink_primitives', 'ConstructorResult'], type: 17 },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: { displayName: ['AccountId'], type: 28 },
        balance: { displayName: ['Balance'], type: 29 },
        blockNumber: { displayName: ['BlockNumber'], type: 26 },
        chainExtension: { displayName: ['ChainExtension'], type: 31 },
        hash: { displayName: ['Hash'], type: 1 },
        maxEventTopics: 4,
        staticBufferSize: 16384,
        timestamp: { displayName: ['Timestamp'], type: 30 },
      },
      events: [
        {
          args: [
            { docs: [], indexed: true, label: 'owner', type: { displayName: ['H160'], type: 5 } },
            { docs: [], indexed: false, label: 'did', type: { displayName: ['String'], type: 0 } },
            {
              docs: [],
              indexed: false,
              label: 'doc_hash',
              type: { displayName: ['Hash'], type: 1 },
            },
          ],
          docs: [],
          label: 'DidCreated',
          module_path: 'did_registry::did_registry',
          signature_topic: '0x727dfa2ff8b39f1d04f78c37ace6865bc27ff5c65027225f288d03d86bb6869c',
        },
        {
          args: [
            { docs: [], indexed: false, label: 'did', type: { displayName: ['String'], type: 0 } },
            { docs: [], indexed: false, label: 'uri', type: { displayName: ['String'], type: 0 } },
            {
              docs: [],
              indexed: false,
              label: 'doc_hash',
              type: { displayName: ['Hash'], type: 1 },
            },
          ],
          docs: [],
          label: 'DidDocumentUpdated',
          module_path: 'did_registry::did_registry',
          signature_topic: '0x1da78ed0d3aa39a20949a63d6c2f3924d726c7bf82bbf977e286c51290824476',
        },
      ],
      lang_error: { displayName: ['ink', 'LangError'], type: 18 },
      messages: [
        {
          args: [
            { label: 'owner', type: { displayName: ['H160'], type: 5 } },
            { label: 'doc_hash', type: { displayName: ['Hash'], type: 1 } },
          ],
          default: false,
          docs: [
            ' Register a new DID for `owner` (explicit H160).',
            ' Fails when the caller\u2019s address does not match `owner`.',
          ],
          label: 'create_did',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 19 },
          selector: '0xfb9f4f54',
        },
        {
          args: [
            { label: 'owner', type: { displayName: ['H160'], type: 5 } },
            { label: 'doc_hash', type: { displayName: ['Hash'], type: 1 } },
          ],
          default: false,
          docs: [' Admin-only: create a DID for someone else.'],
          label: 'admin_create_did',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 19 },
          selector: '0x6b5a613b',
        },
        {
          args: [
            { label: 'owner', type: { displayName: ['H160'], type: 5 } },
            { label: 'uri', type: { displayName: ['String'], type: 0 } },
            { label: 'doc_hash', type: { displayName: ['Hash'], type: 1 } },
          ],
          default: false,
          docs: [' Update the DID document for `owner`; caller must equal `owner`.'],
          label: 'set_document',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 19 },
          selector: '0x25ea7a2c',
        },
        {
          args: [
            { label: 'owner', type: { displayName: ['H160'], type: 5 } },
            { label: 'uri', type: { displayName: ['String'], type: 0 } },
            { label: 'doc_hash', type: { displayName: ['Hash'], type: 1 } },
          ],
          default: false,
          docs: [' Admin-only: update another account\u2019s DID document.'],
          label: 'admin_set_document',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 19 },
          selector: '0x6adc090f',
        },
        {
          args: [{ label: 'owner', type: { displayName: ['H160'], type: 5 } }],
          default: false,
          docs: [],
          label: 'has_did',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 22 },
          selector: '0x066b13fa',
        },
        {
          args: [{ label: 'owner', type: { displayName: ['H160'], type: 5 } }],
          default: false,
          docs: [],
          label: 'document_of',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 24 },
          selector: '0x76538e1c',
        },
        {
          args: [
            { label: 'start_index', type: { displayName: ['u32'], type: 26 } },
            { label: 'count', type: { displayName: ['u32'], type: 26 } },
          ],
          default: false,
          docs: [' Return up to `count` owners starting from `start_index`.'],
          label: 'get_did_owners',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 27 },
          selector: '0x570ed3d6',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: {
                  root: {
                    layout: {
                      struct: {
                        fields: [
                          { layout: { leaf: { key: '0x3ea86ad4', ty: 0 } }, name: 'uri' },
                          { layout: { leaf: { key: '0x3ea86ad4', ty: 1 } }, name: 'doc_hash' },
                        ],
                        name: 'DidDocument',
                      },
                    },
                    root_key: '0x3ea86ad4',
                    ty: 4,
                  },
                },
                name: 'docs',
              },
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0x061186ab', ty: 11 } },
                    root_key: '0x061186ab',
                    ty: 12,
                  },
                },
                name: 'admins',
              },
              { layout: { leaf: { key: '0x00000000', ty: 15 } }, name: 'owners' },
            ],
            name: 'DidRegistry',
          },
        },
        root_key: '0x00000000',
        ty: 16,
      },
    },
    types: [
      { id: 0, type: { def: { primitive: 'str' } } },
      {
        id: 1,
        type: {
          def: { composite: { fields: [{ type: 2, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      { id: 2, type: { def: { array: { len: 32, type: 3 } } } },
      { id: 3, type: { def: { primitive: 'u8' } } },
      {
        id: 4,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 5 },
            { name: 'V', type: 7 },
            { name: 'KeyType', type: 8 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 5,
        type: {
          def: { composite: { fields: [{ type: 6, typeName: '[u8; 20]' }] } },
          path: ['primitive_types', 'H160'],
        },
      },
      { id: 6, type: { def: { array: { len: 20, type: 3 } } } },
      {
        id: 7,
        type: {
          def: {
            composite: {
              fields: [
                { name: 'uri', type: 0, typeName: 'String' },
                { name: 'doc_hash', type: 1, typeName: 'Hash' },
              ],
            },
          },
          path: ['did_registry', 'did_registry', 'DidDocument'],
        },
      },
      {
        id: 8,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 9 },
            { name: 'R', type: 10 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      { id: 9, type: { def: { composite: {} }, path: ['ink_storage_traits', 'impls', 'AutoKey'] } },
      {
        id: 10,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 11 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      { id: 11, type: { def: { tuple: [] } } },
      {
        id: 12,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 5 },
            { name: 'V', type: 11 },
            { name: 'KeyType', type: 13 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 13,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 9 },
            { name: 'R', type: 14 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 14,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 11 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      { id: 15, type: { def: { sequence: { type: 5 } } } },
      {
        id: 16,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'docs',
                  type: 4,
                  typeName:
                    '<Mapping<H160, DidDocument> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<3563759678u32,\n()>,>>::Type',
                },
                {
                  name: 'admins',
                  type: 12,
                  typeName:
                    '<Mapping<H160, ()> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<2877690118u32, ()>,>>::Type',
                },
                {
                  name: 'owners',
                  type: 15,
                  typeName:
                    '<Vec<H160> as::ink::storage::traits::AutoStorableHint<::ink::\nstorage::traits::ManualKey<2748885584u32, ()>,>>::Type',
                },
              ],
            },
          },
          path: ['did_registry', 'did_registry', 'DidRegistry'],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 11 }], index: 0, name: 'Ok' },
                { fields: [{ type: 18 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 11 },
            { name: 'E', type: 18 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 18,
        type: {
          def: { variant: { variants: [{ index: 1, name: 'CouldNotReadInput' }] } },
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 19,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 20 }], index: 0, name: 'Ok' },
                { fields: [{ type: 18 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 20 },
            { name: 'E', type: 18 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 20,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 11 }], index: 0, name: 'Ok' },
                { fields: [{ type: 21 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 11 },
            { name: 'E', type: 21 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 21,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'NotAdmin' },
                { index: 1, name: 'CallerMismatch' },
                { index: 2, name: 'DidAlreadyExists' },
                { index: 3, name: 'DidNotFound' },
                { index: 4, name: 'EnvError' },
              ],
            },
          },
          path: ['did_registry', 'did_registry', 'Error'],
        },
      },
      {
        id: 22,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 23 }], index: 0, name: 'Ok' },
                { fields: [{ type: 18 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 23 },
            { name: 'E', type: 18 },
          ],
          path: ['Result'],
        },
      },
      { id: 23, type: { def: { primitive: 'bool' } } },
      {
        id: 24,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 25 }], index: 0, name: 'Ok' },
                { fields: [{ type: 18 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 25 },
            { name: 'E', type: 18 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 25,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'None' },
                { fields: [{ type: 7 }], index: 1, name: 'Some' },
              ],
            },
          },
          params: [{ name: 'T', type: 7 }],
          path: ['Option'],
        },
      },
      { id: 26, type: { def: { primitive: 'u32' } } },
      {
        id: 27,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 15 }], index: 0, name: 'Ok' },
                { fields: [{ type: 18 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 15 },
            { name: 'E', type: 18 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 28,
        type: {
          def: { composite: { fields: [{ type: 2, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      { id: 29, type: { def: { primitive: 'u128' } } },
      { id: 30, type: { def: { primitive: 'u64' } } },
      {
        id: 31,
        type: { def: { variant: {} }, path: ['ink_primitives', 'types', 'NoChainExtension'] },
      },
    ],
    version: 5,
  },
}

// .papi/descriptors/src/contracts/subscription_manager.ts
var descriptor3 = {
  metadata: {
    source: {
      hash: '0xc31ceec0c438c182fc206bca0aef0a47e23a7f26c24831c51f9e32063a1b1e84',
      language: 'ink! 6.0.0-alpha',
      compiler: 'rustc 1.86.0',
      build_info: {
        build_mode: 'Release',
        cargo_contract_version: '6.0.0-alpha',
        rust_toolchain: 'stable-aarch64-apple-darwin',
      },
    },
    contract: {
      name: 'subscription_manager',
      version: '0.1.0',
      authors: ['PolkaStamp <dev@polkastamp.io>'],
    },
    image: null,
    spec: {
      constructors: [
        {
          args: [
            { label: 'admin', type: { displayName: ['H160'], type: 2 } },
            { label: 'price_base', type: { displayName: ['U256'], type: 9 } },
            { label: 'price_plus', type: { displayName: ['U256'], type: 9 } },
          ],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: { displayName: ['ink_primitives', 'ConstructorResult'], type: 15 },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: { displayName: ['AccountId'], type: 20 },
        balance: { displayName: ['Balance'], type: 22 },
        blockNumber: { displayName: ['BlockNumber'], type: 24 },
        chainExtension: { displayName: ['ChainExtension'], type: 25 },
        hash: { displayName: ['Hash'], type: 23 },
        maxEventTopics: 4,
        staticBufferSize: 16384,
        timestamp: { displayName: ['Timestamp'], type: 0 },
      },
      events: [
        {
          args: [
            { docs: [], indexed: true, label: 'team', type: { displayName: ['H160'], type: 2 } },
            { docs: [], indexed: false, label: 'plan_key', type: { displayName: ['u8'], type: 4 } },
            {
              docs: [],
              indexed: false,
              label: 'paid_until',
              type: { displayName: ['u64'], type: 0 },
            },
          ],
          docs: [],
          label: 'SubscriptionPaid',
          module_path: 'subscription_manager::subscription_manager',
          signature_topic: '0xbc1c1313ed6ecfb8be75e9b6e82958936b3922cc6cf75019c5bee878771556ea',
        },
      ],
      lang_error: { displayName: ['ink', 'LangError'], type: 16 },
      messages: [
        {
          args: [
            { label: 'plan_key', type: { displayName: ['u8'], type: 4 } },
            { label: 'new_price', type: { displayName: ['U256'], type: 9 } },
          ],
          default: false,
          docs: [],
          label: 'set_plan_price',
          mutates: true,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 15 },
          selector: '0x1a0cca6a',
        },
        {
          args: [
            { label: 'team', type: { displayName: ['H160'], type: 2 } },
            { label: 'plan_key', type: { displayName: ['u8'], type: 4 } },
          ],
          default: false,
          docs: [],
          label: 'pay_subscription',
          mutates: true,
          payable: true,
          returnType: { displayName: ['ink', 'MessageResult'], type: 15 },
          selector: '0xd9ef8355',
        },
        {
          args: [{ label: 'team', type: { displayName: ['H160'], type: 2 } }],
          default: false,
          docs: [],
          label: 'paid_until',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 17 },
          selector: '0x7ac28d0b',
        },
        {
          args: [{ label: 'plan_key', type: { displayName: ['u8'], type: 4 } }],
          default: false,
          docs: [],
          label: 'price_of',
          mutates: false,
          payable: false,
          returnType: { displayName: ['ink', 'MessageResult'], type: 18 },
          selector: '0x56ee00d9',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0x75e1891b', ty: 0 } },
                    root_key: '0x75e1891b',
                    ty: 1,
                  },
                },
                name: 'paid_until',
              },
              {
                layout: {
                  root: {
                    layout: { leaf: { key: '0x64883e67', ty: 9 } },
                    root_key: '0x64883e67',
                    ty: 11,
                  },
                },
                name: 'plan_price',
              },
              { layout: { leaf: { key: '0x00000000', ty: 2 } }, name: 'admin' },
            ],
            name: 'SubscriptionManager',
          },
        },
        root_key: '0x00000000',
        ty: 14,
      },
    },
    types: [
      { id: 0, type: { def: { primitive: 'u64' } } },
      {
        id: 1,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 2 },
            { name: 'V', type: 0 },
            { name: 'KeyType', type: 5 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 2,
        type: {
          def: { composite: { fields: [{ type: 3, typeName: '[u8; 20]' }] } },
          path: ['primitive_types', 'H160'],
        },
      },
      { id: 3, type: { def: { array: { len: 20, type: 4 } } } },
      { id: 4, type: { def: { primitive: 'u8' } } },
      {
        id: 5,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 7 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      { id: 6, type: { def: { composite: {} }, path: ['ink_storage_traits', 'impls', 'AutoKey'] } },
      {
        id: 7,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      { id: 8, type: { def: { tuple: [] } } },
      {
        id: 9,
        type: {
          def: { composite: { fields: [{ type: 10, typeName: '[u64; 4]' }] } },
          path: ['primitive_types', 'U256'],
        },
      },
      { id: 10, type: { def: { array: { len: 4, type: 0 } } } },
      {
        id: 11,
        type: {
          def: { composite: {} },
          params: [
            { name: 'K', type: 4 },
            { name: 'V', type: 9 },
            { name: 'KeyType', type: 12 },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 12,
        type: {
          def: { composite: {} },
          params: [
            { name: 'L', type: 6 },
            { name: 'R', type: 13 },
          ],
          path: ['ink_storage_traits', 'impls', 'ResolverKey'],
        },
      },
      {
        id: 13,
        type: {
          def: { composite: {} },
          params: [{ name: 'ParentKey', type: 8 }],
          path: ['ink_storage_traits', 'impls', 'ManualKey'],
        },
      },
      {
        id: 14,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'paid_until',
                  type: 1,
                  typeName:
                    '<Mapping<H160, u64> as::ink::storage::traits::AutoStorableHint<\n::ink::storage::traits::ManualKey<462020981u32, ()>,>>::Type',
                },
                {
                  name: 'plan_price',
                  type: 11,
                  typeName:
                    '<Mapping<u8, U256> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<1732151396u32, ()>,>>::Type',
                },
                {
                  name: 'admin',
                  type: 2,
                  typeName:
                    '<H160 as::ink::storage::traits::AutoStorableHint<::ink::storage\n::traits::ManualKey<2039336599u32, ()>,>>::Type',
                },
              ],
            },
          },
          path: ['subscription_manager', 'subscription_manager', 'SubscriptionManager'],
        },
      },
      {
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 8 }], index: 0, name: 'Ok' },
                { fields: [{ type: 16 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 8 },
            { name: 'E', type: 16 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 16,
        type: {
          def: { variant: { variants: [{ index: 1, name: 'CouldNotReadInput' }] } },
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 0 }], index: 0, name: 'Ok' },
                { fields: [{ type: 16 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 0 },
            { name: 'E', type: 16 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 18,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 19 }], index: 0, name: 'Ok' },
                { fields: [{ type: 16 }], index: 1, name: 'Err' },
              ],
            },
          },
          params: [
            { name: 'T', type: 19 },
            { name: 'E', type: 16 },
          ],
          path: ['Result'],
        },
      },
      {
        id: 19,
        type: {
          def: {
            variant: {
              variants: [
                { index: 0, name: 'None' },
                { fields: [{ type: 9 }], index: 1, name: 'Some' },
              ],
            },
          },
          params: [{ name: 'T', type: 9 }],
          path: ['Option'],
        },
      },
      {
        id: 20,
        type: {
          def: { composite: { fields: [{ type: 21, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      { id: 21, type: { def: { array: { len: 32, type: 4 } } } },
      { id: 22, type: { def: { primitive: 'u128' } } },
      {
        id: 23,
        type: {
          def: { composite: { fields: [{ type: 21, typeName: '[u8; 32]' }] } },
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      { id: 24, type: { def: { primitive: 'u32' } } },
      {
        id: 25,
        type: { def: { variant: {} }, path: ['ink_primitives', 'types', 'NoChainExtension'] },
      },
    ],
    version: 5,
  },
}
export {
  ArithmeticError,
  AssetRateEvent,
  BabeAllowedSlots,
  BabeDigestsNextConfigDescriptor,
  BabeDigestsPreDigest,
  BagsListEvent,
  BagsListListListError,
  BalanceStatus,
  BalancesAdjustmentDirection,
  BalancesTypesReasons,
  BountiesBountyStatus,
  BountiesEvent,
  BrokerCoretimeInterfaceCoreAssignment,
  CandidateEvent,
  ChildBountiesEvent,
  ChildBountyStatus,
  ClaimsStatementKind,
  CommonAuctionsEvent,
  CommonClaimsEvent,
  CommonCrowdloanLastContribution,
  CommonParasRegistrarEvent,
  CommonSlotsEvent,
  ConvictionVotingVoteAccountVote,
  ConvictionVotingVoteVoting,
  CoreState,
  DigestItem,
  DispatchClass,
  DispatchRawOrigin,
  ElectionProviderMultiPhaseElectionCompute,
  ElectionProviderMultiPhaseEvent,
  ElectionProviderMultiPhasePhase,
  GovernanceOrigin,
  GrandpaEquivocation,
  GrandpaEvent,
  GrandpaStoredState,
  IndicesEvent,
  InvalidDisputeStatementKind,
  MmrPrimitivesError,
  MultiAddress,
  MultiSignature,
  MultiSigner,
  NominationPoolsBondExtra,
  NominationPoolsClaimPermission,
  NominationPoolsCommissionClaimPermission,
  NominationPoolsConfigOp,
  NominationPoolsPalletFreezeReason,
  NominationPoolsPoolState,
  OccupiedCoreAssumption,
  OffencesEvent,
  ParachainsDisputeLocation,
  ParachainsDisputeResult,
  ParachainsDisputesEvent,
  ParachainsHrmpEvent,
  ParachainsInclusionAggregateMessageOrigin,
  ParachainsInclusionEvent,
  ParachainsInclusionUmpQueueId,
  ParachainsOrigin,
  ParachainsParasEvent,
  ParachainsParasParaLifecycle,
  PaseoXcmVersionedAssetId,
  PaseoXcmVersionedAssets,
  PaseoXcmVersionedLocation,
  PaseoXcmVersionedXcm,
  Phase,
  PolkadotPrimitivesV6DisputeStatement,
  PolkadotPrimitivesV6ExecutorParamsExecutorParam,
  PolkadotPrimitivesV6PvfPrepKind,
  PolkadotPrimitivesV6ValidDisputeStatementKind,
  PolkadotRuntimeOriginCaller,
  PolkadotRuntimeParachainsCoretimeEvent,
  PolkadotRuntimeParachainsSchedulerCommonAssignment,
  PolkadotRuntimeParachainsSchedulerPalletCoreOccupied,
  PreimageEvent,
  PreimageOldRequestStatus,
  PreimagePalletHoldReason,
  PreimageRequestStatus,
  PreimagesBounded,
  PvfExecKind,
  ReferendaTypesCurve,
  SessionEvent,
  SlashingOffenceKind,
  StakingEvent,
  StakingForcing,
  StakingPalletConfigOp,
  StakingPalletConfigOpBig,
  StakingRewardDestination,
  TokenError,
  TraitsScheduleDispatchTime,
  TransactionPaymentEvent,
  TransactionPaymentReleases,
  TransactionValidityError,
  TransactionValidityInvalidTransaction,
  TransactionValidityTransactionSource,
  TransactionValidityUnknownTransaction,
  TransactionalError,
  TreasuryPaymentState,
  UpgradeGoAhead,
  UpgradeRestriction,
  ValidityAttestation,
  Version,
  VersionedLocatableAsset,
  VestingEvent,
  VotingConviction,
  WestendRuntimeRuntimeFreezeReason,
  XcmPalletOrigin,
  XcmPalletQueryStatus,
  XcmPalletVersionMigrationStage,
  XcmV2BodyId,
  XcmV2Instruction,
  XcmV2Junction,
  XcmV2JunctionBodyPart,
  XcmV2MultiAssetFilter,
  XcmV2MultiassetAssetId,
  XcmV2MultiassetAssetInstance,
  XcmV2MultiassetFungibility,
  XcmV2MultiassetWildFungibility,
  XcmV2MultiassetWildMultiAsset,
  XcmV2MultilocationJunctions,
  XcmV2NetworkId,
  XcmV2OriginKind,
  XcmV2Response,
  XcmV2TraitsError,
  XcmV2WeightLimit,
  XcmV3Instruction,
  XcmV3Junction,
  XcmV3JunctionBodyId,
  XcmV3JunctionNetworkId,
  XcmV3Junctions,
  XcmV3MaybeErrorCode,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetAssetInstance,
  XcmV3MultiassetFungibility,
  XcmV3MultiassetMultiAssetFilter,
  XcmV3MultiassetWildMultiAsset,
  XcmV3Response,
  XcmV3TraitsError,
  XcmV3WeightLimit,
  XcmV4AssetAssetFilter,
  XcmV4AssetWildAsset,
  XcmV4Instruction,
  XcmV4Response,
  XcmV4TraitsOutcome,
  XcmV5AssetFilter,
  XcmV5Instruction,
  XcmV5Junction,
  XcmV5Junctions,
  XcmV5NetworkId,
  XcmV5WildAsset,
  XcmVersionedAssetId,
  XcmVersionedAssets,
  XcmVersionedLocation,
  XcmVersionedResponse,
  XcmVersionedXcm,
  contracts_exports as contracts,
  localnode_default as localnode,
  paseo_default as paseo,
  paseo_asset_hub_default as paseo_asset_hub,
  polkadot_default as polkadot,
  polkadot_asset_hub_default as polkadot_asset_hub,
  pop_default as pop,
}
