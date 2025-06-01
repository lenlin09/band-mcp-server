import dotenv from 'dotenv';

dotenv.config();

export interface BandConfig {
  accessToken: string;
  baseUrl: string;
}

export const bandConfig: BandConfig = {
  accessToken: process.env.BAND_ACCESS_TOKEN || '',
  baseUrl: 'https://openapi.band.us'
};

// Band API response types
export interface BandUserProfile {
  user_key: string;
  name: string;
  profile_image_url?: string;
  is_app_member: boolean;
  message_allowed: boolean;
}

export interface BandApiResponse<T> {
  result_code: number;
  result_data: T;
}