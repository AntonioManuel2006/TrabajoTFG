import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private ps = inject(ProductosService);
  private carritoSvc = inject(CarritoService);
  private route = inject(ActivatedRoute);

  query = '';
  resultados: Producto[] = [];
  resultadosFiltrados: Producto[] = [];
  sortBy = 'default';
  maxPrecio = 2500;

  sortOptions = [
    { value: 'default', label: 'search.sortBy' },
    { value: 'priceAsc', label: 'search.sort.priceAsc' },
    { value: 'priceDesc', label: 'search.sort.priceDesc' },
    { value: 'nameAsc', label: 'search.sort.nameAsc' },
  ];

  toastVisible = signal(false);
  toastMsg = signal('');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] ?? '';
      this.resultados = this.ps.buscar(this.query);
      this.applySort();
    });
  }

  applySort(): void {
    let res = this.resultados.filter(p => p.precio <= this.maxPrecio);
    switch (this.sortBy) {
      case 'nameAsc': res.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      case 'nameDesc': res.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
      case 'priceAsc': res.sort((a, b) => a.precio - b.precio); break;
      case 'priceDesc': res.sort((a, b) => b.precio - a.precio); break;
    }
    this.resultadosFiltrados = res;
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
