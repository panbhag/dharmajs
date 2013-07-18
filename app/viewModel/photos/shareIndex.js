/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.PhotoShareIndex = function(data) {
	var self = this;
	self.shareMasterList = ko.mapping.fromJS(data.shareMasters);
	self.selectedShareMasters = ko.observableArray(data.photo.share);
	self.shareMaster = ko.mapping.fromJS({
		name : "",
		description : ""
	});
	self.addToMasters = ko.observable(false);
	self.clear = function(){
		self.shareMaster.name('');
		self.shareMaster.description('');
		self.addToMasters(false);
		$('#photo').attr('src','');
	}
	self.indexShare = function(shareMaster){
		if(self.addToMasters() == true)
		{
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/share_masters/",
				data : {shareMaster: self.shareMaster},
				success : function(data)
				{
					self.clear();
				}
			})	
			
		}
		var selectedShareMasters = [];
		selectedShareMasters.push(self.shareMaster)
		$.ajax({
			type : "post",
			dataType : 'json',
			url : "/shareIndex",
			data : {selectedShareMasters : selectedShareMasters, photoId : data.photoId, isMaster: "No"},
			success : function(data) {
				self.clear();
			}
		})
	}
	self.indexShare1 = function(master){
		var v = ko.mapping.toJS(master);
		var vv = ko.mapping.toJS(self.emailMasterList)
		$.each(vv,function(i,share){
			if (v._id == share._id)
			{
				var selectedShareMasters = [];
		 		selectedShareMasters.push(share)
				$.ajax({
					type : "post",
					dataType : 'json',
					url : "/shareIndex",
					data : {selectedShareMasters : selectedShareMasters, photoId : data.photoId, isMaster: "Yes"},
					success : function(data) {
						alert("indexed!!!");
					}
				})
			}
		})
	}
}