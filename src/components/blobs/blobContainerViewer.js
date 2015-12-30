"use strict";

const React = require('react');
const _ = require('lodash');

const ListBlobsForm = require('./listBlobsForm');

const BlobContainerViewer = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired
  },

  onListBlobsFormSubmit: function(prefix) {
    console.log(prefix);
  },

  render: function() {
    return (
      <div>
        <ListBlobsForm onSubmit={this.onListBlobsFormSubmit} />
        <p>Storage account: {this.props.params.storageAccount}</p>
        <p>Container: {this.props.params.container}</p>
      </div>
    );
  }
});

module.exports = BlobContainerViewer;
