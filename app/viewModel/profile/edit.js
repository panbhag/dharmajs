/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.ProfileEdit = function(data) {
	var self = this;
	self.profile = ko.mapping.fromJS(data.profile);
	self.editProfile = function() {
		if ($('#editProfile').parsley('validate')) {
			var profileId = self.profile._id();
			data = {
				client : ko.mapping.toJS(self.profile)
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/admin/" + profileId,
				data : data,
				success : function(data) {
					console.log("data>>", data)
					App.currentClient = data;
					App.views.setLocation("#/profile");
				}
			})
			return false;
		}
	}
		self.cancel = function() {
			App.views.setLocation("#/profile");
		}
	
}