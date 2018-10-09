const Joi = require('joi');
const mongoose = require('mongoose');

const seekerProfileSchema = new mongoose.Schema({
 userAccount: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref:'User',
 },
 currentSalary: {
    type:Number,
  },
 currency:{
      type:String,
  }
});

const seekerProfile = mongoose.model('SeekerProfile', seekerProfileSchema);

exports.seekerProfile = seekerProfile; 