import React from 'react';

import './css/SearchBox.css';

class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <input
          type='text'
          spellCheck='false'
          className='search-input'
          placeholder={this.props.searchPlaceholder}
          value={this.props.searchTextOverride ||
            this.props.searchText}
          onChange={this.props.handleQueryChange}
          onKeyDown={this.props.handleKeyPress}
        />
      </div>
    );
  }
}

export default SearchBox;
