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
		"buy" : '/buy_masters',
		"social" : '/social_masters'
	}
	var masterModel = {
		"email" : 'PhotoEmailIndex',
		"link" : 'PhotoLinkIndex',
		"call" : 'PhotoCallIndex',
		"sms" : 'PhotoSmsIndex',
		"audio" : 'PhotoAudioIndex',
		"video" : 'PhotoVideoIndex',
		"buy" : 'PhotoBuyIndex',
		"social" : 'PhotoSocialIndex'
	}
	self.indexedActions = ko.mapping.fromJS(self.photo);
	self.masterList = ko.observableArray([]);
	self.masters = ["email", "link", "call", "sms", "audio", "video", "buy", "social"];
	self.selectedMaster = ko.observable("email");
	self.changeMaster = function(master) {
		master = master || self.selectedMaster();
		$.getJSON(masterOptions[master], function(masterData) {
			self.masterList.removeAll();
			$.each(masterData, function(i, m) {
				self.masterList.push(m);
			})
		})
		console.log(masterModel[master]);
		var vm = new App.ViewModels[masterModel[master]]({
			photoId : data.photo._id,
			photo : self.photo,
			parent : self
		})
		console.log(ko.mapping.toJS(vm));
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
						var picSrc = '/temp/' + master + 'Showcase/' + p.newFileName;
						$("#photo").attr('src', picSrc);
					})
				}
			});
			
		});
	}

	self.selectedMaster.subscribe(function(newValue) {
		self.changeMaster(newValue);
		//alert(newValue);
		self.selectedMaster = newValue;
		return;
	});

	self.editAction = function(type,item) {
		
		var vm = new App.ViewModels[masterModel[type]]({
			editMode : true,
			item : item,
			photoId : self.photo._id,
			photo : self.photo,
			parent : self
		})
		var templatePath = 'photos/' + type + 'Create';
		var photoUploadPath = '/' + type + 'Showcase';
		var master = type + 'Master';
		App.views.render($('div#indexCreate'), templatePath, vm, function() {
			$('#fileupload').fileupload({
				start : function() {
				},
				dataType : 'json',
				url : photoUploadPath,
				done : function(e, data) {
					$.each(data.result, function(i, p) {						
						vm.formData.icon_url(p.newFileName);
						//var picSrc = '/temp/emailShowcase/' + p.newFileName;
						var picSrc = '/temp' + photoUploadPath + '/' + p.newFileName;
						$("#photo").attr('src', picSrc);
					})
				}
			});
		});
	}
	self.indexFromMasterWithShowcase = function(type,master) {
		type = type();
		$.ajax({
			type : "post",
			dataType : 'json',
			url : '/' + type + "Index",
			data : {
				selectedEmailMasters : [master],
				photoId : self.photo._id,
				isMaster : "Yes"
			},
			success : function(data) {
				//alert(type)
				if(type == "email" || type == "call" || type == "link" || type == "video" || type == "social")
					self.indexedActions[type + 's'].push(ko.mapping.fromJS(master));
				if(type == "sms")
					self.indexedActions[type + 'es'].push(ko.mapping.fromJS(master));
				if(type == "audio" || type == "buy")
					self.indexedActions[type].push(ko.mapping.fromJS(master));
			}
		})
	}
	self.indexFromMaster = function(type,master) {
		type = type();
		master.title = '';
		master.subtitle = '';
		$.ajax({
			type : "post",
			dataType : 'json',
			url : '/' + type + "Index",
			data : {
				selectedEmailMasters : [master],
				photoId : self.photo._id,
				isMaster : "Yes"
			},
			success : function(data) {
				//alert(type)
				if(type == "email" || type == "call" || type == "link" || type == "video" || type == "social")
					self.indexedActions[type + 's'].push(ko.mapping.fromJS(master));
				if(type == "sms")
					self.indexedActions[type + 'es'].push(ko.mapping.fromJS(master));
				if(type == "audio" || type == "buy")
					self.indexedActions[type].push(ko.mapping.fromJS(master));
			}
		})
	}
}