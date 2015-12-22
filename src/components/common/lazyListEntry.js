"use strict";

let React = require('react');
let _ = require('lodash');

let LazyListEntry = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      expanded: false
    };
  },

  registerCollapseEventHandlers: function(node) {
    // node is set to null when the referenced component is unmounted. This function doesn't need
    // to perform any clean-up in that case.
    if (node == null) {
      return;
    }

    let domNode = $(node.getDOMNode());
    domNode.on('hidden.bs.collapse', event => {
      this.setState({expanded: false});
      return false;
    });
    domNode.on('show.bs.collapse', event => {
      this.setState({expanded: true});
      event.stopPropagation();
    });
  },

  render: function() {
    let wrapperNodeId = _.uniqueId('lazyListEntry');
    let iconClass = 'glyphicon glyphicon-chevron-' + (this.state.expanded ? 'down' : 'right');

    return (
      <div>
        <a href={'#' + wrapperNodeId} className="list-group-item" data-toggle="collapse">
          <span className={iconClass}></span>
          {this.props.label}
        </a>
        <div ref={this.registerCollapseEventHandlers} className="collapse" id={wrapperNodeId}>
          {this.state.expanded ? this.props.children : null}
        </div>
      </div>
    );
  }
});

module.exports = LazyListEntry;
