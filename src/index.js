import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const AuthorizeButton = (props) => (
  <button
    onClick={props.handleClick}
  >
    Authorize
  </button>
)

const App = () => {

  // Add state to auth flow for security
  const baseAuthUrl = 'https://accounts.spotify.com/authorize?'
  const redirectUri = 'http://localhost:3000/' // Change for production
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const authorize = () => {
    window.location= `${baseAuthUrl}client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`
  }

  return (
    <div>
      <AuthorizeButton
        handleClick={authorize}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
