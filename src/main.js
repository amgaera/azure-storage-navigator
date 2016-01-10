"use strict";

const React = require('react');
const ReactDom = require('react-dom');

const App = require('./components/app');
const InitializeActions = require('./actions/initializeActions');

InitializeActions.initializeApp();
ReactDom.render(<App />, document.getElementById('app'));
