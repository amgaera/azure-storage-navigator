"use strict";

let React = require('react');
let _ = require('lodash');

let StorageAccountActions = require('../../actions/storageAccountActions');

let ResourceList = React.createClass({
  propTypes: {
    resourceType: React.PropTypes.string.isRequired,
    loadAction: React.PropTypes.func.isRequired,
    storageAccount: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    if (!_.has(this.props.storageAccount.resources, this.props.resourceType)) {
      this.props.loadAction(this.props.storageAccount.name);
    }
  },

  createResourceRow: function(resourceName) {
    return (
      <li key={resourceName} className="list-group-item">{resourceName}</li>
    );
  },

  render: function() {
    if (!_.has(this.props.storageAccount.resources, this.props.resourceType)) {
      return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width: '100%'}}>
          </div>
        </div>
      );
    }

    const resourceNames = this.props.storageAccount.resources[this.props.resourceType];

    return (
      <ul className="list-group">
        {_.map(resourceNames, this.createResourceRow, this)}
      </ul>
    );
  }
});

module.exports = ResourceList;
