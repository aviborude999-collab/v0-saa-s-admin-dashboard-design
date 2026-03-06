'use client'

import { useState } from 'react'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Droplets,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  PlayCircle,
  Camera,
  Package,
  PenLine,
  ArrowLeft,
  Navigation,
  Calendar,
  User,
  Wrench,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

type JobStatus = 'assigned' | 'started' | 'inprogress' | 'completed'

interface Job {
  id: string
  orderNumber: string
  customer: string
  phone: string
  address: string
  jobType: string
  status: JobStatus
  scheduledTime: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const todaysJobs: Job[] = [
  { id: '1', orderNumber: 'WO-2024-101', customer: 'Sharma Enterprises', phone: '+91 98765 43210', address: 'Shop 12, Andheri Market, Andheri East, Mumbai - 400069', jobType: 'Installation', status: 'completed', scheduledTime: '09:00 AM', description: 'New RO installation - 10L capacity', priority: 'high' },
  { id: '2', orderNumber: 'WO-2024-102', customer: 'Patel Industries', phone: '+91 98765 43211', address: '45, Industrial Estate, Bandra West, Mumbai - 400050', jobType: 'Repair', status: 'inprogress', scheduledTime: '11:30 AM', description: 'Water leakage issue - check membrane and fittings', priority: 'high' },
  { id: '3', orderNumber: 'WO-2024-103', customer: 'Gupta Residence', phone: '+91 98765 43212', address: 'Flat 302, Green Heights, Malad West, Mumbai - 400064', jobType: 'AMC Service', status: 'assigned', scheduledTime: '02:30 PM', description: 'Quarterly service - filter replacement', priority: 'medium' },
  { id: '4', orderNumber: 'WO-2024-104', customer: 'XYZ Office', phone: '+91 98765 43213', address: 'Floor 5, Tech Tower, Powai, Mumbai - 400076', jobType: 'Maintenance', status: 'assigned', scheduledTime: '04:00 PM', description: 'Annual maintenance check', priority: 'low' },
]

const spareParts = [
  { id: '1', name: 'RO Membrane - 100 GPD', sku: 'MEM-100' },
  { id: '2', name: 'Sediment Filter', sku: 'SED-001' },
  { id: '3', name: 'Carbon Filter', sku: 'CAR-001' },
  { id: '4', name: 'UV Lamp 11W', sku: 'UV-11W' },
  { id: '5', name: 'Float Valve', sku: 'FLT-001' },
  { id: '6', name: 'SMPS 24V', sku: 'SMPS-24' },
]

type Screen = 'dashboard' | 'jobs' | 'job-detail'

export default function TechnicianPage() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobStatus, setJobStatus] = useState<JobStatus>('assigned')
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const completedJobs = todaysJobs.filter(j => j.status === 'completed').length
  const pendingJobs = todaysJobs.filter(j => j.status !== 'completed').length

  const openJobDetail = (job: Job) => {
    setSelectedJob(job)
    setJobStatus(job.status)
    setActiveScreen('job-detail')
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Good Morning</p>
          <h1 className="text-xl font-bold text-foreground">Ravi Kumar</h1>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm bg-primary text-primary-foreground">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedJobs}</p>
              <p className="text-sm opacity-80">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingJobs}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Today&apos;s Jobs</h2>
          <Button variant="ghost" size="sm" onClick={() => setActiveScreen('jobs')}>
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {todaysJobs.slice(0, 3).map((job) => (
            <Card
              key={job.id}
              className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openJobDetail(job)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{job.customer}</span>
                      <StatusBadge variant={job.status}>{job.status}</StatusBadge>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.jobType}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {job.scheduledTime}
                    </div>
                  </div>
                  <div className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    job.priority === 'high' && 'bg-destructive/15 text-destructive',
                    job.priority === 'medium' && 'bg-warning/15 text-warning-foreground',
                    job.priority === 'low' && 'bg-muted text-muted-foreground'
                  )}>
                    {job.priority}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveScreen('jobs')}>
            <Wrench className="h-5 w-5 text-primary" />
            <span className="text-xs">All Jobs</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Package className="h-5 w-5 text-chart-2" />
            <span className="text-xs">Inventory</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Calendar className="h-5 w-5 text-chart-3" />
            <span className="text-xs">Schedule</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const renderJobsList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setActiveScreen('dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Assigned Jobs</h1>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {todaysJobs.map((job) => (
          <Card
            key={job.id}
            className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openJobDetail(job)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{job.orderNumber}</p>
                  <p className="font-medium text-foreground">{job.customer}</p>
                </div>
                <StatusBadge variant={job.status}>{job.status}</StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.scheduledTime}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.address.split(',')[0]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderJobDetail = () => {
    if (!selectedJob) return null

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setActiveScreen('jobs')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{selectedJob.orderNumber}</p>
            <h1 className="text-lg font-bold text-foreground">{selectedJob.jobType}</h1>
          </div>
          <StatusBadge variant={jobStatus}>{jobStatus}</StatusBadge>
        </div>

        {/* Customer Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedJob.customer.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedJob.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedJob.phone}</p>
              </div>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground flex-1">{selectedJob.address}</p>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <Navigation className="h-4 w-4" />
                Navigate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Job Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {jobStatus === 'assigned' && (
          <Button className="w-full gap-2" size="lg" onClick={() => setJobStatus('started')}>
            <PlayCircle className="h-5 w-5" />
            Start Job
          </Button>
        )}

        {(jobStatus === 'started' || jobStatus === 'inprogress') && (
          <div className="space-y-4">
            {/* Spare Parts */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Spare Parts Used
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select spare part" />
                  </SelectTrigger>
                  <SelectContent>
                    {spareParts.map((part) => (
                      <SelectItem key={part.id} value={part.id}>
                        {part.name} ({part.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedParts.length > 0 && (
                  <div className="space-y-1">
                    {selectedParts.map((partId) => {
                      const part = spareParts.find(p => p.id === partId)
                      return part ? (
                        <div key={partId} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <span>{part.name}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            x
                          </Button>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Photos */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Upload Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50">
                    <span className="text-xs text-muted-foreground">Before</span>
                  </div>
                  <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50">
                    <span className="text-xs text-muted-foreground">After</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PenLine className="h-4 w-4" />
                  Service Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Textarea
                  placeholder="Add notes about the service..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Customer Signature */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer Signature</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                  <p className="text-sm text-muted-foreground">Tap to capture signature</p>
                </div>
              </CardContent>
            </Card>

            {/* Complete Button */}
            <Button className="w-full gap-2 bg-success hover:bg-success/90" size="lg" onClick={() => setJobStatus('completed')}>
              <CheckCircle2 className="h-5 w-5" />
              Complete Job
            </Button>
          </div>
        )}

        {jobStatus === 'completed' && (
          <Card className="border-0 shadow-sm bg-success/10">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="font-medium text-foreground">Job Completed</p>
                <p className="text-sm text-muted-foreground">Service completed successfully</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile App Frame */}
      <div className="mx-auto max-w-md">
        {/* Status Bar Mockup */}
        <div className="sticky top-0 z-50 bg-primary px-4 py-2 flex items-center justify-between text-primary-foreground">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            <span className="font-semibold text-sm">Filterwallah Tech</span>
          </div>
          <div className="text-xs">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeScreen === 'dashboard' && renderDashboard()}
          {activeScreen === 'jobs' && renderJobsList()}
          {activeScreen === 'job-detail' && renderJobDetail()}
        </div>

        {/* Bottom Navigation */}
        {activeScreen === 'dashboard' && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
            <div className="mx-auto max-w-md flex items-center justify-around py-3">
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <Wrench className="h-5 w-5 text-primary" />
                <span className="text-xs text-primary">Jobs</span>
              </Button>
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Schedule</span>
              </Button>
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Inventory</span>
              </Button>
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Profile</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
