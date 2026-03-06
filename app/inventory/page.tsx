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
  Package,
  AlertTriangle,
  TrendingUp,
  Warehouse,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  minStock: number
  warehouse: string
  unitPrice: number
  lastUpdated: string
}

const inventory: InventoryItem[] = [
  { id: '1', name: 'RO Membrane - 100 GPD', sku: 'MEM-100', category: 'Filters', quantity: 45, minStock: 20, warehouse: 'Mumbai HQ', unitPrice: 2500, lastUpdated: '2024-01-18' },
  { id: '2', name: 'Sediment Filter', sku: 'SED-001', category: 'Filters', quantity: 120, minStock: 50, warehouse: 'Mumbai HQ', unitPrice: 350, lastUpdated: '2024-01-17' },
  { id: '3', name: 'Carbon Filter', sku: 'CAR-001', category: 'Filters', quantity: 85, minStock: 40, warehouse: 'Delhi Branch', unitPrice: 450, lastUpdated: '2024-01-16' },
  { id: '4', name: 'UV Lamp 11W', sku: 'UV-11W', category: 'UV Parts', quantity: 15, minStock: 25, warehouse: 'Mumbai HQ', unitPrice: 1200, lastUpdated: '2024-01-15' },
  { id: '5', name: 'RO Motor Pump', sku: 'MOT-001', category: 'Motors', quantity: 8, minStock: 15, warehouse: 'Bangalore Branch', unitPrice: 3500, lastUpdated: '2024-01-14' },
  { id: '6', name: 'SMPS 24V', sku: 'SMPS-24', category: 'Electronics', quantity: 30, minStock: 20, warehouse: 'Delhi Branch', unitPrice: 800, lastUpdated: '2024-01-13' },
  { id: '7', name: 'Float Valve', sku: 'FLT-001', category: 'Valves', quantity: 200, minStock: 100, warehouse: 'Mumbai HQ', unitPrice: 150, lastUpdated: '2024-01-12' },
  { id: '8', name: 'Inline Filter Housing', sku: 'HSG-INL', category: 'Housing', quantity: 5, minStock: 30, warehouse: 'Chennai Branch', unitPrice: 280, lastUpdated: '2024-01-11' },
  { id: '9', name: 'RO Water Purifier - 7L', sku: 'RO-7L', category: 'Purifiers', quantity: 12, minStock: 10, warehouse: 'Mumbai HQ', unitPrice: 15000, lastUpdated: '2024-01-10' },
  { id: '10', name: 'RO Water Purifier - 10L', sku: 'RO-10L', category: 'Purifiers', quantity: 8, minStock: 8, warehouse: 'Delhi Branch', unitPrice: 22000, lastUpdated: '2024-01-09' },
]

const warehouses = ['Mumbai HQ', 'Delhi Branch', 'Bangalore Branch', 'Chennai Branch']
const categories = ['All', 'Filters', 'UV Parts', 'Motors', 'Electronics', 'Valves', 'Housing', 'Purifiers']

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [warehouseFilter, setWarehouseFilter] = useState('all')

  const columns = [
    {
      key: 'name',
      header: 'Product Name',
      render: (item: InventoryItem) => (
        <div>
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.sku}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    {
      key: 'quantity',
      header: 'Stock Level',
      render: (item: InventoryItem) => {
        const percentage = (item.quantity / (item.minStock * 2)) * 100
        const isLow = item.quantity <= item.minStock
        return (
          <div className="w-32 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className={cn(isLow && 'text-destructive font-medium')}>{item.quantity}</span>
              <span className="text-xs text-muted-foreground">Min: {item.minStock}</span>
            </div>
            <Progress
              value={Math.min(percentage, 100)}
              className={cn('h-2', isLow && '[&>div]:bg-destructive')}
            />
          </div>
        )
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: InventoryItem) => {
        const isLow = item.quantity <= item.minStock
        const isCritical = item.quantity <= item.minStock * 0.5
        if (isCritical) {
          return <StatusBadge variant="danger">Critical</StatusBadge>
        }
        if (isLow) {
          return <StatusBadge variant="warning">Low Stock</StatusBadge>
        }
        return <StatusBadge variant="success">In Stock</StatusBadge>
      },
    },
    { key: 'warehouse', header: 'Warehouse' },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      render: (item: InventoryItem) => `₹${item.unitPrice.toLocaleString()}`,
    },
    {
      key: 'value',
      header: 'Total Value',
      render: (item: InventoryItem) => `₹${(item.quantity * item.unitPrice).toLocaleString()}`,
    },
    { key: 'lastUpdated', header: 'Last Updated' },
  ]

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesWarehouse = warehouseFilter === 'all' || item.warehouse === warehouseFilter
    return matchesSearch && matchesCategory && matchesWarehouse
  })

  // Stats
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const lowStockItems = inventory.filter((item) => item.quantity <= item.minStock).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground">Track stock levels and manage products</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Stock Report
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inventory.length}</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalItems.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Units</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(totalValue / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Stock Value</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm border-l-4 border-l-destructive">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockItems}</p>
                <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
            <SelectTrigger className="w-48">
              <Warehouse className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {warehouses.map((wh) => (
                <SelectItem key={wh} value={wh}>{wh}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <DataTable data={filteredInventory} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
