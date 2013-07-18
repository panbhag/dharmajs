/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.PhotoVideoIndex = function(data) {
	//console.log(data);
	var self = this;
	self.editMode = ko.observable(data.editMode || false);
	var masterId = '';
	var photoId = data.photoId
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
				selectedvideoMasters : ko.mapping.toJS(self.formData),
				photoId : photoId,
				isMaster : "No"
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/videoEdit/" + masterId(),
				data : data1,
				success : function(data) {
					// $.each(self.parent.indexedActions['emails'],function(i,a){
					// if(a._id == data._id)
					// {
					// a.name = data.name;
					// }
					// });
					//console.log("hhhhhhhh")
					self.editMode(false);
					self.clear();
				}
			})
		}
	}

	self.indexVideo = function() {
		if ($('#createForm').parsley('validate')) {
			console.log(self.addToMasters());
			if (self.addToMasters() == true) {
				$.ajax({
					type : "post",
					dataType : 'json',
					url : "/video_masters/",
					data : {
						videoMaster : self.formData
					},
					success : function(data) {
						console.log("1", data)
						self.parent.masterList.push(data);
						//	 self.clear();
					}
				})
			}
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/videoIndex",
				data : {
					selectedVideoMasters : [self.formData],
					photoId : data.photoId,
					isMaster : "No"
				},
				success : function(data) {

					//CHANGE: here id of the new email master should also be passsed.
					self.parent.indexedActions['videos'].push(ko.mapping.fromJS(data));
					self.clear();
				}
			})
		}
	}
}