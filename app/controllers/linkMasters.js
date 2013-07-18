App.Controllers.LinkMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	$(function() {
		
	});
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/link_masters";
		$.getJSON(url, function(linkMasters) {
			vm = new App.ViewModels.LinkMastersIndex({
				linkMasters : linkMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Links');		//To select Links
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'linkMasters/index', vm, function(){
				
			});

			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.LinkMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Links');		//To select Links
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'linkMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/linkShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.linkMaster.icon_url(p.newFileName);
						var picSrc = '/temp/linkShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
		});
		App.views.loader(false);
	}
	
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/link_masters/" + params['id'];
		$.getJSON(url, function(linkMaster) {
			vm = new App.ViewModels.LinkMastersEdit({
				linkMaster : linkMaster				
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Links');		//To select Links
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'linkMasters/edit', vm, function() {
				$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/linkShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.linkMaster.icon_url(p.newFileName);
						var picSrc = '/temp/linkShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			});
		});
	}	
}