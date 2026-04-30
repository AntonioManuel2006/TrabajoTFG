import { Injectable, signal } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private _pedidos = signal<Pedido[]>(this.load());

  pedidos = this._pedidos.asReadonly();

  private load(): Pedido[] {
    const stored = localStorage.getItem('pedidos');
    return stored ? JSON.parse(stored) : [];
  }

  private save(): void {
    localStorage.setItem('pedidos', JSON.stringify(this._pedidos()));
  }

  addPedido(pedido: Pedido): void {
    this._pedidos.set([pedido, ...this._pedidos()]);
    this.save();
  }

  getPedidosByUsuario(usuarioId: number): Pedido[] {
    return this._pedidos().filter(p => p.usuario_id === usuarioId);
  }

  getPedidoById(id: number): Pedido | undefined {
    return this._pedidos().find(p => p.id === id);
  }
}
