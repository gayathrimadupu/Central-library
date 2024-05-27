sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("com.app.library.controller.UserDashboard", {
        onInit: function () {
            

            //     const oLocalModel = new JSONModel({
            //         ISBN: "",
            //         title: "", 
            //         author: "",
            //         quantity: "",
            //         genre: "",
            //         availability: "",
            //         barcode: "",
            //     });
            //     this.getView().setModel(oLocalModel, "localModel");
            //     this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this);
            // },
            // onBooksListLoad: function () {
            //     this.getView().byId("idBooksTable").getBinding("items").refresh();
            //     var oView = this.getView();
        }
    });
});