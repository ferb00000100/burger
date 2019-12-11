let connection = require("./connection.js");

let orm = {
	all: function (tableInput, cb) {
		let queryString = "SELECT * FROM " + tableInput;
		connection.query(queryString, function (err, results) {
			if (err) throw err;
			// console.log(results);
			cb(results);
		});
	}
}
// selectAll()
// insertOne()
// updateOne()

module.exports = orm;