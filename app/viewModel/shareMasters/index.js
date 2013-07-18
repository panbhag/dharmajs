/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.ShareMastersIndex = function(data){
	var self = this;	
	self.shareMasters = ko.mapping.fromJS(data.shareMasters);
	self.deleteShareMasters = function(shareMaster){
		var shareMasterId = shareMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/share_masters/" + shareMasterId,
				success : function(data) {
					 vm.shareMasters.remove(shareMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

