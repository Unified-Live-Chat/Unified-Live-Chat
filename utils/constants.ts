import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { ComponentType, SVGProps } from 'react';

import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import GoogleLogo from '@/components/icons/services/GoogleLogo';
import TwitchLogo from '@/components/icons/services/TwitchLogo';

import { authenticateTwitch } from './twitch-helper';
import { authenticateYouTube } from './youtube-helper';

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

export class Service {
  name: string;
  url: URL;
  provider: Provider;
  scopes: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  authIcon: ComponentType<SVGProps<SVGSVGElement>>;
  authenticate: (
    supabase: SupabaseClient,
    provider: Provider,
    scopes: string,
  ) => void;
  constructor(
    name: string,
    url: URL,
    provider: Provider,
    scopes: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    authIcon: ComponentType<SVGProps<SVGSVGElement>>,
    authenticate: (
      supabase: SupabaseClient,
      provider: Provider,
      scopes: string,
    ) => void,
  ) {
    this.name = name;
    this.url = url;
    this.provider = provider;
    this.scopes = scopes;
    this.icon = icon;
    this.authIcon = authIcon;
    this.authenticate = authenticate;
  }
}

export const Services = {
  twitch: new Service(
    'Twitch',
    twitchUrl,
    'twitch' as Provider,
    'user:write:chat user:read:chat',
    TwitchLogo,
    TwitchLogo,
    authenticateTwitch,
  ),
  youtube: new Service(
    'YouTube',
    youTubeUrl,
    'google' as Provider,
    '',
    YouTubeLogo,
    GoogleLogo,
    authenticateYouTube,
  ),
} as const;
