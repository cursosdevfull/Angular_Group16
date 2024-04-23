import { ScheduleEntity } from './schedule.entity';

export class ScheduleAPIPageDto {
  data!: ScheduleEntity[];
  total!: number;
  pageSize!: number;
  currentPage!: number;
  totalPages!: number;
}

export interface SchedulePageApi {
  provider: string;
  result: {
    response: ScheduleAPIPageDto;
    status: string;
    statusCode: number;
    statusCodeId: string;
  };
}

export class SchedulePageDto {
  static fromDataToEntity(data: SchedulePageApi): ScheduleAPIPageDto {
    return data.result.response;
  }
}
