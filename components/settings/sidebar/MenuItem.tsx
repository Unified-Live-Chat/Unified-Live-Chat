import React from 'react';

import { Button } from '@/components/ui/button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SvgIconComponent } from '@mui/icons-material';

export interface MenuItemProps {
  id: string;
  label: string;
  icon: SvgIconComponent;
  isActive?: boolean;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon: Icon,
  isActive = false,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`w-full h-12 flex justify-between rounded-sm normal-case ${
        isActive
          ? 'bg-gray-100 text-gray-900 hover:bg-gray-100'
          : 'bg-transparent text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <Icon sx={{ fontSize: 18 }} />
        <p className="text-sm font-normal">{label}</p>
      </div>
      <ChevronRightIcon sx={{ fontSize: 16, color: 'grey.400' }} />
    </Button>
  );
};
