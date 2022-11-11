import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <div className="info-action-wrapper">
            <h3>{this.props.track.name}</h3>
            <p>
              {this.props.track.artist} | {this.props.track.album}
            </p>
          </div>
          <div className="button-wrapper">
            {!this.props.isRemoval ? (
              <button onClick={this.addTrack} className="Track-action">
                +
              </button>
            ) : (
              <button onClick={this.removeTrack} className="Track-action">
                -
              </button>
            )}
          </div>
        </div>
        <audio controls onClick={this.handlePlaying}>
          <source src={this.props.track.previewUrl} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
