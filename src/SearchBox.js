import React from 'react';

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

export default SearchBox;
