import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addItem = (item) => {
    setCartItems((prev) => {
      const current = prev[item.id] || { ...item, quantidade: 0 };
      return {
        ...prev,
        [item.id]: { ...current, quantidade: current.quantidade + 1 },
      };
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      if (updated[itemId].quantidade > 1) {
        updated[itemId].quantidade -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotal = () => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}