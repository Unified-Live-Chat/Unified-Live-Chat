import Stack from "@mui/material/Stack";
import Youtube from "../service/Youtube";
import Divider from "@mui/material/Divider";
import Twitch from "../service/Twitch";
import React from "react";

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
  
  if (currentUrl && currentUrl.hostname === 'www.youtube.com') {
    hostService = <Youtube />;
    alternativeServices = [<Twitch key="twitch" />];
  } else if (currentUrl && currentUrl.hostname === 'www.twitch.tv') {
    hostService = <Twitch />;
    alternativeServices = [<Youtube key="youtube" />];
  }
  else {
    // hostService = <Greetings />; (TODO)
    alternativeServices = [<Youtube key="youtube" />, <Twitch key="twitch" />];
  }

  if (currentUrl && currentUrl.hostname === 'www.youtube.com') {
  } else if (currentUrl && currentUrl.hostname === 'www.twitch.tv') {
  } else {
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
