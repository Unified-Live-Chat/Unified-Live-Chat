import { Service } from '@/utils/service-helpers/service-base';
import AccountIcon from '@/components/shared/AccountIcon';
import { UserIdentity } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { OAuthButton } from '@/components/shared/OAuthButton';
import { standardButton } from '@/components/shared/styling';

interface ServiceProfileProps {
  service: Service;
  identity?: UserIdentity;
  identityCount: number;
}

/**
 * Allows the user to manage a specific account they have
 * connected to the app.
 *
 * @param service the service for the account.
 * @returns the component for managing the service's account
 */
function ServiceProfile({
  service,
  identity,
  identityCount,
}: Readonly<ServiceProfileProps>) {
  async function handleRevoke() {
    if (service.revoke) {
      await service.revoke();
      window.location.reload();
    }
  }

  function handleAuthenticate() {
    // Listen for auth completion message
    const messageListener = (message: { type: string }) => {
      if (message.type === 'AUTH_COMPLETE') {
        window.location.reload();
        chrome.runtime.onMessage.removeListener(messageListener);
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
  }

  return (
    <div className="flex flex-row space-x-1 items-center my-2">
      {/* Service icon display */}
      <service.icon className="w-13 h-13 mx-2" />
      <p className="mx-2 font-semibold text-base w-20">{service.name}</p>
      {identity && (
        <AccountIcon
          name={identity?.identity_data?.name}
          icon={identity?.identity_data?.avatar_url}
          className="min-w-36 flex justify-center"
        />
      )}
      {identity && (
        <div className="flex flex-col items-center ml-auto w-70">
          <Button
            variant="outline"
            className={`${standardButton} w-35 center flex justify-center`}
            disabled={service.name === 'YouTube' && identityCount > 1}
            onClick={handleRevoke}
          >
            Remove Account
          </Button>
          {service.name === 'YouTube' && identityCount > 1 && (
            <p className="text-sm text-muted-foreground mt-1">
              Remove all other connected accounts first
            </p>
          )}
        </div>
      )}
      {!identity && !(service.name !== 'YouTube' && identityCount < 1) && (
        <div className="flex flex-col items-center ml-auto w-70">
          <OAuthButton
            service={service}
            className={`${standardButton} w-35 center flex justify-center`}
            onAuthenticate={handleAuthenticate}
          />
        </div>
      )}
    </div>
  );
}

export default ServiceProfile;
