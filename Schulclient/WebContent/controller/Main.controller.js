sap.ui.define(["sap/ui/core/mvc/Controller", "dk/model/formatter"]
, function(Controller, formatter) {
    "use strict";
    
    return Controller.extend("dk.controller.Main", {
        formatter: formatter,
        
        onAfterRendering: function() {
            this.view = (!this.view) ? this.getView() : this.view;
            this.component = (!this.component) ? this.getOwnerComponent() : this.component;
            this.router = (!this.router) ? this.component.getRouter() : this.router;
            var view = this.view;
            var component = this.component;
            var router = this.router;
        },
      
      
        fieldNameChange: function(oEvent) {
            console.log(oEvent);
        }

    });
});