sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
        function(UIComponent, JSONModel) {
          "use strict";
          return UIComponent.extend("dk.Component", {
            metadata: {
              manifest: "json"
            },
            init: function() {
              // call the init function of the parent
              UIComponent.prototype.init.apply(this, arguments);
              
              
              Date.prototype.getUTCDateyyyy_MM_ddTHHmmssZ = function() {
                return this.getUTCFullYear() + '-' + this.getUTCMonth() + '-'
                        + this.getUTCDate() + 'T' + (this.getUTCHours() + 1)
                        + ':' + this.getUTCMinutes() + ':'
                        + this.getUTCSeconds() + 'Z';
              }
              
              // create the views based on the url/hash                          
              this.getRouter().initialize();
              var oData = {
                currentYear: (new Date().getFullYear())
              };
              
              var oModel = new JSONModel(oData);
              this.setModel(oModel);
            }
          });
        });