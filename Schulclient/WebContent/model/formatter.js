sap.ui.define(['sap/ui/core/format/DateFormat',
               "dk/service/ResourceBundleService"],
               function(DateFormat, ResourceBundleService) {
                  "use strict";
                  var formatter = {};
                  
                  formatter.getMessage = ResourceBundleService.getMessage;
                  formatter.getCommonMessage = ResourceBundleService.getCommonMessage;
                  
                  formatter.integer = function(sValue) {
                    if (!sValue || sValue == "0") { return ""; }
                    return Number(sValue).toFixed(0);
                  };
                  
                  formatter.integerNotNull = function(sValue) {
                    if (!sValue || (sValue === "NA") || (sValue === "---")
                            || !(Number(sValue) > 0)) { return 0; }
                    return Number(sValue).toFixed(0);
                  };
                  
                  formatter.string = function(sValue) {
                    // if (!sValue) { return ""; }
                    if (!sValue || (sValue === "") || (sValue === "NA")
                            || (sValue === "---")) { return ""; }
                    return sValue;
                  };
                  
                  formatter.float = function(sValue) {
                    if (Number(sValue) > 0) return Number(sValue).toFixed(3);
                    return 0;
                  };
                  
                  formatter.stringInteger = function(sValue) {
                    if (Number(sValue) > 0) return Number(sValue);
                    return "";
                  };
                  
                  formatter.stringWithoutPadding = function(sValue) {
                    if (!sValue || (sValue === "NA") || (sValue === "---"))
                      return "";
                    return sValue.replace(/^[0]+/g, "");
                  };
                  
                  formatter.numberUnit = function(sValue) {
                    if (!sValue) { return "0"; }
                    return parseFloat(sValue).toFixed(3);
                  };
                  
                  formatter.dateTimestamp = function(oDate) {
                    if (!oDate) return "";
                    var oDate = new Date(oDate * 1000);
                    var dateFormat = DateFormat.getDateTimeInstance();
                    return dateFormat.format(oDate) || "";
                  };
                  
                  formatter.dateTime = function(oDate) {
                    if (!oDate) return "";
                    var oDate = (oDate instanceof Date) ? oDate : new Date(
                            oDate);
                    var dateFormat = DateFormat.getDateTimeInstance();
                    return dateFormat.format(oDate) || "";
                  };
                  
                  formatter.dateTimeWithNull = function(oDate) {
                    if (!oDate) return "";
                    var oDate = (oDate instanceof Date) ? oDate : new Date(
                            oDate);
                    var dateFormat = DateFormat.getDateTimeInstance();
                    return dateFormat.format(oDate) || "";
                  };
                  
                  formatter.date = function(oDate) {
                    var oDate = (oDate instanceof Date) ? oDate : new Date(
                            oDate);
                    var dateFormat = DateFormat.getDateInstance();
                    return dateFormat.format(oDate) || "";
                  };
                  
                  formatter.jsonDate = function(oDate) {                	  
                	  if(oDate.indexOf("Date")>=0    && (oDate).match(/\d+/) &&(oDate).match(/\d+/)[0]  ){
                		  oDate=Number((oDate).match(/\d+/)[0]);
                    	  oDate = (oDate instanceof Date) ? oDate :new  Date(oDate);
                	  }               	  
                      var dateFormat = DateFormat.getDateInstance();
                      return dateFormat.format(oDate) || "";
                    };
                  
                  formatter.time = function(oDate) {
                    var oDate = (oDate instanceof Date) ? oDate : new Date(
                            oDate);
                    var dateFormat = DateFormat.getTimeInstance();
                    return dateFormat.format(oDate) || "";
                  };
                  
                  formatter.dateTimeUnit = function(oDate) {
                    var oDate = (oDate instanceof Date) ? oDate : new Date(
                            oDate);
                    var dateFormat = DateFormat.getDateInstance();
                    return dateFormat.format(oDate);
                  };
                  
                  formatter.fileName = function(sFile) {
                    var sFileName = '';
                    if (sFile && sFile != '' && sFile != 'NA') {
                      sFileName = sFile.substring(sFile.lastIndexOf('\\') + 1);
                    }
                    return sFileName;
                  };
                  
                  formatter.iconTabEnable = function(sValue) {
                    if (!sValue) { return false; }
                    return true;
                  };
                  
                  formatter.getLocalText = function(aText, prop) {
                    if (!aText || aText.length === 0) { return ''; }
                    var language = ResourceBundleService.getCurrentLanguage()
                            .toLowerCase();
                    var text = aText.find(matchesLanguage);
                    if (!prop) {
                      prop = aText[0].opDesc ? 'opDesc'
                              : (aText[0].description) ? 'description'
                                      : (aText[0].ktext) ? 'ktext'
                                              : ((aText[0].kurzText)
                                                      ? 'kurzText' : null);
                    }
                    function matchesLanguage(item) {
                      if (item.language)
                        return language.includes(item.language.toLowerCase());
                      return language.includes(item.spras.toLowerCase());
                    }
                    return text ? text[prop] : aText[0][prop];
                  };
                  
                  formatter.objectProperties = function(obj, prop1, prop2) {
                    if (obj && prop1 && prop2 && prop1 != "NA" && prop2 != "NA"
                            && obj[prop1] && obj[prop2]) { return obj[prop1]
                            + ', ' + obj[prop2]; }
                    if (obj && prop1 && prop2 && prop1 != "NA" && prop2 != "NA"
                            && !(obj[prop1] || obj[prop2])) { return prop1
                            + ', ' + prop2; }
                    if (obj && prop1 && prop1 != "NA" && obj[prop1]) { return obj[prop1]; }
                    if (obj && prop1 && prop1 != "NA") { return prop1; }
                    if (obj && prop2 && prop2 != "NA" && obj[prop2]) { return obj[prop2]; }
                    if (obj && prop2 && prop2 != "NA") { return prop2; }
                    return '';
                  };

                  formatter.objectProperty = function(obj, prop) {
                    if (obj && prop && prop != "NA" && obj[prop]) { return obj[prop]; }
                    if (obj && prop && prop != "NA") { return prop; }
                    return '';
                  };
                  
                  formatter.personIcon = function(sValue) {
                    if (sValue === 'Y') { return 'sap-icon://person-placeholder'; }
                    if (sValue === 'N') { return 'sap-icon://group'; }
                    return null;
                  };
                  
                  formatter.personIconColor = function(sValue) {
                    if (sValue === 'LOG') { return 'Positive'; }
                    if (sValue === 'BRK') { return 'Critical'; }
                    return null;
                  };
                  
                  formatter.operationStatusText = function(opId, mapping) {
                    if (!opId) return '';
                    if (!mapping) return '';
                    var operstionStatusDescription = '';
                    if (opId && mapping) {
                      $.map(mapping, function(v) {
                    	  if (v.opId === opId && v.operationStatus
                                 && v.operationStatus.operationStatustx
                                 && v.operationStatus.operationStatustx[0]
                                 && v.operationStatus.operationStatustx[0].opDesc) {operstionStatusDescription = formatter.getLocalText(v.operationStatus.operationStatustx);}
                      });
                    }
                    return operstionStatusDescription;
                  };
                  
                  formatter.objectDefinedProperty = function(obj, prop, type) {
                    var getNested = function(theObject, path, separator) {
                      try {
                        separator = separator || '.';

                        return path.replace('[', separator).replace(']', '')
                                .split(separator).reduce(
                                        function(thatobj, property) {
                                          return thatobj[property];
                                        }, theObject);

                      } catch (err) {
                        return undefined;
                      }
                    };
                    var formatFunction = formatter[type] || formatter.string;
                    if (obj && prop && prop != "NA" && getNested(obj, prop)) { return formatFunction(getNested(
                            obj, prop)); }
                    if (obj && prop && prop != "NA") { return formatFunction(obj[prop]); }
                    return '';
                  };
                  
                  return formatter;
});