"use strict";

const Reflux = require('reflux');

const ContentActions = Reflux.createActions([
  'openUrl'
]);

ContentActions.openUrl.listen(function(contentUrl) {
  document.location.hash = contentUrl;
});

module.exports = ContentActions;
