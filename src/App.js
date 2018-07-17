import React, { Component } from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import jsonData from './data/processed-product-data.json';
import Trie from './Trie';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    }
  }

  render() {
    const dataTrie = new Trie();

    dataTrie.importNodesFromJsonString(JSON.stringify(jsonData.trie));

    return (
      <div className='App'>
        <header>
          <h1>Product Search</h1>
        </header>
        <div className='container'>
          <h2>Search for a financial product</h2>
          <AutocompleteSearch
            searchPlaceholder='Enter search text'
            dataTrie={dataTrie}
            idDict={jsonData.dict}
            disabled={this.state.disabled}
          />
        </div>
      </div>
    );
  }
}

export default App;
