#![cfg_attr(not(feature = "std"), no_std)]

use ink::env::{
    hash::{HashOutput, Keccak256},
    test,
};
use primitive_types::H160;
use scale::Encode;

use did_registry::{DidRegistry};
use bs58;

type Hash = <ink::env::DefaultEnvironment as ink::env::Environment>::Hash;

/// Convert any SCALE-encodable account to H160 in the same way as the contract.
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
fn create_did_raw_payload_succeeds() {
    // Exact payload from frontend (values kept verbatim with 0x prefix)
    let data: &str = "0xfb9f4f54ecf4d870163e0b75d4d035d79ecc87e6f03616650000000000000000000000000000000000000000000000000000000000000000";
    let caller_ss58: &str = "5F4UaeTGaLWLvXE4rng32xhPAL5WMVhvYaMHdGTGurDd218Z";

    // Prepare contract
    let accounts = test::default_accounts();
    let admin_h160 = account_to_h160(&accounts.alice);
    let mut contract = DidRegistry::new(admin_h160);

    // Decode caller AccountId from SS58, convert to H160, and set it
    let caller_h160: H160 = account_h160_from_ss58(caller_ss58);
    test::set_caller(caller_h160);
    let doc_hash = hash_from_data_hex(data);

    // Act
    println!("caller_h160: {:?}, doc_hash: {:?}", caller_h160, doc_hash);
    let res = contract.create_did(caller_h160, doc_hash);

    // Assert with detailed error on failure
    match res {
        Ok(_) => {
            assert!(contract.has_did(caller_h160), "DID should exist after successful creation");
        }
        Err(e) => {
            panic!("create_did failed with error: {:?}", e);
        }
    }
}