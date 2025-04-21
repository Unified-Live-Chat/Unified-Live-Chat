import { Provider, SupabaseClient } from '@supabase/supabase-js';

export async function authenticateYouTube(
  supabase: SupabaseClient,
  provider: Provider,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes: string,
) {
  const manifest = chrome.runtime.getManifest();
  const url = new URL('https://accounts.google.com/o/oauth2/auth');
  url.searchParams.set('client_id', manifest!.oauth2!.client_id);
  url.searchParams.set('response_type', 'id_token');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set(
    'redirect_uri',
    `https://${chrome.runtime.id}.chromiumapp.org`,
  );
  url.searchParams.set('scope', manifest!.oauth2!.scopes!.join(' '));
  chrome.identity.launchWebAuthFlow(
    {
      url: url.href,
      interactive: true,
    },
    async (redirectedTo) => {
      if (chrome.runtime.lastError) {
        // auth was not successful
      } else {
        // auth was successful, extract the ID token from the redirectedTo URL
        const url = new URL(redirectedTo!);
        const params = new URLSearchParams(url.hash);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: provider,
          token: params.get('id_token')!,
        });
      }
    },
  );
}

export function youtubeMessageBuilder(username: string, text: string) {
  const youtubeMessage: YouTubeMessage = {
    clientId:
      Math.random().toString().slice(2, 10) +
      '-' +
      Math.random().toString().slice(2, 19),

    item: {
      liveChatMessageRenderer: {
        authorName: {
          simpleText: username,
        },
        id: Math.random().toString().slice(2, 28),
        message: {
          runs: [
            {
              text: text,
            },
          ],
        },
        timestampUsec: `${Date.now() * 1000 - 750}`,
        authorExternalChannelId: 'authorExternalChannelId',
        authorPhoto: {
          thumbnails: [
            {
              height: 32,
              width: 32,
              url: 'https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s32-c-k-c0x00ffffff-no-rj',
            },
            {
              height: 64,
              width: 64,
              url: 'https://yt4.ggpht.com/ytc/AIdro_nCvUJtQnvaaOD1Q30jdaIxwefa2B_3THqZYO656R726g=s64-c-k-c0x00ffffff-no-rj',
            },
          ],
        },
        contextMenuAccessibility: {
          accessibilityData: {
            label: 'Chat actions',
          },
        },
        contextMenuEndpoint: {
          commandMetadata: {
            webCommandMetadata: {
              ignoreNavigation: true,
            },
          },
          liveChatItemContextMenuEndpoint: {
            params: 'liveChatItemContextMenuEndpointParams',
          },
          id: 'ChwKGkNJM2dsX2ZoLVlrREZXMEoxZ0FkSGprWk5k',
        },
      },
    },
  };

  return youtubeMessage;
}

// Live Chat iFrame Code
export interface YtLiveChatItemListRenderer extends Element {
  ytActionHandlerBehavior: YtActionHandlerBehavior;
}

export interface YtActionHandlerBehavior {
  handleLiveChatActions_: (
    actions: Array<{
      addChatItemAction: YouTubeMessage;
    }>,
  ) => void;
}

// Message format
interface Runs {
  text: string;
}

interface Message {
  runs: Runs[];
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
  contextMenuEndpoint: ContextMenuEndpoint;
  id: string;
  message: Message;
  timestampUsec: string;
}

interface Item {
  liveChatMessageRenderer: LiveChatMessageRenderer;
}

export interface YouTubeMessage {
  clientId?: string;
  item: Item;
}
