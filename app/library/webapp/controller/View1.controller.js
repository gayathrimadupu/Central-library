sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
   
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Controller, MessageToast, JSONModel) {
        "use strict";
    
        return BaseController.extend("library.controller.Login", {
            onInit: function () {
                const oLocalModel = new JSONModel({
                    username1: "",
                    password1: "",
                    confirmpassword1: "",
                });
                this.getView().setModel(oLocalModel, "localModel");
            },
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

            



            onCreateAccount: async function () {
                    var username = this.byId("_IDGenInput1").getValue();
                    var password = this.byId("_IDGenInput2").getValue();
                    var confirmPassword = this.byId("_IDGenInput3").getValue();
                
                    if (!username || !password || !confirmPassword) {
                        MessageToast.show("Please fill in all fields.");
                        return;
                    }
                
                    if (password !== confirmPassword) {
                        MessageToast.show("Passwords do not match. Please try again.");
                        return;
                    }
                
                    // Here you can add logic to create the account using a service or model
                
                    // For example, you can use the local model to store user data temporarily
                    const oLocalModel = this.getView().getModel("localModel");
                    oLocalModel.setProperty("/username1", username);
                    oLocalModel.setProperty("/password1", password);
                    oLocalModel.setProperty("/confirmpassword1", confirmPassword);
                
                    // Close the signup dialog after account creation
                    this.osignupDialog.close();
                
                    // Show a success message or navigate to another view
                    MessageToast.show("Account created successfully!");
                },


               onCloseDialog: function () {
                    if (this.osignupDialog) {
                        this.osignupDialog.close();
                    }
                },

                
                
            

        });
    });
























    // function (Controller) {
    //     "use strict";

    //     return Controller.extend("com.app.library.controller.View1", {
    //         onInit: function () {

    //         }
    //     });
    // });
