import React, { Component } from 'react';
import AutocompleteSearch from './AutocompleteSearch';

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AutocompleteSearch
          searchPlaceholder="Enter search text"
        />
      </div>
    );
  }
}

export default App;
