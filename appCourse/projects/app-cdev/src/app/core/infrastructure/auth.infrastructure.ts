import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthRegisterDto } from './dtos/auth-register.dto';

export interface IRegister {
  accessToken: string;
  secret: string;
  qrCode: string;
}

export interface IInputUserRegister {
  status: string;
  statusCode: number;
  result: {
    response: {
      value: {
        accessToken: string;
        refreshToken: string;
      };
      secret: string;
      qrCode: string;
    };
  };
}

@Injectable()
export class AuthInfrastructure implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  create(auth: Auth): Observable<any> {
    return this.http
      .post('http://localhost:4000/auth/register', auth.properties)
      .pipe(
        distinctUntilChanged<any>(),
        map(AuthRegisterDto.fromDataToResponse)
      );

    /* return of({
      status: 'success',
      statusCode: 200,
      result: {
        response: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU',
          refreshToken: '1110ca7b-8e2b-4f88-a80d-c0dbc693101c',
          secret: '1110ca7b-8e2b-4f88-a80d-c0dbc693101c',
          qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
        },
      },
    }).pipe(
      distinctUntilChanged(),
      delay(1000),
      map(AuthRegisterDto.fromDataToResponse)
    ); */
  }

  toString() {
    return 'AuthInfrastructure';
  }
}
