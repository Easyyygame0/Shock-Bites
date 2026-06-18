import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../CartContext';
import { PRODUCTS, CATEGORIES, GRADIENTS, getSelectedVariantPrice } from '../data';
import { Product, VariantOption } from '../types';

function CardVisual({ product }: { product: Product }) {
  const [from, to] = GRADIENTS[product.id % GRADIENTS.length].split(",");
  return (
    <div style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
         className="aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <div className="text-center text-white p-6 relative z-10">
          <div className="font-display text-3xl tracking-wider leading-tight uppercase drop-shadow">{product.name}</div>
          <div className="text-xs font-semibold opacity-70 uppercase tracking-widest mt-1">{product.category}</div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="font-display text-xl tracking-wider leading-tight uppercase text-white drop-shadow">{product.name}</div>
        <div className="text-xs font-semibold opacity-70 uppercase tracking-widest text-white">{product.category}</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: "#eef3e4" }}>
      <div className="absolute top-0 right-0 h-full w-1/2 rounded-bl-[40%] pointer-events-none" style={{ background: "rgba(30,92,46,0.07)" }} />
      <div className="max-w-7xl mx-auto px-4 w-full py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-bold mb-6"
               style={{ background: "rgba(30,92,46,0.08)", borderColor: "rgba(30,92,46,0.2)", color: "#1e5c2e" }}>
            ★ New Items Available Now
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-wider leading-none uppercase mb-6" style={{ color: "#1e5c2e" }}>
            Experience<br />
            <span style={{ color: "#1a3a1a" }}>The Tasty,</span><br />
            Amazing<br />
            <span style={{ color: "#1a3a1a" }}>Variety.</span>
          </h1>
          <p className="text-lg font-semibold mb-8 max-w-md leading-relaxed" style={{ color: "#5a7a4a" }}>
            Bold flavors, fresh ingredients, and unforgettable bites — made for people who refuse to settle for ordinary.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-display tracking-widest text-lg h-14 px-10 rounded-xl text-white shadow-lg hover:opacity-90 transition-all hover:scale-105"
              style={{ background: "#1e5c2e" }}>
              Explore Menu
            </button>
          </div>
        </div>
        <div className="relative hidden md:flex items-center justify-center h-[460px]">
          <div className="absolute right-4 top-4 w-60 h-60 rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden"
               style={{ background: "linear-gradient(135deg,#1e5c2e,#2e7d42)" }}>
            <div className="text-center text-white">
              <div className="font-display text-4xl">BURGER</div>
              <div className="text-sm font-semibold opacity-75">Classic Double Patty</div>
              <div className="mt-2 text-2xl font-black">₱149</div>
            </div>
          </div>
          <div className="absolute left-4 bottom-24 w-44 h-44 rounded-full border-4 border-white shadow-xl flex items-center justify-center"
               style={{ background: "linear-gradient(135deg,#1a6644,#2e8c5a)" }}>
            <div className="text-center text-white">
              <div className="font-display text-2xl">WRAP</div>
              <div className="text-xs font-semibold opacity-75">Grilled Chicken</div>
            </div>
          </div>
          <div className="absolute right-32 bottom-6 w-36 h-36 rounded-full border-4 border-white shadow-xl flex items-center justify-center"
               style={{ background: "linear-gradient(135deg,#3a6a1a,#1e5c2e)" }}>
            <div className="text-center text-white">
              <div className="font-display text-xl">NACHOS</div>
              <div className="text-xs font-semibold opacity-75">Loaded</div>
            </div>
          </div>
          <div className="absolute bottom-20 left-16 flex gap-1 opacity-40">
            {[0,1,2,3,4].map(i => (
              <svg key={i} className="w-4 h-4" fill="none" stroke="#1e5c2e" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OffersStrip() {
  const items = [
    { icon: "🕙", text: "Open Daily 10AM–10PM" },
    { icon: "🛵", text: "Free Delivery Within 5km" },
    { icon: "⭐", text: "4.9 Star Rating" },
    { icon: "📞", text: "Order by Phone or Online" },
  ];
  return (
    <section className="py-4" style={{ background: "#1e5c2e" }}>
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white">
        {items.map(item => (
          <div key={item.text} className="flex items-center gap-2 text-sm font-semibold">
            <span>{item.icon}</span>{item.text}
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  const { cart, addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [variantModal, setVariantModal] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const products = useMemo(() => {
    let r = [...PRODUCTS];
    if (category !== "All") r = r.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "price-asc")  r.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    if (sort === "name-asc")   r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [category, sort, search]);

  return (
    <section id="menu" className="pt-40 pb-24" style={{ background: "#f0f4e8" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-6xl md:text-7xl tracking-wider uppercase mb-2" style={{ color: "#1e5c2e" }}>Our Menu</h2>
          <p className="text-lg font-semibold" style={{ color: "#5a7a4a" }}>Fresh. Bold. Unforgettable.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between mb-10">
          <div className="flex-1 min-w-0">
            <input type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search menu items, flavors, or descriptions..."
              className="w-full px-4 py-3 rounded-2xl border-2 bg-white text-sm font-semibold"
              style={{ borderColor: "rgba(30,92,46,0.25)", color: "#1e5c2e" }} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all border-2"
                  style={category === cat
                    ? { background: "#1e5c2e", color: "#fff", borderColor: "#1e5c2e" }
                    : { background: "#fff", color: "#1e5c2e", borderColor: "rgba(30,92,46,0.25)" }
                  }>
                  {cat}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 font-semibold text-sm bg-white"
              style={{ borderColor: "rgba(30,92,46,0.3)", color: "#1e5c2e" }}>
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-green-200 bg-white p-12 text-center" style={{ color: "#1e5c2e" }}>
            <p className="text-2xl font-display mb-3">No menu items match your search.</p>
            <p className="text-sm font-semibold text-green-700/80">Try a different keyword or adjust your category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => {
              const inCart = cart.some(i => i.product.id === product.id);
              return (
                <div key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 40px rgba(30,92,46,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                  <CardVisual product={product} />
                  <div className="p-5 flex flex-col h-56">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-base leading-snug" style={{ color: "#1a3a1a" }}>{product.name}</h4>
                      <span className="font-black text-lg ml-2 shrink-0" style={{ color: "#1e5c2e" }}>₱{product.price}</span>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "#5a7a4a" }}>{product.description}</p>
                    <button
                      className="mt-auto w-full py-2 rounded-xl font-bold text-sm transition-all"
                      onClick={() => {
                        if (product.variants) { setVariantModal(product); setSelectedVariants({}); }
                        else addToCart(product);
                      }}
                      style={inCart
                        ? { background: "rgba(30,92,46,0.1)", color: "#1e5c2e", border: "2px solid #1e5c2e" }
                        : { background: "#1e5c2e", color: "#fff", border: "2px solid #1e5c2e" }
                      }>
                      {inCart ? "✓ Added to Order" : "Add to Order"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {variantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="font-display text-2xl tracking-wider mb-2" style={{ color: "#1e5c2e" }}>{variantModal.name}</h3>
            <p className="text-sm mb-6" style={{ color: "#5a7a4a" }}>Choose your options:</p>
            {variantModal.variants!.map(variant => (
              <div key={variant.label} className="mb-4">
                <p className="font-bold text-sm mb-2" style={{ color: "#1e5c2e" }}>{variant.label}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(opt => {
                    const optName = typeof opt === "string" ? opt : opt.name;
                    const isSelected = selectedVariants[variant.label] === optName;
                    return (
                      <button key={optName}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.label]: optName }))}
                        className="px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all"
                        style={isSelected
                          ? { background: "#1e5c2e", color: "#fff", borderColor: "#1e5c2e" }
                          : { background: "#fff", color: "#1e5c2e", borderColor: "#1e5c2e" }
                        }>
                        {optName}{typeof opt === "object" ? ` — ₱${(opt as VariantOption).price}` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setVariantModal(null)} className="flex-1 py-2 rounded-xl font-bold text-sm border-2" style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}>Cancel</button>
              <button
                onClick={() => {
                  const allSelected = variantModal.variants!.every(v => selectedVariants[v.label]);
                  if (!allSelected) { alert("Please select all options!"); return; }
                  const finalPrice = getSelectedVariantPrice(variantModal, selectedVariants);
                  addToCart({ ...variantModal, price: finalPrice, selectedVariants });
                  setVariantModal(null);
                }}
                className="flex-1 py-2 rounded-xl font-bold text-sm text-white"
                style={{ background: "#1e5c2e" }}>
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 text-white relative overflow-hidden" style={{ background: "#1e5c2e" }}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
           style={{ background: "#fff", transform: "translate(40%, -40%)" }} />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-sm font-bold mb-6"
                 style={{ background: "rgba(255,255,255,0.1)", color: "#d4f53c" }}>
              ⚡ Our Story
            </div>
            <h2 className="font-display text-6xl md:text-7xl tracking-wider uppercase mb-8 leading-none">
              Born From<br />Bold Flavor.
            </h2>
            <div className="space-y-5 text-white/80 font-semibold text-lg leading-relaxed">
              <p>ShockBites started with one simple idea: food should surprise you. Every bite should spark something — whether it's a laugh, a craving, or just that feeling of "I need another one."</p>
              <p>We source fresh ingredients daily and craft every menu item to hit differently. No fillers, no shortcuts. Just bold, honest food made for people who know what they want.</p>
            </div>
            <p className="font-display text-2xl tracking-wider uppercase mt-8" style={{ color: "#d4f53c" }}>
              Never settle for ordinary.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Menu Items", value: "20+" },
              { label: "Happy Customers", value: "50K+" },
              { label: "Years Serving", value: "5+" },
              { label: "Avg. Rating", value: "4.9 ★" },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-6 text-center border border-white/20 hover:bg-white/10 transition-colors"
                   style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="font-display text-5xl tracking-wider mb-2" style={{ color: "#d4f53c" }}>{stat.value}</div>
                <div className="text-white/70 font-semibold text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const info = [
    { icon: "📍", title: "Location", detail: "123 Shock Street, Manila, PH" },
    { icon: "🕙", title: "Hours",    detail: "Mon–Sun: 10AM – 10PM" },
    { icon: "📞", title: "Phone",    detail: "+63 912 345 6789" },
  ];
  return (
    <section id="contact" className="py-24" style={{ background: "#e8f0e1" }}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-6xl tracking-wider uppercase mb-4" style={{ color: "#1e5c2e" }}>Find Us</h2>
        <p className="text-lg font-semibold mb-12" style={{ color: "#5a7a4a" }}>Come in, or order online — we're always ready.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {info.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-display text-xl tracking-wider mb-1" style={{ color: "#1e5c2e" }}>{item.title}</div>
              <div className="text-sm font-semibold" style={{ color: "#5a7a4a" }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navbar logoSize="h-24" />
      <Hero />
      <OffersStrip />
      <MenuSection />
      <About />
      <Contact />
      <Footer variant="menu" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
