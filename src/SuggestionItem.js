import React from 'react';

import './css/SuggestionItem.css';

class SuggestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove() {
    this.props.setActiveSuggestion(this.props.index);
  }

  render() {
    let className = 'suggestion-item ';

    if (this.props.active) {
      className += 'suggestion-active';
    }

    return (
      <div
        className={className}
        onMouseMove={this.handleMouseMove}
        onClick={this.props.redirectToActiveUrl}
      >
        <p className='display-name'>
          {this.props.suggestionText}
        </p>
        <p className='category'>{this.props.category}</p>
      </div>
    );
  }
}

export default SuggestionItem;
