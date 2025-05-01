import { Service } from '@/utils/constants';
// import { OAuthButton } from './Authentication';
import AccountIcon from '@/components/popup/service-panel/AccountIcon';
// import { AuthResponse, User } from '@supabase/supabase-js';

interface ServiceAccountProps {
  service: Service;
}

/**
 * Displays information about a single service, containing the service logo,
 * the user's information, and a OAuth button if they are not signed in
 *
 * @param service The service to display
 * @returns The service UI.
 */
function ServiceDisplay({ service }: ServiceAccountProps) {
  // const [signInData, setSignInData] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        // const userData = getSession().session.user;
        // setSignInData((userData as User) || undefined);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally set an error state here
      }
    }

    fetchData();
  }, []);

  // console.log('signInData:', signInData);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-5 m2-5 mb-1 justify-center items-center">
          <service.icon className="w-13 h-13" />

          <AccountIcon
          // name={signInData?.user.user_metadata.name}
          // icon={signInData?.user.user_metadata.avatar_url}
          />
        </div>
        {/* {!signInData && <OAuthButton service={service} />} */}
      </div>
    </>
  );
}

export default ServiceDisplay;
