import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';
import TwitchLogo from '@/components/icons/services/TwitchLogo';
import { Service } from './service-base';

const twitchUrl = new URL('https://www.twitch.tv');

const scopes = 'user:write:chat user:read:chat';
const provider = 'twitch' as Provider;

async function authenticateTwitch() {
  const { data, error } = await supabase.linkIdentity(provider, scopes);

  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

async function unlinkTwitch() {
  console.log('[Twitch Service] Starting Twitch account unlink...');
  const response = await supabase.unlinkIdentity('twitch' as Provider);
  console.log('[Twitch Service] Unlink response:', response);
  if (response?.error) {
    console.error('[Twitch Service] Error during unlink:', response.error);
    throw response.error;
  }
  console.log('[Twitch Service] Successfully unlinked Twitch account');
}

export const twitchService = new Service(
  'Twitch',
  'Twitch',
  twitchUrl,
  scopes,
  TwitchLogo,
  TwitchLogo,
  provider,
  authenticateTwitch,
  unlinkTwitch,
);
