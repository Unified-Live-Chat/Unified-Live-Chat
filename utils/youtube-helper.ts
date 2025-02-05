function youtubeMessageBuilder(username: string, text: string) {
    const youtubeMessage: YouTubeMessage = {
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
    };
  
    return youtubeMessage;
  }

interface Runs {
    text: string;
}

interface Message {
    runs: Runs[]
}

interface Thumbnails {
    height: number;
    width: number;
    url: string;
}

interface AuthorPhoto {
    thumbnails: Thumbnails[];
}

interface SimpleText {
    simpleText: string;
}

interface AccessibilityData {
    label: string;
}

interface ContextMenuAccessibility {
    accessibilityData: AccessibilityData;
}

interface LiveChatItemContextMenuEndpoint {
    params: string;
}

interface WebCommandMetadata {
    ignoreNavigation: boolean;
}

interface CommandMetadata {
    webCommandMetadata: WebCommandMetadata;
}

interface ContextMenuEndpoint {
    commandMetadata: CommandMetadata;
    liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint;
    id: string;
}

interface LiveChatMessageRenderer {
    authorExternalChannelId: string;
    authorName: SimpleText;
    authorPhoto: AuthorPhoto;
    contextMenuAccessibility: ContextMenuAccessibility;
    contextMenuEndpoint: unknown;
    id: string;
    message: Message;
    timestampUsec: string;

}

interface Item {
    liveChatMessageRenderer: LiveChatMessageRenderer;
}


interface YouTubeMessage {
    clientId?: string; 
    item: Item;
}
