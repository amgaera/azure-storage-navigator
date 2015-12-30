"use strict";

const Reflux = require('reflux');
const _ = require('lodash');
const AzureStorage = window.require('azure-storage');

const LOCAL_STORAGE_ACCOUNTS_KEY = 'storageAccounts';

const ResourceStore = Reflux.createStore({
  listenables: [
    require('../actions/initializeActions'),
    require('../actions/storageAccountActions')
  ],

  storageAccounts: {
    'devstorage': {
      name: 'devstorage',
      isConnected: false,
      isEmulated: true
    }
  },

  createStorageAccount: function(name, key) {
    return {
      name: name,
      key: key,
      isConnected: false,
      isEmulated: false,
      resources: {}
    };
  },

  saveStorageAccounts: function() {
    const realAccounts = _.filter(this.storageAccounts, account => !account.isEmulated);
    const coreAccountsData = _.map(realAccounts, account => ({ name: account.name, key: account.key }));

    localStorage.setItem(LOCAL_STORAGE_ACCOUNTS_KEY, JSON.stringify(coreAccountsData));
  },

  loadStorageAccounts: function() {
    const coreAccountsData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNTS_KEY));
    const accountPairs = _.map(coreAccountsData, data => [data.name, this.createStorageAccount(data.name, data.key)]);

    return _.zipObject(accountPairs);
  },

  onInitializeApp: function() {
    this.storageAccounts = _.merge(this.storageAccounts, this.loadStorageAccounts());
    this.trigger(this.storageAccounts);
  },

  onAddStorageAccount: function(name, key) {
    this.storageAccounts[name] = this.createStorageAccount(name, key);

    this.saveStorageAccounts();
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
