import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../domain/course';
import { CourseRepository } from '../domain/repositories/course.repository';
import { CourseInfrastructure } from '../infrastructure/course.infrastructure';
import { CourseAPIPageDto } from './dtos/course-page.dto';

@Injectable()
export class CourseApplication {
  constructor(
    @Inject(CourseInfrastructure)
    private readonly courseRepository: CourseRepository
  ) {}

  create(course: Course): Observable<any> {
    return this.courseRepository.create(course);
  }
  update(course: Course): Observable<any> {
    return this.courseRepository.update(course);
  }
  delete(courseId: string): Observable<any> {
    return this.courseRepository.delete(courseId);
  }
  get(courseId: string): Observable<any> {
    return this.courseRepository.get(courseId);
  }
  getAll(): Observable<any> {
    return this.courseRepository.getAll();
  }
  getByPage(page: number, pageSize: number): Observable<CourseAPIPageDto> {
    return this.courseRepository.getByPage(page, pageSize);
  }
}
