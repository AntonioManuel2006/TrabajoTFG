import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authSvc = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal(false);
  loading = signal(false);
  showPwd = signal(false);

  submit(): void {
    if (!this.email || !this.password) { this.error.set(true); return; }
    this.loading.set(true);
    setTimeout(() => {
      const ok = this.authSvc.login(this.email, this.password);
      this.loading.set(false);
      if (ok) {
        this.router.navigate(['/']);
      } else {
        this.error.set(true);
      }
    }, 600);
  }
}
