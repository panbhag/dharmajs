App.Controllers.Photos = function(params) {
	//$('section.center_menu').html("");
	$('div#masterList').html("");
	$('div#masterCreate').html("");
	$('div#indexedList').html("");
	$('div#masterMenu').html("");
	var self = this;
	self.index = function() {
		
		App.views.render($('section#main'), 'shared/layout1',{},function(){
			vm = new App.ViewModels.SharedSearch({})
			App.views.render($('div#left_sidebar'), 'shared/left_search_panel', vm, {cacheTemplate:true}, function(){
				
				var url = "/photos/index";
				$.ajax({
					type: "post",
					dataType: "json",
					url: url,
					data: {cTags:App.currentTags()},
					success:function(photos){
						vm = new App.ViewModels.PhotoIndex({
								photos : photos
							});
						App.views.render($('div#col_center'), 'photos/index', vm, function() {
							$('#element').tooltip('hide')
							$('#ele, #grid, #list').tooltip('hide')
							
							$('#container').isotope({
								itemSelector : '.item',
								masonry : {
									columnWidth : $('#container').width() / 4
								}
					
							}).delay(2000);
							$(window).smartresize(function() {
								$('#container').isotope({
									// update columnWidth to a percentage of container width
									masonry : {
										columnWidth : $('#container').width() / 4
									}
								});
								console.log('working');
							}).delay(3000);
						});
					}
				});
				if(App.subscription){
					App.subscription.dispose();
				}		
				
				App.subscription = App.currentTags.subscribe(function(){	//it fire on any change in the currentTags[] --  subscription field is automatically created here
					
					var url = "/photos/index";
					$.ajax({
						type: "post",
						dataType: "json",
						url: url,
						data: {cTags:App.currentTags()} , // !cTags should be consider as a condition for the zero case
						success:function(photos){
							vm = new App.ViewModels.PhotoIndex({
							photos : photos
						})
						App.views.render($('div.span9'), 'photos/index', vm, function() {});
						}
					});
				});
				
			});
		});
		
	}

	self.indexing = function() {
		var url = "/photos/" + params['id'];
		var emailMastersURL = '/email_masters';
		var linkMastersURL = '/link_masters';
		var callMastersURL = '/call_masters';
		var smsMastersURL = '/sms_masters';
		var audioMastersURL = '/audio_masters';
		var videoMastersURL = '/video_masters';
		var buyMastersURL = '/buy_masters';
		var shareMastersURL = '/share_masters';
		var photoDetails = {};
		$.ajax({
			type : "get",
			dataType : 'json',
			url : url,
			async : false,
			success : function(photo) {
				
				App.views.render($('section#main'), 'shared/layout3',{},function(){
					//	console.log("c data",photo)
						vm = new App.ViewModels.PhotoIndexing({
						photo : photo
					});
					App.views.render($('div#layout3'), 'photos/indexing', vm,function(){
						vm.changeMaster(vm.selectedMaster());
						$("#masters").change(function(){
							var newValue = $("#masters").val();
							
							vm.changeMaster(newValue);
							vm.selectedMaster = newValue;
							
						});	
						
					});	
				});		
			}			
		});
		// vm = new App.ViewModels.PhotoIndexedList({
		// photo : photoDetails
		// })
		//

		// App.views.render($('div#indexedList'), 'photos/indexedList', vm, function() {	});
		// $('section#list').html("");

	}

	self.new = function() {
		App.views.render($('section#main'), 'shared/layout2',{},function(){
			var vm = new App.ViewModels.PhotoNew();
			App.views.render($('div#layout2'), 'photos/new', vm, function() {
				$('#fileupload').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadPhoto',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							vm.Photo.picdisplayName(p.fileName);
							vm.Photo.picsaveName(p.newFileName);
							var picSrc = '/temp/photos/' + p.newFileName;
							$("#photo").attr('src', picSrc)
							$("#photoField").val(picSrc)
							$("#dispName").text(p.fileName)
						})
					}
				});
				$('#fileupload1').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadBannerImage',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							//vm.photo.picdisplayName(p.fileName);
							vm.Photo.banner_image(p.newFileName);
							var picSrc = '/temp/banners/' + p.newFileName;
							$("#photo1").attr('src', picSrc);
						})
					}
				});
				$('#fileupload2').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadBannerLogo',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							//vm.photo.picdisplayName(p.fileName);
							vm.Photo.brand_logo(p.newFileName);
							var picSrc = '/temp/logos/' + p.newFileName;
							$("#photo2").attr('src', picSrc);
						})
					}
				});	
			});
		});
	}

	self.edit = function() {
		var url = "/photos/" + params['id'];
		// var emailMastersURL = '/email_masters';
		// var linkMastersURL = '/link_masters';
		// var callMastersURL = '/call_masters';
		// var smsMastersURL = '/sms_masters';
		// var audioMastersURL = '/audio_masters';
		// var videoMastersURL = '/video_masters';
		// var buyMastersURL = '/buy_masters';
		// var shareMastersURL = '/share_masters';

		$.getJSON(url, function(photo) {

			vm = new App.ViewModels.PhotoEdit({
				photo : photo
			})
			App.views.render($('div#col_center'), 'photos/edit', vm, function() {

				$('#fileupload').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadPhoto',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							vm.photo.picdisplayName(p.fileName);
							vm.photo.picsaveName(p.newFileName);
							var picSrc = '/temp/photos/' + p.newFileName;
							$("#photo").attr('src', picSrc);
						})
					}
				});
				$('#fileupload1').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadBannerImage',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							//vm.photo.picdisplayName(p.fileName);
							vm.photo.banner_image(p.newFileName);
							var picSrc = '/temp/banners/' + p.newFileName;
							$("#photo1").attr('src', picSrc);
						})
					}
				});
				$('#fileupload2').fileupload({
					start : function() {
					},
					dataType : 'json',
					url : '/uploadBannerLogo',
					done : function(e, data) {
						$.each(data.result, function(i, p) {
							//vm.photo.picdisplayName(p.fileName);
							vm.photo.brand_logo(p.newFileName);
							var picSrc = '/temp/logos/' + p.newFileName;
							$("#photo2").attr('src', picSrc);
						})
					}
				});
			});
		});
	}
}