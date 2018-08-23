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
      suggestions: [],
      maxIndex: null,
      activeIndex: null,
      activeUrl: null,
    }

    this.neighborEnum = Object.freeze({
      prev: 'prev',
      next: 'next',
    });

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.setActiveSuggestion = this.setActiveSuggestion.bind(this);
    this.redirectToActiveUrl = this.redirectToActiveUrl.bind(this);

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
    } else if (event.key === 'Enter') {
      this.redirectToActiveUrl();
    }
  }

  /*
   * Ignore perentheses, dashes, etc. products are also stored by
   * stripped keywords; stripped searches will find them properly.
   */
  stripSpecialChars(str) {
    // removing special characters can result in sequential spaces
    return str.replace(/[^\w\s]|_/g,'').replace(/\s+/g, ' ').trim();
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
      return prev.key.localeCompare(curr.key);
    });

    // category sort overrides key sort, if categories are present
    if (suggestions.length && suggestions[0].category) {
      suggestions = suggestions.sort((prev, curr) => {
        return prev.category.localeCompare(curr.category);
      });
    }

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

    this.setActiveSuggestion(newIndex);
  }

  setActiveSuggestion(index) {
    const activeSuggestion = this.state.suggestions[index];

    let overrideText = '';
    let activeUrl = null;

    // -1 is the default "no suggestions" index
    if (index > -1) {
      overrideText = activeSuggestion.name;
      activeUrl = activeSuggestion.url;
    }

    this.setState({
      activeIndex: index,
      searchTextOverride: overrideText,
      activeUrl: activeUrl,
    });
  }

  redirectToActiveUrl() {
    if (this.state.activeUrl) {
      window.location = this.state.activeUrl;
    }
  }

  render() {
    return (
      <div
        className='autocomplete-search'
        tabIndex='1'
      >
        <SearchBox
          searchPlaceholder={this.props.searchPlaceholder}
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          handleQueryChange={this.handleQueryChange}
          handleKeyPress={this.handleKeyPress}
          autoFocusSearchInput={this.props.autoFocusSearchInput}
        />
        <SuggestionDropdown
          searchText={this.state.searchText}
          searchTextOverride={this.state.searchTextOverride}
          suggestions={this.state.suggestions}
          activeIndex={this.state.activeIndex}
          setActiveSuggestion={this.setActiveSuggestion}
          redirectToActiveUrl={this.redirectToActiveUrl}
        />
      </div>
    );
  }
}

export default AutocompleteSearch;
