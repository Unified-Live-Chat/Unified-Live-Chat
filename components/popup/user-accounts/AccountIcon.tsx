import { ServiceAccount } from '@/utils/service-account';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import UserIcon from '../../icons/assets/UserIcon';
import BuildIcon from '../../icons/assets/BuildIcon';
import VideoCamIcon from '../../icons/assets/VideoCamIcon';

//TODO: Move these to utils folder?
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

/**
 * Determines the element to display based on the user role.
 * @param {UserRole} userRole - An enum value for
 * if the user is a viewer, moderator, or streamer.
 * @returns {JSX.Element} The element displaying the role of the user.
 */
const UserRoleDisplay: React.FC<UserRoleProps> = ({ userRole }) => {
  if (userRole == UserRole.Streamer) {
    return (
      <div className="flex flex-row items-center">
        <VideoCamIcon />
        <p>{'Streamer'}</p>
      </div>
    );
  } else if (userRole == UserRole.Moderator) {
    return (
      <div className="flex flex-row items-center">
        <BuildIcon />
        <p>{'Moderator'}</p>
      </div>
    );
  }
  // else: userRole == UserRole.Viewer
  else {
    return <p>{'Viewer'}</p>;
  }
};

/**
 * Visualizes the account that the user is logged in as with
 * their profile picture, name, and role in the stream.
 * @param {AccountIconProps} props - Basic account information.
 * @returns {JSX.Element} The account information component.
 */
function AccountIcon(props: AccountIconProps) {
  const account = props.serviceAccount;

  if (account) {
    return (
      <div className="flex items-center space-x-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" />
          <AvatarFallback className="h-10 w-10">
            <UserIcon className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p>{account.name}</p>
          <UserRoleDisplay userRole={props.userRole} />
        </div>
      </div>
    );
  } else {
    return (
      <Avatar className="h-10 w-10">
        <AvatarFallback className="h-10 w-10">
          <UserIcon className="w-10 h-10" />
        </AvatarFallback>
      </Avatar>
    );
  }
}

export default AccountIcon;
