export interface ProductData {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    descripcion: string;
    imagen: string;
  }
  
  export interface CartItem {
    product: ProductData;
    quantity: number;
  }

 