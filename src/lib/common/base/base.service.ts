import { HttpClient } from '@lib/http-client';

export class BaseService {
  protected httpClient: HttpClient;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.httpClient = new HttpClient();
  }
}
