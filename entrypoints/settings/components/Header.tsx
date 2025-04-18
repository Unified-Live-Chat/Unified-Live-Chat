import { Typography, Divider, Stack } from '@mui/material'; //TODO: Remove
import UnifiedLiveChatLogo from '@/assets/unified_live_chat.png';

function Header() {
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <img
          src={UnifiedLiveChatLogo}
          style={{ width: '40px', height: '40px' }}
        />
        <Typography variant="h5" sx={{ mb: 3 }}>
          Unified Live Chat
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
}

export default Header;
