import './styles.css';
import '../service.css';
import { OAuthButton } from '../service-components';

import YouTubeLogo from '@/assets/youtube';
import AccountIcon, { UserRole } from '@/components/AccountIcon';
import GoogleLogo from '@/assets/google';
import Stack from '@mui/material/Stack';

function Youtube() {
  // accountActionButton = (
  //   <OAuthButton
  //     fullWidth
  //     variant="outlined"
  //     // onClick={() => {
  //     //   chrome.runtime.sendMessage({
  //     //     message: 'get_auth_token_google',
  //     //   });
  //     // }}
  //     startIcon={<ManageAccountsIcon />}
  //   >
  //     Manage Accounts
  //   </OAuthButton>
  // );
  const accountActionButton = (
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
  );

  return (
    <>
      <Stack className="service youtube">
        <Stack direction="row" spacing={3} className="top-bar">
          <YouTubeLogo style={{ width: '50px', height: '50px' }} />
          <AccountIcon serviceAccount={null} userRole={UserRole.Viewer} />
        </Stack>
        {accountActionButton}
      </Stack>
    </>
  );
}

export default Youtube;
