import { Component } from '@angular/core';

import { CourseListComponent } from './course/infrastructure/presentation/course-list/course-list.component';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [CourseListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';
}
