import { Course } from '../course';

export interface CourseRepository {
  getCourses(): Course[];
  addCourse(course: Course): void;
  removeCourse(courseId: string): void;
  updateCourse(course: Course): void;
}
