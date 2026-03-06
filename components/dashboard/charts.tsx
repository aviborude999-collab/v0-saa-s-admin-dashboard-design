'use client'

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Funnel,
  FunnelChart,
  LabelList,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Chart colors - computed values for Recharts
const CHART_COLORS = {
  primary: '#4f6bed',
  accent: '#10b981',
  chart3: '#22c55e',
  chart4: '#f59e0b',
  chart5: '#ef4444',
}

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 69000 },
  { month: 'Sep', revenue: 78000 },
  { month: 'Oct', revenue: 82000 },
  { month: 'Nov', revenue: 89000 },
  { month: 'Dec', revenue: 95000 },
]

const funnelData = [
  { name: 'New Leads', value: 500, fill: CHART_COLORS.primary },
  { name: 'Contacted', value: 380, fill: CHART_COLORS.accent },
  { name: 'Quotation', value: 220, fill: CHART_COLORS.chart3 },
  { name: 'Negotiation', value: 150, fill: CHART_COLORS.chart4 },
  { name: 'Won', value: 95, fill: CHART_COLORS.chart5 },
]

const leadSourceData = [
  { name: 'Website', value: 35 },
  { name: 'Referral', value: 25 },
  { name: 'Google Ads', value: 20 },
  { name: 'Social Media', value: 12 },
  { name: 'Others', value: 8 },
]

const technicianData = [
  { name: 'Ravi Kumar', jobs: 45, rating: 4.8 },
  { name: 'Suresh P.', jobs: 42, rating: 4.7 },
  { name: 'Amit Singh', jobs: 38, rating: 4.9 },
  { name: 'Kiran M.', jobs: 35, rating: 4.6 },
  { name: 'Prakash D.', jobs: 32, rating: 4.5 },
]

const PIE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.chart3,
  CHART_COLORS.chart4,
  CHART_COLORS.chart5,
]

export function RevenueChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `₹${v/1000}K`} />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS.primary}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS.primary, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function SalesFunnelChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Sales Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip
                formatter={(value: number) => [value, 'Leads']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
              <Funnel
                data={funnelData}
                dataKey="value"
                nameKey="name"
                isAnimationActive
              >
                <LabelList
                  position="right"
                  fill="#374151"
                  stroke="none"
                  dataKey="name"
                  fontSize={12}
                />
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="value"
                  fontSize={14}
                  fontWeight={600}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function LeadSourceChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {leadSourceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Share']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function TechnicianPerformanceChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Technician Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={technicianData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                width={80}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === 'jobs' ? `${value} jobs` : value,
                  name === 'jobs' ? 'Completed' : 'Rating',
                ]}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="jobs" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
