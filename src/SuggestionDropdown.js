import React from 'react';
import SuggestionItem from './SuggestionItem';

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
          index={index}
          searchText={this.props.searchText}
          suggestionText={suggestion.name}
          typeText={suggestion.type}
          active={this.props.activeIndex === index}
          activateSuggestionIndex={this.props.activateSuggestionIndex}
        />;
    });

    return suggestionItems;
  }

  render() {
    return (
      <div className='suggestion-dropdown'>
        {this.getSuggestionItems()}
      </div>
    );
  }
}

export default SuggestionDropdown;
