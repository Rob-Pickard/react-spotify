import React from 'react';
import spotifyLogo from '../assets/spotify-logo.png';
import reactLogo from '../assets/react-logo.png';

const AuthorizeCover = (props) => (
  <div className="login-background">
    <div className="login-button-container">
      <button
        onClick={props.handleClick}
        className="login-button"
      >
        Log in with Spotify
      </button>
    </div>
    <div className="login-page-image-container">
      <img
        src={spotifyLogo}
        alt="Spotify logo"
        className="login-tech-logo-spotify"
      />
      <img
        src={reactLogo}
        alt="React JS logo"
        className="login-tech-logo-react"
      />
    </div>
  </div>
)

export default AuthorizeCover
