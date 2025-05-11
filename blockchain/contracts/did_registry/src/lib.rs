#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]

#[ink::contract(env = ink::env::DefaultEnvironment)]
mod did_registry {
    use ink::{
        env::hash::{HashOutput, Keccak256},
        prelude::{string::String, vec::Vec},
        storage::Mapping,
    };
    use primitive_types::H160;

    /* ------------------------------------------------------------------ */
    /*                              DATA                                  */
    /* ------------------------------------------------------------------ */

    #[derive(
        scale::Encode,
        scale::Decode,
        Clone,
        Default,
        Debug,
        PartialEq,
        Eq,
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct DidDocument {
        uri: String,
        doc_hash: Hash,
    }

    /* ------------------------------------------------------------------ */
    /*                             ERRORS                                 */
    /* ------------------------------------------------------------------ */

    #[derive(scale::Encode, scale::Decode, Debug, PartialEq, Eq)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotAdmin,
        CallerMismatch,
        DidAlreadyExists,
        DidNotFound,
        EnvError,
    }

    impl From<ink::env::Error> for Error {
        fn from(_: ink::env::Error) -> Self {
            Self::EnvError
        }
    }

    pub type Result<T> = core::result::Result<T, Error>;

    /* ------------------------------------------------------------------ */
    /*                            STORAGE                                 */
    /* ------------------------------------------------------------------ */

    #[ink(storage)]
    pub struct DidRegistry {
        docs: Mapping<H160, DidDocument>,
        admins: Mapping<H160, ()>,
        owners: Vec<H160>,
    }

    /* ------------------------------------------------------------------ */
    /*                               EVENTS                               */
    /* ------------------------------------------------------------------ */

    #[ink(event)]
    pub struct DidCreated {
        #[ink(topic)]
        owner: H160,
        did: String,
        doc_hash: Hash,
    }

    #[ink(event)]
    pub struct DidDocumentUpdated {
        did: String,
        uri: String,
        doc_hash: Hash,
    }

    /* ------------------------------------------------------------------ */
    /*                         IMPLEMENTATION                              */
    /* ------------------------------------------------------------------ */

    impl DidRegistry {
        /* --------------------------- helpers --------------------------- */

        /// Hash any SCALE-encodable account and return the Frontier-style
        /// `H160(keccak256(encoded)[12..])`.
        #[inline]
        fn account_to_h160<T: scale::Encode>(account: &T) -> H160 {
            let mut out = <Keccak256 as HashOutput>::Type::default();
            ink::env::hash_encoded::<Keccak256, _>(account, &mut out);
            H160::from_slice(&out[12..])
        }

        fn addr_hex(addr: &H160) -> String {
            let mut s = String::with_capacity(42);
            s.push_str("0x");
            for b in addr.as_bytes() {
                use ink::prelude::format;
                s.push_str(&format!("{:02x}", b));
            }
            s
        }

        fn did_string(addr: &H160) -> String {
            let mut s = String::from("did:polkadot:");
            s.push_str(&Self::addr_hex(addr));
            s
        }

        fn is_admin(&self, candidate: &H160) -> bool {
            self.admins.contains(candidate)
        }

        fn ensure_admin<A: scale::Encode>(&self, caller: &A) -> Result<()> {
            let h160 = Self::account_to_h160(caller);
            if self.is_admin(&h160) {
                Ok(())
            } else {
                Err(Error::NotAdmin)
            }
        }

        /// Internal helper to insert a fresh owner record.
        fn insert_owner_internal(&mut self, owner: H160, doc_hash: Hash) -> Result<()> {
            if self.docs.contains(&owner) {
                return Err(Error::DidAlreadyExists);
            }
            self.docs.insert(owner, &DidDocument { uri: String::new(), doc_hash });
            self.owners.push(owner);
            self.env().emit_event(DidCreated {
                owner,
                did: Self::did_string(&owner),
                doc_hash,
            });
            Ok(())
        }

        /// Internal helper to mutate a document after the equality/admin check.
        fn set_document_internal(&mut self, owner: H160, uri: String, doc_hash: Hash) -> Result<()> {
            let mut doc = self.docs.get(&owner).ok_or(Error::DidNotFound)?;
            doc.uri = uri.clone();
            doc.doc_hash = doc_hash;
            self.docs.insert(owner, &doc);
            self.env().emit_event(DidDocumentUpdated {
                did: Self::did_string(&owner),
                uri,
                doc_hash,
            });
            Ok(())
        }

        /* ------------------------- constructor ------------------------ */

        #[ink(constructor)]
        pub fn new(admin: H160) -> Self {
            let mut admins = Mapping::default();
            admins.insert(admin, &());
            Self {
                docs: Mapping::default(),
                admins,
                owners: Vec::new(),
            }
        }

        /* --------------------------- CREATE --------------------------- */

        /// Register a new DID for `owner` (explicit H160).
        /// Fails when the caller’s address does not match `owner`.
        #[ink(message)]
        pub fn create_did(&mut self, owner: H160, doc_hash: Hash) -> Result<()> {
            let caller_h160 = self.env().caller();
            // println!(
            //     "create_did invoked; caller_h160: {:?}, owner: {:?}",
            //     caller_h160,
            //     owner
            // );
            if caller_h160 != owner {
                // println!("CallerMismatch detected: caller_h160 != owner");
                return Err(Error::CallerMismatch);
            }
            self.insert_owner_internal(owner, doc_hash)
        }

        /// Admin-only: create a DID for someone else.
        #[ink(message)]
        pub fn admin_create_did(&mut self, owner: H160, doc_hash: Hash) -> Result<()> {
            self.ensure_admin(&self.env().caller())?;
            self.insert_owner_internal(owner, doc_hash)
        }

        /* --------------------------- UPDATE --------------------------- */

        /// Update the DID document for `owner`; caller must equal `owner`.
        #[ink(message)]
        pub fn set_document(&mut self, owner: H160, uri: String, doc_hash: Hash) -> Result<()> {
            let caller = self.env().caller();
            if Self::account_to_h160(&caller) != owner {
                return Err(Error::CallerMismatch);
            }
            self.set_document_internal(owner, uri, doc_hash)
        }

        /// Admin-only: update another account’s DID document.
        #[ink(message)]
        pub fn admin_set_document(
            &mut self,
            owner: H160,
            uri: String,
            doc_hash: Hash,
        ) -> Result<()> {
            self.ensure_admin(&self.env().caller())?;
            self.set_document_internal(owner, uri, doc_hash)
        }

        /* ---------------------------- VIEW ---------------------------- */

        #[ink(message)]
        pub fn has_did(&self, owner: H160) -> bool {
            self.docs.contains(&owner)
        }

        #[ink(message)]
        pub fn document_of(&self, owner: H160) -> Option<DidDocument> {
            self.docs.get(&owner)
        }

        /// Return up to `count` owners starting from `start_index`.
        #[ink(message)]
        pub fn get_did_owners(&self, start_index: u32, count: u32) -> Vec<H160> {
            let len = self.owners.len() as u32;
            if start_index >= len {
                return Vec::new();
            }
            let end = core::cmp::min(len, start_index + count);
            self.owners[start_index as usize..end as usize].to_vec()
        }
    }
}

/// Re-export for generated metadata consumers.
pub use crate::did_registry::DidRegistryRef;
/// Public re-exports for integration tests and external crates.
pub use crate::did_registry::{DidRegistry, Error};