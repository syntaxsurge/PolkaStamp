#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]

#[ink::contract(env = ink::env::DefaultEnvironment)]
mod credential_nft {
    use ink::prelude::string::String;
    use ink::storage::Mapping;
    use primitive_types::H160;

    type TokenId = u128;

    #[ink(event)]
    pub struct CredentialMinted {
        #[ink(topic)]
        to: H160,
        #[ink(topic)]
        token_id: TokenId,
        vc_hash: Hash,
        uri: String,
    }

    #[ink(event)]
    pub struct CredentialUpdated {
        #[ink(topic)]
        token_id: TokenId,
        vc_hash: Hash,
        uri: String,
    }

    #[ink(event)]
    pub struct CredentialRevoked {
        #[ink(topic)]
        token_id: TokenId,
    }

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
    struct CredentialData {
        vc_hash: Hash,
    }

    #[ink(storage)]
    pub struct CredentialNft {
        owner_of: Mapping<TokenId, H160>,
        token_uri: Mapping<TokenId, String>,
        credential: Mapping<TokenId, CredentialData>,
        minted_hashes: Mapping<Hash, ()>,
        next_id: TokenId,

        admin: H160,
        issuers: Mapping<H160, ()>,
        platform: H160,
    }

    impl CredentialNft {
        #[ink(constructor)]
        pub fn new(admin: H160, platform: H160) -> Self {
            let mut contract = Self {
                owner_of: Mapping::default(),
                token_uri: Mapping::default(),
                credential: Mapping::default(),
                minted_hashes: Mapping::default(),
                next_id: 0,
                admin,
                issuers: Mapping::default(),
                platform,
            };
            contract.issuers.insert(admin, &());
            contract
        }

        fn is_admin(&self, a: H160) -> bool {
            a == self.admin
        }
        fn is_platform(&self, a: H160) -> bool {
            a == self.platform
        }
        fn is_issuer(&self, a: H160) -> bool {
            self.issuers.contains(a)
        }

        #[ink(message)]
        pub fn grant_issuer_role(&mut self, account: H160) {
            assert!(self.is_admin(self.env().caller()), "Not admin");
            self.issuers.insert(account, &());
        }

        #[ink(message, payable)]
        pub fn mint_credential(&mut self, to: H160, vc_hash: Hash, uri: String) -> TokenId {
            let caller = self.env().caller();
            assert!(
                self.is_admin(caller) || self.is_platform(caller) || self.is_issuer(caller),
                "Not authorised"
            );
            assert!(!self.minted_hashes.contains(vc_hash), "VC anchored");
            self.minted_hashes.insert(vc_hash, &());

            let id = self.next_id;
            self.next_id += 1;

            self.owner_of.insert(id, &to);
            if !uri.is_empty() {
                self.token_uri.insert(id, &uri);
            }
            self.credential.insert(id, &CredentialData { vc_hash });

            self.env().emit_event(CredentialMinted { to, token_id: id, vc_hash, uri });

            id
        }

        #[ink(message)]
        pub fn update_credential(
            &mut self,
            token_id: TokenId,
            new_vc_hash: Hash,
            new_uri: String,
        ) {
            let caller = self.env().caller();
            assert!(
                self.is_admin(caller) || self.is_issuer(caller),
                "Not authorised"
            );
            assert!(self.owner_of.contains(token_id), "Nonexistent");

            self.credential.insert(token_id, &CredentialData { vc_hash: new_vc_hash });
            self.token_uri.insert(token_id, &new_uri);

            self.env().emit_event(CredentialUpdated { token_id, vc_hash: new_vc_hash, uri: new_uri });
        }

        #[ink(message)]
        pub fn revoke_credential(&mut self, token_id: TokenId) {
            let caller = self.env().caller();
            let owner = self.owner_of.get(token_id).expect("Nonexistent");
            assert!(
                self.is_admin(caller) || self.is_issuer(caller) || caller == owner,
                "Not authorised"
            );

            self.owner_of.remove(token_id);
            self.token_uri.remove(token_id);
            self.credential.remove(token_id);

            self.env().emit_event(CredentialRevoked { token_id });
        }

        #[ink(message)]
        pub fn owner_of(&self, token_id: TokenId) -> Option<H160> {
            self.owner_of.get(token_id)
        }

        #[ink(message)]
        pub fn token_uri(&self, token_id: TokenId) -> Option<String> {
            self.token_uri.get(token_id)
        }

        #[ink(message)]
        pub fn vc_hash(&self, token_id: TokenId) -> Option<Hash> {
            self.credential.get(token_id).map(|d| d.vc_hash)
        }
    }
}

/// Re-export for generated metadata consumers.
pub use crate::credential_nft::CredentialNftRef;
/// Public re-exports for integration tests and external crates.
pub use crate::credential_nft::CredentialNft;