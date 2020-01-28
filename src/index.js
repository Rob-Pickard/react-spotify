import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import authService from './services/authorization'
import spotifyService from './services/spotify'
import './index.css';

const AuthorizeButton = (props) => {
  if(!props.authorized) {
    return (
      <button
        onClick={props.handleClick}
        >
        Log in with Spotify
      </button>
    )
  }
  return null
}

const TrackButton = (props) => {
  return (
    <div>
      <button
        onClick={props.handleClick}
        >
        Update
      </button>
    </div>
  )
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
      <AuthorizeButton
        handleClick={authService.authorizeRedirect}
        authorized={token ? true : false}
      />
      <TrackButton
        handleClick={updateTrack}
        currentTrack={currentTrack}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
