import { twitchService } from './service-helpers/twitch-service-helper';
import { youtubeService } from './service-helpers/youtube-service-helper';
import { kickService } from './service-helpers/kick-service-helper';

export const API_BASE_URL: URL | undefined =
  import.meta.env.MODE == 'development'
    ? new URL(`http://localhost:8000`)
    : undefined;

// User
export enum UserRole {
  Viewer,
  Moderator,
  Streamer,
}

export interface ServiceAccount {
  name: string;
  role: UserRole;
}

// Services
export const Services = {
  twitch: twitchService,
  youtube: youtubeService,
  kick: kickService,
} as const;
