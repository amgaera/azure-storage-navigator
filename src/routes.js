"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;

const routes = (
  <Route path="/">
    <IndexRoute component={require('./components/startPage')} />
    <Route path="blobs/:storageAccount/:container" component={require('./components/blobs/blobContainerViewer')} />
    <Route path="*" component={require('./components/errorPage')} />
  </Route>
);

module.exports = routes;
