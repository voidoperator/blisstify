const redirectURI = 'http://localhost:3000/';
let userAccessToken;

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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_APP_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const baseUrl = 'https://api.spotify.com/v1/';
    const endpoint = `search?type=track&q=${term}`;
    const urlToFetch = `${baseUrl}${endpoint}`;
    const fetchConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(urlToFetch, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        return data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          URI: track.uri,
        }));
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default Spotify;
