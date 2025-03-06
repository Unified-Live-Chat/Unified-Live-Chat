import './styles.css';
import '../service.css';
import { OAuthButton } from '../service-components';
import youtubeLogo from '@/assets/yt_icon_rgb.png';
import AccountIcon, { UserRole } from '@/components/AccountIcon';
import { GoogleIcon } from '../service-icons';
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
      startIcon={<GoogleIcon />}
    >
      Sign in with Google
    </OAuthButton>
  );

  return (
    <>
      <Stack className="service youtube">
        <Stack direction="row" spacing={3} className="top-bar">
          <img
            src={youtubeLogo}
            alt="YouTube Logo"
            style={{ width: '68px', height: '48px' }}
          />

          <AccountIcon serviceAccount={null} userRole={UserRole.Viewer} />
        </Stack>
        {accountActionButton}
      </Stack>
    </>
  );
}

export default Youtube;
