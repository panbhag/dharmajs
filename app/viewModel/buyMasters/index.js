/**
 * @author Vijay R. Chintamani
 */
App.ViewModels.BuyMastersIndex = function(data){
	var self = this;	
	self.buyMasters = ko.mapping.fromJS(data.buyMasters);
	self.deleteBuyMasters = function(buyMaster){
		var buyMasterId = buyMaster._id();
			if (confirm("Are you sure you delete? ")) {
			$.ajax({
				type : "delete",
				dataType : 'json',
				url : "/buy_masters/" + buyMasterId,
				success : function(data) {
					 vm.buyMasters.remove(buyMaster);
					// App.showFlash("Message deleted");
				}
			})
			return false;
		}
	}
}

