"use strict";

const Reflux = require('reflux');

const TabActions = Reflux.createActions([
  'openTab',
  'switchToTab',
  'switchToOrOpenTab'
]);

module.exports = TabActions;
