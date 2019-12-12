var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
	burger.all(function(data) {
		var burgerData = {
			burger_name: data,
			devoured: data
		};
		// console.log(burgerData);
		res.render("index", burgerData);
	});
});

router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id; // Passed to orm to update the correct id that is clicked
	// console.log("condition is ", condition);

	burger.update({
		devoured: 1
		},
		condition, function (result) {
		// console.log("put results ",result);
		if (result.changedRows == 0) {
		// 	If no rows were changed, then the ID must not exist, so 404
		return res.status(404).end();
		} else {
			res.status(200).end();
		}
		});
});

router.post("/api/burgers", function(req, res) {
	res.send("you are in /api/burgers");

	burger.create([
		"burger_name", "devoured"
	], [
		req.body.burger_name, req.body.devoured
	], function(result) {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
	// console.log(req);
});




module.exports = router;
