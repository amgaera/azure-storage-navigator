"use strict";

let React = require('react');
let _ = require('lodash');

let LazyList = require('../common/lazyList');
let LazyListEntry = require('../common/lazyListEntry');
var ResourceList = require('./resourceList');
let StorageAccountActions = require('../../actions/storageAccountActions');

let ResourceTypeList = React.createClass({
  propTypes: {
    storageAccount: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    if (!this.props.storageAccount.isConnected) {
      StorageAccountActions.connectToStorageAccount(this.props.storageAccount.name);
    }
  },

  createResourceTypeRow: function(resourceType) {
    let resourceTypeLabel = _.capitalize(resourceType) + 's';

    return (
      <LazyListEntry key={resourceType} label={resourceTypeLabel}>
        <ResourceList />
      </LazyListEntry>
    );
  },

  render: function() {
    if (this.props.storageAccount.isConnected) {
      let resourceTypes = ['blob', 'table', 'queue'];

      return (
        <LazyList>
          {_.map(resourceTypes, this.createResourceTypeRow, this)}
        </LazyList>
      );
    }

    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width: '100%'}}>
        </div>
      </div>
    );
  }
});

module.exports = ResourceTypeList;
