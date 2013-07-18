App.ViewModels.PhotoNew = function() {
	var self = this;
	self.Photo = ko.mapping.fromJS({
		//sn : "",
		title : "", ////1
		tags: "",
		//url : "",
		picdisplayName : "",
		picsaveName : "",  //pic1
		banner_image:"",   //pic2
  		brand_logo:"",     //pic3
   		banner_title:"",
  		banner_subtitle:""		
	});
	
	self.savePhoto = function() {
		if ($('#createForm').parsley('validate')) {
			self.Photo = ko.mapping.toJS(self.Photo);
			// var tagsArray = $("#userTagHandle").tagHandler('getTags');
			// console.log(tagsArray);
			self.Photo.tags = $("#userTagHandle").tagHandler('getTags');
			
	    	//self.Photo.tags = self.Photo.tags.split(",");
			
			$.ajax({
				type : "post",
				dataType : 'json',
				url : "/photos/",			
				data : {photo: self.Photo},
				success : function(data) {				
					// App.views.setLocation('#/photos/'+data._id+'/edit');
					App.views.setLocation('#/photos');
					console.log(data)
				}
			});
		}
	};
	self.indexPhoto = function() {
		
		self.Photo = ko.mapping.toJS(self.Photo);
		self.Photo.tags = $("#userTagHandle").tagHandler('getTags');
		$.ajax({
			type : "post",
			dataType : 'json',
			url : "/photos/",			
			data : {photo: self.Photo},
			success : function(data) {
				App.views.setLocation('#/photos/'+data._id+'/indexing');
				console.log(data)
			}
		})
	}

	self.cancel = function(){
		App.views.setLocation("#/photos");
	}
		

}