"use strict";

const React = require('react');
const _ = require('lodash');
const ModalDialog = require('../common/modalDialog');
const FormInput = require('../common/formInput');

const AddAccountDialog = React.createClass({
  propTypes: {
    onSave: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      account: { name: '', key: '' },
      errors: {}
    };
  },

  show: function() {
    this.refs.dialog.show();
  },

  onInputChange: function(field, event) {
    const account = this.state.account;
    account[field] = event.target.value;

    this.setState({account: account});
  },

  onAddButtonClick: function() {
    const errors = {};
    let hasErrors = false;

    if (!this.state.account.name) {
      errors.name = 'Account name must not be empty';
      hasErrors = true;
    }

    if (!this.state.account.key) {
      errors.key = 'Account key must not be empty';
      hasErrors = true;
    }

    if (hasErrors) {
      this.setState({errors: errors});
    } else {
      this.props.onSave(this.state.account);
      this.refs.dialog.hide();
    }
  },

  onDialogHide: function() {
    this.replaceState(this.getInitialState());
  },

  createDialogButtons: function() {
    return [
      <button type="button" key="cancel-button" className="btn btn-default" data-dismiss="modal">Cancel</button>,
      <button type="button" key="add-button" className="btn btn-primary" onClick={this.onAddButtonClick}>
        Add account
      </button>
    ];
  },

  render: function() {
    return (
      <ModalDialog title="Add storage account" footer={this.createDialogButtons()} onHide={this.onDialogHide} ref="dialog">
        <form>
          <FormInput
            label="Name"
            value={this.state.account.name}
            error={this.state.errors.name}
            onChange={_.partial(this.onInputChange, 'name')} />
          <FormInput
            label="Key"
            value={this.state.account.key}
            error={this.state.errors.key}
            onChange={_.partial(this.onInputChange, 'key')} />
        </form>
      </ModalDialog>
    );
  }
});

module.exports = AddAccountDialog;
