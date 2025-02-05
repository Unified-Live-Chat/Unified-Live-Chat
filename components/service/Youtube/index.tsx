import './styles.css';
import '../service.css';
import {OAuthButton} from '../service-components';
import youtubeLogo from '@/assets/yt_icon_rgb.png';

import {GoogleIcon} from '../service-icons';
import Stack from '@mui/material/Stack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountIcon, { UserRole } from '@/components/AccountIcon';

function Youtube() {
  // const [account, setAccount] = useState<GoogleAccount | null>();

  // useEffect(() => {
  //   const fetchAccount = async () => {
  //     try {
  //       const googleAccount = await GetGoogleAccount.getValue();
  //       setAccount(googleAccount);
  //     } catch (error) {
  //       console.error("Failed to fetch the name:", error);
  //     }
  //   };

  //   fetchAccount();
  // }, []);

  let accountActionButton: React.ReactNode;

  if(false)
  {
    accountActionButton = <OAuthButton
    fullWidth
    variant="outlined"
    // onClick={() => {
    //   chrome.runtime.sendMessage({
    //     message: 'get_auth_token_google',
    //   });
    // }}
    startIcon={<ManageAccountsIcon />}
  >
  Manage Accounts
</OAuthButton>
  }
  else
  {
    accountActionButton = <OAuthButton
      fullWidth
      variant="outlined"
      onClick={() => {
        //TODO
      }}
      startIcon={<GoogleIcon />}
    >
    Sign in with Google
  </OAuthButton>
  }

  return (
    <>
      <Stack className="service youtube">

        <Stack direction="row" spacing={3} className='top-bar'>

          <img src={youtubeLogo} alt="YouTube Logo" 
          style={{ width: '68px', height: '48px' }} />

          {/* <AccountIcon serviceAccount={account} userRole={UserRole.Viewer}/> */}
        </Stack>
        {accountActionButton}
      </Stack>
    </>
  );
}

export default Youtube;
