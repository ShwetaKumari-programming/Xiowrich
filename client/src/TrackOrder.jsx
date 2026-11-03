import { Search, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const stages = [
  ['demo_order_received', 'Order received', 'Your order has been placed with XIOWRICH.'],
  ['processing', 'Preparing your fragrance', 'Our team is carefully preparing your order.'],
  ['shipped', 'On its way', 'Your fragrance has left our house.'],
  ['delivered', 'Delivered', 'Your signature has arrived.'],
]

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initialOrderId = new URLSearchParams(window.location.search).get('order')
    if (initialOrderId) setOrderId(initialOrderId)
  }, [])

  async function track(event) {
    event.preventDefault()
    if (!orderId.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${encodeURIComponent(orderId.trim())}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Order not found.')
      setOrder(data)
    } catch (requestError) {
      setError(requestError.message || 'Unable to track this order.')
    } finally {
      setLoading(false)
    }
  }

  const activeStage = order ? Math.max(0, stages.findIndex(([status]) => status === order.status)) : -1
  return <main className="tracking-page">
    <header className="tracking-hero"><p className="tracking-eyebrow">XIOWRICH CLIENT CARE</p><h1>Follow your<br/><em>signature.</em></h1><p>Enter your order ID to see the latest journey of your fragrance.</p></header>
    <section className="tracking-card">
      <form onSubmit={track}><label>Order ID<input value={orderId} onChange={event => setOrderId(event.target.value)} placeholder="Paste your order ID" aria-label="Order ID" required /></label><button className="btn btn-dark" type="submit"><Search size={16}/> {loading ? 'SEARCHING' : 'TRACK ORDER'}</button></form>
      {error && <p className="tracking-error" role="alert">{error}</p>}
      {order && <div className="tracking-result"><div className="tracking-result-head"><div><p className="tracking-eyebrow">ORDER {order.orderId}</p><h2>Your order is being cared for.</h2></div><CheckCircle2 size={32}/></div><p className="tracking-payment">Payment method: <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'card' ? 'Credit / Debit / ATM Card' : order.paymentMethod === 'phonepe' ? 'PhonePe' : order.paymentMethod === 'razorpay' ? 'Razorpay' : 'UPI'}</strong></p><div className="tracking-timeline">{stages.map(([status, title, description], index) => <div className={`tracking-stage ${index <= activeStage ? 'complete' : ''}`} key={status}><span>{index < activeStage ? '✓' : index + 1}</span><div><h3>{title}</h3><p>{index <= activeStage ? description : 'We will update you as your order progresses.'}</p></div></div>)}</div></div>}
    </section>
  </main>
}
