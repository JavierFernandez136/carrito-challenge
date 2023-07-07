import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from '../types';

interface HeaderComponentProps {
  showCarrito: boolean;
  setShowCarrito: (value: boolean) => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ showCarrito, setShowCarrito }) => {
  const { cartItems } = useContext(CartContext) ?? { cartItems: [] };
  let totalGemas = 3;
  for (const cartItem of cartItems) {
    totalGemas -= cartItem.product.precio;
  }

  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" alt="Gemas" />
        <span>{totalGemas} Gemas</span>
      </div>
      <button className="text-white hover:underline" onClick={() => setShowCarrito(true)}>
        Ver Carrito ({cartItems.length})
      </button>
    </div>
  );
};