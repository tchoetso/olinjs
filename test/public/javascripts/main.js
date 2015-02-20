var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$('#makeNewTwote').click(function(event) {
	event.preventDefault();
	var formData = JSON.stringify($(event.target).closest("form").serializeArray());
	$.post('/createTwote', {
		data: formData,
		myId: $(event.target).closest("form").attr("id")
	})
	.done(function(data,status) {
		$("#twotes").prepend("<div class='twote belongsTo{{_user._id}}'><li class='myTwote' class='twote" + data["_user"]["_id"] + "'>" + data.content + " -" + data["_user"].name + "</li><input class='delete' id='delete" + data["_id"] + "' type='submit' value='Delete'></div>");
		$('#twoteText').val("");
	})
	.onError;
})

$(document).on('click', '.user', function(event) {
	var myId = '.belongsTo' + $(event.target).attr("id");
	console.log(myId);
	$(".twote").removeClass('highlight');
	$(myId).addClass('highlight');
});

$(document).on('click', '.delete', function(event) {
	var myId = $(event.target).attr("id");
	console.log(myId);
	$.post("/deleteTwote", {
		myId: myId
	})
	.done(function(data,status) {
		$(event.target).closest(".twote").hide();
	})
	.onError;
})