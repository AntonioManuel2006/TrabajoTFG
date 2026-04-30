import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidosService } from '../../core/services/pedidos.service';
import { AuthService } from '../../core/services/auth.service';
import { Pedido } from '../../core/models/pedido.model';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent {
  auth = inject(AuthService);
  private pedidosSvc = inject(PedidosService);

  pedidos = computed(() => {
    const uid = this.auth.usuario()?.id;
    if (!uid) return [];
    return this.pedidosSvc.getPedidosByUsuario(uid);
  });

  getPedidoNum(pedido: Pedido): string {
    return `TFG-${pedido.id.toString().slice(-6)}`;
  }

  estadoLabel(estado: Pedido['estado']): string {
    const map: Record<string, string> = {
      pendiente: 'Pendiente', confirmado: 'Confirmado',
      enviado: 'Enviado', entregado: 'Entregado', cancelado: 'Cancelado'
    };
    return map[estado] ?? estado;
  }

  estadoBg(estado: Pedido['estado']): string {
    const map: Record<string, string> = {
      pendiente: 'rgba(245,158,11,.15)', confirmado: 'rgba(99,102,241,.15)',
      enviado: 'rgba(6,182,212,.15)', entregado: 'rgba(16,185,129,.15)',
      cancelado: 'rgba(239,68,68,.15)'
    };
    return map[estado] ?? 'rgba(0,0,0,.1)';
  }

  estadoColor(estado: Pedido['estado']): string {
    const map: Record<string, string> = {
      pendiente: '#d97706', confirmado: '#6366f1',
      enviado: '#0891b2', entregado: '#059669', cancelado: '#dc2626'
    };
    return map[estado] ?? '#6b7280';
  }

  estadoIcono(estado: Pedido['estado']): string {
    const map: Record<string, string> = {
      pendiente: 'bi-clock', confirmado: 'bi-check-circle',
      enviado: 'bi-truck', entregado: 'bi-check-circle-fill', cancelado: 'bi-x-circle'
    };
    return map[estado] ?? 'bi-circle';
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://placehold.co/60x60/eef2ff/6366f1?text=?';
  }
}
