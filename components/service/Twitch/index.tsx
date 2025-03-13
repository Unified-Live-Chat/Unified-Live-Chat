import './styles.css';
import '../service.css';
import TwitchLogo from '@/assets/twitch';
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
          <TwitchLogo style={{ width: '50px', height: '50px' }} />

          <AccountIcon serviceAccount={null} userRole={UserRole.Streamer} />
        </Stack>

        <OAuthButton
          fullWidth
          variant="outlined"
          onClick={async () => {
            await authenticate(provider, twitchScopes);
          }}
          startIcon={<TwitchLogo style={{ width: '16px', height: '16px' }} />}
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
