"use strict";

let React = require('react');
let Link = require('react-router').Link;

let ErrorPage = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger" role="alert">
        <p>Oh snap! Something went wrong. <Link to="app" className="alert-link">Click here</Link> to reload
          the application.</p>
      </div>
    );
  }
});

module.exports = ErrorPage;
