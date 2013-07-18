App.Controllers.AudioMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/audio_masters";
		$.getJSON(url, function(audioMasters) {
			vm = new App.ViewModels.AudioMastersIndex({
				audioMasters : audioMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Audio');		//To select Audio
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'audioMasters/index', vm, function() {
			});
			App.views.loader(false);
		});
	}

	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.AudioMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Audio');		//To select Audio
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'audioMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/audioShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.audioMaster.icon_url(p.newFileName);
						var picSrc = '/temp/audioShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);
					})
				}
			});
		});
		App.views.loader(false);
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/audio_masters/" + params['id'];
		$.getJSON(url, function(audioMaster) {
			vm = new App.ViewModels.AudioMastersEdit({
				audioMaster : audioMaster
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Audio');		//To select Audio
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'audioMasters/edit', vm, function() {
				$('#fileupload').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/audioShowcase',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							vm.audioMaster.icon_url(p.newFileName);
							var picSrc = '/temp/audioShowcase/' + p.newFileName;
							$("#photo").attr('src', picSrc);
						})
					}
				});
			});
		});
	}
}