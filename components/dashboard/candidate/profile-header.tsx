'use client'

import Link from 'next/link'

import { Share2, Clipboard, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { UserAvatar } from '@/components/ui/user-avatar'
import type { ProfileHeaderProps } from '@/lib/types/components'
import { copyToClipboard } from '@/lib/utils'
import { truncateAddress } from '@/lib/utils/address'

/* -------------------------------------------------------------------------- */
/*                                   View                                     */
/* -------------------------------------------------------------------------- */

export default function ProfileHeader({
  name,
  email,
  walletAddress,
  avatarSrc,
  profilePath,
  showShare = false,
  showPublicProfile = false,
  stats = [],
  socials = [],
  children,
}: ProfileHeaderProps) {
  /* ---------------------------- share link ---------------------------- */
  function copyLink() {
    if (!profilePath) return
    const url =
      typeof window !== 'undefined' ? `${window.location.origin}${profilePath}` : profilePath
    copyToClipboard(url)
  }

  /* --------------------- Filter invalid social links ------------------ */
  const validSocials = socials.filter(
    (s): s is (typeof socials)[number] & { href: string } =>
      typeof s.href === 'string' && s.href.trim().length > 0,
  )

  /* ------------------------------- view ------------------------------- */
  return (
    <TooltipProvider delayDuration={150}>
      <div className='bg-muted/40 overflow-hidden rounded-2xl border shadow-sm'>
        {/* Decorative banner */}
        <div className='from-primary/30 via-primary/10 h-32 w-full bg-gradient-to-r to-transparent' />

        <div className='flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between'>
          {/* Avatar + identity */}
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-end'>
            <UserAvatar
              name={name}
              email={email}
              className='ring-background -mt-20 size-28 ring-4 sm:-mt-14'
              src={avatarSrc ?? undefined}
            />
            <div className='text-center sm:text-left'>
              <h1 className='text-2xl leading-tight font-extrabold'>{name || 'Unnamed'}</h1>
              <Link href={`mailto:${email}`} className='break-all underline underline-offset-4'>
                {email}
              </Link>
              {walletAddress && (
                <p className='text-muted-foreground font-mono text-xs'>
                  {truncateAddress(walletAddress)}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex flex-wrap gap-2'>
            {showShare && profilePath && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm' className='gap-2'>
                    <Share2 className='h-4 w-4' />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='rounded-lg p-1 shadow-lg'>
                  <DropdownMenuItem onClick={copyLink} className='cursor-pointer'>
                    <Clipboard className='mr-2 h-4 w-4' />
                    Copy URL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {showPublicProfile && profilePath && (
              <Button asChild variant='default' size='sm' className='gap-2'>
                <Link href={profilePath} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='h-4 w-4' />
                  View Profile
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className='bg-background/60 border-t backdrop-blur'>
            <div
              className='mx-auto grid max-w-3xl gap-6 p-4 text-center'
              style={{ gridTemplateColumns: `repeat(${stats.length},minmax(0,1fr))` }}
            >
              {stats.map((s) => (
                <div key={s.label} className='flex flex-col items-center gap-1'>
                  <span className='text-lg leading-none font-bold'>{s.value}</span>
                  <span className='text-muted-foreground text-xs tracking-wide uppercase'>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Socials */}
        {validSocials.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-2 border-t p-4'>
            {validSocials.map((s) => (
              <Tooltip key={s.label}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant='ghost'
                    size='icon'
                    className='bg-muted hover:bg-muted/70'
                  >
                    <Link href={s.href} target='_blank' rel='noopener noreferrer'>
                      <s.icon className='h-4 w-4' />
                      <span className='sr-only'>{s.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{s.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}

        {children}
      </div>
    </TooltipProvider>
  )
}
