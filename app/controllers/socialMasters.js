/**
 * @author Vijay R. Chintamani
 */
App.Controllers.SocialMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/social_masters";
		$.getJSON(url, function(socialMasters) {
			vm = new App.ViewModels.SocialMastersIndex({
				socialMasters : socialMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Social');		//To select Social
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'socialMasters/index', vm, function(){});
		});
	}

	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.SocialMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Social');		//To select Social
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'socialMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/socialShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.socialMaster.icon_url(p.newFileName);
						var picSrc = '/temp/socialShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);
					})
				}
			});

		});
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/social_masters/" + params['id'];
		$.getJSON(url, function(socialMaster) {
			vm = new App.ViewModels.SocialMastersEdit({
				socialMaster : socialMaster
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Social');		//To select Social
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'socialMasters/edit', vm, function() {
				$('#fileupload').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/socialShowcase',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							vm.socialMaster.icon_url(p.newFileName);
							var picSrc = '/temp/socialShowcase/' + p.newFileName;
							$("#photo").attr('src', picSrc);
						})
					}
				});
			});
		});
	}
}