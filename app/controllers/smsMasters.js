App.Controllers.SmsMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/sms_masters";
		$.getJSON(url, function(smsMasters) {
			vm = new App.ViewModels.SmsMastersIndex({
				smsMasters : smsMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Sms');		//To select Sms
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'smsMasters/index', vm, function(){});

			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.SmsMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Sms');		//To select Sms
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'smsMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/smsShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.smsMaster.icon_url(p.newFileName);
						var picSrc = '/temp/smsShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
		});
		App.views.loader(false);
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/sms_masters/" + params['id'];
		$.getJSON(url, function(smsMaster) {
			vm = new App.ViewModels.SmsMastersEdit({
				smsMaster : smsMaster				
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Sms');		//To select Sms
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'smsMasters/edit', vm, function() {
				$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/smsShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.smsMaster.icon_url(p.newFileName);
						var picSrc = '/temp/smsShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			});
		});
	}	
}