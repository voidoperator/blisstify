import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    // this.search = this.search.bind(this);
  }

  handleTermChange(e) {
    e.preventDefault();
    const term = e.target.value;
    this.props.onSearch(term);
  }

  // search() {

  // }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button className="SearchButton">Search</button>
      </div>
    );
  }
}
