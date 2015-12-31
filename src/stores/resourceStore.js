"use strict";

const Reflux = require('reflux');
const _ = require('lodash');

const ResourceStore = Reflux.createStore({
  listenables: [
    require('../actions/resourceActions')
  ],

  resources: {
  },

  onLoadBlobListCompleted: function(accountName, container, prefix, results, continuationToken) {
    const path = `${accountName}.${container}.${prefix}`;
    _.set(this.resources, path , {entries: results, continuationToken: continuationToken});

    this.trigger(this.resources);
  },

  getInitialState: function() {
    return this.resources;
  }
});

module.exports = ResourceStore;
