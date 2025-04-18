import React, { ReactNode } from 'react';
import { Typography, Box, Stack, Divider } from '@mui/material'; //TODO: Remove

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
      <Stack direction="column">
        <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>

        <Divider />
        <Box sx={{ '& > *:not(:last-child)': { mb: 3 } }}>{children}</Box>
      </Stack>
    </Box>
  );
};
