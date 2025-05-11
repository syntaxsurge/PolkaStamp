#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![allow(clippy::too_many_arguments)]

#[ink::contract(env = ink::env::DefaultEnvironment)]
mod subscription_manager {
    use ink::storage::Mapping;
    use primitive_types::{H160, U256};

    const PERIOD_SECS: u64 = 30 * 24 * 60 * 60; // 30 days in seconds

    #[ink(event)]
    pub struct SubscriptionPaid {
        #[ink(topic)]
        team: H160,
        plan_key: u8,
        paid_until: u64,
    }

    #[ink(storage)]
    pub struct SubscriptionManager {
        paid_until: Mapping<H160, u64>,   // team → Unix ms timestamp
        plan_price: Mapping<u8, U256>,    // planKey → price
        admin: H160,                      // single admin wallet
    }

    impl SubscriptionManager {
        #[ink(constructor)]
        pub fn new(admin: H160, price_base: U256, price_plus: U256) -> Self {
            let mut plan_price = Mapping::default();
            plan_price.insert(1u8, &price_base);
            plan_price.insert(2u8, &price_plus);
            Self { paid_until: Mapping::default(), plan_price, admin }
        }

        fn ensure_admin(&self) {
            assert_eq!(self.env().caller(), self.admin, "Not admin");
        }

        #[ink(message)]
        pub fn set_plan_price(&mut self, plan_key: u8, new_price: U256) {
            self.ensure_admin();
            assert_ne!(plan_key, 0, "planKey 0 reserved");
            self.plan_price.insert(plan_key, &new_price);
        }

        #[ink(message, payable)]
        pub fn pay_subscription(&mut self, team: H160, plan_key: u8) {
            let price = self.plan_price.get(plan_key).unwrap_or_else(U256::zero);
            assert!(!price.is_zero(), "Unknown plan");
            assert_eq!(self.env().transferred_value(), price, "Incorrect payment");

            let now_ms = self.env().block_timestamp();
            let current = self.paid_until.get(team).unwrap_or(0);
            let start = core::cmp::max(current, now_ms);
            let new_expiry = start + PERIOD_SECS * 1_000;

            self.paid_until.insert(team, &new_expiry);

            self.env().emit_event(SubscriptionPaid { team, plan_key, paid_until: new_expiry });
        }

        #[ink(message)]
        pub fn paid_until(&self, team: H160) -> u64 {
            self.paid_until.get(team).unwrap_or(0)
        }

        #[ink(message)]
        pub fn price_of(&self, plan_key: u8) -> Option<U256> {
            self.plan_price.get(plan_key)
        }
    }
}

pub use subscription_manager::SubscriptionManagerRef;