import Stack from "@mui/material/Stack";
import Youtube from "../service/Youtube";
import Divider from "@mui/material/Divider";
import Twitch from "../service/Twitch";
import React from "react";
import { twitchUrl, youtubeUrl } from '@/utils/constants';

function ServicePanel () {
  const [currentUrl, setCurrentUrl] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urlStr = tabs[0]?.url ?? '';
      if (urlStr) {
        setCurrentUrl(new URL(urlStr));
      }
    });
  }, []);

  let hostService: React.ReactNode | null = null;
  let alternativeServices: React.ReactNode[] = [];
  
  if (currentUrl && currentUrl.hostname === youtubeUrl) {
    hostService = <Youtube />;
    alternativeServices = [<Twitch key="twitch" />];
  } else if (currentUrl && currentUrl.hostname === twitchUrl) {
    hostService = <Twitch />;
    alternativeServices = [<Youtube key="youtube" />];
  }
  else {
    alternativeServices = [<Youtube key="youtube" />, <Twitch key="twitch" />];
  }

  return(
    <>
      <Stack direction="row">
        {hostService}
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack divider={<Divider flexItem />}>
        {alternativeServices.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
        </ Stack>
      </ Stack>
    </>
  );
}

export default ServicePanel;
