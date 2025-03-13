export default defineContentScript({
  matches: ['*://*.youtube.com/*', '*://*.twitch.tv/*'],
  allFrames: true,
  main() {
    function injectMessage(currentUrl: URL, text: string, username: string) {
      // Lets keep these identical while developing blocking issues
      if (currentUrl.hostname === youtubeUrl) {
        window.postMessage(
          {
            message: 'inject_message',
            username,
            text,
          },
          '*',
        );
      } else if (currentUrl.hostname === twitchUrl) {
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

    if (currentUrl && currentUrl.hostname === youtubeUrl) {
      injectScript('/youtube-injection-script.js', {
        keepInDom: true,
      });
    } else if (currentUrl && currentUrl.hostname === twitchUrl) {
      injectScript('/twitch-injection-script.js', {
        keepInDom: true,
      });
    } else {
      console.error('Attempted to run content.ts to invalid site.');
    }

    // Inject messages via the injection script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'inject_message') {
        injectMessage(currentUrl, request.text, request.username);
        sendResponse(true);
      }
    });
  },
});
