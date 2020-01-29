import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import authService from './services/authorization'
import spotifyService from './services/spotify'
import AuthorizePanel from './components/authorize_panel.js'
import Player from './components/player.js'
import './stylesheets/index.scss';

const AuthConditional = (props) => {
  if(props.authorized) {
    return (
      <Player
        updatePlaybackData={props.updatePlaybackData}
        playbackData={props.playbackData}
        handlePlayPauseButtonClick={props.handlePlayPauseButtonClick}
        handleNextButtonClick={props.handleNextButtonClick}
        handlePrevButtonClick={props.handlePrevButtonClick}
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

  const togglePlay = () => {
    spotifyService
      .togglePlay(token, playbackData.is_playing)
        .then(response =>
          updatePlaybackData())
  }

  const adjacentTrack = (direction) => {
    spotifyService
      .adjacentTrack(token, direction)
        .then(response =>
          updatePlaybackData())
  }

  return (
    <div>
      <h1>React & Spotify!</h1>
      <AuthConditional
        authorized={token ? true : false}
        handleAuthButtonClick={authService.authorizeRedirect}
        updatePlaybackData={updatePlaybackData}
        playbackData={playbackData}
        handlePlayPauseButtonClick={togglePlay}
        handleNextButtonClick={() => adjacentTrack("next")}
        handlePrevButtonClick={() => adjacentTrack("previous")}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
