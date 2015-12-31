/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

const React = require('react');
$ = jQuery = require('jquery');

const AccountsPane = require('./accounts/accountsPane');
const TabList = require('./common/tabList');

const App = React.createClass({
  render: function() {
    return (
      <div>
        <AccountsPane />
        <div className="main-pane panel panel-default">
          <div className="panel-heading">
            <TabList/>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
