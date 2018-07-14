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

  getSuggestions() {
    return [
        'first item',
        'second item',
        'third item',
    ];
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
          suggestions={this.getSuggestions()}
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
  getSuggestionItems() {
    const suggestions = this.props.suggestions;
    const suggestionItems = suggestions.map((suggestion, i) => {
      return <SuggestionItem
        searchText={this.props.searchText}
        suggestionText={suggestion}
        key={i}
      />;
    });

    return suggestionItems;
  }

  render() {
    return (
      <div>
        <h2>SuggestionDropdown</h2>
        {this.getSuggestionItems()}
      </div>
    );
  }
}

class SuggestionItem extends React.Component {
  render() {
    const searchText = this.props.searchText;
    const suggestionText = this.props.suggestionText;
    const itemText = `${searchText} - ${suggestionText}`;

    return (
      <div>
        <h3>{itemText}</h3>
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
