"use strict";

const React = require('react');
const Reflux = require('reflux');
const Router = require('react-router');
const Link = Router.Link;
const _ = require('lodash');

const TabActions = require('../../actions/tabActions');
const TabStore = require('../../stores/tabStore');

const TabList = React.createClass({
  mixins: [Reflux.connect(TabStore, 'tabState')],

  createTabElement: function(tabData, index) {
    const elementKey = `tab${index}`;
    const elementClass = index === this.state.tabState.activeTabIndex ? 'active' : null;
    const onClickFunc = _.partial(TabActions.switchToTab, index);

    return (
      <li key={elementKey} role="presentation" className={elementClass}>
        <a href="#" onClick={onClickFunc}>{tabData.title}</a>
      </li>
    );
  },

  render: function() {
    const tabs = _.map(this.state.tabState.openTabs, this.createTabElement);

    return (
      <ul className="nav nav-pills">
        {tabs}
      </ul>
    );
  }
});

module.exports = TabList;
