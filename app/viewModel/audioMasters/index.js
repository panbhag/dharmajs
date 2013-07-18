/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.AudioMastersIndex = function(data){
	var self = this;	
	self.audioMasters = ko.mapping.fromJS(data.audioMasters);
	self.deleteAudioMasters = function(audioMaster){
		var audioMasterId = audioMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/audio_masters/" + audioMasterId,
				success : function(data) {
					 vm.audioMasters.remove(audioMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

