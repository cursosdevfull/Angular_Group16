import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthApplication } from '../../../auth/application/auth.application';

@Component({
  selector: 'cdev-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  imageAvatarUrl = '/assets/iconos/user.png';
  username = '';

  constructor(private readonly authApplication: AuthApplication) {
    this.authApplication.getInformationUser().subscribe((el) => {
      console.log('information user', el);
      if (el) {
        this.username = `${el.name} ${el.lastname}`;
        this.imageAvatarUrl = el.image ? el.image : this.imageAvatarUrl;
      }
    });
  }

  logout() {
    this.authApplication.logout();
  }
}
