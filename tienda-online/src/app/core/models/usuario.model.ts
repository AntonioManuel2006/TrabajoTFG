export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  password?: string;
  telefono?: string;
  fecha_registro?: string;
  direcciones?: Direccion[];
}

export interface Direccion {
  id: number;
  usuario_id: number;
  direccion: string;
  ciudad: string;
  provincia: string;
  cp: string;
  pais: string;
}
