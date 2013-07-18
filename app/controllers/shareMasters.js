App.Controllers.ShareMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/share_masters";
		$.getJSON(url, function(shareMasters) {
			vm = new App.ViewModels.ShareMastersIndex({
				shareMasters : shareMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Share');		//To select Share
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'shareMasters/index', vm, function(){});
			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.ShareMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Share');		//To select Share
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'shareMasters/new', vm, function() {});
		App.views.loader(false);
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/share_masters/" + params['id'];
		$.getJSON(url, function(shareMaster) {
			vm = new App.ViewModels.ShareMastersEdit({
				shareMaster : shareMaster				
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Share');		//To select Share
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'shareMasters/edit', vm, function() {});
		});
	}	
}