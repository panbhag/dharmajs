App.ViewModels.SmsMastersEdit = function(data) {
	var self = this;
	self.smsMaster = ko.mapping.fromJS(data.smsMaster);
	// if(self.smsMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editSmsMaster = function() {
		if ($('#editSms').parsley('validate')) {
			var smsMasterId = self.smsMaster._id();
			var itemData = ko.mapping.toJS(self.smsMaster);
			if(!self.smsMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				smsMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/sms_masters/" + smsMasterId,
				data : data,
				success : function(data) {
					App.views.setLocation("#/sms_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/sms_masters");
	}
}

