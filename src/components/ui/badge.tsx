import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md border font-bold uppercase tracking-wide whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-pumple-primary text-black',
        secondary: 'border-pumple-border bg-pumple-elevated text-pumple-text',
        outline: 'border-pumple-border text-pumple-text',
        destructive: 'border-transparent bg-pumple-red text-white',
      },
      size: {
        sm: 'px-1.5 py-0 text-[10px]',
        md: 'px-2 py-0.5 text-[11px]',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
