import { Injectable, signal, computed } from '@angular/core';
import { CarritoItem } from '../models/carrito.model';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private _items = signal<CarritoItem[]>(this.loadCart());

  items = this._items.asReadonly();

  total = computed(() =>
    this._items().reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0)
  );

  cantidadTotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.cantidad, 0)
  );

  private loadCart(): CarritoItem[] {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCart(): void {
    localStorage.setItem('carrito', JSON.stringify(this._items()));
  }

  addToCart(producto: Producto, cantidad = 1): void {
    const current = this._items();
    const idx = current.findIndex(i => i.producto.id === producto.id);
    if (idx >= 0) {
      const updated = [...current];
      updated[idx] = { ...updated[idx], cantidad: updated[idx].cantidad + cantidad };
      this._items.set(updated);
    } else {
      this._items.set([...current, { producto, cantidad }]);
    }
    this.saveCart();
  }

  removeFromCart(productoId: number): void {
    this._items.set(this._items().filter(i => i.producto.id !== productoId));
    this.saveCart();
  }

  updateQuantity(productoId: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeFromCart(productoId);
      return;
    }
    this._items.set(
      this._items().map(i =>
        i.producto.id === productoId ? { ...i, cantidad } : i
      )
    );
    this.saveCart();
  }

  clearCart(): void {
    this._items.set([]);
    this.saveCart();
  }

  hasItem(productoId: number): boolean {
    return this._items().some(i => i.producto.id === productoId);
  }
}
