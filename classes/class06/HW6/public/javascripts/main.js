
		$(document).on('click', '.delete', function(event) {
			$.post("/deleteTwote", {
				_id: event._id
			})
			.done(function(data,status) {
				$(event.target).closest(".twote").hide();
			})
			.onError;
		})



		$('#newTwote').click(function(data) {
			data.preventDefault();
			$.post('/newTwote', {
				data: JSON.stringify($(data.target).closest("form").serializeArray()),
	      		_id: data.id
			})
			.done(function(data,status) {
				$("#twotes").prepend("<div class='twote belongsTo{{_user._id}}'><li class='myTwote' class='twote" + data["_user"]["_id"] + "'>" + data.content + " -" + data["_user"].name + "</li><input class='delete' id='delete" + data["_id"] + "' type='submit' value='Delete'></div>");
				$('#twoteText').val("");
			})
			.onError;
		})



