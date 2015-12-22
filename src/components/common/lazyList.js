"use strict";

var React = require('react');
var _ = require('lodash');
var LazyListEntry = require('./lazyListEntry');

var LazyList = React.createClass({
  propTypes: {
    children: function (props, propName, componentName) {
      let children = [];
      React.Children.forEach(props[propName], child => children.push(child));

      if (_.any(children, child => child.type !== LazyListEntry)) {
        return new Error(`\`${componentName}\` should only have children of type \`LazyListEntry\`.`);
      }
    }
  },

  render: function() {
    return (
      <div className="list-group tree-list">
        {this.props.children}
      </div>
    );
  }
});

module.exports = LazyList;
