import './styles.css';
import '../service.css';
import twitchLogo from '@/assets/glitch_flat_purple.png';
import Stack from '@mui/material/Stack';
import {OAuthButton} from '../service-components';
import AccountIcon, { UserRole } from '@/components/AccountIcon';
import Debug from '@/components/Debug';

function Twitch() {

  return (
    <>
      <div className="service twitch">

      <Stack direction="row" spacing={3} className='top-bar' alignItems="center">

        <img src={twitchLogo} alt="Twitch Logo" 
        style={{ width: '45px', height: '54px' }} />
        
        <AccountIcon serviceAccount={null} userRole={UserRole.Streamer}/>
      </Stack>
        
      <OAuthButton
              fullWidth
              variant="outlined"
              onClick={() => {
                chrome.runtime.sendMessage({
                  message: 'get_auth_token_twitch',
                });
              }}
              startIcon={<img src={twitchLogo}
                style={{ width: '16px', height: 'auto'}} />}
            >
            Sign in with Twitch
        </OAuthButton>

        <Debug />

      </div>
    </>
  );
}

export default Twitch;
