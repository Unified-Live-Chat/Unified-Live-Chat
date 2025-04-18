import './settings-app.css';

import { useState } from 'react';
import { Stack, Divider } from '@mui/material'; //TODO: Remove
import { Person, AutoAwesome, Videocam } from '@mui/icons-material';
import { Sidebar } from './components/Sidebar';
import { ProfilesPanel } from './components/ProfilesPanel';
import { PremiumPanel } from './components/PremiumPanel';
import { CreatorPanel } from './components/CreatorPanel';
import { MenuItemProps } from './components/MenuItem';
import Header from './components/Header';

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
      <Header></Header>
      <Stack direction="row">
        <Sidebar
          activeTab={activeTab}
          menuItems={menuItems}
          onTabChange={setActiveTab}
        />
        <Divider orientation="vertical" flexItem />
        <div className="outer">
          <div className="inner">{renderActivePanel()}</div>
        </div>
      </Stack>
    </>
  );
}

export default SettingsApp;
