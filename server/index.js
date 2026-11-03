import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Razorpay from 'razorpay'
import crypto from 'node:crypto'

dotenv.config()
const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))

const products = [
  { id: 'velour', name: 'Velour', price: 2199, size: '50 ml' },
  { id: 'women-of-culture', name: 'Women of Culture', price: 2299, size: '50 ml' },
  { id: 'coco-noir', name: 'Coco Noir', price: 2699, size: '50 ml' },
  { id: 'dark-romance', name: 'Dark Romance', price: 2499, size: '50 ml' },
  { id: 'one-night', name: 'One Night', price: 2499, size: '50 ml' },
  { id: 'origin', name: 'XIOWRICH Origin', price: 2499, size: '50 ml' },
  { id: 'lady-boss', name: 'Lady Boss', price: 2499, size: '50 ml' },
  { id: 'first-kiss', name: 'First Kiss', price: 2499, size: '50 ml' }
]

const orderSchema = new mongoose.Schema({
  customer: { name: String, phone: String, address: String, city: String, pincode: String },
  email: String,
  items: [{ productId: String, name: String, price: Number, quantity: Number }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['upi', 'phonepe', 'razorpay', 'card', 'cod'], default: 'upi' },
  status: { type: String, default: 'pending_payment' },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now }
})
const Order = mongoose.model('Order', orderSchema)
const demoOrders = []
let dbConnected = false

async function connectDB() {
  if (!process.env.MONGODB_URI) return
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    dbConnected = true
    console.log('MongoDB connected')
  } catch (err) {
    console.warn('MongoDB unavailable; using temporary in-memory demo order storage:', err.message)
  }
}
await connectDB()

app.get('/api/health', (_req, res) => res.json({ ok: true, database: dbConnected ? 'connected' : 'demo-memory', paymentsConfigured: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) }))
app.get('/api/products', (_req, res) => res.json(products))

function validateOrder(body) {
  if (!body?.customer?.name || !body?.customer?.phone || !body?.customer?.address || !body?.customer?.city || !/^\d{6}$/.test(body?.customer?.pincode || '') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body?.email || '')) return 'Valid customer and delivery details are required.'
  if (!['upi', 'phonepe', 'razorpay', 'card', 'cod'].includes(body.paymentMethod)) return 'Please choose a valid payment method.'
  if (!Array.isArray(body.items) || body.items.length === 0) return 'At least one product is required.'
  for (const item of body.items) {
    const product = products.find(p => p.id === item.productId)
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) return 'A product or quantity is invalid.'
    if (item.price !== product.price) return 'Product price changed. Please refresh your cart.'
  }
  return null
}
function calculate(body) {
  const subtotal = body.items.reduce((sum, item) => sum + products.find(p => p.id === item.productId).price * item.quantity, 0)
  return { subtotal, shipping: subtotal >= 3000 ? 0 : 99, total: subtotal + (subtotal >= 3000 ? 0 : 99) }
}
async function storeOrder(data) {
  if (dbConnected) return await Order.create(data)
  const order = { ...data, _id: crypto.randomUUID(), createdAt: new Date() }
  demoOrders.push(order)
  return order
}

app.post('/api/orders', async (req, res) => {
  const error = validateOrder(req.body)
  if (error) return res.status(400).json({ error })
  try {
    const totals = calculate(req.body)
    const order = await storeOrder({ customer: req.body.customer, email: req.body.email, paymentMethod: req.body.paymentMethod, items: req.body.items.map(i => ({ ...i, price: products.find(p => p.id === i.productId).price })), ...totals, status: 'demo_order_received' })
    res.status(201).json({ message: 'Demo order received. No payment was taken.', orderId: order._id, status: order.status, paymentMethod: order.paymentMethod, ...totals })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to save order.' })
  }
})

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = dbConnected && mongoose.Types.ObjectId.isValid(req.params.id)
      ? await Order.findById(req.params.id).lean()
      : demoOrders.find(item => item._id === req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found. Check the order ID and try again.' })
    res.json({
      orderId: String(order._id),
      status: order.status,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      items: order.items,
      total: order.total,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to track this order.' })
  }
})

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
}

// Create a payment order. Amount is recalculated server-side in paise; client totals are never trusted.
app.post('/api/payments/create-order', async (req, res) => {
  const error = validateOrder(req.body)
  if (error) return res.status(400).json({ error })
  const razorpay = getRazorpay()
  if (!razorpay) return res.status(503).json({ error: 'Payments are not configured. Add Razorpay test credentials to server/.env.' })
  try {
    const totals = calculate(req.body)
    const order = await razorpay.orders.create({ amount: totals.total * 100, currency: 'INR', receipt: `xio_${Date.now()}`, notes: { customerEmail: req.body.email } })
    res.json({ keyId: process.env.RAZORPAY_KEY_ID, razorpayOrderId: order.id, amount: order.amount, currency: order.currency, totals })
  } catch (err) {
    console.error(err)
    res.status(502).json({ error: 'Could not start payment. Please try again.' })
  }
})

// Verify Razorpay's signature server-side after Checkout returns its payment details.
app.post('/api/payments/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return res.status(400).json({ error: 'Payment verification details are incomplete.' })
  if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ error: 'Payment verification is not configured.' })
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(razorpay_signature)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(400).json({ verified: false, error: 'Payment signature is invalid.' })
  // Production: persist the verified payment against a server-created pending order and reconcile webhooks.
  res.json({ verified: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id, message: 'Signature verified. Link this verified payment to a persisted order before fulfilment.' })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`XIOWRICH API running at http://localhost:${port}`))
