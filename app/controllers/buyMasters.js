App.Controllers.BuyMasters = function(params) {
	var self = this;
	//$('div#masterList').html("");
	// $('div#masterCreate').html("");
	// $('div#indexedList').html("");
	
	self.index = function() {
		new App.Controllers.Settings().index();
		var url = "/buy_masters";
		$.getJSON(url, function(buyMasters) {
			vm = new App.ViewModels.BuyMastersIndex({
				buyMasters : buyMasters
			})
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Buy');		//To select Buy
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'buyMasters/index', vm, function(){});
			App.views.loader(false);
		});
	}
	
	self.new = function() {
		new App.Controllers.Settings().index();
		vm = new App.ViewModels.BuyMastersNew();
		$('[name=options] option').filter(function() {
			return ($(this).text() == 'Buy');		//To select Buy
		}).prop('selected', true);
		App.views.render($('section.col_center'), 'buyMasters/new', vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/buyShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.buyMaster.icon_url(p.newFileName);
						var picSrc = '/temp/buyShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			
		});
		App.views.loader(false);
	}
	self.edit = function() {
		new App.Controllers.Settings().index();
		var url = "/buy_masters/" + params['id'];
		$.getJSON(url, function(buyMaster) {
			vm = new App.ViewModels.BuyMastersEdit({
				buyMaster : buyMaster				
			});
			$('[name=options] option').filter(function() {
				return ($(this).text() == 'Buy');		//To select Buy
			}).prop('selected', true);
			App.views.render($('section.col_center'), 'buyMasters/edit', vm, function() {
				$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/buyShowcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.buyMaster.icon_url(p.newFileName);
						var picSrc = '/temp/buyShowcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);						
					})
				}
			});
			});
		});
	}	
}