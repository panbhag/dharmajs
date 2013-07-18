/**
 * @author Vijay R. Chintamani
*/
App.ViewModels.PhotoIndexing = function(data) {
	//console.log("data",data)
	var self = this;
	self.photo = data.photo;
	var masterOptions = {
		"email" : '/email_masters',
		"link" : '/link_masters',
		"call" : '/call_masters',
		"sms" : '/sms_masters',
		"audio" : '/audio_masters',
		"video" : '/video_masters',
		"buy" : '/buy_masters'
	}
	var masterModel = {
		"email" : 'PhotoEmailIndex',
		"link" : 'PhotoLinkIndex',
		"call" : 'PhotoCallIndex',
		"sms" : 'PhotoSmsIndex',
		"audio" : 'PhotoAudioIndex',
		"video" : 'PhotoVideoIndex',
		"buy" : 'PhotoBuyIndex'
	}
	self.indexedActions = ko.mapping.fromJS(self.photo);
	self.masterList = ko.observableArray([]);
	self.masters = ["email", "link", "call", "sms", "audio", "video", "buy"];
	self.selectedMaster = ko.observable("email");
	self.changeMaster = function(master) {
		master = master || self.selectedMaster;
		alert(masterOptions[master]);
		$.getJSON(masterOptions[master], function(masterData) {
			self.masterList.removeAll();
			$.each(masterData, function(i, m) {
				self.masterList.push(m);
			})
		})
		var vm = new App.ViewModels[masterModel[master]]({
			photoId : data.photo,
			photo : self.photo,
			parent : self
		})
		var templatePath = 'photos/' + master + 'Create';
		App.views.render($('div#indexCreate'), templatePath, vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : '/' + master + 'Showcase',
				done : function(e, data) {
					$.each(data.result, function(i, p) {
						vm.emailMaster.icon_url(p.newFileName);
						var picSrc = '/temp/' + master + '/' + p.newFileName;
						$("#photo").attr('src', picSrc);
					})
				}
			});
		});
	}
	self.selectedMaster.subscribe(function(newValue) {
		self.changeMaster(newValue);
		self.selectedMaster = newValue;
		return;
	});
	self.editAction = function(item) {
		console.log(self.photo)
		var vm = new App.ViewModels.PhotoEmailIndex({
			emailMasters : [],
			editMode : true,
			item : item,
			photoId : self.photo._id,
			photo : self.photo,
			parent : self
		})
		App.views.render($('div#indexCreate'), 'photos/emailCreate', vm, function() {
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
	}
	self.masterChanged = function() {
	}
	self.indexFromMaster = function(master, type) {
		console.log(master);
		$.ajax({
			type : "post",
			dataType : 'json',
			url : "/emailIndex",
			data : {
				selectedEmailMasters : [master.data],
				photoId : self.photo._id,
				isMaster : "Yes"
			},
			success : function(data) {
				self.indexedActions[type].push(master.data);
			}
		})
	}
}