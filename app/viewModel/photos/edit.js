App.ViewModels.PhotoEdit = function(data){
	var self = this;
	self.photo = ko.mapping.fromJS(data.photo);
	console.log(data.photo)
	
	self.editPhoto = function(){
		if ($('#createForm').parsley('validate')) {
		var photoId = self.photo._id();
			
			data = {
				photo : ko.mapping.toJS(self.photo)
				// selectedEmailMasters:ko.toJS(self.selectedEmailMasters),
				// selectedLinkMasters:ko.toJS(self.selectedLinkMasters),
				// selectedCallMasters:ko.toJS(self.selectedCallMasters),
				// selectedSmsMasters:ko.toJS(self.selectedSmsMasters),
				// selectedAudioMasters:ko.toJS(self.selectedAudioMasters),
				// selectedVideoMasters:ko.toJS(self.selectedVideoMasters),
				// selectedBuyMasters:ko.toJS(self.selectedBuyMasters),
				// selectedShareMasters:ko.toJS(self.selectedShareMasters),				
			}
		//	console.log("!!",data)
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/photos/" + photoId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/photos");
				}
			})
			return false;
		}
				
	}
	self.cancel = function(){
			App.views.setLocation("#/photos");
	}
}
	


