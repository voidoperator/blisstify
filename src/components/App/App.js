import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlaylistName: '',
      PlaylistTracks: [],
      SearchResults: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.PlaylistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) return;
    this.setState({ playlistTracks: tracks.push(track) });
  }

  removeTrack(track) {
    const tracks = this.state.PlaylistTracks;
    const filterTrack = tracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ PlaylistTracks: filterTrack });
  }

  updatePlaylistName(name) {
    const playlistName = this.state.PlaylistName;
    if (playlistName === name) return;
    this.setState({ PlaylistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map((track) => track.URI);
    console.log(trackUris);
    Spotify.savePlaylist(this.state.PlaylistName, trackUris);
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ SearchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              PlaylistName={this.state.PlaylistName}
              PlaylistTracks={this.state.PlaylistTracks}
              onRemove={this.removeTrack}
              onChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
