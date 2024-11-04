export default defineContentScript({
  matches: ['*://*.youtube.com/*', '*://*.twitch.tv/*'],
  main() {
    function injectMessage(text: string, username: string) {
      window.postMessage(
        {
          message: 'inject_message',
          username,
          text,
        },
        '*',
      );
    }

    // Inject the main world script
    injectScript('/twitch-chat-main-world.js', {
      keepInDom: true,
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      request = request.request;

      if (request.message === 'inject_message') {
        injectMessage(request.text, request.username);
        sendResponse(true);
      }
    });
  },
});
