"use strict";

const React = require('react');
const _ = require('lodash');

const FormInput = require('../common/formInput');

const BlobContainerViewer = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      prefix: '',
      errors: {}
    };
  },

  onPrefixChange: function(event) {
    this.setState({prefix: event.target.value});
  },

  onListBlobsButtonClick: function() {
  },

  render: function() {
    return (
      <div>
        <form className="form-inline">
          <FormInput
            label="Prefix"
            value={this.state.prefix}
            error={this.state.errors.prefix}
            onChange={this.onPrefixChange} />
          <button type="submit" className="btn btn-primary" onClick={this.onListBlobsButtonClick}>
            List blobs
          </button>
        </form>
        <p>Storage account: {this.props.params.storageAccount}</p>
        <p>Container: {this.props.params.container}</p>
      </div>
    );
  }
});

module.exports = BlobContainerViewer;
