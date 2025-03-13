import './styles.css';

import { Badge, Avatar, Stack, Divider } from '@mui/material';

import YouTubeLogo from '@/assets/youtube';
import TwitchLogo from '@/assets/twitch';
import editSquare from '@/assets/edit_square.svg';

import { Person } from '@mui/icons-material';

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

          <Stack
            spacing={0.5}
            sx={{
              padding: '10px',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Stack direction="row" spacing={0.5}>
              <YouTubeLogo style={{ width: '20px', height: '20px' }} />
              <p>YouTube Account Name</p>
              <div
                // onClick={openSettings}
                style={{ cursor: 'pointer' }}
              >
                <img src={editSquare} alt="Edit" width="20" height="20" />
              </div>

              <Person />
              <p>145</p>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <TwitchLogo style={{ width: '20px', height: '20px' }} />
              <p>Twitch Account Name</p>
              <div
                // onClick={openSettings}
                style={{ cursor: 'pointer' }}
              >
                <img src={editSquare} alt="Edit" width="20" height="20" />
              </div>
              <Person />
              <p>122</p>
            </Stack>
          </Stack>
        </Stack>
        <Divider variant="middle" />
      </div>
    </>
  );
}

export default Dashboard;
