const Joi = require('joi');
const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  }
});

const UserType = mongoose.model('UserType', userTypeSchema);

exports.UserType = UserType; 