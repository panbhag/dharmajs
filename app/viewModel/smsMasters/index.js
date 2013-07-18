/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.SmsMastersIndex = function(data){
	var self = this;	
	self.smsMasters = ko.mapping.fromJS(data.smsMasters);
	self.deleteSmsMasters = function(smsMaster){
		var smsMasterId = smsMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/sms_masters/" + smsMasterId,
				success : function(data) {
					 vm.smsMasters.remove(smsMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

