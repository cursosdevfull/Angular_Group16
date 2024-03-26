import { IInputUserRegister, IRegister } from '../auth.infrastructure';

export class AuthRegisterDto {
  static fromDataToResponse(data: IInputUserRegister): IRegister {
    return {
      accessToken: data.result.response.value.accessToken,
      secret: data.result.response.secret,
      qrCode: data.result.response.qrCode,
    };
  }
}
