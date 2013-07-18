App.ViewModels.AudioMastersNew = function() {
	var self = this;
	self.audioMaster = ko.mapping.fromJS({
		name : "",
		url : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag :false
	});
	self.saveAudioMaster = function() {
		if ($('#createAudio').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/audio_masters/",
				data : {
					audioMaster : self.audioMaster
				},
				success : function(data) {
					App.views.setLocation("#/audio_masters");
				}
			})
		}
	}
	self.cancel = function() {
		App.views.setLocation("#/audio_masters");
	}
}