import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { CourseListComponent } from './course/infrastructure/presentation/course-list/course-list.component';
import { ILayout } from './modules/layout/layout.interface';
import { LAYOUT_OPTIONS_TOKEN } from './modules/layout/layout.token';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [
    CourseListComponent,
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
  isVisible = false;

  constructor(@Inject(LAYOUT_OPTIONS_TOKEN) private layoutOptions: ILayout) {
    console.log(layoutOptions);
    this.isVisible = layoutOptions.showMenu;
  }
}
