import './App.css';

import Dashboard from '@/components/Dashboard';
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import ServicePanel from '@/components/ServicePanel';

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

  if (currentUrl && currentUrl.hostname === 'www.youtube.com') {
  } else if (currentUrl && currentUrl.hostname === 'www.twitch.tv') {
  } else {
  }

  return (
    <>
      <Stack>
        <Dashboard />
        <Divider variant="middle" />
        <ServicePanel />
      </Stack>
    </>
  );
}

export default App;
