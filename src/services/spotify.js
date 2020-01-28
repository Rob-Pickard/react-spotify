import axios from 'axios'

const baseUrl = 'https://api.spotify.com/'

const updatePlaybackData = (token) => {
  const request = axios.get(`${baseUrl}v1/me/player`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
  return request.then(response => {
    console.log("Spotify service response", response)
    return response.data
  })
}

export default { updatePlaybackData }
