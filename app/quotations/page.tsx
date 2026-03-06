'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, FileText, Download, Send } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface QuotationItem {
  id: string
  product: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

const products = [
  { id: '1', name: 'RO Water Purifier - 7L', price: 15000 },
  { id: '2', name: 'RO Water Purifier - 10L', price: 22000 },
  { id: '3', name: 'UV Water Purifier', price: 8000 },
  { id: '4', name: 'RO+UV+UF Purifier', price: 28000 },
  { id: '5', name: 'Installation Service', price: 1500 },
  { id: '6', name: 'AMC - 1 Year', price: 3000 },
  { id: '7', name: 'Filter Replacement Kit', price: 2500 },
  { id: '8', name: 'Membrane Replacement', price: 4000 },
]

export default function QuotationsPage() {
  const [items, setItems] = useState<QuotationItem[]>([
    { id: '1', product: 'RO Water Purifier - 10L', description: 'Premium 10L capacity RO purifier', quantity: 2, unitPrice: 22000, total: 44000 },
  ])
  const [customerName, setCustomerName] = useState('Sharma Enterprises')
  const [customerEmail, setCustomerEmail] = useState('sharma@example.com')
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210')
  const [customerAddress, setCustomerAddress] = useState('123 Business Park, Andheri East, Mumbai - 400069')
  const [notes, setNotes] = useState('Delivery within 3-5 business days. Installation included.')
  const [validUntil, setValidUntil] = useState('2024-02-15')

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), product: '', description: '', quantity: 1, unitPrice: 0, total: 0 },
    ])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = updated.quantity * updated.unitPrice
          }
          if (field === 'product') {
            const selectedProduct = products.find((p) => p.name === value)
            if (selectedProduct) {
              updated.unitPrice = selectedProduct.price
              updated.total = updated.quantity * selectedProduct.price
            }
          }
          return updated
        }
        return item
      })
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const gstAmount = subtotal * 0.18
  const grandTotal = subtotal + gstAmount

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quotation Builder</h1>
            <p className="text-muted-foreground">Create and manage quotations for customers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button className="gap-2">
              <Send className="h-4 w-4" />
              Send Quote
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerAddress">Address</Label>
                  <Textarea
                    id="customerAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Products & Services</CardTitle>
                <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground px-2">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Unit Price</div>
                  <div className="col-span-3">Total</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-4 md:grid-cols-12 items-center p-3 rounded-lg bg-muted/30"
                  >
                    <div className="md:col-span-4">
                      <Select
                        value={item.product}
                        onValueChange={(value) => updateItem(item.id, 'product', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.name}>
                              {product.name} - ₹{product.price.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <div className="font-semibold text-foreground">
                        ₹{item.total.toLocaleString()}
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <Separator />
                <div className="space-y-2 px-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2 pt-4">
                  <Label htmlFor="notes">Notes / Terms</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add terms, conditions, or special notes..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader className="flex flex-row items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Quote Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-border">
                    <h3 className="text-lg font-bold text-primary">Filterwallah</h3>
                    <p className="text-xs text-muted-foreground">Water Purification Solutions</p>
                  </div>

                  {/* Quote Info */}
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Quote #:</span>
                    <span className="font-medium">QT-2024-157</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="font-medium">{validUntil}</span>
                  </div>

                  <Separator />

                  {/* Customer */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Bill To:</p>
                    <p className="font-medium">{customerName}</p>
                    <p className="text-xs text-muted-foreground">{customerAddress}</p>
                  </div>

                  <Separator />

                  {/* Items Summary */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="truncate flex-1 mr-2">
                          {item.product || 'Product'} x{item.quantity}
                        </span>
                        <span className="font-medium">₹{item.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>GST (18%)</span>
                      <span>₹{gstAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {notes && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                        <p className="text-xs">{notes}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
