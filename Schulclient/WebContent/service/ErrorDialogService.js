sap.ui.define(["sap/ui/model/json/JSONModel",
    "dk/service/ConfirmDialogService",
    "dk/service/ResourceBundleService"], function(JSONModel,
        ConfirmDialogService, ResourceBundleService) {
  "use strict";

  var dialogConfig = {
    title: ResourceBundleService.getCommonMessage("error.dialog.title"),
    state: "Error",
    endButton: 'accept'
  };
  return {
    openDialog: function(error) {
      dialogConfig.message = ResourceBundleService
              .getMessage(error.message);
      console.log(error.stack);
      var dialogService = ConfirmDialogService.getInstance();

      if (!dialogService) { throw new Error(
              "ConfirmDialogService not initialized"); }

      return dialogService.openDialog(dialogConfig).then(function(dialog) {
        dialog.removeAllContent();
        dialog.close();
      }, function(dialog) {
        dialog.removeAllContent();
        dialog.close();
        return Promise.reject();
      });
    }
  };
});
