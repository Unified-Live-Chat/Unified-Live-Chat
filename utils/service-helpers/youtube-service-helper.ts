import { PopupSupabaseClient } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';
import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import GoogleLogo from '@/components/icons/services/GoogleLogo';
import { Service } from './service-base';

const youTubeUrl: URL = new URL('https://www.youtube.com');

async function authenticateYouTube(
  supabase: PopupSupabaseClient,
  provider: Provider,
  scopes: string,
) {
  const { data, error } = await supabase.signInWithOAuth(provider, scopes);

  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

export const youtubeService = new Service(
  'YouTube',
  'Google',
  youTubeUrl,
  '',
  YouTubeLogo,
  GoogleLogo,
  'google' as Provider,
  authenticateYouTube,
);
