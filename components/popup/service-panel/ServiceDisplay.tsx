import { Service } from '@/utils/constants';
import { OAuthButton } from './Authentication';
import AccountIcon from '@/components/popup/service-panel/AccountIcon';
import { ServiceAccount } from '@/utils/constants';

interface ServiceAccountProps {
  service: Service;
  account?: ServiceAccount;
}

/**
 * Displays information about a single service, containing the service logo,
 * the user's information, and a OAuth button if they are not signed in
 *
 * @param service The service to display
 * @param account The account associated with this service or undefined if there is none.
 * @returns The service UI.
 */
function ServiceDisplay({ service, account }: ServiceAccountProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-5 m2-5 mb-1 justify-center items-center">
          <service.icon className="w-13 h-13" />

          <AccountIcon serviceAccount={account} />
        </div>
        {!account && <OAuthButton service={service} />}
      </div>
    </>
  );
}

export default ServiceDisplay;
