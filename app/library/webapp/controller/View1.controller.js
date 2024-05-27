sap.ui.define([
   
    "sap/ui/core/mvc/Controller",
   
    "sap/m/MessageToast"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";
    
        return Controller.extend("library.controller.Login", {
            // onInit: function () {
            //     const oLocalModel = new JSONModel({
                   
            //         username1: "",
            //         password1: "",
            //         confirmpassword1: "",
            //     });
            //     this.getView().setModel(oLocalModel, "localModel");
            //     // this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this);
            // },
            onLogin: function () {
                var username = this.byId("usernameInput").getValue();
                var password = this.byId("passwordInput").getValue();
    
                // Replace with your actual login logic
                if (username === "admin" && password === "password") {
                    MessageToast.show("Login successful!");
                    debugger;
                    // Navigate to the Admin Dashboard
                   const oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                    oRouter.navTo("RouteAdminDashboard");
                } else if (username === "user" && password === "password") {
                    MessageToast.show("Login successful!");
    
                    // Navigate to the User Dashboard
                    const oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                    oRouter.navTo("RouteUserDashboard");
                } else {
                    MessageToast.show("Invalid credentials. Please try again.");
                }
                debugger
            },
            
            onSignup: async function () {
                debugger
                if (!this.osignupDialog) {
    
                     this.osignupDialog =  await this.loadFragment("signupDialog")
                    // this.osignupDialog = await Fragment.load({
                    //     id: this.getView().getId(),
                    //     name: "com.app.library.fragments.signupDialog",
                    //     controller: this
                    // });
                    // this.getView().addDependent(this.osignupDialog);
                }
    
                this.osignupDialog.open();
            },

            onSignup:async function () {
                if (!this.odialogbox) {
                  this.odialogbox = await this.loadFragment("dialogbox");
                }
                this.odialogbox.open();
              },



            onCreateAccount: async function () {
               
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
            }

        });
    });
























    // function (Controller) {
    //     "use strict";

    //     return Controller.extend("com.app.library.controller.View1", {
    //         onInit: function () {

    //         }
    //     });
    // });
