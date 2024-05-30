sap.ui.define([
    
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], 
function (Controller, Filter, FilterOperator, Token, JSONModel, MessageBox,MessageToast) {
    "use strict";


    return Controller.extend("com.app.library.controller.AdminDashboard", {
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
            const newLoanModel = new JSONModel({
                bookId: {
                    title:""
                },
                userId: {
                    username:""
                },

                issueDate: "",
                dueDate: ""
            });

            this.getView().setModel(newLoanModel, "newLoanModel");

            this.getView().setModel(oLocalModel, "localModel");
            this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this);
        },
        onBooksListLoad: function () {
            this.getView().byId("idBooksTable").getBinding("items").refresh();
            var oView = this.getView();

            // var oMultiInput1 = oView.byId("idISBNFilterValue");
            var oMultiInput2 = oView.byId("idtitleFilterValue");
            var oMultiInput3 = oView.byId("idauthorFilterValue");
            // var oMultiInput4 = oView.byId("idquantityFilterValue");
            var oMultiInput5 = oView.byId("idgenreFilterValue");
            // var oMultiInput6 = oView.byId("idavailabilityFilterValue");
            // var oMultiInput7 = oView.byId("idbarcodeFilterValue");

            let validate = function (args) {
                if (true) {
                    var text = args.text;
                    return new Token({ key: text, text: text });

                }
            }
            // oMultiInput1.addValidator(validate);
            oMultiInput2.addValidator(validate);
            oMultiInput3.addValidator(validate);
            // oMultiInput4.addValidator(validate);
            oMultiInput5.addValidator(validate);
            // oMultiInput6.addValidator(validate);
            // oMultiInput7.addValidator(validate);

        },
        onGoPress: function () {
                

            const oView = this.getView(),
            
                // sISBNFilter = oView.byId("idISBNFilterValue"),
                // oISBNFilter = sISBNFilter.getTokens(),

                stitleFilterLabel = oView.byId("idtitleFilterValue"),
                otitleFilterLabel = stitleFilterLabel.getTokens(),

                sauthorFilterLabel = oView.byId("idauthorFilterValue"),
                oauthorFilterLabel = sauthorFilterLabel.getTokens(),

                // squantityFilterLabel = oView.byId("idquantityFilterValue"),
                // oquantityFilterLabel = squantityFilterLabel.getTokens(),

                sgenreFilterLabel = oView.byId("idgenreFilterValue"),
                ogenreFilterLabel = sgenreFilterLabel.getTokens(),

                // savailabilityFilterLabel = oView.byId("idavailabilityFilterValue"),
                // oavailabilityFilterLabel = savailabilityFilterLabel.getTokens(),

                // sbarcodeFilterLabel = oView.byId("idbarcodeFilterValue"),
                // obarcodeFilterLabel = sbarcodeFilterLabel.getTokens(),

               oTable = oView.byId("idBooksTable"),
                aFilter = [];
                

            // sId.filter(() => {
                // iIDFilter ? aFilter.push(new Filter("ID", FilterOperator.EQ, iIDFilterValue)) : "";
                // oTable.getBinding("items").filter(aFilter);

                // oISBNFilter.filter((sISBNFilter) => {
                // sISBNFilter ? aFilter.push(new Filter("ISBN", FilterOperator.EQ, sISBNFilter.getKey())) : "";
               
                // });
                otitleFilterLabel.filter((stitleFilterLabel) => {
                stitleFilterLabel ? aFilter.push(new Filter("title", FilterOperator.EQ, stitleFilterLabel.getKey() )) : "";
              
                 });

                 oauthorFilterLabel .filter((sauthorFilterLabel) => {
                    sauthorFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, sauthorFilterLabel.getKey())) : "";
                
                     });
        //              oquantityFilterLabel .filter((squantityFilterLabel) => {
        //          squantityFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, squantityFilterLabel.getKey())) : "";
                
        //    });
           ogenreFilterLabel .filter((sgenreFilterLabel) => {
            sgenreFilterLabel ? aFilter.push(new Filter("genre", FilterOperator.EQ, sgenreFilterLabel.getKey())) : "";
           
      });
//       oavailabilityFilterLabel .filter((savailabilityFilterLabel) => {
//         savailabilityFilterLabel ? aFilter.push(new Filter("availability", FilterOperator.EQ, savailabilityFilterLabel.getKey())) : "";
       
//   });
//   obarcodeFilterLabel .filter((sbarcodeFilterLabel) => {
//     sbarcodeFilterLabel ? aFilter.push(new Filter("author", FilterOperator.EQ, sbarcodeFilterLabel.getKey())) : "";
   
// });
           oTable.getBinding("items").filter(aFilter)

        },
        onClearFilterPress: function () {
            const oView = this.getView(),
            stitleFilterLabel = oView.byId("idtitleFilterValue").destroyTokens(),
            sauthorFilterLabel = oView.byId("idauthorFilterValue").destroyTokens(),
            sgenreFilterLabel  = oView.byId("idgenreFilterValue").destroyTokens()
        
         },

        onSelectBooks: function(oEvent) {

            const { ISBN, title, author, quantity, genre, availability, barcode } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            const oRouter = this.getRouter();
            oRouter.navTo("RouteAdminDashboard", {
                // ISBNID: ISBN,
                title1: title,
                authorname: author,
                // quantity1: quantity,
                genrename: genre,
                availability1: availability,
                // barcode1: barcode,


            })
        },
        onIssueBook:async function() {
            debugger
            var oView1 = this.getView();
            var sUserID = oView1.byId("idUserIDInput").getValue();
            var sUsername = oView1.byId("idUserNameInput").getValue();
            var sISBN = oView1.byId("idISBNIDInput").getValue();
            var sDueDate = oView1.byId("idDueDateInput").getValue();
             var oData1 = oView1.getModel("ActiveloanModel").getProperty("/");
             oData1.user.ID = sUserID;
             oData1.user.username = sUsername;
             oData1.user.books.ISBN = sISBN;
             oData1.dueDate = sDueDate;
 
            var oModel1 = this.getView().getModel("ModelV2");
                try{
                    await this.createIssue(oModel1, oData1, "/Activeloans");
                    this.getView().byId("idLoanTable").getBinding("items").refresh();
                    this.oCreateBookDialog.close();
                }
                catch(error) {
                    this.oCreateBookDialog.close();
                   MessageToast.show("Some technical Issue");
                }
       
        },
    onCloseIssueDialog: function() {
        this.getView().byId("idIssueBookDialog").close();
    },
   

        setHeaderContext: function() {
            var oView = this.getView();
            oView.byId("Bookstitle").setBindingContext(
                oView.byId("_IDGenTable1").getBinding("items").getHeaderContext());
        },


        onCreateBtnPress: async function () {
            if (!this.oCreateBooksDialog) {
                this.oCreateBooksDialog = await this.loadFragment("CreateBooksDialog")

            }
            this.oCreateBooksDialog.open();
        },
        DeleteBook : async function(){
 
            var oSelected = this.byId("idBooksTable").getSelectedItem();
            if (oSelected) {
                var oID = oSelected.getBindingContext().getObject().ID;
 
                oSelected.getBindingContext().delete("$auto").then(function () {
                    MessageToast.show(oID + " SuccessFully Deleted");
                },
                    function (oError) {
                        MessageToast.show("Deletion Error: ", oError);
                    });
                this.getView().byId("idBooksTable").getBinding("items").refresh();
 
            } else {
                MessageToast.show("Please Select a Row to Delete");
            }
        },

        onCreateActiveloans: async function () {
            debugger
            if (!this.oActiveLoansDialog) {
                this.oActiveLoansDialog = await this.loadFragment("ActiveLoansDialog")
            }
            this.oActiveLoansDialog.open();
        },
        
        onCloseActiveLoans: function () {
            // debugger;
            // this.byId("idActiveLoansTable").close();
            if (this.oActiveLoansDialog.isOpen()) {
                this.oActiveLoansDialog.close();
            }

        },
        
        onAddNewLoanPress: async function () {
            debugger
            if (!this.oNewLoanDailog) {
                this.oNewLoanDailog = await this.loadFragment("createloanDialog")
                this.oActiveLoansDialog = await this.loadFragment("ActiveLoansDialog")
            }
            this.oNewLoanDailog.open()
        },
        onNewLoanDailogClose: function () {
            if (this.oNewLoanDailog.isOpen()) {
                this.oNewLoanDailog.close();
            }
        },
        onSaveNewLoan: function () {
            debugger
            var oContext = this.getView().byId("idLoanTable").getBinding("items")
            var oNewLoan = this.getView().getModel("newLoanModel").getData();
            oContext.create(oNewLoan, {
                success: function () {
                    MessageToast.show("Book created successfully");
                },
                error: function () {
                    MessageToast.show("Error creating book");
                }
            });
            this.oNewLoanDailog.close()

        },
        OnCloseLOanPress:function(){
                debugger
                const oAdminView = this.getView(),
                    oSelected = oAdminView.byId("idLoanTable").getSelectedItem()
                if (oSelected) {
                    // var oUser = oSelected.getBindingContext().getObject().user.userName;
                    oSelected.getBindingContext().delete("$auto").then(function () {
                        MessageToast.show(" SuccessFully Deleted");
                    },
                        function (oError) {
                            MessageToast.show("Deletion Error: ", oError);
                        });
                    this.getView().byId("idLoanTable").getBinding("items").refresh();

                } else {
                    MessageToast.show("Please Select a user to close the loan");
                }
        },



        onCloseDialog: function () {
            if (this.oCreateBooksDialog.isOpen()) {
                this.oCreateBooksDialog.close()
            }

        },
        onCreateBooks: async function () {
            debugger
            const oPayload = this.getView().getModel("localModel").getProperty("/"),
                oModel = this.getView().getModel("ModelV2");

            try {
                await this.createData(oModel, oPayload, "/Books");
                this.getView().byId("idBooksTable").getBinding("items").refresh();
                this.oCreateBooksDialog.close();
            } catch (error) {
                this.oCreateBooksDialog.close();
                MessageBox.error("Some technical Issue");
            }

        },
        onCreateBtnPress: async function () {
            if (!this.oCreateBooksDialog) {

                this.oCreateBooksDialog = await this.loadFragment("CreateBooksDialog")
                // this.oCreateBooksDialog = await Fragment.load({
                //     id: this.getView().getId(),
                //     name: "com.app.library.fragments.CreateBooksDialog",
                //     controller: this
                // });
                // this.getView().addDependent(this.oCreateBooksDialog);
            }

            this.oCreateBooksDialog.open();
        },
        
        
    });
});

        

        

        
        
    