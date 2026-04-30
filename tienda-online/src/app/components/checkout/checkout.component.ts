import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { AirtableService } from '../../core/services/airtable.service';
import { GeminiService } from '../../core/services/gemini.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  carrito = inject(CarritoService);
  auth = inject(AuthService);
  private pedidosSvc = inject(PedidosService);
  private airtable = inject(AirtableService);
  private gemini = inject(GeminiService);
  private router = inject(Router);

  orderPlaced = signal(false);
  orderNumber = signal('');
  orderTotal = signal(0);
  formError = signal(false);

  form = {
    nombre: this.auth.usuario()?.nombre ?? '',
    apellidos: this.auth.usuario()?.apellidos ?? '',
    email: this.auth.usuario()?.email ?? '',
    telefono: this.auth.usuario()?.telefono ?? '',
    direccion: this.auth.usuario()?.direcciones?.[0]?.direccion ?? '',
    ciudad: this.auth.usuario()?.direcciones?.[0]?.ciudad ?? '',
    provincia: this.auth.usuario()?.direcciones?.[0]?.provincia ?? '',
    cp: this.auth.usuario()?.direcciones?.[0]?.cp ?? '',
    pais: this.auth.usuario()?.direcciones?.[0]?.pais ?? 'España',
  };

  async placeOrder(): Promise<void> {
    if (!this.form.nombre || !this.form.apellidos || !this.form.email ||
        !this.form.direccion || !this.form.ciudad || !this.form.provincia || !this.form.cp) {
      this.formError.set(true);
      return;
    }
    this.formError.set(false);

    const subtotal = this.carrito.total();
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    const num = `TFG-${Date.now().toString().slice(-6)}`;
    const usuario = this.auth.usuario();
    const items = [...this.carrito.items()];

    this.pedidosSvc.addPedido({
      id: Date.now(),
      usuario_id: usuario?.id ?? 0,
      direccion: {
        id: 0,
        usuario_id: usuario?.id ?? 0,
        direccion: this.form.direccion,
        ciudad: this.form.ciudad,
        provincia: this.form.provincia,
        cp: this.form.cp,
        pais: this.form.pais,
      },
      fecha: new Date().toISOString(),
      total,
      estado: 'pendiente',
      items,
    });

    this.orderNumber.set(num);
    this.orderTotal.set(total);
    this.carrito.clearCart();
    this.orderPlaced.set(true);

    if (usuario?.email) {
      const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
      const analysis = await this.gemini.analyzePurchase(items, total, nombreCompleto);
      await this.airtable.updatePurchaseAnalysis(usuario.email, analysis);
    }
  }
}
