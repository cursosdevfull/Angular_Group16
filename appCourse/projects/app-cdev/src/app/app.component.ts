import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { ILayout } from './modules/layout/layout.interface';
import { LayoutService } from './modules/layout/layout.service';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    PageLoginComponent,
    RouterModule,
    MenuComponent,
    HeaderComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';
  isVisibleMenu = false;
  isVisibleHeader = false;

  constructor(private layoutService: LayoutService) {
    layoutService.configuration.subscribe({
      next: (config: ILayout) => {
        this.isVisibleMenu = config.showMenu;
        this.isVisibleHeader = config.showHeader;
      },
    });
  }
}
