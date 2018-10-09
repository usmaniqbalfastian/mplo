
const mongoose = require('mongoose');

const skillSetSchema = new mongoose.Schema({
  skillSetName:{
      type:String,
      required:true,
      minlength:1,
      maxlength:255
  }
});

const skillSet = mongoose.model('SkillSet', skillSetSchema);

exports.skillSet = skillSet; 