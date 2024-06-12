import httpClient, { IHttpClient } from "../../lib/http-client/http-client";
import storageService from "../../lib/storage/storage.service";
import { ILoginUser } from "./interfaces/login-user.interface";
import { IRegisterUser } from "./interfaces/register-user.interface";
import { ITokensResponse } from "./interfaces/tokens-response.interface";
import {User} from "../../types/user";

class AuthService {
  private readonly httpClient: IHttpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async register(user: IRegisterUser): Promise<void> {
    await this.httpClient.post('/auth/register', user);
  }

  async verify(emailToken: string): Promise<void> {
    const tokens = await this.httpClient.post<ITokensResponse>('/auth/verify/' + emailToken);

    storageService.setTokens(tokens!.accessToken, tokens!.refreshToken);

  }

  async login(user: ILoginUser): Promise<void> {
    const tokens = await this.httpClient.post<ITokensResponse>('/auth/login', user);

    if (tokens) {
      storageService.setTokens(tokens!.accessToken, tokens!.refreshToken);
    }

  }

  async getProfile() {
    return await this.httpClient.get<User>('/auth/me', true);
  }
}

export default new AuthService()