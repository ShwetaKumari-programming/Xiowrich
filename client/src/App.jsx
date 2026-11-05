import { ArrowRight, CheckCircle2, Instagram, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from './api'

const perfumeImages = [
  {
    id: 3,
    name: "Velour",
    image: "/products/velour.jpeg",
  },
  {
    id: 4,
    name: "Deadly Duo",
    image: "/products/deadly-duo.jpeg",
  },
  {
    id: 5,
    name: "Man of Culture",
    image: "/products/man-of-culture.jpeg",
  },
]
perfumeImages.push({ id: 6, name: 'Dark Romance', image: '/products/dark-romance-bottle.png' })
perfumeImages.push({ id: 7, name: 'One Night', image: '/products/one-night-bottle.png' })
perfumeImages.push({ id: 8, name: 'Women of Culture', image: '/products/women-of-culture-bottle.png' })
perfumeImages.push({ id: 9, name: 'Coco Noir', image: '/products/coco-noir-bottle.png' })
perfumeImages.push({ id: 10, name: 'Lady Boss', image: '/products/lady-boss-bottle.png' })
perfumeImages.push({ id: 11, name: 'First Kiss', image: '/products/first-kiss-bottle.png' })
perfumeImages.push({ id: 12, name: 'XIOWRICH Origin', image: '/products/origin-bottle.png' })
const velourGallery = ['/products/velour-bottle.png', '/products/velour-poster.png', '/products/velour-features.png', '/products/velour-gift-set.png']
const darkRomanceGallery = ['/products/dark-romance-bottle.png', '/products/dark-romance-features.png', '/products/dark-romance-notes.png', '/products/dark-romance-gift-set.png']
const oneNightGallery = ['/products/one-night-bottle.png', '/products/one-night-notes.png', '/products/one-night-features.png', '/products/one-night-gift-set.png']
const womenOfCultureGallery = ['/products/women-of-culture-bottle.png', '/products/women-of-culture-notes.png', '/products/women-of-culture-features.png', '/products/one-night-gift-set.png']
const cocoNoirGallery = ['/products/coco-noir-bottle.png', '/products/coco-noir-notes.png', '/products/coco-noir-features.png', '/products/coco-noir-gift-set.png']
const deadlyDuoGallery = ['/products/deadly-duo.jpeg', '/products/deadly-duo.jpeg', '/products/deadly-duo.jpeg', '/products/deadly-duo.jpeg']
const manOfCultureGallery = ['/products/man-of-culture.jpeg', '/products/man-of-culture.jpeg', '/products/man-of-culture.jpeg', '/products/man-of-culture.jpeg']
const firstKissGallery = ['/products/first-kiss-bottle.png', '/products/first-kiss-poster.png', '/products/first-kiss-features.png', '/products/first-kiss-gift-set.png']
const ladyBossGallery = ['/products/lady-boss-bottle.png', '/products/lady-boss-poster.png', '/products/lady-boss-features.png', '/products/lady-boss-gift-set.png']
const originGallery = ['/products/origin-bottle.png', '/products/origin-poster.png', '/products/origin-features.png', '/products/origin-gift-set.png']

const products = [
  { id: 'deadly-duo', name: 'Deadly Duo', subtitle: 'The art of contrast', category: 'Unisex', price: 750, mrp: 1799, size: '50 ml', image: '/products/deadly-duo.jpeg', tone: 'black', notes: 'Black amber · Warm woods · Spice', description: 'A confident, magnetic fragrance made for evenings that linger.' },
  { id: 'velour', name: 'Velour', subtitle: 'Softness with a signature', category: 'Women', price: 600, mrp: 1799, size: '50 ml', image: '/products/velour.jpeg', tone: 'pink', notes: 'Petals · Rose musk · Vanilla', description: 'A soft, modern floral scent with a warm, velvety finish.' },
  { id: 'women-of-culture', name: 'Women of Culture', subtitle: 'Grace, unapologetically', category: 'Women', price: 800, mrp: 1799, size: '50 ml', image: '/products/women-of-culture-bottle.png', tone: 'rose', notes: 'Saffron · Jasmine · Amberwood', description: 'A floral signature celebrating individuality, poise and presence.' },
  { id: 'coco-noir', name: 'Coco Noir', subtitle: 'Deep. Warm. Unforgettable.', category: 'Unisex', price: 650, mrp: 1799, size: '50 ml', image: '/products/coco-noir-bottle.png', tone: 'brown', notes: 'Milk chocolate · White musk · Cinnamon', description: 'A rich, enveloping scent inspired by the warmth of milk chocolate, white musk and cinnamon.' },
  { id: 'man-of-culture', name: 'Man of Culture', subtitle: 'Quiet confidence', category: 'Men', price: 750, mrp: 1799, size: '50 ml', image: '/products/man-of-culture.jpeg', tone: 'burgundy', notes: 'Spiced woods · Amber · Musk', description: 'Refined and composed, with a bold trail that speaks without shouting.' },
  { id: 'dark-romance', name: 'Dark Romance', subtitle: 'A little mystery, beautifully worn', category: 'Unisex', price: 700, mrp: 1799, size: '50 ml', image: '/products/dark-romance-bottle.png', tone: 'brown', notes: 'Bergamot · Iris · Patchouli', description: 'A warm, sensual signature with bright bergamot, elegant iris and deep patchouli.' },
  { id: 'one-night', name: 'One Night', subtitle: 'One night. A lasting impression.', category: 'Unisex', price: 700, mrp: 1799, size: '50 ml', image: '/products/one-night-bottle.png', tone: 'brown', notes: 'Bergamot · Marine notes · White musk', description: 'A fresh, captivating fragrance that pairs bright bergamot with marine notes and soft white musk.' },
  { id: 'lady-boss', name: 'Lady Boss', subtitle: 'The art of feminine elegance', category: 'Women', price: 600, mrp: 1799, size: '50 ml', image: '/products/lady-boss-bottle.png', tone: 'pink', notes: 'Blackcurrant · Freesia · Ambroxan', description: 'A polished feminine fragrance with luminous florals, rich blackcurrant and a confident modern trail.' },
  { id: 'first-kiss', name: 'First Kiss', subtitle: 'A memory in the making', category: 'Unisex', price: 700, mrp: 1799, size: '50 ml', image: '/products/first-kiss-bottle.png', tone: 'brown', notes: 'Dubai oud · Turkish rose · Saffron', description: 'A romantic, enveloping fragrance where precious oud meets Turkish rose and luminous saffron.' },
  { id: 'origin', name: 'XIOWRICH Origin', subtitle: 'Some origins are forever', category: 'Unisex', price: 750, mrp: 1799, size: '50 ml', image: '/products/origin-bottle.png', tone: 'brown', notes: 'Amber · Sandalwood · Rose', description: 'A warm, lasting signature with amber, sandalwood and rose.' },
]
products.find(product => product.id === 'velour').galleryImages = velourGallery
products.find(product => product.id === 'dark-romance').galleryImages = darkRomanceGallery
products.find(product => product.id === 'one-night').galleryImages = oneNightGallery
products.find(product => product.id === 'women-of-culture').galleryImages = womenOfCultureGallery
products.find(product => product.id === 'coco-noir').galleryImages = cocoNoirGallery
products.find(product => product.id === 'deadly-duo').galleryImages = deadlyDuoGallery
products.find(product => product.id === 'man-of-culture').galleryImages = manOfCultureGallery
products.find(product => product.id === 'first-kiss').galleryImages = firstKissGallery
products.find(product => product.id === 'lady-boss').galleryImages = ladyBossGallery
products.find(product => product.id === 'origin').galleryImages = originGallery
const printPages = [1, 2, 3, 4, 5, 6, 7, 8].map(number => ({
  number: String(number).padStart(2, '0'),
  image: `/a4-prints/page-${String(number).padStart(2, '0')}.jpg`,
}))
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
const PRICE_ADJUSTMENT = 199
const getPricing = product => ({
  mrp: product.mrp,
  markedPrice: product.price + PRICE_ADJUSTMENT,
  finalPrice: product.price,
  savings: product.mrp - product.price,
  discountPercent: Math.round(((product.mrp - product.price) / product.mrp) * 100),
})

function ContactPage() {
  return <section className="contact-page" id="contact">
    <div className="contact-hero"><div className="eyebrow">CONTACT US</div><h1>We’d Love to<br/><em>Hear From You.</em></h1><p>Have a question about our fragrances, an order, or a business collaboration? We’re here to help.</p><a className="btn btn-light" href="mailto:officialxiowrich@gmail.com">EMAIL US <ArrowRight size={16}/></a></div>
    <div className="contact-info-grid"><div className="contact-info-card"><div className="eyebrow">CUSTOMER SUPPORT</div><h2>Here when you<br/><em>need us.</em></h2><a href="mailto:officialxiowrich@gmail.com">Email: officialxiowrich@gmail.com</a><a href="tel:+917618383655">Phone/WhatsApp: +917618383655</a></div><div className="contact-info-card"><div className="eyebrow">BUSINESS ENQUIRIES</div><h2>Let’s create<br/><em>together.</em></h2><p>For wholesale, distribution, and partnerships, contact us at <a href="tel:+917618383655">+917618383655</a></p></div><div className="contact-form-card"><div className="eyebrow">SEND US A MESSAGE</div><h2>We’d love to<br/><em>hear from you.</em></h2><p>Have a question? Fill out our contact form, and we’ll get back to you.</p><form className="contact-form" onSubmit={event => event.preventDefault()}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="Your email" /></label><label>Message<textarea required name="message" rows="4" placeholder="How can we help?" /></label><button className="btn btn-dark" type="submit">SEND MESSAGE <ArrowRight size={16}/></button></form></div><div className="contact-social"><span>FOLLOW US ON INSTAGRAM</span><a href="https://instagram.com/xiowrich" target="_blank" rel="noreferrer">@xiowrich <ArrowRight size={15}/></a></div></div>
    <div className="contact-layout"><aside className="contact-details"><div className="eyebrow">GET IN TOUCH</div><h2>Let’s talk<br/><em>fragrance.</em></h2><a href="mailto:hello@xiowrich.example">hello@xiowrich.example</a><p>For order support, please include your order number and registered contact details.</p><span>RESPONSE TIME<br/><strong>Within 2 business days</strong></span></aside><article className="policy"><div className="policy-heading"><div className="eyebrow">ORDER SUPPORT</div><h2>Return &amp; Refund<br/><em>Policy</em></h2><p><strong>Effective Date: 24 October 2026</strong></p><p>At XIOWRICH, we want every customer to have a smooth and satisfying shopping experience. We take care in preparing and dispatching our fragrances and are committed to helping resolve issues with orders.</p><p>Please read our Return &amp; Refund Policy carefully before placing an order.</p></div><div className="policy-section"><h3><span>01</span> Return Eligibility</h3><p>Due to the personal-care nature of perfumes and fragrances, returns may be restricted for products that have been opened, used, sprayed, or tampered with.</p><p>We may accept a return or replacement request if:</p><ul><li>You received a damaged product.</li><li>You received an incorrect product.</li><li>The product arrived with a manufacturing defect.</li><li>Your order was missing an item.</li><li>The product received materially differs from the product ordered.</li></ul><p>All requests are subject to verification and applicable consumer protection laws.</p></div><div className="policy-section"><h3><span>02</span> Products That Cannot Be Returned</h3><p>For hygiene, safety, and product-integrity reasons, we generally do not accept returns for:</p><ul><li>Perfumes that have been opened or used.</li><li>Products with broken seals or damaged packaging caused after delivery.</li><li>Products damaged due to improper handling or storage after delivery.</li><li>Products returned without the original packaging, where that packaging is necessary to verify or safely process the return.</li></ul><p>These restrictions do not affect any rights you may have under applicable law, including rights relating to defective, damaged, incorrect, or misrepresented products.</p></div><div className="policy-section"><h3><span>03</span> Reporting a Damaged or Incorrect Product</h3><p>If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery.</p><p>To help us investigate your request, please provide:</p><ul><li>Your order number.</li><li>Your registered name and contact details.</li><li>Clear photographs of the product and its packaging.</li><li>A photograph of the shipping label.</li><li>A short description of the issue.</li></ul><p>Please retain the original product and packaging until your request has been resolved. We will review the information and communicate the next steps.</p><p>The 48-hour reporting period helps us investigate shipping-related issues promptly. It does not remove any rights available to customers under applicable law.</p></div><div className="policy-section"><h3><span>04</span> Return and Replacement Process</h3><p>Once your request has been reviewed, we will inform you whether the product qualifies for a return, replacement, repair, or refund, as applicable.</p><p>If a return is approved, we will provide instructions for sending the product back.</p><p>Please do not ship a product to us before receiving return instructions.</p><p>Where the issue is attributable to XIOWRICH or its delivery partner, we will communicate the applicable return or collection arrangements.</p></div><div className="policy-section"><h3><span>05</span> Refund Policy</h3><p>If a refund is approved, it will be processed using the original payment method wherever possible.</p><p>For prepaid orders, the refund will generally be initiated within 5–7 business days after approval, subject to the return process and verification requirements.</p><p>The time taken for the refunded amount to appear in your account may depend on your bank, payment provider, or payment method.</p><p>For cash-on-delivery orders, we may request bank account or other payment details necessary to process the refund securely.</p><p>Any refund will be handled in accordance with applicable law and the circumstances of the order.</p></div><div className="policy-section"><h3><span>06</span> Shipping Charges</h3><p>If a return or replacement is necessary because the product was damaged, defective, incorrect, or otherwise eligible for a remedy attributable to XIOWRICH, we will communicate the applicable return or collection arrangements and shipping charges.</p></div></article></div>
  </section>
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('xiowrich-cart') || '[]'))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [galleryIndexes, setGalleryIndexes] = useState({})
  const [orderDone, setOrderDone] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductImage, setSelectedProductImage] = useState(0)
  const [contactPage, setContactPage] = useState(() => window.location.hash === '#contact')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethodState] = useState('cod')
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', city: '', pincode: '' })

  useEffect(() => {
    if ((!cartOpen && !checkoutOpen) || cart.length === 0) return
    const timer = window.setInterval(() => {
      setGalleryIndexes(current => {
        const next = { ...current }
        cart.forEach(item => {
          const images = item.galleryImages?.length ? item.galleryImages : products.find(product => product.id === item.id)?.galleryImages
          if (images?.length > 1) next[item.id] = ((current[item.id] || 0) + 1) % images.length
        })
        return next
      })
    }, 3000)
    return () => window.clearInterval(timer)
  }, [cart, cartOpen, checkoutOpen])

  useEffect(() => {
    const handleHashChange = () => setContactPage(window.location.hash === '#contact')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const saveCart = next => { setCart(next); localStorage.setItem('xiowrich-cart', JSON.stringify(next)) }
  const addToCart = product => {
    const found = cart.find(item => item.id === product.id)
    saveCart(found ? cart.map(item => item.id === product.id ? { ...item, ...product, qty: item.qty + 1 } : item) : [...cart, { ...product, qty: 1 }])
    setNotice(`${product.name} added to your bag`)
    setTimeout(() => setNotice(''), 2400)
  }
  const changeQty = (id, amount) => saveCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0))
  const moveGallery = (id, images, direction) => setGalleryIndexes(current => ({ ...current, [id]: ((current[id] || 0) + direction + images.length) % images.length }))
  const choosePaymentMethod = async method => {
    setPaymentMethodState(method)
    if (!orderId) return
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${encodeURIComponent(orderId)}/payment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paymentMethod: method }) })
      if (!response.ok) setNotice('Could not save your payment choice. Please try again.')
    } catch {
      setNotice('Could not save your payment choice. Please try again.')
    }
    const setPaymentMethod = method => { choosePaymentMethod(method) }
  }
  const openProduct = product => {
    setSelectedProduct(product)
    setSelectedProductImage(0)
  }
  const GalleryViewer = ({ item, className = '' }) => {
    const images = item.galleryImages?.length ? item.galleryImages : products.find(product => product.id === item.id)?.galleryImages || [item.image]
    const index = galleryIndexes[item.id] || 0
    return <div className={`item-gallery ${className}`}>
      <img src={images[index]} alt={`${item.name} image ${index + 1} of ${images.length}`} />
      {images.length > 1 && <div className="gallery-controls"><button type="button" onClick={() => moveGallery(item.id, images, -1)} aria-label={`Previous ${item.name} image`}><ArrowRight className="gallery-previous" size={15}/></button><span>{index + 1} / {images.length}</span><button type="button" onClick={() => moveGallery(item.id, images, 1)} aria-label={`Next ${item.name} image`}><ArrowRight size={15}/></button></div>}
    </div>
  }
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const filtered = useMemo(() => products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.notes} ${p.category}`.toLowerCase().includes(search.toLowerCase())), [category, search])

  async function placeOrder(e) {
    e.preventDefault()
    const payload = { customer, email, paymentMethod, items: cart.map(({ id, name, price, qty }) => ({ productId: id, name, price, quantity: qty })), subtotal, shipping: subtotal >= 3000 ? 0 : 99, total: subtotal + (subtotal >= 3000 ? 0 : 99) }
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (response.ok) {
        const data = await response.json()
        setOrderId(data.orderId)
        setOrderDone(true)
      } else setNotice('Could not create your order. Please try again.')
    } catch {
      setNotice('Unable to place your order. Please start the store with “npm run dev” and try again.')
      setTimeout(() => setNotice(''), 3500)
    }
  }

  const scrollShop = () => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  return <div className="site-shell"><style>{`.contact-page .contact-hero{display:none}.contact-page .contact-info-grid{padding-top:55px}.contact-page .contact-info-card,.contact-page .contact-form-card,.contact-page .contact-social{display:none}.hero-visual{margin-top:0!important}.bag-btn{font-weight:900}main:not(.contact-route) > .contact-page,main:not(.contact-route) > .about-page{display:none}`}</style>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER ₹3,000 <span>✦</span> DISCOVER YOUR SIGNATURE</div>
    <header className="header">
      <button className="icon-btn mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={`nav-left ${mobileMenu ? 'nav-open' : ''}`}><a href="#collection" onClick={() => setMobileMenu(false)}>SHOP ALL</a><a href="/about" onClick={() => setMobileMenu(false)}>ABOUT US</a><a href="#ritual" onClick={() => setMobileMenu(false)}>THE RITUAL</a><a href="#prints" onClick={() => setMobileMenu(false)}>OUR COLLECTION</a></nav>
      <a className="wordmark" href="#" aria-label="XIOWRICH home">XIOWRICH<span>PARFUMS DE CARACTÈRE</span></a>
      <div className="header-actions"><button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button><button className="bag-btn" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19}/><span>CART ({cart.reduce((s,i)=>s+i.qty,0)})</span></button></div>
    </header>
    {searchOpen && <div className="search-strip"><Search size={18}/><input autoFocus placeholder="Search fragrances, notes, moods..." value={search} onChange={e=>{setSearch(e.target.value);scrollShop()}}/><button className="icon-btn" onClick={()=>{setSearchOpen(false);setSearch('')}}><X size={18}/></button></div>}

    <main className={contactPage ? 'contact-route' : ''}>
      <ContactPage />
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span></span> THE ART OF PERSONAL FRAGRANCE</div><h1>A scent that<br/><em>stays with you.</em></h1><p>Considered fragrances for the moments that become memories. Find the scent that feels unmistakably yours.</p><button className="btn btn-dark" onClick={scrollShop}>DISCOVER THE COLLECTION <ArrowRight size={16}/></button></div>
        <div className="hero-visual"><img src="/products/coco-noir.jpeg" alt="XIOWRICH Coco Noir perfume" /><div className="hero-stamp"><Sparkles size={16}/><span>YOUR<br/>SIGNATURE<br/>AWAITS</span></div><div className="vertical-note">EAU DE PARFUM · XIOWRICH</div></div>
        <div className="hero-side">SCENT IS THE LANGUAGE OF MEMORY.</div>
      </section>

      <section className="promise-row"><div><span>01</span><p>Distinctive compositions</p></div><div><span>02</span><p>Made for every presence</p></div><div><span>03</span><p>A little luxury, every day</p></div></section>

      <section id="collection" className="collection-section">
        <div className="collection-heading">
          <p className="eyebrow">THE XIOWRICH WARDROBE</p>
          <h2>
            Discover Our <em>Fragrances</em>
          </h2>
        </div>

        <div className="perfume-gallery">
          {perfumeImages.map((perfume) => {
            const product = products.find(item => item.name === perfume.name)
            return <div className="perfume-card" key={perfume.id} onClick={() => openProduct(product)}>
              <button className="perfume-card-image" onClick={() => openProduct(product)} aria-label={`View ${perfume.name}`}>
                <img src={perfume.image} alt={perfume.name} loading="lazy" />
              </button>
              <h3 className="perfume-card-name">{perfume.name}</h3>
              <div className="perfume-card-prices"><span>{money(product.mrp)}</span><del>{money(getPricing(product).markedPrice)}</del><strong>{money(getPricing(product).finalPrice)}</strong></div>
              <small className="discount-label">{getPricing(product).discountPercent}% OFF · Save {money(getPricing(product).savings)}</small>
              <button className="btn btn-dark collection-add" onClick={event => { event.stopPropagation(); addToCart(product) }}>ADD TO CART <ShoppingBag size={15}/></button>
            </div>
          })}
        </div>
      </section>

      <section className="manifesto" id="story"><div className="manifesto-image"><img src="/products/women-of-culture.jpeg" alt="Women of Culture fragrance surrounded by white flowers"/></div><div className="manifesto-copy"><div className="eyebrow">MORE THAN A FRAGRANCE</div><h2>Leave a little<br/><em>of yourself</em><br/>in every room.</h2><p>We believe fragrance is personal. It is the quiet confidence before a big moment, the memory attached to a familiar note, and the invisible signature that makes a presence unforgettable.</p><a href="#collection" className="text-link">MEET YOUR NEXT SIGNATURE <ArrowRight size={16}/></a><span className="manifesto-mark">X.</span></div></section>

      <section className="about-page" id="about"><div className="about-intro"><div className="eyebrow">ABOUT XIOWRICH</div><h2>Fragrance is the<br/><em>art of becoming.</em></h2><p>We created XIOWRICH for the beautifully individual. For the people who know that a scent can change the way a moment feels, and that the most memorable luxury is the one that becomes completely your own.</p></div><div className="about-details"><div className="about-detail-image"><img src="/products/velour-poster.png" alt="XIOWRICH Velour fragrance artwork" loading="lazy"/></div><div className="about-detail-copy"><div><span>01</span><h3>Made personal</h3><p>Every XIOWRICH fragrance is designed as an invitation, never an instruction. Wear it close, layer it freely, and let it meet the version of you that arrives today.</p></div><div><span>02</span><h3>Considered by design</h3><p>From the first note to the final bottle, we choose character over excess. Our fragrances are expressive, wearable and made to stay with you long after the first impression.</p></div><div><span>03</span><h3>For every presence</h3><p>There is no single way to be unforgettable. Our wardrobe moves from quiet confidence to dark romance, giving every mood a signature of its own.</p></div></div></div><div className="about-signoff"><p>“The best fragrance does not enter the room before you.<br/>It makes people remember that you were there.”</p><span>XIOWRICH · PARFUMS DE CARACTÈRE</span></div></section>

      <section className="ritual section-pad" id="ritual"><div className="ritual-top"><div className="eyebrow">THE FRAGRANCE RITUAL</div><h2>Make the everyday <em>extraordinary.</em></h2></div><div className="ritual-grid"><div><span>01</span><h3>Prepare</h3><p>Apply to moisturised skin for a softer, longer-lasting fragrance experience.</p></div><div><span>02</span><h3>Apply</h3><p>Spray on pulse points—wrists, neck, and behind the ears. Let the scent settle naturally.</p></div><div><span>03</span><h3>Remember</h3><p>Give your fragrance a moment to unfold. The best signatures reveal themselves over time.</p></div></div></section>

      <section className="print-gallery section-pad" id="prints"><div className="section-heading"><div><div className="eyebrow">THE XIOWRICH COLLECTION</div><h2>Made to <em>linger.</em></h2></div><p>Explore our collection, page by page.<br/>Discover pieces made to stay with you.</p></div><div className="print-grid">{printPages.map(page=><a className="print-card" href={page.image} target="_blank" rel="noreferrer" key={page.number}><img src={page.image} alt={`XIOWRICH collection print ${page.number}`} loading="lazy"/><span><span>OUR COLLECTION</span><ArrowRight size={15}/></span></a>)}</div><div className="print-actions"><a className="print-download" href="/A4%20Prints.pdf" target="_blank" rel="noreferrer">OPEN OUR COLLECTION <ArrowRight size={15}/></a><a className="print-download contact-link" href="#contact">CONTACT US <ArrowRight size={15}/></a></div></section>

      <section className="newsletter"><div><div className="eyebrow">LET GOOD THINGS LINGER</div><h2>A note from <em>XIOWRICH.</em></h2><p>New launches, scent stories and considered little luxuries.</p></div><form onSubmit={e=>{e.preventDefault();setNotice('Thank you for joining the XIOWRICH list.');setEmail('');setTimeout(()=>setNotice(''),2500)}}><input type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/><button aria-label="Subscribe"><ArrowRight/></button></form></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a className="wordmark footer-logo" href="#">XIOWRICH<span>PARFUMS DE CARACTÈRE</span></a><p>Fragrance for the moments<br/>that make you, you.</p></div><div><h4>EXPLORE</h4><a href="#collection">Shop all</a><a href="/about">About us</a><a href="#ritual">The ritual</a><a href="#prints">Our Collection</a></div><div><h4>CLIENT CARE</h4><a href="/contact">Contact us</a><a href="/shipping">Shipping policy</a><a href="/returns">Returns & refunds</a><a href="/privacy">Privacy & terms</a></div><div><h4>FOLLOW OUR SCENT</h4><a href="https://www.instagram.com/xiowrich/" target="_blank" rel="noreferrer"><Instagram size={16}/> @xiowrich</a></div></div><div className="footer-bottom" id="footer-policy"><span>© 2026 XIOWRICH. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION · INDIA</span><span>PRICES IN INR</span></div></footer>

    {cartOpen && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="cart-drawer"><div className="drawer-head"><div><div className="eyebrow">YOUR SELECTION</div><h2>Shopping bag <span>({cart.reduce((s,i)=>s+i.qty,0)})</span></h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>
      {cart.length===0?<div className="cart-empty"><ShoppingBag size={34}/><h3>Your bag is waiting.</h3><p>Find the scent that feels like you.</p><button className="btn btn-dark" onClick={()=>{setCartOpen(false);scrollShop()}}>EXPLORE FRAGRANCES</button></div>:<>
      <div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><GalleryViewer item={item} className="cart-gallery"/><div className="cart-item-copy"><h3>{item.name}</h3><p>{item.size} · {money(item.price)}</p><div className="qty"><button onClick={()=>changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
      <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><span>{subtotal>=3000?'Complimentary':money(99)}</span></div><p>{subtotal>=3000?'You unlocked complimentary shipping.':`Spend ${money(3000-subtotal)} more for complimentary shipping.`}</p><button className="btn btn-dark full" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>PROCEED TO CHECKOUT <ArrowRight size={16}/></button><small>Taxes and final delivery details are confirmed at checkout.</small></div></>}
    </aside></div>}

    {checkoutOpen && <div className="overlay checkout-overlay"><section className="checkout-modal"><div className="drawer-head"><div><div className="eyebrow">ALMOST YOURS</div><h2>{orderDone?'Order received':'Secure checkout'}</h2></div><button className="icon-btn" onClick={()=>{setCheckoutOpen(false);setOrderDone(false)}}><X/></button></div>
      {orderDone?<div className="success-state"><CheckCircle2 size={46}/><h3>Your order has been placed.</h3><p>Choose your payment option to continue.</p><fieldset className="payment-methods"><legend>PAYMENT METHOD</legend><label className={paymentMethod === 'upi' ? 'selected' : ''}>      <input type="radio" name="completedPaymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={e=>choosePaymentMethod(e.target.value)}/><span>UPI</span><small>Google Pay, PhonePe, Paytm</small></label><label className={paymentMethod === 'razorpay' ? 'selected' : ''}><input type="radio" name="completedPaymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Razorpay</span><small>UPI, cards and net banking</small></label><label className={paymentMethod === 'card' ? 'selected' : ''}><input type="radio" name="completedPaymentMethod" value="card" checked={paymentMethod === 'card'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Card</span><small>Credit or debit card</small></label><label className={paymentMethod === 'cod' ? 'selected' : ''}><input type="radio" name="completedPaymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Cash on Delivery</span><small>Pay when your order arrives</small></label></fieldset><a className="btn btn-dark full" href={`/track-order?order=${encodeURIComponent(orderId)}`} onClick={()=>saveCart([])}>TRACK YOUR ORDER <ArrowRight size={16}/></a></div>:<><div className="checkout-total"><span>Order total (incl. estimated shipping)</span><strong>{money(subtotal+(subtotal>=3000?0:99))}</strong></div><div className="checkout-items">{cart.map(item=><div className="checkout-item" key={item.id}><GalleryViewer item={item} className="checkout-gallery"/><div><h3>{item.name}</h3><p>{item.size} · Qty {item.qty}</p><strong>{money(item.price*item.qty)}</strong></div></div>)}</div><form className="checkout-form" onSubmit={placeOrder}><label>Full name<input required value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Your full name"/></label><div className="form-pair"><label>Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Phone number<input required pattern="[0-9+() -]{8,16}" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="+91"/></label></div><label>Delivery address<textarea required rows="2" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder="House number, street, area"/></label><div className="form-pair"><label>City<input required value={customer.city} onChange={e=>setCustomer({...customer,city:e.target.value})} placeholder="City"/></label><label>PIN code<input required pattern="[0-9]{6}" value={customer.pincode} onChange={e=>setCustomer({...customer,pincode:e.target.value})} placeholder="6-digit PIN"/></label></div><fieldset className="payment-methods"><legend>PAYMENT METHOD</legend><label className={paymentMethod === 'upi' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={e=>setPaymentMethod(e.target.value)}/><span>UPI</span><small>Google Pay, PhonePe, Paytm</small></label><label className={paymentMethod === 'razorpay' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Razorpay</span><small>UPI, cards and net banking</small></label><label className={paymentMethod === 'card' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Card</span><small>Credit or debit card</small></label><label className={paymentMethod === 'cod' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={e=>setPaymentMethod(e.target.value)}/><span>Cash on Delivery</span><small>Pay when your order arrives</small></label></fieldset><button className="btn btn-dark full" type="submit">PLACE ORDER <ArrowRight size={16}/></button></form></>}
    </section></div>}
    {selectedProduct && <div className="overlay product-detail-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedProduct(null) }}><section className="product-detail-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
      <button className="icon-btn product-detail-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X/></button>
      <div className="product-detail-gallery">
        <img className="product-detail-main-image" src={selectedProduct.galleryImages[selectedProductImage]} alt={`${selectedProduct.name} image ${selectedProductImage + 1} of 4`} />
        <div className="product-detail-thumbnails">
          {selectedProduct.galleryImages.map((image, index) => <button key={`${image}-${index}`} className={index === selectedProductImage ? 'active' : ''} onClick={() => setSelectedProductImage(index)} aria-label={`Show image ${index + 1}`}><img src={image} alt="" /></button>)}
        </div>
      </div>
      <div className="product-detail-copy">
        <div className="eyebrow">{selectedProduct.category} · {selectedProduct.size}</div>
        <h2 id="product-detail-title">{selectedProduct.name}</h2>
        <p className="product-detail-price"><del>{money(getPricing(selectedProduct).mrp)}</del> <span>{money(getPricing(selectedProduct).markedPrice)}</span> <strong>{money(getPricing(selectedProduct).finalPrice)}</strong></p>
        <p className="discount-label">{getPricing(selectedProduct).discountPercent}% OFF · Save {money(getPricing(selectedProduct).savings)}</p>
        <p className="product-detail-subtitle">{selectedProduct.subtitle}</p>
        <p className="product-detail-description">{selectedProduct.description}</p>
        <div className="product-detail-notes"><span>NOTES</span>{selectedProduct.notes}</div>
        <div className="product-detail-actions"><button className="btn btn-dark" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null) }}>ADD TO CART <ShoppingBag size={15}/></button><button className="btn btn-light" onClick={() => setSelectedProduct(null)}>CONTINUE SHOPPING</button></div>
      </div>
    </section></div>}
    {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}</div>}
  </div>
}
export default App
