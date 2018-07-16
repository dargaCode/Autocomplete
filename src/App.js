import React, { Component } from 'react';
import AutocompleteSearch from './AutocompleteSearch';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    }
  }

  render() {
    return (
      <div className='App'>
        <header>
          <h1>Product Search</h1>
        </header>
        <div className='container'>
          <h2>Search for a financial product</h2>
          <AutocompleteSearch
            searchPlaceholder='Enter search text'
            disabled={this.state.disabled}
          />
        </div>
      </div>
    );
  }
}

export default App;
