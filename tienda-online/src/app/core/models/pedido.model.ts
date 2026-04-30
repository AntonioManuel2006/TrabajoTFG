import { CarritoItem } from './carrito.model';
import { Direccion } from './usuario.model';

export interface Pedido {
  id: number;
  usuario_id: number;
  direccion: Direccion;
  fecha: string;
  total: number;
  estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';
  items: CarritoItem[];
}
