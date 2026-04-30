import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authSvc = inject(AuthService);
  private router = inject(Router);

  form = { nombre: '', apellidos: '', email: '', password: '', confirmPassword: '', telefono: '' };
  errorMsg = signal('');
  loading = signal(false);
  showPwd = signal(false);

  pwdStrength(): number {
    const p = this.form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score++;
    if (/[!@#$%^&*]/.test(p)) score++;
    return score;
  }

  pwdStrengthLabel(): string {
    return ['Débil', 'Media', 'Fuerte'][this.pwdStrength()] ?? '';
  }

  pwdStrengthColor(): string {
    return ['var(--danger)', 'var(--warning)', 'var(--success)'][this.pwdStrength()] ?? 'var(--danger)';
  }

  submit(): void {
    this.errorMsg.set('');
    if (!this.form.nombre || !this.form.apellidos || !this.form.email || !this.form.password) {
      this.errorMsg.set('Por favor, completa todos los campos obligatorios.'); return;
    }
    if (this.form.password !== this.form.confirmPassword) {
      this.errorMsg.set('Las contraseñas no coinciden.'); return;
    }
    if (this.form.password.length < 4) {
      this.errorMsg.set('La contraseña debe tener al menos 4 caracteres.'); return;
    }
    this.loading.set(true);
    setTimeout(() => {
      const ok = this.authSvc.register({
        nombre: this.form.nombre,
        apellidos: this.form.apellidos,
        email: this.form.email,
        password: this.form.password,
        telefono: this.form.telefono,
      });
      this.loading.set(false);
      if (ok) {
        this.router.navigate(['/']);
      } else {
        this.errorMsg.set('Este email ya está registrado.');
      }
    }, 600);
  }
}
