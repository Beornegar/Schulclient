sap.ui.define(function() {
  "use strict";
  return {
    getConfig: function() {
      var location = window.location;
      return Promise.resolve({
        serviceLinkScheme: location.protocol,
        serviceLinkHost: location.hostname,
        serviceLinkPort: location.port,
        serviceLinkContextRoot: '',
        serviceUrl: ""
      });
    }
  };
});
