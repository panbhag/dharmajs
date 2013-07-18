App.ViewModels.VideoMastersNew = function() {
	var self = this;
	self.videoMaster = ko.mapping.fromJS({
		name : "",
		url : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	// self.showcaseFlag = ko.observable(false);

	self.saveVideoMaster = function() {
		if ($('#createVideo').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/video_masters/",
				data : {
					videoMaster : self.videoMaster
				},
				success : function(data) {
					App.views.setLocation("#/video_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/video_masters");
	}
}