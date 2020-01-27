import React, { useState, useEffect } from 'react';
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
  const [ token, setToken ] = useState(false)

  // Add state to auth flow for security
  const baseAuthUrl = 'https://accounts.spotify.com/authorize?'
  const redirectUri = 'http://localhost:3000/' // Change for production
  const clientId = process.env.REACT_APP_CLIENT_ID;

  // Check for token on app render
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = {}
    hash.split('&').forEach(param => {
      let keyValue = param.split('=');
      params[keyValue[0]] = keyValue[1]
    });
    if(params.access_token !== undefined) {
      setToken(params.access_token)
    }
  }, [])

  const authorizeRedirect = () => {
    window.location = `${baseAuthUrl}client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`
  }

  return (
    <div>
      <AuthorizeButton
        handleClick={authorizeRedirect}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
