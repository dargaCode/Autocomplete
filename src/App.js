import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'searchText',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>AutocompleteSearch</h1>
        <SearchBox
          placeholder={this.props.searchPlaceholder}
          searchText={this.state.searchText}
          onChange={this.handleChange}
        />
        <SuggestionDropdown
          searchText={this.state.searchText}
        />
      </div>
    );
  }
}

class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <h2>SearchBox</h2>
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.searchText}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

class SuggestionDropdown extends React.Component {
  render() {
    return (
      <div>
        <h2>SuggestionDropdown</h2>
        <SuggestionItem searchText={this.props.searchText}/>
        <SuggestionItem searchText={this.props.searchText}/>
        <SuggestionItem searchText={this.props.searchText}/>
      </div>
    );
  }
}

class SuggestionItem extends React.Component {
  render() {
    return (
      <div>
        <h3>SuggestionItem - {this.props.searchText}</h3>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <AutocompleteSearch
          searchPlaceholder="Searching for financial products"
        />
      </div>
    );
  }
}

export default App;
