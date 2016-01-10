"use strict";

const React = require('react');
const _ = require('lodash');

const StorageAccountActions = require('../../actions/storageAccountActions');
const TabActions = require('../../actions/tabActions');

const ResourceContainerList = React.createClass({
  propTypes: {
    resourceType: React.PropTypes.string.isRequired,
    loadAction: React.PropTypes.func.isRequired,
    storageAccount: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    if (!_.has(this.props.storageAccount.resources, this.props.resourceType)) {
      this.props.loadAction(this.props.storageAccount.name);
    }
  },

  openResourceViewerTab: function(resourceName, clickEvent) {
    clickEvent.preventDefault();

    const viewerUrl = `/${this.props.resourceType}s/${this.props.storageAccount.name}/${resourceName}`;
    TabActions.switchToOrOpenTab(viewerUrl, resourceName);
  },

  createResourceRow: function(resourceName) {
    const onClickFunc = _.partial(this.openResourceViewerTab, resourceName);

    return (
      <a key={resourceName} href="#" className="list-group-item" onClick={onClickFunc}>{resourceName}</a>
    );
  },

  render: function() {
    if (!_.has(this.props.storageAccount.resources, this.props.resourceType)) {
      return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width: '100%'}}>
          </div>
        </div>
      );
    }

    const resourceNames = this.props.storageAccount.resources[this.props.resourceType];

    return (
      <div className="list-group">
        {_.map(resourceNames, this.createResourceRow, this)}
      </div>
    );
  }
});

module.exports = ResourceContainerList;
