"use strict";

const React = require('react');
const IndexLink = require('react-router').IndexLink;

const ErrorPage = React.createClass({
  render: function() {
    return (
      <div className="panel-body">
        <div className="alert alert-danger" role="alert">
          <p>Oh snap! Something went wrong. <IndexLink to="/" className="alert-link">Click here</IndexLink> to reload
            the application.</p>
        </div>
      </div>
    );
  }
});

module.exports = ErrorPage;
