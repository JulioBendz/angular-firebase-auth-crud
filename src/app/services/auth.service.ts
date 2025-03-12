import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // ✅ Registro de usuario con email y contraseña + Guardar en Firestore
  register(email: string, password: string, dni: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((userCredential) => {
        if (userCredential.user) {
          this.saveUserData(userCredential.user.uid, email, dni);
        }
      })
    );
  }

  // ✅ Guardar datos del usuario en Firestore (se suscribe internamente)
  private saveUserData(uid: string, email: string, dni: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(setDoc(userRef, { uid, email, dni })).pipe(
      catchError((error) => {
        console.error('Error al guardar usuario en Firestore:', error);
        throw error; // Propaga el error para que pueda ser manejado en el componente
      })
    );
  }

  // ✅ Obtener usuario autenticado
  getUser(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }

  // ✅ Obtener datos del usuario desde Firestore
  getUserData(uid: string): Observable<any | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userRef)).pipe(
      map((docSnap) => (docSnap.exists() ? docSnap.data() : null))
    );
  }

  // ✅ Actualizar el DNI del usuario
  updateDNI(uid: string, newDni: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(updateDoc(userRef, { dni: newDni }));
  }

  // ✅ Inicio de sesión con email y contraseña
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // ✅ Cerrar sesión
  logout() {
    return from(signOut(this.auth));
  }
}