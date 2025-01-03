export default defineUnlistedScript(() => {

  // Only run on Twitch
  let currentUrl: URL | null = new URL(window.location.href);
  if (!currentUrl || currentUrl.hostname !== 'www.twitch.tv') {
    return;
  }

  // Helper Functions:
  function getReactInternal(element: any) {
    const key = Object.keys(element).find((key) =>
      key.startsWith('__reactFiber$'),
    );
    return key ? element[key] : null;
  }

  function searchReactParents(
    node: any,
    predicate: any,
    maxDepth = 15,
    depth = 0,
  ) {
    try {
      if (predicate(node)) {
        return node;
      }
    } catch (_) {}

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
    );
    if (!chatContainer) return;

    const reactInstance = getReactInternal(chatContainer);
    if (!reactInstance) return;

    const node = searchReactParents(
      reactInstance,
      (n: any) => n.stateNode?.props?.onPushMessage,
      30,
    );

    return node;
  }

  function twitchMessageBuilder(username: string, text: string) {
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

  // Site Elements:
  let chatElement: any | null = null;


  // Client Functions
  function injectFakeMessage(username: string, text: string) {

    if (!chatElement) {
      chatElement = findChatElement();
    }

    if (chatElement?.stateNode) {
      const fakeMessage: TwitchMessage = twitchMessageBuilder(username, text);

      if (chatElement.stateNode.props.onPushMessage) {
        chatElement.stateNode.props.onPushMessage(fakeMessage);
      }
    }
  }

  // Listener
  window.addEventListener('message', (event) => {
    if (event.data.message === 'inject_message') {
      injectFakeMessage(event.data.username, event.data.text);
    }
  });
});
