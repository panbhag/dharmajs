/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.CallMastersNew = function() {
	var self = this;
	self.callMaster = ko.mapping.fromJS({
		name : "",
		number : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);

	self.saveCallMaster = function() {
		if ($('#createCall').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/call_masters/",
				data : {
					callMaster : self.callMaster
				},
				success : function(data) {
					App.views.setLocation("#/call_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/call_masters");
	}
}