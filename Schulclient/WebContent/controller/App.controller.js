sap.ui.define([ "sap/ui/core/mvc/Controller"]

, function(Controller) {	
	"use strict";
	var component;
	
	return Controller.extend("dk.controller.App", {
		onInit : function() {
			component = this.getOwnerComponent();
		}
	});
	
	
});