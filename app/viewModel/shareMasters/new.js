App.ViewModels.ShareMastersNew = function() {
	var self = this;
	self.shareMaster = ko.mapping.fromJS({
		name : "",
		description : ""
	});

	self.saveShareMaster = function() {
		$.ajax({
			type : "post",
			dataType : 'json',
			url : "/share_masters/",
			data : {shareMaster: self.shareMaster},
			success : function(data) {
				App.views.setLocation("#/share_masters");
			}
		})
	}
	self.cancel = function(){
			App.views.setLocation("#/share_masters");
	}
}