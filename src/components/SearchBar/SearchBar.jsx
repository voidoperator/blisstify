import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.value,
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const localSearchTerm = localStorage.getItem('firstTerm');
    if (!localSearchTerm) return;
    this.setState({ term: localSearchTerm });
    localStorage.removeItem('firstTerm');
    this.props.onSearch(this.state.term);
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
    localStorage.setItem('firstTerm', this.state.term);
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          onKeyUp={this.handleKeypress}
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.term}
        />
        <button onClick={this.search} className="SearchButton">
          Search
        </button>
      </div>
    );
  }
}
