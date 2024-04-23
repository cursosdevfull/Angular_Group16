import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import env from '../../../assets/env.json';
import { StorageApplication } from '../../storage/application/storage.application';
import {
  ScheduleAPIPageDto,
  SchedulePageDto,
} from '../application/dtos/schedule-page.dto';
import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { Schedule } from '../domain/schedule';

@Injectable()
export class ScheduleInfrastructure implements ScheduleRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageApplication
  ) {}

  create(schedule: Schedule): Observable<any> {
    return this.http.post(`${env.urlApi}/v1/schedule`, schedule);
  }
  update(schedule: Schedule): Observable<any> {
    const { scheduleId, title, status } = schedule.properties;
    return this.http.put(`${env.urlApi}/v1/schedule/${scheduleId}`, {
      title,
      status,
    });
  }
  delete(scheduleId: string): Observable<any> {
    return this.http.delete(`${env.urlApi}/v1/schedule/${scheduleId}`);
  }
  get(scheduleId: string): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/schedule/${scheduleId}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/schedule`);
  }
  getByPage(page: number, pageSize: number): Observable<ScheduleAPIPageDto> {
    return this.http
      .get<ScheduleAPIPageDto>(
        `${env.urlApi}/v1/schedule/page/${page}/size/${pageSize}`
      )
      .pipe(map((response: any) => SchedulePageDto.fromDataToEntity(response)));
  }
}
