import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
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

  // Add state to auth flow for security
  const scope = 'user-read-playback-state streaming user-modify-playback-state user-read-currently-playing playlist-read-private app-remote-control user-library-read'
  const baseAuthUrl = 'https://accounts.spotify.com/authorize?'
  const redirectUri = 'http://localhost:3000/' // Change for production
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const baseUrl = 'https://api.spotify.com/'

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

  const updateTrack = () => {
    const request = axios.get(`${baseUrl}v1/me/player/currently-playing`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
    request.then(response => setCurrentTrack(response.data.item))
  }

  const authorizeRedirect = () => {
    window.location = `${baseAuthUrl}client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`
  }

  return (
    <div>
      <h1>Tabify</h1>
      <AuthorizeButton
        handleClick={authorizeRedirect}
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
