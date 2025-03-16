import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; // ✅ Importar Firestore

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  dni: string = ''; // ✅ Agregar el campo DNI
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private firestore: Firestore) {} // ✅ Inyectamos Firestore

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: async (userCredential) => {
        const user = userCredential.user;
        
        // ✅ Guardar el DNI en Firestore
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(userDocRef, { dni: this.dni });

        this.router.navigate(['/profile']);
      },
      error: () => this.errorMessage = 'Error al registrar. Inténtalo de nuevo.'
    });
  }
}
