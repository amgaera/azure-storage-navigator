"use strict";

const React = require('react');
const _ = require('lodash');

const ListBlobsForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      prefix: '',
      prefixInputId: _.uniqueId('prefixInput')
    };
  },

  onPrefixChange: function(event) {
    this.setState({prefix: event.target.value});
  },

  onListBlobsButtonClick: function(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.prefix);
  },

  render: function() {
    return (
      <form className="list-blobs-form form-horizontal">
        <label htmlFor={this.state.prefixInputId}>Prefix</label>
        <input
          type="text"
          className="form-control"
          id={this.state.prefixInputId}
          value={this.state.prefix}
          placeholder="Case-sensitive name prefix to filter blobs on"
          onChange={this.onPrefixChange} />
        <button type="submit" className="btn btn-primary" onClick={this.onListBlobsButtonClick}>
          List blobs
        </button>
      </form>
    );
  }
});

module.exports = ListBlobsForm;
