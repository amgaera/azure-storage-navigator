"use strict";

const Reflux = require('reflux');
const _ = require('lodash');
const AzureStorage = window.require('azure-storage');

const ResourceStore = Reflux.createStore({
  listenables: [
    require('../actions/storageAccountActions')
  ],

  storageAccounts: {
    'devstorage': {
      name: 'devstorage',
      isConnected: false
    }
  },

  onAddStorageAccount: function(name, key) {
    this.storageAccounts[name] = {
      name: name,
      key: key,
      isConnected: false,
      resources: {}
    };

    this.trigger(this.storageAccounts);
  },

  onConnectToStorageAccount: function(accountId) {
    this.storageAccounts[accountId].isConnected = true;
    window.setTimeout(() => this.trigger(this.storageAccounts), 1000);
  },

  onLoadBlobContainers: function(accountName) {
    const accessKey = this.storageAccounts[accountName].key;
    const blobService = AzureStorage.createBlobService(accountName, accessKey);

    blobService.listContainersSegmented(null, (error, result, response) => {
      if (error) {
        console.error(error);
        return;
      }

      this.storageAccounts[accountName].resources.blob = _.map(result.entries, entry => entry.name);
      this.trigger(this.storageAccounts);
    });
  },

  onLoadTables: function(accountName) {
    const accessKey = this.storageAccounts[accountName].key;
    const tableService = AzureStorage.createTableService(accountName, accessKey);

    tableService.listTablesSegmented(null, (error, result, response) => {
      if (error) {
        console.error(error);
        return;
      }

      this.storageAccounts[accountName].resources.table = result.entries;
      this.trigger(this.storageAccounts);
    });
  },

  onLoadQueues: function(accountName) {
    const accessKey = this.storageAccounts[accountName].key;
    const queueService = AzureStorage.createQueueService(accountName, accessKey);

    queueService.listQueuesSegmented(null, (error, result, response) => {
      if (error) {
        console.error(error);
        return;
      }

      this.storageAccounts[accountName].resources.queue = _.map(result.entries, entry => entry.name);
      this.trigger(this.storageAccounts);
    });
  },

  getInitialState: function() {
    return this.storageAccounts;
  }
});

module.exports = ResourceStore;
