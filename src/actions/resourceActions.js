"use strict";

const Reflux = require('reflux');

const ResourceActions = Reflux.createActions({
  loadBlobList: {asyncResult: true}
});

module.exports = ResourceActions;
