import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | null = null;
  dni: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('ProfileComponent cargado'); // Log para verificar carga
    this.authService.getUser().subscribe((user) => {
      console.log('Usuario obtenido:', user); // Log para verificar usuario
      this.user = user;
      if (user) {
        this.loadUserData(user.uid);
      }
    });
  }

  loadUserData(uid: string) {
    this.authService.getUserData(uid).subscribe((data) => {
      if (data && data.dni) {
        this.dni = data.dni; // Asigna el DNI si existe
      } else {
        console.warn('No se encontraron datos del usuario en Firestore.');
        this.dni = ''; // Establece un valor predeterminado
      }
    });
  }

  updateDNI() {
    if (this.user) {
      this.authService.updateDNI(this.user.uid, this.dni).subscribe(() => {
        alert('DNI actualizado correctamente.');
      });
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}