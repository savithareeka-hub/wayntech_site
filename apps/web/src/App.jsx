import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from './components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
     <CartProvider>
      {/* your routes/pages */}
    </CartProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;