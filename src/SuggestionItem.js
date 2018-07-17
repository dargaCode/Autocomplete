import React from 'react';

class SuggestionItem extends React.Component {
  render() {
    let className = 'suggestion-item ';

    if (this.props.active) {
      className += 'suggestion-active';
    }

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        <p className='display-name'>
          {this.props.suggestionText}
        </p>
        <p className='type'>{this.props.typeText}</p>
      </div>
    );
  }
}

export default SuggestionItem;
