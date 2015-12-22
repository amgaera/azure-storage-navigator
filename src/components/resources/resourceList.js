"use strict";

let React = require('react');
let _ = require('lodash');

let StorageAccountActions = require('../../actions/storageAccountActions');

let ResourceList = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <li className="list-group-item"><a href="#test">Resource #1</a></li>
        <li className="list-group-item">Resource #2</li>
        <li className="list-group-item">Resource #3</li>
      </ul>
    );
  }
});

module.exports = ResourceList;
