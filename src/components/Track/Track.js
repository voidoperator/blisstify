import React from 'react';
import './Track.css';

export class Track extends React.Component {
  render() {
    const song = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{song.name}</h3>
          <p>{`${song.artist} | ${song.album}`}</p>
        </div>
        <button className="Track-action">
          AddOrRemoveFunctionalityPlaceholder
        </button>
      </div>
    );
  }
}
