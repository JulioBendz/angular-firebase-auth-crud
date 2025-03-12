import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Importar FormsModule aquí también
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // ✅ Hacerlo standalone
  imports: [CommonModule, FormsModule], // ✅ Importar FormsModule aquí también
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('ProfileComponent cargado'); // Log para verificar carga
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.'
    });
  }
}
