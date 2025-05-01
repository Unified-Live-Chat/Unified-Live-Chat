import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { ComponentType, SVGProps } from 'react';

import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import GoogleLogo from '@/components/icons/services/GoogleLogo';
import TwitchLogo from '@/components/icons/services/TwitchLogo';
import KickLogo from '@/components/icons/services/KickLogo';

import { authenticateTwitch } from './twitch-helper';
import { authenticateYouTube } from './youtube-helper';

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

// Service
export const twitchUrl: URL = new URL('https://www.twitch.tv');
export const youTubeUrl: URL = new URL('https://www.youtube.com');
export const kickUrl: URL = new URL('https://www.youtube.com');

export class Service {
  name: string;
  providerName: string;
  url: URL;
  scopes: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  authIcon: ComponentType<SVGProps<SVGSVGElement>>;
  provider?: Provider;
  authenticate?: (
    supabase: SupabaseClient,
    provider: Provider,
    scopes: string,
  ) => void;
  constructor(
    name: string,
    providerName: string,
    url: URL,
    scopes: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    authIcon: ComponentType<SVGProps<SVGSVGElement>>,
    provider?: Provider,
    authenticate?: (
      supabase: SupabaseClient,
      provider: Provider,
      scopes: string,
    ) => void,
  ) {
    this.name = name;
    this.providerName = providerName;
    this.url = url;
    this.scopes = scopes;
    this.icon = icon;
    this.authIcon = authIcon;
    this.provider = provider;
    this.authenticate = authenticate;
  }
}

export const Services = {
  twitch: new Service(
    'Twitch',
    'Twitch',
    twitchUrl,
    'user:write:chat user:read:chat',
    TwitchLogo,
    TwitchLogo,
    'twitch' as Provider,
    authenticateTwitch,
  ),
  youtube: new Service(
    'YouTube',
    'Google',
    youTubeUrl,
    '',
    YouTubeLogo,
    GoogleLogo,
    'google' as Provider,
    authenticateYouTube,
  ),
  kick: new Service(
    'Kick',
    'Kick',
    kickUrl,
    'user:read chat:write events:subscribe channel:read',
    KickLogo,
    KickLogo,
  ),
} as const;
