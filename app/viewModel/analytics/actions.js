/**
 * @author Ashutosh Verma
 */
App.ViewModels.Actions = function(){
	var self = this;
	
	self.checkChanged = function(){		
		console.log("error: overwrite this function in the vm of respective view");
	}
	
	self.selectedStats = ['sms','call','www','email','audio','video','buy'];

	self.getCheckedList = function (action){			
		
		action =this;
		console.log(action);
		var checked = [];
		var list = ['sms','call','www','email','audio','video','buy'];
		
		for(var i=0; i<list.length; i++){
			
			if ($('#'+ list[i]).is(':checked')) {			    
			    checked.push(list[i]);
			}
		}

		if ($('#'+ action).is(':checked')) {
			    $(".count_" + action).show();
		}
		else{
			    $(".count_" + action).hide();
		}
		console.log('checked',checked);
		if(checked.length == 0){
			
			$(".count_" + action).prop('checked',true);  // to not allow no checkbox selected
			checked.push(action);
			self.checkChanged(checked);
			self.selectedStats = checked; 
			return true;
		}
		else{
			
			self.checkChanged(checked);
			self.selectedStats = checked; 
		
			return true;
		}
	
	}
	
	
}