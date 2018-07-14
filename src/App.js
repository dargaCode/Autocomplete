import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      activeIndex: null,
      suggestions: [],
      maxIndex: null,
    }

    this.neighborEnum = Object.freeze({
      prev: 'prev',
      next: 'next',
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  handleChange(event) {
    if (event.target.type === 'text') {
      this.setState({
        searchText: event.target.value,
      });
    } else {
      this.setState({
        searchText: event.target.innerText,
      });
    }

    this.getSuggestions();
  }

  handleKeyPress(event) {
    console.log(event.key);
  }

  getSuggestions() {
    const suggestions = [
      'item0',
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6',
      'item7',
      'item8',
      'item9',
    ];

    this.setState({
      suggestions: suggestions,
      maxIndex: suggestions.length,
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
          handleKeyPress={this.handleKeyPress}
        />
        <SuggestionDropdown
          searchText={this.state.searchText}
          suggestions={this.state.suggestions}
          onClick={this.handleChange}
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
          onKeyDown={this.props.handleKeyPress}
        />
      </div>
    );
  }
}

class SuggestionDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.getSuggestionItems = this.getSuggestionItems.bind(this);
  }

  getSuggestionItems() {
    const suggestions = this.props.suggestions;
    const suggestionItems = suggestions.map((suggestion, i) => {
      return <SuggestionItem
        searchText={this.props.searchText}
        suggestionText={suggestion}
        key={i}
        onClick={this.props.onClick}
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
      <div onClick={this.props.onClick}>
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
