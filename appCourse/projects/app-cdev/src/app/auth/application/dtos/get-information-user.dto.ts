import { jwtDecode } from 'jwt-decode';

export interface IInformationUser {
  id: string;
  name: string;
  lastname: string;
  roles: string[];
  image: string;
  is2FAEnabled: boolean;
}

export interface IPayload {
  id: string;
  name: string;
  lastname: string;
  roles: { roleId: string; name: string }[];
  image: string;
  is2FAEnabled: boolean;
}

export class GetInformationUserDto {
  static fromTokenToInformationUser(accessToken: string): IInformationUser {
    const payload: IPayload = jwtDecode(accessToken);
    return {
      id: payload.id,
      name: payload.name,
      lastname: payload.lastname,
      roles: payload.roles.map((el) => el.name),
      image: payload.image,
      is2FAEnabled: payload.is2FAEnabled,
    };
  }
}
