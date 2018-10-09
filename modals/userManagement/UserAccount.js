const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength:1,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  userType:{
    type:String ,
    required: true
  },
  email:{
    type: String,
    required: true,
    minlength:5,
    maxlength:255
  },
  password:{
    type: String,
    minlength:5,
    maxlength:255
  },
  /*
  dateOfBirth:{
    type: Date,
  },
  gender:{
    type: String,
    minlength:1,
    maxlength:1
  },*/
  contactNo:{
    type: String,
    minlength:11,
    maxlength:15
  },
  userImage:{
    type: String,
    minlength:5,
    maxlength:255
  },
  registrationDate:{
    type: Date,
  }
});
userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
}
//
const User = mongoose.model('User', userSchema);

exports.User = User; 
