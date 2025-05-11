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

/* ----------------------------- Helper component -------------------------- */

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

/* ---------------------------- Main component ----------------------------- */

export default function KeyConverterPage() {
  /* Mnemonic → */
  const [mnemonicIn, setMnemonicIn] = useState("");
  const [privateOut, setPrivateOut] = useState("");
  const [mnemonicPub, setMnemonicPub] = useState({ h160: "", ss58: "" });
  const [mnemonicError, setMnemonicError] = useState(false);

  useEffect(() => {
    if (!mnemonicIn.trim()) {
      setPrivateOut("");
      setMnemonicPub({ h160: "", ss58: "" });
      setMnemonicError(false);
      return;
    }
    (async () => {
      try {
        setPrivateOut(await mnemonicToPrivateKey(mnemonicIn));
        setMnemonicPub(await derivePublicKeysFromMnemonic(mnemonicIn));
        setMnemonicError(false);
      } catch {
        setPrivateOut("");
        setMnemonicPub({ h160: "", ss58: "" });
        setMnemonicError(true);
      }
    })();
  }, [mnemonicIn]);

  /* Private → */
  const [privateIn, setPrivateIn] = useState("");
  const [mnemonicOut, setMnemonicOut] = useState("");
  const [privatePub, setPrivatePub] = useState({ h160: "", ss58: "" });
  const [privateError, setPrivateError] = useState(false);

  useEffect(() => {
    if (!privateIn.trim()) {
      setMnemonicOut("");
      setPrivatePub({ h160: "", ss58: "" });
      setPrivateError(false);
      return;
    }
    (async () => {
      let hadMnemonicError = false;
      try {
        setMnemonicOut(await privateKeyToMnemonic(privateIn));
      } catch {
        setMnemonicOut("");
        hadMnemonicError = true;
      }
      try {
        setPrivatePub(await derivePublicKeysFromPrivateKey(privateIn));
      } catch {
        setPrivatePub({ h160: "", ss58: "" });
        /* Count as real error only if both conversions failed */
        if (hadMnemonicError) setPrivateError(true);
        else setPrivateError(false);
        return;
      }
      /* At least address derivation succeeded → no field error */
      setPrivateError(false);
    })();
  }, [privateIn]);

  /* Address converter */
  const [h160Addr, setH160Addr] = useState("");
  const [ss58Addr, setSs58Addr] = useState("");
  const [addrError, setAddrError] = useState(false);

  function handleH160Change(v: string) {
    setH160Addr(v);
    if (!v.trim()) {
      setSs58Addr("");
      setAddrError(false);
      return;
    }
    try {
      setSs58Addr(h160ToSs58(v.trim()));
      setAddrError(false);
    } catch {
      setSs58Addr("");
      setAddrError(true);
    }
  }

  function handleSs58Change(v: string) {
    setSs58Addr(v);
    if (!v.trim()) {
      setH160Addr("");
      setAddrError(false);
      return;
    }
    try {
      setH160Addr(ss58ToH160(v.trim()));
      setAddrError(false);
    } catch {
      setH160Addr("");
      setAddrError(true);
    }
  }

  /* ----------------------------- Render UI ------------------------------ */

  return (
    <PageCard
      icon={KeyIcon}
      title="Key & Address Converter"
      description="Convert between mnemonics, raw private keys, H160 and SS58 addresses."
      className="space-y-8"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mnemonic side */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mnemonic → Private / Public</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CopyInput
              value={mnemonicIn}
              onChange={setMnemonicIn}
              placeholder='e.g. "bottom drive … //Alice"'
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              value={privateOut}
              placeholder="0x…private key"
              copyLabel="Copy key"
            />
            <CopyInput
              value={mnemonicPub.h160}
              placeholder="H160 address…"
              copyLabel="Copy H160"
            />
            <CopyInput
              value={mnemonicPub.ss58}
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

        {/* Private side */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Private key → Public</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CopyInput
              value={privateIn}
              onChange={setPrivateIn}
              placeholder="0x…32- or 64-byte hex"
              copyLabel="Copy key"
              error={privateError}
            />
            <CopyInput
              value={mnemonicOut}
              placeholder="Mnemonic (if derivable)…"
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              value={privatePub.h160}
              placeholder="H160 address…"
              copyLabel="Copy H160"
            />
            <CopyInput
              value={privatePub.ss58}
              placeholder="SS58 address…"
              copyLabel="Copy SS58"
            />
            {privateError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-4" />
                Invalid private key supplied.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Address converter */}
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
    </PageCard>
  );
}