// Add state to auth flow for security
const scope = 'user-read-playback-state streaming user-modify-playback-state user-read-currently-playing playlist-read-private app-remote-control user-library-read'
const baseAuthUrl = 'https://accounts.spotify.com/authorize?'
const redirectUri = 'http://localhost:3000/' // Change for production
const clientId = process.env.REACT_APP_CLIENT_ID;

const tokenCheck = () => {
  const hash = window.location.hash.substring(1)
  const params = {}
  hash.split('&').forEach(param => {
    let keyValue = param.split('=');
    params[keyValue[0]] = keyValue[1]
  });
  if(params.access_token !== undefined) {
    return params.access_token
  }
  return false
}

const authorizeRedirect = () => {
  window.location = `${baseAuthUrl}client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`
}

export default { tokenCheck, authorizeRedirect }
