import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Auth, updateProfile, User, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName: string = '';
  email: string = '';
  dni: string = '';

  constructor(private authService: AuthService, private firestore: Firestore, private auth: Auth, private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.user = user;
        this.displayName = user.displayName || '';
        this.email = user.email || '';
  
        try {
          // 🔹 Buscar el usuario en Firestore
          const userDocRef = doc(this.firestore, `users/${this.user.uid}`);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            this.dni = userDocSnap.data()['dni'] || ''; 
          } else {
            // 🔹 Si no existe, crearlo con un DNI vacío
            await setDoc(userDocRef, { dni: '' });
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    });
  }
  

  async onUpdateProfile() {
    if (this.user) {
      try {
        // 🔹 Actualizar displayName en Firebase Authentication
        await updateProfile(this.user, { displayName: this.displayName });
  
        // 🔹 Guardar displayName y dni en Firestore
        const userDocRef = doc(this.firestore, `users/${this.user.uid}`);
        await updateDoc(userDocRef, { displayName: this.displayName, dni: this.dni });
  
        alert('Perfil actualizado con éxito');
      } catch (error) {
        console.error('Error al actualizar perfil:', error);
      }
    }
  }
  
  

  async logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
    }).catch(error => console.error('Error al cerrar sesión:', error));
  }
}
