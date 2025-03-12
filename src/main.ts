import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)), // 🔹 Inicializar Firebase
    provideFirestore(() => getFirestore()), // 🔹 Habilitar Firestore
  ]
}).catch((err) => console.error(err));