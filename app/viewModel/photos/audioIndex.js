/**
 * @author Vijay R. Chintamani  showcaseFlag
*/
App.ViewModels.PhotoAudioIndex = function(data) {
	//console.log(data);
	var self = this;
	self.editMode = ko.observable(data.editMode || false);
	var masterId = '';
	var photoId = data.photoId;
	self.parent = data.parent;
	// self.showcaseFlag = ko.observable(false);
	self.formData = ko.mapping.fromJS({
		name : "",
		url : "",
		icon_url : "",
		title : "",
		subtitle : "",
		showcaseFlag : false
	});
	if (self.editMode()) {
		console.log(data.item);
		masterId = data.item._id;
		self.formData = ko.mapping.fromJS(data.item);
	}
	self.addToMasters = ko.observable(false);
	self.clear = function() {
		$("form").trigger('reset');
		$('#photo').attr('src', '');
	}
	self.update = function(data) {
		if ($('#createForm').parsley('validate')) {
			//alert("called")
			data1 = {
				selectedAudioMasters : ko.mapping.toJS(self.formData),
				photoId : photoId,
				isMaster : "No"
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/audioEdit/" + masterId(),
				data : data1,
				success : function(data) {
					self.editMode(false);
					self.clear();
				}
			})
		}
	}

	self.indexAudio = function() {
		//console.log(self.addToMasters());
		if ($('#createForm').parsley('validate')) {
			if (self.addToMasters() == true) {
				$.ajax({
					type : "post",
					dataType : 'json',
					url : "/audio_masters/",
					data : {
						audioMaster : self.formData
					},
					success : function(data) {
						self.parent.masterList.push(data);
						//	 self.clear();
					}
				})
			}
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/audioIndex",
				data : {
					selectedAudioMasters : [self.formData],
					photoId : data.photoId,
					isMaster : "No"
				},
				success : function(data) {

					//CHANGE: here id of the new email master should also be passsed.
					self.parent.indexedActions['audio'].push(ko.mapping.fromJS(data));
					self.clear();
				}
			})
		}
	}
}