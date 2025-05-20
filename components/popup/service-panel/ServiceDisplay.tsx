import { Service } from '@/utils/service-helpers/service-base';
import { OAuthButton } from '../../shared/OAuthButton';
import AccountIcon from '@/components/shared/AccountIcon';
import { UserIdentity } from '@supabase/supabase-js';

interface ServiceAccountProps {
  service: Service;
  identity?: UserIdentity;
}

/**
 * Displays information about a single service, containing the service logo,
 * the user's information, and a OAuth button if they are not signed in
 *
 * @param service The service to display
 * @param identity Optional identity that is paired with this service
 * @returns The service UI.
 */
function ServiceDisplay({ service, identity }: Readonly<ServiceAccountProps>) {
  console.log(identity);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-5 m2-5 my-1 justify-center items-center">
        <service.icon className="w-13 h-13" />
        <AccountIcon
          name={identity?.identity_data?.name}
          icon={identity?.identity_data?.avatar_url}
        />
      </div>
      {!identity && <OAuthButton service={service} />}
    </div>
  );
}

export default ServiceDisplay;
