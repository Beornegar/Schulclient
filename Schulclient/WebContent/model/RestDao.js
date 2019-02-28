sap.ui.define(["sap/ui/model/json/JSONModel"], 
		function(JSONModel) {
			"use strict";
			 return JSONModel.extend("dk.model.RestDao", {
			    
				 constructor: function() {
			      var url = typeof arguments[0] === "string" ? arguments[0] : "";
			      if (!arguments[0] || typeof arguments[0] === "string") {
			        arguments[0] = {
			          representation: null
			        };
			      } else if (arguments[0]) {
			        arguments[0] = {
			          representation: arguments[0]
			        };
			      }
			      if (arguments[1]) {
			        arguments[0].representation = arguments[1];
			      }
			      JSONModel.apply(this, arguments);
			      this.url = url;
			    },
			    getRequestInstance: function() {
			      // Old compatibility code, no longer needed.
			      if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
			        /* global XMLHttpRequest */
			        this.REQUEST_DONE = XMLHttpRequest.DONE;
			        return new XMLHttpRequest();
			      } else if (window.ActiveXObject) { // IE 6 and older
			        // see https://msdn.microsoft.com/en-us/library/ms535874(v=vs.85).aspx
			        /* global ActiveXObject */
			        this.REQUEST_DONE = 4;
			        return new ActiveXObject("MSXML2.XMLHTTP.3.0");
			      }
			    },
			    getRequestOutcome: function() {
			      return this.outcome;
			    },
			    getRepresentation: function(url) {
			      if (url) {
			        this.url = url;
			      }
			      var model = this;
			      this.outcome = new Promise(function(fulfill, reject) {
			        Promise.resolve(jQuery.ajax({
			          url: model.url,
			          dataType: "json"
			        })).then(function(result) {
			          model.setProperty("/representation", result);
			          model.fireRequestCompleted({
			            url: model.url,
			            type: "GET"
			          });
			          fulfill(model.getProperty("/representation"));
			        }, function(result) {
			          var errorBody = getErrorBody(result);
			          var message = errorBody.detail + ' calling ' + model.url;
			          reject(new Error(message));
			        });
			      });
			      return this.outcome;
			    },
			    postRepresentation: function(representation) {
			      var model = this;
			      return new Promise(function(fulfill, reject) {
			        var httpRequest = model.getRequestInstance();
			        httpRequest.onreadystatechange = function() {
			          if (httpRequest.readyState === model.REQUEST_DONE) {
			            if (httpRequest.status === 201 || httpRequest.status === 202) {
			              fulfill(httpRequest);
			            } else {
			              var errorBody = getErrorBody(httpRequest);
			              var message = errorBody.detail + ' calling ' + model.url;
			              var error = new Error(message);
			              error.request = httpRequest;
			              reject(error);
			            }
			          }
			        };
			        httpRequest.open('POST', model.url, true);
			        httpRequest.setRequestHeader('Content-Type', 'application/json');
			        httpRequest.send(JSON.stringify(representation));
			      });
			    },
			    putRepresentation: function() {
			      var model = this;
			      return new Promise(function(fulfill, reject) {
			        var httpRequest = model.getRequestInstance();
			        httpRequest.onreadystatechange = function() {
			          if (httpRequest.readyState === model.REQUEST_DONE) {
			            if (httpRequest.status === 200 || httpRequest.status === 204) {
			              fulfill(httpRequest);
			            } else {
			              var errorBody = getErrorBody(httpRequest);
			              var message = errorBody.detail + ' calling ' + model.url;
			              var error = new Error(message);
			              error.request = httpRequest;
			              reject(error);
			            }
			          }
			        };
			        httpRequest.open('PUT', model.url, true);
			        httpRequest.setRequestHeader('Content-Type', 'application/json');
			        httpRequest.send(JSON.stringify(model.getProperty("/representation")));
			      });
			    },
			    deleteRepresentation: function() {
			      var model = this;
			      return new Promise(function(fulfill, reject) {
			        var httpRequest = model.getRequestInstance();
			        httpRequest.onreadystatechange = function() {
			          if (httpRequest.readyState === model.REQUEST_DONE) {
			            if (httpRequest.status === 200 || httpRequest.status === 202
			                    || httpRequest.status === 204) {
			              fulfill(httpRequest);
			            } else {
			              var message = httpRequest.responseJSON.detail + ' calling '
			                      + model.url;
			              reject(new Error(message));
			            }
			          }
			        };
			        httpRequest.open('DELETE', model.url, true);
			        httpRequest.send(null);
			      });
			    }
			  });
			
			  function getErrorBody(request) {
			    if (request && request.responseJSON && request.responseJSON.error
			            && request.responseJSON.error.message
			            && request.responseJSON.error.message.value) {
			      request.responseJSON.detail = request.responseJSON.error.message.value;
			    }
			    if (request.responseJSON) { return request.responseJSON; }
			    if (request.responseText) {
			      try {
			        return JSON.parse(request.responseText);
			      } catch (e) {
			        return {
			          title: "Unknown error",
			          detail: "An unknown error ocurred"
			        }
			      }
			    }
			    return {
			      title: "Unknown error",
			      detail: "An unknown error ocurred"
			    }
			  }
});
