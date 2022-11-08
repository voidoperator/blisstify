import React from 'react';
import './Track.css';

export class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>TrackNamePropPlaceHolder</h3>
          <p>TrackArtistPropPlaceHolder | TrackAlbumPropPlaceHolder</p>
        </div>
        <button className="Track-action">
          AddOrRemoveFunctionalityPlaceholder
        </button>
      </div>
    );
  }
}
