App.ViewModels.AudioMastersEdit = function(data){
	var self = this;
	self.audioMaster = ko.mapping.fromJS(data.audioMaster);
	// if(self.audioMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editAudioMaster = function(){
		if ($('#editAudio').parsley('validate')) {
		var audioMasterId = self.audioMaster._id();
			var itemData = ko.mapping.toJS(self.audioMaster);
			if(!self.audioMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				audioMaster : itemData
			}			
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/audio_masters/" + audioMasterId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/audio_masters");
				}
			})
			return false;
		}
	}
	self.cancel = function(){
			App.views.setLocation("#/audio_masters");
	}
}
	


