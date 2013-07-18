App.ViewModels.ShareMastersEdit = function(data){
	var self = this;
	self.shareMaster = ko.mapping.fromJS(data.shareMaster);
	self.editShareMaster = function(){
		var shareMasterId = self.shareMaster._id();
			
			data = {
				shareMaster : ko.mapping.toJS(self.shareMaster)
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/share_masters/" + shareMasterId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/share_masters");
				}
			})
			return false;
		
	}
	self.cancel = function(){
			App.views.setLocation("#/share_masters");
	}
}
	


