import React from 'react';
import { Stack, Typography } from '@mui/material';
import YouTubeLogo from '@/assets/youtube';

export const YouTubeAccountItem: React.FC = () => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          mt: 2,
          mb: 2,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <YouTubeLogo
          style={{
            width: '50px',
            height: '50px',
            padding: '10px',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        />
        <Typography variant="h6">YouTube</Typography>
      </Stack>
    </>
  );
};
