"use strict";

const Reflux = require('reflux');

const StorageAccountActions = Reflux.createActions([
  'addStorageAccount',
  'loadBlobContainers',
  'loadTables',
  'loadQueues',
  'connectToStorageAccount'
]);

module.exports = StorageAccountActions;
