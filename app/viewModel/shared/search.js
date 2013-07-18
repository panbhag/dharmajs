App.ViewModels.SharedSearch = function(data){
	var self = this;
			
	self.tagSearch = function(){
   			
  			var val = $('#query').val();
  			if (val.length >= 2) {
				$.ajax({
	      			url : '/search/index',
	      			dataType : "json",
	      			data : {
	       				term : val
	      			},
	      			success : function(data){
	       				App.searchedTags.removeAll();
	       				var tags = [];
	       				console.log('response',data);
	       				_.each(data,function(d){
	       					_.each(d.tags,function(tag){
	       						tags.push(tag);
	       					});
	       				});
	       				tags = _.uniq(tags);
	       				console.log(tags);
	       				
	       				_.each(tags, function(tag){
	       					App.searchedTags.push(tag);	       					
	       				});
	       				console.log('searchedTags',App.searchedTags())
	       				
	      			},
	      		});
			 }
  			return true;
	};
	
	self.tagSelect = function(data){
		
		var flag = _.contains(App.currentTags(),data);
		if (flag === true){
			alert('You Have Already Added this Tag');
			return true;
		
		}
		else{
			App.currentTags.push(data);
				
			console.log('currentTags',App.currentTags());
			return true;
		}
	
	};
	
	self.tagDelete = function(data){
		
		App.currentTags.remove(data);
	
	};
};