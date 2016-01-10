/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

const React = require('react');
$ = jQuery = require('jquery');

const AccountsPane = require('./accounts/accountsPane');
const TabPane = require('./tabs/tabPane');

const App = React.createClass({
  render: function() {
    return (
      <div>
        <AccountsPane />
        <TabPane />
      </div>
    );
  }
});

module.exports = App;
