"use strict";

const Reflux = require('reflux');

const TabActions = Reflux.createActions([
  'openTab',
  'openInActiveTab',
  'switchToTab',
  'switchToOrOpenTab'
]);

module.exports = TabActions;
