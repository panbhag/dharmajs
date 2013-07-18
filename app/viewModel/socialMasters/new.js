App.ViewModels.SocialMastersNew = function() {
	var self = this;
	self.socialMaster = ko.mapping.fromJS({
		name : "",
		type : "",
		url : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);

	self.saveSocialMaster = function() {
		if ($('#createSocial').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/social_masters/",
				data : {
					socialMaster : self.socialMaster
				},
				success : function(data) {
					App.views.setLocation("#/social_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/social_masters");
	}
}