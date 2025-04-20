import React from 'react';
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
    <div className="flex flex-col items-center justify-start">
      <p className="font-semibold text-lg my-2">Account Settings</p>
      <div className="flex flex-col">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
