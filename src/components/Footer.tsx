import { useNavigate } from 'react-router-dom';

interface FooterProps {
  variant?: 'home' | 'menu';
}

export default function Footer({ variant = 'home' }: FooterProps) {
  const navigate = useNavigate();

  const address = variant === 'home'
    ? "72 G. Marcelo Street, Barangay Maysan, Valenzuela City | Mon–Sun: 11AM–9PM"
    : "123 Shock Street, Manila, PH | Mon–Sun: 10AM–10PM";

  return (
    <footer style={{ background: "#1e5c2e" }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="Images/Shockbites-logo.png" alt="ShockBites" className="h-12 w-auto" />
              <span className="font-display text-2xl tracking-widest text-white">SHOCKBITES</span>
            </div>
            <p className="text-white/60 text-sm">Bold flavors, fresh ingredients, and unforgettable bites.</p>
          </div>
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/')} className="text-left text-white/60 text-sm hover:text-white transition-colors">Home</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-white/60 text-sm hover:text-white transition-colors">About Us</button>
              <button onClick={() => navigate('/menu')} className="text-left text-white/60 text-sm hover:text-white transition-colors">Menu</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-white/60 text-sm hover:text-white transition-colors">Contact</button>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-4">FOLLOW US</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.tiktok.com/@shockbites7" target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">🎵 TikTok — @shockbites7</a>
              <a href="https://www.instagram.com/ShockBites11" target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">📸 Instagram — ShockBites11</a>
              <a href="https://www.facebook.com/ShockBites" target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-white transition-colors">👥 Facebook — ShockBites</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2025 ShockBites. All rights reserved.</p>
          <p className="text-white/40 text-sm">{address}</p>
        </div>
      </div>
    </footer>
  );
}
