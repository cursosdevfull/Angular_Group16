import { Observable } from 'rxjs';

import { CourseAPIPageDto } from '../../application/dtos/course-page.dto';
import { Course } from '../course';

export interface CourseRepository {
  create(course: Course): Observable<any>;
  update(course: Course): Observable<any>;
  delete(courseId: string): Observable<any>;
  get(courseId: string): Observable<any>;
  getAll(): Observable<any>;
  getByPage(page: number, pageSize: number): Observable<CourseAPIPageDto>;
}
