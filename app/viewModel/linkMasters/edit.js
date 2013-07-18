App.ViewModels.LinkMastersEdit = function(data) {
	var self = this;
	self.linkMaster = ko.mapping.fromJS(data.linkMaster);
	// if(self.linkMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editLinkMaster = function() {
		if ($('#editLink').parsley('validate')) {
			var linkMasterId = self.linkMaster._id();
			var itemData = ko.mapping.toJS(self.linkMaster);
			if(!self.linkMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				linkMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/link_masters/" + linkMasterId,
				data : data,
				success : function(data) {
					App.views.setLocation("#/link_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/link_masters");
	}
}

