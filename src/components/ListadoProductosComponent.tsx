import React, { useContext, useEffect, useState } from 'react';
import Style from '../Css/Listado.module.css';
import { CartContext } from './CartContext';
import {  ProductData } from '../types';

const ListadoProductosComponent: React.FC = () => {
  const [productos, setProductos] = useState<ProductData[]>([]);
  const cartContext = useContext(CartContext);
  const [gemas,setGemas]=useState(0)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.log('Error al obtener los productos.');
        }
      } catch (error) {
        console.log('Error de conexión.', error);
      }
    };

    fetchProductos();
  }, []);

  const addToCart = (product: ProductData) => {
    if( gemas < 3){
      
    if (cartContext) {
      cartContext.addToCart(product);
    }
  setGemas(gemas+1);
  } else(alert('solamente puedes agregar 3 pociones'))
  };

  return (
    <div className={Style.productList}>
      {productos.map((product, index) => (
        <div className={Style.card} key={index}>
          <img src={product.imagen} alt={product.nombre} />
          <h3>{product.nombre}</h3>
          <p>Price: ${product.precio}</p>
          <p>Category: {product.categoria}</p>
          <p>Description: {product.descripcion}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ListadoProductosComponent;