import React from 'react';
import { BaseSettingsPanel } from './BaseSettingsPanel';
import { Stack, Divider } from '@mui/material'; //TODO: Remove
import { YouTubeAccountItem } from './ConnectedAccountItems/YouTubeAccountItem';

export const ProfilesPanel: React.FC = () => {
  return (
    <BaseSettingsPanel title="Connected Accounts">
      <Stack>
        <YouTubeAccountItem />
        <Divider />
      </Stack>
    </BaseSettingsPanel>
  );
};
