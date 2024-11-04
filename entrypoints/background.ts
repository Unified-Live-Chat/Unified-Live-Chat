export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_auth_token_google') {
      // TODO
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        console.log(token);
      });
      sendResponse(true);
    } else if (request.message === 'get_auth_token_twitch') {
      // TODO
      sendResponse(true);
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Ensure the active tab exists and has a valid id
        if (tabs.length > 0 && tabs[0].id !== undefined) {
          chrome.tabs.sendMessage(tabs[0].id, { request }, (response) => {
            console.log('Response from content script:', response);
          });
        } else {
          console.error('No active tab found or tab ID is undefined.');
        }
      });
    }
  });
});
