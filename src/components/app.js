/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var TabList = require('./common/tabList');
var ResourcesPane = require('./resources/resourcesPane');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

var App = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-3">
            <ResourcesPane />
          </div>
          <div className="col-xs-9">
            <TabList/>
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
