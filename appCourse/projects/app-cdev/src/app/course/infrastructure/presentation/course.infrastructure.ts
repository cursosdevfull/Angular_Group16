//import { Injectable } from '@angular/core';
import { Course } from '../../domain/course';
import { CourseRepository } from '../../domain/repositories/course.repository';

//import { LogService } from '../../../core/services/log.service';
//@Injectable()
export class CourseInfrastructure implements CourseRepository {
  private courses: Course[] = [
    new Course({
      courseId: '2b165777-aa9e-4f28-858e-594d3d309ebd',
      title: 'Angular 17 PRO',
      slug: 'angular-17-pro',
      status: 'draft',
    }),
    new Course({
      courseId: '250dc657-eaa4-4f62-bae7-caac822fc2c8',
      title: 'Microservicios con Node.js y TypeScript',
      slug: 'microservicios-con-nodejs-y-typescript',
      status: 'draft',
    }),
    new Course({
      courseId: 'aec17323-3f3d-4690-be2a-b1ea66f993ce',
      title: 'Infraestructura como código con Pulumi',
      slug: 'infraestructura-como-codigo-con-pulumi',
      status: 'draft',
    }),
  ];

  //constructor(private logService: LogService) {}

  getCourses(): Course[] {
    //this.logService.log('Getting courses');
    return [...this.courses];
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  removeCourse(courseId: string): void {
    /*this.courses = this.courses.filter(
      (course) => course.properties.courseId !== courseId
    );*/
    const position = this.courses.findIndex(
      (course) => course.properties.courseId === courseId
    );
    this.courses.splice(position, 1);
  }

  updateCourse(course: Course): void {
    this.courses = this.courses.map((c) =>
      c.properties.courseId === course.properties.courseId ? course : c
    );
  }
}
