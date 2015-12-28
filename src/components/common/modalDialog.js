"use strict";

const React = require('react');
const _ = require('lodash');

const ModalDialog = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
    footer: React.PropTypes.node,
    onHide: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      visible: false,
      labelId: _.uniqueId('modalDialogLabel')
    };
  },

  componentDidMount: function() {
    const dialogNode = $(this.refs.dialog);

    dialogNode.on('hidden.bs.modal', event => {
      this.setState({visible: false});
      this.props.onHide();
      return false;
    });
  },

  show: function() {
    const dialogNode = $(this.refs.dialog);

    this.setState({visible: true});
    dialogNode.modal();
  },

  hide: function() {
    const dialogNode = $(this.refs.dialog);
    dialogNode.modal('hide');
  },

  render: function() {
    const header = (
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span className="glyphicon glyphicon-remove"></span>
        </button>
        <h4 className="modal-title" id={this.state.labelId}>{this.props.title}</h4>
      </div>
    );

    return (
      <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby={this.state.labelId} ref="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {header}
            <div className="modal-body">
              {this.state.visible ? this.props.children : null}
            </div>
            <div className="modal-footer">
              {this.state.visible ? this.props.footer : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ModalDialog;
