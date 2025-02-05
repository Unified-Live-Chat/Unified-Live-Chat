import {
  TwitchMessage,
  twitchMessageBuilder,
  ReactFiber,
  DOMElement,
} from '@/utils/twitch-helper';

export default defineUnlistedScript(() => {
  // Only run on Twitch
  const currentUrl: URL | null = new URL(window.location.href);
  if (!currentUrl || currentUrl.hostname !== 'www.twitch.tv') {
    return;
  }

  // Helper Functions:
  function getReactInternal(element: DOMElement): ReactFiber | null {
    const key = Object.keys(element).find((key) =>
      key.startsWith('__reactFiber$'),
    );
    return key ? (element[key] as ReactFiber) : null;
  }

  function searchReactParents(
    node: ReactFiber | null,
    predicate: (node: ReactFiber) => boolean,
    maxDepth = 15,
    depth = 0,
  ) {
    try {
      if (node && predicate(node)) {
        return node;
      }
    } catch {
      // Do nothing if we get an error
    }

    if (!node || depth > maxDepth) {
      return null;
    }

    const { return: parent } = node;
    if (parent) {
      return searchReactParents(parent, predicate, maxDepth, depth + 1);
    }

    return null;
  }

  function findChatElement() {
    const chatContainer = document.querySelector(
      '.chat-scrollable-area__message-container',
    ) as DOMElement | null;
    if (!chatContainer) return;

    const reactInstance = getReactInternal(chatContainer);
    if (!reactInstance) return;

    const node = searchReactParents(
      reactInstance,
      (n: ReactFiber) => Boolean(n.stateNode?.props?.onPushMessage),
      30,
    );

    return node;
  }

  // Site Elements:
  let chatElement: ReactFiber | null | undefined = null;

  // Client Functions
  function injectFakeMessage(username: string, text: string) {
    if (!chatElement) throw new Error('chat element is undefined.');
    if (!chatElement.stateNode)
      throw new Error(
        'chat element state is undefined: ' + JSON.stringify(chatElement),
      );
    if (!chatElement.stateNode.props)
      throw new Error(
        'chat element state props is undefined: ' +
          JSON.stringify(chatElement.stateNode),
      );

    const fakeMessage: TwitchMessage = twitchMessageBuilder(username, text);

    if (chatElement.stateNode.props.onPushMessage) {
      chatElement.stateNode.props.onPushMessage(fakeMessage);
    }
  }

  // Listener
  window.addEventListener('message', (event) => {
    if (event.data.message === 'inject_message') {
      if (!chatElement) {
        chatElement = findChatElement();
      }

      injectFakeMessage(event.data.username, event.data.text);
    }
  });
});
