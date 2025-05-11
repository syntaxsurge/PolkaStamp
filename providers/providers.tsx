'use client'

import { LightClientApiProvider } from './lightclient-api-provider'
import { ExtensionProvider } from './polkadot-extension-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark'>
      <ExtensionProvider>
        <LightClientApiProvider>{children}</LightClientApiProvider>
      </ExtensionProvider>
    </ThemeProvider>
  )
}
