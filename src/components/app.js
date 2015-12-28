/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

const React = require('react');
$ = jQuery = require('jquery');

const ResourcesPane = require('./resources/resourcesPane');
const TabList = require('./common/tabList');

const App = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-3">
            <ResourcesPane />
          </div>
          <div className="col-xs-9">
            <TabList/>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
