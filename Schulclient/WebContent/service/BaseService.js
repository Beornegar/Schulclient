sap.ui.define(function() {
  return function(model) {
    this.getRepresentation = function() {
      return model.getRequestOutcome();
    };
    this.fetchRepresentation = function() {
      return model.getRepresentation();
    };
    this.addRepresentation = function(representation) {
      return model.postRepresentation(representation);
    };
    this.updateRepresentation = function() {
      return model.putRepresentation();
    };
    this.removeRepresenntation = function() {
      return model.deleteRepresentation();
    };
    this.refreshModel = function() {
      model.refresh(true);
    };
    this.reloadModel = function() {
      return model.getRepresentation().then(this.refreshModel);
    };
    this.getModel = function() {
      return model;
    };
  };
});
