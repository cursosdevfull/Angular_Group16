import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';

import { CourseApplication } from '../../../application/course.application';
import { Course, CourseProps } from '../../../domain/course';

@Component({
  selector: 'cdev-course-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
  title: string = '';
  slug: string = '';

  constructor(private readonly application: CourseApplication) {}

  addCourse() {
    const props: CourseProps = {
      courseId: uuidv4(),
      title: this.title,
      slug: this.slug,
    };

    const course = new Course(props);
    this.application.create(course);

    this.reset();
  }

  reset() {
    this.title = '';
    this.slug = '';
  }
}
