"use strict";

let React = require('react');

let Router = require('react-router');
let DefaultRoute = Router.DefaultRoute;
let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;

let routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/startPage')} />
    <NotFoundRoute handler={require('./components/errorPage')} />
  </Route>
);

module.exports = routes;
