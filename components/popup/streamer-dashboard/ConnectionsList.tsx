import Connection from './Connection';
import { Services } from '@/utils/constants';

/**
 * A visual list of all of the services that the streamer
 * streams to, and their accounts on those services.
 *
 * @returns A component that holds all of the
 * services that the streamer is multi-streaming on.
 */
function ConnectionsList() {
  return (
    <div className="flex flex-col items-start justify-center space-y-1 min-w-70 pr-12">
      <Connection service={Services.youtube} />
      <div className="border-t w-[90%] mx-4 border-gray-300 rounded" />
      <Connection service={Services.twitch} />
    </div>
  );
}

export default ConnectionsList;
