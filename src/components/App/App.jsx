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
      playlistName: '',
      playlistTracks: [],
      searchResults: [],
      firstTermSaved: '',
      playlistCheck: 0,
      isLoadingSave: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) return;
    this.setState({ playlistCheck: tracks.push(track) });
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    const filterTrack = tracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: filterTrack });
  }

  updatePlaylistName(name) {
    const playlistName = this.state.playlistName;
    if (playlistName === name) return;
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    this.setState({ isLoadingSave: true });
    const trackUris = this.state.playlistTracks.map((track) => track.URI);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({ playlistName: '', playlistTracks: [] });
      window.alert('Playlist successfully saved to profile!');
      this.setState({ isLoadingSave: false });
    });
  }

  search(term) {
    Spotify.search(term).then((results) => {
      this.setState({ searchResults: results });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Bli<span className="highlight">ss</span>tify
        </h1>
        <div className="App">
          <SearchBar value={this.state.firstTermSaved} onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onChange={this.updatePlaylistName}
              value={this.state.playlistName}
              onSave={this.savePlaylist}
              isLoading={this.state.isLoadingSave}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
