import { Stack, Divider } from '@mui/material';

import Youtube from './Youtube';
import Twitch from './Twitch';
import React, { JSX } from 'react';

function ServicePanel() {
  const [currentUrl, setCurrentUrl] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urlStr = tabs[0]?.url ?? '';
      if (urlStr) {
        setCurrentUrl(new URL(urlStr));
      }
    });
  }, []);

  const services: Record<string, JSX.Element> = {
    [youtubeUrl]: <Youtube />,
    [twitchUrl]: <Twitch />,
  };

  const hostService = currentUrl ? services[currentUrl.hostname] : null;
  const alternativeServices = Object.entries(services)
    .filter(([url]) => url !== currentUrl?.hostname)
    .map(([url, component]) => React.cloneElement(component, { key: url }));

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {hostService}
      {hostService && (
        <Divider orientation="vertical" variant="middle" flexItem />
      )}
      <Stack
        divider={<Divider flexItem />}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {alternativeServices.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default ServicePanel;
