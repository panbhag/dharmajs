/**
 * @author Ashutosh Verma
 */
App.ViewModels.GroupImage = function(data){
	var self = this;	
	//console.log("///",data.data);
	//data format {  "1": {    "counts": {  "email": 3,  "buy": 4 }  },  "2": { "counts": {"buy": 1} }}
	self.cTotal = 0;
	var grandTotal = 0;
	self.keys = _.keys(data.data); 		// for catching keys from the key value pair
	
	self.getCount = function(key,type){		//to count no. of each cell 
		if (!data.data[key])
			return 0;
		
		return data.data[key]['counts'][type] || 0 ;
	}
	
	self.getTotal = function(key){		//to get the row total count
		if (!data.data[key])
			return 0;
		var checked = data.actionVM.selectedStats;
		var total = 0 ;
		_.each(checked, function(check){
				
			$(".count_" + check).show();
			total = total + (data.data[key]['counts'][check] || 0);
			$('#' + key + ' .total').text(total);	
		});
		
		grandTotal = grandTotal + total;
		$('#grandTotal').text(grandTotal);
		
		return total;	
	};
	
	self.updateTotal = function(checked){
		
		console.log('inside updateTotal', checked);
		
		grandTotal = 0;
		_.each(self.keys, function(key){
			var total = 0 ;
			
			_.each(checked, function(check){
				
				total = total + (data.data[key]['counts'][check] || 0);
				$('#' + key + ' .total').text(total);
				
			});
			grandTotal = grandTotal + total;
		});
		
		$('#grandTotal').text(grandTotal);
		
		
		return true;
		
	}
	
	console.log(data.actionVM)
	data.actionVM.checkChanged = self.updateTotal;	//checkChanged is now same as updateTotal
	
	
	self.columnTotal = function(type){		//to get the column total count
		var total = 0;
		var cTotal = 0;
		console.log('keys', self.keys);
		_.each(self.keys,function(key){
			total = total + (data.data[key]['counts'][type] || 0) ;
		})
		console.log('total', total);
		cTotal = cTotal + total;
		return total;
	};
}