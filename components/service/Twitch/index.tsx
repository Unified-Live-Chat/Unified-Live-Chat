import { useState } from 'react';
import './styles.css';
import '../service.css';

function Twitch() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <div className="service twitch">
        <p>Twitch</p>
        <input
          className="connect"
          type="button"
          value="Connect Account"
          onClick={() => {
            chrome.runtime.sendMessage({
              message: 'get_auth_token_twitch',
            });
          }}
        />

        {/* Input field for Username */}
        <input
          className="usernameInput"
          type="text"
          placeholder="Enter Username"
          value={username}
          // Update the username state when user types in input
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Input field for Message */}
        <input
          className="messageInput"
          type="text"
          placeholder="Enter Message"
          value={message}
          // Update the message state when user types in input
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          className="message"
          type="button"
          value="Send Message"
          onClick={() => {
            console.log(username, message);
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
      </div>
    </>
  );
}

export default Twitch;
