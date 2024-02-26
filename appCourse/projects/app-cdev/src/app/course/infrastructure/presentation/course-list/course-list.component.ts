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
  //courseService: CourseService = inject(CourseService);

  constructor(
    private readonly application: CourseApplication /*@Inject(LAYOUT_OPTIONS)
    private readonly data: {
      menu: { visible: boolean };
      toolbar: { visible: boolean };
      footer: { visible: boolean };
    },
    @Inject('DATABASE_CONNECTION') private connection: string*/
  ) {
    this.courses = this.application.list();
    /*this.courses = this.courseService.getCourses();
    console.log('CourseListComponent', this.courses);
    console.log('LAYOUT_OPTIONS', this.data);
    console.log('DATABASE_CONNECTION', this.connection);*/
  }
}
