import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  dni = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('ProfileComponent cargado'); // Log para verificar carga

  }

  register() {
    if (!this.email || !this.password || !this.dni) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.authService.register(this.email, this.password, this.dni).subscribe(
      () => {
        alert('Usuario registrado con éxito.');
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error(error);
        alert('Error en el registro: ' + error.message);
      }
    );
  }
}
