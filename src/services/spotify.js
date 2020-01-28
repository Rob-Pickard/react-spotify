import axios from 'axios'

const baseUrl = 'https://api.spotify.com/'

const updateTrack = (token) => {
  const request = axios.get(`${baseUrl}v1/me/player/currently-playing`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
  request.then(response => {
    console.log(response.data.item) // Log track
    return response.data.item})
}

export default { updateTrack }
