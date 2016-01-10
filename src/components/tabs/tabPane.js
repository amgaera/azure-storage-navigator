"use strict";

const React = require('react');
const Reflux = require('reflux');

const TabContentsPane = require('./tabContentsPane');
const TabList = require('./tabList');
const TabStore = require('../../stores/tabStore');

const TabPane = React.createClass({
  mixins: [Reflux.connect(TabStore, 'tabState')],

  render: function() {
    const openTabs = this.state.tabState.openTabs;
    const activeTabIndex = this.state.tabState.activeTabIndex;

    return (
      <div className="main-pane panel panel-default">
        <div className="panel-heading">
          <TabList openTabs={openTabs} activeTabIndex={activeTabIndex} />
        </div>
        <TabContentsPane activeTab={openTabs[activeTabIndex]} />
      </div>
    );
  }
});

module.exports = TabPane;
