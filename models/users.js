var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid')

var UserSchema = new Schema({
  username : {
      type : String,
      required: [true, '아이디는 필수입니다.'],
      index: { unique: true } 
  },
  password : {
      type : String,
      required: [true, '패스워드는 필수입니다.']
  },
  displayname : String,
  created_at : {
      type : Date,
      default : Date.now()
  }
});
module.exports = mongoose.model('user' , UserSchema);