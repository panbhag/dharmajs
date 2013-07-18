/**
 * @author Vijay R. Chintamani
 */
App.Controllers.Settings = function(){
	var self = this;
	$('div#masterList').html("");
	$('div#masterCreate').html("");
	$('div#indexedList').html("");
	self.index = function(){		
		//App.views.derender($('section.left_sidebar'));
		App.views.render($('div#insider'),'settings/index', null, function(){});			
	}	
}
