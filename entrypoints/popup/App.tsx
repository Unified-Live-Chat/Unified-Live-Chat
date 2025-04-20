import Dashboard from '@/components/popup/streamer-dashboard/Dashboard';
import ServicePanel from '@/components/popup/service-panel/ServicePanel';
import Settings from '@mui/icons-material/Settings';

import { getService } from '@/utils/functions';

import { Button } from '@/components/ui/button';
import { Service } from '@/utils/constants';

const openSettings = () => {
  chrome.runtime.sendMessage({ type: 'open-settings' });
};

function App() {
  // Get the current service that the user is on.
  const [currentService, setCurrentService] = useState<Service | undefined>(
    undefined,
  );
  useEffect(() => {
    getService().then((service) => setCurrentService(service));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {currentService && (
        <>
          <Dashboard />
          <div className="border-1 w-[90%] border-gray-300 rounded" />
        </>
      )}
      <ServicePanel currentService={currentService} />

      <Button
        onClick={openSettings}
        variant="default"
        size="icon"
        className="absolute top-1 right-1"
      >
        <Settings />
      </Button>
    </div>
  );
}

export default App;
