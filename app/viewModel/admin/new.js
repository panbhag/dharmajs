/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.AdminNew = function() {
	var self = this;
	self.client = ko.mapping.fromJS({
		userName : "",
		password : "",
		companyName : "",
		companyWebsite : "",
		emailId : "",
		phoneNumber : "",
		companyAddress : ""
	});
	self.saveClient = function() {
		if ($('#createClient').parsley('validate')) {
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/admin/",
				data : {
					client : self.client
				},
				success : function(data) {
					App.views.setLocation("#/clients");
				},
				error : function(data) {
					alert("User Already Exist!!!!");
					App.views.setLocation("#/clients");
				}
			})
		} 

	}
	self.cancel = function() {
		App.views.setLocation("#/clients")
	}
}