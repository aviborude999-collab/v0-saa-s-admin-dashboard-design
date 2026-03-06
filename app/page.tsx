import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { KPICard } from '@/components/dashboard/kpi-card'
import {
  RevenueChart,
  SalesFunnelChart,
  LeadSourceChart,
  TechnicianPerformanceChart,
} from '@/components/dashboard/charts'
import { RecentActivities } from '@/components/dashboard/recent-activities'
import {
  Users,
  IndianRupee,
  Wrench,
  Clock,
  CalendarCheck,
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your business overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <KPICard
            title="Total Leads"
            value="1,234"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            iconColor="bg-chart-1/10 text-chart-1"
          />
          <KPICard
            title="Sales Revenue"
            value="₹8.9L"
            change="+8.5% from last month"
            changeType="positive"
            icon={IndianRupee}
            iconColor="bg-success/10 text-success"
          />
          <KPICard
            title="Jobs Today"
            value="28"
            change="5 pending assignment"
            changeType="neutral"
            icon={Wrench}
            iconColor="bg-chart-2/10 text-chart-2"
          />
          <KPICard
            title="Pending Payments"
            value="₹2.4L"
            change="12 invoices overdue"
            changeType="negative"
            icon={Clock}
            iconColor="bg-warning/10 text-warning-foreground"
          />
          <KPICard
            title="AMC Renewals"
            value="45"
            change="Due this month"
            changeType="neutral"
            icon={CalendarCheck}
            iconColor="bg-primary/10 text-primary"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <SalesFunnelChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <LeadSourceChart />
          <TechnicianPerformanceChart />
          <RecentActivities />
        </div>
      </div>
    </DashboardLayout>
  )
}
