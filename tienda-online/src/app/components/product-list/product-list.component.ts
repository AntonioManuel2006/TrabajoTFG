import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { Producto } from '../../core/models/producto.model';
import { TranslateService } from '../../core/services/translate.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe, RevealDirective, TiltDirective, RippleDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private ps = inject(ProductosService);
  private carritoSvc = inject(CarritoService);
  private ts = inject(TranslateService);

  productosFiltrados: Producto[] = [];
  categorias: any[] = [];
  marcas: any[] = [];
  sortBy = 'default';
  maxPrecio = 2500;

  toastVisible = signal(false);
  toastMsg = signal('');

  ngOnInit(): void {
    this.categorias = this.ps.getCategorias().map(c => ({ ...c, checked: false }));
    this.marcas = this.ps.getMarcas().map(m => ({ ...m, checked: false }));
    this.applyFilters();
  }

  applyFilters(): void {
    let productos = this.ps.getProductos();

    const catSeleccionadas = this.categorias.filter(c => c.checked).map(c => c.id);
    if (catSeleccionadas.length > 0) {
      productos = productos.filter(p => catSeleccionadas.includes(p.categoria_id));
    }

    const marcasSeleccionadas = this.marcas.filter(m => m.checked).map(m => m.id);
    if (marcasSeleccionadas.length > 0) {
      productos = productos.filter(p => marcasSeleccionadas.includes(p.marca_id));
    }

    productos = productos.filter(p => p.precio <= this.maxPrecio);

    switch (this.sortBy) {
      case 'nameAsc': productos.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      case 'nameDesc': productos.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
      case 'priceAsc': productos.sort((a, b) => a.precio - b.precio); break;
      case 'priceDesc': productos.sort((a, b) => b.precio - a.precio); break;
    }

    this.productosFiltrados = productos;
  }

  resetFilters(): void {
    this.categorias.forEach(c => c.checked = false);
    this.marcas.forEach(m => m.checked = false);
    this.maxPrecio = 2500;
    this.sortBy = 'default';
    this.applyFilters();
  }

  getStars(val: number): number[] {
    return Array(Math.round(val)).fill(0);
  }

  getCatName(nombre: string): string {
    const map: Record<string, string> = {
      'Smartphones': this.ts.t('cat.smartphones'), 'Portátiles': this.ts.t('cat.laptops'),
      'Tablets': this.ts.t('cat.tablets'), 'Televisores': this.ts.t('cat.tvs'),
      'Auriculares': this.ts.t('cat.headphones'), 'Smartwatches': this.ts.t('cat.smartwatches'),
      'Consolas': this.ts.t('cat.consoles'), 'Accesorios': this.ts.t('cat.accessories'),
    };
    return map[nombre] ?? nombre;
  }

  addToCart(e: Event, producto: Producto): void {
    e.stopPropagation();
    this.carritoSvc.addToCart(producto);
    this.toastMsg.set(`${producto.nombre} añadido`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/eef2ff/6366f1?text=TechStore';
  }
}
