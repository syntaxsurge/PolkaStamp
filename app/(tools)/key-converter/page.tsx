"use client"

import React, { useMemo, useState } from "react"
import {
  KeyRound as KeyIcon,
  Clipboard,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"

import PageCard from "@/components/ui/page-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/utils"
import {
  mnemonicToPrivateKey,
  privateKeyToMnemonic,
} from "@/lib/utils/key-converter"
import { trimAddress } from "@/lib/utils/address"

/* -------------------------------------------------------------------------- */
/*                       D E V   A C C O U N T   D A T A                      */
/* -------------------------------------------------------------------------- */

const BASE_MNEMONIC =
  "bottom drive obey lake curtain smoke basket hold race lonely fit walk"

const DERIVATIONS = ["//Alice", "//Bob", "//Charlie", "//Dave", "//Eve", "//Ferdie"] as const

type DevAccount = {
  label: string
  path: string
  seedPhrase: string
  privateKey: `0x${string}`
}

function buildDevAccounts(): DevAccount[] {
  return DERIVATIONS.map((path) => {
    const label = path.replace("//", "")
    const seedPhrase = `${BASE_MNEMONIC}${path}`
    /* Path component is ignored; all accounts map to the base entropy */
    const privateKey = mnemonicToPrivateKey(seedPhrase)
    return { label, path, seedPhrase, privateKey }
  })
}

const DEV_ACCOUNTS = buildDevAccounts()

/* -------------------------------------------------------------------------- */
/*                               C O M P O N E N T                            */
/* -------------------------------------------------------------------------- */

export default function KeyConverterPage() {
  /* --------------------------- convert → private ------------------------ */
  const [mnemonicIn, setMnemonicIn] = useState("")
  const [mnemonicError, setMnemonicError] = useState(false)

  const privateOut = useMemo(() => {
    if (!mnemonicIn.trim()) {
      setMnemonicError(false)
      return ""
    }
    try {
      const key = mnemonicToPrivateKey(mnemonicIn)
      setMnemonicError(false)
      return key
    } catch {
      setMnemonicError(true)
      return ""
    }
  }, [mnemonicIn])

  /* --------------------------- convert → mnemonic ----------------------- */
  const [privateIn, setPrivateIn] = useState("")
  const [privateError, setPrivateError] = useState(false)

  const mnemonicOut = useMemo(() => {
    if (!privateIn.trim()) {
      setPrivateError(false)
      return ""
    }
    try {
      const mn = privateKeyToMnemonic(privateIn)
      setPrivateError(false)
      return mn
    } catch {
      setPrivateError(true)
      return ""
    }
  }, [privateIn])

  /* --------------------------------- UI ---------------------------------- */
  return (
    <PageCard
      icon={KeyIcon}
      title="Seed ⇄ Private-Key Converter"
      description="Convert BIP-39 seed phrases to raw entropy hex and back — conversions are now perfectly reversible."
      className="space-y-8"
    >
      {/* Converters --------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mnemonic → Private key */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Mnemonic → Private key</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <Input
              placeholder='e.g. "bottom drive… //Alice"'
              value={mnemonicIn}
              onChange={(e) => setMnemonicIn(e.target.value)}
              spellCheck={false}
              className="font-mono text-xs"
            />
            <div className="relative">
              <Input
                readOnly
                value={privateOut}
                placeholder="0x…"
                className="font-mono text-xs pr-12"
              />
              {privateOut && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => copyToClipboard(privateOut)}
                >
                  <Clipboard className="size-4" />
                </Button>
              )}
            </div>
            {mnemonicError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-4" />
                Invalid mnemonic supplied.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Private key → Mnemonic */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Private key → Mnemonic</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <Input
              placeholder="0x…16- or 32-byte hex"
              value={privateIn}
              onChange={(e) => setPrivateIn(e.target.value)}
              spellCheck={false}
              className="font-mono text-xs"
            />
            <div className="relative">
              <Input
                readOnly
                value={mnemonicOut}
                placeholder="mnemonic will appear here…"
                className="font-mono text-xs pr-12"
              />
              {mnemonicOut && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => copyToClipboard(mnemonicOut)}
                >
                  <Clipboard className="size-4" />
                </Button>
              )}
            </div>
            {privateError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-4" />
                Invalid entropy hex supplied (expect 16 or 32 bytes).
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pre-derived dev accounts ------------------------------------------- */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">Polkadot Dev Accounts</CardTitle>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setMnemonicIn(BASE_MNEMONIC)
                toast.success("Loaded base mnemonic into converter ✨")
              }}
            >
              <RefreshCcw className="mr-2 size-4" />
              Base mnemonic
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_ACCOUNTS.map(({ label, path, seedPhrase, privateKey }) => (
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
              <p className="text-xs break-all font-mono">
                <span className="text-muted-foreground">Private key:</span>{" "}
                {trimAddress(privateKey, 8)}
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(privateKey)}
                >
                  <Clipboard className="mr-1 size-4" />
                  Copy key
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageCard>
  )
}