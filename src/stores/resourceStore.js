"use strict";

let Reflux = require('reflux');
let _ = require('lodash');

let ResourceStore = Reflux.createStore({
  listenables: [
    require('../actions/storageAccountActions')
  ],

  storageAccounts: {
    'devstorage': {
      name: 'devstorage',
      isConnected: false
    },
    'otherstorage': {
      name: 'otherstorage',
      isConnected: false
    }
  },

  onConnectToStorageAccount: function(accountId) {
    this.storageAccounts[accountId].isConnected = true;
    window.setTimeout(() => this.trigger(this.storageAccounts), 1000);
  },

  getInitialState: function() {
    return this.storageAccounts;
  }
});

module.exports = ResourceStore;
