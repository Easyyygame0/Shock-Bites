import { useNavigate } from 'react-router-dom';

interface FooterProps {
  variant?: 'home' | 'menu';
}

export default function Footer({ variant = 'home' }: FooterProps) {
  const navigate = useNavigate();

  const address = variant === 'home'
    ? "72 G. Marcelo Street, Barangay Maysan, Valenzuela City | Mon–Sun: 11AM–9PM"
    : "123 Shock Street, Manila, PH | Mon–Sun: 10AM–10PM";

  const scrollHome = (id: string) => {
    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
  };

  return (
    <footer style={{ background: "#1e5c2e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="Images/Shockbites-logo.png" alt="ShockBites" className="h-10 sm:h-12 w-auto" />
              <span className="font-display text-xl sm:text-2xl tracking-widest text-white">SHOCKBITES</span>
            </div>
            <p className="text-white/60 text-sm">Bold flavors, fresh ingredients, and unforgettable bites.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base sm:text-lg tracking-wider text-white mb-3 sm:mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/')} className="text-left text-white/60 text-sm hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollHome('about')} className="text-left text-white/60 text-sm hover:text-white transition-colors">About Us</button>
              <button onClick={() => navigate('/menu')} className="text-left text-white/60 text-sm hover:text-white transition-colors">Menu</button>
              <button onClick={() => scrollHome('contact')} className="text-left text-white/60 text-sm hover:text-white transition-colors">Contact</button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-base sm:text-lg tracking-wider text-white mb-3 sm:mb-4">FOLLOW US</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.tiktok.com/@shockbites7"      target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">🎵 TikTok — @shockbites7</a>
              <a href="https://www.instagram.com/ShockBites11"   target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">📸 Instagram — ShockBites11</a>
              <a href="https://www.facebook.com/ShockBites"      target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">👥 Facebook — ShockBites</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-white/40 text-xs sm:text-sm">© 2025 ShockBites. All rights reserved.</p>
          <p className="text-white/40 text-xs sm:text-sm">{address}</p>
        </div>
      </div>
    </footer>
  );
}
