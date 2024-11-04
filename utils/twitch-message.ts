interface TwitchBadges {
  [key: string]: string; // e.g., "subscriber": "60"
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

interface TwitchMessage {
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
