import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/user';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';
import { UserAPIPageDto } from './dtos/user-page.dto';

@Injectable()
export class UserApplication {
  constructor(
    @Inject(UserInfrastructure)
    private readonly userRepository: UserRepository
  ) {}

  create(user: User): Observable<any> {
    return this.userRepository.create(user);
  }
  update(user: User): Observable<any> {
    return this.userRepository.update(user);
  }
  delete(userId: string): Observable<any> {
    return this.userRepository.delete(userId);
  }
  get(userId: string): Observable<any> {
    return this.userRepository.get(userId);
  }
  getAll(): Observable<any> {
    return this.userRepository.getAll();
  }
  getByPage(page: number, pageSize: number): Observable<UserAPIPageDto> {
    return this.userRepository.getByPage(page, pageSize);
  }
}
