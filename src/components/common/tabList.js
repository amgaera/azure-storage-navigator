"use strict";

const React = require('react');
const Reflux = require('reflux');
const ReactRouter = require('react-router');
const _ = require('lodash');

const routes = require('../../routes');
const TabActions = require('../../actions/tabActions');
const TabStore = require('../../stores/tabStore');

const TabList = React.createClass({
  mixins: [Reflux.connect(TabStore, 'tabState')],

  getInitialState: function() {
    return {
      tabContents: {}
    };
  },

  onTabClick: function(tabIndex, clickEvent) {
    clickEvent.preventDefault();
    TabActions.switchToTab(tabIndex);
  },

  getActiveTabContents: function(tabData) {
    let tabContents = this.state.tabContents[tabData.contentUrl];

    if (tabContents) {
      return tabContents;
    }

    ReactRouter.match({routes, location: tabData.contentUrl}, (error, redirectLocation, renderProps) => {
      // renderProps.components[0] corresponds to the wrapper route and is undefined
      tabContents = React.createElement(renderProps.components[1], renderProps.params);
    });

    this.state.tabContents[tabData.contentUrl] = tabContents;
    return tabContents;
  },

  createTabElement: function(tabData, index) {
    const elementKey = `tab${index}`;
    const elementClass = index === this.state.tabState.activeTabIndex ? 'active' : null;
    const onClickFunc = _.partial(this.onTabClick, index);

    return (
      <li key={elementKey} role="presentation" className={elementClass}>
        <a href="#" onClick={onClickFunc}>{tabData.title}</a>
      </li>
    );
  },

  render: function() {
    const openTabs = this.state.tabState.openTabs;
    const tabs = _.map(openTabs, this.createTabElement);
    const tabContents = this.getActiveTabContents(openTabs[this.state.tabState.activeTabIndex]);

    return (
      <div>
        <div className="panel-heading">
          <ul className="nav nav-pills">
            {tabs}
          </ul>
        </div>
        {tabContents}
      </div>
    );
  }
});

module.exports = TabList;
