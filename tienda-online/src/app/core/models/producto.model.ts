export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  especificaciones?: Record<string, string>;
  precio: number;
  stock: number;
  imagen: string;
  categoria_id: number;
  marca_id: number;
  categoria?: string;
  marca?: string;
  valoracion?: number;
  num_resenas?: number;
}

export interface Resena {
  id: number;
  producto_id: number;
  usuario_id: number;
  usuario_nombre: string;
  valoracion: number;
  comentario: string;
  fecha: string;
}
