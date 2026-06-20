import { Product, VariantOption } from './types';

export const GRADIENTS = [
  "#1e5c2e,#2e7d42", "#1a6644,#2e8c5a", "#2a5c1a,#3e7a2a",
  "#1c5a50,#2e7a6a", "#3a6a1a,#1e5c2e", "#163d1e,#2e6a3a",
  "#2a5c30,#1e4a28", "#1e5c38,#2a7a50",
];

export const CATEGORIES = ["All", "House Specials", "Burgers", "Appetizers", "Fruitees"];

export const PRODUCTS: Product[] = [
  { id: 1,  name: "Cheesy Togchomp Classic",   category: "House Specials", price: 109, image: "Images/Cheesy-togchomp.png",             description: "Simple yet flavorful burger made with a crispy togue-based patty, topped with melted cheese and savory sauces" },
  { id: 2,  name: "Sproutarma",                category: "House Specials", price: 109, image: "Images/Sproutarma.png",                  description: "A flavorful shawarma-style wrap made with seasoned togue, combined with fresh vegetables and savory sauces",
    variants: [{ label: "Option", options: [{ name: "Regular", price: 109 }, { name: "Hot", price: 119 }] }] },
  { id: 4,  name: "Togueth Wrap (3pcs)",       category: "House Specials", price: 89,  image: "Images/Togueth-wrap.png",                description: "A healthy yet satisfying snack made with fresh togue, melted cheese, and a blend of flavorful sauces",
    variants: [{ label: "Option", options: [{ name: "Regular 3pcs", price: 89 }, { name: "Hot 3pcs", price: 99 }, { name: "With Fries", price: 109 }] }] },
  { id: 6,  name: "Togueth Wrap with Fries",   category: "House Specials", price: 109, image: "Images/Togueth-wrap-with-fries.png",      description: "Togueth Wrap served with a side of golden fries" },
  { id: 7,  name: "Cheesy Togchomp",           category: "Burgers",        price: 109, image: "Images/Cheesy-togchomp.png",             description: "Simple yet flavorful burger made with a crispy togue-based patty, topped with melted cheese and savory sauces" },
  { id: 8,  name: "Cheesy Togchomp Deluxe",    category: "Burgers",        price: 129, image: "Images/Cheesy-togchomp-deluxe.png",      description: "A flavorful crispy togue patty topped with melted cheese, fresh lettuce, tomato, cucumber, and savory sauces" },
  { id: 9,  name: "Cheesy Togchomp Premium",   category: "Burgers",        price: 139, image: "Images/Cheesy-togchomp-premium.png",     description: "A flavorful crispy togue patty topped with egg melted cheese, fresh lettuce, tomato, cucumber, and savory sauces" },
  { id: 10, name: "Regular Fries",             category: "Appetizers",     price: 99,  image: "Images/Fries.png",                       description: "Golden fried potatoes with a light seasoning.",
    variants: [{ label: "Flavor", options: ["Cheese", "Sour Cream", "Barbecue"] }] },
  { id: 11, name: "Kiwi Fruitee",              category: "Fruitees",       price: 69,  image: "Images/Kiwi Drink.png",                 description: "Refreshing kiwi-based tea drink.",
    variants: [{ label: "Size", options: [{ name: "16oz", price: 69 }, { name: "22oz", price: 79 }] }] },
  { id: 12, name: "Strawberry Fruitee",        category: "Fruitees",       price: 69,  image: "Images/Strawberry Drink.png",           description: "Refreshing strawberry-based tea drink.",
    variants: [{ label: "Size", options: [{ name: "16oz", price: 69 }, { name: "22oz", price: 79 }] }] },
  { id: 13, name: "Mango Fruitee",             category: "Fruitees",       price: 69,  image: "Images/Mango Drink.png",                 description: "Refreshing mango-based tea drink.",
    variants: [{ label: "Size", options: [{ name: "16oz", price: 69 }, { name: "22oz", price: 79 }] }] },
  { id: 14, name: "Lychee Fruitee",            category: "Fruitees",       price: 69,  image: "Images/Lychee Drink.png",                description: "Refreshing lychee-based tea drink.",
    variants: [{ label: "Size", options: [{ name: "16oz", price: 69 }, { name: "22oz", price: 79 }] }] },
];

export const COMBOS = [
  { id: 101, name: "Savor & Sip Combo",       price: 189, description: "1pc Sproutarma paired with refreshing Fruitees",                              image: "Images/Savor & Sip Combo.png" },
  { id: 102, name: "Perfect Pair",            price: 159, description: "3pcs Togueth Wrap paired with refreshing Fruitees",                            image: "Images/Perfect Pair.png" },
  { id: 103, name: "Savor & Sip Trio",        price: 259, description: "1pc Sproutarma paired with refreshing Fruitees",                              image: "Images/Savor & Sip Trio.png" },
  { id: 104, name: "Togchomp Premium Duo",    price: 209, description: "1pc Togchomp Premium Burger paired with refreshing Fruitees",                  image: "Images/TogChomp Premium Duo.png" },
  { id: 105, name: "Togchomp Deluxe Trio",    price: 289, description: "1pc Togchomp Deluxe Burger with fries and refreshing Fruitees",               image: "Images/TogChomp Deluxe Trio.png" },
  { id: 106, name: "Perfect Trio",            price: 239, description: "3pcs Togueth Wrap with fries and refreshing Fruitees",                        image: "Images/Perfect Trio.png" },
];

export function getSelectedVariantPrice(product: Product, selectedVariants: Record<string, string>): number {
  if (!product.variants) return product.price;
  for (const variant of product.variants) {
    const selectedValue = selectedVariants?.[variant.label];
    if (!selectedValue) continue;
    const selectedOption = variant.options.find(opt => {
      const optionName = typeof opt === "string" ? opt : opt.name;
      return optionName === selectedValue;
    });
    if (selectedOption && typeof selectedOption === "object" && "price" in selectedOption) {
      return (selectedOption as VariantOption).price;
    }
  }
  return product.price;
}
