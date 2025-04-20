import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import UserIcon from '../../icons/assets/UserIcon';

/**
 * A visual display of the streamer's icon.
 * @returns A component of the streamer's icon.
 */
function AccountIcon() {
  return (
    <div className="flex flex-col justify-center items-center relative z-10 m-1">
      <Avatar className="h-24 w-24">
        <AvatarImage src="" className="h-16 w-16" />
        <AvatarFallback>
          <UserIcon className="h-16 w-16" />
        </AvatarFallback>
      </Avatar>

      <Badge variant="default" className="bg-red-500 text-white -mt-8 z-20">
        Live
      </Badge>
    </div>
  );
}

export default AccountIcon;
