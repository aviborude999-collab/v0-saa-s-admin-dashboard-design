import { cn } from '@/lib/utils'

type StatusVariant = 
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'new'
  | 'contacted'
  | 'followup'
  | 'quotation'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'assigned'
  | 'started'
  | 'inprogress'
  | 'completed'
  | 'paid'
  | 'pending'
  | 'overdue'

const variantStyles: Record<StatusVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning-foreground',
  danger: 'bg-destructive/15 text-destructive',
  info: 'bg-primary/15 text-primary',
  new: 'bg-chart-1/15 text-chart-1',
  contacted: 'bg-chart-2/15 text-chart-2',
  followup: 'bg-chart-4/15 text-chart-4',
  quotation: 'bg-chart-3/15 text-chart-3',
  negotiation: 'bg-chart-5/15 text-chart-5',
  won: 'bg-success/15 text-success',
  lost: 'bg-destructive/15 text-destructive',
  assigned: 'bg-primary/15 text-primary',
  started: 'bg-chart-2/15 text-chart-2',
  inprogress: 'bg-warning/15 text-warning-foreground',
  completed: 'bg-success/15 text-success',
  paid: 'bg-success/15 text-success',
  pending: 'bg-warning/15 text-warning-foreground',
  overdue: 'bg-destructive/15 text-destructive',
}

interface StatusBadgeProps {
  variant?: StatusVariant
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ variant = 'default', children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
