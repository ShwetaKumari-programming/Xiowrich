import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Razorpay from 'razorpay'

dotenv.config()
const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))
const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
app.use('/products', express.static(path.join(serverDirectory, '..', 'client', 'public', 'products')))

const products = [
  { id: 'deadly-duo', name: 'Deadly Duo', subtitle: 'The art of contrast', category: 'Unisex', price: 949, mrp: 1799, rate: 949, size: '50 ml', image: '/products/deadly-duo-main.png', tone: 'black', notes: 'Black amber · Warm woods · Spice', description: 'A confident, magnetic fragrance made for evenings that linger.', galleryImages: ['/products/deadly-duo-main.png', '/products/deadly-duo-notes.png', '/products/deadly-duo-features.png', '/products/deadly-duo-gift-set.png'] },
  { id: 'velour', name: 'Velour', subtitle: 'Softness with a signature', category: 'Women', price: 799, mrp: 1799, rate: 799, size: '50 ml', image: '/products/velour-bottle.png', tone: 'pink', notes: 'Petals · Rose musk · Vanilla', description: 'A soft, modern floral scent with a warm, velvety finish.', galleryImages: ['/products/velour-bottle.png', '/products/velour-poster.png', '/products/velour-features.png', '/products/velour-gift-set.png'] },
  { id: 'women-of-culture', name: 'Women of Culture', subtitle: 'Grace, unapologetically', category: 'Women', price: 999, mrp: 1799, rate: 999, size: '50 ml', image: '/products/women-of-culture-bottle.png', tone: 'rose', notes: 'Saffron · Jasmine · Amberwood', description: 'A floral signature celebrating individuality, poise and presence.', galleryImages: ['/products/women-of-culture-bottle.png', '/products/women-of-culture-notes.png', '/products/women-of-culture-features.png', '/products/one-night-gift-set.png'] },
  { id: 'coco-noir', name: 'Coco Noir', subtitle: 'Deep. Warm. Unforgettable.', category: 'Unisex', price: 849, mrp: 1799, rate: 849, size: '50 ml', image: '/products/coco-noir-bottle.png', tone: 'brown', notes: 'Milk chocolate · White musk · Cinnamon', description: 'A rich, enveloping scent inspired by the warmth of milk chocolate, white musk and cinnamon.', galleryImages: ['/products/coco-noir-bottle.png', '/products/coco-noir-notes.png', '/products/coco-noir-features.png', '/products/coco-noir-gift-set.png'] },
  { id: 'man-of-culture', name: 'Man of Culture', subtitle: 'Quiet confidence', category: 'Men', price: 949, mrp: 1799, rate: 949, size: '50 ml', image: '/products/man-of-culture-main.png', tone: 'burgundy', notes: 'Lemongrass · Cardamom · Tobacco', description: 'Refined and composed, with a bold trail that speaks without shouting.', galleryImages: ['/products/man-of-culture-main.png', '/products/man-of-culture-notes.png', '/products/man-of-culture-features.png', '/products/man-of-culture-gift-set.png'] },
  { id: 'dark-romance', name: 'Dark Romance', subtitle: 'A little mystery, beautifully worn', category: 'Unisex', price: 899, mrp: 1799, rate: 899, size: '50 ml', image: '/products/dark-romance-bottle.png', tone: 'brown', notes: 'Bergamot · Iris · Patchouli', description: 'A warm, sensual signature with bright bergamot, elegant iris and deep patchouli.', galleryImages: ['/products/dark-romance-bottle.png', '/products/dark-romance-features.png', '/products/dark-romance-notes.png', '/products/dark-romance-gift-set.png'] },
  { id: 'one-night', name: 'One Night', subtitle: 'One night. A lasting impression.', category: 'Unisex', price: 899, mrp: 1799, rate: 899, size: '50 ml', image: '/products/one-night-bottle.png', tone: 'brown', notes: 'Bergamot · Marine notes · White musk', description: 'A fresh, captivating fragrance that pairs bright bergamot with marine notes and soft white musk.', galleryImages: ['/products/one-night-bottle.png', '/products/one-night-notes.png', '/products/one-night-features.png', '/products/one-night-gift-set.png'] },
  { id: 'origin', name: 'XIOWRICH Origin', subtitle: 'Some origins are forever', category: 'Unisex', price: 750, mrp: 1799, rate: 949, size: '50 ml', image: '/products/origin-bottle.png', tone: 'brown', notes: 'Amber · Sandalwood · Rose', description: 'A warm, lasting signature with amber, sandalwood and rose.', galleryImages: ['/products/origin-bottle.png', '/products/origin-poster.png', '/products/origin-features.png', '/products/origin-gift-set.png'] },
  { id: 'lady-boss', name: 'Lady Boss', subtitle: 'The art of feminine elegance', category: 'Women', price: 799, mrp: 1799, rate: 799, size: '50 ml', image: '/products/lady-boss-bottle.png', tone: 'pink', notes: 'Blackcurrant · Freesia · Ambroxan', description: 'A polished feminine fragrance with luminous florals, rich blackcurrant and a confident modern trail.', galleryImages: ['/products/lady-boss-bottle.png', '/products/lady-boss-poster.png', '/products/lady-boss-features.png', '/products/lady-boss-gift-set.png'] },
  { id: 'first-kiss', name: 'First Kiss', subtitle: 'A memory in the making', category: 'Unisex', price: 899, mrp: 1799, rate: 899, size: '50 ml', image: '/products/first-kiss-bottle.png', tone: 'brown', notes: 'Dubai oud · Turkish rose · Saffron', description: 'A romantic, enveloping fragrance where precious oud meets Turkish rose and luminous saffron.', galleryImages: ['/products/first-kiss-bottle.png', '/products/first-kiss-poster.png', '/products/first-kiss-features.png', '/products/first-kiss-gift-set.png'] }
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

app.post('/api/orders/:id/payment', async (req, res) => {
  const { paymentMethod } = req.body || {}
  if (!['upi', 'phonepe', 'razorpay', 'card', 'cod'].includes(paymentMethod)) return res.status(400).json({ error: 'Please choose a valid payment method.' })
  try {
    if (dbConnected && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const order = await Order.findByIdAndUpdate(req.params.id, { paymentMethod }, { new: true }).lean()
      if (!order) return res.status(404).json({ error: 'Order not found.' })
      return res.json({ paymentMethod: order.paymentMethod })
    }
    const order = demoOrders.find(item => item._id === req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found.' })
    order.paymentMethod = paymentMethod
    res.json({ paymentMethod: order.paymentMethod })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to update payment method.' })
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

export default app

if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`XIOWRICH API running at http://localhost:${port}`))
}
