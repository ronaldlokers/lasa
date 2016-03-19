var config = require('../config/config');
var should = require('should');
var mongoose = require('mongoose');
var AccountModel = require(config.root + '/app/models/account.js');
var Account = mongoose.model('Account');
var db;

describe('Account', function() {

before(function(done) {
 db = mongoose.connect(config.db);
   done();
 });

 after(function(done) {
   mongoose.connection.close();
   done();
 });

 beforeEach(function(done) {
  var account = new Account({
    username: '12345',
    password: 'testy'
  });

  account.save(function(error) {
    if (error) {
      console.log('error' + error.message);
    }
    done();
   });
 });

 it('find a account by username', function(done) {
    Account.findOne({ username: '12345' }, function(error, account) {
      account.username.should.eql('12345');
      done();
    });
 });

 afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
 });

});
