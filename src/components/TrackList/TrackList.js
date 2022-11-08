import React from 'react';
// import { Track } from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((song) => {
          return (
            <div>
              <ul key={song.id}>
                <li key={song.id}>{song.name}</li>
                <li key={song.id}>{song.artist}</li>
                <li key={song.id}>{song.album}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
