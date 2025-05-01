import { OAuthButton } from './Authentication';
import UnifiedLiveChatLogo from '@/assets/unified_live_chat.png';

function FirstSignIn() {
  return (
    <div className="flex flex-col items-center justify-center mx-20">
      <img
        src={UnifiedLiveChatLogo}
        alt="Unified Live Chat Logo"
        className="m-4"
      />
      <div className="font-semibold">Unified Live Chat</div>
      <div className="bg-gray-200 rounded-md m-2 p-2">
        <div>Please sign in to Google</div>
        <div>to use Unified Live Chat</div>
      </div>
      <OAuthButton service={Services.youtube} className="m-2 mb-4" />
    </div>
  );
}

export default FirstSignIn;
