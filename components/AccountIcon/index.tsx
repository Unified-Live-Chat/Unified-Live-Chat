import { ServiceAccount } from '@/utils/service-account';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import BuildIcon from '@mui/icons-material/Build';
import VideocamIcon from '@mui/icons-material/Videocam';

export enum UserRole {
  Viewer,
  Moderator,
  Streamer,
}

export interface AccountIconProps {
  serviceAccount?: ServiceAccount | null;
  userRole: UserRole;
}

interface UserRoleProps {
  userRole: UserRole;
}

const UserRoleDisplay: React.FC<UserRoleProps> = ({ userRole }) => {
  if (userRole == UserRole.Viewer) {
    return <p>{'Viewer'}</p>;
  } else if (userRole == UserRole.Moderator) {
    return (
      <Stack direction="row" alignItems="center">
        <BuildIcon sx={{ fontSize: 14, paddingRight: '4px', color: 'green' }} />
        <p>{'Moderator'}</p>
      </Stack>
    );
  }
  // userRole == UserRole.Streamer
  else {
    return (
      <Stack direction="row" alignItems="center">
        <VideocamIcon
          sx={{ fontSize: 14, paddingRight: '4px', color: 'red' }}
        />
        <p>{'Streamer'}</p>
      </Stack>
    );
  }
};

function AccountIcon(props: AccountIconProps) {
  const account = props.serviceAccount;

  if (account) {
    return (
      <Stack alignItems="center">
        <Avatar />
        <div>
          <p>{account.name}</p>
          <UserRoleDisplay userRole={props.userRole} />
        </div>
      </Stack>
    );
  } else {
    return <Avatar />;
  }
}

export default AccountIcon;
