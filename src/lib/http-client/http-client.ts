import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class HttpClient {
  private axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL,
    });
  }

  private createConfig(
    config?: AxiosRequestConfig,
    loader?: boolean,
  ): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'X-Bypass-Loader': loader,
        ...config?.headers,
      },
    };
  }

  public async get<T>(
    url: string,
    loader?: boolean,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(
      url,
      this.createConfig(config, loader),
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data: unknown = {},
    loader?: boolean,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(
      url,
      data,
      this.createConfig(config, loader),
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data: unknown = {},
    loader?: boolean,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(
      url,
      data,
      this.createConfig(config, loader),
    );
    return response.data;
  }

  public async delete<T>(
    url: string,
    loader?: boolean,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(
      url,
      this.createConfig(config, loader),
    );
    return response.data;
  }
}
