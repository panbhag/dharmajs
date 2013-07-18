App.views = {};

App.views.derender = function(container)
{
	container.attr("data-template","").html("");

	
}

App.views.render = function (container,templatePath,vm,options,callback) {
   
   
   
	// if($('#left_render').attr('data-render') == 'true')
    	// return true;
    
    if(typeof(options) == 'function')
    {
    	callback = options;
    	options = {};
    }
    
    if(!options)
    {
    	options = {};
    }
    
    if(container.attr('data-template') == templatePath && options.cacheTemplate == true)
      return false
    
    container.attr("data-template",templatePath);


    infuser.get(templatePath, function (t) {
        console.log('in view.js',templatePath);
        if(container.hasClass('col_center'))
        { console.log("fadeout");
        
        
        	 container.fadeOut(200,function(){
        
        		container.html(t);

        		ko.applyBindings(vm, container[0]);
        		
        	 	container.fadeIn(500);
        	 	
        	 	        if (callback)
        				{
				            callback();
				        }
        	 	
        	 });
        	 
        	 
        }
        else{
        
        container.html(t);

        console.log('apply binging start',templatePath);
        ko.applyBindings(vm, container[0]);
        // if(container.hasClass('col_center'))
        // {   console.log("fadein"); 
        	// container.fadeIn(1000)
        // }
        console.log('apply binging end',templatePath);

        if (callback)
        {
            callback();
        }
        
        // if(hideLoader == true)
		// {
			// $("img.loader").hide("slow");
		// }        
        }

    });


}

App.views.setLocation = function (path)
{

    $.sammy.apps["body"].setLocation(path)
}

App.views.loader = function(visible)
{
	if(visible == true)
	{
		$("div.loader").css("display","block");
	}
	if(visible == false)
	{
		$("div.loader").css("display","none");
	}
}
