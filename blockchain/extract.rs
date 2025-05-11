#![cfg(feature = "std")]

use hex;
use sp_core::{
    crypto::{AccountId32, Ss58Codec},
};

/// Convert a 64-char hex-encoded AccountId (32 bytes) into an SS58 string
/// using the Polkadot prefix (0).
pub fn hex32_to_ss58(hex: &str) -> Option<String> {
    if hex.len() != 64 {
        return None;
    }
    let mut bytes = [0u8; 32];
    hex::decode_to_slice(hex, &mut bytes).ok()?;
    let account = AccountId32::from(bytes);
    Some(account.to_ss58check())
}

/// Scan a cargo-contract log and return the first `0x…` 32-byte address in
/// hex format (as printed by the tool).
pub fn extract_contract_hex(log: &str) -> Option<String> {
    for line in log.lines() {
        let trimmed = line.trim_start();
        if let Some(rest) = trimmed.strip_prefix("Contract ") {
            let addr = rest.trim_start();
            if let Some(tok) = addr.split_whitespace().next() {
                if tok.starts_with("0x") && tok.len() >= 42 {
                    let clean = tok
                        .trim_end_matches(|c: char| !c.is_ascii_hexdigit())
                        .to_ascii_lowercase();
                    if clean.len() == 42 {
                        return Some(clean);
                    }
                }
            }
        }
    }
    None
}

/// Convenience wrapper that combines [`extract_contract_hex`] and
/// [`hex32_to_ss58`] to return an SS58 address if possible.
pub fn extract_contract_ss58(log: &str) -> Option<String> {
    extract_contract_hex(log)
        .and_then(|h| hex32_to_ss58(h.trim_start_matches("0x")))
}

/// Legacy fallback — returns the last 48-char SS58 token found in the input.
/// Useful if cargo-contract output format changes.
pub fn extract_last_ss58(log: &str) -> Option<String> {
    let mut last: Option<String> = None;
    for tok in log.split(|c: char| {
        c.is_whitespace() || matches!(c, '[' | ']' | ',' | '\"' | '(' | ')')
    }) {
        if tok.len() == 48 && tok.starts_with('5') {
            last = Some(tok.to_string());
        }
    }
    last
}