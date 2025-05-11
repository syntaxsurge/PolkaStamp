"use client";

import React, { useEffect, useState } from "react";
import {
  KeyRound as KeyIcon,
  Clipboard,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import PageCard from "@/components/ui/page-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import {
  mnemonicToPrivateKey,
  privateKeyToMnemonic,
  derivePublicKeysFromMnemonic,
  derivePublicKeysFromPrivateKey,
  h160ToSs58,
  ss58ToH160,
} from "@/lib/utils/key-converter";
import { trimAddress } from "@/lib/utils/address";

/* -------------------------------------------------------------------------- */
/*                       D E V   A C C O U N T   D A T A                      */
/* -------------------------------------------------------------------------- */

const BASE_MNEMONIC =
  "bottom drive obey lake curtain smoke basket hold race lonely fit walk";

const DERIVATIONS = [
  "//Alice",
  "//Bob",
  "//Charlie",
  "//Dave",
  "//Eve",
  "//Ferdie",
] as const;

type DevAccount = {
  label: string;
  path: string;
  seedPhrase: string;
  privateKey: `0x${string}`;
};

function buildDevAccounts(): DevAccount[] {
  return DERIVATIONS.map((path) => {
    const label = path.replace("//", "");
    const seedPhrase = `${BASE_MNEMONIC}${path}`;
    return {
      label,
      path,
      seedPhrase,
      privateKey: "0x" + "0".repeat(64), // placeholder, filled async below
    };
  });
}

const DEV_ACCOUNTS = buildDevAccounts();

/* ----------------------------- UI Helpers --------------------------------- */

function CopyInput({
  value,
  onChange,
  placeholder,
  error,
  copyLabel,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  error?: boolean;
  copyLabel: string;
}) {
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`font-mono text-xs pr-12 ${error ? "border-destructive" : ""}`}
        spellCheck={false}
      />
      {value && (
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => copyToClipboard(value)}
        >
          <Clipboard className="size-4" />
          <span className="sr-only">{copyLabel}</span>
        </Button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               C O M P O N E N T                            */
/* -------------------------------------------------------------------------- */

export default function KeyConverterPage() {
  /* ------------------------- Mnemonic ⇄ Private key --------------------- */
  const [mnemonicIn, setMnemonicIn] = useState("");
  const [privateOut, setPrivateOut] = useState("");
  const [mnemonicPubH160, setMnemonicPubH160] = useState("");
  const [mnemonicPubSs58, setMnemonicPubSs58] = useState("");
  const [mnemonicError, setMnemonicError] = useState(false);

  useEffect(() => {
    if (!mnemonicIn.trim()) {
      setPrivateOut("");
      setMnemonicPubH160("");
      setMnemonicPubSs58("");
      setMnemonicError(false);
      return;
    }
    (async () => {
      try {
        const pk = await mnemonicToPrivateKey(mnemonicIn);
        const pub = await derivePublicKeysFromMnemonic(mnemonicIn);
        setPrivateOut(pk);
        setMnemonicPubH160(pub.h160);
        setMnemonicPubSs58(pub.ss58);
        setMnemonicError(false);
      } catch {
        setPrivateOut("");
        setMnemonicPubH160("");
        setMnemonicPubSs58("");
        setMnemonicError(true);
      }
    })();
  }, [mnemonicIn]);

  /* ------------------------- Private key ⇄ Mnemonic --------------------- */
  const [privateIn, setPrivateIn] = useState("");
  const [mnemonicOut, setMnemonicOut] = useState("");
  const [privatePubH160, setPrivatePubH160] = useState("");
  const [privatePubSs58, setPrivatePubSs58] = useState("");
  const [privateError, setPrivateError] = useState(false);

  useEffect(() => {
    if (!privateIn.trim()) {
      setMnemonicOut("");
      setPrivatePubH160("");
      setPrivatePubSs58("");
      setPrivateError(false);
      return;
    }
    (async () => {
      try {
        const mn = await privateKeyToMnemonic(privateIn);
        const pub = await derivePublicKeysFromPrivateKey(privateIn);
        setMnemonicOut(mn);
        setPrivatePubH160(pub.h160);
        setPrivatePubSs58(pub.ss58);
        setPrivateError(false);
      } catch {
        setMnemonicOut("");
        setPrivatePubH160("");
        setPrivatePubSs58("");
        setPrivateError(true);
      }
    })();
  }, [privateIn]);

  /* --------------------------- H160 ⇄ SS58 ------------------------------ */
  const [h160Addr, setH160Addr] = useState("");
  const [ss58Addr, setSs58Addr] = useState("");
  const [addrError, setAddrError] = useState(false);

  /* H160 input */
  function handleH160Change(v: string) {
    setH160Addr(v);
    if (!v.trim()) {
      setSs58Addr("");
      setAddrError(false);
      return;
    }
    try {
      const ss = h160ToSs58(v.trim());
      setSs58Addr(ss);
      setAddrError(false);
    } catch {
      setSs58Addr("");
      setAddrError(true);
    }
  }

  /* SS58 input */
  function handleSs58Change(v: string) {
    setSs58Addr(v);
    if (!v.trim()) {
      setH160Addr("");
      setAddrError(false);
      return;
    }
    try {
      const h = ss58ToH160(v.trim());
      setH160Addr(h);
      setAddrError(false);
    } catch {
      setH160Addr("");
      setAddrError(true);
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                                UI                                      */
  /* ---------------------------------------------------------------------- */
  return (
    <PageCard
      icon={KeyIcon}
      title="Key & Address Converter"
      description="Convert between mnemonic, private key, H160 and SS58 with automatic public-key derivation."
      className="space-y-8"
    >
      {/* Key converters ---------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mnemonic → Private */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Mnemonic → Private key</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <CopyInput
              value={mnemonicIn}
              onChange={setMnemonicIn}
              placeholder='e.g. "bottom drive… //Alice"'
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              value={privateOut}
              placeholder="0x…"
              copyLabel="Copy private key"
            />
            <CopyInput
              value={mnemonicPubH160}
              placeholder="H160 address…"
              copyLabel="Copy H160"
            />
            <CopyInput
              value={mnemonicPubSs58}
              placeholder="SS58 address…"
              copyLabel="Copy SS58"
            />
            {mnemonicError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-4" />
                Invalid mnemonic supplied.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Private → Mnemonic */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Private key → Mnemonic</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <CopyInput
              value={privateIn}
              onChange={setPrivateIn}
              placeholder="0x…16- or 32-byte hex"
              copyLabel="Copy private key"
              error={privateError}
            />
            <CopyInput
              value={mnemonicOut}
              placeholder="Mnemonic will appear…"
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              value={privatePubH160}
              placeholder="H160 address…"
              copyLabel="Copy H160"
            />
            <CopyInput
              value={privatePubSs58}
              placeholder="SS58 address…"
              copyLabel="Copy SS58"
            />
            {privateError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-4" />
                Invalid entropy hex supplied.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Address converter -------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Address Converter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CopyInput
            value={h160Addr}
            onChange={handleH160Change}
            placeholder="0x…20-byte H160"
            copyLabel="Copy H160"
            error={addrError}
          />
          <CopyInput
            value={ss58Addr}
            onChange={handleSs58Change}
            placeholder="SS58 address"
            copyLabel="Copy SS58"
            error={addrError}
          />
          {addrError && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-4" />
              Invalid address supplied.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Dev accounts ------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">Polkadot Dev Accounts</CardTitle>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setMnemonicIn(BASE_MNEMONIC);
                toast.success("Loaded base mnemonic into converter ✨");
              }}
            >
              <RefreshCcw className="mr-2 size-4" />
              Base mnemonic
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_ACCOUNTS.map(({ label, path, seedPhrase }) => (
            <div
              key={label}
              className="rounded-md border p-4 bg-muted/50 space-y-2"
            >
              <h3 className="font-semibold flex items-center gap-1">
                {label}
                <CheckCircle2 className="size-4 text-emerald-600" />
              </h3>
              <p className="text-xs text-muted-foreground">
                Path ignored: <code className="font-mono">{path}</code>
              </p>
              <p className="text-xs break-all font-mono">
                <span className="text-muted-foreground">Seed phrase:</span>{" "}
                {seedPhrase}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(seedPhrase)}
                >
                  <Clipboard className="mr-1 size-4" />
                  Copy seed
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageCard>
  );
}