import axios, { AxiosInstance } from 'axios';
import { bandConfig } from './config.js';

export class BandApiClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: bandConfig.baseUrl,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${bandConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    this.httpClient.interceptors.response.use(
      (response) => {
        if (response.status !== 200) {
          throw new Error(`Band API Error: HTTP CODE ${response.status} ${response.statusText}`);
        }
        if (response.data?.result_code !== undefined && response.data.result_code !== 1) {
          throw new Error(`Band API Error: RESULT CODE ${response.data.result_code}`);
        }
        if (response.data?.result_data) {
          return { ...response, data: response.data.result_data };
        }
        return response;
      },
      (error) => {
        console.error('Band API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.httpClient.get<T>(url, { params })
      .then(response => response.data)
      .catch(error => {
        console.error('GET request failed:', error);
        throw error;
      });
  }

  public post<T>(url: string, data?: Record<string, any>): Promise<T> {
    return this.httpClient.post<T>(url, data)
      .then(response => response.data)
      .catch(error => {
        console.error('POST request failed:', error);
        throw error;
      });
  }
  
}

// Singleton instance
export const bandApiClient = new BandApiClient();
