import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import type { NavItem } from './nav-bar'

export function NavMobile({ items }: { items: NavItem[] }) {
  return (
    <div className='flex flex-col pb-6'>
      <div className='flex flex-col'>
        {items.map((item, index) => (
          <div key={index} className='flex flex-col'>
            {item.items && item.items.length > 0 ? (
              <>
                <div className='text-foreground px-6 py-4 font-medium'>{item.title}</div>
                <div className='px-6 pb-4'>
                  <div className='flex flex-col space-y-3 pl-2'>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href || '#'}
                        className='text-muted-foreground hover:text-foreground text-sm'
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href || '#'}
                className='text-foreground hover:text-foreground px-6 py-4 font-medium'
              >
                {item.title}
              </Link>
            )}
            {index < items.length - 1 && <Separator />}
          </div>
        ))}
      </div>
      <div className='px-6 pt-2'>
        <Button className='w-full' size='lg'>
          Get Started
        </Button>
      </div>
    </div>
  )
}
