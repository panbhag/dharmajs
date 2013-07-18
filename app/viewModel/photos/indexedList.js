/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.PhotoIndexedList = function(data) {
	var self = this;
	console.log("!!!",data)
	self.indexedList = ko.mapping.fromJS(data.photo);
	console.log("@@\n",data.photo)
}
