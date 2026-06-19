import { useState, useMemo } from 'react';
import { useCart } from '../CartContext';
import { pushOrder } from '../CartContext';

export default function CheckoutModal() {
  const { cart, checkoutOpen, setCheckoutOpen, clearCart } = useCart();
  const [form, setForm] = useState({ fullName: "", phone: "", paymentMethod: "card", cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const orderNum = useMemo(() => "SB-" + Math.floor(100000 + Math.random() * 900000), []);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName || form.fullName.length < 2) e.fullName = "Full name is required";
    if (!form.phone || !/^[0-9+\-\s]{7,20}$/.test(form.phone)) e.phone = "Valid phone number is required";
    if (form.paymentMethod === "card") {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
      if (!form.expiry) e.expiry = "Expiry date required";
      if (!form.cvv || form.cvv.length < 3) e.cvv = "CVV required";
    }
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    pushOrder({
      id: orderNum,
      customer: { name: form.fullName, phone: form.phone },
      items: cart.map(item => ({ name: item.product.name, qty: item.quantity, price: item.product.price, subtotal: item.product.price * item.quantity })),
      total: subtotal,
      payment: form.paymentMethod === "card" ? "Card" : form.paymentMethod === "gcash" ? "GCash" : "COD",
      status: "Pending",
      timestamp: new Date().toISOString(),
    });
    setSuccess(true);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    if (success) clearCart();
    setSuccess(false);
    setForm({ fullName: "", phone: "", paymentMethod: "card", cardNumber: "", expiry: "", cvv: "" });
    setErrors({});
  };

  const field = (name: string, label: string, placeholder: string, extra: Record<string, string> = {}) => (
    <div>
      <label className="block text-sm font-bold mb-1" style={{ color: "#1a3a1a" }}>{label}</label>
      <input
        name={name}
        value={(form as Record<string, string>)[name]}
        placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        className="w-full px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-colors"
        style={{ borderColor: errors[name] ? "#dc2626" : "rgba(30,92,46,0.25)", color: "#1a3a1a", background: "#fff" }}
        {...extra}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1 font-semibold">{errors[name]}</p>}
    </div>
  );

  return (
    <div
      className={`modal-overlay ${checkoutOpen ? "open" : ""}`}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-box">
        {/* Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0" style={{ background: "#1e5c2e" }}>
          <span className="font-display text-xl sm:text-2xl tracking-widest text-white">
            {success ? "ORDER PLACED!" : "CHECKOUT"}
          </span>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl shadow-lg" style={{ background: "#1e5c2e" }}>✓</div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider" style={{ color: "#1e5c2e" }}>ORDER CONFIRMED!</h2>
            <p className="text-base sm:text-lg font-semibold" style={{ color: "#5a7a4a" }}>Your food is being prepared with love.</p>
            <div className="px-6 sm:px-8 py-4 rounded-xl border" style={{ background: "#eef3e4", borderColor: "rgba(30,92,46,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#5a7a4a" }}>Order Number</p>
              <p className="font-display text-2xl sm:text-3xl tracking-wider" style={{ color: "#1e5c2e" }}>{orderNum}</p>
            </div>
            <p className="text-sm" style={{ color: "#5a7a4a" }}>Estimated delivery: 30–45 minutes</p>
            <button
              onClick={handleClose}
              className="font-display tracking-widest text-base sm:text-lg px-10 sm:px-12 py-3 sm:py-4 rounded-xl text-white hover:opacity-90 transition-all"
              style={{ background: "#1e5c2e" }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="modal-body">
            {/* Stacks to single column on mobile via .checkout-grid CSS class */}
            <div className="checkout-grid grid md:grid-cols-2">
              {/* Order summary */}
              <div className="p-4 sm:p-6 md:border-r" style={{ background: "#f0f4e8", borderColor: "rgba(30,92,46,0.15)" }}>
                <h3 className="font-display text-lg sm:text-xl tracking-wider uppercase mb-4" style={{ color: "#1e5c2e" }}>Your Order</h3>
                <div className="space-y-3 mb-6 max-h-40 md:max-h-none overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-sm">
                      <span className="font-semibold" style={{ color: "#1a3a1a" }}>
                        {item.product.name} <span style={{ color: "#5a7a4a" }}>×{item.quantity}</span>
                      </span>
                      <span className="font-bold ml-2 flex-shrink-0" style={{ color: "#1e5c2e" }}>₱{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center" style={{ borderColor: "rgba(30,92,46,0.2)" }}>
                  <span className="font-display text-lg sm:text-xl tracking-wider" style={{ color: "#1e5c2e" }}>TOTAL</span>
                  <span className="font-black text-xl sm:text-2xl" style={{ color: "#1e5c2e" }}>₱{subtotal}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="p-4 sm:p-6 space-y-4">
                {field("fullName", "Full Name", "Juan Dela Cruz")}
                {field("phone", "Phone", "+63 912 345 6789", { type: "tel" })}

                {/* Payment method */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "#1a3a1a" }}>Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[["card","Credit Card"],["gcash","GCash"],["cod","COD"]].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, paymentMethod: val }))}
                        className="py-2 px-2 sm:px-3 rounded-xl border-2 text-xs font-bold transition-all"
                        style={form.paymentMethod === val
                          ? { borderColor: "#1e5c2e", background: "rgba(30,92,46,0.1)", color: "#1e5c2e" }
                          : { borderColor: "rgba(30,92,46,0.2)", color: "#5a7a4a", background: "#fff" }
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {form.paymentMethod === "card" && (
                  <div className="space-y-3">
                    {field("cardNumber", "Card Number", "1234 5678 9012 3456", { maxLength: "19" })}
                    <div className="grid grid-cols-2 gap-3">
                      {field("expiry", "Expiry", "MM/YY", { maxLength: "5" })}
                      {field("cvv", "CVV", "123", { maxLength: "4" })}
                    </div>
                  </div>
                )}

                {form.paymentMethod === "gcash" && (
                  <div className="border-2 border-dashed rounded-xl p-4 sm:p-6 text-center"
                       style={{ borderColor: "rgba(30,92,46,0.35)", background: "rgba(30,92,46,0.05)" }}>
                    <div className="w-24 h-24 border rounded-xl mx-auto mb-3 flex items-center justify-center"
                         style={{ background: "rgba(30,92,46,0.08)", borderColor: "rgba(30,92,46,0.2)" }}>
                      <span className="text-xs font-bold" style={{ color: "rgba(30,92,46,0.4)" }}>QR CODE</span>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: "#1e5c2e" }}>Scan with GCash to pay</p>
                    <p className="text-xs mt-1" style={{ color: "#5a7a4a" }}>Account: ShockBites Official</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 rounded-xl font-display tracking-widest text-base sm:text-lg text-white transition-all flex items-center justify-center gap-3"
                  style={{ background: "#1e5c2e", opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? <><div className="spinner" />Placing Order...</> : "PLACE ORDER"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
