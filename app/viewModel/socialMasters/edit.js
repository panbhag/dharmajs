App.ViewModels.SocialMastersEdit = function(data) {
	var self = this;
	self.socialMaster = ko.mapping.fromJS(data.socialMaster);
	// if(self.socialMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editSocialMaster = function() {
		if ($('#editSocial').parsley('validate')) {
			var socialMasterId = self.socialMaster._id();
			var itemData = ko.mapping.toJS(self.socialMaster);
			data = {
				socialMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/social_masters/" + socialMasterId,
				data : data,
				success : function(data) {
					App.views.setLocation("#/social_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/social_masters");
	}
}

