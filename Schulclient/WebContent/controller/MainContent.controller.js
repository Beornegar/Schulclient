sap.ui.define(
        ["sap/ui/core/mvc/Controller", 
        	"sap/ui/model/json/JSONModel",
            "dk/model/formatter", "sap/m/MessageToast",
            "dk/service/ErrorDialogService",
            "dk/service/ConfirmDialogService",
            "dk/service/ResourceBundleService"
        ],
        function(Controller, JSONModel, formatter, MessageToast,
            ErrorDialogService, ConfirmDialogService, ResourceBundleService) {
            "use strict";
            
    return Controller.extend("dk.controller.MainContent", {
        
    	formatter: formatter,
    	
        getMessage: function(t){
        	if(t) return ResourceBundleService.getMessage(t);
        },
        

        onAfterRendering: function() {
        	
            this.view = (!this.view) ? this.getView() : this.view;
            this.component = (!this.component) ? this.getOwnerComponent() :
                this.component;
            this.router = (!this.router) ? this.component.getRouter() :
                this.router;
        }

    
    });
});