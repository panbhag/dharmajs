App.ViewModels.BuyMastersEdit = function(data){
	var self = this;
	self.buyMaster = ko.mapping.fromJS(data.buyMaster);
	
	// if(self.buyMaster.title().length){
		// self.showcaseFlag = ko.observable(true);
	// }
	// else{
		// self.showcaseFlag = ko.observable(false);
	// }
	self.editBuyMaster = function(){
		if ($('#editBuy').parsley('validate')) {
		var buyMasterId = self.buyMaster._id();
			var itemData = ko.mapping.toJS(self.buyMaster);
			if(!self.buyMaster.showcaseFlag())
			{
				itemData.title = '';
				itemData.subtitle = '';
			}
			data = {
				buyMaster : itemData
			}	
			$.ajax({
				type : "put",
				dataType : 'json',
				url : "/buy_masters/" + buyMasterId,
				data: data,
				success : function(data) {
					App.views.setLocation("#/buy_masters");
				}
			})
			return false;
		}
		
	}
	self.cancel = function(){
			App.views.setLocation("#/buy_masters");
	}
}
	


