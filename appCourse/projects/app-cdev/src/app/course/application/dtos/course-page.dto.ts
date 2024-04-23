import { CourseEntity } from './course.entity';

export class CourseAPIPageDto {
  data!: CourseEntity[];
  total!: number;
  pageSize!: number;
  currentPage!: number;
  totalPages!: number;
}

export interface CoursePageApi {
  provider: string;
  result: {
    response: CourseAPIPageDto;
    status: string;
    statusCode: number;
    statusCodeId: string;
  };
}

export class CoursePageDto {
  static fromDataToEntity(data: CoursePageApi): CourseAPIPageDto {
    return data.result.response;
  }
}
