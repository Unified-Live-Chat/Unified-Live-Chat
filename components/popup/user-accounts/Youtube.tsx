import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import AccountIcon, {
  UserRole,
} from '@/components/popup/user-accounts/AccountIcon';
import GoogleLogo from '@/components/icons/services/GoogleLogo';

import { OAuthButton } from './service-components';

function Youtube() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-5 mt-5 mb-1 justify-center items-center">
          <YouTubeLogo className="w-13 h-13" />
          <AccountIcon serviceAccount={null} userRole={UserRole.Viewer} />
        </div>
        <OAuthButton
          fullWidth
          variant="outlined"
          onClick={() => {
            //TODO
          }}
          startIcon={<GoogleLogo />}
        >
          Sign in with Google
        </OAuthButton>
      </div>
    </>
  );
}

export default Youtube;
