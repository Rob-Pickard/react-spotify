import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import authService from './services/authorization'
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
  console.log(props.currentTrack)

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

  const baseUrl = 'https://api.spotify.com/'

  // Check for token on app render
  useEffect(() => {
    setToken(authService.tokenCheck())
  }, [])

  const updateTrack = () => {
    const request = axios.get(`${baseUrl}v1/me/player/currently-playing`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
    request.then(response => setCurrentTrack(response.data.item))
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
