import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    e.preventDefault();
    const newPlaylistName = e.target.value;
    this.props.onChange(newPlaylistName);
  }

  render() {
    return this.props.isLoading ? (
      <div className="Playlist">
        <div className="saving-wrapper">
          <h3>Saving playlist...</h3>
        </div>
      </div>
    ) : (
      <div className="Playlist">
        <input
          placeholder="Playlist Name"
          onChange={this.handleNameChange}
          id="Playlist-Name-Input"
          value={this.props.value}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button onClick={this.props.onSave} className="Playlist-save">
          Save To Spotify
        </button>
      </div>
    );
  }
}
