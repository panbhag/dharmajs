//if(!window.console) {console={}; console.log = function(){};}


App.apiBaseURL = "";

App.apiURL = function(url)
    {
        return this.apiBaseURL + url;
    }


App.showFlash = function (msg, type)
    {
        if(type)
        {    toastr[type](msg);
        }
        else
        {
            toastr.info(msg);
        }
        return true;
    }
    
App.hideFlash = function ()
    {
        $("#notify_message .message").html("");

        $("#notify_message").slideUp()

    }



