import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchTextOverride: '',
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

    this.activatePrevSuggestion = this
      .activateAdjacentIndex
      .bind(this, this.neighborEnum.prev);
    this.activateNextSuggestion = this
      .activateAdjacentIndex
      .bind(this, this.neighborEnum.next);
  }

  handleChange(event) {
    let searchText = event.target.type === 'text' ?
      event.target.value :
      this.state.searchText;

    const suggestions = this.getSuggestions(searchText);

    this.setState({
      searchText: searchText,
      searchTextOverride: '',
      suggestions: suggestions,
      /*
       * one extra slot at the end, which will be let users arrow
       * back to a state of no active suggestion (which is also
       * the default starting state)
       */
      maxIndex: suggestions.length,
      activeIndex: suggestions.length,
    });
  }

  handleKeyPress(event) {
    // only navigate between suggestions if some exist
    if (this.state.suggestions.length === 0) {
      return;
    }

    if (event.key === 'ArrowUp') {
      this.activatePrevSuggestion();
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      this.activateNextSuggestion();
      event.preventDefault();
    }
  }

  getSuggestions(searchText) {
    if (!searchText) {
      return [];
    }

    const suggestions = [
      'itemZero',
      'itemOne',
      'itemTwo',
      'itemThree',
      'itemFour',
      'itemFive',
      'itemSix',
      'itemSeven',
      'itemEight',
      'itemNine',
    ].map((suggestion) => {
      return `${searchText} - ${suggestion}`;
    });

    return suggestions;
  }

  activateAdjacentIndex(neighbor) {
    const activeIndex = this.state.activeIndex;
    const maxIndex = this.state.maxIndex;
    const prev = this.neighborEnum.prev;
    const next = this.neighborEnum.next;

    let newIndex;

    switch(true) {
      case neighbor === prev:
        newIndex = activeIndex - 1;
        break;
      case neighbor === next:
        newIndex = activeIndex + 1;
        break;
      default:
        throw('invalid neighbor!');
    }

    // wrapping up and down
    if (newIndex < 0) {
      newIndex = maxIndex;
    }

    if (newIndex > maxIndex) {
      newIndex = 0;
    }

    this.setState({
      activeIndex: newIndex,
      searchTextOverride: this.state.suggestions[newIndex],
    });
  }

  render() {
    return (
      <div>
        <h1>AutocompleteSearch</h1>
        <SearchBox
          placeholder={this.props.searchPlaceholder}
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          onChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
        />
        <SuggestionDropdown
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          suggestions={this.state.suggestions}
          activeIndex={this.state.activeIndex}
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
          value={this.props.searchTextOverride ||
            this.props.searchText}
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
    const suggestionItems = suggestions
      .map((suggestion, index) => {
        return <SuggestionItem
          key={index}
          searchText={this.props.searchText}
          suggestionText={suggestion}
          active={this.props.activeIndex === index}
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
  constructor(props) {
    super(props);

    this.CSS_CLASSES = {
      ACTIVE: 'suggestion-active',
    };
  }


  render() {
    let className = '';

    if (this.props.active) {
      className += this.CSS_CLASSES.ACTIVE;
    }

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        <h3>{this.props.suggestionText}</h3>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AutocompleteSearch
          searchPlaceholder="Enter search text"
        />
      </div>
    );
  }
}

export default App;
