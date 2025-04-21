import { createClient } from '@supabase/supabase-js';

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
        await service.authenticate(supabase, service.provider, service.scopes);
      }}
    >
      <service.authIcon className="w-4 h-4" />
      <span>Sign in to {service.name}</span>
    </Button>
  );
}

// This is a function I made for Twitch, it might not work in a general use case.
