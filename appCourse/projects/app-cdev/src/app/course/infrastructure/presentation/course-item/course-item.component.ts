import { Component, Input } from '@angular/core';

import { Course } from '../../../domain/course';

@Component({
  selector: 'cdev-course-item',
  standalone: true,
  imports: [],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
})
export class CourseItemComponent {
  @Input() course!: Course;
}
