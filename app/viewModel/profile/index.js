/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.ProfileIndex = function(data){
	var self = this;
	self.profile = ko.mapping.fromJS(data.profile);	
}

