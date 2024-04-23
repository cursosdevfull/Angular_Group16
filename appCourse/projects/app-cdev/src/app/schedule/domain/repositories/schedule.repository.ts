import { Observable } from 'rxjs';

import { ScheduleAPIPageDto } from '../../application/dtos/schedule-page.dto';
import { Schedule } from '../schedule';

export interface ScheduleRepository {
  create(schedule: Schedule): Observable<any>;
  update(schedule: Schedule): Observable<any>;
  delete(scheduleId: string): Observable<any>;
  get(scheduleId: string): Observable<any>;
  getAll(): Observable<any>;
  getByPage(page: number, pageSize: number): Observable<ScheduleAPIPageDto>;
}
