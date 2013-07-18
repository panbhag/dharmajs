/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.SocialMastersIndex = function(data){
	var self = this;	
	self.socialMasters = ko.mapping.fromJS(data.socialMasters);
	self.deleteSocialMasters = function(socialMaster){
		var socialMasterId = socialMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/social_masters/" + socialMasterId,
				success : function(data) {
					 vm.socialMasters.remove(socialMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

