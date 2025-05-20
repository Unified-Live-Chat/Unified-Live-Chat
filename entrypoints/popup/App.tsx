import Dashboard from '@/components/popup/streamer-dashboard/Dashboard';
import ServicePanel from '@/components/popup/service-panel/ServicePanel';
import Settings from '@mui/icons-material/Settings';

import { getService } from '@/utils/functions';

import { Button } from '@/components/ui/button';
import { Service } from '@/utils/service-helpers/service-base';
import { User, UserResponse } from '@supabase/supabase-js';
import FirstSignIn from '@/components/popup/service-panel/FirstSignIn';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const openSettings = () => {
  chrome.runtime.sendMessage({ type: 'open-settings' });
};

function App() {
  const [currentService, setCurrentService] = useState<Service | undefined>(
    undefined,
  );
  const [googleSignIn, setGoogleSignIn] = useState<User | undefined>(undefined);
  const [supabaseUser, setSupabaseUser] = useState<UserResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const service = await getService();
        setCurrentService(service);
        const supabaseUser = await supabase.getUser();
        setSupabaseUser(supabaseUser);
        const userData = supabaseUser.data.user;
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
          <ServicePanel
            currentService={currentService}
            supabaseUser={supabaseUser}
          />
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
