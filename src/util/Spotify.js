const redirectURI = 'http://localhost:3000/';
const baseUrl = 'https://api.spotify.com/v1/';
const spotifyAppID = process.env.REACT_APP_SPOTIFY_APP_ID;
let userAccessToken;

const Spotify = {
  getAccessToken() {
    if (userAccessToken) return userAccessToken;
    const regexToken = /access_token=([^&]*)/;
    const regexExp = /expires_in=([0-9]*)/;
    const token = window.location.href.match(regexToken);
    const expiration = window.location.href.match(regexExp);
    if (token && expiration) {
      userAccessToken = token[1];
      let expiresIn = Number(expiration[1]) * 1000;
      window.setTimeout(() => {
        userAccessToken = '';
      }, expiresIn);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyAppID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
  async search(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `search?type=track&q=${term}`;
    const urlToFetch = `${baseUrl}${endpoint}`;
    const headers = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(urlToFetch, headers);
    if (response.ok) {
      const data = await response.json();
      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        URI: track.uri,
      }));
    } else {
      return [];
    }
  },
  async savePlaylist(playlistName, tracklist) {
    if (!playlistName && !tracklist) return;
    const accessToken = this.getAccessToken();
    const headers = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let userID;
    const userEndpoint = 'me';
    const urlToFetch = `${baseUrl}${userEndpoint}`;
    const response = await fetch(urlToFetch, headers);
    if (response.ok) {
      const data = await response.json();
      userID = data.id;
      const playlistEndpoint = `users/${userID}/playlists`;
      const postPlaylistHeaders = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: playlistName }),
      };
      const urlToPost = `${baseUrl}${playlistEndpoint}`;
      const postResponse = await fetch(urlToPost, postPlaylistHeaders);
      if (postResponse.ok) {
        const playlistData = await postResponse.json();
        let playlistID = playlistData.id;
        const addItemsEndpoint = `${playlistEndpoint}/${playlistID}/tracks`;
        const urlToAddItems = `${baseUrl}${addItemsEndpoint}`;
        const postItemsHeaders = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ uris: tracklist }),
        };
        console.log(urlToAddItems, postItemsHeaders);
        const addItemsResponse = await fetch(urlToAddItems, postItemsHeaders);
        if (addItemsResponse.ok) {
          const playlistFilled = await addItemsResponse.json();
          playlistID = playlistFilled.id;
          console.log(playlistFilled);
        }
      }
    }
  },
};

export default Spotify;
