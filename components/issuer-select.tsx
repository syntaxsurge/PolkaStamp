'use client'

import * as React from 'react'

import { Loader2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { IssuerOption } from '@/lib/types/components'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                              Combobox State                                */
/* -------------------------------------------------------------------------- */

export default function IssuerSelect() {
  const [query, setQuery] = React.useState('')
  const [options, setOptions] = React.useState<IssuerOption[]>([])
  const [selected, setSelected] = React.useState<IssuerOption | null>(null)
  const [open, setOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

  /* -------------------------------- Search -------------------------------- */
  React.useEffect(() => {
    if (!query || query.length < 2) {
      setOptions([])
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/issuers/search?q=${encodeURIComponent(query)}&size=12`, {
          cache: 'no-store',
        })
        const data = await res.json()
        setOptions(data.results as IssuerOption[])
      } catch {
        setOptions([])
      } finally {
        setLoading(false)
        setOpen(true)
      }
    }, 300)
  }, [query])

  /* ---------------------------- Option click ------------------------------ */
  function handleSelect(issuer: IssuerOption) {
    setSelected(issuer)
    setQuery(issuer.name)
    setOpen(false)
  }

  /* ------------------------------- Clear ---------------------------------- */
  function clear() {
    setSelected(null)
    setQuery('')
    setOpen(false)
  }

  /* ------------------------------- View ----------------------------------- */
  return (
    <div className='relative space-y-1'>
      <label className='text-sm font-medium'>Issuer (optional)</label>

      <div className='flex items-center gap-2'>
        {/* Visible search input */}
        <div className='relative flex-1'>
          <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(null)
            }}
            placeholder='Search issuers…'
            className='pl-8'
            autoComplete='off'
            aria-autocomplete='list'
            aria-expanded={open}
          />
          {isLoading && <Loader2 className='absolute top-2.5 right-2 h-4 w-4 animate-spin' />}
        </div>

        {/* Clear button */}
        {query && (
          <Button type='button' variant='outline' size='sm' onClick={clear}>
            Clear
          </Button>
        )}
      </div>

      {/* Suggestion dropdown */}
      {open && options.length > 0 && (
        <div className='bg-popover absolute z-50 mt-1 w-full rounded-md border shadow-md'>
          {options.map((opt) => (
            <button
              type='button'
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={cn(
                'hover:bg-muted/50 flex w-full items-start gap-2 px-3 py-2 text-left text-sm',
                selected?.id === opt.id && 'bg-muted',
              )}
            >
              <span className='font-medium'>{opt.name}</span>
              <span className='text-muted-foreground ml-auto text-xs capitalize'>
                {opt.category.toLowerCase()}
              </span>
            </button>
          ))}
          {options.length === 12 && (
            <div className='text-muted-foreground border-t px-3 py-2 text-center text-xs'>
              Scroll for more results…
            </div>
          )}
        </div>
      )}

      {/* Hidden input for form submission */}
      <input type='hidden' name='issuerId' value={selected?.id ?? ''} />
    </div>
  )
}
