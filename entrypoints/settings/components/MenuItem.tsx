import React from 'react';
import { Button, Typography, Box } from '@mui/material'; //TODO: Remove
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
      fullWidth
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1.5,
        borderRadius: 1,
        textTransform: 'none',
        backgroundColor: isActive ? 'grey.100' : 'transparent',
        color: isActive ? 'grey.900' : 'grey.600',
        '&:hover': {
          backgroundColor: isActive ? 'grey.100' : 'grey.50',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Icon sx={{ fontSize: 18 }} />
        <Typography variant="body2">{label}</Typography>
      </Box>
      <ChevronRightIcon sx={{ fontSize: 16, color: 'grey.400' }} />
    </Button>
  );
};
