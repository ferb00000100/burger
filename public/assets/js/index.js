// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function() {
	$(".devour").on("click", function(event) {
		var id = $(this).data("id"); // This grabs data-id=id from index.handlebars and gets the ID for the DB
		var devouredState = $(this).data("devour"); //This grabs data-devour from handlebars and gets 0 or 1 from the DB
		// console.log(id);
		// console.log(devoured);
		var burgerState = {
			devoured: devouredState
		 };

		// Send the PUT request.
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: burgerState
		}).then(
			function() {
				$('#burgerList').hide();  // Hide the burgers and move them once they are devoured
				// Reload the page to get the updated list
				location.reload();
			}
		);
	});
});

$(function() {
	$(".createBurger").on("click", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();
		// console.log(event);
		// console.log($(this));
		var newBurger = {
			burger_name: $("#burger").val().trim(),
			devoured: 0
		};
		console.log(newBurger);
		// Send the POST request.
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(
			function () {
				console.log("created new burger");
				// Reload the page to get the updated list
				location.reload();
			}
		);
	});
});