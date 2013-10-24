App.ViewModels.PhotoIndex = function(data){
	var self = this;	
	self.photos = ko.mapping.fromJS(data.photos);
	
	
  	//define actions in the view as functions here
	self.delete = function(photo){
		var photoId = photo._id();
			if (confirm("Are you sure you delete?")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/photos/" + photoId,
				success : function(data) {
					 vm.photos.remove(photo);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}