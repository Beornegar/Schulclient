sap.ui.define([ "sap/m/Button", "sap/m/Text",
		"dk/service/ResourceBundleService" ], function(Button, Text,
		ResourceBundleService) {
	"use strict";
	var instance;
	var lastAction;
	return {
		getInstance : function(view) {
			if (!instance && view) {
				instance = new ConfirmDialog(view);
			}
			return instance;
		}
	};
	function ConfirmDialog(view) { // eslint-disable-line
		// require-jsdoc
		var self = this;
		var dialog = sap.ui.xmlfragment("dk.view.ConfirmDialog");
		jQuery.sap.require("jquery.sap.resources");
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/i18n.properties"
		});
		var commonBundleModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "/i18n/commonBundle.properties"
		});
		dialog.setModel(i18nModel, "i18n");
		dialog.setModel(commonBundleModel, "commonBundle");
		// connect dialog to view (models, lifecycle)
		view.addDependent(this.dialog);
		this.setTitle = function(key) {
			var title = ResourceBundleService.getMessage(key);
			dialog.setTitle(title);
		};
		this.setMessage = function(key) {
			var message = new Text({
				text : ResourceBundleService.getMessage(key)
			});
			self.setContent(message);
		};
		this.getLastAction = function() {
			return lastAction;
		};
		this.getButtons = function() {
			return dialog.getButtons();
		};
		this.openDialog = function() {
			dialog.destroyBeginButton();
			dialog.destroyEndButton();
			dialog.destroyButtons();
			dialog.setState("None");
			dialog.setType("Standard");
			var config = {
				beginButton : "confirm",
				endButton : "cancel"
			};
			if (typeof arguments[0] === "object") {
				config = arguments[0];
			} else if (typeof arguments[0] === "string") {
				config.title = arguments[0];
			}
			if (arguments[1] && typeof arguments[1] === "string") {
				config.message = arguments[1];
			}
			this.setTitle(config.title);
			return new Promise(function(fulfill, reject) {
				var endCallback = fulfill;
				if (config.endButton === "cancel") {
					endCallback = reject;
				}
				if (config.message) {
					dialog.setType("Message");
					self.setMessage(config.message);
				}
				if (config.state) {
					dialog.setState(config.state);
				}
				if (config.beginButton) {
					self.setBeginButton(config.beginButton, fulfill);
				}
				if (config.endButton) {
					self.setEndButton(config.endButton, endCallback);
				}
				if (config.buttons) {
					config.buttons.forEach(addCustomButton);
				}
				dialog.open();
				function addCustomButton(item) {
					var key = item;
					if (typeof item !== 'string') {
						key = item.key || item.title;
					}
					if (key === 'cancel' || key === 'close') {
						var button = self.generateGenericButton(key, reject);
						dialog.addButton(button);
					} else {
						var button = self.generateCustomButton(item,
								function() {
									lastAction = key;
									fulfill(dialog);
								});
						dialog.addButton(button);
					}
				}
			});
		};
		this.setContent = function(content) {
			dialog.removeAllContent();
			dialog.addContent(content);
		};
		this.setContentHeight = function(height) {
			dialog.setContentHeight(height);
		};
		this.setContentWidth = function(width) {
			dialog.setContentWidth(width);
		};
		this.addContent = function(content) {
			dialog.addContent(content);
		};
		this.insertContent = function(content, index) {
			dialog.insertContent(content, index);
		};
		this.setBeginButton = function(text, callback) {
			var beginButton = this.generateGenericButton(text, callback);
			dialog.setBeginButton(beginButton);
		};
		this.setEndButton = function(text, callback) {
			var endButton = this.generateGenericButton(text, callback);
			dialog.setEndButton(endButton);
		};
		this.generateGenericButton = function(key, callback) {
			return this.generateButton(key, callback);
		};
		this.generateCustomButton = function(config, callback) {
			var key = typeof config === 'string' ? config : config.title;
			var button = this.generateButton(key, callback);
			if (typeof config !== 'string'
					&& typeof config.enabled !== 'undefined') {
				button.setEnabled(config.enabled);
			} 
			return button; 
		};
		this.generateButton = function(key, callback) {
			var text = ResourceBundleService.getMessage(key);
			var result = new Button();
			result.setText(text);
			result.setType(getKeyType());
			result.attachPress(function() {
				callback(dialog);
			});
			return result;
			function getKeyType() {
				if (key === 'ok' || key === 'confirm' || key === 'submit'
						|| key === 'apply' || key === 'next')
					return "Accept";
				if (key === 'cancel' || key === 'back')
					return "Reject";
				return "Reject";
			}
		};
	}
});
