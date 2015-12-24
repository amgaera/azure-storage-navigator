"use strict";

const Reflux = require('reflux');

const StorageAccountActions = Reflux.createActions([
  'addStorageAccount',
  'connectToStorageAccount'
]);

module.exports = StorageAccountActions;
