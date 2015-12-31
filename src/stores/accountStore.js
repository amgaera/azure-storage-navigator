"use strict";

const Reflux = require('reflux');
const _ = require('lodash');
const AzureStorage = window.require('azure-storage');

const LOCAL_STORAGE_ACCOUNTS_KEY = 'storageAccounts';
const RESOURCE_TYPES = Object.freeze({
  BLOB: 'blob',
  TABLE: 'table',
  QUEUE: 'queue'
});

const AccountStore = Reflux.createStore({
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
      resources: {},
      services: {}
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

  getService: function(accountName, resourceType) {
    if (!_.has(this.storageAccounts, accountName)) {
      throw new Error(`Unknown storage account: ${accountName}`);
    }

    const account = this.storageAccounts[accountName];

    if (_.has(account.services, resourceType)) {
      return account.services[resourceType];
    }

    let service;

    switch (resourceType) {
      case RESOURCE_TYPES.BLOB:
        service = AzureStorage.createBlobService(accountName, account.key);
        break;
      case RESOURCE_TYPES.TABLE:
        service = AzureStorage.createTableService(accountName, account.key);
        break;
      case RESOURCE_TYPES.QUEUE:
        service = AzureStorage.createQueueService(accountName, account.key);
        break;
      default:
        throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    account.services[resourceType] = service;
    return service;
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
    const blobService = this.getService(accountName, RESOURCE_TYPES.BLOB);

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
    const tableService = this.getService(accountName, RESOURCE_TYPES.TABLE);

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
    const queueService = this.getService(accountName, RESOURCE_TYPES.QUEUE);

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

module.exports = AccountStore;
