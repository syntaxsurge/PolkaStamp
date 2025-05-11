'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

/* -------------------------------------------------------------------------- */
/*                    F I L T E R   N A V I G A T I O N                       */
/* -------------------------------------------------------------------------- */

/**
 * Helper that lets filter controls mutate query-string parameters while
 * batching rapid changes (e.g. slider drags) into a single navigation.
 *
 * Unlike the previous version, navigation now sets <code>scroll&nbsp;=&nbsp;false</code>
 * so the browser keeps the current viewport instead of jumping to the top.
 *
 * @param basePath      Static pathname (no search params) for the page.
 * @param initialParams Initial query params derived from the first render.
 * @returns             <code>updateParam(key, value)</code> – call this per change.
 */
export function useFilterNavigation(basePath: string, initialParams: Record<string, string> = {}) {
  const router = useRouter()

  /** Mutable copy of the current search params. */
  const paramsRef = React.useRef<URLSearchParams>(new URLSearchParams(initialParams))

  /** Debounce handle so multiple rapid updates result in a single push. */
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  /** Concurrent navigation wrapper. */
  const [, startTransition] = React.useTransition()

  /* ---------------------------------------------------------------------- */
  /*                               N A V I G A T E                           */
  /* ---------------------------------------------------------------------- */

  const navigate = React.useCallback(() => {
    timerRef.current = null
    const qs = paramsRef.current.toString()
    startTransition(() => {
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false })
    })
  }, [basePath, router, startTransition])

  /* ---------------------------------------------------------------------- */
  /*                     P U B L I C   U P D A T E   A P I                   */
  /* ---------------------------------------------------------------------- */

  /**
   * Update (or delete) a single query-string parameter.
   * Passing an empty string removes the key entirely.
   */
  const updateParam = React.useCallback(
    (key: string, value: string) => {
      if (value) {
        paramsRef.current.set(key, value)
      } else {
        paramsRef.current.delete(key)
      }

      /* Restart debounce window (200 ms) */
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(navigate, 200)
    },
    [navigate],
  )

  /* ---------------------------------------------------------------------- */
  /*                             C L E A N U P                              */
  /* ---------------------------------------------------------------------- */

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return updateParam
}
