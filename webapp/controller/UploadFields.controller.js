sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageToast'
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.lbrands.managefieldsManageFields.controller.UploadFields", {
		onInit: function() {

			var uiModel = new sap.ui.model.json.JSONModel();

			this.getView().setModel(uiModel, "ui");

		},

		onSave: function() {
			var oModel = this.getOwnerComponent().getModel(),
				uiModel = this.getView().getModel('ui');

			var inputData = uiModel.getData();
			
			var oPayload = {
				"FieldID": 1,
				"Name": inputData.Name,
				"DisplayName": inputData.Name,
				"FieldLength": 30,
				"ControlType": inputData.ControlType,
				"FieldKey": inputData.FieldKey

			};
			
			oModel.create('/Fields', oPayload, {
				success: function(){
					uiModel.setData({});
					MessageToast.show('Field Creation Successful');
				}	
			});

		},

		handleUploadStart: function(oEvent) {},
		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				var sMsg = "";
				var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
				}

				MessageToast.show(sMsg);
			}
		},

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.getView().byId("fileUploader");
			oFileUploader.upload();
		}

	});
});