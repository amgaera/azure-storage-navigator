"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const _ = require('lodash');

const routes = require('../../routes');

const TabContentsPane = React.createClass({
  propTypes: {
    openTabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    activeTabIndex: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      tabContents: {}
    };
  },

  getTabContents: function(tabData) {
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

  wrapTabContents: function(tabContents, tabIndex) {
    const panelClass = tabIndex === this.props.activeTabIndex ? 'tab-pane show' : 'tab-pane hidden';

    return (
      <div key={tabIndex} role="tabpanel" className={panelClass}>{tabContents}</div>
    );
  },

  render: function() {
    const tabContents = _.map(this.props.openTabs, this.getTabContents);
    const tabPanels = _.map(tabContents, this.wrapTabContents);

    return (
      <div className="tab-content">
        {tabPanels}
      </div>
    );
  }
});

module.exports = TabContentsPane;
