import React from 'react';

class SuggestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.CSS_CLASSES = {
      ACTIVE: 'suggestion-active',
    };
  }

  render() {
    let className = '';

    if (this.props.active) {
      className += this.CSS_CLASSES.ACTIVE;
    }

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        <h3>{this.props.suggestionText}</h3>
      </div>
    );
  }
}

export default SuggestionItem;
