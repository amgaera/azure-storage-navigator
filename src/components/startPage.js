"use strict";

const React = require('react');

const StartPage = React.createClass({
  render: function() {
    return (
      <div className="panel-body">
        <div className="jumbotron">
          <h1>Azure Storage Navigator</h1>
          <p>Connect to Azure storage accounts and query blobs, queues, and tables.</p>
        </div>
      </div>
    );
  }
});

module.exports = StartPage;
