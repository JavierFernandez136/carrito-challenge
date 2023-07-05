import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from '../types';

interface CarritoComponentProps {
  showCarrito: boolean;
  setShowCarrito: (value: boolean) => void;
}

export const CarritoComponent: React.FC<CarritoComponentProps> = ({ showCarrito, setShowCarrito }) => {
  const { cartItems, removeFromCart } = useContext(CartContext) ?? { cartItems: [], removeFromCart: () => {} };

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  return (
    <div>
      <button onClick={() => setShowCarrito(false)}>Volver</button>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map((item: CartItem) => (
          <li key={item.product.id}>
            <span>{item.product.nombre}</span> - <span>Cantidad: {item.quantity}</span>
            <button onClick={() => handleRemoveItem(item.product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};