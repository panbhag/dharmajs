App.ViewModels.EmailMastersNew = function() {
	var self = this;
	self.emailMaster = ko.mapping.fromJS({
		name : "",
		email : "",
		defaultSubject : "",
		defaultText : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);

	self.saveEmailMaster = function() {
		if ($('#createEmail').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/email_masters/",
				data : {
					emailMaster : self.emailMaster
				},
				success : function(data) {
					App.views.setLocation("#/email_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/email_masters");
	}
}