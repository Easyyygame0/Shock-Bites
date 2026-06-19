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
    <div
      style={{ background: `linear-gradient(135deg,${from},${to})` }}
      className="aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden"
    >
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <div className="text-center text-white p-6 relative z-10">
          <div className="font-display text-3xl tracking-wider leading-tight uppercase drop-shadow">{product.name}</div>
          <div className="text-xs font-semibold opacity-70 uppercase tracking-widest mt-1">{product.category}</div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="font-display text-lg sm:text-xl tracking-wider leading-tight uppercase text-white drop-shadow">{product.name}</div>
        <div className="text-xs font-semibold opacity-70 uppercase tracking-widest text-white">{product.category}</div>
      </div>
    </div>
  );
}

function MenuSection() {
  const { cart, addToCart, buyNow } = useCart();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [variantModal, setVariantModal] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [variantIntent, setVariantIntent] = useState<"add" | "buynow">("add");

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
    <section id="menu" className="pt-16 sm:pt-24 md:pt-40 pb-16 sm:pb-24" style={{ background: "#f0f4e8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase mb-2" style={{ color: "#1e5c2e" }}>Our Menu</h2>
          <p className="text-base sm:text-lg font-semibold" style={{ color: "#5a7a4a" }}>Fresh. Bold. Unforgettable.</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-4 mb-8 sm:mb-10">
          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full px-4 py-3 rounded-2xl border-2 bg-white text-sm font-semibold"
            style={{ borderColor: "rgba(30,92,46,0.25)", color: "#1e5c2e" }}
          />

          {/* Categories + sort row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            {/* Horizontally scrollable on mobile */}
            <div className="filter-strip flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border-2 whitespace-nowrap"
                  style={category === cat
                    ? { background: "#1e5c2e", color: "#fff", borderColor: "#1e5c2e" }
                    : { background: "#fff", color: "#1e5c2e", borderColor: "rgba(30,92,46,0.25)" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border-2 font-semibold text-sm bg-white flex-shrink-0"
              style={{ borderColor: "rgba(30,92,46,0.3)", color: "#1e5c2e" }}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-green-200 bg-white p-8 sm:p-12 text-center" style={{ color: "#1e5c2e" }}>
            <p className="text-xl sm:text-2xl font-display mb-3">No menu items match your search.</p>
            <p className="text-sm font-semibold text-green-700/80">Try a different keyword or adjust your category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => {
              const inCart = cart.some(i => i.product.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardVisual product={product} />
                  <div className="p-4 sm:p-5 flex flex-col" style={{ minHeight: '220px' }}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-sm sm:text-base leading-snug" style={{ color: "#1a3a1a" }}>{product.name}</h4>
                      <span className="font-black text-base sm:text-lg ml-2 shrink-0" style={{ color: "#1e5c2e" }}>₱{product.price}</span>
                    </div>
                    <p className="text-xs sm:text-sm mb-4 leading-relaxed flex-1" style={{ color: "#5a7a4a" }}>{product.description}</p>
                    <div className="mt-auto flex gap-2">
                      <button
                        className="flex-1 py-2 rounded-xl font-bold text-sm transition-all text-center"
                        onClick={() => {
                          if (product.variants) { setVariantModal(product); setSelectedVariants({}); setVariantIntent("add"); }
                          else addToCart(product);
                        }}
                        style={inCart
                          ? { background: "rgba(30,92,46,0.1)", color: "#1e5c2e", border: "2px solid #1e5c2e" }
                          : { background: "#1e5c2e", color: "#fff", border: "2px solid #1e5c2e" }
                        }
                      >
                        {inCart ? "✓ Added" : "Add to Cart"}
                      </button>
                      <button
                        className="flex-1 py-2 rounded-xl font-bold text-sm transition-all text-center border-2"
                        onClick={() => {
                          if (product.variants) { setVariantModal(product); setSelectedVariants({}); setVariantIntent("buynow"); }
                          else buyNow(product);
                        }}
                        style={{ borderColor: "#d4a500", background: "#ffc107", color: "#1a3a1a" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#e6ac00")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#ffc107")}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Variant modal */}
      {variantModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-0 sm:pb-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl">
            <h3 className="font-display text-xl sm:text-2xl tracking-wider mb-2" style={{ color: "#1e5c2e" }}>{variantModal.name}</h3>
            <p className="text-sm mb-4 sm:mb-6" style={{ color: "#5a7a4a" }}>Choose your options:</p>
            {variantModal.variants!.map(variant => (
              <div key={variant.label} className="mb-4">
                <p className="font-bold text-sm mb-2" style={{ color: "#1e5c2e" }}>{variant.label}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(opt => {
                    const optName = typeof opt === "string" ? opt : opt.name;
                    const isSelected = selectedVariants[variant.label] === optName;
                    return (
                      <button
                        key={optName}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.label]: optName }))}
                        className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all"
                        style={isSelected
                          ? { background: "#1e5c2e", color: "#fff", borderColor: "#1e5c2e" }
                          : { background: "#fff", color: "#1e5c2e", borderColor: "#1e5c2e" }
                        }
                      >
                        {optName}{typeof opt === "object" ? ` — ₱${(opt as VariantOption).price}` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button onClick={() => setVariantModal(null)} className="flex-1 py-2 sm:py-3 rounded-xl font-bold text-sm border-2" style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}>Cancel</button>
              <button
                onClick={() => {
                  const allSelected = variantModal.variants!.every(v => selectedVariants[v.label]);
                  if (!allSelected) { alert("Please select all options!"); return; }
                  const finalPrice = getSelectedVariantPrice(variantModal, selectedVariants);
                  const finalProduct = { ...variantModal, price: finalPrice, selectedVariants };
                  if (variantIntent === "buynow") buyNow(finalProduct);
                  else addToCart(finalProduct);
                  setVariantModal(null);
                }}
                className="flex-1 py-2 sm:py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: variantIntent === "buynow" ? "#ffc107" : "#1e5c2e", color: variantIntent === "buynow" ? "#1a3a1a" : "#fff" }}
              >
                {variantIntent === "buynow" ? "Buy Now" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navbar logoSize="h-12 sm:h-14" />
      <MenuSection />
      <Footer variant="menu" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
