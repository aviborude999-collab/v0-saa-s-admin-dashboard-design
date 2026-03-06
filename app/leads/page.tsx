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
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type LeadStatus = 'new' | 'contacted' | 'followup' | 'quotation' | 'negotiation' | 'won' | 'lost'

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  location: string
  source: string
  status: LeadStatus
  assignedTo: string
  createdAt: string
  value: string
}

const leads: Lead[] = [
  { id: '1', name: 'Sharma Enterprises', phone: '+91 98765 43210', email: 'sharma@example.com', location: 'Mumbai', source: 'Website', status: 'new', assignedTo: 'Rahul M.', createdAt: '2024-01-15', value: '₹1,25,000' },
  { id: '2', name: 'Patel Industries', phone: '+91 98765 43211', email: 'patel@example.com', location: 'Delhi', source: 'Referral', status: 'contacted', assignedTo: 'Priya S.', createdAt: '2024-01-14', value: '₹2,50,000' },
  { id: '3', name: 'Gupta Residence', phone: '+91 98765 43212', email: 'gupta@example.com', location: 'Bangalore', source: 'Google Ads', status: 'followup', assignedTo: 'Amit K.', createdAt: '2024-01-13', value: '₹45,000' },
  { id: '4', name: 'XYZ Corporation', phone: '+91 98765 43213', email: 'xyz@example.com', location: 'Chennai', source: 'Website', status: 'quotation', assignedTo: 'Rahul M.', createdAt: '2024-01-12', value: '₹3,75,000' },
  { id: '5', name: 'ABC Corp', phone: '+91 98765 43214', email: 'abc@example.com', location: 'Hyderabad', source: 'Social Media', status: 'negotiation', assignedTo: 'Priya S.', createdAt: '2024-01-11', value: '₹5,00,000' },
  { id: '6', name: 'Kumar Tech', phone: '+91 98765 43215', email: 'kumar@example.com', location: 'Pune', source: 'Referral', status: 'won', assignedTo: 'Amit K.', createdAt: '2024-01-10', value: '₹1,80,000' },
  { id: '7', name: 'Singh Builders', phone: '+91 98765 43216', email: 'singh@example.com', location: 'Ahmedabad', source: 'Google Ads', status: 'lost', assignedTo: 'Rahul M.', createdAt: '2024-01-09', value: '₹90,000' },
  { id: '8', name: 'Mehta Housing', phone: '+91 98765 43217', email: 'mehta@example.com', location: 'Jaipur', source: 'Website', status: 'new', assignedTo: 'Priya S.', createdAt: '2024-01-08', value: '₹2,20,000' },
]

const kanbanColumns: { status: LeadStatus; title: string; color: string }[] = [
  { status: 'new', title: 'New', color: 'bg-chart-1' },
  { status: 'contacted', title: 'Contacted', color: 'bg-chart-2' },
  { status: 'followup', title: 'Follow Up', color: 'bg-chart-4' },
  { status: 'quotation', title: 'Quotation Sent', color: 'bg-chart-3' },
  { status: 'negotiation', title: 'Negotiation', color: 'bg-chart-5' },
  { status: 'won', title: 'Won', color: 'bg-success' },
  { status: 'lost', title: 'Lost', color: 'bg-destructive' },
]

export default function LeadsPage() {
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [searchQuery, setSearchQuery] = useState('')

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'location', header: 'Location' },
    { key: 'source', header: 'Lead Source' },
    {
      key: 'status',
      header: 'Status',
      render: (lead: Lead) => <StatusBadge variant={lead.status}>{lead.status}</StatusBadge>,
    },
    { key: 'assignedTo', header: 'Assigned To' },
    { key: 'value', header: 'Value' },
    { key: 'createdAt', header: 'Created' },
  ]

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">CRM Leads</h1>
            <p className="text-muted-foreground">Manage and track your sales pipeline</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="followup">Follow Up</SelectItem>
                <SelectItem value="quotation">Quotation</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <Button
              variant={view === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('table')}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Table
            </Button>
            <Button
              variant={view === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('kanban')}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Kanban
            </Button>
          </div>
        </div>

        {/* Table View */}
        {view === 'table' && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <DataTable data={filteredLeads} columns={columns} />
            </CardContent>
          </Card>
        )}

        {/* Kanban View */}
        {view === 'kanban' && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {kanbanColumns.map((column) => {
              const columnLeads = filteredLeads.filter((lead) => lead.status === column.status)
              return (
                <div key={column.status} className="min-w-[300px] flex-shrink-0">
                  <div className="mb-3 flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded-full', column.color)} />
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                    <span className="text-sm text-muted-foreground">({columnLeads.length})</span>
                  </div>
                  <div className="space-y-3">
                    {columnLeads.map((lead) => (
                      <Card key={lead.id} className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-foreground">{lead.name}</h4>
                              <span className="text-sm font-semibold text-primary">{lead.value}</span>
                            </div>
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5" />
                                {lead.phone}
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5" />
                                {lead.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5" />
                                {lead.location}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                              <span className="text-xs text-muted-foreground">{lead.assignedTo}</span>
                              <span className="text-xs text-muted-foreground">{lead.createdAt}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {columnLeads.length === 0 && (
                      <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        No leads
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
