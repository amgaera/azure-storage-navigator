/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

const React = require('react');
$ = jQuery = require('jquery');

const ResourcesPane = require('./resources/resourcesPane');
const TabList = require('./common/tabList');

const App = React.createClass({
  render: function() {
    return (
      <div>
        <ResourcesPane />
        <div className="main-pane panel panel-default">
          <div className="panel-heading">
            <TabList/>
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
