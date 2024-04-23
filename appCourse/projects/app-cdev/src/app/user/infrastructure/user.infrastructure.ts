import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import env from '../../../assets/env.json';
import { StorageApplication } from '../../storage/application/storage.application';
import { UserAPIPageDto, UserPageDto } from '../application/dtos/user-page.dto';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/user';

@Injectable()
export class UserInfrastructure implements UserRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageApplication
  ) {}

  create(user: User): Observable<any> {
    return this.http.post(`${env.urlApi}/v1/user`, user);
  }
  update(user: User): Observable<any> {
    const { userId, name, lastname } = user.properties;
    return this.http.put(`${env.urlApi}/v1/user/${userId}`, {
      name,
      lastname,
    });
  }
  delete(userId: string): Observable<any> {
    return this.http.delete(`${env.urlApi}/v1/user/${userId}`);
  }
  get(userId: string): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/user/${userId}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${env.urlApi}/v1/user`);
  }
  getByPage(page: number, pageSize: number): Observable<UserAPIPageDto> {
    return this.http
      .get<UserAPIPageDto>(
        `${env.urlApi}/v1/user/page/${page}/size/${pageSize}`
      )
      .pipe(map((response: any) => UserPageDto.fromDataToEntity(response)));
  }
}
