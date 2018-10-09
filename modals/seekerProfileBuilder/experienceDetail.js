const mongoose = require('mongoose');

const experienceDetailSchema = new mongoose.Schema({
 userAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User',
  },
  isCurrentJob:{
   type:Boolean
  },
  startDate: {
    type:Date,
    required:true
  },
  endDate: {
    type:Date,
  },
  jobTitle:{
    type:String,
    minlength:1,
    maxlength:255,
    required:true
},
company:{
    type:String,
    minlength:1,
    maxlength:255,
    required:true
},
description:{
    type:String,
}
/*
jobLocationCity:{
    type:String,
    minlength:1,
    maxlength:255,
    required:true
},
jobLocationState:{
    type:String,
    minlength:1,
    maxlength:255,
    required:true
},
jobLocationCountry:{
    type:String,
    minlength:1,
    maxlength:255,
    required:true
},*/
});

const experienceDetail = mongoose.model('ExperienceDetail', experienceDetailSchema);

exports.experienceDetail = experienceDetail; 