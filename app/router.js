(function ($) {
    var app = $.sammy('body', function () {
        
        function controllerCaller(controller,action,options)
        {     	
          (new App.Controllers[controller](options.params))[action]()
         }
         
         
        //run this before all routes 
        this.before(/\#\/(.*)/, function() {
            //$("#menu_below_header").html(''); 	//act as derender
 	     }); 
         

        this.get("#/share_masters/new", function () {
        	controllerCaller("ShareMasters","new",{params:this.params});				
        });
		this.get("#/share_masters/:id/edit", function(){
			controllerCaller("ShareMasters","edit",{params:this.params});
		});
		
    });
   

    $(function () {
      app.run('#/photos');
    });

    
})(jQuery)