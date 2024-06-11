import httpClient, { IHttpClient } from "../../lib/http-client/http-client";
import storageService from "../../lib/storage/storage.service";
import { ILoginUser } from "./interfaces/login-user.interface";
import { IRegisterUser } from "./interfaces/register-user.interface";
import { ITokensResponse } from "./interfaces/tokens-response.interface";

class AuthService {
  private readonly httpClient: IHttpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async register(user: IRegisterUser): Promise<void> {
    await this.httpClient.post('/auth/register', user);
  }

  async verify(emailToken: string): Promise<ITokensResponse | null> {
    const tokens = await this.httpClient.post<ITokensResponse>('/auth/verify/' + emailToken);

    storageService.setTokens(tokens!.accessToken, tokens!.refreshToken);

    return tokens;
  }

  async login(user: ILoginUser): Promise<ITokensResponse | null> {
    const tokens = await this.httpClient.post<ITokensResponse>('/auth/login', user);

    if (tokens) {
      storageService.setTokens(tokens!.accessToken, tokens!.refreshToken);
    }

    return tokens;
  }

  async getProfile() {
    return await this.httpClient.get('/auth/me', true);
  }
}

export default new AuthService()