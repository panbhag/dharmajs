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
         

        this.get("#/photos", function () {
        	controllerCaller("Photos","index",{params:this.params});				
        });
		
    });
   

    $(function () {
		//default routes
      app.run('#/photos');
    });

    
})(jQuery)