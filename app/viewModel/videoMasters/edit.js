App.ViewModels.VideoMastersEdit = function(data) {
	var self = this;
	self.videoMaster = ko.mapping.fromJS(data.videoMaster);
	// if(self.videoMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editVideoMaster = function() {
		if ($('#editVideo').parsley('validate')) {
			var videoMasterId = self.videoMaster._id();
			var itemData = ko.mapping.toJS(self.videoMaster);
			if(!self.videoMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				videoMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/video_masters/" + videoMasterId,
				data : data,
				success : function(data) {
					App.views.setLocation("#/video_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/video_masters");
	}
}

