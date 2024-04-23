import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import env from '../../../assets/env.json';
import { AuthRegister } from '../../core/domain/roots/auth-register';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { ResponseInfo } from './dtos/get-new-access-token';
import { LoginInfo } from './dtos/login.dto';
import { RegisterInfo } from './dtos/register.dto';

@Injectable()
export class AuthInfrastructure implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  login(
    email: string,
    password: string,
    recaptchaCode: string
  ): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(`${env.urlApi}/v1/auth/login`, {
      email,
      password,
      recaptchaCode,
    });
  }

  verify2fa(
    token: string,
    accessTokenProvisional: string
  ): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(
      `${env.urlApi}/v1/auth/verify-2fa`,
      {
        token,
      },
      {
        headers: { Authorization: `Bearer ${accessTokenProvisional}` },
      }
    );
  }

  register(authRegister: AuthRegister): Observable<RegisterInfo> {
    return this.http.post<RegisterInfo>(
      `${env.urlApi}/v1/auth/register`,
      authRegister.properties
    );
  }

  enable2fa(
    token: string,
    secret: string,
    accessToken: string
  ): Observable<RegisterInfo> {
    return this.http.post<RegisterInfo>(
      `${env.urlApi}/v1/auth/enable-2fa`,
      {
        secret,
        token,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }

  getNewAccessToken(refreshToken: string): Observable<ResponseInfo> {
    return this.http.post<ResponseInfo>(
      `${env.urlApi}/v1/auth/get-new-access-token`,
      {
        refreshToken,
      }
    );
  }
}
