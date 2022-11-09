import spotifyAppID from '../../private/privateKeys';
const redirectURI = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
  getAccessToken() {
    if (userAccessToken) return;
    const regexToken = /access_token=([^&]*)/;
    const regexExp = /expires_in=([0-9]*)/;
    const token = window.location.href.match(regexToken);
    const expiration = window.location.href.match(regexExp);
    if (token && expiration) {
      userAccessToken = token[1];
      let expiresIn = Number(expiration[1]);
      window.setTimeout(() => (userAccessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyAppID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
};

export default Spotify;
