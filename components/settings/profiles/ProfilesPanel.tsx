import React from 'react';
import { BaseSettingsPanel } from '@/components/settings/BaseSettingsPanel';
import ServiceProfile from './ServiceProfile';

export const ProfilesPanel: React.FC = () => {
  return (
    <BaseSettingsPanel title="Connected Accounts">
      <div>
        <ServiceProfile service={Services.youtube} />
        <div className="border-t border-gray-300 w-full" />
        <ServiceProfile service={Services.twitch} />
        <div className="border-t border-gray-300 w-full" />
      </div>
    </BaseSettingsPanel>
  );
};
