import { useCart } from '../CartContext';
import { GRADIENTS } from '../data';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, setCheckoutOpen } = useCart();
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const openCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="p-6 flex items-center justify-between flex-shrink-0" style={{ background: "#1e5c2e" }}>
          <span className="font-display text-2xl tracking-widest text-white">YOUR ORDER</span>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20" style={{ color: "#5a7a4a" }}>
              <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="font-display text-xl tracking-wider text-center" style={{ color: "rgba(30,92,46,0.35)" }}>Your bag is shockingly empty</p>
              <p className="text-sm text-center">Add some items from our menu!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const [from, to] = GRADIENTS[item.product.id % GRADIENTS.length].split(",");
                return (
                  <div key={item.product.id} className="flex gap-4 items-center p-4 rounded-xl border"
                       style={{ background: "#f0f4e8", borderColor: "rgba(30,92,46,0.15)" }}>
                    {item.product.image ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                           style={{ background: `linear-gradient(135deg,${from},${to})` }}>
                        <span className="font-display text-white text-xs text-center leading-tight px-1">
                          {item.product.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm leading-tight" style={{ color: "#1a3a1a" }}>{item.product.name}</h4>
                      <p className="font-bold text-sm" style={{ color: "#1e5c2e" }}>₱{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.product.id, -1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
                          style={{ background: "#1e5c2e" }}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <span className="w-6 text-center text-sm font-black">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
                          style={{ background: "#1e5c2e" }}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="font-black" style={{ color: "#1a3a1a" }}>₱{item.product.price * item.quantity}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t flex-shrink-0 space-y-4" style={{ background: "#f0f4e8", borderColor: "rgba(30,92,46,0.15)" }}>
            <div className="flex justify-between items-center">
              <span className="font-display text-xl tracking-wider" style={{ color: "#1a3a1a" }}>SUBTOTAL</span>
              <span className="font-black text-2xl" style={{ color: "#1e5c2e" }}>₱{subtotal}</span>
            </div>
            <button onClick={openCheckout}
              className="w-full py-4 rounded-xl font-display tracking-widest text-lg text-white shadow-md hover:opacity-90 transition-all"
              style={{ background: "#1e5c2e" }}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
