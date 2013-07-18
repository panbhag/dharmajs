/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.EmailMastersIndex = function(data){
	var self = this;	
	self.emailMasters = ko.mapping.fromJS(data.emailMasters);
	self.deleteEmailMasters = function(emailMaster){
		var emailMasterId = emailMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/email_masters/" + emailMasterId,
				success : function(data) {
					 vm.emailMasters.remove(emailMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

