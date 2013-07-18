App.ViewModels.CallMastersEdit = function(data){
	var self = this;
	self.callMaster = ko.mapping.fromJS(data.callMaster);
	
	// if(self.callMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editCallMaster = function(){				
		if ($('#editCall').parsley('validate')) {
			var callMasterId = self.callMaster._id();
			var itemData = ko.mapping.toJS(self.callMaster);
			if(!self.callMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				callMaster : itemData
			}
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/call_masters/" + callMasterId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/call_masters");
				}
			})
			return false;
		}
			
	}
	self.cancel = function(){
			App.views.setLocation("#/call_masters");
	}
}
	


