import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 🔥 Importar CommonModule

@Component({
  selector: 'app-root',
  standalone: true, // 🔥 Hacerlo standalone
  imports: [CommonModule, RouterOutlet], // 🔥 Importar RouterOutlet correctamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFirebaseAuthentication';
}

