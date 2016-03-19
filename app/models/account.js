/**
 * Account model
 */
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  username: String,
  password: String
});

AccountSchema.plugin(passportLocalMongoose);

mongoose.model('Account', AccountSchema);
