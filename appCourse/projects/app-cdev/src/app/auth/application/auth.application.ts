import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

import { AuthRegister } from '../../core/domain/roots/auth-register';
import { StorageApplication } from '../../storage/application/storage.application';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthInfrastructure } from '../infrastructure/auth.infrastructure';
import { IResponseLogin, LoginDto } from '../infrastructure/dtos/login.dto';
import {
  IResponseRegister,
  RegisterDto,
} from '../infrastructure/dtos/register.dto';
import {
  GetInformationUserDto,
  IInformationUser,
} from './dtos/get-information-user.dto';

@Injectable()
export class AuthApplication {
  private readonly informationUser =
    new BehaviorSubject<IInformationUser | null>(null);

  constructor(
    @Inject(AuthInfrastructure) private readonly authRepository: AuthRepository,
    private readonly storageApplication: StorageApplication,
    private readonly router: Router
  ) {}

  login(email: string, password: string, recaptcha: string) {
    return this.authRepository
      .login(email, password, recaptcha)
      .pipe(
        map((el: unknown) => LoginDto.fromDataToRequest(el as IResponseLogin))
      );
  }

  verify2fa(token: string, accessTokenProvisional: string) {
    return this.authRepository
      .verify2fa(token, accessTokenProvisional)
      .pipe(
        map((el: unknown) => LoginDto.fromDataToRequest(el as IResponseLogin))
      );
  }

  register(authRegister: AuthRegister) {
    return this.authRepository
      .register(authRegister)
      .pipe(
        map((el: unknown) =>
          RegisterDto.fromDataToRequest(el as IResponseRegister)
        )
      );
  }

  enable2fa(token: string, secret: string, accessToken: string) {
    return this.authRepository.enable2fa(token, secret, accessToken);
  }

  setInformationUser(accessToken: string) {
    const data = GetInformationUserDto.fromTokenToInformationUser(accessToken);
    this.informationUser.next(data);
  }

  getInformationUser() {
    return this.informationUser.asObservable();
  }

  logout() {
    this.storageApplication.clear();
    this.informationUser.next(null);
    this.router.navigate(['/auth/login']);
  }

  get isUserLogged() {
    const accessToken = this.storageApplication.get('accessToken');
    if (accessToken) {
      const data =
        GetInformationUserDto.fromTokenToInformationUser(accessToken);
      return data.is2FAEnabled ? true : false;
    }

    return false;
  }

  get rolesUser(): string[] {
    const accessToken = this.storageApplication.get('accessToken');
    if (accessToken) {
      const data =
        GetInformationUserDto.fromTokenToInformationUser(accessToken);
      return data.roles;
    }

    return [];
  }
}
