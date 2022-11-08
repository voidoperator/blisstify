import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((song) => {
          return (
            <Track
              name={song.name}
              artist={song.artist}
              album={song.album}
              key={song.id}
            />
          );
        })}
      </div>
    );
  }
}
