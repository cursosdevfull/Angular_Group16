import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

import { CourseApplication } from '../../../application/course.application';
import { Course } from '../../../domain/course';
import { CourseItemComponent } from '../course-item/course-item.component';

class CourseToken {}
class FakeToken {
  constructor() {
    console.log('FakeToken');
  }
}

@Component({
  selector: 'cdev-course-list',
  standalone: true,
  imports: [CourseItemComponent, NgForOf],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courses: Course[] = [];

  constructor(private readonly application: CourseApplication) {
    this.courses = this.application.list();
  }
}
