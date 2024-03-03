import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PageLoginComponent } from './core/pages/page-login/page-login.component';
import { CourseListComponent } from './course/infrastructure/presentation/course-list/course-list.component';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [CourseListComponent, MatSidenavModule, PageLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';
}
