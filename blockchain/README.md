# PolkaStamp Blockchain Package — **Polkadot Edition**

This workspace compiles, tests, and deploys PolkaStamp’s ink! smart-contracts on **Polkadot / Westend** and ships CLI helpers to automate local or remote deployments.

---

## 📂 Folder Structure

| Path                     | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `contracts/`             | ink! crates: `did_registry`, `credential_nft`, `subscription_manager`.   |
| `bin/instantiate.rs`     | Rust CLI → builds & instantiates all contracts on the target chain.      |
| `bin/extract_address.rs` | Utility parsing `cargo contract` logs and printing the deployed address. |
| `deployment.log`         | Auto-appended file storing the latest contract addresses & constants.    |
| `.env.example`           | Template for the variables consumed by the CLI toolchain.                |
| `Cargo.toml`             | Workspace manifest wiring every sub-crate (contracts + binaries).        |

---

## 🛠 Prerequisites

1. **Rust stable** (via [`rustup`](https://rustup.rs/))
2. **cargo-contract v`6`**

   ```bash
   cargo install --git https://github.com/use-ink/cargo-contract.git --locked --force
   ```

3. **ink-node** (single-binary Substrate node with Contracts pallet)

   Installation guide ➜ <https://github.com/use-ink/ink-node>

---

## ⚡ Start a Local Chain

```bash
ink-node --dev -lruntime::revive=debug
```

The node exposes **`ws://127.0.0.1:9944`**.
_Tip —_ open the Polkadot/apps UI:

<https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/accounts>

## 🚀 Instantiate All Contracts

Create `.env` from the template and fill in at minimum:

- `POLKADOT_WS_ENDPOINT` – RPC endpoint (e.g. `ws://127.0.0.1:9944`)
- `POLKADOT_SUDO_SEED` – dev key (defaults to `//Alice`)
- `ADMIN_SS58_ADDRESS` – super-admin wallet
- `PLATFORM_SS58_ADDRESS` – backend signer (platform DID owner)
- `SUBSCRIPTION_PRICE_DOT_BASE` / `PLUS` – plan prices in **whole DOT**

Then run:

```bash
cargo run --release --bin instantiate_contracts
```

The script:

1. **builds** each contract in release mode,
2. **instantiates** them via `cargo contract instantiate`,
3. **extracts** the deployed addresses,
4. **writes**/updates `deployment.log` and prints `.env` keys to copy-paste.

---

## 🔍 Extract a Contract Address from Logs

```bash
cargo run --bin extract_address -- bin/sample_log.txt
```

Outputs the first `0x…`/SS58 address found in the file/stdin.

---

## 🗝️ Environment Keys Written by the CLI

| Purpose                        | Key                                        |
| ------------------------------ | ------------------------------------------ |
| DID Registry address           | `NEXT_PUBLIC_DID_CONTRACT_ADDRESS`         |
| Credential NFT address         | `NEXT_PUBLIC_CREDENTIAL_NFT_CONTRACT_ADDRESS`       |
| Subscription Manager address   | `NEXT_PUBLIC_SUBSCRIPTION_MANAGER_CONTRACT_ADDRESS` |
| Platform DID (polkadot method) | `NEXT_PUBLIC_PLATFORM_ISSUER_DID`          |

---

## 🌐 Explorer & Wallet Links

- **Accounts & signing UI**:
  <https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/accounts>

- **Explorer example** (replace hash):
  <https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer/query/0xd8b6…ab6c>

---

## ❓ FAQ

- **Why Westend?** – It’s the public Polkadot testnet supporting Contracts & PAPI.
- **Production deployment?** – Point `POLKADOT_WS_ENDPOINT` to a parachain RPC and use a funded SUDO key.
- **Upgrade prices after launch?** – Call `SubscriptionManager.set_plan_price(planKey, newPrice)` from the admin wallet.
- **Grant new issuer role?** – `credential_nft.grant_issuer_role(ss58Address)` by the admin.

Happy hacking on **Polkadot + ink!** 🚀

Test:

cd contracts/did_registry && cargo test

cd contracts/credential_nft && cargo test
