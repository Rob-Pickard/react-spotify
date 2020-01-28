import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios'
import authService from './services/authorization'
import spotifyService from './services/spotify'
import './index.css';

const AuthorizeButton = (props) => (
  <button
    onClick={props.handleClick}
  >
    Log in with Spotify
  </button>
)

const TrackButton = (props) => (
  <div>
    <button
      onClick={props.handleClick}
      >
      Update
    </button>
  </div>
)

const Player = (props) => {
  if(props.authorized === true) {
    return (
      <TrackButton
        handleClick={props.handlTrackButtonClick}
      />
    )
  } else {
    return (
      <AuthorizeButton
        handleClick={props.handleAuthButtonClick}
      />
    )
  }
}

const App = () => {
  const [ token, setToken ] = useState(false)
  const [ currentTrack, setCurrentTrack ] = useState({})

  // Check for token on app render
  useEffect(() => {
    setToken(authService.tokenCheck())
  }, [])

  const updateTrack = () => {
    setCurrentTrack(spotifyService.updateTrack(token))
  }

  return (
    <div>
      <h1>Tabify</h1>
      <Player
        handlTrackButtonClick={updateTrack}
        handleAuthButtonClick={authService.authorizeRedirect}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
