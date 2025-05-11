"use client";

import { ThemeProvider } from "./theme-provider";
import { ExtensionProvider } from "./polkadot-extension-provider";
import { LightClientApiProvider } from "./lightclient-api-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ExtensionProvider>
        <LightClientApiProvider>{children}</LightClientApiProvider>
      </ExtensionProvider>
    </ThemeProvider>
  );
}