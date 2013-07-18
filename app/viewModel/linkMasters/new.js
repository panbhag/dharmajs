App.ViewModels.LinkMastersNew = function() {
	var self = this;
	self.linkMaster = ko.mapping.fromJS({
		name : "",
		url : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);

	self.saveLinkMaster = function() {
		if ($('#createLink').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/link_masters/",
				data : {
					linkMaster : self.linkMaster
				},
				success : function(data) {
					App.views.setLocation("#/link_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/link_masters");
	}
}