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
    return (
      <div className="Playlist">
        <input
          placeholder="Playlist Name"
          onChange={this.handleNameChange}
          id="Playlist-Name-Input"
        />
        <TrackList
          tracks={this.props.PlaylistTracks}
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