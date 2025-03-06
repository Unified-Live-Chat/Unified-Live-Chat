import './styles.css';
import '../service.css';
import twitchLogo from '@/assets/glitch_flat_purple.png';
import Stack from '@mui/material/Stack';
import { OAuthButton, authenticate } from '../service-components';
import AccountIcon, { UserRole } from '@/components/AccountIcon';
import { Provider } from '@supabase/supabase-js';

const provider = 'twitch' as Provider;
const twitchScopes = 'user:write:chat user:read:chat';

function Twitch() {
  return (
    <>
      <div className="service twitch">
        <Stack direction="row" spacing={3} className="top-bar">
          <img
            src={twitchLogo}
            alt="Twitch Logo"
            style={{ width: '45px', height: '54px' }}
          />

          <AccountIcon serviceAccount={null} userRole={UserRole.Streamer} />
        </Stack>

        <OAuthButton
          fullWidth
          variant="outlined"
          onClick={async () => {
            await authenticate(provider, twitchScopes);
          }}
          startIcon={
            <img src={twitchLogo} style={{ width: '16px', height: 'auto' }} />
          }
        >
          Sign in with Twitch
        </OAuthButton>

        {/* <Button
          onClick={async () => {
            await supabase.auth.signOut();
            chrome.storage.local.remove('session');
          }}
        >
          Sign Out
        </Button>

        <Debug /> */}
      </div>
    </>
  );
}

export default Twitch;
