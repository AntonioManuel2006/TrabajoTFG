import { Injectable, inject, signal } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AirtableService } from './airtable.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private airtable = inject(AirtableService);

  private readonly demoUsuarios: Usuario[] = [
    {
      id: 1, nombre: 'Admin', apellidos: 'TFG', email: 'admin@tfg.com',
      password: '1234', telefono: '600000000',
      fecha_registro: '2024-01-01',
      direcciones: [{
        id: 1, usuario_id: 1, direccion: 'Calle Principal 1',
        ciudad: 'Madrid', provincia: 'Madrid', cp: '28001', pais: 'España'
      }]
    },
    {
      id: 2, nombre: 'Carlos', apellidos: 'Martínez', email: 'carlos@example.com',
      password: '1234', telefono: '611223344',
      fecha_registro: '2024-02-15',
      direcciones: [{
        id: 2, usuario_id: 2, direccion: 'Avenida Libertad 45',
        ciudad: 'Barcelona', provincia: 'Barcelona', cp: '08001', pais: 'España'
      }]
    },
  ];

  private usuarios: Usuario[] = [...this.demoUsuarios, ...this.loadRegisteredUsers()];

  private _usuario = signal<Usuario | null>(this.loadUser());
  usuario = this._usuario.asReadonly();

  private loadRegisteredUsers(): Usuario[] {
    const stored = localStorage.getItem('registered_users');
    return stored ? JSON.parse(stored) : [];
  }

  private saveRegisteredUsers(): void {
    const registered = this.usuarios.filter(u => u.id > 2);
    localStorage.setItem('registered_users', JSON.stringify(registered));
  }

  private loadUser(): Usuario | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  login(email: string, password: string): boolean {
    const user = this.usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      this._usuario.set(safeUser as Usuario);
      localStorage.setItem('user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  }

  register(data: Omit<Usuario, 'id' | 'fecha_registro'> & { password: string }): boolean {
    if (this.usuarios.some(u => u.email === data.email)) return false;
    const newId = Math.max(...this.usuarios.map(u => u.id)) + 1;
    const newUser: Usuario = {
      id: newId,
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      password: data.password,
      telefono: data.telefono,
      fecha_registro: new Date().toISOString().split('T')[0],
      direcciones: [],
    };
    this.usuarios.push(newUser);
    this.saveRegisteredUsers();
    const { password: _, ...safeUser } = newUser;
    this._usuario.set(safeUser as Usuario);
    localStorage.setItem('user', JSON.stringify(safeUser));
    this.airtable.createUser({
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email,
      telefono: newUser.telefono,
      fecha_registro: newUser.fecha_registro,
    });
    return true;
  }

  logout(): void {
    this._usuario.set(null);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this._usuario() !== null;
  }
}
