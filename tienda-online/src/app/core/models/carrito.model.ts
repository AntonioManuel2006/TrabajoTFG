import { Producto } from './producto.model';

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

export interface Carrito {
  items: CarritoItem[];
  total: number;
}
