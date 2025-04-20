import { useState } from 'react';
import { Person, AutoAwesome, Videocam } from '@mui/icons-material';

import { Sidebar } from '@/components/settings/sidebar/Sidebar';
import { ProfilesPanel } from '@/components/settings/profiles/ProfilesPanel';
import { PremiumPanel } from '@/components/settings/premium/PremiumPanel';
import { CreatorPanel } from '@/components/settings/creators/CreatorPanel';
import { MenuItemProps } from '@/components/settings/sidebar/MenuItem';
import Header from '@/components/settings/Header';

function SettingsApp() {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems: MenuItemProps[] = [
    { id: 'profiles', label: 'Connected Accounts', icon: Person },
    { id: 'premium', label: 'Premium', icon: AutoAwesome },
    { id: 'creators', label: 'Creators', icon: Videocam },
  ];

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'profiles':
        return <ProfilesPanel />;
      case 'premium':
        return <PremiumPanel />;
      case 'creators':
        return <CreatorPanel />;
      default:
        return <ProfilesPanel />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Sidebar
          activeTab={activeTab}
          menuItems={menuItems}
          onTabChange={setActiveTab}
        />
        <div className="border-r h-47 border-gray-300" />
        <div className="flex-1 w-0 flex justify-center gap-4 py-2 px-4">
          <div className="flex flex-col w-200">{renderActivePanel()}</div>
        </div>
      </div>
    </>
  );
}

export default SettingsApp;
