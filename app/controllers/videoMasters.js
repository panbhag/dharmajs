App.Controllers.VideoMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
		
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/video_masters";
		$.getJSON(url, function(videoMasters) {
			vm = new App.ViewModels.VideoMastersIndex({
				videoMasters : videoMasters
			})
			$('[name=options] option').filter(function() { 
				return ($(this).text() == 'Video'); //To select Video
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'videoMasters/index', vm, function(){});
			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.VideoMastersNew();
		$('[name=options] option').filter(function() { 
			return ($(this).text() == 'Video'); //To select Video
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'videoMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/videoShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.videoMaster.icon_url(p.newFileName);
						var picSrc = '/temp/videoShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
		});
		App.views.loader(false);
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/video_masters/" + params['id'];
		$.getJSON(url, function(videoMaster) {
			vm = new App.ViewModels.VideoMastersEdit({
				videoMaster : videoMaster				
			});
			$('[name=options] option').filter(function() { 
				return ($(this).text() == 'Video'); //To select Video
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'videoMasters/edit', vm, function() {
				$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/videoShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.videoMaster.icon_url(p.newFileName);
						var picSrc = '/temp/videoShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			});
		});
	}	
}