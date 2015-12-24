"use strict";

const React = require('react');
const Reflux = require('reflux');
const ResourceStore = require('../../stores/resourceStore');
const StorageAccountList = require('./storageAccountList');
const ResourceList = require('./resourceList');
const AddAccountDialog = require('./addAccountDialog');
const StorageAccountActions = require('../../actions/storageAccountActions');

const ResourcesPane = React.createClass({
  mixins: [Reflux.connect(ResourceStore, 'storageAccounts')],

  openAddAccountDialog: function() {
    this.refs.addAccountDialog.show();
  },

  onSaveAccount: function(account) {
    StorageAccountActions.addStorageAccount(account.name, account.key);
  },

  render: function() {
    return (
      <div className="resources-pane">
        <h3 className="text-center">Storage Accounts</h3>
        <StorageAccountList storageAccounts={this.state.storageAccounts} />
        <button className="btn btn-default btn-block" type="button" onClick={this.openAddAccountDialog}>
          <span className="glyphicon glyphicon-plus"></span> Add account
        </button>
        <AddAccountDialog onSave={this.onSaveAccount} ref="addAccountDialog" />
      </div>
    );
  }
});

module.exports = ResourcesPane;
