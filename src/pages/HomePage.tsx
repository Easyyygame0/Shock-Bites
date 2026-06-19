import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "#1e5c2e" }}
    >
      {/* Subtle pattern dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #d4f53c 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-5 sm:mb-7"
              style={{ background: "rgba(212,245,60,0.15)", color: "#d4f53c", border: "1px solid rgba(212,245,60,0.35)" }}
            >
              ★ New Items Available Now
            </div>

            <h1
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-none uppercase mb-5 sm:mb-7 text-white"
            >
              Bold.<br />
              <span style={{ color: "#d4f53c" }}>Fresh.</span><br />
              Unforgettable.
            </h1>

            <p className="text-base sm:text-lg font-semibold mb-8 max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Filipino snack flavors reimagined. Every bite surprises — made for people who refuse to settle for ordinary.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/menu')}
                className="font-display tracking-widest text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                style={{ background: "#d4f53c", color: "#1a3a1a" }}
              >
                Explore Menu
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-display tracking-widest text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl border-2 transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
              >
                Our Story
              </button>
            </div>
          </div>

          {/* Right: stacked food images */}
          <div className="relative flex justify-center items-center h-72 sm:h-96 md:h-[480px]">
            {/* Back card */}
            <div
              className="absolute top-0 right-0 md:right-4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-3xl overflow-hidden shadow-2xl rotate-6"
              style={{ border: "3px solid rgba(255,255,255,0.2)" }}
            >
              <img src="Images/Shawarma.png" alt="Shawarma" className="w-full h-full object-cover" />
            </div>
            {/* Front card */}
            <div
              className="absolute bottom-0 left-0 md:left-4 w-52 sm:w-64 md:w-72 h-52 sm:h-64 md:h-72 rounded-3xl overflow-hidden shadow-2xl -rotate-3 z-10"
              style={{ border: "3px solid rgba(212,245,60,0.5)" }}
            >
              <img src="Images/Burger.png" alt="Burger" className="w-full h-full object-cover" />
            </div>
            {/* Accent badge */}
            <div
              className="absolute bottom-4 right-0 md:right-2 z-20 px-4 py-3 rounded-2xl shadow-xl font-display tracking-wider text-sm sm:text-base"
              style={{ background: "#d4f53c", color: "#1a3a1a" }}
            >
              ₱89 – ₱199
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" style={{ display: 'block' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#eef3e4" />
        </svg>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { value: "20+", label: "Menu Items" },
    { value: "4.9★", label: "Avg Rating" },
    { value: "5+", label: "Years Serving" },
    { value: "50K+", label: "Happy Customers" },
  ];
  return (
    <section className="py-10 sm:py-14" style={{ background: "#eef3e4" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(s => (
            <div
              key={s.label}
              className="rounded-2xl p-5 sm:p-6 text-center border-2"
              style={{ background: "#fff", borderColor: "#d4f53c" }}
            >
              <div className="font-display text-3xl sm:text-4xl tracking-wider mb-1" style={{ color: "#1e5c2e" }}>{s.value}</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest" style={{ color: "#5a7a4a" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const navigate = useNavigate();
  const items = [
    { name: "Cheesy Togchomp", tag: "Best Seller", price: "₱109", img: "Images/Burger.png" },
    { name: "Togueth Wrap",    tag: "Fan Fave",   price: "₱89",  img: "Images/Togueth-wrap.png" },
    { name: "Sproutarma",      tag: "New",         price: "₱109", img: "Images/Shawarma.png" },
  ];
  return (
    <section className="py-14 sm:py-20" style={{ background: "#eef3e4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#5a7a4a" }}>— Our Picks</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider uppercase leading-none" style={{ color: "#1e5c2e" }}>
              Must Try
            </h2>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="hidden sm:flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl border-2 transition-all hover:bg-green-50"
            style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}
          >
            Full Menu →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
              style={{ background: "#fff", border: "2px solid transparent" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#d4f53c")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
            >
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                  style={{ background: "#d4f53c", color: "#1a3a1a" }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl tracking-wider uppercase leading-tight" style={{ color: "#1a3a1a" }}>{item.name}</h3>
                  <p className="text-sm font-bold mt-1" style={{ color: "#1e5c2e" }}>{item.price}</p>
                </div>
                <button
                  onClick={() => navigate('/menu')}
                  className="rounded-xl px-4 py-2 font-bold text-sm transition-all hover:scale-105"
                  style={{ background: "#1e5c2e", color: "#fff" }}
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/menu')}
          className="sm:hidden mt-6 w-full font-bold text-sm py-3 rounded-xl border-2 transition-all"
          style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}
        >
          See Full Menu →
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "#1e5c2e" }}>
      {/* Top wave from previous section */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" style={{ display: 'block' }}>
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 L0,0 Z" fill="#eef3e4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-6 sm:pt-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-5 sm:mb-6 border"
              style={{ background: "rgba(212,245,60,0.12)", borderColor: "rgba(212,245,60,0.3)", color: "#d4f53c" }}
            >
              ⚡ Our Story
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase mb-6 leading-none text-white">
              Born From<br />Bold Flavor.
            </h2>
            <div className="space-y-4 font-semibold text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              <p>Shock Bites is a snack-focused food business that delivers bold, innovative flavors designed to surprise consumers with every bite — through the combination of traditional and innovative tastes, textures, and visual elements.</p>
              <p>We target students and young professionals who seek affordable, convenient, and exciting food options beyond typical street snacks.</p>
            </div>
            <p className="font-display text-xl sm:text-2xl tracking-wider uppercase mt-7" style={{ color: "#d4f53c" }}>
              Never settle for ordinary.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "3px solid rgba(212,245,60,0.3)" }}>
            <video
              className="w-full"
              controls autoPlay muted loop
              style={{ display: 'block', maxHeight: '420px', objectFit: 'cover' }}
            >
              <source src="SHOCKBITES.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Bottom wave into contact */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14" style={{ display: 'block' }}>
          <path d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" fill="#e8f0e1" />
        </svg>
      </div>
    </section>
  );
}

function Contact() {
  const info = [
    {
      icon: "📍",
      title: "Location",
      detail: (
        <a
          href="https://maps.google.com/?q=72+G.+Marcelo+Street+Barangay+Maysan+Valenzuela+City"
          target="_blank" rel="noreferrer"
          style={{ color: "#1e5c2e" }}
          className="hover:underline"
        >
          72 G. Marcelo St., Brgy. Maysan, Valenzuela City
        </a>
      ),
    },
    { icon: "🕙", title: "Hours",   detail: "Mon–Sun: 11AM – 9PM" },
    { icon: "📞", title: "Phone",   detail: "+63 9482820392" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24" style={{ background: "#e8f0e1" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#5a7a4a" }}>— Visit Us</p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider uppercase mb-4" style={{ color: "#1e5c2e" }}>
          Find Us
        </h2>
        <p className="text-base sm:text-lg font-semibold mb-10" style={{ color: "#5a7a4a" }}>
          Come in, or order online — we're always ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {info.map(item => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border-2 hover:shadow-md transition-shadow text-left"
              style={{ borderColor: "#d4f53c" }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-display text-lg tracking-wider mb-1" style={{ color: "#1e5c2e" }}>{item.title}</div>
              <div className="text-sm font-semibold" style={{ color: "#5a7a4a" }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border-2" style={{ borderColor: "#d4f53c" }}>
          <h3 className="font-display text-2xl sm:text-3xl tracking-wider mb-5" style={{ color: "#1e5c2e" }}>FOLLOW US</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { href: "https://www.tiktok.com/@shockbites7",    emoji: "🎵", platform: "TikTok",    handle: "@shockbites7" },
              { href: "https://www.instagram.com/ShockBites11", emoji: "📸", platform: "Instagram",  handle: "ShockBites11" },
              { href: "https://www.facebook.com/ShockBites",    emoji: "👥", platform: "Facebook",   handle: "ShockBites" },
            ].map(s => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl px-5 py-3 transition-all hover:scale-105 border-2"
                style={{ background: "#eef3e4", borderColor: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#d4f53c")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
              >
                <span className="text-2xl">{s.emoji}</span>
                <div className="text-left">
                  <div className="font-display tracking-wider text-sm" style={{ color: "#1e5c2e" }}>{s.platform}</div>
                  <div className="text-xs font-semibold" style={{ color: "#5a7a4a" }}>{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar logoSize="h-14 sm:h-16" />
      <Hero />
      <StatsStrip />
      <Featured />
      <About />
      <Contact />
      <Footer variant="home" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
