import { AxiosInstance } from "axios";
import { instance } from "./http-client.constants";
import storageService from "../storage/storage.service";

class HttpClient {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  private getAuthHeader(token?: string) {
    const accessToken = storageService.getAccessToken();

    const tokenType = 'Bearer';

    return {
      Authorization: `${tokenType} ${token ?? accessToken}`,
    };
  }

  async get<T>(url: string, isAuth = false) {
    let configs = {};

    if (isAuth) {
      configs = { headers: this.getAuthHeader() }
    }

    try {
      const res = await this.axios.get<T>(url, configs);
      return res?.data;
    } catch (err) {
      alert('An error occured')
      console.log(err);
    }
  }

  async post<T>(url: string, data?: any, isAuth = false) {
    let configs = {};

    if (isAuth) {
      configs = { ...configs, headers: this.getAuthHeader() }
    }

    try {
      const res = await this.axios.post<T>(url, data, configs);
      return res?.data;
    } catch (err) {
      alert('An error occured')
      console.log(err);
    }
  }
}

export default new HttpClient();