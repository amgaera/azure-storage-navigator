"use strict";

let React = require('react');
let Router = require('react-router');
let routes = require('./routes');
let InitializeActions = require('./actions/initializeActions');

InitializeActions.initializeApp();

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
