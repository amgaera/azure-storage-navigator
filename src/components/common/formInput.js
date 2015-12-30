"use strict";

const React = require('react');
const _ = require('lodash');

const FormInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      inputId: _.uniqueId('formInput')
    };
  },

  render: function() {
    const wrapperClass = (this.props.error && this.props.error.length > 0) ? 'form-group has-error' : 'form-group';

    return (
      <div className={wrapperClass}>
        <label className="control-label" htmlFor={this.state.inputId}>{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          id={this.state.inputId}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange} />
        <span className="help-block">{this.props.error}</span>
      </div>
    );
  }
});

module.exports = FormInput;
