$( document ).ready(function(){
	$.get('/catsJson', function(json){
		var source   = $("#cats-template").html(); // cats-template is in main.html 
		var template = Handlebars.compile(source);
		var htmlOutput    = template(json);
		$('#content').html(htmlOutput);
	});
});