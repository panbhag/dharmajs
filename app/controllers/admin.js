/**
 * @author Vijay R. Chintamani
 */
App.Controllers.Admin = function(params) {
	var self = this;
	self.index = function() {
		var url = "/admin";
		$.getJSON(url, function(clientList) {
			vm = new App.ViewModels.AdminIndex({
				clientList : clientList
			})
			App.views.render($('section#col_center'), 'admin/index', vm, function(){});
		});
	}
	
	self.new = function() {
		vm = new App.ViewModels.AdminNew();
		App.views.render($('section#col_center'), 'admin/new', vm, function() {
			$('#createClient').parsley();
		});
	}
	self.edit = function() {
		var url = "/admin/" + params['id'];
		$.getJSON(url, function(client) {
			vm = new App.ViewModels.AdminEdit({
				client : client				
			});
			App.views.render($('section#col_center'), 'admin/edit', vm, function() {});
		});
	}	
}