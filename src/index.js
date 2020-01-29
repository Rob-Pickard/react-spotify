import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import authService from './services/authorization'
import spotifyService from './services/spotify'
import AuthorizeCover from './components/authorize_panel.js'
import PlayingConditional from './components/player.js'
import './stylesheets/index.scss';

const AuthConditional = (props) => {
  if(props.authorized) {
    return (
      <div className="center-media-wrapper">
        <PlayingConditional
          updatePlaybackData={props.updatePlaybackData}
          playbackData={props.playbackData}
          handlePlayPauseButtonClick={props.handlePlayPauseButtonClick}
          handleNextButtonClick={props.handleNextButtonClick}
          handlePrevButtonClick={props.handlePrevButtonClick}
        />
      </div>
    )
  }
  return (
    <AuthorizeCover
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
    <AuthConditional
      authorized={token ? true : false}
      handleAuthButtonClick={authService.authorizeRedirect}
      updatePlaybackData={updatePlaybackData}
      playbackData={playbackData}
      handlePlayPauseButtonClick={togglePlay}
      handleNextButtonClick={() => adjacentTrack("next")}
      handlePrevButtonClick={() => adjacentTrack("previous")}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
