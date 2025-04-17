import {
  YouTubeMessage,
  youtubeMessageBuilder,
  YtLiveChatItemListRenderer,
  YtActionHandlerBehavior,
} from '@/utils/youtube-helper';

export default defineUnlistedScript(() => {
  // Only run on YouTube
  const currentUrl: URL | null = new URL(window.location.href);
  if (!currentUrl || currentUrl.hostname !== 'www.youtube.com') return;

  // Only run in the `chatframe` frame
  if (!window.frameElement || window.frameElement.id !== 'chatframe') return;

  const chatContainer = document.querySelector(
    'yt-live-chat-item-list-renderer',
  ) as YtLiveChatItemListRenderer;

  const actionHandler =
    chatContainer.ytActionHandlerBehavior as YtActionHandlerBehavior;

  // Only run if the `actionHandler` exists
  if (!actionHandler) return;

  function injectFakeMessage(username: string, text: string) {
    const fakeMessage: YouTubeMessage = youtubeMessageBuilder(username, text);

    actionHandler.handleLiveChatActions_([{ addChatItemAction: fakeMessage }]);
  }

  window.addEventListener('message', (event) => {
    if (event.data.message === 'inject_message') {
      injectFakeMessage(event.data.username, event.data.text);
    }
  });
});
