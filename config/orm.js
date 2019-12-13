var connection = require("./connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(object) {
	var arr = [];
	// objColVals are { devoured: 1 }
	// loop through the keys and push the key/value as a string int arr
	for (var key in object) {
		var value = object[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(object, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			// e.g. {devoured: 1} => ["devoured=1"]
			arr.push(key + "=" + value);
		}
	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
}

function objToString (object) {
	var arr = [];
	for (var key in object) {
		var value = object[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(object, key)) {
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arr.push(value);
		}
	}
	return arr.toString();
}


var orm = {
	all: function (tableInput, cb) {
		let queryString = "SELECT * FROM " + tableInput;
		connection.query(queryString, function (err, results) {
			if (err) throw err;
			cb(results);
		});
	},
	create: function(table, cols, vals, cb) {
		console.log("IN ORM FUNCTION");
		newVals = objToString(vals);
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += newVals;
		queryString += ");";

		console.log(queryString);
		connection.query(queryString, ');', function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	update: function(table, objColVals, condition, cb) {
		console.log("objColVals are ",objColVals);
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
}

module.exports = orm;