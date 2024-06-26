import { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { instance } from "./http-client.constants";
import storageService from "../storage/storage.service";
import toastErrorHandler, { ToastErrorHandler } from "./toast-error-handler";

export interface IHttpClient {
  get<T>(url: string, isAuth?: boolean, headers?: Record<string, string>): Promise<T | null>

  post<T>(url: string, data?: any, isAuth?: boolean, headers?: Record<string, string>): Promise<T | null>
}
class HttpClient implements IHttpClient {
  private readonly axios: AxiosInstance;
  private readonly errorHandler: ToastErrorHandler;

  constructor() {
    this.axios = instance;
    this.errorHandler = toastErrorHandler;
  }

  private getAuthHeader(token?: string) {
    const accessToken = storageService.getAccessToken();

    const tokenType = 'Bearer';

    return {
      Authorization: `${tokenType} ${token ?? accessToken}`,
    };
  }

  async get<T>(url: string, isAuth = false, headers?: Record<string, string>) {
    let configs = {};

    if (isAuth) {
      configs = { headers: { ...this.getAuthHeader(), ...headers } }
    }

    try {
      const res = await this.axios.get<T>(url, configs);
      return res?.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status !== HttpStatusCode.Unauthorized) {
        this.errorHandler.handle(error.message, 'error');
      }
      console.log(error);
    }

    return null;
  }

  async post<T>(url: string, data?: any, isAuth = false, headers?: Record<string, string>) {
    let configs = {};

    if (isAuth) {
      configs = { ...configs, headers: { ...this.getAuthHeader(), ...headers } }
    }

    try {
      const res = await this.axios.post<T>(url, data, configs);
      return res?.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status !== HttpStatusCode.Unauthorized) {
        this.errorHandler.handle(error.message, 'error');
      }
      console.log(error);
    }

    return null;
  }
}

export default new HttpClient();