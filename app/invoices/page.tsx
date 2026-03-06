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
  Receipt,
  IndianRupee,
  Clock,
  AlertCircle,
  Download,
  Send,
  Eye,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type PaymentStatus = 'paid' | 'pending' | 'overdue'

interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  customerEmail: string
  issueDate: string
  dueDate: string
  amount: number
  status: PaymentStatus
  items: number
}

const invoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', customer: 'Sharma Enterprises', customerEmail: 'sharma@example.com', issueDate: '2024-01-15', dueDate: '2024-01-30', amount: 45000, status: 'paid', items: 3 },
  { id: '2', invoiceNumber: 'INV-2024-002', customer: 'Patel Industries', customerEmail: 'patel@example.com', issueDate: '2024-01-14', dueDate: '2024-01-29', amount: 125000, status: 'paid', items: 5 },
  { id: '3', invoiceNumber: 'INV-2024-003', customer: 'Gupta Residence', customerEmail: 'gupta@example.com', issueDate: '2024-01-12', dueDate: '2024-01-27', amount: 22000, status: 'pending', items: 2 },
  { id: '4', invoiceNumber: 'INV-2024-004', customer: 'XYZ Corporation', customerEmail: 'xyz@example.com', issueDate: '2024-01-10', dueDate: '2024-01-25', amount: 375000, status: 'overdue', items: 8 },
  { id: '5', invoiceNumber: 'INV-2024-005', customer: 'ABC Corp', customerEmail: 'abc@example.com', issueDate: '2024-01-08', dueDate: '2024-01-23', amount: 89000, status: 'overdue', items: 4 },
  { id: '6', invoiceNumber: 'INV-2024-006', customer: 'Kumar Tech', customerEmail: 'kumar@example.com', issueDate: '2024-01-05', dueDate: '2024-01-20', amount: 56000, status: 'paid', items: 3 },
  { id: '7', invoiceNumber: 'INV-2024-007', customer: 'Singh Builders', customerEmail: 'singh@example.com', issueDate: '2024-01-03', dueDate: '2024-01-18', amount: 180000, status: 'pending', items: 6 },
  { id: '8', invoiceNumber: 'INV-2024-008', customer: 'Mehta Housing', customerEmail: 'mehta@example.com', issueDate: '2024-01-01', dueDate: '2024-01-16', amount: 95000, status: 'paid', items: 4 },
]

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const columns = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      className: 'font-medium',
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (invoice: Invoice) => (
        <div>
          <p className="font-medium text-foreground">{invoice.customer}</p>
          <p className="text-xs text-muted-foreground">{invoice.customerEmail}</p>
        </div>
      ),
    },
    { key: 'issueDate', header: 'Issue Date' },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'items',
      header: 'Items',
      render: (invoice: Invoice) => `${invoice.items} items`,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (invoice: Invoice) => (
        <span className="font-semibold">₹{invoice.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice: Invoice) => <StatusBadge variant={invoice.status}>{invoice.status}</StatusBadge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (invoice: Invoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Send Reminder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoices & Payments</h1>
            <p className="text-muted-foreground">Manage invoices and track payments</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(paidAmount / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Collected</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(pendingAmount / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm border-l-4 border-l-destructive">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(overdueAmount / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices, customers..."
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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <DataTable data={filteredInvoices} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
