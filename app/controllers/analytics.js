/**
 * @author Ashutosh Verma
 */
App.Controllers.Analytics = function(params) {
	$('section.center_menu').html("");
	var self = this;
	self.mainPage = function(){
		
		App.views.render($('section#main'), 'shared/layout1',{},function(){			
			vm = new App.ViewModels.SharedSearch({});
			App.views.render($('div#left_sidebar'), 'shared/left_search_panel', vm, {cacheTemplate:true}, function(){			
				actionVM = new App.ViewModels.Actions({});
				console.log(actionVM);
				App.views.render($('div#col_center'), 'analytics/analytics',actionVM, function() {
					
					$('#image').click(function() {
					   if($('#image').is(':checked')) {
					   		
							if(App.subscription)
								App.subscription.dispose();
							
							var url = "/analytics/groupImage";
									$.ajax({						
										type:'post',
										datatype:'json',
										url:url,
										data: {cTags:App.currentTags()},
										success: function(image_analysis_data){
											vm = new App.ViewModels.GroupImage({
												data : image_analysis_data,
												actionVM : actionVM
											});
											App.views.render($('#table'), 'analytics/groupImage', vm, function() {});
										}
									});
							
							App.subscription = App.currentTags.subscribe(function(){
								//alert('inside grp img');
								var url = "/analytics/groupImage";
								$.ajax({						
									type:'post',
									datatype:'json',
									url:url,
									data: {cTags:App.currentTags()},
									success: function(image_analysis_data){
										vm = new App.ViewModels.GroupImage({
											data : image_analysis_data,
											actionVM : actionVM
										});
										App.views.render($('#table'), 'analytics/groupImage', vm, function() {});
									}
								});
							});
				 		}
					});
					$('#time').click(function() {
					   if($('#time').is(':checked')) {
					   	
						   	if(App.subscription)
								App.subscription.dispose();
							
						   	var url = "/analytics/groupTime";
						   	$.ajax({						
								type:'post',
								datatype:'json',
								url:url,
								data: {cTags:App.currentTags()},
								success: function(time_analysis_data){
									vm = new App.ViewModels.GroupTime({
										data : time_analysis_data,
										actionVM : actionVM
									});
									App.views.render($('#table'), 'analytics/groupTime', vm, function() {});
								}
							});
							App.subscription = App.currentTags.subscribe(function(){
								var url = "/analytics/groupTime";
						   	   	$.ajax({						
									type:'post',
									datatype:'json',
									url:url,
									data: {cTags:App.currentTags()},
									success: function(time_analysis_data){
										vm = new App.ViewModels.GroupTime({
											data : time_analysis_data,
											actionVM : actionVM
										});
										App.views.render($('#table'), 'analytics/groupTime', vm, function() {});
									}
								});
							});
						}			   
					});
					$('#city').click(function() {
					   if($('#city').is(':checked')) {
					   		
					   		if(App.subscription)
								App.subscription.dispose();
							
						   	var url = "/analytics/groupLocation";
					   		$.ajax({						
								type:'post',
								datatype:'json',
								url:url,
								data: {cTags:App.currentTags(), type:'city'},
								success: function(city_analysis_data){
									vm = new App.ViewModels.GroupCity({
										data : city_analysis_data,
										actionVM : actionVM
									});
									App.views.render($('#table'), 'analytics/groupCity', vm, function() {});
								}
							});
							App.subscription = App.currentTags.subscribe(function(){
								var url = "/analytics/groupLocation";
						   	   	$.ajax({						
									type:'post',
									datatype:'json',
									url:url,
									data: {cTags:App.currentTags(), type:'city'},
									success: function(city_analysis_data){
										vm = new App.ViewModels.GroupCity({
											data : city_analysis_data,
											actionVM : actionVM
										});
										App.views.render($('#table'), 'analytics/groupCity', vm, function() {});
									}
								});
							});
							
						}
					});
					$('#state').click(function() {
					   if($('#state').is(':checked')) {
					   		
					   		if(App.subscription)
								App.subscription.dispose();
							
						   	var url = "/analytics/groupLocation";
					   		$.ajax({						
								type:'post',
								datatype:'json',
								url:url,
								data: {cTags:App.currentTags(), type:'state'},
								success: function(state_analysis_data){
									vm = new App.ViewModels.GroupState({
										data : state_analysis_data,
										actionVM : actionVM
									});
									App.views.render($('#table'), 'analytics/groupState', vm, function() {});
								}
							});
							App.subscription = App.currentTags.subscribe(function(){
								var url = "/analytics/groupLocation";
						   	   	$.ajax({						
									type:'post',
									datatype:'json',
									url:url,
									data: {cTags:App.currentTags(), type:'state'},
									success: function(state_analysis_data){
										vm = new App.ViewModels.GroupLocation({
											data : state_analysis_data,
											actionVM : actionVM
										});
										App.views.render($('#table'), 'analytics/groupState', vm, function() {});
									}
								});
							});
							
						}
					});
					$('#country').click(function() {
					   if($('#country').is(':checked')) {
					   		
					   		if(App.subscription)
								App.subscription.dispose();
							
						   	var url = "/analytics/groupLocation";
					   		$.ajax({						
								type:'post',
								datatype:'json',
								url:url,
								data: {cTags:App.currentTags(), type:'country'},
								success: function(country_analysis_data){
									vm = new App.ViewModels.GroupCountry({
										data : country_analysis_data,
										actionVM : actionVM
									});
									App.views.render($('#table'), 'analytics/groupCountry', vm, function() {});
								}
							});
							App.subscription = App.currentTags.subscribe(function(){
								var url = "/analytics/groupLocation";
						   	   	$.ajax({						
									type:'post',
									datatype:'json',
									url:url,
									data: {cTags:App.currentTags(), type:'country'},
									success: function(country_analysis_data){
										vm = new App.ViewModels.GroupLocation({
											data : country_analysis_data,
											actionVM : actionVM
										});
										App.views.render($('#table'), 'analytics/groupCountry', vm, function() {});
									}
								});
							});
							
						}
					});
			
				});
				
			});
		});		
	};
};
