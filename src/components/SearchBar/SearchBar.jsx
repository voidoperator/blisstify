import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.search = this.search.bind(this);
  }

  handleKeypress(e) {
    if (e.keyCode === 13) {
      this.setState({ term: e.target.value });
      this.search();
    }
  }

  handleTermChange(e) {
    e.preventDefault();
    this.setState({ term: e.target.value });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          onKeyUp={this.handleKeypress}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button onClick={this.search} className="SearchButton">
          Search
        </button>
      </div>
    );
  }
}
