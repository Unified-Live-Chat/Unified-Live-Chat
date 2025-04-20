/**
 * A simple debug UI that can pass a username and message
 * into the injection script
 */
function Debug() {
  const [username, setUsername] = useState('ExampleUsername');
  const [message, setMessage] = useState('Example message');

  return (
    <>
      {/* Input field for Username */}
      <input
        className="flex-none w-auto mx-[10%] mb-1"
        type="text"
        placeholder="Enter Username"
        // Update the username state when user types in input
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Input field for Message */}
      <input
        className="flex-none w-auto mx-[10%] mb-1"
        type="text"
        placeholder="Enter Message"
        // Update the message state when user types in input
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        className="flex-none w-auto mx-[10%] mb-1"
        type="button"
        value="Send Message"
        onClick={() => {
          chrome.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => {
              chrome.tabs.sendMessage(tabs[0].id!, {
                message: 'inject_message',
                username: username,
                text: message,
              });
            });
        }}
      />
    </>
  );
}

export default Debug;
