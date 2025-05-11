use std::env;
use std::fs;
use std::io::{self, Read};

use polkastamp_contracts::extract::extract_contract_hex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Read from a file path argument or stdin
    let mut input = String::new();
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        input = fs::read_to_string(&args[1])?;
    } else {
        io::stdin().read_to_string(&mut input)?;
    }

    match extract_contract_hex(&input) {
        Some(addr) => {
            println!("{addr}");
            Ok(())
        }
        None => {
            eprintln!("No contract address found.");
            std::process::exit(1);
        }
    }
}