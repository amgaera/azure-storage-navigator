"use strict";

const React = require('react');
const _ = require('lodash');

const TabActions = require('../../actions/tabActions');

const TabList = React.createClass({
  propTypes: {
    openTabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    activeTabIndex: React.PropTypes.number.isRequired
  },

  onTabClick: function(tabIndex, clickEvent) {
    clickEvent.preventDefault();
    TabActions.switchToTab(tabIndex);
  },

  createTabElement: function(tabData, index) {
    const elementKey = `tab${index}`;
    const elementClass = index === this.props.activeTabIndex ? 'active' : null;
    const onClickFunc = _.partial(this.onTabClick, index);

    return (
      <li key={elementKey} role="presentation" className={elementClass}>
        <a href="#" onClick={onClickFunc}>{tabData.title}</a>
      </li>
    );
  },

  render: function() {
    const tabs = _.map(this.props.openTabs, this.createTabElement);

    return (
      <ul className="nav nav-pills">
        {tabs}
      </ul>
    );
  }
});

module.exports = TabList;
