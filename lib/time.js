var User = require(__dirname + '/../models/user');

exports.plusDay = function plusDay() {
  var result = new Date();
  // setDate returns a number that can be cast as a new date
  return new Date(result.setDate( result.getDate() + 1));
};

exports.plusWeek = function plusWeek() {
  var result = new Date();
  // setDate returns a number that can be cast as a new date
  return new Date(result.setDate( result.getDate() + 7));
};

exports.plusMonth = function plusMonth() {
  var result = new Date();
  // setMonth returns a number that can be cast as a new date
  return new Date(result.setMonth( result.getMonth() + 1));
};

exports.plusQtr = function plusQtr() {
  var result = new Date();
  // setMonth returns a number that can be cast as a new date
  return new Date(result.setMonth( result.getMonth() + 3));
};

exports.plusYear = function plusYear() {
  var result = new Date();
  // setYear returns a number that can be cast as a new date
  return new Date(result.setYear( result.getYear() + 1));
};
