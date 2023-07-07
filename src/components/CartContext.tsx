import React, { createContext, useState, ReactNode } from 'react';
import { CartItem, ProductData } from '../types';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductData) => void;
  removeFromCart: (productId?: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductData) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId?: number) => {
    if (productId) {
      const updatedItems = cartItems.filter((item) => item.product.id !== productId);
      setCartItems(updatedItems);
    } else {
      setCartItems([]);
    }
  };

  const contextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};