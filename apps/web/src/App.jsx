import React from 'react';
import { Route, Routes } from 'react-router-dom'; // ❗ removed Router
import { Toaster } from './components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";


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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products/:category" element={<CategoryPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;