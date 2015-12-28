"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;

const routes = (
  <Route path="/" component={require('./components/app')}>
    <IndexRoute component={require('./components/startPage')} />
    <Route path="*" component={require('./components/errorPage')} />
  </Route>
);

module.exports = routes;
