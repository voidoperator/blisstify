import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlaylistName: '',
      PlaylistTracks: [
        { name: 'name5', artist: 'artist5', album: 'album5', id: 5 },
        { name: 'name6', artist: 'artist6', album: 'album6', id: 6 },
      ],
      SearchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
        { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
        { name: 'name3', artist: 'artist3', album: 'album3', id: 3 },
        { name: 'name4', artist: 'artist4', album: 'album4', id: 4 },
      ],
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

  savePlaylist(playlist) {
    // const trackURIs = [...playlist];
  }

  search(term) {
    console.log(term);
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
