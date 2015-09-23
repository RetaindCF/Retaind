require('datejs');
var User = require(__dirname + '/../models/user');

var today = Date.today();


function plusDay() {
  var tomorrow = today.add(1).day();
  return tomorrow;
}

function plusWeek() {
  var tomorrow = today.add(7).day();
  return tomorrow;
}

function plusMonth() {
  var tomorrow = today.add(30).day();
  return tomorrow;
}

function plusQtr() {
  var tomorrow = today.add(90).day();
  return tomorrow;
}

function plusYear() {
  var tomorrow = today.add(365).day();
  return tomorrow;
}
