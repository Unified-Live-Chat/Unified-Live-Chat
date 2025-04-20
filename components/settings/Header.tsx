import UnifiedLiveChatLogo from '@/assets/unified_live_chat.png';

function Header() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center space-x-4 mb-1">
        <img src={UnifiedLiveChatLogo} className="m-2" />
        <p className="font-semibold text-2xl mx-2">Unified Live Chat</p>
      </div>
      <hr className="border-t border-gray-300" />
    </div>
  );
}

export default Header;
