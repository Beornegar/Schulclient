sap.ui.define(function () {
    jQuery.sap.require("jquery.sap.resources");
    var bundle = jQuery.sap.resources({url: "i18n/i18n.properties"});
    var commonBundle = jQuery.sap.resources({url: "i18n/commonBundle.properties"});
    return {
        getMessage: function (key, args) {
            return bundle.getText(key, args);
        },
        getCommonMessage: function (key, args) {
            return commonBundle.getText(key, args);
        },
        getCurrentLanguage: function () {
            return sap.ui.getCore().getConfiguration().getLanguage();
        },
        getCurrentLanguageISO639_1: function () {
            var lang = sap.ui.getCore().getConfiguration().getLanguage();
            var match = /^(\w\w)/.exec(lang);
            if (match) {
                return match[1].toLowerCase();
            }
            return 'en';
       }
    };
});