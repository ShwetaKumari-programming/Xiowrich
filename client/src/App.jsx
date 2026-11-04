import { ArrowRight, CheckCircle2, Instagram, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL, resolveApiAsset } from './api'

const velourGallery = ['/products/velour-bottle.png', '/products/velour-poster.png', '/products/velour-features.png', '/products/velour-gift-set.png']
const darkRomanceGallery = ['/products/dark-romance-bottle.png', '/products/dark-romance-features.png', '/products/dark-romance-notes.png', '/products/dark-romance-gift-set.png']
const oneNightGallery = ['/products/one-night-bottle.png', '/products/one-night-notes.png', '/products/one-night-features.png', '/products/one-night-gift-set.png']
const womenOfCultureGallery = ['/products/women-of-culture-bottle.png', '/products/women-of-culture-notes.png', '/products/women-of-culture-features.png', '/products/one-night-gift-set.png']
const cocoNoirGallery = ['/products/coco-noir-bottle.png', '/products/coco-noir-notes.png', '/products/coco-noir-features.png', '/products/coco-noir-gift-set.png']
const originGallery = ['/products/origin-bottle.png', '/products/origin-poster.png', '/products/origin-features.png', '/products/origin-gift-set.png']
const ladyBossGallery = ['/products/lady-boss-bottle.png', '/products/lady-boss-poster.png', '/products/lady-boss-features.png', '/products/lady-boss-gift-set.png']
const firstKissGallery = ['/products/first-kiss-bottle.png', '/products/first-kiss-poster.png', '/products/first-kiss-features.png', '/products/first-kiss-gift-set.png']
const printPages = Array.from({ length: 8 }, (_, index) => `/a4-prints/page-${String(index + 1).padStart(2, '0')}.jpg`)

const defaultProducts = [
  { id: 'velour', name: 'Velour', subtitle: 'Softness with a signature', category: 'Women', price: 2199, size: '50 ml', image: '/products/velour.jpeg', tone: 'pink', notes: 'Petals · Rose musk · Vanilla', description: 'A soft, modern floral scent with a warm, velvety finish.' },
  { id: 'women-of-culture', name: 'Women of Culture', subtitle: 'Grace, unapologetically', category: 'Women', price: 2299, size: '50 ml', image: '/products/women-of-culture-bottle.png', tone: 'rose', notes: 'Saffron · Jasmine · Amberwood', description: 'A floral signature celebrating individuality, poise and presence.' },
  { id: 'coco-noir', name: 'Coco Noir', subtitle: 'Deep. Warm. Unforgettable.', category: 'Unisex', price: 2699, size: '50 ml', image: '/products/coco-noir-bottle.png', tone: 'brown', notes: 'Milk chocolate · White musk · Cinnamon', description: 'A rich, enveloping scent inspired by the warmth of milk chocolate, white musk and cinnamon.' },
  { id: 'dark-romance', name: 'Dark Romance', subtitle: 'A little mystery, beautifully worn', category: 'Unisex', price: 2499, size: '50 ml', image: '/products/dark-romance-bottle.png', tone: 'brown', notes: 'Bergamot · Iris · Patchouli', description: 'A warm, sensual signature with bright bergamot, elegant iris and deep patchouli.' },
  { id: 'one-night', name: 'One Night', subtitle: 'One night. A lasting impression.', category: 'Unisex', price: 2499, size: '50 ml', image: '/products/one-night-bottle.png', tone: 'brown', notes: 'Bergamot · Marine notes · White musk', description: 'A fresh, captivating fragrance that pairs bright bergamot with marine notes and soft white musk.' },
  { id: 'origin', name: 'XIOWRICH Origin', subtitle: 'Some origins are forever', category: 'Unisex', price: 2499, size: '50 ml', image: '/products/origin-bottle.png', tone: 'brown', notes: 'Amber · Sandalwood · Rose', description: 'A warm, lasting signature with amber, sandalwood and rose.' },
  { id: 'lady-boss', name: 'Lady Boss', subtitle: 'The art of feminine elegance', category: 'Women', price: 2499, size: '50 ml', image: '/products/lady-boss-bottle.png', tone: 'pink', notes: 'Blackcurrant · Freesia · Ambroxan', description: 'A polished feminine fragrance with luminous florals, rich blackcurrant and a confident modern trail.' },
  { id: 'first-kiss', name: 'First Kiss', subtitle: 'A memory in the making', category: 'Unisex', price: 2499, size: '50 ml', image: '/products/first-kiss-bottle.png', tone: 'brown', notes: 'Dubai oud · Turkish rose · Saffron', description: 'A romantic, enveloping fragrance where precious oud meets Turkish rose and luminous saffron.' },
]
defaultProducts.find(product => product.id === 'velour').galleryImages = velourGallery
defaultProducts.find(product => product.id === 'dark-romance').galleryImages = darkRomanceGallery
defaultProducts.find(product => product.id === 'one-night').galleryImages = oneNightGallery
defaultProducts.find(product => product.id === 'women-of-culture').galleryImages = womenOfCultureGallery
defaultProducts.find(product => product.id === 'coco-noir').galleryImages = cocoNoirGallery
defaultProducts.find(product => product.id === 'origin').galleryImages = originGallery
defaultProducts.find(product => product.id === 'lady-boss').galleryImages = ladyBossGallery
defaultProducts.find(product => product.id === 'first-kiss').galleryImages = firstKissGallery
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
const normalizeApiProduct = product => ({
  ...product,
  image: resolveApiAsset(product.image),
  galleryImages: product.galleryImages?.map(resolveApiAsset),
})

function ContactPage() {
  return <section className="contact-page" id="contact">
    <div className="contact-hero"><div className="eyebrow">CONTACT US</div><h1>We’d Love to<br/><em>Hear From You.</em></h1><p>Have a question about our fragrances, an order, or a business collaboration? We’re here to help.</p><a className="btn btn-light" href="mailto:officialxiowrich@gmail.com">EMAIL US <ArrowRight size={16}/></a></div>
    <div className="contact-info-grid"><div className="contact-info-card"><div className="eyebrow">CUSTOMER SUPPORT</div><h2>Here when you<br/><em>need us.</em></h2><a href="mailto:officialxiowrich@gmail.com">Email: officialxiowrich@gmail.com</a><a href="tel:+917618383655">Phone/WhatsApp: +917618383655</a></div><div className="contact-info-card"><div className="eyebrow">BUSINESS ENQUIRIES</div><h2>Let’s create<br/><em>together.</em></h2><p>For wholesale, distribution, and partnerships, contact us at <a href="tel:+917618383655">+917618383655</a></p></div><div className="contact-form-card"><div className="eyebrow">SEND US A MESSAGE</div><h2>We’d love to<br/><em>hear from you.</em></h2><p>Have a question? Fill out our contact form, and we’ll get back to you.</p><form className="contact-form" onSubmit={event => event.preventDefault()}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="Your email" /></label><label>Message<textarea required name="message" rows="4" placeholder="How can we help?" /></label><button className="btn btn-dark" type="submit">SEND MESSAGE <ArrowRight size={16}/></button></form></div><div className="contact-social"><span>FOLLOW US ON INSTAGRAM</span><a href="https://instagram.com/xiowrich" target="_blank" rel="noreferrer">@xiowrich <ArrowRight size={15}/></a></div></div>
    <div className="contact-layout"><aside className="contact-details"><div className="eyebrow">GET IN TOUCH</div><h2>Let’s talk<br/><em>fragrance.</em></h2><a href="mailto:hello@xiowrich.example">hello@xiowrich.example</a><p>For order support, please include your order number and registered contact details.</p><span>RESPONSE TIME<br/><strong>Within 2 business days</strong></span></aside><article className="policy"><div className="policy-heading"><div className="eyebrow">ORDER SUPPORT</div><h2>Return &amp; Refund<br/><em>Policy</em></h2><p><strong>Effective Date: 24 October 2026</strong></p><p>At XIOWRICH, we want every customer to have a smooth and satisfying shopping experience. We take care in preparing and dispatching our fragrances and are committed to helping resolve issues with orders.</p><p>Please read our Return &amp; Refund Policy carefully before placing an order.</p></div><div className="policy-section"><h3><span>01</span> Return Eligibility</h3><p>Due to the personal-care nature of perfumes and fragrances, returns may be restricted for products that have been opened, used, sprayed, or tampered with.</p><p>We may accept a return or replacement request if:</p><ul><li>You received a damaged product.</li><li>You received an incorrect product.</li><li>The product arrived with a manufacturing defect.</li><li>Your order was missing an item.</li><li>The product received materially differs from the product ordered.</li></ul><p>All requests are subject to verification and applicable consumer protection laws.</p></div><div className="policy-section"><h3><span>02</span> Products That Cannot Be Returned</h3><p>For hygiene, safety, and product-integrity reasons, we generally do not accept returns for:</p><ul><li>Perfumes that have been opened or used.</li><li>Products with broken seals or damaged packaging caused after delivery.</li><li>Products damaged due to improper handling or storage after delivery.</li><li>Products returned without the original packaging, where that packaging is necessary to verify or safely process the return.</li></ul><p>These restrictions do not affect any rights you may have under applicable law, including rights relating to defective, damaged, incorrect, or misrepresented products.</p></div><div className="policy-section"><h3><span>03</span> Reporting a Damaged or Incorrect Product</h3><p>If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery.</p><p>To help us investigate your request, please provide:</p><ul><li>Your order number.</li><li>Your registered name and contact details.</li><li>Clear photographs of the product and its packaging.</li><li>A photograph of the shipping label.</li><li>A short description of the issue.</li></ul><p>Please retain the original product and packaging until your request has been resolved. We will review the information and communicate the next steps.</p><p>The 48-hour reporting period helps us investigate shipping-related issues promptly. It does not remove any rights available to customers under applicable law.</p></div><div className="policy-section"><h3><span>04</span> Return and Replacement Process</h3><p>Once your request has been reviewed, we will inform you whether the product qualifies for a return, replacement, repair, or refund, as applicable.</p><p>If a return is approved, we will provide instructions for sending the product back.</p><p>Please do not ship a product to us before receiving return instructions.</p><p>Where the issue is attributable to XIOWRICH or its delivery partner, we will communicate the applicable return or collection arrangements.</p></div><div className="policy-section"><h3><span>05</span> Refund Policy</h3><p>If a refund is approved, it will be processed using the original payment method wherever possible.</p><p>For prepaid orders, the refund will generally be initiated within 5–7 business days after approval, subject to the return process and verification requirements.</p><p>The time taken for the refunded amount to appear in your account may depend on your bank, payment provider, or payment method.</p><p>For cash-on-delivery orders, we may request bank account or other payment details necessary to process the refund securely.</p><p>Any refund will be handled in accordance with applicable law and the circumstances of the order.</p></div><div className="policy-section"><h3><span>06</span> Shipping Charges</h3><p>If a return or replacement is necessary because the product was damaged, defective, incorrect, or otherwise eligible for a remedy attributable to XIOWRICH, we will communicate the applicable return or collection arrangements and shipping charges.</p></div></article></div>
  </section>
}

function App() {
  const [products, setProducts] = useState(() => {
    try {
      return [...defaultProducts, ...JSON.parse(localStorage.getItem('xiowrich-custom-products') || '[]')]
    } catch {
      return defaultProducts
    }
  })
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('xiowrich-cart') || '[]'))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [galleryIndexes, setGalleryIndexes] = useState({})
  const [orderDone, setOrderDone] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [contactPage, setContactPage] = useState(() => window.location.hash === '#contact')
  const [email, setEmail] = useState('')
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', city: '', pincode: '' })
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [paymentStep, setPaymentStep] = useState(false)
  const [pendingOrderPayload, setPendingOrderPayload] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductImage, setSelectedProductImage] = useState(0)
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [productImagePreview, setProductImagePreview] = useState('')
  const [productImageError, setProductImageError] = useState('')

  const handleProductImage = event => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setProductImageError('Please choose an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setProductImageError('Image must be smaller than 5 MB.')
      return
    }
    setProductImageError('')
    const reader = new FileReader()
    reader.onload = () => setProductImagePreview(String(reader.result))
    reader.onerror = () => setProductImageError('Could not read that image. Please try another file.')
    reader.readAsDataURL(file)
  }

  const addProduct = event => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!productImagePreview) {
      setProductImageError('Choose a product image before saving.')
      return
    }
    const name = String(form.get('name') || '').trim()
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`
    const product = {
      id,
      name,
      subtitle: String(form.get('subtitle') || '').trim(),
      category: String(form.get('category') || 'Unisex'),
      price: Number(form.get('price')),
      size: String(form.get('size') || '').trim(),
      image: productImagePreview,
      tone: 'brown',
      notes: String(form.get('notes') || '').trim(),
      description: String(form.get('description') || '').trim(),
    }
    const customProducts = [...products.filter(item => item.custom), { ...product, custom: true }]
    setProducts([...defaultProducts, ...customProducts])
    localStorage.setItem('xiowrich-custom-products', JSON.stringify(customProducts))
    setAddProductOpen(false)
    setProductImagePreview('')
    setProductImageError('')
    event.currentTarget.reset()
    setNotice(`${product.name} added to the collection`)
    setTimeout(() => setNotice(''), 2400)
  }

  useEffect(() => {
    let active = true
    async function loadProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`)
        if (!response.ok) throw new Error('The product catalog could not be loaded.')
        const backendProducts = await response.json()
        if (!Array.isArray(backendProducts)) throw new Error('The product catalog response was invalid.')
        if (active) {
          const customProducts = JSON.parse(localStorage.getItem('xiowrich-custom-products') || '[]')
          setProducts([...backendProducts.map(normalizeApiProduct), ...customProducts])
        }
      } catch (error) {
        if (active) {
          setNotice(error.message || 'The product catalog could not be loaded.')
          setTimeout(() => setNotice(''), 3500)
        }
      }
    }
    loadProducts()
    return () => { active = false }
  }, [])

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
  const productGallery = product => {
    const gallery = product.galleryImages?.length ? [...product.galleryImages] : [product.image]
    products.filter(item => item.id !== product.id && item.category === product.category).forEach(item => {
      if (gallery.length < 4 && !gallery.includes(item.image)) gallery.push(item.image)
    })
    return gallery.slice(0, 4)
  }
  const openProduct = product => {
    setSelectedProduct(product)
    setSelectedProductImage(0)
  }
  const buyNow = product => {
    const found = cart.find(item => item.id === product.id)
    saveCart(found ? cart.map(item => item.id === product.id ? { ...item, ...product, qty: item.qty + 1 } : item) : [...cart, { ...product, qty: 1 }])
    setSelectedProduct(null)
    setCheckoutOpen(true)
  }
  const changeQty = (id, amount) => saveCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0))
  const moveGallery = (id, images, direction) => setGalleryIndexes(current => ({ ...current, [id]: ((current[id] || 0) + direction + images.length) % images.length }))
  const GalleryViewer = ({ item, className = '' }) => {
    const images = productGallery(item)
    const index = galleryIndexes[item.id] || 0
    return <div className={`item-gallery ${className}`}>
      <img src={images[index]} alt={`${item.name} image ${index + 1} of ${images.length}`} />
      {images.length > 1 && <div className="gallery-controls"><button type="button" onClick={() => moveGallery(item.id, images, -1)} aria-label={`Previous ${item.name} image`}><ArrowRight className="gallery-previous" size={15}/></button><span>{index + 1} / {images.length}</span><button type="button" onClick={() => moveGallery(item.id, images, 1)} aria-label={`Next ${item.name} image`}><ArrowRight size={15}/></button></div>}
    </div>
  }
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const filtered = useMemo(() => products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.notes} ${p.category}`.toLowerCase().includes(search.toLowerCase())), [category, search])

  function beginPayment(e) {
    e.preventDefault()
    const payload = { customer, email, paymentMethod, items: cart.map(({ id, name, price, qty }) => ({ productId: id, name, price, quantity: qty })), subtotal, shipping: subtotal >= 3000 ? 0 : 99, total: subtotal + (subtotal >= 3000 ? 0 : 99) }
    setPendingOrderPayload(payload)
    setPaymentStep(true)
  }

  async function placeOrder() {
    if (!pendingOrderPayload) return
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...pendingOrderPayload, paymentMethod }) })
      if (response.ok) {
        const orderResult = await response.json()
        setPlacedOrderId(orderResult.orderId)
        setOrderDone(true)
        setPaymentStep(false)
        setPendingOrderPayload(null)
        saveCart([])
      } else {
        const errorBody = await response.json().catch(() => ({}))
        setNotice(errorBody.error || 'Could not create your order. Please try again.')
        setTimeout(() => setNotice(''), 3500)
      }
    } catch {
      setNotice('We could not reach checkout. Please check that the store server is running and try again.')
      setTimeout(() => setNotice(''), 3500)
    }
  }

  const scrollShop = () => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  return <div className="site-shell"><style>{`.contact-page .contact-hero{display:none}.contact-page .contact-info-grid{padding-top:55px}.contact-page .contact-info-card,.contact-page .contact-form-card,.contact-page .contact-social{display:none}.hero-visual{margin-top:0!important}`}</style>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER ₹3,000 <span>✦</span> DISCOVER YOUR SIGNATURE</div>
    <header className="header">
      <button className="icon-btn mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={`nav-left ${mobileMenu ? 'nav-open' : ''}`}><a href="#collection" onClick={() => setMobileMenu(false)}>SHOP ALL</a><Link to="/about" onClick={() => setMobileMenu(false)}>ABOUT</Link><a href="#ritual" onClick={() => setMobileMenu(false)}>THE RITUAL</a><a href="#prints" onClick={() => setMobileMenu(false)}>A4 PRINTS</a></nav>
      <a className="wordmark" href="#" aria-label="XIOWRICH home">XIOWRICH<span>PARFUMS DE CARACTÈRE</span></a>
      <div className="header-actions"><button className="add-product-trigger" onClick={() => setAddProductOpen(true)}>ADD PRODUCT</button><button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button><button className="bag-btn" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19}/><span>CART ({cart.reduce((s,i)=>s+i.qty,0)})</span></button></div>
    </header>
    {searchOpen && <div className="search-strip"><Search size={18}/><input autoFocus placeholder="Search fragrances, notes, moods..." value={search} onChange={e=>{setSearch(e.target.value);scrollShop()}}/><button className="icon-btn" onClick={()=>{setSearchOpen(false);setSearch('')}}><X size={18}/></button></div>}

    <main className={contactPage ? 'contact-route' : ''}>
      {contactPage && <ContactPage />}
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
          {products.map((perfume) => (
            <div className="perfume-card" key={perfume.id}>
              <button className="perfume-card-image" type="button" onClick={() => openProduct(perfume)} aria-label={`View ${perfume.name}`}>
                <img src={perfume.image} alt={perfume.name} loading="lazy" />
              </button>
              <button className="btn btn-dark collection-add" onClick={() => addToCart(perfume)}>ADD TO CART <ShoppingBag size={15}/></button>
            </div>
          ))}
        </div>
      </section>

      <section className="manifesto" id="story"><div className="manifesto-image"><img src="/products/women-of-culture.jpeg" alt="Women of Culture fragrance surrounded by white flowers"/></div><div className="manifesto-copy"><div className="eyebrow">MORE THAN A FRAGRANCE</div><h2>Leave a little<br/><em>of yourself</em><br/>in every room.</h2><p>We believe fragrance is personal. It is the quiet confidence before a big moment, the memory attached to a familiar note, and the invisible signature that makes a presence unforgettable.</p><a href="#collection" className="text-link">MEET YOUR NEXT SIGNATURE <ArrowRight size={16}/></a><span className="manifesto-mark">X.</span></div></section>

      <section className="ritual section-pad" id="ritual"><div className="ritual-top"><div className="eyebrow">THE FRAGRANCE RITUAL</div><h2>Make the everyday <em>extraordinary.</em></h2></div><div className="ritual-grid"><div><span>01</span><h3>Prepare</h3><p>Apply to moisturised skin for a softer, longer-lasting fragrance experience.</p></div><div><span>02</span><h3>Apply</h3><p>Spray on pulse points—wrists, neck, and behind the ears. Let the scent settle naturally.</p></div><div><span>03</span><h3>Remember</h3><p>Give your fragrance a moment to unfold. The best signatures reveal themselves over time.</p></div></div></section>

      <section className="print-gallery section-pad" id="prints"><div className="collection-heading"><p className="eyebrow">THE XIOWRICH PRINT EDIT</p><h2>Explore the <em>collection.</em></h2><p>Browse the complete print collection.</p></div><div className="print-grid">{printPages.map((page, index) => <a className="print-card" href={page} target="_blank" rel="noreferrer" key={page}><img src={page} alt={`XIOWRICH print page ${index + 1}`} /><span>PAGE {String(index + 1).padStart(2, '0')} <ArrowRight size={14}/></span></a>)}</div></section>

      <section className="newsletter"><div><div className="eyebrow">LET GOOD THINGS LINGER</div><h2>A note from <em>XIOWRICH.</em></h2><p>New launches, scent stories and considered little luxuries.</p></div><form onSubmit={e=>{e.preventDefault();setNotice('Thank you for joining the XIOWRICH list.');setEmail('');setTimeout(()=>setNotice(''),2500)}}><input type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/><button aria-label="Subscribe"><ArrowRight/></button></form></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a className="wordmark footer-logo" href="#">XIOWRICH<span>PARFUMS DE CARACTÈRE</span></a><p>Fragrance for the moments<br/>that make you, you.</p></div><div><h4>EXPLORE</h4><a href="#collection">Shop all</a><a href="/about">About us</a><a href="#ritual">The ritual</a></div><div><h4>CLIENT CARE</h4><a href="/contact">Contact us</a><a href="/returns">Shipping & returns</a><a href="/privacy">Privacy & terms</a></div><div><h4>FOLLOW OUR SCENT</h4><a href="#social"><Instagram size={16}/> Instagram</a><p className="small-note">Replace this demo link with your official social profile.</p></div></div><div className="footer-bottom" id="footer-policy"><span>© 2026 XIOWRICH. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION · INDIA</span><span>PRICES IN INR</span></div></footer>

    {selectedProduct && <div className="overlay product-detail-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedProduct(null) }}><section className="product-detail-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title"><button className="icon-btn product-detail-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X/></button><div className="product-detail-gallery"><img className="product-detail-main-image" src={productGallery(selectedProduct)[selectedProductImage]} alt={`${selectedProduct.name} product view ${selectedProductImage + 1}`} /><div className="product-detail-thumbnails">{productGallery(selectedProduct).map((image, index) => <button type="button" className={index === selectedProductImage ? 'active' : ''} key={`${image}-${index}`} onClick={() => setSelectedProductImage(index)}><img src={image} alt={`${selectedProduct.name} thumbnail ${index + 1}`} /></button>)}</div></div><div className="product-detail-copy"><p className="eyebrow">{selectedProduct.category} · {selectedProduct.size}</p><h2 id="product-detail-title">{selectedProduct.name}</h2><strong className="product-detail-price">{money(selectedProduct.price)}</strong><p className="product-detail-subtitle">{selectedProduct.subtitle}</p><p className="product-detail-description">{selectedProduct.description}</p><p className="product-detail-notes"><span>NOTES</span>{selectedProduct.notes}</p><div className="product-detail-actions"><button className="btn btn-light" type="button" onClick={() => addToCart(selectedProduct)}>ADD TO CART <ShoppingBag size={15}/></button><button className="btn btn-dark" type="button" onClick={() => buyNow(selectedProduct)}>BUY NOW <ArrowRight size={16}/></button></div></div></section></div>}

    {addProductOpen && <div className="overlay" onMouseDown={event => { if (event.target === event.currentTarget) setAddProductOpen(false) }}><section className="add-product-modal" role="dialog" aria-modal="true" aria-labelledby="add-product-title"><div className="drawer-head"><div><div className="eyebrow">YOUR COLLECTION</div><h2 id="add-product-title">Add a product</h2></div><button className="icon-btn" type="button" onClick={() => setAddProductOpen(false)} aria-label="Close add product form"><X/></button></div><form className="add-product-form" onSubmit={addProduct}>
      <label>Product image<input type="file" accept="image/*" onChange={handleProductImage} required /></label>
      {productImagePreview && <img className="product-upload-preview" src={productImagePreview} alt="Selected product preview" />}
      {productImageError && <p className="form-error" role="alert">{productImageError}</p>}
      <div className="form-pair"><label>Product name<input name="name" required placeholder="e.g. Amber Veil" /></label><label>Category<select name="category" defaultValue="Unisex"><option>Unisex</option><option>Women</option><option>Men</option></select></label></div>
      <div className="form-pair"><label>Price (INR)<input name="price" type="number" min="1" step="1" required placeholder="2499" /></label><label>Size<input name="size" required placeholder="50 ml" /></label></div>
      <label>Subtitle<input name="subtitle" required placeholder="A signature worth remembering" /></label>
      <label>Notes<input name="notes" placeholder="Amber · Woods · Musk" /></label>
      <label>Description<textarea name="description" rows="3" placeholder="Tell customers about this fragrance." /></label>
      <button className="btn btn-dark full" type="submit">SAVE PRODUCT <ArrowRight size={16}/></button>
    </form></section></div>}

    {cartOpen && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="cart-drawer"><div className="drawer-head"><div><div className="eyebrow">YOUR SELECTION</div><h2>Shopping bag <span>({cart.reduce((s,i)=>s+i.qty,0)})</span></h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>
      {cart.length===0?<div className="cart-empty"><ShoppingBag size={34}/><h3>Your bag is waiting.</h3><p>Find the scent that feels like you.</p><button className="btn btn-dark" onClick={()=>{setCartOpen(false);scrollShop()}}>EXPLORE FRAGRANCES</button></div>:<>
      <div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><GalleryViewer item={item} className="cart-gallery"/><div className="cart-item-copy"><h3>{item.name}</h3><p>{item.size} · {money(item.price)}</p><div className="qty"><button onClick={()=>changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
      <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><span>{subtotal>=3000?'Complimentary':money(99)}</span></div><p>{subtotal>=3000?'You unlocked complimentary shipping.':`Spend ${money(3000-subtotal)} more for complimentary shipping.`}</p><button className="btn btn-dark full" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>PROCEED TO CHECKOUT <ArrowRight size={16}/></button><small>Taxes and final delivery details are confirmed at checkout.</small></div></>}
    </aside></div>}

    {checkoutOpen && <div className="overlay checkout-overlay"><section className="checkout-modal"><div className="drawer-head"><div><div className="eyebrow">ALMOST YOURS</div><h2>{orderDone?'Order received':'Secure checkout'}</h2></div><button className="icon-btn" onClick={()=>{setCheckoutOpen(false);setOrderDone(false)}}><X/></button></div>
      {orderDone?<div className="success-state"><CheckCircle2 size={46}/><h3>Thank you for choosing XIOWRICH.</h3><p>Your order has been recorded with <strong>{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit / Debit / ATM Card' : paymentMethod === 'phonepe' ? 'PhonePe' : paymentMethod === 'razorpay' ? 'Razorpay' : 'UPI'}.</strong></p><p className="order-id">Order ID: <strong>{placedOrderId}</strong></p><a className="btn btn-dark" href={`/track-order?order=${encodeURIComponent(placedOrderId)}`}>TRACK YOUR ORDER <ArrowRight size={16}/></a><button className="btn btn-light" onClick={()=>{setCheckoutOpen(false);setOrderDone(false)}}>CONTINUE EXPLORING</button></div>:<><div className="checkout-total"><span>Order total (incl. estimated shipping)</span><strong>{money(subtotal+(subtotal>=3000?0:99))}</strong></div><div className="checkout-items">{cart.map(item=><div className="checkout-item" key={item.id}><GalleryViewer item={item} className="checkout-gallery"/><div><h3>{item.name}</h3><p>{item.size} · Qty {item.qty}</p><strong>{money(item.price*item.qty)}</strong></div></div>)}</div>{paymentStep?<section className="payment-step"><div className="payment-step-heading"><div className="eyebrow">SECURE PAYMENT</div><h3>Choose how you&rsquo;d like to pay.</h3><p>Your order details are ready. Select a payment method to place your order.</p></div><fieldset className="payment-options"><legend>Payment method</legend><label className={paymentMethod === 'upi' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={e=>setPaymentMethod(e.target.value)}/><span><strong>UPI</strong><small>Google Pay, BHIM and other UPI apps</small></span></label><label className={paymentMethod === 'phonepe' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={e=>setPaymentMethod(e.target.value)}/><span><strong>PhonePe</strong><small>Pay securely with PhonePe</small></span></label><label className={paymentMethod === 'razorpay' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={e=>setPaymentMethod(e.target.value)}/><span><strong>Razorpay</strong><small>UPI, wallets and net banking</small></span></label><label className={paymentMethod === 'card' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={e=>setPaymentMethod(e.target.value)}/><span><strong>Credit / Debit / ATM Card</strong><small>Visa, Mastercard and RuPay</small></span></label><label className={paymentMethod === 'cod' ? 'selected' : ''}><input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={e=>setPaymentMethod(e.target.value)}/><span><strong>Cash on Delivery</strong><small>Pay when your fragrance arrives</small></span></label></fieldset><div className="demo-notice">{paymentMethod === 'cod' ? 'Cash on Delivery selected. You will pay the delivery partner when your order arrives.' : ''}</div><div className="payment-step-actions"><button className="btn btn-light" type="button" onClick={()=>setPaymentStep(false)}>BACK TO DETAILS</button><button className="btn btn-dark" type="button" onClick={placeOrder}>{paymentMethod === 'cod' ? 'PLACE COD ORDER' : 'PLACE ORDER'} <ArrowRight size={16}/></button></div></section>:<form className="checkout-form" onSubmit={beginPayment}><label>Full name<input required value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Your full name"/></label><div className="form-pair"><label>Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Phone number<input required pattern="[0-9+() -]{8,16}" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="+91"/></label></div><label>Delivery address<textarea required rows="2" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder="House number, street, area"/></label>      <div className="form-pair"><label>City<input required value={customer.city} onChange={e=>setCustomer({...customer,city:e.target.value})} placeholder="City"/></label><label>PIN code<input required pattern="[0-9]{6}" value={customer.pincode} onChange={e=>setCustomer({...customer,pincode:e.target.value})} placeholder="6-digit PIN"/></label></div><div className="demo-notice">After your details are saved, you&rsquo;ll choose UPI, PhonePe, Razorpay, card, or Cash on Delivery.</div><button className="btn btn-dark full" type="submit">CONTINUE TO PAYMENT <ArrowRight size={16}/></button></form>}</>}
    </section></div>}
    {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}</div>}
  </div>
}
export default App
