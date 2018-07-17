import React from 'react';

class SuggestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseEnter() {
    this.props.activateSuggestionIndex(this.props.index);
  }

  render() {
    let className = 'suggestion-item ';

    if (this.props.active) {
      className += 'suggestion-active';
    }

    return (
      <div
        className={className}
        onMouseEnter={this.handleMouseEnter}
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
