import React from 'react';
import SuggestionDropdown from './SuggestionDropdown';
import SearchBox from './SearchBox';

import './css/AutocompleteSearch.css';

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

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.activateSuggestionIndex = this.activateSuggestionIndex
      .bind(this);

    // sharing same method functionality
    this.activatePrevSuggestion = this
      .activateAdjacentSuggestion
      .bind(this, this.neighborEnum.prev);
    this.activateNextSuggestion = this
      .activateAdjacentSuggestion
      .bind(this, this.neighborEnum.next);
  }

  handleQueryChange(event) {
    const searchText = event.target.value;
    const strippedSearchText = this.stripSpecialChars(searchText);
    const suggestions = this.getSuggestions(strippedSearchText);

    this.setState({
      searchText: searchText,
      searchTextOverride: '',
      suggestions: suggestions,
      maxIndex: suggestions.length - 1,
      /*
       * one extra slot between the beginning and end, which
       * takes user back to a state of no active suggestion
       * (and is also the default state before navigating)
       */
      activeIndex: -1,
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

  /*
   * Ignore perentheses, dashes, etc. products are also stored by
   * stripped keywords; stripped searches will find them properly.
   */
  stripSpecialChars(str) {
    // removing special characters can result in sequential spaces
    return str.replace(/[^\w\s]|_/g,'').replace(/\s+/g, ' ');
  }

  getSuggestions(searchText) {
    if (!searchText) {
      return [];
    }

    const maxSuggestions = this.props.maxSuggestions;
    const ids = this.props.dataTrie.prefixSearch(searchText);

    let suggestions = ids.map((id) => {
      return this.props.idDict[id];
    })

    suggestions = suggestions.sort((prev, curr) => {
      return prev.type.localeCompare(curr.type);
    });

    return suggestions.splice(0, maxSuggestions);
  }

  activateAdjacentSuggestion(neighbor) {
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
        throw new Error('invalid neighbor!');
    }

    // wrapping up and down
    // (-1 is the default "no suggestions" index)
    if (newIndex < -1) {
      newIndex = maxIndex;
    }

    if (newIndex > maxIndex) {
      newIndex = 0;
    }

    this.activateSuggestionIndex(newIndex);
  }

  activateSuggestionIndex(index) {
    const activeSuggestion = this.state.suggestions[index];

    // -1 is the default "no suggestions" index
    const overrideText = index === -1 ?
      '' :
      activeSuggestion.name;

    this.setState({
      activeIndex: index,
      searchTextOverride: overrideText,
    });
  }

  render() {
    return (
      <div className='autocomplete-search'>
        <SearchBox
          searchPlaceholder={this.props.searchPlaceholder}
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          handleQueryChange={this.handleQueryChange}
          handleKeyPress={this.handleKeyPress}
          activateSuggestionIndex={this.activateSuggestionIndex}
        />
        <SuggestionDropdown
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          suggestions={this.state.suggestions}
          activeIndex={this.state.activeIndex}
          activateSuggestionIndex={this.activateSuggestionIndex}
        />
      </div>
    );
  }
}

export default AutocompleteSearch;
