import { HttpClient } from '@angular/common/http';

import env from '../../../assets/env.json';

export class CourseInfrastructure {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get(`${env.urlApi}/v1/course`);
  }
}
