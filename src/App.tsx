import { useState } from 'react'
import { Coffee, Search, Menu as MenuIcon, X, Heart, Instagram, Facebook, Youtube, ShoppingBag, Check } from 'lucide-react'

type Category = { name: string; image: string }
type Shake = { name: string; price: number; color: string; likes: number; image: string }
type Blog = { title: string; image: string; date: string; excerpt: string }

const categories: Category[] = [
  { name: 'Coffee Mocha', image: 'photo-1570968915860-54d5c301fa9f' },
  { name: 'Espresso Americano', image: 'photo-1510707577719-ae7c14805e3a' },
  { name: 'Cappuccino', image: 'photo-1572442388796-11668a67e53d' },
]
const shakes: Shake[] = [
  { name: 'Mocha Shake', price: 20, color: '#8aa66c', likes: 30, image: 'photo-1572490122747-3968b75cc699' },
  { name: 'Lavender Shake', price: 20, color: '#b4a0df', likes: 30, image: 'photo-1501446529957-6226bd447c46' },
  { name: 'Caramel Shake', price: 20, color: '#b77b50', likes: 30, image: 'photo-1563805042-7684c019e1cb' },
  { name: 'Vanilla Shake', price: 20, color: '#d8c5a4', likes: 24, image: 'photo-1577805947697-89e18249d767' },
]
const blogs: Blog[] = [
  { title: 'Coffee Connoisseur', image: 'photo-1495474472287-4d71bcdd2085', date: '12 June 2024', excerpt: 'The little rituals that make a morning cup memorable, from choosing your beans to finding the perfect pour.' },
  { title: 'Coffee Connoisseur', image: 'photo-1445116572660-236099ec97a0', date: '08 June 2024', excerpt: 'A closer look at the people, places and small details behind your favourite neighbourhood coffee shop.' },
  { title: 'Coffee Connoisseur', image: 'photo-1442512595331-e89e73853f31', date: '02 June 2024', excerpt: 'Slow down, sip something lovely, and discover a few ways to make your next coffee break special.' },
]
const photo = (id: string, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Brand() {
  return <a className="brand" href="#home" aria-label="Coffee Solutions home">
    <span className="brand-mark"><Coffee size={25} strokeWidth={1.3} /></span>
    <span className="brand-name">Coffee solutions</span>
  </a>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const links = ['Home', 'Menu', 'Blog', 'Media', 'Contact']
  return <header className="site-header" id="home">
    <Brand />
    <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
      {menuOpen ? <X size={19} /> : <MenuIcon size={19} />}
    </button>
    <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
      {links.map(link => <a key={link} href={link === 'Home' ? '#home' : link === 'Menu' ? '#categories' : link === 'Blog' ? '#blogs' : link === 'Media' ? '#shakes' : '#footer'} onClick={() => setMenuOpen(false)}>{link}</a>)}
    </nav>
    <button className="icon-button search-toggle" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={19} /></button>
    {searchOpen && <form className="search-panel" onSubmit={e => { e.preventDefault(); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); setSearchOpen(false) }}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coffee and shakes…" autoFocus />
      <button type="submit" aria-label="Submit search"><Search size={17} /></button>
    </form>}
  </header>
}

function Hero() {
  return <section className="hero" aria-label="Freshly roasted coffee">
    <div className="hero-copy">
      <span className="eyebrow">Freshly roasted</span>
      <h1>COFFEE</h1>
      <a className="pill-button" href="#categories">Shop now</a>
    </div>
    <div className="hero-photo" role="img" aria-label="Fresh coffee beans and a cup of espresso" />
  </section>
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="section-heading">
    <h2>{title}</h2>
    <p>{subtitle}</p>
  </div>
}

function Categories() {
  return <section className="section categories" id="categories">
    <SectionHeading title="TOP CATEGORIES" subtitle="Explore The Recent Most Bought Drinks This Week" />
    <div className="category-grid">
      {categories.map(item => <a className="category-card" href="#shakes" key={item.name} style={{ backgroundImage: `linear-gradient(0deg, rgba(20,17,16,.68), rgba(20,17,16,.05)), url("${photo(item.image, 650)}")` }}>
        <span className="category-name">{item.name}</span><span className="view-more">View More <span aria-hidden="true">→</span></span>
      </a>)}
    </div>
  </section>
}

function ShakeCard({ shake, onAdd, added }: { shake: Shake; onAdd: (name: string) => void; added: boolean }) {
  return <article className="shake-card">
    <div className="likes"><Heart size={11} fill="currentColor" /> {shake.likes} likes</div>
    <img className="shake-image" src={photo(shake.image, 300)} alt={shake.name} loading="lazy" />
    <h3>{shake.name}</h3>
    <div className="shake-bottom"><span className="price">${shake.price.toFixed(2)}</span>
      <button className={added ? 'buy-button added' : 'buy-button'} onClick={() => onAdd(shake.name)}>{added ? <><Check size={11} /> Added</> : 'Buy now'}</button>
    </div>
  </article>
}

function Milkshakes() {
  const [cart, setCart] = useState<string[]>([])
  const cartCount = cart.length
  const add = (name: string) => setCart(old => [...old, name])
  return <section className="section shakes-section" id="shakes">
    <SectionHeading title="TOP MILK SHAKES" subtitle="Explore The Recent Most Bought Shakes This Week" />
    <div className="shake-track">
      {shakes.map((shake, i) => <ShakeCard key={`${shake.name}-${i}`} shake={shake} onAdd={add} added={cart.includes(shake.name)} />)}
    </div>
    {cartCount > 0 && <div className="cart-notice"><ShoppingBag size={15} /> {cartCount} {cartCount === 1 ? 'shake' : 'shakes'} added to your bag <button onClick={() => setCart([])}>Clear</button></div>}
  </section>
}

function BlogCard({ blog }: { blog: Blog }) {
  const [expanded, setExpanded] = useState(false)
  return <article className="blog-card">
    <img src={photo(blog.image, 500)} alt="Coffee shop moment" loading="lazy" />
    <div className="blog-content"><h3>{blog.title}</h3><p>{blog.excerpt}{expanded && ' Great coffee is less about rushing and more about enjoying each step along the way.'}</p>
      <span className="blog-date">{blog.date}</span>
      <button className="read-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'READ LESS' : 'READ MORE'}</button>
    </div>
  </article>
}

function Blogs() {
  return <section className="section blogs-section" id="blogs">
    <SectionHeading title="LATEST BLOGS" subtitle="Explore The Recent Most Bought Shakes This Week" />
    <div className="blog-grid">{blogs.map((blog, i) => <BlogCard key={`${blog.title}-${i}`} blog={blog} />)}</div>
  </section>
}

function Footer() {
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  return <footer className="footer" id="footer">
    <div className="footer-columns">
      <div><h3>Products</h3><a href="#categories">Shoes</a></div>
      <div><h3>Category</h3><a href="#categories">Men</a><a href="#categories">New In</a><a href="#categories">Weekly Pick</a></div>
      <div><h3>Company Info</h3><a href="#footer">About us</a><a href="#footer">Contact us</a><a href="#footer">Payment Options</a><a href="#footer">Track Order</a><a href="#footer">Support</a><a href="#footer">Vouchers</a><a href="#footer">Size Charts</a></div>
      <div className="social-column"><h3>Follow us</h3><div className="socials">
        <a href="https://instagram.com" aria-label="Instagram"><Instagram size={15} /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook size={15} /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube size={15} /></a>
      </div></div>
    </div>
    <form className="footer-subscribe" onSubmit={e => { e.preventDefault(); if (email.trim()) setSaved(true) }}>
      <label htmlFor="footer-email">Get coffee news</label><input id="footer-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setSaved(false) }} placeholder="Your email address" required />
      <button type="submit">{saved ? 'Subscribed ✓' : 'Subscribe'}</button>
    </form>
    <div className="legal-bar">{['Data settings', 'Cookie settings', 'Privacy Policy', 'Terms And Conditions', 'Imprint'].map(item => <a href="#footer" key={item}>{item}</a>)}</div>
  </footer>
}

export default function App() {
  return <div className="page-shell">
    <Header />
    <main><Hero /><div className="content-surface"><Categories /><Milkshakes /><Blogs /></div></main>
    <Footer />
  </div>
}