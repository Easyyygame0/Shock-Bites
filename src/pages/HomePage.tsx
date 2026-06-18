import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';

function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ background: "#eef3e4" }}>
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 600 800" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M80,0 C200,100 0,200 100,350 C200,500 50,600 150,800 L600,800 L600,0 Z" fill="#1e5c2e" opacity="0.85"/>
          <path d="M120,0 C280,150 80,280 180,420 C280,560 100,650 200,800 L600,800 L600,0 Z" fill="#2e7d42" opacity="0.5"/>
        </svg>
      </div>
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
            <button onClick={() => scrollTo("menu")}
              className="font-display tracking-widest text-lg h-14 px-10 rounded-xl text-white shadow-lg hover:opacity-90 transition-all hover:scale-105"
              style={{ background: "#1e5c2e" }}>
              Explore Menu
            </button>
            <button onClick={() => scrollTo("about")}
              className="font-display tracking-widest text-lg h-14 px-10 rounded-xl border-2 bg-transparent transition-all"
              style={{ borderColor: "#1e5c2e", color: "#1e5c2e" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1e5c2e"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#1e5c2e"; }}>
              Our Story
            </button>
          </div>
        </div>

        <div className="relative hidden md:flex items-center justify-center h-[600px]">
          <div className="absolute right-8 top-4 w-80 h-80 rounded-full border-4 border-white shadow-2xl overflow-hidden">
            <img src="Images/Burger.png" alt="Burger" className="w-full h-full object-cover" />
          </div>
          <div className="absolute left-8 bottom-8 w-64 h-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img src="Images/Shawarma.png" alt="Shawarma" className="w-full h-full object-cover" />
          </div>
          <div className="absolute right-8 bottom-4 w-56 h-56 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img src="Images/Togueth-wrap.png" alt="Wrap" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-16 left-12 flex gap-1 opacity-40">
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
              <p>Shock Bites is a snack-focused food business that delivers bold,
                innovative flavors designed to surprise consumers with every bite.
                The company focuses on offering unique flavors through the
                combination of traditional and innovative tastes, textures, and
                visual elements. It targets students and young professionals who
                seek affordable, convenient, and exciting food options beyond
                typical street snacks. Shock Bites intends to develop strong
                customer appeal and brand identity.</p>
              <p>In order to achieve growth, this company plans on employing
                certain marketing initiatives, including customer engagement
                activities online and elsewhere. It hopes to build a reputation that
                attracts returning customers and loyal customers. Growth and
                sustainability are possible through constant product innovations,
                solid branding efforts, and satisfied customers.</p>
            </div>
            <p className="font-display text-2xl tracking-wider uppercase mt-8" style={{ color: "#d4f53c" }}>
              Never settle for ordinary.
            </p>
          </div>
          <video className="w-full rounded-2xl" controls autoPlay muted loop>
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
    <section id="contact" className="py-24" style={{ background: "#e8f0e1" }}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-6xl tracking-wider uppercase mb-4" style={{ color: "#1e5c2e" }}>Find Us</h2>
        <p className="text-lg font-semibold mb-12" style={{ color: "#5a7a4a" }}>Come in, or order online — we're always ready.</p>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {info.map(item => (
            <div key={item.title} className="bg-white rounded-3xl p-8 shadow-md border-2 hover:shadow-xl transition-shadow" style={{ borderColor: "#d4f53c" }}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="font-display text-xl tracking-wider mb-2" style={{ color: "#1e5c2e" }}>{item.title}</div>
              <div className="text-sm font-semibold" style={{ color: "#5a7a4a" }}>{item.detail}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-md border-2" style={{ borderColor: "#d4f53c" }}>
          <h3 className="font-display text-3xl tracking-wider mb-6" style={{ color: "#1e5c2e" }}>FOLLOW US</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://www.tiktok.com/@shockbites7" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl px-6 py-4 transition-all hover:scale-105" style={{ background: "#e8f0e1" }}>
              <span className="text-3xl">🎵</span>
              <div className="text-left">
                <div className="font-display tracking-wider text-sm" style={{ color: "#1e5c2e" }}>TIKTOK</div>
                <div className="text-xs font-semibold" style={{ color: "#5a7a4a" }}>@shockbites7</div>
              </div>
            </a>
            <a href="https://www.instagram.com/ShockBites11" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl px-6 py-4 transition-all hover:scale-105" style={{ background: "#e8f0e1" }}>
              <span className="text-3xl">📸</span>
              <div className="text-left">
                <div className="font-display tracking-wider text-sm" style={{ color: "#1e5c2e" }}>INSTAGRAM</div>
                <div className="text-xs font-semibold" style={{ color: "#5a7a4a" }}>ShockBites11</div>
              </div>
            </a>
            <a href="https://www.facebook.com/ShockBites" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl px-6 py-4 transition-all hover:scale-105" style={{ background: "#e8f0e1" }}>
              <span className="text-3xl">👥</span>
              <div className="text-left">
                <div className="font-display tracking-wider text-sm" style={{ color: "#1e5c2e" }}>FACEBOOK</div>
                <div className="text-xs font-semibold" style={{ color: "#5a7a4a" }}>ShockBites</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar logoSize="h-28" />
      <Hero />
      <About />
      <Contact />
      <Footer variant="home" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
