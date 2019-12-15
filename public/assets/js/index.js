
$(function() {
	$(".devour").on("click", function(event) {
		var id = $(this).data("id"); // This grabs data-id=id from index.handlebars and gets the ID for the DB
		var devouredState = $(this).data("devour"); //This grabs data-devour from handlebars and gets 0 or 1 from the DB
		var burgerState = {
			devoured: devouredState
		 };
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: burgerState
		}).then(
			function() {
				$('#burgerList').hide();  // Hide the burgers and move them once they are devoured
				location.reload();  // Reload the page to get the updated list
			}
		);
	});
});

$(function() {
	$(".createBurger").on("click", function (event) {
		event.preventDefault();
		var newBurger = {
			burger_name: $("#burger").val().trim(),
			devoured: 0
		};
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(
			function () {
				// console.log("created new burger");
				location.reload();
			}
		);
	});
});
