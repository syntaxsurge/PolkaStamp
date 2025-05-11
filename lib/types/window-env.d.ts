export {}

declare global {
  interface Window {
    /**
     * Hydrated map of public environment variables injected at runtime
     * via the <PublicEnvScript> component.
     */
    __NEXT_PUBLIC_ENV__?: Record<string, string>
  }
}
