import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { Schedule } from '../domain/schedule';
import { ScheduleInfrastructure } from '../infrastructure/schedule.infrastructure';
import { ScheduleAPIPageDto } from './dtos/schedule-page.dto';

@Injectable()
export class ScheduleApplication {
  constructor(
    @Inject(ScheduleInfrastructure)
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  create(schedule: Schedule): Observable<any> {
    return this.scheduleRepository.create(schedule);
  }
  update(schedule: Schedule): Observable<any> {
    return this.scheduleRepository.update(schedule);
  }
  delete(scheduleId: string): Observable<any> {
    return this.scheduleRepository.delete(scheduleId);
  }
  get(scheduleId: string): Observable<any> {
    return this.scheduleRepository.get(scheduleId);
  }
  getAll(): Observable<any> {
    return this.scheduleRepository.getAll();
  }
  getByPage(page: number, pageSize: number): Observable<ScheduleAPIPageDto> {
    return this.scheduleRepository.getByPage(page, pageSize);
  }
}
