import TwitchLogo from '@/components/icons/services/TwitchLogo';
import { OAuthButton, authenticate } from './service-components';
import AccountIcon, { UserRole } from '@/components/popup/service/AccountIcon';
import { Provider } from '@supabase/supabase-js';

const provider = 'twitch' as Provider;
const twitchScopes = 'user:write:chat user:read:chat';

function Twitch() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-5 mt-5 mb-1 justify-center items-center">
          <TwitchLogo className="w-13 h-13" />

          <AccountIcon serviceAccount={null} userRole={UserRole.Streamer} />
        </div>

        <OAuthButton
          fullWidth
          variant="outlined"
          onClick={async () => {
            await authenticate(provider, twitchScopes);
          }}
          startIcon={<TwitchLogo className="w-4 h-4" />}
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
        </Button> */}

        {/* <Debug /> */}
      </div>
    </>
  );
}

export default Twitch;
