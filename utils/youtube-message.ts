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
