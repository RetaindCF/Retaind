var expect = require('chai').expect;
var time = require(__dirname + '/../lib/time');

describe('time', function() {
  var today;
  beforeEach(function(done){
    today = new Date()
    done();
  });

  it('should increment time by 1 day', function() {
    var test = time.plusDay();
    today.setDate(today.getDate() + 1);
    expect(test.toString()).to.eql(today.toString());
  });

  it('should increment time by 1 week', function() {
    var test = time.plusWeek().toString();
    today.setDate(today.getDate() + 7);
    expect(test.toString()).to.eql(today.toString());
  });

  it('should increment time by 1 month', function() {
    var test = time.plusMonth().toString();
    today.setMonth(today.getMonth() + 1);
    expect(test.toString()).to.eql(today.toString());
  });

  it('should increment time by 3 months', function() {
    var test = time.plusQtr().toString();
    today.setMonth(today.getMonth() + 3);
    expect(test.toString()).to.eql(today.toString());
  });

  it('should increment time by 1 year', function() {
    var test = time.plusYear().toString();
    today.setYear(today.getYear() + 1);
    expect(test.toString()).to.eql(today.toString());
  });
});
