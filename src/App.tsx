import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ToguetherPage from './pages/ToguetherPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/togue-ther" element={<ToguetherPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
