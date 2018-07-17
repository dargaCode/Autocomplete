import React, { Component } from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import jsonData from './data/processed-product-data.json';
import Trie from './Trie';

import './css/App.css';

class App extends Component {
  render() {
    const dataTrie = new Trie();

    dataTrie.importNodesFromJsonString(JSON.stringify(jsonData.trie));

    return (
      <div className='app'>
        <header>
          <h1>Product Search</h1>
        </header>
        <div className='container'>
          <h2>Search for a financial product</h2>
          <AutocompleteSearch
            searchPlaceholder='Enter search text'
            dataTrie={dataTrie}
            idDict={jsonData.dict}
            maxSuggestions='10'
          />
        </div>
      </div>
    );
  }
}

export default App;
