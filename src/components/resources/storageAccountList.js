"use strict";

var React = require('react');
var _ = require('lodash');
var ResourceTypeList = require('./resourceTypeList');
var LazyList = require('../common/lazyList');
var LazyListEntry = require('../common/lazyListEntry');

var StorageAccountList = React.createClass({
  propTypes: {
    storageAccounts: React.PropTypes.object.isRequired
  },

  createStorageAccountRow: function(storageAccount, index) {
    return (
      <LazyListEntry key={storageAccount.name} label={storageAccount.name}>
        <ResourceTypeList storageAccount={storageAccount} />
      </LazyListEntry>
    );
  },

  render: function() {
    let storageAccounts = _.values(this.props.storageAccounts);

    return (
      <LazyList>
        {_.flatten(_.map(storageAccounts, this.createStorageAccountRow, this))}
      </LazyList>
    );
  }
});

module.exports = StorageAccountList;
