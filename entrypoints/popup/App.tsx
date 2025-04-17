import './App.css';
import '~/tailwind.css';

import Dashboard from '@/components/popup/Dashboard';
import ServicePanel from '@/components/popup/service/ServicePanel';
import { IconButton, Stack } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import { twitchUrl, youtubeUrl } from '@/utils/constants';

const isStreamingService = (url: URL | null): boolean => {
  if (!url) return false;

  return url.hostname.includes(twitchUrl) || url.hostname.includes(youtubeUrl);
};

const openSettings = () => {
  chrome.runtime.sendMessage({ type: 'open-settings' });
};

function App() {
  const [currentUrl, setCurrentUrl] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urlStr = tabs[0]?.url ?? '';
      if (urlStr) {
        setCurrentUrl(new URL(urlStr));
      }
    });
  }, []);

  const isValidService = isStreamingService(currentUrl);

  return (
    <>
      <Stack>
        {isValidService && <Dashboard />}
        <ServicePanel />
      </Stack>

      <IconButton
        aria-label="Settings"
        onClick={openSettings}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
        }}
      >
        <Settings />
      </IconButton>
    </>
  );
}

export default App;
