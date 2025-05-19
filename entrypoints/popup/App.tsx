import Dashboard from '@/components/popup/streamer-dashboard/Dashboard';
import ServicePanel from '@/components/popup/service-panel/ServicePanel';
import Settings from '@mui/icons-material/Settings';

import { getService } from '@/utils/functions';

import { Button } from '@/components/ui/button';
import { Service } from '@/utils/service-helpers/service-base';
import { User } from '@supabase/supabase-js';
import FirstSignIn from '@/components/popup/service-panel/FirstSignIn';
import { useState, useEffect } from 'react';

const openSettings = () => {
  chrome.runtime.sendMessage({ type: 'open-settings' });
};

function App() {
  const [currentService, setCurrentService] = useState<Service | undefined>(
    undefined,
  );
  const [googleSignIn, setGoogleSignIn] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const service = await getService();
        setCurrentService(service);
        const userData = await storage?.getItem<User>('sync:YouTube_data');
        setGoogleSignIn(userData || undefined);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {googleSignIn ? (
        <>
          {currentService && (
            <>
              <Dashboard />
              <div className="border-t w-[90%] border-gray-300 rounded" />
            </>
          )}
          <ServicePanel currentService={currentService} />
        </>
      ) : (
        <FirstSignIn />
      )}

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
