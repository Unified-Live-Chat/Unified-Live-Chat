function Debug() {
    const [username, setUsername] = useState('ExampleUsername');
    const [message, setMessage] = useState('Example message');
  
    return (
      <>
      {/* Input field for Username */}
      <input
          className="usernameInput"
          type="text"
          placeholder="Enter Username"
          // Update the username state when user types in input
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Input field for Message */}
        <input
          className="messageInput"
          type="text"
          placeholder="Enter Message"
          // Update the message state when user types in input
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          className="message"
          type="button"
          value="Send Message"
          onClick={() => {
            chrome.runtime.sendMessage(
              {
                message: 'inject_message',
                username: username,
                text: message,
              },
              function (response) {
                console.log(
                  'Response from background or content script:',
                  response,
                );
              },
            );
          }}
        />
      </>
    )
}

export default Debug;