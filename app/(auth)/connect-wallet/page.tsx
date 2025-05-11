"use client";

import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";
import { useCallback } from "react";

import { WalletSelect } from "@/components/account/wallet-select";
import { ChainSelect } from "@/components/chain/chain-select";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { WALLET_HEADER } from "@/lib/constants/blockchain";
import { toH160Hex } from "@/lib/contract-utils";

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function ConnectWalletPage() {
  const router = useRouter();
  const { isInitializing } = usePolkadotExtension();

  /* ---------------------- Handle account selection ---------------------- */
  const handleAccountSelected = useCallback(
    async (address: string) => {
      let walletHex: `0x${string}`;
      try {
        walletHex = toH160Hex(address);
      } catch {
        return; // invalid
      }

      try {
        const res = await fetch(`/api/auth/wallet-status?address=${walletHex}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));

        if (res.ok && json?.exists) {
          router.replace("/dashboard"); // session cookie set
          return;
        }

        /* Unknown wallet – store header so dashboard SSR shows onboarding */
        sessionStorage.setItem(WALLET_HEADER, walletHex);
        router.replace("/dashboard");
      } catch {
        sessionStorage.setItem(WALLET_HEADER, walletHex);
        router.replace("/dashboard");
      }
    },
    [router],
  );

  /* ------------------------------ UI ------------------------------------ */
  if (isInitializing) {
    return (
      <section className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-md items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Initialising wallet extensions…
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <Wallet className="h-10 w-10 text-primary" strokeWidth={1.5} />
        <h1 className="text-3xl font-extrabold tracking-tight">
          Connect Your Wallet
        </h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          To continue, please connect a Polkadot wallet extension, select an
          account, and choose a chain.
        </p>
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        <ChainSelect />
        <WalletSelect
          placeholder="Select Wallet"
          onAccountSelected={handleAccountSelected}
        />
      </div>
    </section>
  );
}