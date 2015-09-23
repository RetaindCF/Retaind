require('datejs');
var User = require(__dirname + '/../models/user');

var today = Date.today();


exports.plusDay = function plusDay() {
  var tomorrow = today.add(1).day();
  return tomorrow;
};

exports.plusWeek = function plusWeek() {
  var tomorrow = today.add(7).day();
  return tomorrow;
};

exports.plusMonth = function plusMonth() {
  var tomorrow = today.add(30).day();
  return tomorrow;
};

exports.plusQtr = function plusQtr() {
  var tomorrow = today.add(90).day();
  return tomorrow;
};

exports.plusYear = function plusYear() {
  var tomorrow = today.add(365).day();
  return tomorrow;
};
