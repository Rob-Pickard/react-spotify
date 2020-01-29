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

const UpdateButton = (props) => (
  <button
    onClick={props.handleClick}
  >
    Update
  </button>
)

const TrackInfo = (props) => {
  const playbackData = props.playbackData

  if (playbackData === '') {
    return (
      <div>
        <h2>No track playing</h2>
        <UpdateButton
          handleClick={props.updatePlaybackData}
        />
      </div>
    )
  } else {
    const item = playbackData.item
    return (
      <div>
        <h3>Listening on {playbackData.device.name}</h3>
          <img src={item.album.images[0].url} alt={item.album.name}/>
        <h3>{item.name}, by {item.artists[0].name}</h3>
        <UpdateButton
          handleClick={props.updatePlaybackData}
        />
      </div>
    )
  }
}

const Player = (props) => {
  if(props.authorized === true) {
    return (
      <TrackInfo
        updatePlaybackData={props.updatePlaybackData}
        playbackData={props.playbackData}
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
      <Player
        authorized={token ? true : false}
        playbackData={playbackData}
        updatePlaybackData={updatePlaybackData}
        handleAuthButtonClick={authService.authorizeRedirect}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
