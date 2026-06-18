import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Navbar({ logoSize = 'h-28' }: { logoSize?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();

  const links = [
    { label: "About Us",   href: "/#about" },
    { label: "Menu",       href: "/menu" },
    { label: "Togue-ther", href: "/togue-ther" },
    { label: "Contact",    href: "/#contact" },
  ];

  const handleLink = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-lg" style={{ background: "#1e5c2e" }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3">
          <img src="Images/Shockbites-logo.png" alt="ShockBites" className={`${logoSize} w-auto`} />
          <span className="font-display text-2xl tracking-widest text-white hidden sm:block">SHOCKBITES</span>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <button key={l.label} onClick={() => handleLink(l.href)}
              className="font-display text-lg tracking-widest text-white/90 hover:text-yellow-300 transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setCartOpen(true)}
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Open cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: "#d4f53c", color: "#1e5c2e" }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(o => !o)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 py-4 px-4 space-y-2" style={{ background: "#1e5c2e" }}>
          {links.map(l => (
            <button key={l.label} onClick={() => handleLink(l.href)}
              className="block w-full text-left font-display text-lg tracking-widest text-white/90 hover:text-yellow-300 py-2 transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
