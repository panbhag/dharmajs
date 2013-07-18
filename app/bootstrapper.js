jQuery.ajaxSetup({ cache: false });
//if(!console) {console={}; console.log = function(){};}
App = {};
App.ViewModels = {};
App.Controllers = {};

$.ajax({url:'/current_client',type:'get',async:false,success:function(currentClient){
	App.currentClient = currentClient.user;
	console.log("currentClient>>>", App.currentClient);
}});
