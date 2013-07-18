/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.AdminIndex = function(data){
	var self = this;	
	self.clientList = ko.mapping.fromJS(data.clientList);
	self.deleteClient = function(client){
		//alert(emailMaster._id());
		var clientId = client._id();
		
			if (confirm("Are you sure you want to delete your client \n" + client.companyName() + " ? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/admin/" + clientId,
				success : function(data) {
					 vm.clientList.remove(client);
					// App.showFlash("Message deleted");
				}
			})

			return false;
		}
	}	
}

