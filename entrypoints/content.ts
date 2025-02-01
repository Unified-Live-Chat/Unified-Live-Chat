export default defineContentScript({
  matches: ['*://*.youtube.com/*', '*://*.twitch.tv/*'],
  allFrames: true,
  main() {
    function injectMessage(currentUrl: URL, text: string, username: string) {

      if (currentUrl.hostname === 'www.youtube.com') {
        // Convert these over to use chrome.runtime messages so I can relay the Continuation data back and unify the formatting
        window.postMessage(
          {
            message: 'inject_message',
            username,
            text,
          },
          '*',
        );
      } else if (currentUrl.hostname === 'www.twitch.tv') {
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

  let currentUrl: URL | null = new URL(window.location.href);

  if (currentUrl && currentUrl.hostname === 'www.youtube.com') {
    injectScript('/youtube-main-world.js', {
      keepInDom: true,
    });
  } else if (currentUrl && currentUrl.hostname === 'www.twitch.tv') {
    injectScript('/twitch-main-world.js', {
      keepInDom: true,
    });
  } else {
    console.error("Attempted to run content.ts to invalid site.")
  }

    // // Inject the main world script

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      request = request.request;

      if (request.message === 'inject_message') {
        injectMessage(currentUrl, request.text, request.username);
        sendResponse(true);
      }
    });

    // window.addEventListener('message', (event) => {
    //   if (event.data.message === 'continuation_token') 
    //   {
    //     const continuation = event.data.continuation;

    //     const youtubeMessage: YouTubeMessage = youtubeMessageBuilder("myUsername", "message");
  
    //     fetch('https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?prettyPrint=false', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Origin': 'https://www.youtube.com',
    //       },
    //       body: JSON.stringify({
    //         context: {
    //           client: {
    //             hl: "en",
    //             gl: "US",
    //             clientName: "WEB",
    //             clientVersion: "2.20241121.01.00",
    //           }
    //         },
    //         // youtubeMessage,
    //         continuation: continuation,
    //         webClientInfo: {
    //           isDocumentHidden: false
    //         }
    //       })
    //     })
    //   }
    // });

    // function youtubeMessageBuilder(username: string, text: string) {
    //   const youtubeMessage: YouTubeMessage = {
    //     actions: [
    //       {
    //         addChatItemAction: {
    //           item: {
    //             liveChatMessageRenderer: {
    //               authorName: {
    //                 simpleText: username,
    //               },
    //               id: "liveChatMessageRendererId",
    //               message: {
    //                 runs: [
    //                   {
    //                     text: text
    //                   },
    //                 ]
    //               },
    //               timestampUsec: `${(Date.now() * 1000) - 750}`,
    //               authorExternalChannelId: "authorExternalChannelId",
    //               authorPhoto: {
    //                 thumbnails:
    //                 [
    //                   {
    //                     height: 32,
    //                     width: 32,
    //                     url: "https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s32-c-k-c0x00ffffff-no-rj"
    //                   },
    //                   {
    //                     height: 64,
    //                     width: 64,
    //                     url: "https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s64-c-k-c0x00ffffff-no-rj"
    //                   },
    //                 ]
    //               },
    //               contextMenuAccessibility: 
    //               {
    //                 accessibilityData: {
    //                   label: "Chat actions"
    //                 },
    //               },
    //               contextMenuEndpoint: {
    //                 commandMetadata: {
    //                   webCommandMetadata: {
    //                     ignoreNavigation: true,
    //                   }
    //                 },
    //                 liveChatItemContextMenuEndpoint: {
    //                   params: "liveChatItemContextMenuEndpointParams"
    //                 },
    //                 id: "contextMenuEndpointId"
    //               }
    //             }
    //           },
    //         },
    //       }
    //     ],
    //   };
    
    //   return youtubeMessage;
    // }
  

  },
});
