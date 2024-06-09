export interface IAccessToken {
  accessToken: string;
}

export interface IJwtTokens extends IAccessToken {
  refreshToken: string;
}
