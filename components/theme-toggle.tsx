'use client'

import * as React from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Do not render until mounted

  function getCurrentIcon() {
    return theme === 'light' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />
  }

  const toggleTheme = () => {
    // Automatically toggle between light and dark theme on click
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant='outline'
      size='icon'
      className='h-9 rounded-full px-2 shadow-sm'
      aria-label='Toggle theme'
      onClick={toggleTheme}
    >
      {getCurrentIcon()}
    </Button>
  )
}
