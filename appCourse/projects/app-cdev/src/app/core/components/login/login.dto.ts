export interface IResponseLogin {
  provider: string;
  status: string;
  statusCodeId: string;
  statusCode: number;
  result: {
    response: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export class LoginInfo {
  accessToken!: string;
  refreshToken!: string;
}

export class LoginDto {
  static fromDataToRequest(data: IResponseLogin): LoginInfo {
    const loginInfo = new LoginInfo();
    loginInfo.accessToken = data.result.response.accessToken;
    loginInfo.refreshToken = data.result.response.refreshToken;

    return loginInfo;
  }
}
