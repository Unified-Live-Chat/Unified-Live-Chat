import { PopupSupabaseClient } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';
import TwitchLogo from '@/components/icons/services/TwitchLogo';
import { Service } from './service-base';

const twitchUrl: URL = new URL('https://www.twitch.tv');

async function authenticateTwitch(
  supabase: PopupSupabaseClient,
  provider: Provider,
  scopes: string,
) {
  const { data, error } = await supabase.linkIdentity(provider, scopes);

  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

export const twitchService = new Service(
  'Twitch',
  'Twitch',
  twitchUrl,
  'user:write:chat user:read:chat',
  TwitchLogo,
  TwitchLogo,
  'twitch' as Provider,
  authenticateTwitch,
);
