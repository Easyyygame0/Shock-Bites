export interface VariantOption {
  name: string;
  price: number;
}

export interface Variant {
  label: string;
  options: (string | VariantOption)[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  variants?: Variant[];
  selectedVariants?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: { name: string; phone: string };
  items: { name: string; qty: number; price: number; subtotal: number }[];
  total: number;
  payment: string;
  status: string;
  timestamp: string;
}
