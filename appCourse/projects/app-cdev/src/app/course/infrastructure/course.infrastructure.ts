import { signal, WritableSignal } from '@angular/core';

import { Course } from '../domain/course';
import { CourseRepository } from '../domain/repositories/course.repository';

export class CourseInfrastructure implements CourseRepository {
  private courses: WritableSignal<Course[]> = signal([]);

  getCourses(): WritableSignal<Course[]> {
    return this.courses;
  }

  addCourse(course: Course): void {
    this.courses.update((courses) => [...courses, course]);
  }

  removeCourse(courseId: string): void {
    this.courses.update((courses) =>
      courses.filter((course) => course.properties.courseId !== courseId)
    );
  }

  updateCourse(course: Course): void {
    this.courses.update((courses) =>
      courses.map((c) =>
        c.properties.courseId === course.properties.courseId ? course : c
      )
    );
  }
}
