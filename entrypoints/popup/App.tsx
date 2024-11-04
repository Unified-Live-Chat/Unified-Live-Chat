import './App.css';

import Youtube from '@/components/service/Youtube';
import Twitch from '@/components/service/Twitch';
import Dashboard from '@/components/Dashboard';

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
      <Dashboard />
      <div className="container">
        <Youtube />
        <Twitch />
      </div>
    </>
  );
}

export default App;
