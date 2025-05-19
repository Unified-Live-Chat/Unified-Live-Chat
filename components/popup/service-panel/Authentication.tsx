import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Service } from '@/utils/service-helpers/service-base';

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
 * @param className optional CSS override.
 * @returns A button that, when clicked, start the OAuth process
 * for the designated service.
 */
export function OAuthButton({
  service,
  className,
}: Readonly<OAuthServiceProps>) {
  return (
    <Button
      variant="outline"
      className={cn('flex items-center gap-2 w-full', className)}
      onClick={async () => {
        if (!service.authenticate || !service.provider) {
          console.error('Service does not support authentication');
          return;
        }
        await service.authenticate(supabase, service.provider, service.scopes);
      }}
    >
      <service.authIcon className="w-4 h-4" />
      <span>Sign in to {service.providerName}</span>
    </Button>
  );
}
