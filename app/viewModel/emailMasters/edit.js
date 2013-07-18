App.ViewModels.EmailMastersEdit = function(data) {
	var self = this;
	self.emailMaster = ko.mapping.fromJS(data.emailMaster);
	// if(self.emailMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
// 	
	self.editEmailMaster = function() {
		if ($('#editEmail').parsley('validate')) {
			var emailMasterId = self.emailMaster._id();
			var itemData = ko.mapping.toJS(self.emailMaster);
			if(!self.emailMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				emailMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/email_masters/" + emailMasterId,
				data : data,
				success : function(data) {
					App.views.setLocation("#/email_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/email_masters");
	}
}

