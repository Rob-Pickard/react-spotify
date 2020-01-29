import axios from 'axios'

const baseUrl = 'https://api.spotify.com/'

const updatePlaybackData = (token) => {
  const request = axios.get(`${baseUrl}v1/me/player`,
    {headers: {'Authorization': `Bearer ${token}`}
  })
  return request.then(response => {
    console.log("Spotify playbackData response", response)
    return response.data
  })
}

const togglePlay = (token, isPlaying) => {
  const action = (isPlaying ? "pause" : "play")
  const request = axios.put(`${baseUrl}v1/me/player/${action}`,
    {},
    {headers: {'Authorization': `Bearer ${token}`}
  })
  return request.then(response => response.data)
}

const adjacentTrack = (token, direction) => {
  const request = axios.post(`${baseUrl}v1/me/player/${direction}`,
    {},
    {headers: {'Authorization': `Bearer ${token}`}
  })
  return request.then(response => {
    console.log("Spotify skip response", direction, response)
    return response.data
  })
}

export default { updatePlaybackData, togglePlay, adjacentTrack }
