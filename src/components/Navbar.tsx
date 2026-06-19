import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Navbar({ logoSize = 'h-16' }: { logoSize?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();

  const links = [
    { label: "Home",       href: "/" },
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
      }, 120);
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-lg" style={{ background: "#1e5c2e" }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
        {/* Logo */}
        <button onClick={() => handleLink('/')} className="flex items-center gap-2 min-w-0">
          <img
            src="Images/Shockbites-logo.png"
            alt="ShockBites"
            className={`${logoSize} w-auto flex-shrink-0`}
            style={{ maxHeight: '64px' }}
          />
          <span className="font-display text-xl sm:text-2xl tracking-widest text-white hidden xs:block truncate">
            SHOCKBITES
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => handleLink(l.href)}
              className="font-display text-base lg:text-lg tracking-widest text-white/90 hover:text-yellow-300 transition-colors whitespace-nowrap"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                style={{ background: "#d4f53c", color: "#1e5c2e" }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/20 pb-4 px-4 space-y-1"
          style={{ background: "#1e5c2e" }}
        >
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => handleLink(l.href)}
              className="block w-full text-left font-display text-lg tracking-widest text-white/90 hover:text-yellow-300 py-3 border-b border-white/10 last:border-0 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
