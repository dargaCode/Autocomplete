import React, { Component } from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import jsonData from './data/searchable-data.json';
import Trie from './Trie';

import './css/App.css';

class App extends Component {
  render() {
    const dataTrie = new Trie();

    dataTrie.importNodesFromJsonString(JSON.stringify(jsonData.trie));

    return (
      <div className='app'>
        <header>
          <h1>US Location Search</h1>
        </header>
        <div className='container'>
          <h2>Search for any US city or ZIP code</h2>
          <AutocompleteSearch
            searchPlaceholder='Enter search text'
            dataTrie={dataTrie}
            idDict={jsonData.dict}
            maxSuggestions='10'
            autoFocusSearchInput={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
