import { Observable } from 'rxjs';

import { AuthRegister } from '../../../core/domain/roots/auth-register';
import { LoginInfo } from '../../infrastructure/dtos/login.dto';
import { RegisterInfo } from '../../infrastructure/dtos/register.dto';

export interface AuthRepository {
  login(
    email: string,
    password: string,
    recaptchaCode: string
  ): Observable<LoginInfo>;

  verify2fa(
    token: string,
    accessTokenProvisional: string
  ): Observable<LoginInfo>;

  register(authRegister: AuthRegister): Observable<RegisterInfo>;

  enable2fa(
    token: string,
    secret: string,
    accessToken: string
  ): Observable<RegisterInfo>;
}
