import { Service } from '@/utils/constants';

export default defineContentScript({
  matches: ['*://*.youtube.com/*', '*://*.twitch.tv/*'],
  allFrames: true,
  async main() {
    /**
     * Sends a message from the content script to the injection script.
     * @param service The service to send the message to.
     * @param text The text of the message.
     * @param username The username associated with the message.
     */
    function injectMessage(service: Service, text: string, username: string) {
      // Lets keep these identical while developing
      if (service.name === Services.youtube.name) {
        window.postMessage(
          {
            message: 'inject_message',
            username,
            text,
          },
          '*',
        );
      } else if (service.name === Services.twitch.name) {
        window.postMessage(
          {
            message: 'inject_message',
            username,
            text,
          },
          '*',
        );
      }
    }

    const currentUrl: URL | null = new URL(window.location.href);
    const service: Service | undefined = getServiceFromUrl(currentUrl);

    if (service === undefined) {
      return;
    }

    if (service.name === Services.youtube.name) {
      injectScript('/youtube-main-world.js', {
        keepInDom: true,
      });
    } else if (service.name === Services.twitch.name) {
      injectScript('/twitch-main-world.js', {
        keepInDom: true,
      });
    } else {
      console.error('Attempted to run content.ts to invalid site.');
    }

    // Inject messages via the injection script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'inject_message') {
        injectMessage(service, request.text, request.username);
        sendResponse(true);
      }
    });
  },
});
