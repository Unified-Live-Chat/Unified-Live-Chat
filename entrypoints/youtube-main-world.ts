export default defineUnlistedScript(() => {
  
  // Only run on YouTube
  let currentUrl: URL | null = new URL(window.location.href);
  if (!currentUrl || currentUrl.hostname !== 'www.youtube.com')
    return;

  // Only run in the `chatframe` frame
  if (!window.frameElement || window.frameElement.id !== 'chatframe') 
    return;


  const chatContainer = document.querySelector(
    'yt-live-chat-item-list-renderer',
  )
  // @ts-ignore
  const actionHandler = chatContainer!.ytActionHandlerBehavior;

  // Only run if the `actionHandler` exists
  if (!actionHandler) 
      return;


  function youtubeMessageBuilder(username: string, text: string) {
    const youtubeMessage: YouTubeMessage = {
      addChatItemAction: {
        clientId: Math.random().toString().slice(2, 10) + "-" + Math.random().toString().slice(2, 19),
        
        item: {
          liveChatMessageRenderer: {
            authorName: {
              simpleText: username,
            },
            id: Math.random().toString().slice(2, 28),
            message: {
              runs: [
                {
                  text: text
                },
              ]
            },
            timestampUsec: `${(Date.now() * 1000) - 750}`,
            authorExternalChannelId: "authorExternalChannelId",
            authorPhoto: {
              thumbnails:
              [
                {
                  height: 32,
                  width: 32,
                  url: "https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s32-c-k-c0x00ffffff-no-rj"
                },
                {
                  height: 64,
                  width: 64,
                  url: "https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s64-c-k-c0x00ffffff-no-rj"
                },
              ]
            },
            contextMenuAccessibility: 
            {
              accessibilityData: {
                label: "Chat actions"
              },
            },
            contextMenuEndpoint: {
              commandMetadata: {
                webCommandMetadata: {
                  ignoreNavigation: true,
                }
              },
              liveChatItemContextMenuEndpoint: {
                params: "liveChatItemContextMenuEndpointParams"
              },
              id: "ChwKGkNJM2dsX2ZoLVlrREZXMEoxZ0FkSGprWk5k",
            }
          }
        },
      },
    };
  
    return youtubeMessage;
  }

  function injectFakeMessage(username: string, text: string) {
      const fakeMessage: YouTubeMessage = youtubeMessageBuilder(username, text);

      actionHandler.onPushMessage(fakeMessage);
  }

  window.addEventListener('message', (event) => {
    if (event.data.message === 'inject_message') {
      injectFakeMessage(event.data.username, event.data.text);
    }
  });
});
