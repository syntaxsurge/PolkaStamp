'use client'

import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               R O O T                                      */
/* -------------------------------------------------------------------------- */

const Tabs = TabsPrimitive.Root

/* -------------------------------------------------------------------------- */
/*                                L I S T                                     */
/* -------------------------------------------------------------------------- */

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('relative flex w-full overflow-x-auto border-b', 'bg-transparent', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/* -------------------------------------------------------------------------- */
/*                              T R I G G E R                                 */
/* -------------------------------------------------------------------------- */

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap',
      'text-muted-foreground border-b-2 border-transparent transition-colors',
      'hover:text-foreground hover:bg-muted/40',
      'data-[state=active]:text-primary data-[state=active]:border-primary',
      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/* -------------------------------------------------------------------------- */
/*                             C O N T E N T                                  */
/* -------------------------------------------------------------------------- */

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
