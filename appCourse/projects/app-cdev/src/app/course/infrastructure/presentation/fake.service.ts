import { Course } from '../../domain/course';

export class FakeService {
  private courses: Course[] = [];

  listCourses(): Course[] {
    return [...this.courses];
  }
}
