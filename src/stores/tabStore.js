"use strict";

const Reflux = require('reflux');
const _ = require('lodash');

const ContentActions = require('../actions/contentActions');

const TabStore = Reflux.createStore({
  listenables: [
    require('../actions/tabActions')
  ],

  tabState: {
    activeTabIndex: 0,
    openTabs: [
      { contentUrl: '/', title: 'Start' }
    ]
  },

  onOpenTab(contentUrl, tabTitle) {
    const tabIndex = this.tabState.openTabs.length;

    this.tabState.openTabs.push({ contentUrl: contentUrl, title: tabTitle });
    this.tabState.activeTabIndex = tabIndex;

    this.trigger(this.tabState);
    ContentActions.openUrl(contentUrl);
  },

  onSwitchToTab(tabIndex) {
    const maxTabIndex = this.tabState.openTabs.length - 1;

    if (tabIndex < 0 || tabIndex > maxTabIndex) {
      throw new RangeError(`Invalid tab index ${tabIndex} received (expected a number in the range [0, ${maxTabIndex}])`);
    }

    this.tabState.activeTabIndex = tabIndex;
    this.trigger(this.tabState);
    ContentActions.openUrl(this.tabState.openTabs[tabIndex].contentUrl);
  },

  onSwitchToOrOpenTab(contentUrl, tabTitle) {
    const tabIndex = _.findIndex(this.tabState.openTabs, tab => tab.contentUrl === contentUrl);

    if (tabIndex === -1) {
      this.onOpenTab(contentUrl, tabTitle);
    } else {
      this.tabState.activeTabIndex = tabIndex;
      this.trigger(this.tabState);
      ContentActions.openUrl(contentUrl);
    }
  },

  getInitialState: function() {
    return this.tabState;
  }
});

module.exports = TabStore;
