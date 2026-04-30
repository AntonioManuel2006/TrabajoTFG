import { Component, inject, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../core/services/translate.service';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { CarritoService } from '../../core/services/carrito.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RippleDirective } from '../../shared/directives/ripple.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe, RippleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  ts = inject(TranslateService);
  theme = inject(ThemeService);
  auth = inject(AuthService);
  badgePop = signal(false);
  carrito = inject(CarritoService);
  private router = inject(Router);

  searchQuery = '';
  navOpen = signal(false);
  private prevQty = 0;

  constructor() {
    effect(() => {
      const qty = this.carrito.cantidadTotal();
      if (qty > this.prevQty) {
        untracked(() => this.badgePop.set(true));
        setTimeout(() => untracked(() => this.badgePop.set(false)), 450);
      }
      this.prevQty = qty;
    });
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/buscar'], { queryParams: { q: this.searchQuery.trim() } });
      this.navOpen.set(false);
    }
  }

  onSearchInput(): void {
    if (this.searchQuery.trim().length >= 3) {
      this.router.navigate(['/buscar'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
