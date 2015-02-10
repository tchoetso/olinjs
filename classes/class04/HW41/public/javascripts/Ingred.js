var showingredients = function(){
  
  $.get("ingredients/list").done(function(data,status){
    $("#ingredients").html(data);  
  }).error(function(data,status){
  });
}

$('#add').submit(function(event){
  event.preventDefault();
  formData = $('#add').serialize();
  $.post("/ingredients/add",formData).done(function(data,status){
    showingredients();
  }).error(function(data,stats){
  });
});

$(document).ready(function(){
  showingredients();
});
