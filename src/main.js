"use strict";

const React = require('react');
const ReactDom = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;

const routes = require('./routes');
const InitializeActions = require('./actions/initializeActions');

InitializeActions.initializeApp();
ReactDom.render(<Router>{routes}</Router>, document.getElementById('app'));
