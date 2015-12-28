"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;

const routes = require('./routes');
const InitializeActions = require('./actions/initializeActions');

InitializeActions.initializeApp();
React.render(<Router>{routes}</Router>, document.getElementById('app'));
