import React, { useState } from 'react';
import { CartProvider } from './components/CartContext';
import { CarritoComponent } from './components/CarritoComponent';
import { HeaderComponent } from './components/HeaderComponent';
import ListadoProductosComponent from './components/ListadoProductosComponent';

function App() {
  const [showCarrito, setShowCarrito] = useState<boolean>(false);
  return (
    <CartProvider>
      <div
        className="min-h-full bg-fixed"
        style={{ backgroundImage: "url(background.webp)" }}
      >
        <HeaderComponent showCarrito={showCarrito} setShowCarrito={setShowCarrito}/>
        <div className="flex justify-center min-h-full">
          <div className="max-w-lg w-full py-16">
            {showCarrito ? <CarritoComponent showCarrito={showCarrito} setShowCarrito={setShowCarrito}/> : <ListadoProductosComponent />}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;