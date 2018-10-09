
const mongoose = require('mongoose');

const jobTypeSchema = new mongoose.Schema({
  jobTypeName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  }
});
const jobType = mongoose.model('JobType', jobTypeSchema);

exports.jobType = jobType; 