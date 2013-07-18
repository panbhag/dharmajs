/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.AdminEdit = function(data){
	var self = this;
	self.client = ko.mapping.fromJS(data.client);
	console.log('****',self.client.companyName());
	self.editClient = function(){
		if ($('#editClient').parsley('validate')) {
			var clientId = self.client._id();
			data = {
				client : ko.mapping.toJS(self.client)
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/admin/" + clientId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/clients");
				}
			})
			return false;
		}
	}
	self.cancel = function(){
		App.views.setLocation("#/clients")
	}
}