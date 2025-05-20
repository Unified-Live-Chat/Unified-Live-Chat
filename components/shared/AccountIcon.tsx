import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import UserIcon from '@/components/icons/assets/UserIcon';
import BuildIcon from '@/components/icons/assets/BuildIcon';
import VideoCamIcon from '@/components/icons/assets/VideoCamIcon';

interface UserRoleProps {
  userRole?: UserRole;
}

/**
 * Determines the element to display based on the user role.
 * @param {UserRole} userRole - An enum value for
 * if the user is a viewer, moderator, or streamer.
 * @returns {JSX.Element} The element displaying the role of the user.
 */
const UserRoleDisplay: React.FC<UserRoleProps> = ({
  userRole,
}: Readonly<UserRoleProps>) => {
  if (!userRole) {
    return null;
  }
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

interface AccountIconProps {
  name?: string;
  icon?: string;
  className?: string;
}

/**
 * Visualizes the account that the user is logged in as with
 * their profile picture, name, and role in the stream.
 * @param {AccountIconProps} props - Basic account information.
 * @returns {JSX.Element} The account information component.
 */
function AccountIcon({ name, icon, className }: Readonly<AccountIconProps>) {
  if (name && icon) {
    return (
      <div className={`flex flex-col items-center ${className || ''}`}>
        <Avatar className="h-10 w-10">
          <AvatarImage src={icon} />
          <AvatarFallback className="h-10 w-10">
            <UserIcon className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <p className="text-center">{name}</p>
        <UserRoleDisplay />
      </div>
    );
  } else {
    return (
      <div className={className}>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="h-10 w-10">
            <UserIcon className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }
}

export default AccountIcon;
