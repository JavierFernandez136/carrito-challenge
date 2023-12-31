import React, { useState } from 'react';
import { CartProvider } from './components/CartContext';
import { CarritoComponent } from './components/CarritoComponent';
import { HeaderComponent } from './components/HeaderComponent';
import ListadoProductosComponent from './components/ListadoProductosComponent';
import json from './db.json'
function App() {
  console.log(json.productos);
  const [showCarrito, setShowCarrito] = useState<boolean>(false);
  return (
    <CartProvider>
      <div
        className="min-h-full bg-fixed"
        style={{ backgroundImage: "url(background.webp)" }}
      >
        <HeaderComponent showCarrito={showCarrito} setShowCarrito={setShowCarrito}/>
        <div className="flex justify-center min-h-full">
          <div className=" w-3/5 flex justify-between">
            {showCarrito ? <CarritoComponent showCarrito={showCarrito} setShowCarrito={setShowCarrito}/> : <ListadoProductosComponent />}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;