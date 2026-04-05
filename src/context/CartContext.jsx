import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  // ✅ LOAD CART FROM LOCAL STORAGE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        const newQty = existing.qty + product.qty;

        if (newQty <= 0) {
          return prevCart.filter(item => item.id !== product.id);
        }

        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, qty: newQty }
            : item
        );
      } else {
        return [...prevCart, { ...product }];
      }
    });
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // ✅ CLEAR CART (🔥 NEW)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};