export default defineUnlistedScript(() => {
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

  function injectFakeMessage(username: string, text: string = 'TestUser') {
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

    if (node?.stateNode) {
      const fakeMessage: TwitchMessage = {
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

      if (node.stateNode.props.onPushMessage) {
        node.stateNode.props.onPushMessage(fakeMessage);
      }
    }
  }

  // Listen for inject message requests from the content script
  window.addEventListener('message', (event) => {
    if (event.data.message === 'inject_message') {
      injectFakeMessage(event.data.username, event.data.text);
    }
  });
});
