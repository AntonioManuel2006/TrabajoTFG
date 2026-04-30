import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Producto } from '../../core/models/producto.model';
import { Categoria } from '../../core/models/categoria.model';
import { TranslateService } from '../../core/services/translate.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  private ps = inject(ProductosService);
  private carritoSvc = inject(CarritoService);
  private route = inject(ActivatedRoute);
  private ts = inject(TranslateService);

  categoriaId = 0;
  categoria: Categoria | undefined;
  productos: Producto[] = [];
  todasCategorias: Categoria[] = [];
  sortBy = 'default';

  toastVisible = signal(false);
  toastMsg = signal('');

  private catNames: Record<string, string> = {
    'Smartphones': 'cat.smartphones', 'Portátiles': 'cat.laptops',
    'Tablets': 'cat.tablets', 'Televisores': 'cat.tvs',
    'Auriculares': 'cat.headphones', 'Smartwatches': 'cat.smartwatches',
    'Consolas': 'cat.consoles', 'Accesorios': 'cat.accessories',
  };

  ngOnInit(): void {
    this.todasCategorias = this.ps.getCategorias();
    this.route.params.subscribe(params => {
      this.categoriaId = +params['id'];
      this.categoria = this.todasCategorias.find(c => c.id === this.categoriaId);
      this.productos = this.ps.getProductosByCategoria(this.categoriaId);
    });
  }

  applySort(): void {
    const base = this.ps.getProductosByCategoria(this.categoriaId);
    switch (this.sortBy) {
      case 'nameAsc': base.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      case 'priceAsc': base.sort((a, b) => a.precio - b.precio); break;
      case 'priceDesc': base.sort((a, b) => b.precio - a.precio); break;
    }
    this.productos = base;
  }

  getCatName(): string {
    if (!this.categoria) return '';
    return this.ts.t(this.catNames[this.categoria.nombre] ?? this.categoria.nombre);
  }

  getCatNameById(nombre: string): string {
    return this.ts.t(this.catNames[nombre] ?? nombre);
  }

  getStars(val: number): number[] { return Array(Math.round(val)).fill(0); }

  addToCart(e: Event, producto: Producto): void {
    e.stopPropagation();
    this.carritoSvc.addToCart(producto);
    this.toastMsg.set(`${producto.nombre} añadido`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }
}
