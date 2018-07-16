import React from 'react';
import SuggestionDropdown from './SuggestionDropdown';
import SearchBox from './SearchBox';

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
      <div className='search'>
        <SearchBox
          disabled={this.props.disabled}
          disabledText={'Loading...'}
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

export default AutocompleteSearch;
