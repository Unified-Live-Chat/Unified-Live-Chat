import AccountIcon from './AccountIcon';
import ConnectionsList from './ConnectionsList';

/**
 * Holds a visual of the streamer currently being watched,
 * and all of the services that the streamer is connected to.
 *
 * @returns The Streamer side component of the popup menu
 */
function Dashboard() {
  return (
    <div className="flex flex-row w-full">
      <AccountIcon />
      <ConnectionsList />
    </div>
  );
}

export default Dashboard;
