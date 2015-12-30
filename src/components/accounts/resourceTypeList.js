"use strict";

const React = require('react');
const _ = require('lodash');

const LazyList = require('../common/lazyList');
const LazyListEntry = require('../common/lazyListEntry');
const ResourceList = require('./resourceList');
const StorageAccountActions = require('../../actions/storageAccountActions');

const ResourceTypeList = React.createClass({
  propTypes: {
    storageAccount: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    if (!this.props.storageAccount.isConnected) {
      StorageAccountActions.connectToStorageAccount(this.props.storageAccount.name);
    }
  },

  render: function() {
    if (this.props.storageAccount.isConnected) {
      return (
        <LazyList>
          <LazyListEntry key="blob" label="Blobs">
            <ResourceList resourceType="blob" storageAccount={this.props.storageAccount} loadAction={StorageAccountActions.loadBlobContainers} />
          </LazyListEntry>
          <LazyListEntry key="table" label="Tables">
            <ResourceList resourceType="table" storageAccount={this.props.storageAccount} loadAction={StorageAccountActions.loadTables} />
          </LazyListEntry>
          <LazyListEntry key="queue" label="Queues">
            <ResourceList resourceType="queue" storageAccount={this.props.storageAccount} loadAction={StorageAccountActions.loadQueues} />
          </LazyListEntry>
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
