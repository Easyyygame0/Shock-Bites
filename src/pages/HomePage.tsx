import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';

function Hero() {
  const navigate = useNavigate();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: "#eef3e4" }}>
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 600 800" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M80,0 C200,100 0,200 100,350 C200,500 50,600 150,800 L600,800 L600,0 Z" fill="#1e5c2e" opacity="0.85"/>
          <path d="M120,0 C280,150 80,280 180,420 C280,560 100,650 200,800 L600,800 L600,0 Z" fill="#2e7d42" opacity="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold mb-4 sm:mb-6"
               style={{ background: "rgba(30,92,46,0.08)", borderColor: "rgba(30,92,46,0.2)", color: "#1e5c2e" }}>
            ★ New Items Available Now
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-none uppercase mb-4 sm:mb-6"
              style={{ color: "#1e5c2e" }}>
            Experience<br />
            <span style={{ color: "#1a3a1a" }}>The Tasty,</span><br />
            Amazing<br />
            <span style={{ color: "#1a3a1a" }}>Variety.</span>
          </h1>
          <p className="text-base sm:text-lg font-semibold mb-6 sm:mb-8 max-w-md leading-relaxed" style={{ color: "#5a7a4a" }}>
            Bold flavors, fresh ingredients, and unforgettable bites — made for people who refuse to settle for ordinary.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="font-display tracking-widest text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl text-white shadow-lg hover:opacity-90 transition-all hover:scale-105 text-center"
              style={{ background: "#1e5c2e" }}>
              Explore Menu
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="font-display tracking-widest text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-xl border-2 bg-transparent transition-all text-center"
              style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#1e5c2e"; b.style.color = "#fff"; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = "transparent"; b.style.color = "#1e5c2e"; }}>
              Our Story
            </button>
          </div>
        </div>

        {/* Food images — desktop only via CSS, mobile shows a single image strip */}
        <div className="relative hidden md:flex items-center justify-center h-[500px] lg:h-[600px]">
          <div className="absolute right-4 lg:right-8 top-4 w-64 lg:w-80 h-64 lg:h-80 rounded-full border-4 border-white shadow-2xl overflow-hidden">
            <img src="Images/Burger.png" alt="Burger" className="w-full h-full object-cover" />
          </div>
          <div className="absolute left-4 lg:left-8 bottom-8 w-48 lg:w-64 h-48 lg:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img src="Images/Shawarma.png" alt="Shawarma" className="w-full h-full object-cover" />
          </div>
          <div className="absolute right-4 lg:right-8 bottom-4 w-40 lg:w-56 h-40 lg:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img src="Images/Togueth-wrap.png" alt="Wrap" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mobile food images strip */}
        <div className="flex md:hidden justify-center gap-4 mt-4">
          {["Images/Burger.png","Images/Shawarma.png","Images/Togueth-wrap.png"].map((src, i) => (
            <div key={i} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 sm:py-24 text-white relative overflow-hidden" style={{ background: "#1e5c2e" }}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
           style={{ background: "#fff", transform: "translate(40%,-40%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-xs sm:text-sm font-bold mb-4 sm:mb-6"
                 style={{ background: "rgba(255,255,255,0.1)", color: "#d4f53c" }}>
              ⚡ Our Story
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase mb-6 sm:mb-8 leading-none">
              Born From<br />Bold Flavor.
            </h2>
            <div className="space-y-4 sm:space-y-5 text-white/80 font-semibold text-base sm:text-lg leading-relaxed">
              <p>Shock Bites is a snack-focused food business that delivers bold, innovative flavors designed to surprise consumers with every bite. The company focuses on offering unique flavors through the combination of traditional and innovative tastes, textures, and visual elements.</p>
              <p>It targets students and young professionals who seek affordable, convenient, and exciting food options beyond typical street snacks. Growth and sustainability are possible through constant product innovations, solid branding efforts, and satisfied customers.</p>
            </div>
            <p className="font-display text-xl sm:text-2xl tracking-wider uppercase mt-6 sm:mt-8" style={{ color: "#d4f53c" }}>
              Never settle for ordinary.
            </p>
          </div>
          <video
            className="w-full rounded-2xl shadow-2xl"
            controls autoPlay muted loop
            style={{ maxHeight: '420px', objectFit: 'cover' }}>
            <source src="SHOCKBITES.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const info = [
    { icon: "📍", title: "Location", detail: <a href="https://maps.google.com/?q=72+G.+Marcelo+Street+Barangay+Maysan+Valenzuela+City" target="_blank" rel="noreferrer" style={{ color: "#1e5c2e" }} className="hover:underline">72 G. Marcelo Street, Barangay Maysan, Valenzuela City</a> },
    { icon: "🕙", title: "Hours",    detail: "Mon–Sun: 11AM – 9PM" },
    { icon: "📞", title: "Phone",    detail: "+63 9482820392" },
  ];
  return (
    <section id="contact" className="py-16 sm:py-24" style={{ background: "#e8f0e1" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider uppercase mb-3 sm:mb-4" style={{ color: "#1e5c2e" }}>Find Us</h2>
        <p className="text-base sm:text-lg font-semibold mb-8 sm:mb-12" style={{ color: "#5a7a4a" }}>Come in, or order online — we're always ready.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {info.map(item => (
            <div key={item.title} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md border-2 hover:shadow-xl transition-shadow" style={{ borderColor: "#d4f53c" }}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
              <div className="font-display text-lg sm:text-xl tracking-wider mb-2" style={{ color: "#1e5c2e" }}>{item.title}</div>
              <div className="text-sm font-semibold" style={{ color: "#5a7a4a" }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md border-2" style={{ borderColor: "#d4f53c" }}>
          <h3 className="font-display text-2xl sm:text-3xl tracking-wider mb-4 sm:mb-6" style={{ color: "#1e5c2e" }}>FOLLOW US</h3>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {[
              { href: "https://www.tiktok.com/@shockbites7",       emoji: "🎵", platform: "TIKTOK",    handle: "@shockbites7" },
              { href: "https://www.instagram.com/ShockBites11",    emoji: "📸", platform: "INSTAGRAM",  handle: "ShockBites11" },
              { href: "https://www.facebook.com/ShockBites",       emoji: "👥", platform: "FACEBOOK",   handle: "ShockBites" },
            ].map(s => (
              <a key={s.platform} href={s.href} target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 transition-all hover:scale-105"
                 style={{ background: "#e8f0e1" }}>
                <span className="text-2xl sm:text-3xl">{s.emoji}</span>
                <div className="text-left">
                  <div className="font-display tracking-wider text-xs sm:text-sm" style={{ color: "#1e5c2e" }}>{s.platform}</div>
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
      <About />
      <Contact />
      <Footer variant="home" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
