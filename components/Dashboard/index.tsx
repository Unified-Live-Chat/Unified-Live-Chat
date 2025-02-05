import Badge from '@mui/material/Badge';
import './styles.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <Stack direction="row">
          <div className="container">
            <div>
              <Avatar
                sx={{ width: 80, height: 80 }}
                className="avatar"
              ></Avatar>

              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom' }}
                badgeContent={'Live'}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: 'red',
                  },
                }}
                className="overlay"
              ></Badge>
            </div>
          </div>

          <Stack spacing={0.5} sx={{ padding: '10px' }}>
            <Stack direction="row">
              <Item>ULC-Youtube</Item>
              <PersonIcon />
              <p>145</p>
            </Stack>
            <Stack direction="row">
              <Item>ULC-Twitch</Item>
              <PersonIcon />
              <p>207</p>
            </Stack>
            {/* <Stack direction='row'>
              <Item>ULC-Rumble</Item>
              <PersonIcon />
              <p>13</p>
            </Stack> */}
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default Dashboard;
