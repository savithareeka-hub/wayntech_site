import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import ScrollToTop from "./components/ScrollToTop.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminContacts from "./pages/AdminContacts";

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />

        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product-details" element={<ProductDetails />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ✅ FIXED: MATCH LOGIN REDIRECT */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/admin/contacts" element={<AdminContacts />} />

          {/* 🔁 OPTIONAL: redirect /admin → dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <Toaster />
      </CartProvider>
    </Router>
  );
}

export default App;