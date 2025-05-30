import { Provider, SupabaseClient } from '@supabase/supabase-js';

export async function authenticateTwitch(
  supabase: SupabaseClient,
  provider: Provider,
  scopes: string,
) {
  const { data, error } = await supabase.auth.linkIdentity({
    provider: provider,
    options: {
      scopes: scopes,
      redirectTo: chrome.identity.getRedirectURL(),
    },
  });

  if (error) throw error;

  await chrome.tabs.create({ url: data.url });
}

// I will need to work on making this a fully
// customable class once more features are in.
export function twitchMessageBuilder(username: string, text: string) {
  const twitchMessage: TwitchMessage = {
    badges: {},
    badgeDynamicData: {},
    bits: 0,
    user: {
      userDisplayName: username,
      isIntl: false,
      userLogin: username,
      userID: '00000000',
      userType: '',
      color: '#FF0000',
      isSubscriber: false,
    },
    messageParts: [
      {
        type: 0,
        content: text,
      },
    ],
    messageBody: text,
    deleted: false,
    banned: false,
    hidden: false,
    timestamp: Date.now(),
    type: 0,
    messageType: 0,
    isHistorical: false,
    id: crypto.randomUUID(),
  };

  return twitchMessage;
}

// TS interface for on-page data
export interface ReactFiber {
  return: ReactFiber | null;
  stateNode?: {
    props?: {
      onPushMessage?: (message: TwitchMessage) => void;
    };
  };
  [key: string]: unknown;
}

export interface DOMElement extends HTMLElement {
  [key: string]: unknown;
}

interface TwitchBadges {
  [key: string]: string;
}

interface TwitchUser {
  userDisplayName: string;
  isIntl: boolean;
  userLogin: string;
  userID: string;
  userType: string;
  color: string;
  isSubscriber: boolean;
}

interface MessagePart {
  type: number;
  content: string;
}

export interface TwitchMessage {
  badges: TwitchBadges;
  badgeDynamicData: Record<string, unknown>;
  bits: number;
  user: TwitchUser;
  messageParts: MessagePart[];
  messageBody: string;
  deleted: boolean;
  banned: boolean;
  hidden: boolean;
  timestamp: number;
  type: number;
  messageType: number;
  isHistorical: boolean;
  id: string;
}
