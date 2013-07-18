/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.VideoMastersIndex = function(data){
	var self = this;	
	self.videoMasters = ko.mapping.fromJS(data.videoMasters);
	self.deleteVideoMasters = function(videoMaster){
		var videoMasterId = videoMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/video_masters/" + videoMasterId,
				success : function(data) {
					 vm.videoMasters.remove(videoMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

