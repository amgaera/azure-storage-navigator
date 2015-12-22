"use strict";

var React = require('react');
var Reflux = require('reflux');
var ResourceStore = require('../../stores/resourceStore');
var StorageAccountList = require('./storageAccountList');
var ResourceList = require('./resourceList');

let ResourcesPane = React.createClass({
  mixins: [Reflux.connect(ResourceStore, 'storageAccounts')],

  render: function() {
    return (
      <div>
        <h2>Storage Accounts</h2>
        <StorageAccountList storageAccounts={this.state.storageAccounts}>
        </StorageAccountList>
      </div>
    );
  }
});

module.exports = ResourcesPane;
