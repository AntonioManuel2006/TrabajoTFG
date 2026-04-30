import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Producto, Resena } from '../../core/models/producto.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private ps = inject(ProductosService);
  private carritoSvc = inject(CarritoService);
  private route = inject(ActivatedRoute);
  auth = inject(AuthService);

  producto: Producto | undefined;
  resenas: Resena[] = [];
  relacionados: Producto[] = [];

  activeTab = signal<'desc' | 'reviews'>('desc');
  cantidad = 1;
  newRating = signal(0);
  newComment = '';
  toastVisible = signal(false);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.producto = this.ps.getProductoById(id);
      if (this.producto) {
        this.resenas = this.ps.getResenasByProducto(id);
        this.relacionados = this.ps.getRelacionados(this.producto);
      }
    });
  }

  getStars(val: number): number[] { return Array(Math.round(val)).fill(0); }
  getEmptyStars(val: number): number[] { return Array(5 - Math.round(val)).fill(0); }

  getStarCount(n: number): number {
    return this.resenas.filter(r => r.valoracion === n).length;
  }

  getStarPercent(n: number): number {
    if (this.resenas.length === 0) return 0;
    return (this.getStarCount(n) / this.resenas.length) * 100;
  }

  incrementQty(): void { if (this.cantidad < (this.producto?.stock ?? 1)) this.cantidad++; }
  decrementQty(): void { if (this.cantidad > 1) this.cantidad--; }

  addToCart(): void {
    if (this.producto) {
      this.carritoSvc.addToCart(this.producto, this.cantidad);
      this.toastVisible.set(true);
      setTimeout(() => this.toastVisible.set(false), 2500);
    }
  }

  submitReview(): void {
    if (!this.newComment.trim() || this.newRating() === 0 || !this.producto) return;
    const u = this.auth.usuario();
    this.ps.addResena({
      producto_id: this.producto.id,
      usuario_id: u?.id ?? 0,
      usuario_nombre: u ? `${u.nombre} ${u.apellidos}` : 'Anónimo',
      valoracion: this.newRating(),
      comentario: this.newComment,
      fecha: new Date().toISOString().split('T')[0],
    });
    this.resenas = this.ps.getResenasByProducto(this.producto.id);
    this.producto = this.ps.getProductoById(this.producto.id);
    this.newComment = '';
    this.newRating.set(0);
  }
}
