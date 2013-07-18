App.ViewModels.BuyMastersNew = function() {
	var self = this;
	self.buyMaster = ko.mapping.fromJS({
		name : "",
		url : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);
	self.saveBuyMaster = function() {
		if ($('#createBuy').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/buy_masters/",
				data : {
					buyMaster : self.buyMaster
				},
				success : function(data) {
					App.views.setLocation("#/buy_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/buy_masters");
	}
}