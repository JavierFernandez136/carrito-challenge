import React, { useContext, useEffect, useState } from 'react';
import Style from '../Css/Listado.module.css';
import { CartContext } from './CartContext';
import { ProductData } from '../types';
import json from '../db.json';

const ListadoProductosComponent: React.FC = () => {
  const [productos, setProductos] = useState<ProductData[]>([]);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      // try {
        setProductos(json.productos)
        // const response = json.productos 
      //   await fetch('http://localhost:3001/productos');
      //   if (response.ok) {
      //     const data = await response.json();
      //     setProductos(data);
      //   } else {
      //     console.log('Error al obtener los productos.');
      //   }
      // } catch (error) {
      //   console.log('Error de conexión.', error);
      // }
    };

    fetchProductos();
  }, []);

  const addToCart = (product: ProductData) => {
    if (cartContext) {
      const existingItem = cartContext.cartItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return;
      }

      const cartTotal = cartContext.cartItems.reduce((total, item) => total + item.product.precio * item.quantity, 0);
      const hasEnoughGems = cartTotal + product.precio <= 3;
      const isGemLimitReached = cartContext.cartItems.length === 3;

      if (!hasEnoughGems || isGemLimitReached) {
        return;
      }

      cartContext.addToCart(product);
    }
  };

  return (
    <div className={Style.productList}>
      {productos.map((product: ProductData, index: number) => {
        const isProductAdded = cartContext?.cartItems.some((item) => item.product.id === product.id);
        const cartTotal = cartContext?.cartItems.reduce(
          (total, item) => total + item.product.precio * item.quantity,
          0
        );
        const hasEnoughGems = cartTotal !== undefined && cartTotal + product.precio <= 3;
        const isGemLimitReached = cartContext?.cartItems.length === 3;

        return (
          <div className={`${Style.card} ${Style.product}`} key={index}>
            { <img src={process.env.PUBLIC_URL + product.imagen} alt={product.nombre} /> }
            <h3>{product.nombre}</h3>
            <div className={Style.price}>
              <button className={Style.priceButton}>{product.precio} Gemas</button>
            </div>
            <p>{product.descripcion}</p>
            <button
              onClick={() => addToCart(product)}
              className={`${Style.productButton}`}
              disabled={isProductAdded || !hasEnoughGems || isGemLimitReached}
              style={{
                backgroundColor: isProductAdded || !hasEnoughGems || isGemLimitReached ? 'gray' : '',
              }}
            >
              Agregar
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListadoProductosComponent;