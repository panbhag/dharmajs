App.Controllers.EmailMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {			
		var url = "/email_masters";
		$.getJSON(url, function(emailMasters) {
			vm = new App.ViewModels.EmailMastersIndex({
				emailMasters : emailMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Email');		//To select Email
			}).prop('selected', true);
			App.views.render($('div#menu_below_header'), 'shared/menu_cat1',{},function(){
				App.views.render($('section#main'), 'shared/layout4',{},function(){
					$('section#main').removeClass('content-col').addClass('content')
					App.views.render($('table#table-inside-render'), 'emailMasters/index', vm, function(){
						new App.Controllers.Settings().index();
					});
				});
			});
		});
	};
	
	self.new = function() {

		vm = new App.ViewModels.EmailMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Email');
			//To select Email
		}).prop('selected', true);
		App.views.render($('div#menu_below_header'), 'shared/menu_cat1', {}, function() {
			App.views.render($('section#main'), 'shared/layout5', {}, function() {
				$('section#main').removeClass('content-col').addClass('content')
				App.views.render($('div#master-form'), 'emailMasters/new', vm, function() {

					new App.Controllers.Settings().index();
					$('#fileupload').fileupload({
						start : function() {
						},
						dataType : 'json',
						url : '/emailShowcase',
						done : function(e, data) {
							$.each(data.result, function(i, p) {
								vm.emailMaster.icon_url(p.newFileName);
								var picSrc = '/temp/emailShowcase/' + p.newFileName;
								$("#photo").attr('src', picSrc);
							});
						}
					});
				});
			});
		});
	}

	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/email_masters/" + params['id'];
		$.getJSON(url, function(emailMaster) {
			vm = new App.ViewModels.EmailMastersEdit({
				emailMaster : emailMaster
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Email');		//To select Email
			}).prop('selected', true);
			App.views.render($('section#main'), 'shared/layout2',{},function(){
				App.views.render($('div#layout2' ), 'emailMasters/edit', vm, function() {
					$('#fileupload').fileupload({
						start : function() {
						},
						dataType : 'json',
						url : '/emailShowcase',
						done : function(e, data) {
							$.each(data.result, function(i, p) {
								vm.emailMaster.icon_url(p.newFileName);
								var picSrc = '/temp/emailShowcase/' + p.newFileName;
								$("#photo").attr('src', picSrc);
							})
						}
					});
				});
			});
		});
	}
}