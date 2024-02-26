import { Inject, Injectable } from '@angular/core';

import { Course } from '../domain/course';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseInfrastructure } from '../infrastructure/presentation/course.infrastructure';

@Injectable()
export class CourseApplication {
  constructor(@Inject(CourseInfrastructure) private infra: CourseRepository) {}

  list() {
    return this.infra.getCourses();
  }

  create(course: Course) {
    this.infra.addCourse(course);
  }

  update(course: Course) {
    this.infra.updateCourse(course);
  }

  delete(courseId: string) {
    this.infra.removeCourse(courseId);
  }
}
