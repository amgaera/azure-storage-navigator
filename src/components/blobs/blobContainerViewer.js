"use strict";

const React = require('react');
const Reflux = require('reflux');
const _ = require('lodash');

const ListBlobsForm = require('./listBlobsForm');
const ResourceActions = require('../../actions/resourceActions');
const ResourceStore = require('../../stores/resourceStore');

const BlobContainerViewer = React.createClass({
  mixins: [Reflux.listenTo(ResourceStore, 'onResourcesChange', 'onResourcesChange')],

  propTypes: {
    storageAccount: React.PropTypes.string.isRequired,
    container: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      prefix: '',
      results: [],
      continuationToken: null
    };
  },

  onResourcesChange: function(resources) {
    const path = `${this.props.storageAccount}.${this.props.container}.${this.state.prefix}`;

    if (!_.has(resources, path)) {
      return;
    }

    const results = _.get(resources, path);

    this.setState({results: results.entries, continuationToken: results.continuationToken});
  },

  onListBlobsFormSubmit: function(prefix) {
    this.setState({prefix: prefix});
    ResourceActions.loadBlobList(this.props.storageAccount, this.props.container, prefix);
  },

  getTableRow: function(blobMetadata) {
    return (
      <tr key={blobMetadata.name}>
        <td>{blobMetadata.name}</td>
        <td>{blobMetadata.properties['last-modified']}</td>
        <td>{blobMetadata.properties['content-length']}B</td>
      </tr>
    );
  },

  render: function() {
    return (
      <div>
        <div className="panel-body">
          <ListBlobsForm onSubmit={this.onListBlobsFormSubmit} />
        </div>
        <table className="table table-condensed table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Modified</th>
              <th>Content Length</th>
            </tr>
          </thead>
          <tbody>
            {_.map(this.state.results, this.getTableRow)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = BlobContainerViewer;
