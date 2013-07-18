/**
 * @author Ashutosh Verma
 */
App.ViewModels.GroupTime = function(data){  // data format { '2': { counts: { email: 4, call: 1 } },
											  // '3': { counts: { call: 1 } },
											  // '4': { counts: { buy: 1 } } }
	var self = this;	
	//console.log("///",data.data);
	self.groupImage = ko.mapping.fromJS(data.data);
	self.data = data.data;
	self.keys = _.keys(data.data);
	self.keys.sort();
	console.log('data.data' ,data.data)
	console.log('keys', self.keys);
	self.timeArray = ["1","2","3","4","5","6"];
	var grandTotal = 0;
	var checked = [];
	
	self.getCount = function(key,type){
		if (!data.data[key])
			return 0;
		
		return data.data[key]['counts'][type] || 0 ;
	};
	
	self.getLabel = function(index){
		
		var labels = {"1":"2 am - 6 am","2":"6 am - 10 am", "3":"10 am - 2 pm", "4":"2 pm - 6 pm", "5":"6 pm - 10 pm", "6":"10 pm - 2 am"}
		return labels[index];

	};	
	
	self.updateTotal = function(checked){		
		console.log('inside updateTotal', checked);
		grandTotal = 0;
		_.each(self.keys, function(key){
			var total = 0 ;			
			_.each(checked, function(check){
				
				total = total + (data.data[key]['counts'][check] || 0);
				$('#' + key + ' .total').text(total);				

				if ($('#' + check).is(':checked')) {
					$(".count_" + check).show();
				} else {
					$(".count_" + check).hide();
				}				
			});
			grandTotal = grandTotal + total;
		});
		
		$('#grandTotal').text(grandTotal);		
		
		return true;
		
	};
	data.actionVM.checkChanged = self.updateTotal;	//checkChanged is now same as updateTotal
	
	self.getTotal = function(key){		//to get the row total count
		console.log('inside getTotal', key);
		if (!data.data[key])
			return 0;
		var checked = data.actionVM.selectedStats;
		console.log(key,'getTotal called');
		var total = 0 ;
		$.each(checked, function(i,check){
				
			$(".count_" + check).show();
			total = total + (data.data[key]['counts'][check] || 0);
			$('#' + key + ' .total').text(total);	
		});
		
		grandTotal = grandTotal + total;
		$('#grandTotal').text(grandTotal);
		
		return total;	
	};
	
	self.columnTotal = function(type){
		var total = 0;
		
		console.log('keys', self.keys);
		_.each(self.keys,function(key){
			total = total + (data.data[key]['counts'][type] || 0) ;
		})
		console.log('total', total);
		return total;
	};
	
};
