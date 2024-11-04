import './styles.css';
import '../service.css';

function Youtube() {
  return (
    <>
      <div className="service youtube">
        <p>Youtube</p>
        <input
          className="connect"
          type="button"
          value="Connect Account"
          onClick={() => {
            chrome.runtime.sendMessage({
              message: 'get_auth_token_google',
            });
          }}
        />
      </div>
    </>
  );
}

export default Youtube;
