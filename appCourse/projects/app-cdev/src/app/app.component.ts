import { Component } from '@angular/core';

import { PerfilComponent } from './perfil/perfil.component';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [PerfilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';
}
