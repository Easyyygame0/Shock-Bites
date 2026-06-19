import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order } from './types';

const CART_KEY = "shockbites-cart";
const ORDERS_KEY = "restaurantOrders";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((item: CartItem) => item?.product?.id);
  } catch { return []; }
}

export function pushOrder(order: Order) {
  try {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    const next = Array.isArray(existing) ? [...existing, order] : [order];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  } catch { /* ignore */ }
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  /* Buy-now flow — bypasses the shared cart */
  buyNowItems: CartItem[];
  buyNow: (product: Product) => void;
  clearBuyNow: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyNowItems, setBuyNowItems] = useState<CartItem[]>([]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const buyNow = (product: Product) => {
    setBuyNowItems([{ product, quantity: 1 }]);
    setCheckoutOpen(true);
  };

  const clearBuyNow = () => setBuyNowItems([]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, updateQty, removeFromCart, clearCart, cartCount,
      cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen,
      buyNowItems, buyNow, clearBuyNow,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
