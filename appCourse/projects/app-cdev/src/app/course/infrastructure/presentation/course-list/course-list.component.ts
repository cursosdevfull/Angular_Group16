import { NgForOf } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseApplication } from '../../../application/course.application';
import { Course } from '../../../domain/course';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseItemComponent } from '../course-item/course-item.component';

@Component({
  selector: 'cdev-course-list',
  standalone: true,
  imports: [CourseItemComponent, CourseFormComponent, NgForOf, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courses: WritableSignal<Course[]>;

  constructor(private readonly application: CourseApplication) {
    this.courses = this.application.list();
  }
}
