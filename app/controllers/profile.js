/**
 * @author Vijay R. Chintamani
 */
App.Controllers.Profile = function(params) {
	$('section.center_menu').html("");
	var self = this;
	$('div#masterList').html("");
	$('div#masterCreate').html("");
	$('div#indexedList').html("");
	self.index = function() {
		//var url = "/profile/" +  App.currentClient._id;
		//$.getJSON(url, function(profile) {
			//console.log("df",profile)
			vm = new App.ViewModels.ProfileIndex({
				profile : App.currentClient
			})			
			App.views.render($('section.col_center'), 'profile/index', vm, function(){});
		//});
	}
	self.edit = function() {
		//var url = "/client/" +  App.currentClient._id;
		//$.getJSON(url, function(profile) {
			vm = new App.ViewModels.ProfileEdit({
				profile : App.currentClient				
			});
			App.views.render($('section.col_center'), 'profile/edit', vm, function() {});
		//});
	}	
}