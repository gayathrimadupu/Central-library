sap.ui.define([
    "./BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, Token, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.app.library.controller.UserDashboard", {
        onInit: function () {
            const oLocalModel = new JSONModel({
                ISBN: "",
                title: "",
                author: "",
                quantity: "",
                genre: "",
                availability: "",
                barcode: "",
            });

            this.getView().setModel(oLocalModel, "localModel");
            // this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this);
            this.getRouter().attachRoutePatternMatched(this.onUserDetailsLoad, this);
        },
        
        onUserDetailsLoad: function (oEvent) {
            const { id } = oEvent.getParameter("arguments");
            this.ID = id;
            // const sRouterName = oEvent.getParameter("name");
            const oObjectPage = this.getView().byId("idObjectPageLayout");

            oObjectPage.bindElement(`/Users(${id})`);
        },
        // onBooksListLoad: function () {
        //     this.getView().byId("idBooksTable").getBinding("items").refresh();
        //     var oView = this.getView();

        //     // var oMultiInput1 = oView.byId("idISBNFilterValue");
        //     var oMultiInput2 = oView.byId("idtitleFilterValue");
        //     var oMultiInput3 = oView.byId("idauthorFilterValue");
        //     // var oMultiInput4 = oView.byId("idquantityFilterValue");
        //     var oMultiInput5 = oView.byId("idgenreFilterValue");
        //     // var oMultiInput6 = oView.byId("idavailabilityFilterValue");
        //     // var oMultiInput7 = oView.byId("idbarcodeFilterValue");

        //     let validate = function (args) {
        //         if (true) {
        //             var text = args.text;
        //             return new Token({ key: text, text: text });

        //         }
        //     }
        //     // oMultiInput1.addValidator(validate);
        //     oMultiInput2.addValidator(validate);
        //     oMultiInput3.addValidator(validate);
        //     // oMultiInput4.addValidator(validate);
        //     oMultiInput5.addValidator(validate);
        //     // oMultiInput6.addValidator(validate);
        //     // oMultiInput7.addValidator(validate);

        // },
        // onGoPress: function () {


        //     const oView = this.getView(),

        //         // sISBNFilter = oView.byId("idISBNFilterValue"),
        //         // oISBNFilter = sISBNFilter.getTokens(),

        //         stitleFilterLabel = oView.byId("idtitleFilterValue"),
        //         otitleFilterLabel = stitleFilterLabel.getTokens(),

        //         sauthorFilterLabel = oView.byId("idauthorFilterValue"),
        //         oauthorFilterLabel = sauthorFilterLabel.getTokens(),

        //         // squantityFilterLabel = oView.byId("idquantityFilterValue"),
        //         // oquantityFilterLabel = squantityFilterLabel.getTokens(),

        //         sgenreFilterLabel = oView.byId("idgenreFilterValue"),
        //         ogenreFilterLabel = sgenreFilterLabel.getTokens(),

        //         // savailabilityFilterLabel = oView.byId("idavailabilityFilterValue"),
        //         // oavailabilityFilterLabel = savailabilityFilterLabel.getTokens(),

        //         // sbarcodeFilterLabel = oView.byId("idbarcodeFilterValue"),
        //         // obarcodeFilterLabel = sbarcodeFilterLabel.getTokens(),

        //         oTable = oView.byId("idBooksTable"),
        //         aFilter = [];


        //     // sId.filter(() => {
        //     // iIDFilter ? aFilter.push(new Filter("ID", FilterOperator.EQ, iIDFilterValue)) : "";
        //     // oTable.getBinding("items").filter(aFilter);

        //     // oISBNFilter.filter((sISBNFilter) => {
        //     // sISBNFilter ? aFilter.push(new Filter("ISBN", FilterOperator.EQ, sISBNFilter.getKey())) : "";

        //     // });
        //     otitleFilterLabel.filter((stitleFilterLabel) => {
        //         stitleFilterLabel ? aFilter.push(new Filter("title", FilterOperator.EQ, stitleFilterLabel.getKey())) : "";

        //     });

        //     oauthorFilterLabel.filter((sauthorFilterLabel) => {
        //         sauthorFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, sauthorFilterLabel.getKey())) : "";

        //     });
        //     //              oquantityFilterLabel .filter((squantityFilterLabel) => {
        //     //          squantityFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, squantityFilterLabel.getKey())) : "";

        //     //    });
        //     ogenreFilterLabel.filter((sgenreFilterLabel) => {
        //         sgenreFilterLabel ? aFilter.push(new Filter("genre", FilterOperator.EQ, sgenreFilterLabel.getKey())) : "";

        //     });
        //     //       oavailabilityFilterLabel .filter((savailabilityFilterLabel) => {
        //     //         savailabilityFilterLabel ? aFilter.push(new Filter("availability", FilterOperator.EQ, savailabilityFilterLabel.getKey())) : "";

        //     //   });
        //     //   obarcodeFilterLabel .filter((sbarcodeFilterLabel) => {
        //     //     sbarcodeFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, sbarcodeFilterLabel.getKey())) : "";

        //     // });
        //     oTable.getBinding("items").filter(aFilter)

        // },
        // onClearFilterPress: function () {
        //     const oView = this.getView(),
        //         stitleFilterLabel = oView.byId("idtitleFilterValue").destroyTokens(),
        //         sauthorFilterLabel = oView.byId("idauthorFilterValue").destroyTokens(),
        //         sgenreFilterLabel = oView.byId("idgenreFilterValue").destroyTokens()

        // },
        onCloseDialogPress: function () {
            if (this.oAllBooksDialog) {
                this.oAllBooksDialog.close();
            }
        },

        onAllbooksPress: async function () {
            if (!this.oAllBooksDialog) {
                this.oAllBooksDialog = await this.loadFragment("AllBooksDialog")
            }
            this.oAllBooksDialog.open();
        },
        
       
        onuserReserve: async function () {
            debugger
            const oView = this.getView()
            var oSelected = this.byId("idBooksTable").getSelectedItem(),
            oAvailQuan = oSelected.getBindingContext().getObject().quantity
            if (oSelected) {
                // var oStock = oSelected.getBindingContext().getObject().quantity
                var oAvailQuan = oSelected.getBindingContext().getObject().quantity;
                 var oBookName = oSelected.getBindingContext().getObject().title;
                 var oUser = oView.byId("idTextUserName").getText();
                var  oUserId = oView.byId("idemaill").getText();
                
                if(oAvailQuan == 0){
                    
                    const oBinding = oView.getModel().bindList("/Reservations")
                    oBinding.create({
                        ReserverdUserName:oUser,
                        ReserverdUserId:oUserId,
                        ReserverdBook:oBookName

                    })

                    MessageToast.show("Reservation Sent to Admin")
                }
                else{
                    MessageToast.show("Book is available you don't need to reserve")
                }
            }
        },
        onLogoutPress: function () {
            debugger
            const oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteloginView")

        },
       
            // var selectedBook = this.getView().byId("idBooksTable").getSelectedItem();
            // if (!selectedBook) {
            //     MessageToast.show("Please select a book to reserve.");
            // }else{
            // var title = selectedBook.getBindingContext().getObject().title;
            // var bookStatus = selectedBook.getBindingContext().getObject().status;

            // if (bookStatus === "Reserved") {

            //     MessageToast.show("The book '" + title + "' is already Reserved.");
            // } else {
            //     // Perform reservation logic here
            //     // For example, you can update the book status to 'Reserved' in the backend
            //     // Send a notification to the user about the reservation
            //     MessageToast.show("You have successfully reserved the book '" + title + "'.");
            // }
            // }
        
        // onReserveBookPress: function () {
        //     debugger
        //     var oTable = this.getView().byId("idBooksTable");
        //     var selectedBook = oTable.getSelectedItem();

        //     if (!selectedBook) {
        //         MessageBox.error("Please select a book to reserve.");
        //         return;
        //     }

        //     var oBindingContext = selectedBook.getBindingContext();
        //     if (!oBindingContext) {
        //         MessageBox.error("Binding context not found.");
        //         return;
        //     }

        //     var oBook = oBindingContext.getObject();
        //     if (!oBook) {
        //         MessageBox.error("Book details not found.");
        //         return;
        //     }

        //     var title = oBook.title;
        //     var bookStatus = oBook.status;

        //     if (bookStatus === "Reserved") {
        //         MessageBox.information("The book '" + title + "' is already Reserved.");
        //     } else {
        //         // Perform reservation logic here
        //         // For example, you can update the book status to 'Reserved' in the backend
        //         // Send a notification to the user about the reservation
        //         MessageBox.success("You have successfully reserved the book '" + title + "'.");

        //         // Assuming you have a method to update the book status in the model
        //         // For example:
        //         // oBook.status = "Reserved";
        //         // oBindingContext.getModel().update(oBindingContext.getPath(), oBook);
        //     }
        // },

        // onSelectBooks: function (oEvent) {

        //     const { ISBN, title, author, quantity, genre, availability, barcode } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
        //     const oRouter = this.getRouter();
        //     oRouter.navTo("RouteAdminDashboard", {
        //         // ISBNID: ISBN,
        //         title1: title,
        //         authorname: author,
        //         // quantity1: quantity,
        //         genrename: genre,
        //         availability1: availability,
        //         // barcode1: barcode,


        //     })
        // },

    });
});