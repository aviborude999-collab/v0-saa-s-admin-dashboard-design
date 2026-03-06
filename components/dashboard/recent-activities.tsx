import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { 
  UserPlus, 
  FileCheck, 
  Wrench, 
  CreditCard, 
  CalendarCheck,
  Phone 
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Activity = {
  id: number
  type: 'lead' | 'quotation' | 'workorder' | 'payment' | 'amc' | 'call'
  title: string
  description: string
  time: string
  status?: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'lead',
    title: 'New Lead Created',
    description: 'Sharma Enterprises - RO Installation',
    time: '5 min ago',
    status: 'new',
  },
  {
    id: 2,
    type: 'quotation',
    title: 'Quotation Sent',
    description: 'Quote #QT-2024-156 to Patel Industries',
    time: '15 min ago',
    status: 'quotation',
  },
  {
    id: 3,
    type: 'workorder',
    title: 'Work Order Completed',
    description: 'WO-2024-089 - Filter Replacement',
    time: '1 hour ago',
    status: 'completed',
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment Received',
    description: '₹45,000 from ABC Corp',
    time: '2 hours ago',
    status: 'paid',
  },
  {
    id: 5,
    type: 'amc',
    title: 'AMC Renewed',
    description: 'XYZ Ltd - 1 Year Plan',
    time: '3 hours ago',
    status: 'success',
  },
  {
    id: 6,
    type: 'call',
    title: 'Follow-up Call Scheduled',
    description: 'Gupta Residence - Tomorrow 10 AM',
    time: '4 hours ago',
    status: 'followup',
  },
]

const iconMap = {
  lead: UserPlus,
  quotation: FileCheck,
  workorder: Wrench,
  payment: CreditCard,
  amc: CalendarCheck,
  call: Phone,
}

const iconColorMap = {
  lead: 'bg-chart-1/10 text-chart-1',
  quotation: 'bg-chart-2/10 text-chart-2',
  workorder: 'bg-chart-3/10 text-chart-3',
  payment: 'bg-success/10 text-success',
  amc: 'bg-chart-4/10 text-chart-4',
  call: 'bg-primary/10 text-primary',
}

export function RecentActivities() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Activities</CardTitle>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    iconColorMap[activity.type]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    {activity.status && (
                      <StatusBadge variant={activity.status as any}>{activity.status}</StatusBadge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
