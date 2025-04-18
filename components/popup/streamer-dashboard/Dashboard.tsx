import { Stack, Divider } from '@mui/material'; //TODO: Remove
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import UserIcon from '../../icons/assets/UserIcon';

import YouTubeLogo from '@/components/icons/services/YouTubeLogo';
import TwitchLogo from '@/components/icons/services/TwitchLogo';
import editSquare from '@/assets/edit_square.svg';

import { Person } from '@mui/icons-material';

function Dashboard() {
  return (
    <>
      <div className="w-full min-h-19">
        <Stack direction="row">
          {/* <div className="myContainer"> */}
          <div className="flex justify-center items-center relative m-8 bg-blue-500 ">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" className="h-16 w-16" />
              <AvatarFallback>
                <UserIcon className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>

            <Badge variant="outline" className="bg-live-red">
              Live
            </Badge>
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
        {/* <Divider variant="middle" /> */}
      </div>
    </>
  );
}

export default Dashboard;
