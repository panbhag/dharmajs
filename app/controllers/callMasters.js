App.Controllers.CallMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
		
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/call_masters";
		$.getJSON(url, function(callMasters) {
			vm = new App.ViewModels.CallMastersIndex({
				callMasters : callMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Call');		//To select Call
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'callMasters/index', vm, function(){});
			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.CallMastersNew();	
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Call');		//To select Call
		}).prop('selected', true);	
		App.views.render($('section.col_center'), 'callMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/callShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {						
						vm.callMaster.icon_url(p.newFileName);
						var picSrc = '/temp/callShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
		});
		App.views.loader(false);
	}
	
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/call_masters/" + params['id'];
		$.getJSON(url, function(callMaster) {
			vm = new App.ViewModels.CallMastersEdit({
				callMaster : callMaster				
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Call');		//To select Call
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'callMasters/edit', vm, function() {
				$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/callShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.callMaster.icon_url(p.newFileName);
						var picSrc = '/temp/callShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			});
		});
	}	
}