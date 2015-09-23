var expect = require('chai').expect;
var time = require(__dirname + '/../lib/time');
require('datejs');


describe('time', function() {
  var today;
  beforeEach(function(done){
    today = Date.today();
    done();
  });

  it('should increment time by 1 day', function() {
    expect(time.plusDay().day().toString()).to.not.eql(today.day().toString());
    expect(time.plusDay().day().toString()).to.eql(today.add(1).day().toString());
  });

  it('should increment time by 1 week', function() {
    expect(time.plusWeek().day().toString()).to.not.eql(today.day().toString());
    expect(time.plusWeek().day().toString()).to.eql((today.add(7)).day().toString());
  });

  it('should increment time by 1 month', function() {
    expect(time.plusMonth().day().toString()).to.not.eql(today.day().toString());
    expect(time.plusMonth().day().toString()).to.eql((today.add(30)).day().toString());
  });

  it('should increment time by 3 months', function() {
    expect(time.plusQtr().day().toString()).to.not.eql(today.day().toString());
    expect(time.plusQtr().day().toString()).to.eql((today.add(90)).day().toString());
  });

  it('should increment time by 1 year', function() {
    expect(time.plusYear().day().toString()).to.not.eql(today.day().toString());
    expect(time.plusYear().day().toString()).to.eql((today.add(365)).day().toString());
  });
});
