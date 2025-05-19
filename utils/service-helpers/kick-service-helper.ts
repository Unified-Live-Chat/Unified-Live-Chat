import KickLogo from '@/components/icons/services/KickLogo';
import { Service } from './service-base';

const kickUrl: URL = new URL('https://www.youtube.com');

export const kickService = new Service(
  'Kick',
  'Kick',
  kickUrl,
  'user:read chat:write events:subscribe channel:read',
  KickLogo,
  KickLogo,
);
