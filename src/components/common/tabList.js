"use strict";

let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

let TabList = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><Link to="app">Start</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = TabList;
