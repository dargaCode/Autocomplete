
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
      node.values = [];
    }

    node.values.push(value);
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
    let results = [];

    for (let char of prefix) {
      char = char.toLowerCase();

      if (node[char]) {
        node = node[char];
      } else {
        // prefix string not found at all
        return results;
      }
    }

    // append all words which include the prefix
    return recursiveSearch(node, results);
  };

  function recursiveSearch(node, results) {
    for (const key in node) {
      if (key === 'values') {
        results = results.concat(node.values);
      } else {
        const childNode = node[key];
        results = recursiveSearch(childNode, results);
      }
    }

    return results;
  }

  this.getJsonString = function() {
    return JSON.stringify(_rootNode);
  };
}

export default Trie;
