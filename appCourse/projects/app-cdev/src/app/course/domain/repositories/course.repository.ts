import { WritableSignal } from '@angular/core';

import { Course } from '../course';

export interface CourseRepository {
  getCourses(): WritableSignal<Course[]>;
  addCourse(course: Course): void;
  removeCourse(courseId: string): void;
  updateCourse(course: Course): void;
}
