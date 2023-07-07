import React, { useContext, useState } from 'react';
import styles from '../Css/Carrito.module.css';
import { CartContext } from './CartContext';
import { CartItem } from '../types';

interface CarritoComponentProps {
  showCarrito: boolean;
  setShowCarrito: (value: boolean) => void;
}

export const CarritoComponent: React.FC<CarritoComponentProps> = ({ showCarrito, setShowCarrito }) => {
  const { cartItems, removeFromCart } = useContext(CartContext) ?? { cartItems: [], removeFromCart: () => {} };

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleBuy = () => {
    const itemIds = cartItems.map((item: CartItem) => item.product.id);
    // Realizar la solicitud POST al backend para realizar la compra
    fetch('http://localhost:3001/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemsId: itemIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mostrar mensaje de confirmación de compra
        setConfirmationMessage('Compra confirmada');
        // Vaciar el carrito
        removeFromCart();
      })
      .catch((error) => {
        // Mostrar mensaje de error en caso de fallo en la compra
        console.error('Error al realizar la compra:', error);
        setConfirmationMessage('Error al realizar la compra');
      });
  };

  return (
    <div className={styles.container}>
      {confirmationMessage && (
        <div className={styles.confirmation}>
          <p>{confirmationMessage}</p>
          <button className={styles.backButton} onClick={() => setShowCarrito(false)}>Volver al Listado de Productos</button>
        </div>
      )}
      {!confirmationMessage && (
        <div>
          <button className={styles.backButton} onClick={() => setShowCarrito(false)}>Volver</button>
          <h2>Carrito de Compras</h2>
          <ul>
            {cartItems.map((item: CartItem) => (
              <li key={item.product.id} className={styles.productRow}>
                <img src={item.product.imagen} alt={item.product.nombre} />
                <div>
                  <span className={styles.productName}>{item.product.nombre}</span>
                  <span className={styles.deleteButton} onClick={() => handleRemoveItem(item.product.id)}>X</span>
                </div>
              </li>
            ))}
          </ul>
          <button className={styles.buyButton} disabled={cartItems.length === 0} onClick={handleBuy}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default CarritoComponent;