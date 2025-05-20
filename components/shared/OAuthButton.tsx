import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Service } from '@/utils/service-helpers/service-base';

interface OAuthServiceProps {
  service: Service;
  className?: string;
  onAuthenticate?: () => void;
}

/**
 * A button that should be displayed when a user is not logged in
 * to the designated service. The button allow them to log in
 * using OAuth services.
 *
 * @param service The service that this OAuth button provides for.
 * @param className optional CSS override.
 * @param onAuthenticate optional callback to run after successful authentication
 * @returns A button that, when clicked, start the OAuth process
 * for the designated service.
 */
export function OAuthButton({
  service,
  className,
  onAuthenticate,
}: Readonly<OAuthServiceProps>) {
  return (
    <Button
      variant="outline"
      className={cn('flex items-center gap-2 w-35', className)}
      onClick={async () => {
        if (!service.authenticate || !service.provider) {
          console.error('Service does not support authentication');
          return;
        }
        await service.authenticate();
        onAuthenticate?.();
      }}
    >
      <service.authIcon className="w-4 h-4" />
      <span>Sign in to {service.providerName}</span>
    </Button>
  );
}
