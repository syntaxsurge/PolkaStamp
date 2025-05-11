"use client";

import React, { useEffect, useState } from "react";
import {
  KeyRound as KeyIcon,
  Clipboard,
  Eye,
  EyeOff,
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
  keystoreJsonToPrivateKey,
  derivePublicKeysFromKeystore,
} from "@/lib/utils/key-converter";

/* ----------------------------- Helper components ------------------------- */

function CopyInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  copyLabel,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  error?: boolean;
  copyLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-foreground/70">{label}</label>
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
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1 flex-1 relative">
      <label className="text-xs font-medium text-foreground/70">{label}</label>
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-12"
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="absolute right-1 top-7 -translate-y-1/2"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
      </Button>
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
      let mnemonicErr = false;
      try {
        setMnemonicOut(await privateKeyToMnemonic(privateIn));
      } catch {
        setMnemonicOut("");
        mnemonicErr = true;
      }
      try {
        setPrivatePub(await derivePublicKeysFromPrivateKey(privateIn));
        setPrivateError(false);
      } catch {
        setPrivatePub({ h160: "", ss58: "" });
        setPrivateError(true);
      }
      if (mnemonicErr && !privateError) setPrivateError(false);
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

  /* Keystore JSON → */
  const [jsonText, setJsonText] = useState("");
  const [jsonPwd, setJsonPwd] = useState("");
  const [jsonPrivate, setJsonPrivate] = useState("");
  const [jsonMnemonic, setJsonMnemonic] = useState("");
  const [jsonPub, setJsonPub] = useState({ h160: "", ss58: "" });
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccess, setJsonSuccess] = useState(false);

  async function decodeKeystore() {
    if (!jsonText.trim()) {
      setJsonError("Paste a keystore JSON first.");
      return;
    }
    try {
      const priv = await keystoreJsonToPrivateKey(jsonText, jsonPwd);
      setJsonPrivate(priv);

      try {
        setJsonMnemonic(await privateKeyToMnemonic(priv));
      } catch {
        setJsonMnemonic("");
      }

      setJsonPub(await derivePublicKeysFromPrivateKey(priv));
      setJsonError(null);
      setJsonSuccess(true);
      toast.success("Keystore decoded.");
    } catch (err: any) {
      setJsonPrivate("");
      setJsonMnemonic("");
      setJsonPub({ h160: "", ss58: "" });
      setJsonSuccess(false);
      setJsonError(err?.message ?? "Failed to decode keystore.");
    }
  }

  /* ----------------------------- Render UI ------------------------------ */

  return (
    <PageCard
      icon={KeyIcon}
      title="Key & Address Converter"
      description="Convert between mnemonics, private keys, keystore JSON, H160 and SS58 addresses."
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
              label="Mnemonic"
              value={mnemonicIn}
              onChange={setMnemonicIn}
              placeholder='e.g. "bottom drive … //Alice"'
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              label="Private Key"
              value={privateOut}
              placeholder="0x…private key"
              copyLabel="Copy key"
            />
            <CopyInput
              label="H160 Address"
              value={mnemonicPub.h160}
              placeholder="0x…20-byte address"
              copyLabel="Copy H160"
            />
            <CopyInput
              label="SS58 Address"
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
              label="Private Key"
              value={privateIn}
              onChange={setPrivateIn}
              placeholder="0x…32- or 64-byte hex"
              copyLabel="Copy key"
              error={privateError}
            />
            <CopyInput
              label="Mnemonic"
              value={mnemonicOut}
              placeholder="Mnemonic (if derivable)…"
              copyLabel="Copy mnemonic"
            />
            <CopyInput
              label="H160 Address"
              value={privatePub.h160}
              placeholder="0x…20-byte address"
              copyLabel="Copy H160"
            />
            <CopyInput
              label="SS58 Address"
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

      {/* Keystore JSON decoder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keystore JSON → Private / Public</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-foreground/70">Keystore JSON</label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={6}
              placeholder="Paste keystore JSON here…"
              className="border-border w-full rounded-md p-2 font-mono text-xs"
              spellCheck={false}
            />
          </div>

          <div className="flex items-end gap-2">
            <PasswordInput
              label="Password"
              value={jsonPwd}
              onChange={setJsonPwd}
              placeholder="Password (leave blank if none)"
            />
            <Button onClick={decodeKeystore}>Decode</Button>
          </div>

          {jsonError && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-4" /> {jsonError}
            </p>
          )}
          {jsonSuccess && (
            <p className="flex items-center gap-1 text-xs text-primary">
              <CheckCircle2 className="size-4" /> Keystore decoded successfully.
            </p>
          )}

          <CopyInput
            label="Private Key"
            value={jsonPrivate}
            placeholder="0x…private key"
            copyLabel="Copy key"
          />
          <CopyInput
            label="Mnemonic"
            value={jsonMnemonic}
            placeholder="Mnemonic (if derivable)…"
            copyLabel="Copy mnemonic"
          />
          <CopyInput
            label="H160 Address"
            value={jsonPub.h160}
            placeholder="0x…20-byte address"
            copyLabel="Copy H160"
          />
          <CopyInput
            label="SS58 Address"
            value={jsonPub.ss58}
            placeholder="SS58 address…"
            copyLabel="Copy SS58"
          />
        </CardContent>
      </Card>

      {/* Address converter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Address Converter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CopyInput
            label="H160 Address"
            value={h160Addr}
            onChange={handleH160Change}
            placeholder="0x…20-byte H160"
            copyLabel="Copy H160"
            error={addrError}
          />
          <CopyInput
            label="SS58 Address"
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