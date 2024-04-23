import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import env from '../../../assets/env.json';
import { StorageApplication } from '../../storage/application/storage.application';
import {
  CourseAPIPageDto,
  CoursePageDto,
} from '../application/dtos/course-page.dto';
import { Course } from '../domain/course';
import { CourseRepository } from '../domain/repositories/course.repository';

@Injectable()
export class CourseInfrastructure implements CourseRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageApplication
  ) {}

  create(course: Course): Observable<any> {
    return this.http.post(`${env.urlApi}/v1/course`, course);
  }
  update(course: Course): Observable<any> {
    const { courseId, title, status } = course.properties;
    return this.http.put(`${env.urlApi}/v1/course/${courseId}`, {
      title,
      status,
    });
  }
  delete(courseId: string): Observable<any> {
    return this.http.delete(`${env.urlApi}/v1/course/${courseId}`);
  }
  get(courseId: string): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/course/${courseId}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/course`);
  }
  getByPage(page: number, pageSize: number): Observable<CourseAPIPageDto> {
    return this.http
      .get<CourseAPIPageDto>(
        `${env.urlApi}/v1/course/page/${page}/size/${pageSize}`
      )
      .pipe(map((response: any) => CoursePageDto.fromDataToEntity(response)));
  }
}
