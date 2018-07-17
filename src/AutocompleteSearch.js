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
    this.activateSuggestionIndex = this.activateSuggestionIndex
      .bind(this);
    this.handleSuggestionMouseEnter = this.handleSuggestionMouseEnter
      .bind(this);

    // sharing same method functionality
    this.activatePrevSuggestion = this
      .activateAdjacentSuggestion
      .bind(this, this.neighborEnum.prev);
    this.activateNextSuggestion = this
      .activateAdjacentSuggestion
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

  handleSuggestionMouseEnter(index) {
    this.activateSuggestionIndex(index);
  }

  getSuggestions(searchText) {
    if (!searchText) {
      return [];
    }

    const ids = this.props.dataTrie.prefixSearch(searchText);

    const suggestions = ids.map((id) => {
      return this.props.idDict[id];
    })

    console.log(suggestions);

    return suggestions;
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
        throw('invalid neighbor!');
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
          handleSuggestionMouseEnter={this
            .handleSuggestionMouseEnter}
        />
      </div>
    );
  }
}

export default AutocompleteSearch;
