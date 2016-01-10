"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const _ = require('lodash');

const routes = require('../../routes');

const TabContentsPane = React.createClass({
  propTypes: {
    activeTab: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      tabContents: {}
    };
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

  render: function() {
    return this.getActiveTabContents(this.props.activeTab);
  }
});

module.exports = TabContentsPane;
