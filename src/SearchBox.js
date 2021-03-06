import React from 'react';

import './css/SearchBox.css';

class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <input
          type='text'
          spellCheck='false'
          className='search-box'
          placeholder={this.props.searchPlaceholder}
          value={this.props.searchTextOverride ||
            this.props.searchText}
          onChange={this.props.handleQueryChange}
          onKeyDown={this.props.handleKeyPress}
          autoFocus={this.props.autoFocusSearchInput}
        />
      </div>
    );
  }
}

export default SearchBox;
