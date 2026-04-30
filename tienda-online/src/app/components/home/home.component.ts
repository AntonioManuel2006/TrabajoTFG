import { Component, inject, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { Producto } from '../../core/models/producto.model';
import { Categoria } from '../../core/models/categoria.model';
import { TranslateService } from '../../core/services/translate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, RevealDirective, TiltDirective, RippleDirective, CounterDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private ps = inject(ProductosService);
  private carritoSvc = inject(CarritoService);
  private ts = inject(TranslateService);

  destacados: Producto[] = [];
  novedades: Producto[] = [];
  categorias: Categoria[] = [];
  destacadosHero: Producto[] = [];

  toastVisible = signal(false);
  toastMsg = signal('');
  typewriterText = signal('');
  typewriterDone = signal(false);

  private readonly fullText = 'La mejor tecnología';
  private twTimer: any;
  private twIdx = 0;

  // Partículas para el hero
  particles = Array.from({ length: 18 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * -8,
  }));

  ngOnInit(): void {
    this.destacados = this.ps.getProductosDestacados();
    this.novedades = this.ps.getNovedades();
    this.categorias = this.ps.getCategorias();
    this.destacadosHero = this.ps.getProductosDestacados().slice(0, 4);
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    clearTimeout(this.twTimer);
  }

  private startTypewriter(): void {
    if (this.twIdx <= this.fullText.length) {
      this.typewriterText.set(this.fullText.slice(0, this.twIdx));
      this.twIdx++;
      this.twTimer = setTimeout(() => this.startTypewriter(), 65);
    } else {
      this.typewriterDone.set(true);
    }
  }

  getStars(val: number): number[] {
    return Array(Math.round(val)).fill(0);
  }

  getCatName(cat: Categoria): string {
    const map: Record<string, string> = {
      'Smartphones': this.ts.t('cat.smartphones'), 'Portátiles': this.ts.t('cat.laptops'),
      'Tablets': this.ts.t('cat.tablets'), 'Televisores': this.ts.t('cat.tvs'),
      'Auriculares': this.ts.t('cat.headphones'), 'Smartwatches': this.ts.t('cat.smartwatches'),
      'Consolas': this.ts.t('cat.consoles'), 'Accesorios': this.ts.t('cat.accessories'),
    };
    return map[cat.nombre] ?? cat.nombre;
  }

  addToCart(e: Event, producto: Producto): void {
    e.stopPropagation();
    this.carritoSvc.addToCart(producto);
    this.toastMsg.set(`${producto.nombre} añadido al carrito`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/eef2ff/6366f1?text=TechStore';
  }
}
