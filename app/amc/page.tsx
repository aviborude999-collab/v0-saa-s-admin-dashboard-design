'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Search,
  Filter,
  CalendarCheck,
  CalendarClock,
  RefreshCw,
  AlertTriangle,
  Phone,
  Mail,
} from 'lucide-react'

type AMCStatus = 'active' | 'expiring' | 'expired' | 'renewed'

interface AMCContract {
  id: string
  contractNumber: string
  customer: string
  customerPhone: string
  customerEmail: string
  plan: string
  startDate: string
  endDate: string
  nextServiceDate: string
  servicesUsed: number
  totalServices: number
  status: AMCStatus
  amount: number
}

const amcContracts: AMCContract[] = [
  { id: '1', contractNumber: 'AMC-2024-001', customer: 'Sharma Enterprises', customerPhone: '+91 98765 43210', customerEmail: 'sharma@example.com', plan: 'Premium - 1 Year', startDate: '2024-01-01', endDate: '2024-12-31', nextServiceDate: '2024-02-15', servicesUsed: 1, totalServices: 4, status: 'active', amount: 6000 },
  { id: '2', contractNumber: 'AMC-2024-002', customer: 'Patel Industries', customerPhone: '+91 98765 43211', customerEmail: 'patel@example.com', plan: 'Standard - 1 Year', startDate: '2023-06-15', endDate: '2024-06-14', nextServiceDate: '2024-03-15', servicesUsed: 2, totalServices: 2, status: 'active', amount: 3500 },
  { id: '3', contractNumber: 'AMC-2023-045', customer: 'Gupta Residence', customerPhone: '+91 98765 43212', customerEmail: 'gupta@example.com', plan: 'Basic - 1 Year', startDate: '2023-02-01', endDate: '2024-01-31', nextServiceDate: '-', servicesUsed: 2, totalServices: 2, status: 'expiring', amount: 2500 },
  { id: '4', contractNumber: 'AMC-2023-032', customer: 'XYZ Corporation', customerPhone: '+91 98765 43213', customerEmail: 'xyz@example.com', plan: 'Premium - 1 Year', startDate: '2023-01-10', endDate: '2024-01-09', nextServiceDate: '-', servicesUsed: 4, totalServices: 4, status: 'expired', amount: 6000 },
  { id: '5', contractNumber: 'AMC-2024-003', customer: 'ABC Corp', customerPhone: '+91 98765 43214', customerEmail: 'abc@example.com', plan: 'Premium - 1 Year', startDate: '2024-01-05', endDate: '2025-01-04', nextServiceDate: '2024-04-05', servicesUsed: 0, totalServices: 4, status: 'renewed', amount: 6500 },
  { id: '6', contractNumber: 'AMC-2023-089', customer: 'Kumar Tech', customerPhone: '+91 98765 43215', customerEmail: 'kumar@example.com', plan: 'Standard - 1 Year', startDate: '2023-03-20', endDate: '2024-03-19', nextServiceDate: '2024-02-20', servicesUsed: 1, totalServices: 2, status: 'expiring', amount: 3500 },
  { id: '7', contractNumber: 'AMC-2024-004', customer: 'Singh Builders', customerPhone: '+91 98765 43216', customerEmail: 'singh@example.com', plan: 'Basic - 1 Year', startDate: '2024-01-12', endDate: '2025-01-11', nextServiceDate: '2024-07-12', servicesUsed: 0, totalServices: 2, status: 'active', amount: 2500 },
  { id: '8', contractNumber: 'AMC-2023-015', customer: 'Mehta Housing', customerPhone: '+91 98765 43217', customerEmail: 'mehta@example.com', plan: 'Premium - 1 Year', startDate: '2022-12-01', endDate: '2023-11-30', nextServiceDate: '-', servicesUsed: 4, totalServices: 4, status: 'expired', amount: 5500 },
]

const statusColors: Record<AMCStatus, 'success' | 'warning' | 'danger' | 'info'> = {
  active: 'success',
  expiring: 'warning',
  expired: 'danger',
  renewed: 'info',
}

export default function AMCPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const columns = [
    {
      key: 'contractNumber',
      header: 'Contract #',
      className: 'font-medium',
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (contract: AMCContract) => (
        <div>
          <p className="font-medium text-foreground">{contract.customer}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {contract.customerPhone}
            </span>
          </div>
        </div>
      ),
    },
    { key: 'plan', header: 'Plan' },
    {
      key: 'period',
      header: 'Period',
      render: (contract: AMCContract) => (
        <div className="text-sm">
          <p>{contract.startDate}</p>
          <p className="text-muted-foreground">to {contract.endDate}</p>
        </div>
      ),
    },
    {
      key: 'nextService',
      header: 'Next Service',
      render: (contract: AMCContract) => (
        <span className={contract.nextServiceDate === '-' ? 'text-muted-foreground' : ''}>
          {contract.nextServiceDate}
        </span>
      ),
    },
    {
      key: 'services',
      header: 'Services',
      render: (contract: AMCContract) => (
        <span>{contract.servicesUsed} / {contract.totalServices}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (contract: AMCContract) => (
        <StatusBadge variant={statusColors[contract.status]}>
          {contract.status}
        </StatusBadge>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (contract: AMCContract) => (
        <span className="font-semibold">₹{contract.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (contract: AMCContract) => (
        <div className="flex gap-2">
          {(contract.status === 'expiring' || contract.status === 'expired') && (
            <Button size="sm" variant="outline" className="gap-1">
              <RefreshCw className="h-3 w-3" />
              Renew
            </Button>
          )}
          {contract.status === 'active' && contract.nextServiceDate !== '-' && (
            <Button size="sm" variant="outline">
              Schedule
            </Button>
          )}
        </div>
      ),
    },
  ]

  const filteredContracts = amcContracts.filter((contract) => {
    const matchesSearch =
      contract.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const activeContracts = amcContracts.filter(c => c.status === 'active').length
  const expiringContracts = amcContracts.filter(c => c.status === 'expiring').length
  const expiredContracts = amcContracts.filter(c => c.status === 'expired').length
  const totalRevenue = amcContracts.reduce((sum, c) => sum + c.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AMC Management</h1>
            <p className="text-muted-foreground">Manage annual maintenance contracts</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Contract
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CalendarCheck className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeContracts}</p>
                <p className="text-sm text-muted-foreground">Active AMCs</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm border-l-4 border-l-warning">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <CalendarClock className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringContracts}</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm border-l-4 border-l-destructive">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiredContracts}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">AMC Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contracts, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="renewed">Renewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <DataTable data={filteredContracts} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
