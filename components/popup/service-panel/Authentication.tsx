// import Button from '@mui/material/Button'; //TODO: Remove
// import { blue, grey } from '@mui/material/colors'; //TODO: Remove
// import { styled } from '@mui/material/styles'; //TODO: Remove
import { createClient, Provider } from '@supabase/supabase-js';
import { storage } from '#imports';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Service } from '@/utils/constants';

const supabaseUrl = import.meta.env.WXT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.WXT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface OAuthServiceProps {
  service: Service;
  className?: string;
}

/**
 * A button that should be displayed when a user is not logged in
 * to the designated service. The button allow them to log in
 * using OAuth services.
 *
 * @param service The service that this OAuth button provides for.
 * @param className optional CSS override .
 * @returns A button that, when clicked, start the OAuth process
 * for the designated service.
 */
export function OAuthButton({ service, className }: OAuthServiceProps) {
  return (
    <Button
      variant="outline"
      className={cn('flex items-center gap-2 w-full', className)}
      onClick={async () => {
        await authenticate(service.provider, service.scopes);
      }}
    >
      <service.authIcon className="w-4 h-4" />
      <span>Sign in with {service.name}</span>
    </Button>
  );
}

// This is a function I made for Twitch, it might not work in a general use case.
export async function authenticate(provider: Provider, scopes: string) {
  storage.setItem('session:provider', provider);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: chrome.identity.getRedirectURL(),
      scopes: scopes,
    },
  });
  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}
