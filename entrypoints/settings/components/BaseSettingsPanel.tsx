import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';

export interface BaseSettingsPanelProps {
  title: string;
  children: ReactNode;
}

export const BaseSettingsPanel: React.FC<BaseSettingsPanelProps> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ '& > *:not(:last-child)': { mb: 3 } }}>{children}</Box>
    </Box>
  );
};
