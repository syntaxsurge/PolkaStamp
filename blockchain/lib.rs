#![cfg_attr(not(feature = "std"), no_std)]
#![cfg_attr(not(feature = "std"), no_main)]

pub use did_registry::DidRegistryRef;
pub use credential_nft::CredentialNftRef;
pub use subscription_manager::SubscriptionManagerRef;

/// Utility helpers available only for host tools built with `std`.
#[cfg(feature = "std")]
pub mod extract;

/* -------------------------------------------------------------------------- */
/*                          E N T R Y P O I N T S                             */
/* -------------------------------------------------------------------------- */

/// When built with the `std` feature (e.g., unit tests or CLI binaries),
/// provide a no-op main so `cargo test` succeeds.
#[cfg(feature = "std")]
#[allow(dead_code)]
fn main() {}

/// For `no_std` builds (cargo-contract), supply a minimal `_start` symbol.
#[cfg(not(feature = "std"))]
#[no_mangle]
pub extern "C" fn _start() -> ! {
    loop {}
}