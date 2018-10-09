const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
 jobPostedBy: {
  type: mongoose.Schema.Types.ObjectId,   
  ref:'User',
  },
  jobType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'JobType',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Company',
  },
  isCompanyNameHidden:{
    type:Boolean,
    required:true
  },
  createdDate:{
    type:Date,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Location',
  },
  isActive:{
    type:Boolean,
    //required:true
  },
});

const jobPost = mongoose.model('JobPost', jobPostSchema);

exports.jobPost = jobPost; 