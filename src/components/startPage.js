"use strict";

let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

let StartPage = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Azure Storage Navigator</h1>
        <p>Connect to Azure storage accounts and query blobs, queues, and tables.</p>
      </div>
    );
  }
});

module.exports = StartPage;
