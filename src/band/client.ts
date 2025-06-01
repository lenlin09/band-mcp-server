import axios, { AxiosInstance } from 'axios';
import { bandConfig, BandUserProfile } from '../config/band.js';

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

  /**
   * Get user information
   * @see https://developers.band.us/develop/guide/api/get_user_information
   */
  async getUserInformation(band_key: string): Promise<BandUserProfile> {
    try {
      const response = await this.httpClient.get<BandUserProfile>(
        '/v2/profile', band_key ? { params: { band_key } } : {}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Singleton instance
export const bandApiClient = new BandApiClient();
