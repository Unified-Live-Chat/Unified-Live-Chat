import React from 'react';
import { Typography, List, Stack } from '@mui/material'; //TODO: Remove
import { MenuItem, MenuItemProps } from './MenuItem';

interface SidebarProps {
  activeTab: string;
  menuItems: MenuItemProps[];
  onTabChange: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  menuItems,
  onTabChange,
}) => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontWeight: 600, mt: 2 }}>Account Settings</Typography>
      <List>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </List>
    </Stack>
  );
};
