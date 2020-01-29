import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import authService from './services/authorization'
import spotifyService from './services/spotify'
import AuthorizePanel from './components/authorize_panel.js'
import Player from './components/player.js'
import './index.css';

const AuthConditional = (props) => {
  if(props.authorized) {
    return (
      <Player
        updatePlaybackData={props.updatePlaybackData}
        playbackData={props.playbackData}
      />
    )
  }
  return (
    <AuthorizePanel
      handleClick={props.handleAuthButtonClick}
    />
  )
}

const App = () => {
  const [ token, setToken ] = useState(false)
  const [ playbackData, setPlaybackData ] = useState('')

  // Check for token on app render
  useEffect(() => {
    setToken(authService.tokenCheck())
  }, [])

  // Set playback data when token recieved
  useEffect(() => {
    if(token ? true : false) {
      updatePlaybackData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const updatePlaybackData = () => {
    spotifyService
    .updatePlaybackData(token)
    .then(newPlaybackData => setPlaybackData(newPlaybackData))
  }

  return (
    <div>
      <h1>React & Spotify!</h1>
      <AuthConditional
        authorized={token ? true : false}
        handleAuthButtonClick={authService.authorizeRedirect}
        updatePlaybackData={updatePlaybackData}
        playbackData={playbackData}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
