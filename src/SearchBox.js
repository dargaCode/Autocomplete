import React from 'react';

class SearchBox extends React.Component {
  render() {
    let className = 'search-input ';

    if (this.props.disabled) {
      className += 'disabled';
    }

    const placeholderText = this.props.disabled ?
      this.props.disabledText :
      this.props.placeholder;

    return (
      <div>
        <input
          type="text"
          spellCheck="false"
          className={className}
          disabled={this.props.disabled}
          placeholder={placeholderText}
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
