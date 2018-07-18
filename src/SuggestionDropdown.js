import React from 'react';
import SuggestionItem from './SuggestionItem';

import './css/SuggestionDropdown.css';

class SuggestionDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.getSuggestionItems = this.getSuggestionItems.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseLeave() {
    this.props.setActiveSuggestion(-1);
  }

  getSuggestionItems() {
    const suggestions = this.props.suggestions;
    const suggestionItems = suggestions
      .map((suggestion, index) => {
        return <SuggestionItem
          key={index}
          index={index}
          searchText={this.props.searchText}
          suggestionText={suggestion.name}
          typeText={suggestion.type}
          active={this.props.activeIndex === index}
          setActiveSuggestion={this.props.setActiveSuggestion}
          redirectToActiveUrl={this.props.redirectToActiveUrl}
        />;
    });

    return suggestionItems;
  }

  render() {
    return (
      <div
        className='suggestion-dropdown'
        onMouseLeave={this.handleMouseLeave}
      >
        {this.getSuggestionItems()}
      </div>
    );
  }
}

export default SuggestionDropdown;
