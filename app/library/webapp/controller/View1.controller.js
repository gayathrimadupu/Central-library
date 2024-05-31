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
         var oModel = new ODataModel("/v2/BookSRV");
        this.getView().setModel(oModel);
        // const oLocalModel = new JSONModel({
        //   username1: "",
        //   password1: "",
        //   confirmpassword1: "",
        // });
        // this.getView().setModel(oLocalModel, "localModel");
        const oNewUserModel = new JSONModel({
          username: "",
          //phonenumber:"",
          password: "",
          confirmPassword: "",
          usertype: "member",
         
        });
        this.getView().setModel(oNewUserModel, "oNewUserModel");
      },
      onSignup: async function () {
        if (!this.osignupDialog) {
            this.osignupDialog = await this.loadFragment("signupDialog")
        }
        this.osignupDialog.open()
    },

    //for Creating New User...
    onCreateAccount: async function () {
        debugger
        var oView = this.getView();
        var sPassword = oView.byId("_IDGenInput2").getValue();
        var sConfirmPassword = oView.byId("_IDGenInput3").getValue();
        console.log("Password: ", sPassword);
        console.log("Confirm Password: ", sConfirmPassword);

        if (!sPassword || !sConfirmPassword) {
          MessageToast.show("Please fill in all fields.");
          return;
        }

        if (sPassword !== sConfirmPassword) {
          MessageToast.show("Passwords do not match. Please try again.");
          return;
        }
        const oPayload = Object.assign({}, this.getView().getModel("oNewUserModel").getProperty("/"));
        delete oPayload.confirmPassword; // Remove confirmPassword before sending the payload

        //After Creating model need to call that model and in the ui page assign that model to valueInput...
        // const oPayload = this.getView().getModel("oNewUserModel").getProperty("/"),
        //     oModel = this.getView().getModel("ModelV2");
        const oModel = this.getView().getModel();

        console.log("Payload: ", oPayload);

        try {
            await this.createData(oModel, oPayload, "/Users");
            this.osignupDialog.close();
            MessageToast.show("created successfully.")
        } catch (error) {
            this.osignupDialog.close();
            sap.m.MessageBox.error("Some technical Issue...");
        }
    },
      

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
    //   onSignup: async function () {
    //     debugger
    //     const oPayload = this.getView().getModel("localModel").getProperty("/"),
    //         oModel = this.getView().getModel("ModelV2");
    //     try {
    //         await this.createData(oModel, oPayload, "/Users");
    //         // this.getView().byId("idBooksTable").getBinding("items").refresh();
    //         this.osignupDialog.close();
    //     } catch (error) {
    //         this.osignupDialog.close();
    //         sap.m.MessageBox.error("Some technical Issue");
    //     }
    // },
    // onSignup: async function(){
      
    //   if (!this.osignupDialog) {
    //     this.osignupDialog = await this.loadFragment("signupDialog");
    //   }
    //   this.osignupDialog.open();
    // },






      // onCreateAccount: async function () {
      //   var username = this.byId("_IDGenInput1").getValue();
      //   var password = this.byId("_IDGenInput2").getValue();
      //   // var confirmPassword = this.byId("_IDGenInput3").getValue();

      //   if (!username || !password || !confirmPassword) {
      //     MessageToast.show("Please fill in all fields.");
      //     return;
      //   }

      //   if (password !== confirmPassword) {
      //     MessageToast.show("Passwords do not match. Please try again.");
      //     return;
      //   }

      //   // Here you can add logic to create the account using a service or model

      //   // For example, you can use the local model to store user data temporarily
      //   const oLocalModel = this.getView().getModel("localModel");
      //   oLocalModel.setProperty("username1", username);
      //   oLocalModel.setProperty("password1", password);
      //   // oLocalModel.setProperty("", confirmPassword);

      //   // Close the signup dialog after account creation
      //   this.osignupDialog.close();

      //   // Show a success message or navigate to another view
      //   MessageToast.show("Account created successfully!");
      // },


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
