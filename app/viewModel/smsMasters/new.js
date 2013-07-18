App.ViewModels.SmsMastersNew = function() {
	var self = this;
	self.smsMaster = ko.mapping.fromJS({
		name : "",
		number : "",
		defaultText : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	self.defaultTextCount = ko.dependentObservable(function() {
		return self.smsMaster.defaultText.length;

	});
	// self.showcaseFlag = ko.observable(false);

	self.saveSmsMaster = function() {
		if ($('#createSms').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/sms_masters/",
				data : {
					smsMaster : self.smsMaster
				},
				success : function(data) {
					App.views.setLocation("#/sms_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/sms_masters");
	}
}