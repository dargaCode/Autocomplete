
// CLASSES

function Trie() {
  let _rootNode = {};

  this.importNodesFromJsonString = function(jsonString) {
    const parsedObject = JSON.parse(jsonString);

    _rootNode = parsedObject;
  };

  // store a simple keyword or store a specified value by a keyword
  this.store = function(keyword, valueOverride = null) {
    if (keyword === '') {
      return;
    }

    /*
     * Allow the value stored at the keyword to be
     * overridden, so that an id number, object, etc
     * may be stored via the keyword. By default the
     * keyword stores itself as the value.
     */
    const value = valueOverride ? valueOverride : keyword;

    let node = _rootNode;

    for (let char of keyword) {
      char = char.toLowerCase();

      if (!node[char]) {
        node[char] = {};
      }

      node = node[char];
    }

    if (!node.values) {
      node.values = [value];
    }

    /*
     * Sets don't natively stringify to json, so
     * using indexOf for now to prevent duplicates.
     * This could cause performance problems in a real
     * app, but a real app would also use a database
     * instead of json to store the data.
     */
    if (node.values.indexOf(value) === -1) {
      node.values.push(value);
    }
  };

  this.containsKey = function(keyword) {
    if (keyword === '') {
      return false;
    }

    let node = _rootNode;

    for (let char of keyword) {
      char = char.toLowerCase();

      if (!node[char]) {
        return false;
      }

      node = node[char];
    }

    /*
     * only true if the key ends at the current node,
     * not if it goes past it.
     */
    return node.values !== undefined &&
      node.values.length > 0;
  };

  this.prefixSearch = function(prefix) {
    let node = _rootNode;
    let resultSet = new Set();

    for (let char of prefix) {
      char = char.toLowerCase();

      if (node[char]) {
        node = node[char];
      } else {
        // prefix string not found at all
        return [];
      }
    }

    // append all words which include the prefix
    resultSet = recursiveSearch(node, resultSet);

    return Array.from(resultSet);
  };

  function recursiveSearch(node, resultSet) {
    for (const key in node) {
      if (key === 'values') {
        resultSet = resultSet.add(...node.values);
      } else {
        const childNode = node[key];
        resultSet = recursiveSearch(childNode, resultSet);
      }
    }

    return resultSet;
  }

  this.getJsonString = function() {
    return JSON.stringify(_rootNode);
  };
}

export default Trie;
