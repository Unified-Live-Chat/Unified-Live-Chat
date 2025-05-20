import editSquare from '@/assets/edit_square.svg';
import { Service } from '@/utils/service-helpers/service-base';
import { Person } from '@mui/icons-material';

interface ConnectionProps {
  service: Service;
}

/**
 * When the user is looking at a stream, this component shows the link
 * between the streamer's account to another service. If the link is incorrect,
 * the user can set a new account on the service that it should be connected to.
 *
 * @param service the service that the streamer uses.
 * @returns The component displaying the streamers account on a service.
 */
function Connection({ service }: Readonly<ConnectionProps>) {
  return (
    <div className="flex flex-row space-x-1 justify-center items-center">
      {/* Service icon display */}
      <service.icon className="w-5 h-5" />

      {/* The name of the streamer on the service */}
      <p>{service.name} Account Name</p>

      {/* Allows the user to change the account on another 
      service associated with the account they are currently viewing */}
      <div
        className="cursor-pointer"
        // onClick={openSettings}
      >
        <img src={editSquare} alt="Edit" width="20" height="20" />
      </div>

      {/* Viewer count, temp value */}
      <Person />
      <p>145</p>
    </div>
  );
}

export default Connection;
