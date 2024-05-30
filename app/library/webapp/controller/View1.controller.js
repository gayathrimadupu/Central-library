sap.ui.define([
  "./BaseController",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",




],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, Controller, Filter, ODataModel, FilterOperator, MessageToast, JSONModel,MessageBox) {
    "use strict";

    return BaseController.extend("library.controller.Login", {
      onInit: function () {
        // var oModel = new ODataModel("/v2/BookSRV");
        // this.getView().setModel(oModel);
        // const oLocalModel = new JSONModel({
        //   username1: "",
        //   password1: "",
        //   confirmpassword1: "",
        // });
        // this.getView().setModel(oLocalModel, "localModel");
      },
      // onLogin: function () {
      //     var username = this.byId("usernameInput").getValue();
      //     var password = this.byId("passwordInput").getValue();


      //     if (username === "admin" && password === "password") {
      //         MessageToast.show("Login successful!");
      //         debugger;
      //         // Navigate to the Admin Dashboard
      //        const oRouter = sap.ui.core.UIComponent.getRouterFor(this)
      //         oRouter.navTo("RouteAdminDashboard");
      //     } else if (username === "user" && password === "password") {
      //         MessageToast.show("Login successful!");

      //         // Navigate to the User Dashboard
      //         const oRouter = sap.ui.core.UIComponent.getRouterFor(this)
      //         oRouter.navTo("RouteUserDashboard");
      //     } else {
      //         MessageToast.show("Invalid credentials. Please try again.");
      //     }
      //     debugger
      // },
      // onLogin: function (eve) {
      //     debugger;
      //     var oView = this.getView();
      //     var sUsername = oView.byId("usernameInput").getValue();
      //     var sPassword = oView.byId("passwordInput").getValue();
      //     var oModel = this.getView().getModel();
      //      var aUsers = oModel.getProperty("/Users");

      //     var aFilters = [
      //       new Filter("username", FilterOperator.EQ, sUsername),
      //       new Filter("password", FilterOperator.EQ, sPassword),
      //     ];

      //     oModel.read("/Users", {
      //       filters: aFilters,
      //       success: function (oData) {
      //         if (oData.results.length > 0) {
      //           if (oData.results[0].usertype === "user") {
      //             var userid = oData.results[0].ID;
      //             MessageToast.show("Login successful!");
      //             this.getOwnerComponent()
      //               .getRouter()
      //               .navTo("RouteUserDashboard", { id: userid });
      //           }
      //           if (oData.results[0].usertype === "admin") {
      //             var userid = oData.results[0].ID;
      //             MessageToast.show("Login successful!");
      //             this.getOwnerComponent()
      //               .getRouter()
      //               .navTo("RouteAdminDashboard");
      //           }

      //           // Redirect to the next page or perform other login success actions
      //         } else {
      //           MessageToast.show("Invalid username or password.");
      //         }
      //       }.bind(this),
      //       error: function (oError) {
      //         MessageToast.show("Error during login process.");
      //       },
      //     });
      //   },

      onLogin: function () {
        debugger
        var oView = this.getView();
        var sUsername = oView.byId("usernameInput").getValue();  //get input value data in oUser variable
        var sPassword = oView.byId("passwordInput").getValue();    //get input value data in oPwd variable

        if (!sUsername || !sPassword) {
          MessageToast.show("please enter username and password.");
          return
        }

        var oModel = this.getView().getModel("ModelV2");
        oModel.read("/Users", {
          filters: [
            new Filter("username", FilterOperator.EQ, sUsername),
            new Filter("password", FilterOperator.EQ, sPassword)

          ],
          success: function (oData) {
            if (oData.results.length > 0) {
              var userId = oData.results[0].ID;
              var oUserType = oData.results[0].usertype;
              if (oUserType === "admin") {
                MessageToast.show("Login Successful");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteAdminDashboard", { id: userId })
              }else{
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteUserDashboard", { id: userId })
              }

            } else {
              MessageToast.show("Invalid username or password.")
            }
          }.bind(this),
          error: function () {
            MessageToast.show("An error occured during login.");
          }
        })
      },

      //   onLogin: function () {
      //     debugger;
      //     var oView = this.getView();
      //     var sUserName = oView.byId("usernameInput").getValue();
      //     var sPassword = oView.byId("passwordInput").getValue();

      //     if (sUserName === "admin" && sPassword === "Initial") {
      //         // Route to the next page
      //         var oRouter = this.getOwnerComponent().getRouter();
      //      oRouter.navTo("RouteDetails");  // Assuming 'nextPage' is the route name in your manifest.json
      //     }
      //     else if(sUserName === "user1" && sPassword === "password123"){
      //         var oRouter = this.getOwnerComponent().getRouter();
      //      oRouter.navTo("RouteUserDashboard", { id: userid });  
      //     }
      //     else {
      //         // Show an error message
      //         MessageToast.show("Invalid username or password");
      //     }
      // },



      // onSignup: async function () {
      //   debugger
      //   if (!this.osignupDialog) {

      //     this.osignupDialog = await this.loadFragment("signupDialog")
      //     // this.osignupDialog = await Fragment.load({
      //     //     id: this.getView().getId(),
      //     //     name: "com.app.library.fragments.signupDialog",
      //     //     controller: this
      //     // });
      //     // this.getView().addDependent(this.osignupDialog);
      //   }

      //   this.osignupDialog.open();
      // },
      onSignup: async function () {
        debugger
        const oPayload = this.getView().getModel("localModel").getProperty("/"),
            oModel = this.getView().getModel("ModelV2");
        try {
            await this.createData(oModel, oPayload, "/Users");
            // this.getView().byId("idBooksTable").getBinding("items").refresh();
            this.osignupDialog.close();
        } catch (error) {
            this.osignupDialog.close();
            sap.m.MessageBox.error("Some technical Issue");
        }
    },
    onSignup: async function(){
      
      if (!this.osignupDialog) {
        this.osignupDialog = await this.loadFragment("signupDialog");
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
        oLocalModel.setProperty("username1", username);
        oLocalModel.setProperty("password1", password);
        // oLocalModel.setProperty("", confirmPassword);

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
