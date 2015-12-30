"use strict";

const React = require('react');
const Reflux = require('reflux');

const AccountStore = require('../../stores/accountStore');
const StorageAccountList = require('./storageAccountList');
const AddAccountDialog = require('./addAccountDialog');
const StorageAccountActions = require('../../actions/storageAccountActions');

const AccountsPane = React.createClass({
  mixins: [Reflux.connect(AccountStore, 'storageAccounts')],

  openAddAccountDialog: function() {
    this.refs.addAccountDialog.show();
  },

  onSaveAccount: function(account) {
    StorageAccountActions.addStorageAccount(account.name, account.key);
  },

  render: function() {
    return (
      <div className="resources-pane well">
        <h4 className="text-center">Storage Accounts</h4>
        <StorageAccountList storageAccounts={this.state.storageAccounts} />
        <button className="btn btn-default btn-block" type="button" onClick={this.openAddAccountDialog}>
          <span className="glyphicon glyphicon-plus"></span> Add account
        </button>
        <AddAccountDialog onSave={this.onSaveAccount} ref="addAccountDialog" />
      </div>
    );
  }
});

module.exports = AccountsPane;
