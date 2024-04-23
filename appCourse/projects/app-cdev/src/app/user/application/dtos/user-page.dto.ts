import { UserEntity } from './user.entity';

export class UserAPIPageDto {
  data!: UserEntity[];
  total!: number;
  pageSize!: number;
  currentPage!: number;
  totalPages!: number;
}

export interface UserPageApi {
  provider: string;
  result: {
    response: UserAPIPageDto;
    status: string;
    statusCode: number;
    statusCodeId: string;
  };
}

export class UserPageDto {
  static fromDataToEntity(data: UserPageApi): UserAPIPageDto {
    return data.result.response;
  }
}
