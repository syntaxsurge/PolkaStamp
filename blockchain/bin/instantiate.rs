use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use anyhow::{bail, Context, Result};
use dotenvy::dotenv;
use sp_core::hashing::keccak_256;
use sp_core::crypto::Ss58Codec;

use polkastamp_contracts::extract::{extract_contract_hex, extract_contract_ss58, extract_last_ss58};

/* -------------------------------------------------------------------------- */
/*                               E N V  L O G                                 */
/* -------------------------------------------------------------------------- */

/// Append or update a `KEY=value` line inside `deployment.log`, creating the
/// file with a friendly banner if it is missing.
fn update_env_log(key: &str, value: &str) -> Result<()> {
    let log_path = Path::new("deployment.log");

    let mut new_content = String::new();
    if log_path.exists() {
        let content = fs::read_to_string(log_path)?;
        let mut found = false;
        for line in content.lines() {
            if line.starts_with(&format!("{key}=")) {
                new_content.push_str(&format!("{key}={value}\n"));
                found = true;
            } else {
                new_content.push_str(line);
                new_content.push('\n');
            }
        }
        if !found {
            new_content.push_str(&format!("{key}={value}\n"));
        }
    } else {
        new_content.push_str("# Deployed contract addresses\n");
        new_content.push_str(&format!("{key}={value}\n"));
    }
    fs::write(log_path, new_content.trim_end())?;
    Ok(())
}

/* -------------------------------------------------------------------------- */
/*                        C O N F I G   P R I N T E R                         */
/* -------------------------------------------------------------------------- */

/// Mask a secret string, keeping `head` leading and `tail` trailing characters.
fn mask_secret(secret: &str, head: usize, tail: usize) -> String {
    if secret.len() <= head + tail {
        return secret.to_string();
    }
    let start = &secret[..head];
    let end = &secret[secret.len() - tail..];
    format!("{start}…{end}")
}

/// Pretty-print the loaded environment so the operator can verify values.
fn print_config(
    ws_endpoint: &str,
    sudo_seed: &str,
    admin_ss58: &str,
    platform_ss58: &str,
    price_base: &str,
    price_plus: &str,
    platform_did: &str,
) {
    println!("🔧  Loaded configuration:");
    println!("    POLKADOT_WS_ENDPOINT        = {ws_endpoint}");
    println!(
        "    POLKADOT_SUDO_SEED          = {}",
        mask_secret(sudo_seed, 6, 4)
    );
    println!("    ADMIN_ADDRESS               = {admin_ss58}");
    println!("    PLATFORM_ADDRESS            = {platform_ss58}");
    println!("    PLATFORM_DID                = {platform_did}");
    println!("    SUBSCRIPTION_PRICE_DOT_BASE = {price_base}");
    println!("    SUBSCRIPTION_PRICE_DOT_PLUS = {price_plus}");
    println!();
}

/* -------------------------------------------------------------------------- */
/*                      H 1 6 0  →  D I D   H E L P E R                       */
/* -------------------------------------------------------------------------- */

/// Convert a 0x-prefixed, lower-case H160 string into a did:polkadot DID.
fn h160_to_did(h160: &str) -> String {
    let hex = h160.trim_start_matches("0x");
    format!("did:polkadot:0x{}", hex.to_ascii_lowercase())
}

/* -------------------------------------------------------------------------- */
/*                                     M A I N                               */
/* -------------------------------------------------------------------------- */

fn main() -> Result<()> {
    dotenv().ok();

    let ws_endpoint =
        env::var("POLKADOT_WS_ENDPOINT").unwrap_or_else(|_| "ws://127.0.0.1:9944".to_string());
    let sudo_seed = env::var("POLKADOT_SUDO_SEED").unwrap_or_else(|_| "//Alice".to_string());

    let admin_raw = env::var("ADMIN_SS58_ADDRESS")
        .or_else(|_| env::var("ADMIN_ADDRESS"))
        .context("Missing ADMIN address")?;
    let platform_raw = env::var("PLATFORM_SS58_ADDRESS")
        .or_else(|_| env::var("PLATFORM_ADDRESS"))
        .context("Missing PLATFORM address")?;

    let admin_h160 = to_h160(&admin_raw)?;
    let platform_h160 = to_h160(&platform_raw)?;
    let platform_did = h160_to_did(&platform_h160);

    let price_base =
        env::var("SUBSCRIPTION_PRICE_DOT_BASE").unwrap_or_else(|_| "50000000000".into());
    let price_plus =
        env::var("SUBSCRIPTION_PRICE_DOT_PLUS").unwrap_or_else(|_| "100000000000".into());

    /* --------------------------- Config preview --------------------------- */
    print_config(
        &ws_endpoint,
        &sudo_seed,
        &admin_raw,
        &platform_raw,
        &price_base,
        &price_plus,
        &platform_did,
    );

    /* ----------------------- Persist default platform DID ----------------- */
    update_env_log("NEXT_PUBLIC_PLATFORM_ISSUER_DID", &platform_did)?;

    /* ------------------------ Instantiate contracts ----------------------- */
    instantiate(
        "did_registry",
        &sudo_seed,
        &ws_endpoint,
        &[&admin_h160],
        "NEXT_PUBLIC_DID_CONTRACT_ADDRESS",
    )?;
    instantiate(
        "credential_nft",
        &sudo_seed,
        &ws_endpoint,
        &[&admin_h160, &platform_h160],
        "NEXT_PUBLIC_CREDENTIAL_NFT_CONTRACT_ADDRESS",
    )?;
    instantiate(
        "subscription_manager",
        &sudo_seed,
        &ws_endpoint,
        &[&admin_h160, &price_base, &price_plus],
        "NEXT_PUBLIC_SUBSCRIPTION_MANAGER_CONTRACT_ADDRESS",
    )?;

    Ok(())
}

/* -------------------------------------------------------------------------- */
/*                                H E L P E R S                               */
/* -------------------------------------------------------------------------- */

fn to_h160(addr: &str) -> Result<String> {
    if let Some(hex) = addr.strip_prefix("0x") {
        if hex.len() == 40 && hex.chars().all(|c| c.is_ascii_hexdigit()) {
            return Ok(format!("0x{}", hex.to_ascii_lowercase()));
        }
    }
    let account = sp_core::crypto::AccountId32::from_ss58check(addr)
        .map_err(|e| anyhow::anyhow!("Invalid SS58: {e}"))?;
    let hash = keccak_256(account.as_ref());
    Ok(format!("0x{}", hex::encode(&hash[12..])))
}

fn instantiate(
    contract_dir: &str,
    sudo_seed: &str,
    ws: &str,
    args: &[&str],
    env_key: &str,
) -> Result<()> {
    let dir = PathBuf::from("contracts").join(contract_dir);
    if !dir.exists() {
        bail!("Contract directory `{}` not found", dir.display());
    }

    println!("📦  Building `{}` …", contract_dir);
    let status_build = Command::new("cargo")
        .current_dir(&dir)
        .arg("contract")
        .arg("build")
        .arg("--release")
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .spawn()?
        .wait()?;
    if !status_build.success() {
        bail!("Build of `{}` failed", contract_dir);
    }

    println!("🔨  Instantiating `{}` …", contract_dir);
    let output = Command::new("cargo")
        .current_dir(&dir)
        .arg("contract")
        .arg("instantiate")
        .arg("--suri")
        .arg(sudo_seed)
        .arg("--execute")
        .arg("--skip-confirm")
        .arg("--url")
        .arg(ws)
        .arg("--args")
        .args(args)
        .output()?;

    if !output.status.success() {
        bail!(
            "Instantiation of `{}` failed:\n{}",
            contract_dir,
            String::from_utf8_lossy(&output.stderr)
        );
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    print!("{stdout}");

    /* --------------------- Extract deployed contract address -------------------- */
    // Prefer the exact hex address, then SS58 conversions, then any last SS58 token.
    let addr_opt: Option<String> = extract_contract_hex(&stdout)
        .or_else(|| extract_contract_ss58(&stdout))
        .or_else(|| extract_last_ss58(&stdout));

    if let Some(addr) = addr_opt {
        update_env_log(env_key, &addr)?;
        println!("🔖  {env_key} = {addr}");
    } else {
        eprintln!("⚠️   Unable to detect contract address for `{}`", contract_dir);
    }

    println!("✅  `{}` instantiated successfully\n", contract_dir);
    Ok(())
}