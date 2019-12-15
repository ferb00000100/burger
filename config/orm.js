var connection = require("./connection.js");

function objToSql(object) {
	var arr = [];
	for (var key in object) {
		var value = object[key];
		if (Object.hasOwnProperty.call(object, key)) {
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
		newVals = objToString(vals);
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += newVals;
		queryString += ");";

		connection.query(queryString, ');', function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	update: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
}

module.exports = orm;