#![cfg_attr(not(feature = "std"), no_std)]

use ink::env::{
    hash::{HashOutput, Keccak256},
    test,
};
use primitive_types::H160;
use scale::Encode;

use credential_nft::CredentialNft;
use ink::prelude::string::String;
use bs58;

type Hash = <ink::env::DefaultEnvironment as ink::env::Environment>::Hash;

/// Convert any SCALE-encodable account to an H160 in the same way as the contract helper.
fn account_to_h160<T: Encode>(account: &T) -> H160 {
    let mut out = <Keccak256 as HashOutput>::Type::default();
    ink::env::hash_encoded::<Keccak256, _>(account, &mut out);
    H160::from_slice(&out[12..])
}

/// Build a 32-byte Hash from the first 64 hex chars of a 0x-prefixed data blob.
fn hash_from_data_hex(hex_str: &str) -> Hash {
    assert!(hex_str.starts_with("0x"), "hex must start with 0x");
    let clean = &hex_str[2..];
    let mut out = [0u8; 32];
    for i in 0..32 {
        out[i] = u8::from_str_radix(&clean[2 * i..2 * i + 2], 16).unwrap();
    }
    out.into()
}

/// Decode an SS58-encoded AccountId32 and convert it into its corresponding H160.
fn account_h160_from_ss58(ss58: &str) -> H160 {
    let data = bs58::decode(ss58)
        .into_vec()
        .expect("invalid base58 in SS58 string");
    assert!(
        data.len() >= 35,
        "SS58-decoded length must be at least 35 bytes"
    );
    let mut bytes = [0u8; 32];
    bytes.copy_from_slice(&data[1..33]);
    account_to_h160(&bytes)
}

#[ink::test]
fn mint_credential_raw_payload_succeeds() {
    // Exact payload captured from the frontend (kept verbatim with 0x prefix)
    let data: &str = "0x1893bc36ecf4d870163e0b75d4d035d79ecc87e6f03616658d970d14dfea512d9285fe41340152632c9e5034c0db3c53b82a03863651b91a00";
    let to_ss58: &str = "5F4UaeTGaLWLvXE4rng32xhPAL5WMVhvYaMHdGTGurDd218Z";

    // Prepare contract with admin and platform roles
    let accounts = test::default_accounts();
    let admin_h160 = account_to_h160(&accounts.alice);
    let platform_h160 = account_to_h160(&accounts.bob);
    let mut contract = CredentialNft::new(admin_h160, platform_h160);

    // Admin mints a new credential for `to`
    test::set_caller(admin_h160);
    let to_h160: H160 = account_h160_from_ss58(to_ss58);
    let vc_hash = hash_from_data_hex(data);
    let token_id = contract.mint_credential(to_h160, vc_hash, String::new());

    // Assert owner and vc_hash are stored correctly
    assert_eq!(contract.owner_of(token_id), Some(to_h160));
    assert_eq!(contract.vc_hash(token_id), Some(vc_hash));
}