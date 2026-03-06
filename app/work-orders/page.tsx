'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  MapPin,
  Wrench,
  Clock,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type WorkOrderStatus = 'assigned' | 'started' | 'inprogress' | 'completed'
type JobType = 'installation' | 'repair' | 'maintenance' | 'amc'

interface WorkOrder {
  id: string
  orderNumber: string
  customer: string
  customerPhone: string
  address: string
  technician: string
  technicianId: string
  jobType: JobType
  status: WorkOrderStatus
  scheduledDate: string
  scheduledTime: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const workOrders: WorkOrder[] = [
  { id: '1', orderNumber: 'WO-2024-101', customer: 'Sharma Enterprises', customerPhone: '+91 98765 43210', address: 'Andheri East, Mumbai', technician: 'Ravi Kumar', technicianId: 'T1', jobType: 'installation', status: 'assigned', scheduledDate: '2024-01-20', scheduledTime: '10:00 AM', description: 'New RO installation - 10L capacity', priority: 'high' },
  { id: '2', orderNumber: 'WO-2024-102', customer: 'Patel Industries', customerPhone: '+91 98765 43211', address: 'Bandra West, Mumbai', technician: 'Suresh P.', technicianId: 'T2', jobType: 'repair', status: 'started', scheduledDate: '2024-01-20', scheduledTime: '11:30 AM', description: 'Water leakage issue', priority: 'high' },
  { id: '3', orderNumber: 'WO-2024-103', customer: 'Gupta Residence', customerPhone: '+91 98765 43212', address: 'Koramangala, Bangalore', technician: 'Amit Singh', technicianId: 'T3', jobType: 'maintenance', status: 'inprogress', scheduledDate: '2024-01-20', scheduledTime: '02:00 PM', description: 'Annual filter replacement', priority: 'medium' },
  { id: '4', orderNumber: 'WO-2024-104', customer: 'XYZ Corporation', customerPhone: '+91 98765 43213', address: 'T Nagar, Chennai', technician: 'Kiran M.', technicianId: 'T4', jobType: 'amc', status: 'completed', scheduledDate: '2024-01-19', scheduledTime: '03:30 PM', description: 'Quarterly AMC service', priority: 'low' },
  { id: '5', orderNumber: 'WO-2024-105', customer: 'ABC Corp', customerPhone: '+91 98765 43214', address: 'Hitech City, Hyderabad', technician: 'Prakash D.', technicianId: 'T5', jobType: 'installation', status: 'assigned', scheduledDate: '2024-01-21', scheduledTime: '09:00 AM', description: 'Commercial RO system setup', priority: 'high' },
  { id: '6', orderNumber: 'WO-2024-106', customer: 'Kumar Tech', customerPhone: '+91 98765 43215', address: 'Viman Nagar, Pune', technician: 'Ravi Kumar', technicianId: 'T1', jobType: 'repair', status: 'inprogress', scheduledDate: '2024-01-20', scheduledTime: '04:00 PM', description: 'Motor replacement', priority: 'medium' },
]

const technicians = [
  { id: 'T1', name: 'Ravi Kumar', available: true },
  { id: 'T2', name: 'Suresh P.', available: true },
  { id: 'T3', name: 'Amit Singh', available: false },
  { id: 'T4', name: 'Kiran M.', available: true },
  { id: 'T5', name: 'Prakash D.', available: true },
]

const statusColors: Record<WorkOrderStatus, string> = {
  assigned: 'assigned',
  started: 'started',
  inprogress: 'inprogress',
  completed: 'completed',
}

const jobTypeLabels: Record<JobType, string> = {
  installation: 'Installation',
  repair: 'Repair',
  maintenance: 'Maintenance',
  amc: 'AMC Service',
}

const priorityColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning/15 text-warning-foreground',
  high: 'bg-destructive/15 text-destructive',
}

export default function WorkOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const columns = [
    { key: 'orderNumber', header: 'Order #', className: 'font-medium' },
    { key: 'customer', header: 'Customer' },
    {
      key: 'technician',
      header: 'Technician',
      render: (order: WorkOrder) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {order.technician.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span>{order.technician}</span>
        </div>
      ),
    },
    {
      key: 'jobType',
      header: 'Job Type',
      render: (order: WorkOrder) => (
        <span className="text-sm">{jobTypeLabels[order.jobType]}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: WorkOrder) => (
        <StatusBadge variant={statusColors[order.status]}>{order.status}</StatusBadge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (order: WorkOrder) => (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${priorityColors[order.priority]}`}>
          {order.priority}
        </span>
      ),
    },
    {
      key: 'scheduledDate',
      header: 'Scheduled',
      render: (order: WorkOrder) => (
        <div className="text-sm">
          <div>{order.scheduledDate}</div>
          <div className="text-xs text-muted-foreground">{order.scheduledTime}</div>
        </div>
      ),
    },
  ]

  const filteredOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.technician.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    total: workOrders.length,
    assigned: workOrders.filter(o => o.status === 'assigned').length,
    inProgress: workOrders.filter(o => o.status === 'started' || o.status === 'inprogress').length,
    completed: workOrders.filter(o => o.status === 'completed').length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Work Orders</h1>
            <p className="text-muted-foreground">Manage and track service jobs</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Work Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Work Order</DialogTitle>
                <DialogDescription>
                  Assign a new job to a technician
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input id="customer" placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select>
                      <SelectTrigger id="jobType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="amc">AMC Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technician">Technician</Label>
                    <Select>
                      <SelectTrigger id="technician">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((tech) => (
                          <SelectItem key={tech.id} value={tech.id} disabled={!tech.available}>
                            {tech.name} {!tech.available && '(Busy)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Scheduled Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Scheduled Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" placeholder="Describe the work to be done..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.assigned}</p>
                <p className="text-sm text-muted-foreground">Assigned</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <User className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders, customers, technicians..."
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
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="started">Started</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <DataTable data={filteredOrders} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
