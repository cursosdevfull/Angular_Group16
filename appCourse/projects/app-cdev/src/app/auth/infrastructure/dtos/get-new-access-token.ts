export interface IResponseGetNewAccessToken {
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

export class ResponseInfo {
  accessToken!: string;
  refreshToken!: string;
}

export class ResponseGetNewAccessTokenDto {
  static fromDataToRequest(data: IResponseGetNewAccessToken): ResponseInfo {
    const requestInfo = new ResponseInfo();
    requestInfo.accessToken = data.result.response.accessToken;
    requestInfo.refreshToken = data.result.response.refreshToken;

    return requestInfo;
  }
}
