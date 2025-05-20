import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';
import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import GoogleLogo from '@/components/icons/services/GoogleLogo';
import { Service } from './service-base';

const youTubeUrl = new URL('https://www.youtube.com');

const scopes = '';
const provider = 'google' as Provider;

async function authenticateYouTube() {
  const { data, error } = await supabase.signInWithOAuth(provider, scopes);

  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

async function unlinkYouTube() {
  await supabase.signOut();
}

export const youtubeService = new Service(
  'YouTube',
  'Google',
  youTubeUrl,
  scopes,
  YouTubeLogo,
  GoogleLogo,
  provider,
  authenticateYouTube,
  unlinkYouTube,
);
