/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.LinkMastersIndex = function(data){
	var self = this;	
	self.linkMasters = ko.mapping.fromJS(data.linkMasters);
	self.deleteLinkMasters = function(linkMaster){
		var linkMasterId = linkMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/link_masters/" + linkMasterId,
				success : function(data) {
					 vm.linkMasters.remove(linkMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}		
}

