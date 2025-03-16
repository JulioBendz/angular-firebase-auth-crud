import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // ✅ Importa RouterModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // ✅ Agrega RouterModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: () => this.errorMessage = 'Error al registrar. Inténtalo de nuevo.'
    });
  }
}
