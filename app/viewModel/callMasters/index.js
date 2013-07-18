/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.CallMastersIndex = function(data){
	var self = this;	
	self.callMasters = ko.mapping.fromJS(data.callMasters);
	self.deleteCallMasters = function(callMaster){
		//alert(emailMaster._id());
		var callMasterId = callMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/call_masters/" + callMasterId,
				success : function(data) {
					 vm.callMasters.remove(callMaster);
					// App.showFlash("Message deleted");
				}
			})

			return false;
		}
	}	
}

