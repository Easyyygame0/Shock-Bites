import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../CartContext';
import { COMBOS } from '../data';
import { Product } from '../types';

export default function ToguetherPage() {
  const { cart, addToCart } = useCart();

  const addCombo = (combo: typeof COMBOS[0]) => {
    const product: Product = {
      id: combo.id,
      name: combo.name,
      category: "Combos",
      price: combo.price,
      description: combo.description,
      image: combo.image,
    };
    addToCart(product);
  };

  return (
    <>
      <Navbar logoSize="h-16" />
      <main className="pt-28 pb-16" style={{ background: "#eef3e4" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-6xl md:text-7xl tracking-wider mb-4" style={{ color: "#1e5c2e" }}>TOGUE-THER COMBOS</h1>
            <p className="text-lg font-semibold" style={{ color: "#5a7a4a" }}>Better together — pick your perfect combo!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMBOS.map(combo => {
              const inCart = cart.some(i => i.product.id === combo.id);
              return (
                <div key={combo.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2" style={{ borderColor: "#d4f53c" }}>
                  <div className="relative">
                    <img src={combo.image} alt={combo.name} className="w-full h-56 object-cover" />
                    <div className="absolute top-4 left-4 rounded-full flex items-center justify-center w-20 h-20 shadow-lg" style={{ background: "#1e5c2e" }}>
                      <div className="text-center">
                        <div className="text-white text-xs font-bold">For only</div>
                        <div className="font-display text-xl tracking-wider" style={{ color: "#d4f53c" }}>₱{combo.price}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col" style={{ minHeight: "160px" }}>
                    <h3 className="font-display text-2xl tracking-wider mb-2" style={{ color: "#1e5c2e" }}>{combo.name}</h3>
                    <p className="text-sm font-semibold mb-4 flex-1" style={{ color: "#5a7a4a" }}>{combo.description}</p>
                    <button
                      onClick={() => addCombo(combo)}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                      style={inCart
                        ? { background: "rgba(30,92,46,0.1)", color: "#1e5c2e", border: "2px solid #1e5c2e" }
                        : { background: "#1e5c2e", color: "#fff" }
                      }>
                      {inCart ? "✓ Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer variant="home" />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
